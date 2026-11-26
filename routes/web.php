<?php

use App\Http\Controllers\QuoteRequestController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome', ['page' => 'home'])->name('home');
Route::inertia('/presentation', 'welcome', ['page' => 'presentation'])->name('presentation');
Route::inertia('/actualites', 'welcome', ['page' => 'actualites'])->name('actualites');
Route::inertia('/produits', 'welcome', ['page' => 'produits'])->name('produits');
Route::inertia('/garantie', 'welcome', ['page' => 'garantie'])->name('garantie');
Route::inertia('/contact', 'welcome', ['page' => 'contact'])->name('contact');
Route::inertia('/allo-moteur', 'welcome', ['page' => 'allo-moteur'])->name('allo-moteur');
Route::post('/devis', QuoteRequestController::class)->middleware('throttle:10,1')->name('quotes.store');
