<?php

namespace App\Livewire\Web\Sections;

use App\Models\Category as ModelsCategory;
use Livewire\Component;
use Livewire\Attributes\On;

class Category extends Component
{
    public $categories;

    #[On('lang-changed')]
    public function mount()
    {
            $this->categories = ModelsCategory::where('status',1)->with('recipe')->get();

    }
    public function render()
    {
        return view('livewire.web.sections.category');
    }
}
