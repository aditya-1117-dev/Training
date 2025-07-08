<?php

namespace App\Livewire\Web;

use Livewire\Component;
use Illuminate\Support\Facades\Session;


class Index extends Component
{
    public function mount()
    {

    }
    public function render()
    {
        return view('livewire.web.index');
    }
}
