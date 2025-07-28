<?php

namespace App\Livewire\Web\Sections;

use Livewire\Component;
use Livewire\Attributes\On;

class Style extends Component
{

    #[On('lang-changed')]
    public function mount()
    {

    }
    public function render()
    {
        return view('livewire.web.sections.style');
    }
}
