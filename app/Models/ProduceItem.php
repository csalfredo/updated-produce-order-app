<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ProduceItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'product_code',
        'inventory',
        'case_cost',
        'case_size',
        'promo_price',
        'stock',
        'produce_image',
        'quantity'
    ];

    protected $casts = [
        'case_cost' => 'decimal:2',
        'promo_price' => 'decimal:2',
        'stock' => 'boolean',
    ];

    // Relationship with User model
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Optional: Define relationship with order items
    public function orderItems()
    {
        return $this->hasMany(OrderItem::class);
    }
}
