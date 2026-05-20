<?php

namespace App\Http\Controllers;

use App\Mail\OrderConfirmation;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProduceItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource (recent orders with line items).
     */
    public function index(Request $request)
    {
        $orders = Order::query()
            ->with(['items', 'user'])
            ->orderByDesc('created_at')
            ->limit(100)
            ->get();

        return response()->json([
            'orders' => $orders,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * Accepts only produce_item_id + quantity per line. Prices, stock, and
     * inventory are resolved from the database at submit time.
     */
    public function store(Request $request)
    {
        if (! Auth::check()) {
            return response()->json([
                'message' => 'User not authenticated',
                'error' => 'Login required',
            ], 401);
        }

        $validated = $request->validate([
            'items' => ['required', 'array', 'min:1'],
            'items.*.produce_item_id' => ['required_without:items.*.id', 'integer', 'exists:produce_items,id'],
            'items.*.id' => ['required_without:items.*.produce_item_id', 'integer', 'exists:produce_items,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
        ]);

        $user = Auth::user();

        // Merge duplicate lines (same product ordered twice in one payload)
        $merged = [];
        foreach ($validated['items'] as $line) {
            $produceItemId = (int) ($line['produce_item_id'] ?? $line['id']);
            $quantity = (int) $line['quantity'];
            $merged[$produceItemId] = ($merged[$produceItemId] ?? 0) + $quantity;
        }

        try {
            $order = DB::transaction(function () use ($user, $merged) {
                $orderTotal = 0;
                $resolvedLines = [];

                foreach ($merged as $produceItemId => $requestedQty) {
                    $produceItem = ProduceItem::query()
                        ->lockForUpdate()
                        ->find($produceItemId);

                    if (! $produceItem) {
                        throw ValidationException::withMessages([
                            'items' => ["Product #{$produceItemId} was not found."],
                        ]);
                    }

                    if (! $produceItem->stock) {
                        throw ValidationException::withMessages([
                            'items' => ["{$produceItem->name} is out of stock."],
                        ]);
                    }

                    if ($produceItem->quantity < $requestedQty) {
                        throw ValidationException::withMessages([
                            'items' => [
                                "Not enough inventory for {$produceItem->name}. "
                                . "Requested {$requestedQty}, available {$produceItem->quantity}.",
                            ],
                        ]);
                    }

                    $unitPrice = $this->unitPrice($produceItem);
                    $lineTotal = round($unitPrice * $requestedQty, 2);
                    $orderTotal += $lineTotal;

                    $resolvedLines[] = [
                        'produce_item' => $produceItem,
                        'quantity' => $requestedQty,
                        'unit_price' => $unitPrice,
                        'line_total' => $lineTotal,
                    ];
                }

                $order = Order::create([
                    'user_id' => $user->id,
                    'total' => round($orderTotal, 2),
                ]);

                foreach ($resolvedLines as $line) {
                    /** @var ProduceItem $produceItem */
                    $produceItem = $line['produce_item'];
                    $requestedQty = $line['quantity'];

                    OrderItem::create([
                        'order_id' => $order->id,
                        'user_id' => $user->id,
                        'produce_item_id' => $produceItem->id,
                        'name' => $produceItem->name,
                        'quantity' => $requestedQty,
                        'price' => $produceItem->case_cost,
                        'promo_price' => $produceItem->promo_price > 0
                            ? $produceItem->promo_price
                            : null,
                        'product_code' => $produceItem->product_code ?? 'unknown',
                    ]);

                    $produceItem->decrement('quantity', $requestedQty);
                    $produceItem->refresh();

                    if ($produceItem->quantity <= 0) {
                        $produceItem->update([
                            'quantity' => 0,
                            'stock' => false,
                            'inventory' => '0',
                        ]);
                    } else {
                        $produceItem->update([
                            'inventory' => (string) $produceItem->quantity,
                        ]);
                    }
                }

                return $order->load('items');
            });

            try {
                Mail::to($user->email)->send(new OrderConfirmation($order));
            } catch (\Exception $emailError) {
                Log::error('Failed to send order confirmation email', [
                    'error' => $emailError->getMessage(),
                    'order_id' => $order->id,
                    'recipient' => $user->email,
                ]);
            }

            return response()->json([
                'message' => 'Order sent successfully!',
                'order' => $order,
            ]);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => collect($e->errors())->flatten()->first()
                    ?? 'Order could not be placed.',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Order creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);

            return response()->json([
                'message' => 'Failed to create order',
                'error' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Effective per-case price: promo when set, otherwise case cost.
     */
    private function unitPrice(ProduceItem $item): float
    {
        $promo = (float) $item->promo_price;
        $caseCost = (float) $item->case_cost;

        return $promo > 0 ? $promo : $caseCost;
    }

    public function create()
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function destroy(string $id)
    {
        //
    }
}
