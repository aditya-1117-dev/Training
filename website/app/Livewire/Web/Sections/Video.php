<?php

namespace App\Livewire\Web\Sections;

use App\Models\Recipe;
use Livewire\Component;
use Livewire\Attributes\On;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;
use phpDocumentor\Reflection\Types\This;

class Video extends Component
{
    public $recipes;

    #[On('lang-changed')]
    public function mount()
    {
        if(Route::currentRouteName() == 'index'){
            $this->recipes = Recipe::where('status',1)->orderBy('id','desc')->with('category')->limit(2)->get();
        }
        else{

            $this->recipes = Recipe::where('status',1)->orderBy('id','desc')->with('category')->get();
        }

    }

    public function render()
    {
        return view('livewire.web.sections.video');
    }
}
