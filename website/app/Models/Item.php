<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


use App\Models\Recipe;
use App\Models\Direction;
use App\Models\Instruction;
use App\Models\Ingredient;

class Item extends Model
{
    use HasFactory;
    protected $guarded = [];
    
    
    
    public function recipe(){
        return $this->belongTo(Recipe::class);
    }
    
    public function ingredient(){
        return $this->hasMany(Ingredient::class);
    }
    public function direction(){
         return $this->hasMany(Direction::class);
    }
    public function instruction(){
         return $this->hasMany(Instruction::class);
    }
}