<?php

namespace App\Livewire\Web\Sections;

use App\Models\Setting;
use Livewire\Component;
use Livewire\Attributes\On;
use Illuminate\Support\Facades\Session;

class Header extends Component
{
    public $lang = 'mr', $setting;

    #[On("lang-changed")]
    public function mount()
    {

        $this->setting = Setting::find(1);
        // if (!session()->has('lang')) {
        //     Session::put('lang', $this->lang);
        // }

    }

    #[On("lang-changed")]
    public function changelang()
    {
        if (Session::get('lang') == 'hn') {
            Session::put('lang', 'mr');
        }
        else{
            Session::put('lang', 'hn');
        }
        $this->js('window.location.reload()');

    }

    // public function changelangtwo()
    // {
    //     if (Session::get('lang') == 'hn') {
    //         Session::put('lang', 'mr');
    //     }
    //     else{
    //         Session::put('lang', 'hn');
    //     }
    //     $this->dispatch('lang-changed');
    //     $this->js('window.location.reload()');

    // }


    public function render()
    {
        return view('livewire.web.sections.header');
    }
}
