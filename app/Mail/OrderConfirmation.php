<?php

namespace App\Mail;

use App\Models\Order;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class OrderConfirmation extends Mailable
{
    use Queueable, SerializesModels;

    public $order;
    public $orderItems;

    /**
     * Create a new message instance.
     */
    public function __construct(Order $order)
    {
        $this->order = $order;
        
        Log::info('Order received for email', [
            'order_id' => $order->id,
            'total_amount' => $order->total_amount,
            'has_items_method' => method_exists($order, 'items')
        ]);
        
        try {
            if (method_exists($order, 'items')) {
                // Check if relationship is defined before loading
                $this->order->load('items.produceItem');
                $this->orderItems = $this->order->items;
                
                // More detailed logging
                Log::info('Order items relationship details', [
                    'order_id' => $order->id,
                    'items_count' => $this->orderItems->count(),
                    'items_empty' => $this->orderItems->isEmpty(),
                    'items_data' => $this->orderItems->toArray(),
                    'order_relations' => array_keys($order->getRelations())
                ]);
            } else {
                $this->orderItems = collect();
                Log::warning('No items relationship found on Order model', ['order_id' => $order->id]);
            }
        } catch (\Exception $e) {
            Log::error('Error loading order items', [
                'order_id' => $order->id,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);
            $this->orderItems = collect();
        }
        
        // Test if we can compute the order total on our own
        $calculatedTotal = 0;
        if ($this->orderItems && $this->orderItems->count() > 0) {
            foreach ($this->orderItems as $item) {
                if (isset($item->quantity) && isset($item->produceItem) && isset($item->produceItem->price)) {
                    $calculatedTotal += $item->quantity * $item->produceItem->price;
                }
            }
            Log::info('Calculated total', [
                'order_id' => $order->id,
                'calculated_total' => $calculatedTotal,
                'db_total' => $order->total_amount
            ]);
        }

        if ($this->orderItems && $this->orderItems->count() > 0) {
            foreach ($this->orderItems as $item) {
                Log::info('Order item details', [
                    'item_id' => $item->id,
                    'produce_item_id' => $item->produce_item_id ?? null,
                    'has_produce_item' => isset($item->produceItem),
                    'produce_item_data' => $item->produceItem ?? 'Not loaded',
                    'quantity' => $item->quantity,
                    'price' => $item->price
                ]);
            }
        }
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
        return new Envelope(
            subject: 'Your Produce Order Confirmation',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            view: 'emails.order-confirmation',
            with: [
                'order' => $this->order,
                'orderItems' => $this->orderItems ?? collect(),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int, \Illuminate\Mail\Mailables\Attachment>
     */
    public function attachments(): array
    {
        return [];
    }
}
