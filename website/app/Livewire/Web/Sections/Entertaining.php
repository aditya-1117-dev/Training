<?php

namespace App\Livewire\Web\Sections;

use App\Models\Recipe;
use Livewire\Component;
use Livewire\Attributes\On;

class Entertaining extends Component
{
    public $recipes;

    #[On("lang-changed")]
    public function mount()
    {
        $this->recipes = Recipe::where('status',1)->where('entertain',1)->orderBy('id','DESC')->get();
    }

    public function render()
    {
        return view('livewire.web.sections.entertaining');
    }
}
