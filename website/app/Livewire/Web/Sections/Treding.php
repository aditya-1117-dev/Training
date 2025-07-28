<?php

namespace App\Livewire\Web\Sections;

use App\Models\Trend;
use Livewire\Component;

class Treding extends Component
{

    public $trend;
    public function mount()
    {
        $this->trend = Trend::find(1);
    }
    public function render()
    {
        return view('livewire.web.sections.treding');
    }
}
