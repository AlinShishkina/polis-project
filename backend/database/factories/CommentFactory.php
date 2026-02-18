<?php

namespace Database\Factories;

use App\Models\Comment;
use App\Models\Article;
use Illuminate\Database\Eloquent\Factories\Factory;

class CommentFactory extends Factory
{
    protected $model = Comment::class;

    public function definition(): array
    {
        return [
            'article_id' => Article::factory(),
            'author_name' => $this->faker->name,
            'content' => $this->faker->paragraph,
            'created_at' => $this->faker->dateTimeBetween('-1 month'),
            'updated_at' => now(),
        ];
    }
}