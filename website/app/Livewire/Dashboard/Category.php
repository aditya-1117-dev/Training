<?php

namespace App\Livewire\Dashboard;

use App\Models\Category as ModelsCategory;
use Livewire\Component;
use Livewire\Attributes\Layout;

class Category extends Component
{
    #[Layout('layouts.master')]

    public $categories, $categoryId, $mr_name, $hn_name, $status;
    public $alertIcon, $alertText, $modalName;

    public function mount()
    {
       $this->categories = ModelsCategory::all();


    }

    public function update()
    {
           ModelsCategory::where('id', $this->categoryId)->update([
                'mr_name'=> $this->mr_name,
                'hn_name' => $this->hn_name,
                'status' => $this->status,
            ]);

            $this->modalName = 'editcategory';
            $this->alertIcon = 'success';
            $this->alertText = 'Category updated';
            $this->closeModal();
            $this->notify();

    }

    public function save()
    {
        ModelsCategory::create([
            'mr_name'=> $this->mr_name,
            'hn_name' => $this->hn_name,
        ]);

        $this->alertIcon = 'success';
        $this->alertText = 'category created';
        $this->modalName = 'addcategory';

        $this->categories = ModelsCategory::all();

        $this->closeModal();
        $this->notify();

    }

    public function edit($id)
    {
        $this->categoryId  = $id;

        $category = ModelsCategory::find($this->categoryId);

        $this->mr_name =    $category->mr_name;
        $this->hn_name = $category->hn_name;
        $this->status =  $category->status;

        $this->modalName = 'editcategory';
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

        $this->categories = ModelsCategory::all();
        $this->resetfeilds();
    }

    public function openModal()
    {

        $this->dispatch('open_modal', modalName:$this->modalName);

    }
    public function resetfeilds()
    {
        $this->mr_name = '';
        $this->hn_name = '';
    }
    public function render()
    {
        return view('livewire.dashboard.category');
    }
}
