<?php

namespace App\Livewire\Dashboard;

use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\Attributes\Layout;
use App\Models\Setting as ModelsSetting;

class Setting extends Component
{
    use WithFileUploads;

    #[Layout('layouts.master')]

    public $mr_title, $hn_title, $contact1, $contact2, $email1, $email2, $mr_address, $hn_address, $logo, $img;

    public $alertText, $alertIcon;

    public function mount()
    {
        $setting =  ModelsSetting::find(1);

        $this->mr_title = $setting->mr_title;
        $this->hn_title =  $setting->hn_title;
        $this->email1 = $setting->email;
        $this->email2 = $setting-> email2;
        $this->contact1 = $setting->contact;
        $this->contact2 = $setting->contact2;
        $this->mr_address =  $setting->mr_address;
        $this->hn_address = $setting->hn_address;
        $this->img  = $setting->logo;

    }

    public function update()
    {

        // dd($this->logo);
        if($this->logo)
        {
            $logoName = $this->logo->getClientOriginalName();
            $this->logo->storeAs('public/logo/',$logoName);

            ModelsSetting::where('id',1)->update([
                'logo' => $logoName,
            ]);


        }

        ModelsSetting::where('id',1)->update([

            'mr_title'      => $this->mr_title ,
            'hn_title'      => $this->hn_title ,
            'email'         => $this->email1 ,
             'email2'       => $this->email2 ,
            'contact'       => $this->contact1 ,
            'contact2'     => $this->contact2 ,
            'mr_address'     => $this->mr_address ,
            'hn_address'    => $this->hn_address ,
        ]);

        $this->alertIcon = 'success';
        $this->alertText = "Setting Updated";
        $this->logo='';
        $this->mount();
        $this->notify();
    }

    public function notify()
    {
        $this->dispatch('alert', text: $this->alertText, icon: $this->alertIcon);
    }

    public function render()
    {
        return view('livewire.dashboard.setting');
    }
}
