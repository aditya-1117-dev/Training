<?php

namespace App\Livewire\Dashboard;

use App\Models\Recipe;
use Livewire\Component;
use Livewire\WithFileUploads;
use Livewire\Attributes\Layout;
use App\Models\Slider as ModelsSlider;
use Livewire\Features\SupportNavigate\ThirdAssetPage;

class Slider extends Component
{
    use WithFileUploads;
    #[Layout('layouts.master')]

    public $sliders, $sliderId, $recipeId, $recipes, $image;
    public $alertIcon, $alertText, $modalName;

    public function mount()
    {
        $this->recipes = Recipe::where('status',1)->get();
        $this->sliders = ModelsSlider::with('recipe')->get();
    }

    public function save()
    {

        $imagename = $this->image->getClientOriginalName();
        $this->image->storeAs('public/slider/', $imagename);

        ModelsSlider::create([
            'recipe_id' => $this->recipeId,
            'image' => $imagename,
        ]);


        $this->alertIcon = 'success';
        $this->alertText = 'Slider created';

        $this->modalName = 'addslider';

        $this->sliders = ModelsSlider::all();

        $this->closeModal();
        $this->notify();
    }


    public function edit($id)
    {
       $this->sliderId = $id;

      $slider = ModelsSlider::find($this->sliderId);
        $this->recipeId = $slider->recipe_id;
        $this->image = $slider->iamge;

        $this->modalName = 'editslider';
        $this->openModal();
    }

    public function update()
    {

        if($this->image){
            $imagename = $this->image->getClientOriginalName();
            $this->image->storeAs('public/slider/', $imagename);

            ModelsSlider::where('id',$this->recipeId)->update([
                'image' => $imagename,
            ]);
        }


        ModelsSlider::where('id',$this->recipeId)->update([
            'recipe_id' => $this->recipeId,

        ]);


        $this->alertIcon = 'success';
        $this->alertText = 'Team Section is updated';
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

        $this->resetfeilds();
    }

    public function openModal()
    {

        $this->dispatch('open_modal', modalName:$this->modalName);

    }
    public function resetfeilds()
    {
        $this->image='';
        $this->recipeId='';
        $this->sliderId='';
    }
    public function render()
    {
        return view('livewire.dashboard.slider');
    }
}
