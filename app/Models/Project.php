<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    protected $fillable = [
        'title', 'category', 'description', 'tech_stack',
        'project_url', 'repository_url', 'image_path', 'image_data', 'image_mime',
        'date_completed', 'display_order',
    ];

    protected $hidden = ['image_data'];

    protected $casts = [
        'date_completed' => 'date:Y-m-d',
        'display_order'  => 'integer',
    ];

    protected $appends = ['image_url'];

    public function scopeWithoutImageData($query)
    {
        return $query->select(
            'id', 'title', 'category', 'description', 'tech_stack',
            'project_url', 'repository_url', 'image_path', 'image_mime',
            'date_completed', 'display_order', 'created_at', 'updated_at'
        );
    }

    public function getImageUrlAttribute(): ?string
    {
        if ($this->image_mime) {
            return route('projects.image', $this->id, false) . '?v=' . optional($this->updated_at)->timestamp;
        }

        if ($this->image_path && str_starts_with($this->image_path, 'images/')) {
            return asset($this->image_path);
        }

        return null;
    }
}
