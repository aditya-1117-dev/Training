<?php

namespace App\Livewire\Web;

use App\Models\About as ModelsAbout;
use Livewire\Component;

class About extends Component
{

    public $page_image, $page_title, $about;

    public function mount()
    {
        $this->page_image = '10.jpg';
        $this->page_title ='About Cooking Ticket';

        $this->about = ModelsAbout::find(1);


    }
    public function render()
    {
        return view('livewire.web.about');
    }
}
