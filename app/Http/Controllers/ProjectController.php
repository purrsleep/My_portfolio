<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProjectRequest;
use App\Models\Project;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProjectController extends Controller
{
    public function index(Request $request)
    {
        $projects = Project::withoutImageData()
            ->when($request->search, fn ($q, $s) => $q->where('title', 'like', "%{$s}%"))
            ->orderBy('display_order')
            ->orderByDesc('date_completed')
            ->paginate(8)
            ->withQueryString();

        return Inertia::render('Projects/Index', [
            'projects' => $projects,
            'filters'  => $request->only('search'),
        ]);
    }

    public function create()
    {
        return Inertia::render('Projects/Create');
    }

    public function store(ProjectRequest $request)
    {
        $data = $request->safe()->except('image');

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $data['image_data'] = file_get_contents($file->getRealPath());
            $data['image_mime'] = $file->getMimeType();
            $data['image_path'] = null;
        }

        Project::create($data);

        return redirect()->route('projects.index')->with('success', 'Project created.');
    }

    public function edit(Project $project)
    {
        return Inertia::render('Projects/Edit', ['project' => $project]);
    }

    public function update(ProjectRequest $request, Project $project)
    {
        $data = $request->safe()->except('image');

        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $data['image_data'] = file_get_contents($file->getRealPath());
            $data['image_mime'] = $file->getMimeType();
            $data['image_path'] = null;
        }

        $project->update($data);

        return redirect()->route('projects.index')->with('success', 'Project updated.');
    }

    public function destroy($id)
    {
        Project::whereKey($id)->delete();

        return back()->with('success', 'Project deleted.');
    }

    public function image(Project $project)
    {
        abort_unless($project->image_data, 404);

        return response($project->image_data, 200, [
            'Content-Type'  => $project->image_mime,
            'Cache-Control' => 'public, max-age=86400',
        ]);
    }
}
