<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Article;
use App\Models\Comment;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Создаём 5 статей, у каждой от 0 до 5 комментариев
        Article::factory(5)
            ->has(Comment::factory()->count(random_int(0,5)))
            ->create();
    }
}