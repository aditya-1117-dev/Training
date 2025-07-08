<?php

namespace App\Livewire\Web;

use App\Models\Recipe;
use Livewire\Component;
use Livewire\Attributes\On;
use Livewire\WithPagination;

class Recipes extends Component
{
    use WithPagination;

    // public $recipes,
    public $id, $query, $count;
    public $limit = 10;

    #[On('lang-changed')]
    public function mount()
    {
        if($this->id){
            $this->count = Recipe::where('category_id',1)->where('status',1)->count();
        }
        else{
            $this->count = Recipe::where('status',1)->count();
        }
    }

    #[On('search-recipe')]
    public function search($id, $query)
    {
        $this->query = $query;
        $this->id =  $id;

        // dd($this->id);

    }

    public function newpost()
    {

        $this->limit = $this->limit+10;
        // $this->mount();
    }

    public function render()
    {
        return view('livewire.web.recipes',[
            'recipes'=> Recipe::where(function ($query)  {
                $query->where('category_id', $this->id)
                ->orWhere('mr_title', 'like', '%' . $this->query . '%')
                ->orWhere('hn_title', 'like', '%' .$this->query . '%')
                ->orWhere('mr_intro', 'like', '%' .$this->query . '%')
                ->orWhere('hn_intro', 'like', '%' .$this->query . '%')
                ->orWhere('mr_description', 'like', '%' .$this->query . '%')
                ->orWhere('hn_description', 'like', '%' .$this->query . '%');

            })
            ->where('status',1)
            ->take($this->limit)
        ->get()
        ]);
    }
}
