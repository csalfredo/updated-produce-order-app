<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array<int, string>
     */
    protected $except = [
        'sanctum/csrf-cookie',
        /*
         * Produce inventory API is called from Next.js on another origin/port.
         * Stateful Sanctum would require GET /sanctum/csrf-cookie before every PATCH.
         * Excluding these JSON routes avoids 419 for unauthenticated updates in dev.
         * Prefer Bearer tokens or CSRF preflight for sensitive production APIs.
         */
        'api/produce-items',
        'api/produce-items/*',
    ];
}