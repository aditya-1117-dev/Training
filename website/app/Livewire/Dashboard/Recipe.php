<?php

namespace App\Livewire\Dashboard;

use App\Models\Category;
use App\Models\Direction as modelsDirection;
use App\Models\Ingredient;
use App\Models\Instruction;
use App\Models\Item;
use App\Models\Recipe as ModelsRecipe;
use Livewire\Component;
use Livewire\Attributes\Layout;
use Livewire\WithFileUploads;

class Recipe extends Component
{
    use WithFileUploads;
    #[Layout('layouts.master')]

    public $recipes, $recipeId, $type;
    public $categories, $category, $status=1, $titleHindi, $titleMarathi, $introHindi, $introMarathi, $descHindi, $descMarathi;
    public $smImage, $bigImage,$thumbnail, $video;
    public $popular = 0,$trending = 0, $entertaining = 0, $favourite = 0, $veg= 0;

    public $ingredientId, $ingredents, $ingredents_hn, $ingredentCount, $directionId, $directions, $directions_hn, $directionCount;
    
    public $instructionCount, $instructions, $instructionsId, $instructions_hn;

    public $alertIcon, $alertText, $modalName, $steps, $limit=10;
    
    public $itemId=[], $itemCount=[], $item_name_mr =[], $item_name_hn=[], $items=[], $item_id;

    public function mount()
    {
        $this->steps =0;
        $this->type = 'single';
        $this->ingredents = [];
        $this->directions =[];
        $this->ingredents_hn = [];
        $this->directions_hn =[];
        $this->ingredientId =[];
        $this->directionId =[];
        
        $this->instructionCount = [];
        $this->instructions=[];
         $this->instructions_hn=[];
        
        $this->instructionsId = [];
        
        
        $this->ingredentCount =['1'];
        $this->directionCount = ['1'];
        $this->recipes = ModelsRecipe::orderBy('id', 'desc')->limit($this->limit)->with('item')->get();
        // dd($this->recipes);
        $this->categories = Category::where('status',1)->get();
    }

    public function save()
    {
        
            // dd($this->type);

            $smImageName = $this->smImage->getClientOriginalName();
            $this->smImage->storeAs('public/recipe/', $smImageName);

            $bgImageName = $this->bigImage->getClientOriginalName();
            $this->bigImage->storeAs('public/recipe/', $bgImageName);

            $thumbName = $this->thumbnail->getClientOriginalName();
            $this->thumbnail->storeAs('public/recipe/', $thumbName); 

            $recipe =   ModelsRecipe::create([
                            'category_id'       => $this->category,
                            'mr_title'          => $this->titleMarathi,
                            'hn_title'          => $this->titleHindi,
                            'mr_intro'          => $this->introMarathi,
                            'hn_intro'          => $this->introHindi,
                            'mr_description'    => $this->descMarathi,
                            'hn_description'    => $this->descHindi,
                            'sm_image'          => $smImageName,
                            'big_image'         => $bgImageName,
                            'thumbnail'         => $thumbName,
                            'video'             => $this->video,
                            'type'              => $this->type,
                            'veg'               => $this->veg,
                            'popular'           => $this->popular,
                            'entertain'         => $this->entertaining,
                            'trending'         => $this->trending,
                            'status'           => $this->status,
                            'favourite'         => $this->favourite,
                        ]);
           
            $this->recipeId = $recipe->id;  
                
            session()->put('id', $recipe->id); 
       

            $this->alertIcon = 'success';
            $this->alertText = 'Recipe created';

            $this->modalName = 'addrecipe';

            $this->recipes = ModelsRecipe::all();

            $this->closeModal();
            $this->notify();
            
            
            $this->recipeId = session()->get('id');
            
            
            if($this->type == 'single'){
                
                $this->modalName = 'addingredent';  
                 $this->openModal();
            }
            
            
            // else if($this->type =='combo'){
                
            //      $this->modalName = 'additem';  
            // }
           
      
    }
    
    public function opensave($id)
    {
        $this->recipeId = $id;
        $this->modalName = 'additem';   
        $this->openModal();  
    }
    
