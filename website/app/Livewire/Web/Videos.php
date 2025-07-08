<?php

namespace App\Livewire\Web;

use App\Models\Recipe;
use Livewire\Component;
use Livewire\Attributes\On;

class Videos extends Component
{
    public $recipes;

    #[On('lang-changed')]
    public function mount()
    {
        $this->recipes = Recipe::where('status',1)->orderBy('id','desc')->with('category')->get();
    }

    public function render()
    {
        return view('livewire.web.videos');
    }
}
