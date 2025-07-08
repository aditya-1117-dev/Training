<?php

namespace App\Livewire\Web\Sections;

use App\Models\Recipe;
use Livewire\Component;

class CallToAction extends Component
{
    public $recipes;

    public function mount()
    {
        $this->recipes = Recipe::with('category')->orderBy('id','desc')->limit(2)->get();
    }

    public function render()
    {
        return view('livewire.web.sections.call-to-action');
    }
}