    public function saveItem()
    {
       
        if(count($this->item_name_mr) > 0)
        {
            $i = 0;
            foreach($this->item_name_mr as $item){
                Item::create([
                    'recipe_id' => $this->recipeId,
                    'mr_name' => $item,
                    'hn_name' =>  $this->item_name_hn[ $i],

                ]);
                $i++;
            }
            
            
           
             
            $this->alertIcon = 'success';
            $this->alertText = 'Item created';

            $this->modalName = 'additem'; 

            $this->closeModal();
            
            $this->notify();
            
        
        }
    }
    
    public function saveIngredent(){
        
           
            
             if(count($this->ingredents) > 0)
            {
                $i = 0;
                foreach($this->ingredents as $item){
                    Ingredient::create([
                        'recipe_id' => $this->recipeId,
                        'mr_name' => $item,
                        'hn_name' =>  $this->ingredents_hn[$i],

                    ]);
                    $i++;
                }
            }
             
            
          
            session()->put('id', $this->recipeId);
             
            $this->alertIcon = 'success';
            $this->alertText = 'Ingredent created';

            $this->modalName = 'addingredent'; 

            $this->closeModal();
            
            $this->notify();
            
            $this->recipeId = session()->get('id');

            $this->modalName = 'adddirection';  
            $this->openModal();
           
            
          
      
            
        
    }
    
     public function saveitemIngredent(){
        
           
            
             if(count($this->ingredents) > 0)
            {
                $i = 0;
                foreach($this->ingredents as $item){
                    Ingredient::create([
                        'recipe_id' => $this->recipeId,
                        'item_id'=> $this->item_id,
                        'mr_name' => $item,
                        'hn_name' =>  $this->ingredents_hn[$i],

                    ]);
                    $i++;
                }
            }
             
            
          
            session()->put('id', $this->recipeId);
             
            $this->alertIcon = 'success';
            $this->alertText = 'Ingredent created';

            $this->modalName = 'addingredent'; 

            $this->closeModal();
            $this->notify();
            
            $this->recipeId = session()->get('id');

            $this->modalName = 'adddirection';  
            $this->openModal();
           
            
          
      
            
        
    }
    
    public function saveDirection(){
        
           
             if (count($this->directions) > 0)
            {

                $i = 0;
                foreach($this->directions as $item){

                    modelsDirection::create([
                        'recipe_id' => $this->recipeId,
                        'mr_description' => $item,
                        'hn_description' => $this->directions_hn[$i],
                    ]);
                    $i++;
                }
            }
            
            $this->alertIcon = 'success';
            $this->alertText = 'Direction created';

            $this->modalName = 'adddirection'; 

            $this->closeModal();
            $this->notify(); 
        
    }
    
    
    public function saveitemDirection(){
        
           
             if (count($this->directions) > 0)
            {

                $i = 0;
                foreach($this->directions as $item){

                    modelsDirection::create([
                        'recipe_id' => $this->recipeId,
                        'item_id' => $this->item_id,
                        'mr_description' => $item,
                        'hn_description' => $this->directions_hn[$i],
                    ]);
                    $i++;
                }
            }
            
            $this->alertIcon = 'success';
            $this->alertText = 'Direction created';

            $this->modalName = 'adddirection'; 

            $this->closeModal();
            $this->notify(); 
        
    }
    
    public function saveInstruction(){
        
           
            if (count($this->instructions) > 0)
                {
    
                    $i = 0;
                    foreach($this->instructions as $item){
    
                        Instruction::create([
                            'recipe_id' => $this->recipeId,
                            'mr_instruction' => $item,
                            'hn_instruction' => $this->instructions_hn[$i],
                        ]);
                        $i++;
                    }
                }
            
            $this->alertIcon = 'success';
            $this->alertText = 'Instruction created';
    
            $this->modalName = 'addinstruction'; 
    
            $this->closeModal();
            $this->notify(); 
        
    }
    
