<?php

namespace App\Livewire\Dashboard\Components;

use Livewire\Component;

class PageTitle extends Component
{
    public $title;

    public function mount($title)
    {
        $this->title = $title;
    }
    public function render()
    {
        return view('livewire.dashboard.components.page-title');
    }
}
