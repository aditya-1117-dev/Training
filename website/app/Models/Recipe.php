<?php

namespace App\Models;

use App\Models\Slider;
use App\Models\Category;
use App\Models\Direction;
use App\Models\Instruction;
use App\Models\Ingredient;

use App\Models\Item;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Recipe extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function ingredient()
    {
        return $this->hasMany(Ingredient::class);
    }
    public function direction()
    {
        return $this->hasMany(Direction::class);
    }
    public function instruction()
    {
        return $this->hasMany(Instruction::class);
    }
    
    public function item()
    {
        return $this->hasMany(Item::class);
    }

    public function slider()
    {
        return $this->hasMany(Slider::class);
    }

}
