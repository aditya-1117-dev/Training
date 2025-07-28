<?php

namespace App\Livewire\Web\Sections;

use App\Models\Category;
use Livewire\Component;

class Subscribe extends Component
{
    public $categories;

    public function mount()
    {
        $this->categories = Category::where('status',1)->orderBy('id','DESC')->limit(3)->get();
    }


    public function render()
    {
        return view('livewire.web.sections.subscribe');
    }
}