    public function saveitemInstruction(){
        
           
            if (count($this->instructions) > 0)
                {
    
                    $i = 0;
                    foreach($this->instructions as $item){
    
                        Instruction::create([
                            'recipe_id' => $this->recipeId,
                            'item_id' -> $this->item_id,
                            'mr_instruction' => $item,
                            'hn_instruction' => $this->instructions_hn[$i],
                        ]);
                        $i++;
                    }
                }
            
            $this->alertIcon = 'success';
            $this->alertText = 'Instruction created';
    
            $this->modalName = 'addinstruction'; 
    
            $this->closeModal();
            $this->notify(); 
        
    }
    
     

    public function edit($id)
    {


        $this->recipeId = $id;
        $this->ingredentCount = [];
        $this->directionCount = [];

        $recp = ModelsRecipe::with(['category','ingredient','direction'])->find($this->recipeId);
        // dd($recp);

        $this->category = $recp->category_id;
        $this->titleMarathi = $recp->mr_title;
        $this->titleHindi = $recp->hn_title;
        $this->introMarathi = $recp->mr_intro;
        $this->introHindi = $recp->hn_intro;
        $this->descMarathi = $recp->mr_description;
        $this->descHindi = $recp->hn_description;
        $this->video = $recp->video;

        if($recp->veg){

            $this->veg = $recp->veg;
        }

        if($recp->favourite){

            $this->favourite = $recp->favourite;
        }

        if( $recp->popular){

            $this->popular = $recp->popular;
        }
        if($recp->entertain){

            $this->entertaining = $recp->entertain;
        }
        if($recp->trending){

            $this->trending = $recp->trending;
        }
        $this->status = $recp->status;

        // dd($this->veg);

        // $this->ingredents = $recp->ingredient;

        foreach( $recp->ingredient as $item){
            array_push($this->ingredentCount, 1);

            array_push($this->ingredents, $item->mr_name);
            array_push($this->ingredents_hn, $item->hn_name);
            array_push($this->ingredientId, $item->id);



        }

        foreach($recp->direction as $item){

            array_push($this->directions, $item->mr_description);
            array_push($this->directions_hn, $item->hn_description);
            array_push($this->directionId, $item->id);

            array_push($this->directionCount, 1);

        }

        // dd($this->ingredents_hn[1]);



        $this->modalName = 'editrecipe';
        $this->openModal();
    }
    
  
    public function editIngredent($id){
        
        $this->recipeId = $id;
        $this->ingredentCount = [];
        
        
        $ingd =  Ingredient::where('recipe_id',  $this->recipeId )->get();
        
         foreach( $ingd as $item){
            array_push($this->ingredentCount, 1);

            array_push($this->ingredents, $item->mr_name);
            array_push($this->ingredents_hn, $item->hn_name);
            array_push($this->ingredientId, $item->id);



        }
        
        $this->modalName = 'editingredent';
        $this->openModal();
    } 
  
    
    public function editDirection($id){
        
        $this->recipeId = $id;
        $this->directionCount = [];
        
        
        $dir =  modelsDirection::where('recipe_id',  $this->recipeId )->get();
        
        foreach($dir as $item){

            array_push($this->directions, $item->mr_description);
            array_push($this->directions_hn, $item->hn_description);
            array_push($this->directionId, $item->id);

            array_push($this->directionCount, 1);

        }  
        
        $this->modalName = 'editdirection';
        $this->openModal();
    }
    
    public function editInstruction($id){
        
         $this->recipeId = $id;
        $this->instructionCount = [];
        
        
        $dir =  Instruction::where('recipe_id',  $this->recipeId )->get();
   
        
        foreach($dir as $item){ 
            //  dd($item->hn_instruction);
            array_push( $this->instructions, $item->mr_instruction );
            array_push( $this->instructions_hn, $item->hn_instruction );
            array_push( $this->instructionsId, $item->id );

            array_push($this->instructionCount, 1);

        }

        // dd($this->ingredents_hn[1]);



        $this->modalName = 'editinstruction';
        $this->openModal();
    }
    
    
      public function editItem($id){
        
        $this->recipeId = $id;
        $this->itemCount = [];
        
        
        $this->items =  Item::where('recipe_id',  $this->recipeId )->get();
        
      
        
         foreach( $this->items as $item){
            array_push($this->itemCount, 1);

            array_push($this->item_name_mr, $item->mr_name);
            array_push($this->item_name_hn, $item->hn_name);
            array_push($this->itemId, $item->id);



        }
        
        $this->modalName = 'edititem';
        $this->openModal();
    }     
    
