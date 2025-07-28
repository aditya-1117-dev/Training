<?php

namespace App\Livewire\Web\Sections;

use Livewire\Component;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Request;

class Product extends Component
{
    public $categories, $id, $query, $name;

    public function mount()
    {
        $this->name = Request::route()->getName();
        $this->categories = Category::where('status',1)->get();


    }

    public function search()
    {

        if($this->name !='recipes' ){
            // dd($this->name);

            $this->redirectRoute('recipes',[$this->id, $this->query]);
        }
        else{
            $this->dispatch('search-recipe', id: $this->id, query: $this->query);

        }
    }

    public function resetsearch()
    {
            $this->id = '';
            $this->query = '';
            $this->dispatch('search-recipe', id: $this->id, query: $this->query);
    }


    public function render()
    {
        return view('livewire.web.sections.product');
    }
}
