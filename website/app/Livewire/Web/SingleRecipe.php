<?php

namespace App\Livewire\Web;

use App\Models\Recipe;
use Livewire\Component;

use App\Models\Direction;
use App\Models\Instruction;
use App\Models\Ingredient;
use Barryvdh\DomPDF\Facade\Pdf;

class SingleRecipe extends Component
{

    public $recipe, $recipes, $recipe_id;
    
    public $ingredients=[] , $directions =[], $instructions =[], $item=[], $item_id;

    public function mount($id)
    {
        $this->recipe_id = $id;
        $this->recipe = Recipe::with(['category','ingredient','direction','instruction', 'item'])->find($this->recipe_id);
        
        $this->ingredients = $this->recipe['ingredient']; 
        $this->directions =  $this->recipe->direction;   
        $this->instructions =  $this->recipe->instruction;   
        $this->item =  $this->recipe->item; 
        
        // dd(count($this->item) );
        
        if(count($this->item)> 0){
            $this->ingredients = $this->ingredients->where('item_id', $this->item[0]->id);
            $this->directions =  $this->directions->where('item_id', $this->item[0]->id);   
            $this->instructions =  $this->instructions->where('item_id', $this->item[0]->id);   
            $this->item_id = $this->item[0]->id;
        }
        
        $this->recipes =  Recipe::with('category')->orderBy('id','desc')->limit(3)->get();
        
        // dd($this->recipe);
    }

    public function download_recipe()
    {
        $pdf = Pdf::loadView('livewire.web.recipe_pdf');
        
        return $pdf->download('invoice.pdf');
    }
    
    public function getItem($id){
        
        $this->item_id = $id;
           

        
        $i = Ingredient::where('item_id', $id)->get();
        $d = Direction::where('item_id', $id)->get();
        $ins = Instruction::where('item_id', $id)->get();
        
        if(count($i) > 0)
        {
            $this->ingredients = $i; 
        } 
        
        if(count($d) > 0)
        {
            $this->directions = $d;
        }
        
        if(count($ins) > 0)
        {
            $this->instructions = $ins;
        }
    }

    public function render()
    {
        return view('livewire.web.single-recipe');
    }
}