    // item ingredients
    public function editItemIngredent($id){
        // dd('here');
        
        $this->recipeId = $id;
        $this->ingredentCount = [];
        
        
        $this->items =  Item::where('recipe_id',  $this->recipeId )->get();
        
        
        
        $this->modalName = 'edititemingredent';
        $this->openModal();
    }  
    
    public function getIngredients(){
        
        
        $this->ingredentCount = [];
        $this->ingredents =[];
        $this->ingredents_hn =[]; 
        $this->ingredientId =[];
        
        
        $items =  Ingredient::where('recipe_id',  $this->recipeId )->where('item_id', $this->item_id)->get();
        
         foreach( $items as $item){
            array_push($this->ingredentCount, 1);

            array_push($this->ingredents, $item->mr_name);
            array_push($this->ingredents_hn, $item->hn_name);
            array_push($this->ingredientId, $item->id);



        }
        
       
    } 
    
    
    // item Directions
      public function edititemDirection($id){
        
        $this->recipeId = $id;
        $this->directionCount = [];
        
         $this->items =  Item::where('recipe_id',  $this->recipeId )->get();
        
       
        $this->modalName = 'edititemdirection';
        $this->openModal();
    }
    
      public function getDirections(){
      
      
        $this->directionCount = [];
        $this->directions = [];
         $this->directions_hn = []; 
        $this->directionId = [];
        
        
        $dir =  modelsDirection::where('recipe_id',  $this->recipeId )->where('item_id', $this->item_id)->get();
        
        foreach($dir as $item){

            array_push($this->directions, $item->mr_description);
            array_push($this->directions_hn, $item->hn_description);
            array_push($this->directionId, $item->id);

            array_push($this->directionCount, 1);

        }  
        
      
    }
    
    // item Instruction
    public function edititemInstruction($id){
        
         $this->recipeId = $id;
        $this->instructionCount = [];
        
        
         $this->items =  Item::where('recipe_id',  $this->recipeId )->get();
   
         

        $this->modalName = 'edititeminstruction';
        $this->openModal();
    }
    
    public function getInstruction(){
        
        
        $this->instructionCount = [];
            $this->instructions = [];
        $this->instructions_hn = [];
        $this->instructionsId = [];
        
        
        $dir =  Instruction::where('recipe_id',  $this->recipeId )->where('item_id', $this->item_id)->get();
   
        
        foreach($dir as $item){ 
            //  dd($item->hn_instruction);
            array_push( $this->instructions, $item->mr_instruction );
            array_push( $this->instructions_hn, $item->hn_instruction );
            array_push( $this->instructionsId, $item->id );

            array_push($this->instructionCount, 1);

        } 
    }
    

