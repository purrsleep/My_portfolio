<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('title', 100)->unique();
            $table->string('category', 20)->default('web');
            $table->text('description');
            $table->string('tech_stack', 150);
            $table->string('project_url')->nullable();
            $table->string('repository_url')->nullable();
            $table->string('image_path')->nullable();
            $table->binary('image_data')->nullable();      // becomes LONGBLOB below
            $table->string('image_mime', 50)->nullable();
            $table->date('date_completed');
            $table->unsignedSmallInteger('display_order')->default(0);
            $table->timestamps();
        });

        DB::statement('ALTER TABLE projects MODIFY image_data LONGBLOB NULL');
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
