<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::create([
            'title' => 'Portfolio Website',
            'category' => 'web',
            'description' => 'A portfolio website project demo for my personal information and my projects, built using HTML, CSS and JavaScript.',
            'tech_stack' => 'HTML, CSS, JavaScript',
            'image_path' => 'images/portfolio-website.png',   // copy your screenshot to public/images/
            'date_completed' => '2026-10-12',
            'display_order' => 1,
        ]);

        Project::create([
            'title' => 'Student Management App',
            'category' => 'mobile',
            'description' => 'A mobile app project demo for student management, built using Flutter.',
            'tech_stack' => 'Flutter, Dart',
            'image_path' => 'images/student-app.png',          // copy your screenshot to public/images/
            'date_completed' => '2026-09-11',
            'display_order' => 2,
        ]);
    }
}
