<?php

namespace App\Http\Controllers;

use App\Models\ProduceItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ProduceItemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produceItems = ProduceItem::all();
        
        // Add debugging information
        Log::info('Produce items fetched: ' . $produceItems->count() . ' items');
        
        // Log all item names for debugging
        $itemNames = $produceItems->pluck('name')->toArray();
        Log::info('Available items: ' . implode(', ', $itemNames));
        
        return response()->json([
            'count' => $produceItems->count(),
            'items' => $produceItems,
            'message' => 'Produce items retrieved successfully',
            'debug' => [
                'total_count' => $produceItems->count(),
                'item_names' => $itemNames
            ]
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
        //
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
        $item = ProduceItem::findOrFail($id);

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'product_code' => 'sometimes|string|max:255',
            'inventory' => 'sometimes|string',
            'case_cost' => 'sometimes|numeric|min:0',
            'case_size' => 'sometimes|string|max:255',
            'promo_price' => 'sometimes|numeric|min:0',
            'stock' => 'sometimes|boolean',
            'produce_image' => 'nullable|string|max:2048',
            'quantity' => 'sometimes|integer|min:0',
        ]);

        $item->update($validated);

        return response()->json([
            'message' => 'Produce item updated successfully',
            'item' => $item->fresh(),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
