<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('quote_requests', function (Blueprint $table) {
            $table->id();
            $table->string('name', 150);
            $table->string('company', 150)->nullable();
            $table->string('email', 254);
            $table->string('phone', 50)->nullable();
            $table->string('country', 100)->nullable();
            $table->text('message')->nullable();
            $table->json('lines');
            $table->timestamp('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('quote_requests');
    }
};
