<?php

namespace App\Livewire\Dashboard;

use App\Models\About as ModelsAbout;
use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\Attributes\Layout;

class About extends Component
{
    use WithFileUploads;

    #[Layout('layouts.master')]

    public $image_one, $image_two, $mr_desc_one, $hn_desc_one, $mr_desc_two, $hn_desc_two, $img1, $img2;

    public $alertIcon, $alertText;

    public function mount()
    {
        $about = ModelsAbout::find(1);

        $this->mr_desc_one = $about->mr_desc_one;
        $this->hn_desc_one = $about->hn_desc_one;
        $this->mr_desc_two= $about->mr_desc_two;
        $this->hn_desc_two= $about->hn_desc_two;

        $this->img1 = $about->image_one;
        $this->img2 =  $about->image_two;

    }

    public function update()
    {
        if($this->image_one){
            $imagename = $this->image_one->getClientOriginalName();
            $this->image_one->storeAs('public/about/', $imagename);

            ModelsAbout::where('id',1)->update([
                'image_one' => $imagename,
            ]);
        }

        if($this->image_two){
            $imagename2 = $this->image_two->getClientOriginalName();
            $this->image_two->storeAs('public/about/', $imagename2);

            ModelsAbout::where('id',1)->update([
                'image_two' => $imagename2,
            ]);
        }



           ModelsAbout::where('id', 1)->update([
                'hn_desc_one'=> $this->hn_desc_one,
                'mr_desc_one'=> $this->mr_desc_one,
                'hn_desc_two'=> $this->hn_desc_two,
                'mr_desc_two'=> $this->mr_desc_two,
            ]);

            $this->mount();
            $this->alertIcon = 'success';
            $this->alertText = 'About Section is updated';
            $this->notify();

    }





    public function notify()
    {
        $this->dispatch('alert', text: $this->alertText, icon: $this->alertIcon);
    }
    public function render()
    {
        return view('livewire.dashboard.about');
    }
}
