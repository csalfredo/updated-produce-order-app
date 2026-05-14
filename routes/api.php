<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\ProduceItemController;

// Public routes
Route::middleware(['api'])->group(function () {
    Route::post('/login', [AuthenticatedSessionController::class, 'store']);
    Route::post('/register', [AuthController::class, 'register']);
});

// Protected routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthenticatedSessionController::class, 'destroy']);
    Route::get('/user', function (Request $request) {  // Remove duplicate middleware
        return $request->user();
    });
    Route::post('/orders', [OrderController::class, 'store']);
    Route::get('/orders', [OrderController::class, 'index']);
    // Other protected routes...
});

Route::get('/produce-items', [ProduceItemController::class, 'index']);
Route::patch('/produce-items/{id}', [ProduceItemController::class, 'update']);
Route::delete('/produce-items/{id}', [ProduceItemController::class, 'destroy']);