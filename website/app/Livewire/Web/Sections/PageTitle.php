<?php

namespace App\Livewire\Web\Sections;

use Livewire\Component;
use Livewire\Attributes\On;

class PageTitle extends Component
{
    public $image='', $title='';

    // #[On('lang-changed')]
    public function mount($image, $title)
    {
        $this->image = $image;
        $this->title = $title;
    }

    public function render()
    {
        return view('livewire.web.sections.page-title');
    }
}
