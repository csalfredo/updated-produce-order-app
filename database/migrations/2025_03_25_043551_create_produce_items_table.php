<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('produce_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('name');
            $table->string('product_code');
            $table->integer('quantity')->default(1);
            $table->string('inventory');
            $table->decimal('case_cost', 8, 2);
            $table->string('case_size');
            $table->decimal('promo_price', 8, 2);
            $table->boolean('stock')->default(true);
            $table->string('produce_image')->nullable(); // Store path/URL to image, make nullable in case no image is uploaded
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('produce_items');
    }
};
