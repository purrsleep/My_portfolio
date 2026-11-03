<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\PortfolioController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;

// Public
Route::get('/', [PortfolioController::class, 'index'])->name('home');
Route::get('/project-images/{project}', [ProjectController::class, 'image'])->name('projects.image');

// Login / logout
Route::middleware('guest')->group(function () {
    Route::get('/login', [AuthController::class, 'create'])->name('login');
    Route::post('/login', [AuthController::class, 'store'])->middleware('throttle:5,1');
});
Route::post('/logout', [AuthController::class, 'destroy'])->middleware('auth')->name('logout');

// Management pages: only a signed-in admin can open these
Route::middleware('auth')->prefix('admin')->group(function () {
    Route::resource('projects', ProjectController::class)->except('show');
});
