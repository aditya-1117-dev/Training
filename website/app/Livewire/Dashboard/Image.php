<?php

namespace App\Livewire\Dashboard;

use App\Models\Image as ModelsImage;
use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\Attributes\Layout;
use tidy;

class Image extends Component
{
    use WithFileUploads;
    #[Layout('layouts.master')]

    public $instagram, $sweet;

    public $hn_title, $mr_title, $image, $type, $status, $link, $imageId, $img;

    public $alertIcon, $alertText, $modalName, $insta_limit=6, $sweet_limit=6;

    public function mount()
    {
        $this->type = 'insta';
        $this->instagram = ModelsImage::where('type', 'insta')->orderBy('id', 'desc')->limit($this->insta_limit)->get();
        $this->sweet = ModelsImage::where('type', 'sweet')->orderBy('id', 'desc')->limit($this->sweet_limit)->get();
        // dd($this->sweet[0][session()->get('lang').'_title']);
    }

    public function save()
    {

        $imageName = $this->image->getClientOriginalName();
        $this->image->storeAs('public/images/', $imageName);

        ModelsImage::create([
            'type'=> $this->type,
            'mr_title' =>  $this->mr_title,
            'hn_title' => $this->hn_title,
            'status' => $this->status,
            'insta_link' => $this->link,
            'image' => $imageName,
        ]);

        $this->modalName='addimage';
        $this->alertIcon = 'success';
        $this->alertText = 'Iamge uploaded';
        $this->closeModal();
        $this->notify();



    }

    public function edit($id)
    {
        $this->imageId = $id;
        $image = ModelsImage::find($this->imageId);

        $this->mr_title = $image->mr_title;
        $this->hn_title = $image->hn_title;
        $this->status = $image->status;
        $this->type = $image->type;
        $this->link = $image->insta_link;
        $this->img = $image->iamge;

        $this->modalName= 'editimage';
        $this->openModal();
    }

    public function update()
    {
        if($this->image){
            $imageName = $this->image->getClientOriginalName();
            $this->image->storeAs('public/images/', $imageName);

            ModelsImage::where('id', $this->imageId)->update([
                'image' => $imageName,
            ]);
        }


        ModelsImage::where('id', $this->imageId)->update([
            'type'=> $this->type,
            'mr_title' =>  $this->mr_title,
            'hn_title' => $this->hn_title,
            'status' => $this->status,
            'insta_link' => $this->link,
        ]);

        $this->modalName='editimage';
        $this->alertIcon = 'success';
        $this->alertText = 'Image updatded  ';
        $this->closeModal();
        $this->notify();
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

        $this->instagram = ModelsImage::where('type', 'insta')->get();
        $this->sweet = ModelsImage::where('type', 'sweet')->get();

        $this->resetfeilds();
    }

    public function openModal()
    {

        $this->dispatch('open_modal', modalName:$this->modalName);

    }
    public function resetfeilds()
    {
       $this->mr_title ='';
       $this->hn_title = '';
       $this->link = '';
       $this->image = '';

    }

    public function loadinsta()
    {
        if($this->insta_limit > 0){

            $this->instagram = ModelsImage::where('type', 'insta')->orderBy('id', 'desc')->limit($this->insta_limit)->get();
        }
        else{
            $this->instagram = ModelsImage::where('type', 'insta')->orderBy('id', 'desc')->get();

        }
        $this->sweet = ModelsImage::where('type', 'sweet')->orderBy('id', 'desc')->limit($this->sweet_limit)->get();
    }
    public function loadsweet()
    {
        if($this->sweet_limit > 0){

            $this->sweet = ModelsImage::where('type', 'sweet')->orderBy('id', 'desc')->limit($this->sweet_limit)->get();
        }
        else{
            $this->sweet = ModelsImage::where('type', 'sweet')->orderBy('id', 'desc')->get();

        }
    }
    public function render()
    {
        return view('livewire.dashboard.image');
    }
}
