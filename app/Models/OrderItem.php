<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\ProduceItem;

class OrderItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'order_id',
        'user_id',
        'produce_item_id',
        'name',
        'quantity',
        'price',
        'promo_price',
        'product_code',
    ];

    /**
     * Get the produce item associated with this order item.
     */
    public function produceItem()
    {
        return $this->belongsTo(ProduceItem::class, 'produce_item_id');
    }

    /**
     * Get the order that owns this item.
     */
    public function order()
    {
        return $this->belongsTo(Order::class);
    }
}
