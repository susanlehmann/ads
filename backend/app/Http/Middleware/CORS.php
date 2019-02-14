<?php

namespace App\Http\Middleware;

use Closure;

class Cors {

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next) {

        return $next($request)
          ->header('Access-Control-Allow-Origin', '*')
          ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
          ->header('Access-Control-Allow-Headers',' Origin, Content-Type, Accept, Authorization, X-Request-With ,Accept-Language, Content-Language')
          ->header('Access-Control-Expose-Headers',' Content-Length, Content-Range')
          ->header('Access-Control-Allow-Credentials',' true');
    }
}