    public function update()
    {

            // dd(count($this->ingredientId), $this->directionId);
            // dd($this->ingredents);

        if($this->smImage){
            
            // dd($this->smImage);
            $smImageName = $this->smImage->getClientOriginalName();
            $this->smImage->storeAs('public/recipe/', $smImageName);

            ModelsRecipe::where('id', $this->recipeId)->update([
                'sm_image'          => $smImageName,
            ]);

        }
        if($this->bigImage){
            $bgImageName = $this->bigImage->getClientOriginalName();
            $this->bigImage->storeAs('public/recipe/', $bgImageName);

            ModelsRecipe::where('id', $this->recipeId)->update([
                'big_image'         => $bgImageName,
            ]);

        }
        if($this->thumbnail){
            $thumbName = $this->thumbnail->getClientOriginalName();
            $this->thumbnail->storeAs('public/recipe/', $thumbName);

            ModelsRecipe::where('id', $this->recipeId)->update([
                'thumbnail'         => $thumbName,
            ]);

        }


        ModelsRecipe::where('id', $this->recipeId)->update([
            'category_id'       => $this->category,
            'mr_title'          => $this->titleMarathi,
            'hn_title'          => $this->titleHindi,
            'mr_intro'          => $this->introMarathi,
            'hn_intro'          => $this->introHindi,
            'mr_description'    => $this->descMarathi,
            'hn_description'    => $this->descHindi,
            'video'             => $this->video,
            'status'            => $this->status,
            
        ]);
        
        
         if($this->veg){

            ModelsRecipe::where('id', $this->recipeId)->update([
            
                'veg' => 1,
              
            ]);
        }
        else{
            
            ModelsRecipe::where('id', $this->recipeId)->update([
            
                'veg' => 0,
              
            ]);
        }

        if($this->favourite){

            ModelsRecipe::where('id', $this->recipeId)->update([
            
                'favourite' => 1,
              
            ]);
        }
        else{
             ModelsRecipe::where('id', $this->recipeId)->update([
            
                'favourite' => 0,
              
            ]);
        }

        if( $this->popular){

           ModelsRecipe::where('id', $this->recipeId)->update([
            
                'popular' => 1,
              
            ]);
        }
        else{
             ModelsRecipe::where('id', $this->recipeId)->update([
            
                'popular' => 0,
              
            ]);
        }
        if( $this->entertaining){

            ModelsRecipe::where('id', $this->recipeId)->update([
            
                'entertain' =>1,
              
            ]);
        }
        else{
             ModelsRecipe::where('id', $this->recipeId)->update([
            
                'entertain' =>0,
              
            ]);
        }
        
        if($this->trending){
 
             ModelsRecipe::where('id', $this->recipeId)->update([
            
                'trending' =>1,
              
            ]);
            
        }
        else{
            ModelsRecipe::where('id', $this->recipeId)->update([
            
                'trending' =>0,
              
            ]);
        }
 


        // if(count($this->ingredents) > 0)
        // {
        //     $i = 0;
        //     $a = 1;

        //     // dd($this->ingredents);

        //     foreach($this->ingredents as $item){

        //         // $ingredents_old = Ingredient::where('mr_name', $item)->where('hn_name' ,  $this->ingredents_hn[$i] )->get(); 
        //         $ingredents_old = Ingredient::where('id',  $item )->get();
                
        //         // dd($ingredents_old);

        //         if($a <= count($this->ingredientId)){
                 
        //             Ingredient::where('id', $this->ingredientId[$i])->update([
        //                 'mr_name' =>$this->ingredents[$i],
        //                 'hn_name' =>  $this->ingredents_hn[$i],
        //             ]);
        //         }
        //         else{
                   
        //             Ingredient::create([
        //                 'recipe_id' => $this->recipeId,
        //                 'mr_name' => $this->ingredents[$i],
        //                 'hn_name' =>  $this->ingredents_hn[$i],
        //             ]);
        //         }

        //         $i++;
        //         $a++;
        //     }
        // } 
        
        
       
        
        // if (count($this->directions) > 0)
        // {

        //     $i = 0;
        //     $a =1;
        //     foreach( $this->directions as $item){
        //         // $old_direction = modelsDirection::where('recipe_id' , $this->recipeId)->where('mr_description' , $item)->get();
                
        //         $old_direction = modelsDirection::where('id' , $item)->get();

        //         if($a <= count($this->directionId) )
        //         {
        //             modelsDirection::where('id',$this->directionId[$i])->update([
        //                  'mr_description' => $this->directions[$i],
        //                  'hn_description' => $this->directions_hn[$i],
        //              ]);
        //         }
        //         else{
        //             modelsDirection::create([
        //                 'recipe_id' => $this->recipeId,
        //                  'mr_description' => $this->directions[$i],
        //                  'hn_description' => $this->directions_hn[$i],
        //              ]);
        //         }

        //         $i++;
        //         $a++;
        //     }
        // }



        $this->modalName = 'editrecipe';
        $this->closeModal();
        $this->alertIcon = 'success';
        $this->alertText = 'Recipe updated';
        $this->notify();

    }
    
    
    public function updateItem(){
        
          if(count($this->item_name_mr) > 0)
            {
                $i = 0;
                $a = 1;
    
                // dd($this->ingredents);
    
                foreach($this->item_name_mr as $item){
                    
                    if($a <= count($this->itemId)){
                     
                        Item::where('id', $this->itemId[$i])->update([
                            'mr_name' =>$this->item_name_mr[$i],
                            'hn_name' =>  $this->item_name_hn[$i],
                        ]);
                    }
                    else{
                       
                        Item::create([
                            'recipe_id' => $this->recipeId, 
                            'mr_name' => $this->item_name_mr[$i],
                            'hn_name' =>  $this->item_name_hn[$i],
                        ]);
                    }
    
                    $i++;
                    $a++;
                }
            } 
        
        
        $this->modalName = 'edititem';
        $this->closeModal();
        $this->alertIcon = 'success';
        $this->alertText = 'Item updated';
        $this->notify();
    }
    
