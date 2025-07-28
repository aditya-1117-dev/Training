<?php

namespace App\Livewire\Web\Sections;

use App\Models\Image;
use Livewire\Component;

class Instagram extends Component
{

    public $insta;

    public function mount()
    {
        $this->insta = Image::where('type', 'insta')->where('status',1)->get();
    }

    public function render()
    {
        return view('livewire.web.sections.instagram');
    }
}
