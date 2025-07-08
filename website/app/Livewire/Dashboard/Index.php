<?php

namespace App\Livewire\Dashboard;

use Livewire\Component;
use Livewire\Attributes\Layout;
use Illuminate\Support\Facades\Artisan;

class Index extends Component
{

    #[Layout('layouts.master')]
    public function render()
    {
          

        
        return view('livewire.dashboard.index');
    }
}