    public function updateitemIngredent(){
           
        if(count($this->ingredents) > 0)
            {
                $i = 0;
                $a = 1;
    
                // dd($this->ingredents);
    
                foreach($this->ingredents as $item){ 
    
                    if($a <= count($this->ingredientId)){
                     
                        Ingredient::where('id', $this->ingredientId[$i])->update([
                            'mr_name' =>$this->ingredents[$i],
                            'hn_name' =>  $this->ingredents_hn[$i],
                        ]);
                    }
                    else{
                       
                        Ingredient::create([
                            'recipe_id' => $this->recipeId,
                            'item_id'   => $this->item_id,
                            'mr_name' => $this->ingredents[$i],
                            'hn_name' =>  $this->ingredents_hn[$i],
                        ]);
                    }
    
                    $i++;
                    $a++;
                }
            } 
        
        
        $this->modalName = 'edititemingredent';
        $this->closeModal();
        $this->alertIcon = 'success';
        $this->alertText = 'Item Ingredent updated';
        $this->notify();
        
    }
    
    public function updateIngredent(){
           
        if(count($this->ingredents) > 0)
            {
                $i = 0;
                $a = 1;
    
                // dd($this->ingredents);
    
                foreach($this->ingredents as $item){
    
                    // $ingredents_old = Ingredient::where('mr_name', $item)->where('hn_name' ,  $this->ingredents_hn[$i] )->get(); 
                    $ingredents_old = Ingredient::where('id',  $item )->get();
                    
                    // dd($ingredents_old);
    
                    if($a <= count($this->ingredientId)){
                     
                        Ingredient::where('id', $this->ingredientId[$i])->update([
                            'mr_name' =>$this->ingredents[$i],
                            'hn_name' =>  $this->ingredents_hn[$i],
                        ]);
                    }
                    else{
                       
                        Ingredient::create([
                            'recipe_id' => $this->recipeId,
                            'mr_name' => $this->ingredents[$i],
                            'hn_name' =>  $this->ingredents_hn[$i],
                        ]);
                    }
    
                    $i++;
                    $a++;
                }
            } 
        
        
        $this->modalName = 'editingredent';
        $this->closeModal();
        $this->alertIcon = 'success';
        $this->alertText = 'Ingredent updated';
        $this->notify();
        
    }
    

    public function updateDirection(){
        
        
        if (count($this->directions) > 0)
        {

            $i = 0;
            $a =1;
            foreach( $this->directions as $item){ 
                
                if($a <= count($this->directionId) )
                {
                    modelsDirection::where('id',$this->directionId[$i])->update([
                         'mr_description' => $this->directions[$i],
                         'hn_description' => $this->directions_hn[$i],
                     ]);
                }
                else{
                    modelsDirection::create([
                        'recipe_id' => $this->recipeId,
                         'mr_description' => $this->directions[$i],
                         'hn_description' => $this->directions_hn[$i],
                     ]);
                }

                $i++;
                $a++;
            }
        }


        $this->modalName = 'editdirection';
        $this->closeModal();
        $this->alertIcon = 'success';
        $this->alertText = 'Direction updated';
        $this->notify();
        
    }
    public function updateitemDirection(){
        
        
        if (count($this->directions) > 0)
        {

            $i = 0;
            $a =1;
            foreach( $this->directions as $item){ 
                
                if($a <= count($this->directionId) )
                {
                    modelsDirection::where('id',$this->directionId[$i])->update([
                         'mr_description' => $this->directions[$i],
                         'hn_description' => $this->directions_hn[$i],
                     ]);
                }
                else{
                    modelsDirection::create([
                        'recipe_id' => $this->recipeId,
                        'item_id'       => $this->item_id,
                         'mr_description' => $this->directions[$i],
                         'hn_description' => $this->directions_hn[$i],
                     ]);
                }

                $i++;
                $a++;
            }
        }


        $this->modalName = 'edititemdirection';
        $this->closeModal();
        $this->alertIcon = 'success';
        $this->alertText = 'Direction updated';
        $this->notify();
        
    }
    
