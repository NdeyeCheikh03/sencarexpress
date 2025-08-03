<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\RouteServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    public const HOME = '/home';

    public function boot(): void
    {
        $this->routes(function () {
            // Charge les routes de type API
            Route::middleware('api')
                ->prefix('api')
                ->group(base_path('routes/api.php'));

            // Charge les routes web
            Route::middleware('web')
                ->group(base_path('routes/web.php'));
        });
    }
}
