<?php

namespace App\Http\Controllers;

use App\Models\Project;
use Inertia\Inertia;

class PortfolioController extends Controller
{
    public function index()
    {
        return Inertia::render('Home', [
            'projects' => Project::withoutImageData()
                ->orderBy('display_order')
                ->orderByDesc('date_completed')
                ->get(),
            'canManage' => auth()->check(),
        ]);
    }
}
