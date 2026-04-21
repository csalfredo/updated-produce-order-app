<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\Mail;
use App\Mail\OrderConfirmation;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use App\Models\ProduceItem;

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
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            // Log the incoming request data for debugging
            Log::info('Order request received', [
                'items' => $request->items,
                'user' => Auth::check() ? Auth::id() : 'not authenticated'
            ]);

            // Check if user is authenticated
            if (!Auth::check()) {
                return response()->json([
                    'message' => 'User not authenticated',
                    'error' => 'Login required'
                ], 401);
            }

            $user = Auth::user();
            $items = $request->items;

            // Validate items structure
            if (!is_array($items) || empty($items)) {
                return response()->json([
                    'message' => 'Invalid order items',
                    'error' => 'Items must be a non-empty array'
                ], 400);
            }

            // Calculate total - handle missing 'total' field
            $total = 0;
            foreach ($items as $item) {
                // Use either existing total, or calculate from quantity and price
                $itemTotal = $item['total'] ?? ($item['quantity'] * ($item['promo'] ?: $item['case_cost']));
                $total += $itemTotal;
            }

            // Save the order
            $order = Order::create([
                'user_id' => $user->id,
                'total' => $total,
                // other fields...
            ]);

            // Save order items with error handling
            foreach ($items as $item) {
                // First look up the corresponding ProduceItem by name or other identifier
                $produceItem = ProduceItem::where('name', $item['name'])->first();
                
                if ($produceItem) {
                    Log::info('Found produce item for order', [
                        'item_name' => $item['name'],
                        'produce_item_id' => $produceItem->id,
                        'produce_item_name' => $produceItem->name
                    ]);
                    
                    $orderItem = new OrderItem();
                    $orderItem->order_id = $order->id;
                    $orderItem->name = $item['name'];
                    $orderItem->quantity = $item['quantity'];
                    $orderItem->price = $item['case_cost'] ?? $produceItem->case_cost;
                    $orderItem->promo_price = $item['promo'] ?? null;
                    $orderItem->product_code = $produceItem->product_code ?? 'unknown';
                    
                    // This is the crucial part - set the produce_item_id to link them
                    $orderItem->produce_item_id = $produceItem->id;
                    
                    $orderItem->save();
                } else {
                    Log::warning('Could not find produce item for order item', [
                        'requested_name' => $item['name']
                    ]);
                    
                    // Create a basic order item without produce item connection
                    $orderItem = new OrderItem();
                    $orderItem->order_id = $order->id;
                    $orderItem->name = $item['name'];
                    $orderItem->quantity = $item['quantity'];
                    $orderItem->price = $item['case_cost'] ?? 0;
                    $orderItem->promo_price = $item['promo'] ?? null;
                    $orderItem->product_code = 'unknown';
                    $orderItem->save();
                }
            }

            // Try to send email but don't fail if it doesn't work
            try {
                Log::info('Attempting to send order confirmation email', [
                    'order_id' => $order->id, 
                    'recipient' => $user->email,
                    'mailpit_host' => config('mail.host'),
                    'mailpit_port' => config('mail.port')
                ]);
                
                // Create the mailable instance explicitly for debugging
                $mailable = new OrderConfirmation($order);
                Log::info('Mailable created', [
                    'mailable_class' => get_class($mailable),
                    'view_path' => $mailable->viewData['view'] ?? 'view not specified'
                ]);
                
                Mail::to($user->email)->send($mailable);
                
                Log::info('Email sent successfully');
            } catch (\Exception $emailError) {
                Log::error('Failed to send order confirmation email', [
                    'error' => $emailError->getMessage(),
                    'trace' => $emailError->getTraceAsString(),
                    'order_id' => $order->id,
                    'recipient' => $user->email
                ]);
                // Continue without failing the whole request
            }

            return response()->json([
                'message' => 'Order sent successfully!',
                'order' => $order
            ]);

        } catch (\Exception $e) {
            Log::error('Order creation failed', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'message' => 'Failed to create order',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
