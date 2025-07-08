<?php

namespace App\Livewire\Web\Sections;

use App\Models\Slider;
use Livewire\Component;

class Banner extends Component
{
    public $sliders;

    public function mount()
    {
        $this->sliders = Slider::where('status',1)->with('recipe')->orderBy('id','desc')->get();
    }
    public function render()
    {
        return view('livewire.web.sections.banner');
    }
}
