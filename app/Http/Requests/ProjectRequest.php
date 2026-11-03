<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true; // add auth checks here if you add login protection
    }

    public function rules(): array
    {
        $project = $this->route('project'); // null on create, the model on update

        return [
            'title'          => ['required', 'string', 'min:3', 'max:100',
                                 Rule::unique('projects', 'title')->ignore($project)],
            'category'       => ['required', Rule::in(['web', 'mobile'])],
            'description'    => ['required', 'string', 'min:20', 'max:500'],
            'tech_stack'     => ['required', 'string', 'max:150'],
            'project_url'    => ['nullable', 'url', 'max:255'],
            'repository_url' => ['nullable', 'url', 'max:255'],
            'image'          => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],
            'date_completed' => ['required', 'date', 'before_or_equal:today'],
            'display_order'  => ['required', 'integer', 'between:0,999'],
        ];
    }

    public function messages(): array
    {
        return [
            'title.unique'                => 'You already have a project with this title. Pick a different one.',
            'description.min'             => 'Describe the project in at least 20 characters.',
            'project_url.url'             => 'Enter a full link, starting with http:// or https://.',
            'repository_url.url'          => 'Enter a full link, starting with http:// or https://.',
            'image.max'                   => 'The image must be 2 MB or smaller.',
            'image.mimes'                 => 'The image must be a JPG, PNG or WEBP file.',
            'date_completed.before_or_equal' => 'The completion date cannot be in the future.',
            'display_order.between'       => 'Display order must be a whole number from 0 to 999.',
        ];
    }
}
