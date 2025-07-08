<?php

namespace App\Livewire\Web\Sections;

use Livewire\Component;
use Livewire\Attributes\On;

class Script extends Component
{
    #[On('lang-changed')]
    public function mount()
    {

    }
    public function render()
    {
        return view('livewire.web.sections.script');
    }
}
