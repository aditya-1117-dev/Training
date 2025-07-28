<?php

namespace App\Livewire\Dashboard;

use App\Models\Trend;
use Livewire\Component;
use Livewire\Attributes\Layout;
use Livewire\WithFileUploads;

class Trending extends Component
{

    use WithFileUploads;

    #[Layout('layouts.master')]

    public $smTextmr, $smTexthn, $titlemr, $titlehn, $descmr, $deschn, $image, $img;

    public $alertIcon, $alertText, $modalName;

    public function mount()
    {
        $trend = Trend::find(1);
        $this->smTexthn = $trend->hn_smText;
        $this->smTextmr = $trend->mr_smText;
        $this->titlehn = $trend->hn_title;
        $this->titlemr = $trend->mr_title;
        $this->deschn =  $trend->hn_description;
        $this->descmr = $trend->mr_description;
        $this->img = $trend->image;




    }

    public function update()
    {
        if($this->image){
            $imagename = $this->image->getClientOriginalName();
            $this->image->storeAs('public/trending/', $imagename);

            Trend::where('id',1)->update([
                'image' => $imagename,
            ]);
        }


           Trend::where('id', 1)->update([
                'hn_smText'=> $this->smTexthn,
                'mr_smText'=> $this->smTextmr,
                'hn_title' => $this->titlehn,
                'mr_title' => $this->titlemr,
                'hn_description' => $this->deschn,
                'mr_description' => $this->descmr,

            ]);
            $this->mount();
            $this->alertIcon = 'success';
            $this->alertText = 'Team Section is updated';
            $this->notify();

    }

    public function saveblog()
    {

        // dd(count($this->platform));
        $validated = $this->validate([

            'image' => 'required |max:1024| mimes:jpg,jpeg,png'
        ],
        [

            'image.required' =>  'Image is required',
            'image.max' => "Image can't be more then 1MB",
            'image.mimes' => 'Image should be in .jpg, .jpeg, .png format only.'
        ]);

        if($validated){

        //     $image_name = $this->image->getClientOriginalName();
        //     $this->image->storeAs('public/slider/'.$image_name);

        //    ModelsSlider::create([
        //                         'date' => $this->date,
        //                         'topic' => $this->topic,
        //                         'title' => $this->itemtitle,
        //                         'description' => $this->itemdesc,
        //                         'status' => $this->status,
        //                         'image' => $image_name
        //                     ]);

            $this->alertIcon = 'success';
            $this->alertText = 'Blog created';

            $this->modalName = 'addslider';

            // $this->sliders = ModelsCategory::all();

            $this->closeModal();
            $this->notify();
        }
    }

    public function edit($id)
    {


        $this->modalName = 'editblog';
        $this->openModal();
    }

    public function notify()
    {
        $this->dispatch('alert', text: $this->alertText, icon: $this->alertIcon);
    }
    public function closeModal($name = '')
    {
        if($name != '')
        {
            $this->dispatch('close_modal', modalName:$name);
        }
        else{
            $this->dispatch('close_modal', modalName:$this->modalName);
        }

        $this->resetfeilds();
    }

    public function openModal()
    {

        $this->dispatch('open_modal', modalName:$this->modalName);

    }
    public function resetfeilds()
    {
        //
    }
    public function render()
    {
        return view('livewire.dashboard.trending');
    }
}
