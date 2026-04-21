<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;

Route::get('/', function () {
    return ['Laravel' => app()->version()];
});

require __DIR__.'/auth.php';

// Add this route for testing mail
Route::get('/test-mail', function () {
    Mail::raw('Test email from Laravel app', function ($message) {
        $message->to('test@example.com')
                ->subject('Test Email');
    });
    
    return "Email sent! Check Mailpit interface at http://localhost:8025";
});
