<?php

namespace App\Livewire\Dashboard;

use App\Models\Setting;
use Livewire\Component;

class SideBar extends Component
{
    public $setting;
    public function mount()
    {
        $this->setting = Setting::find(1);
    }
    public function render()
    {
        return view('livewire.dashboard.components.side-bar');
    }
}