    public function updateInsturction(){
            
            
            if (count($this->instructions) > 0)
            {
    
                $i = 0;
                $a =1;
                foreach( $this->instructions as $item){ 
                    
                    if($a <= count($this->instructionsId) )
                    {
                        Instruction::where('id',$this->instructionsId[$i])->update([
                             'mr_instruction' => $this->instructions[$i],
                             'hn_instruction' => $this->instructions_hn[$i],
                         ]);
                    }
                    else{Instruction::create([
                            'recipe_id' => $this->recipeId,
                             'mr_instruction' => $this->instructions[$i],
                             'hn_instruction' => $this->instructions_hn[$i],
                         ]);
                    }
    
                    $i++;
                    $a++;
                }
            }
    
    
            $this->modalName = 'editinstruction';
            $this->closeModal();
            $this->alertIcon = 'success';
            $this->alertText = 'Instruction updated';
            $this->notify();
            
        }    
    
     public function updateitemInsturction(){
            
            
            if (count($this->instructions) > 0)
            {
    
                $i = 0;
                $a =1;
                foreach( $this->instructions as $item){ 
                    
                    if($a <= count($this->instructionsId) )
                    {
                        Instruction::where('id',$this->instructionsId[$i])->update([
                             'mr_instruction' => $this->instructions[$i],
                             'hn_instruction' => $this->instructions_hn[$i],
                         ]);
                    }
                    else{Instruction::create([
                            'recipe_id'         => $this->recipeId,
                            'item_id'           => $this->item_id,
                             'mr_instruction'   => $this->instructions[$i],
                             'hn_instruction'   => $this->instructions_hn[$i],
                         ]);
                    }
    
                    $i++;
                    $a++;
                }
            }
    
    
            $this->modalName = 'edititeminstruction';
            $this->closeModal();
            $this->alertIcon = 'success';
            $this->alertText = 'Instruction updated';
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
        
        $this->recipes = ModelsRecipe::all();
        $this->resetfeilds();
    }

    public function openModal()
    {

        $this->dispatch('open_modal', modalName:$this->modalName);

    }
    public function resetfeilds()
    {
        
        $this->category = '';
        $this->recipeId = '';
        // $this->type='';
        $this->titleMarathi = '';
        $this->titleHindi = '';
        $this->introMarathi = '';
        $this->introHindi = '';
        $this->descMarathi = '';
        $this->descHindi = '';
        $this->video = '';

        $this->ingredents =[];
          $this->ingredents_hn =[];
        $this->directions = [];
         $this->directions_hn = [];
        $this->ingredientId =[];
        $this->directionId = [];
        
        $this->item_name_mr = [];
        $this->item_name_hn = [];
        $this->itemId = [];
        $this->item_id = '';
        
        
        
        $this->instructionCount = [];
        $this->instructions = [];
        $this->instructions_hn = [];
        $this->instructionsId = [];
        
        
        $this->ingredentCount = [];
        $this->directionCount = [];
        

        $this->favourite = '';
        $this->entertaining = '';
        $this->veg = '';
        $this->trending = '';
        $this->popular = '';
      
    }

    public function increment()
    {
        if ($this->steps < 2) {
           $this->steps++;
        }

    }
    public function decrement()
    {
        if ($this->steps > 0) {
            $this->steps--;
         }
    }


    public function addingredent()
    {
        if($this->ingredentCount > 1)
        {
            array_push($this->ingredentCount, 1);
        }
    }

