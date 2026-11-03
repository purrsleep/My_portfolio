<?php

namespace Tests\Feature;

use App\Models\Project;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class ProjectValidationTest extends TestCase
{
    use RefreshDatabase;

    private function valid(array $overrides = []): array
    {
        return array_merge([
            'title' => 'Weather App',
            'category' => 'web',
            'description' => 'A small weather app that shows the forecast for my city.',
            'tech_stack' => 'HTML, CSS, JavaScript',
            'project_url' => 'https://example.com',
            'repository_url' => 'https://github.com/purrsleep/weather',
            'date_completed' => '2026-10-01',
            'display_order' => 3,
        ], $overrides);
    }

    public function test_valid_data_is_saved(): void
    {
        $this->post('/admin/projects', $this->valid())->assertSessionHasNoErrors()->assertRedirect('/admin/projects');
        $this->assertDatabaseHas('projects', ['title' => 'Weather App']);
    }

    public function test_title_is_required(): void
    {
        $this->post('/admin/projects', $this->valid(['title' => '']))->assertSessionHasErrors('title');
    }

    public function test_title_must_be_at_least_3_characters(): void
    {
        $this->post('/admin/projects', $this->valid(['title' => 'ab']))->assertSessionHasErrors('title');
    }

    public function test_title_cannot_exceed_100_characters(): void
    {
        $this->post('/admin/projects', $this->valid(['title' => str_repeat('a', 101)]))->assertSessionHasErrors('title');
    }

    public function test_title_must_be_unique_on_create(): void
    {
        Project::create($this->valid());
        $this->post('/admin/projects', $this->valid())->assertSessionHasErrors('title');
    }

    public function test_title_unique_rule_ignores_current_record_on_update(): void
    {
        $project = Project::create($this->valid());
        $this->put("/admin/projects/{$project->id}", $this->valid(['display_order' => 9]))
            ->assertSessionHasNoErrors();
    }

    public function test_title_unique_rule_still_blocks_another_projects_title(): void
    {
        Project::create($this->valid());
        $other = Project::create($this->valid(['title' => 'Other Project']));
        $this->put("/admin/projects/{$other->id}", $this->valid())->assertSessionHasErrors('title');
    }

    public function test_category_must_be_web_or_mobile(): void
    {
        $this->post('/admin/projects', $this->valid(['category' => 'desktop']))->assertSessionHasErrors('category');
    }

    public function test_description_must_be_at_least_20_characters(): void
    {
        $this->post('/admin/projects', $this->valid(['description' => 'Too short']))->assertSessionHasErrors('description');
    }

    public function test_project_url_must_be_a_valid_url(): void
    {
        $this->post('/admin/projects', $this->valid(['project_url' => 'not a url']))->assertSessionHasErrors('project_url');
    }

    public function test_urls_are_optional(): void
    {
        $this->post('/admin/projects', $this->valid(['project_url' => '', 'repository_url' => '']))
            ->assertSessionHasNoErrors();
    }

    public function test_completion_date_cannot_be_in_the_future(): void
    {
        $this->post('/admin/projects', $this->valid(['date_completed' => now()->addDay()->toDateString()]))
            ->assertSessionHasErrors('date_completed');
    }

    public function test_display_order_must_be_an_integer(): void
    {
        $this->post('/admin/projects', $this->valid(['display_order' => 'first']))->assertSessionHasErrors('display_order');
    }

    public function test_display_order_must_be_between_0_and_999(): void
    {
        $this->post('/admin/projects', $this->valid(['display_order' => 1000]))->assertSessionHasErrors('display_order');
    }

    public function test_image_must_be_an_image_file(): void
    {
        Storage::fake('public');
        $pdf = UploadedFile::fake()->create('notes.pdf', 100, 'application/pdf');
        $this->post('/admin/projects', $this->valid(['image' => $pdf]))->assertSessionHasErrors('image');
    }

    public function test_image_cannot_exceed_2mb(): void
    {
        Storage::fake('public');
        $big = UploadedFile::fake()->create('big.jpg', 3000, 'image/jpeg');
        $this->post('/admin/projects', $this->valid(['image' => $big]))->assertSessionHasErrors('image');
    }
}
