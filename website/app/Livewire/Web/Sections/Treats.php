<?php

namespace App\Livewire\Web\Sections;

use App\Models\Image;
use Livewire\Component;

class Treats extends Component
{
    public $sweet;

    public function mount()
    {
        $this->sweet = Image::where('type', 'sweet')->where('status',1)->get();
    }

    public function render()
    {
        return view('livewire.web.sections.treats');
    }
}