    public function removeingredent($index)
    {
        unset($this->ingredents[$index]);
        unset($this->ingredents_hn[$index]);
        unset($this->ingredentCount[$index]);
    }

    public function adddirection()
    {
        if($this->directionCount > 1)
        {
            array_push($this->directionCount, 1);
        }
    }

    public function removedirection($index)
    {
        unset($this->directions[$index]);
        unset($this->directions_hn[$index]);
        unset($this->directionCount[$index]);
    }
    
    
     public function addinstruction()
    {
        if($this->directionCount > 1)
        {
            array_push($this->instructionCount, 1);
        }
    }

    public function removeinstruction($index)
    {
        unset($this->instructions[$index]);
        unset($this->instructions_hn[$index]);
        unset($this->instructionCount[$index]);
    }
        // 
    
    
     public function additem()
    {
      
        if($this->itemCount > 1)
        {
            array_push($this->itemCount, 1);
        }
    }

    public function removeitem($index)
    {
        unset($this->item_name_mr[$index]);
        unset($this->item_name_hn[$index]);
        unset($this->itemCount[$index]);
    }
    

    public function validatefeilds()
    {
       $data = $this->validate([
            'category'      => 'required',
            'status'        => 'required',
            'titleHindi'    => 'required',
            'titleMarathi'  => 'required',
            'introHindi'    => 'required',
            'introMarathi'  => 'required',
            'descHindi'     => 'required',
            'descMarathi'   => 'required',
            'smImage'       => 'required',
            'bigImage'      => 'required',
            'thumbnail'     => 'required',
            'video'         => 'required',
        ],[
            'category.required'      => 'Category required',
            'status.required'        => 'Status required',
            'titleHindi.required'    => 'Hindi title required',
            'titleMarathi.required'  => 'Marathi title required',
            'introHindi.required'    => 'Hindi Intro required',
            'introMarathi.required'  => 'Marathi Intro required',
            'descHindi.required'     => 'Hindi description required',
            'descMarathi.required'   => 'Marathi description required',
            'smImage.required'       => 'Small Image required',
            'bigImage.required'      => ' Big image required',
            'thumbnail.required'     => 'Thumbnail required',
            'video.required'         => 'Video required',
        ]);
        
        
        return $data;

    }

    public function deleteIngredent($index , $id)
    {
        // dd($index, $id);
        Ingredient::where('id',$id)->delete();
        unset($this->ingredents[$index]);
        unset($this->ingredents_hn[$index]);
        unset($this->ingredentCount[$index]);

        $this->alertText = 'Ingredent Deleted';
        $this->alertIcon = 'success';

        $this->notify();


    }
    
      public function deleteDirection($index , $id)
    {
        // dd($index, $id);
        modelsDirection::where('id',$id)->delete();
        unset($this->directions[$index]);
        unset($this->directions_hn[$index]);
        unset($this->directionCount[$index]);

        $this->alertText = 'Direction Deleted';
        $this->alertIcon = 'success';

        $this->notify();


    }
    
       public function deleteInstruction($index , $id)
    {
        // dd($index, $id);
        Instruction::where('id',$id)->delete();
        unset($this->instructios[$index]);
        unset($this->instructions_hn[$index]);
        unset($this->instructionCount[$index]);

        $this->alertText = 'Instruction Deleted';
        $this->alertIcon = 'success';

        $this->notify();


    }
    
        public function deleteItem($index , $id)
    {
        // dd($index, $id);
        Item::where('id',$id)->delete();
        unset($this->item_name_mr[$index]);
        unset($this->item_name_hn[$index]);
        unset($this->itemCount[$index]);

        $this->alertText = 'Item Deleted';
        $this->alertIcon = 'success';

        $this->notify();


    }


    public function loadmore()
    {
        if($this->limit > 0){

            $this->recipes = ModelsRecipe::orderBy('id', 'desc')->limit($this->limit)->get();
        }
        else{
            $this->recipes = ModelsRecipe::orderBy('id', 'desc')->get();
        }
    }
    
    public function reload(){
          $this->js('window.location.reload()');
    }


    public function render()
    {
        return view('livewire.dashboard.recipe');
    }
}
