<?php

namespace App\Livewire\Web\Sections;

use Livewire\Attributes\On;
use Livewire\Component;

class Footer extends Component
{

    #[On("lang-changed")]
    public function mount()
    {

    }
    public function render()
    {
        return view('livewire.web.sections.footer');
    }
}
