<div>
    @livewire('dashboard.components.page-title', ['title' => 'Recipe'])
    <div class="row mb-3">
        <div class="col-12  d-flex justify-content-end">
            <div class="form-group d-flex justify-content-center align-itens-center">
                {{-- <label for="" class="form-label">Sort</label> --}}

                <select wire:model.change='limit' class="form-control" style="width:100px; margin-right:10px" wire:change='loadmore' >
                    <option value="10">10</option>
                    <option value="25">25</option>
                    <option value="50">50</option>
                    <option value="75">75</option>
                    <option value="100">100</option>
                    <option value="0">All</option>
                </select>
            </div>

            <button class="btn btn-primary btn-sm " data-bs-toggle="modal" data-bs-target="#addrecipe">New</button>
        </div>
    </div>
    <div class="row mb-3">
        @foreach ($recipes as $item)
        <div class="col-sm-12 col-xl-4">
            <!-- Simple card -->
            <div class="card">
                <img class="card-img-top img-fluid" src="{{ asset('storage/recipe/'.$item->sm_image) }}"
                    alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title mb-2">{{$item->mr_title}}</h4>
                    <p class="card-text">{{$item->mr_intro}}.</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge  text-bg-{{$item->status == 1 ? "success": 'danger'}}" style="height: 20px">{{$item->status == 1 ? "Active": 'Inactive'}}</span>
                        <div class="text-end">
                            
                            @if (auth()->user()->role == 0)
                            
                                @if($item->type == 'combo')
                                    <div class = 'd-flex'>
                                        <button class="btn btn-primary btn-sm" style="margin-right:5px;" wire:click='edit({{$item->id}})' class="btn" >Edit</button>
                                
                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle btn-sm"  type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                                {{count($item->item) > 0 ? 'More': 'Add'}} 
                                            </button>
                                            
                                            <div class="dropdown-menu " aria-labelledby="dropdownMenuButton" >
                                                
                                            
                                                @if(count($item->item) > 0)
                                                     <button wire:click='editItem({{$item->id}})' class="btn " > Item</button>
                                                    <button wire:click='editItemIngredent({{$item->id}})' class="btn " > Ingredents</button>
                                                    <button wire:click='edititemDirection({{$item->id}})' class="btn " > Direction</button>
                                                    <button wire:click='edititemInstruction({{$item->id}})' class="btn " > Instruction</button>
                                                @else
                                                   <button class="btn btn-primary btn-sm "  wire:click='opensave({{$item->id}})'>Item</button>
                                                   
                                                @endif
                                            </div>
                                            
                                        </div>
                                        </div>
                                @else
                                <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle btn-sm" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                                                Edit 
                                            </button>
                                            <div class="dropdown-menu " aria-labelledby="dropdownMenuButton" >
                                                <button wire:click='edit({{$item->id}})' class="btn" >Recipe</button>
                                                <button wire:click='editIngredent({{$item->id}})' class="btn " > Ingredents</button>
                                               <button wire:click='editDirection({{$item->id}})' class="btn " > Direction</button>
                                                <button wire:click='editInstruction({{$item->id}})' class="btn " > Instruction</button>
                                            </div>
                                        </div>
                                 @endif
                              
                                    
                                    
                            @endif
                        </div>
                    </div>
                </div>
                <div class="card-footer ">
                    <div class="d-flex justify-content-between align-items-center">
                        @if($item->favourite)
                            <div class="tags fav" title="Favouite">F</div>
                        @endif
                        @if($item->entertain == 1)
                            <div class="tags entertain" title="Entertaining">E</div>
                        @endif
                        @if($item->trending)
                            <div class="tags trend" title="Trending">T</div>
                        @endif
                        @if($item->popular)
                            <div class="tags popular" title="Popular">P</div>
                        @endif
                        @if($item->veg)
                            <div class="tags veg" title="Veg">V</div>
                        @else
                            <div class="tags non_veg" title="Non Veg">N</div>
                        @endif
                    </div>
                </div>
            </div><!-- end card -->
        </div><!-- end col -->
        @endforeach


    </div><!-- end row -->



    {{--Add modals --}}

    <div wire:ignore.self class="modal fade" id="addrecipe" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Recipe</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form wire:submit = 'save'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                    <div class="row g-3">
                        <div class="col-sm-12 col-md-4 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Category <span class="text-danger">*</span></label>
                                <select wire:model="category" class="form-control" name="category" required >
                                    <option value="">--Select Category--</option>
                                    @foreach ($categories as $item)
                                        <option value="{{$item->id}}">{{$item->mr_name}}</option>
                                    @endforeach
                                </select>
                                @error('category')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Recipe Type {{$type}} <span class="text-danger">*</span></label>
                                <select wire:model="type" class="form-control" name="type" required >
                                    <option value="singel">Single</option>
                                    <option value="combo">Combo</option>

                                </select>
                                @error('status')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-4 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Status <span class="text-danger">*</span></label>
                                <select wire:model="status" class="form-control" name="status" required >
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>

                                </select>
                                @error('status')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Title (Marathi) <span class="text-danger">*</span> <small>Max 47 Charc.</small> </label>
                                <input wire:model="titleMarathi" type="text" class="form-control" name="titlemarathi" required />
                                @error('titleMarathi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Title (Hindi) <span class="text-danger">*</span></label>
                                <input wire:model='titleHindi'  type="text" class="form-control" name="titlehindi" required />
                                @error('titleHindi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Small Image <span class="text-danger">*</span><small class="text-danger"> Image size: 430px X 455px</small> </span></label>
                                <input wire:model='smImage' type="file" class="form-control" name="smimage" required />
                                @error('smImage')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Big Image <span class="text-danger">*</span><small class="text-danger"> Image size: 1100px X 500px</small></label>
                                <input wire:model = 'bigImage' type="file" class="form-control" name="bigimg" required />
                                @error('bigImage')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Intro (Marathi) <span class="text-danger">*</span> <small>Max 115 Charc.</small> </label>
                               <textarea wire:model = 'introMarathi' cols="30" rows="3" class="form-control" name="intromarathi" required ></textarea>
                                @error('introMarathi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Intro (Hindi) <span class="text-danger">*</span></label>
                               <textarea wire:model='introHindi' cols="30" rows="3" class="form-control" name="introhindi" required></textarea>
                                @error('introHindi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                      <div class="col-sm-12 col-md-12 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Descripition (Marathi) <span class="text-danger" maxlength="1500">*</span> </span> <small>Max 1500 Charc.</small></label>
                               <textarea wire:model='descMarathi' cols="30" rows="6" class="form-control" name="descmarathi" required ></textarea>
                                @error('descMarathi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Description (Hindi) <span class="text-danger" maxlength="1500">*</span></label>
                               <textarea wire:model='descHindi' cols="30" rows="6" class="form-control" name="deschindi" required ></textarea>
                                @error('descHindi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <hr>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Thumbnail<span class="text-danger">*</span><small class="text-danger"> Image size: 1000px X 550px</small></label>
                                <input wire:model='thumbnail' type="file" class="form-control" name="thumbnail"  />
                                @error('thumbnail')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">video <span class="text-danger">*</span></label>
                                <input wire:model='video' type="text" class="form-control" name="video"  />
                                @error('video')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <hr>
                        <div class="col-12 ">
                            <div class="form-group mb-3 d-flex justify-content-between">
                                <!-- Custom Checkboxes Color -->
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" value="1" id="formCheck11" name="veg" wire:model='veg' />
                                    <label class="form-check-label" for="formCheck11">
                                        Veg
                                    </label>
                                </div>
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" value="1" id="formCheck6" name="popular" wire:Model='popular' />
                                    <label class="form-check-label" for="formCheck6">
                                     Popular
                                    </label>
                                </div>
                                <div class="form-check form-check-secondary mb-3">
                                    <input class="form-check-input" type="checkbox" value="1" id="formCheck7" name='trending' wire:model='trending' />
                                    <label class="form-check-label" for="formCheck7">
                                        Trending
                                    </label>
                                </div>
                                <div class="form-check form-check-success mb-3">
                                    <input class="form-check-input" type="checkbox" value="1" id="formCheck8" name="entertaining" wire:mode ='entertaining' />
                                    <label class="form-check-label" for="formCheck8">
                                        Entertaining
                                    </label>
                                </div>
                                <div class="form-check form-check-warning mb-3">
                                    <input class="form-check-input" type="checkbox" value="1" id="formCheck9" name='fav' wire:model = 'favourite'/>
                                    <label class="form-check-label" for="formCheck9">
                                    Favourite
                                    </label>
                                </div>
                            </div>
                        </div>


                    </div>
                   
                   
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                    {{-- @if ($steps == 0)
                        <button type="button" class="btn btn-secondary" >Back</button>
                    @else
                        <button type="button" class="btn btn-info" wire:click='decrement' >Back</button>
                    @endif

                    @if ($steps < 2)
                    <button type="button" class="btn btn-warning" wire:click='increment' >Next </i></button>
                    @else
                    <button type="submit" class="btn btn-primary">Submit</button>
                    @endif --}}
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>

    {{-- Edit Modal --}}
    <div wire:ignore.self class="modal fade" id="editrecipe" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Recipe</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form wire:submit = 'update'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                    <div class="row g-3">
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Category <span class="text-danger">*</span></label>
                                <select wire:model="category" class="form-control" name="category" required >
                                    <option value="">--Select Category--</option>
                                    @foreach ($categories as $item)
                                        <option value="{{$item->id}}">{{$item->mr_name}}</option>
                                    @endforeach
                                </select>
                                @error('category')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Status <span class="text-danger">*</span></label>
                                <select wire:model="status" class="form-control" name="status" required >
                                    <option value="0">Inactive</option>
                                    <option value="1">Active</option>

                                </select>
                                @error('status')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Title (Marathi) <span class="text-danger">*</span></label>
                                <input wire:model="titleMarathi" type="text" class="form-control" name="titlemarathi" required />
                                @error('titleMarathi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Title (Hindi) <span class="text-danger">*</span></label>
                                <input wire:model='titleHindi'  type="text" class="form-control" name="titlehindi" required />
                                @error('titleHindi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Small Image <span class="text-danger">*</span> <small class="text-danger"> Image size: 430px X 455px</small></label>
                                <input wire:model='smImage' type="file" class="form-control" name="smimage"  />
                                @error('smImage')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Big Image <span class="text-danger">*</span> <small class="text-danger"> Image size: 1100px X 500px</small></label>
                                <input wire:model = 'bigImage' type="file" class="form-control" name="bigimg"  />
                                @error('bigImage')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>

                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Intro (Marathi) <span class="text-danger">*</span></label>
                               <textarea wire:model = 'introMarathi' cols="30" rows="3" class="form-control" name="intromarathi" required ></textarea>
                                @error('introMarathi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Intro (Hindi) <span class="text-danger">*</span></label>
                               <textarea wire:model='introHindi' cols="30" rows="3" class="form-control" name="introhindi" required></textarea>
                                @error('introHindi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                         <div class="col-sm-12 col-md-12 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Descripition (Marathi) <span class="text-danger">*</span></label>
                               <textarea wire:model='descMarathi' cols="30" rows="6" class="form-control" name="descmarathi" required ></textarea>
                                @error('descMarathi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-12 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Description (Hindi) <span class="text-danger">*</span></label>
                               <textarea wire:model='descHindi' cols="30" rows="6" class="form-control" name="deschindi" required ></textarea>
                                @error('descHindi')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div> 
                        <hr>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Thumbnail<span class="text-danger">*</span><small class="text-danger"> Image size: 1000px X 550px</small></label>
                                <input wire:model='thumbnail' type="file" class="form-control" name="thumbnail"  />
                                @error('thumbnail')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">video <span class="text-danger">*</span></label>
                                <input wire:model='video' type="text" class="form-control" name="video"  />
                                @error('video')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <hr>
                        <div class="col-12 ">
                            <div class="form-group mb-3 d-flex justify-content-between">
                                <!-- Custom Checkboxes Color -->
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox"  id="formCheck11" {{$veg?'checked':''}}  wire:model='veg' />
                                    <label class="form-check-label" for="formCheck11">
                                        Veg {{$veg}}
                                    </label>
                                </div>
                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" value="1"  id="formCheck6"  name="popular" {{$popular?'checked':''}} wire:model='popular' />
                                    <label class="form-check-label" for="formCheck6">
                                     Popular
                                    </label>
                                </div>
                                <div class="form-check form-check-secondary mb-3">
                                    <input class="form-check-input" type="checkbox" value="1"  id="formCheck7" name='trending' {{$trending ? 'checked':''}} wire:model='trending' />
                                    <label class="form-check-label" for="formCheck7">
                                        Trending
                                    </label>
                                </div>
                                <div class="form-check form-check-success mb-3">
                                    <input class="form-check-input" type="checkbox" value="1"   id="formCheck8" name="entertaining" {{$entertaining?'checked':''}} wire:model ='entertaining' />
                                    <label class="form-check-label" for="formCheck8">
                                        Entertaining
                                    </label>
                                </div>
                                <div class="form-check form-check-warning mb-3">
                                    <input class="form-check-input" type="checkbox" value="1"  id="formCheck9" name='fav' {{$favourite?'checked':''}}  wire:model = 'favourite'/>
                                    <label class="form-check-label" for="formCheck9">
                                    Favourite
                                    </label>
                                </div>
                            </div>
                        </div>


                    </div> 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                    {{-- @if ($steps == 0)
                        <button type="button" class="btn btn-secondary" >Back</button>
                    @else
                        <button type="button" class="btn btn-info" wire:click='decrement' >Back</button>
                    @endif

                    @if ($steps < 2)
                    <button type="button" class="btn btn-warning" wire:click='increment' >Next </i></button>
                    @else
                    <button type="submit" class="btn btn-primary">Submit</button>
                    @endif --}}
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
    {{-- Add Ingredent Modal --}}
        <div wire:ignore.self class="modal fade" id="addingredent" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Ingredents  ID: {{$recipeId}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'saveIngredent'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                    <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                                <h5>Ingredents  </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'addingredent'>+</button>
                            </div>

                            <div class="row">
                                @foreach ($ingredentCount as $item)
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <input type="text" placeholder="Ingredent Name (Marathi)" class="form-control"  name="ind[]" wire:model = 'ingredents.{{$loop->index}}' style="margin-right: 25px"/>
                                    <input type="text" placeholder="Ingredent Name (Hinid)" class="form-control"   wire:model = 'ingredents_hn.{{$loop->index}}' style="margin-right: 25px"/>
                                    @if ($loop->last and count($ingredientId) > 0)

                                        @if (count($ingredientId) >= count($ingredentCount))
                                         <button type="button"  wire:click = 'deleteIngredent( {{$loop->index}}, {{$ingredientId[$loop->index ]}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @else
                                         <button type="button"  wire:click = 'removeingredent( {{$loop->index}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @endif

                                    @else
                                    <button type="button"   class="btn btn-sm btn-light bg-gradient">-</button>

                                    @endif
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <hr>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
    {{-- Edit Ingredent Modal --}}
    <div wire:ignore.self class="modal fade" id="editingredent" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Ingredent</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'updateIngredent'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                    <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                                <h5>Ingredents  </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'addingredent'>+</button>
                            </div>

                            <div class="row">
                                @foreach ($ingredentCount as $item)
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <input type="text" placeholder="Ingredent Name (Marathi)" class="form-control"  name="ind[]" wire:model = 'ingredents.{{$loop->index}}' style="margin-right: 25px"/>
                                    <input type="text" placeholder="Ingredent Name (Hinid)" class="form-control"   wire:model = 'ingredents_hn.{{$loop->index}}' style="margin-right: 25px"/>
                                    @if ($loop->last and count($ingredientId) > 0)

                                        @if (count($ingredientId) >= count($ingredentCount))
                                         <button type="button"  wire:click = 'deleteIngredent( {{$loop->index}}, {{$ingredientId[$loop->index ]}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @else
                                         <button type="button"  wire:click = 'removeingredent( {{$loop->index}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @endif

                                    @else
                                    <button type="button"   class="btn btn-sm btn-light bg-gradient">-</button>

                                    @endif
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <hr>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
      {{-- Add Direction Modal --}}
        <div wire:ignore.self class="modal fade" id="adddirection" tabindex="-1" aria-labelledby="exampleModalgridLabel">
            <div class="modal-dialog modal-xl">
                <div class="modal-content ">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalgridLabel">Add Direection  ID: {{$recipeId}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                    </div>
                    <form wire:submit = 'saveDirection'>
                    <div class="modal-body" style="overflow-y: scroll">
                   
                        <div class="row">
                            <div class="col-12">
                                <div class="title d-flex justify-content-between align-items-center">
                                    <h5>Directions </h5>
                                    <button type="button" class="btn btn-sm btn-success" wire:click = 'adddirection'>+</button>
                                </div>
    
    
                                <div class="row">
                                    @foreach ($directionCount as $item)
                                        <div class="col-12 d-flex align-items-center mb-3">
                                            <textarea wire:model= 'directions.{{$loop->index}}' placeholder="Recipe Directions (Marathi)" cols="30" rows="5" class="form-control ckeditor-classic" name="dir[]"   style="margin-right: 25px"></textarea>
                                            <textarea wire:model= 'directions_hn.{{$loop->index}}' placeholder="Recipe Directions (Hindi)" cols="30" rows="5" class="form-control ckeditor-classic"   style="margin-right: 25px"></textarea>
                                            @if ($loop->last )
                                            
                                                @if ( count($directionId) >= count($directionCount))
                                                    <button type="button"  wire:click = 'deleteDirection({{$loop->index}}, {{$directionId[$loop->index]}})' class="btn btn-lg btn-danger bg-gradien">-</button>
        
                                                @else
                                                    <button type="button"  wire:click = 'removedirection({{$loop->index}})' class="btn btn-lg btn-danger bg-gradien">-</button>
        
                                                @endif
                                            @else
                                                <button type="button"   class="btn btn-lg btn-light bg-gradient" >-</button>
    
                                            @endif
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                     
                    </div>
                    <div class="modal-footer">
                        <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                        
                        <button type="submit" class="btn btn-primary bg-gradient">Submit</button>
    
    
                    </div>
                </form>
                </div>
            </div>
        </div>
    
    {{-- Edit Direction Modal --}}
    <div wire:ignore.self class="modal fade" id="editdirection" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Direction</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'updateDirection'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                       <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                                <h5>Directions </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'adddirection'>+</button>
                            </div>


                            <div class="row"> 
                                @foreach ($directionCount as $item)
                                    <div class="col-12 d-flex align-items-center mb-3">
                                        <textarea wire:model= 'directions.{{$loop->index}}' placeholder="Recipe Directions (Marathi)" cols="30" rows="5" class="form-control ckeditor-classic" name="dir[]"   style="margin-right: 25px"></textarea>
                                      
                                        <textarea wire:model= 'directions_hn.{{$loop->index}}' placeholder="Recipe Directions (Hindis)" cols="30" rows="5" class="form-control ckeditor-classic1"   style="margin-right: 25px"></textarea>
                                        @if ($loop->last and count($directionId) > 0)
                                        
                                            @if ( count($directionId) >= count($directionCount))
                                                <button type="button"  wire:click = 'deleteDirection({{$loop->index}}, {{$directionId[$loop->index]}})' class="btn btn-lg btn-danger bg-gradien">-</button>
    
                                            @else
                                                <button type="button"  wire:click = 'removedirection({{$loop->index}})' class="btn btn-lg btn-danger bg-gradien">-</button>
    
                                            @endif
                                        @else
                                            <button type="button"   class="btn btn-lg btn-light bg-gradient" >-</button>

                                        @endif
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
     {{-- Add Instruction Modal --}}
        <div wire:ignore.self class="modal fade" id="addinstruction" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Instruction  ID: {{$recipeId}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'saveIngredent'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                      <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                                <h5>Instructions  </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'addinstruction'>+</button>
                            </div>
                                  <div class="row">
                                @foreach ($instructionCount as $item)
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <input type="text" placeholder="Ingredent Name (Marathi)" class="form-control"  name="ind[]" wire:model = 'instructions.{{$loop->index}}' style="margin-right: 25px"/>
                                    <input type="text" placeholder="Ingredent Name (Hinid)" class="form-control"   wire:model = 'instructions_hn.{{$loop->index}}' style="margin-right: 25px"/>
                                    @if ($loop->last and count($ingredientId) > 0)

                                        @if (count($instructionsId) >= count($instructionCount))
                                         <button type="button"  wire:click = 'deleteInstruction( {{$loop->index}}, {{$instructionsId[$loop->index ]}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @else
                                         <button type="button"  wire:click = 'removeinstruction( {{$loop->index}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @endif

                                    @else
                                    <button type="button"   class="btn btn-sm btn-light bg-gradient">-</button>

                                    @endif
                                </div>
                                @endforeach
                            </div>

                            
                        </div>
                    </div>
                    <hr>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
    {{-- Edit Instructioon Modal --}}
    <div wire:ignore.self class="modal fade" id="editinstruction" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Instruction</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'updateInsturction'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                    <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                                <h5>Instructions  </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'addinstruction'>+</button>
                            </div>
                                  <div class="row">
                                @foreach ($instructionCount as $item)
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <input type="text" placeholder="Ingredent Name (Marathi)" class="form-control"  name="ind[]" wire:model = 'instructions.{{$loop->index}}' style="margin-right: 25px"/>
                                    <input type="text" placeholder="Ingredent Name (Hinid)" class="form-control"   wire:model = 'instructions_hn.{{$loop->index}}' style="margin-right: 25px"/>
                                    @if ($loop->last and count($ingredientId) > 0)

                                        @if (count($instructionsId) >= count($instructionCount))
                                         <button type="button"  wire:click = 'deleteInstruction( {{$loop->index}}, {{$instructionsId[$loop->index ]}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @else
                                         <button type="button"  wire:click = 'removeinstruction( {{$loop->index}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @endif

                                    @else
                                    <button type="button"   class="btn btn-sm btn-light bg-gradient">-</button>

                                    @endif
                                </div>
                                @endforeach
                            </div>

                            
                        </div>
                    </div>
                    <hr>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
    <!-- Item sectonss-->
    
    <div wire:ignore.self class="modal fade" id="additem" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Items  </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'saveItem()'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                    <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                                <h5>Item  </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'additem'>+</button>
                            </div>

                            <div class="row">
                                @foreach ($itemCount as $item)
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <input type="text" placeholder="Item Name (Marathi)" class="form-control"  name="ind[]" wire:model = 'item_name_mr.{{$loop->index}}' style="margin-right: 25px"/>
                                    <input type="text" placeholder="Item Name (Hinid)" class="form-control"   wire:model = 'item_name_hn.{{$loop->index}}' style="margin-right: 25px"/>
                                    @if ($loop->last)

                                         <button type="button"  wire:click = 'removeitem( {{$loop->index}} )' class="btn btn-sm btn-danger bg-gradient">-</button> 

                                    @else
                                    <button type="button"   class="btn btn-sm btn-light bg-gradient">-</button>

                                    @endif
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <hr>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
        
    <div wire:ignore.self class="modal fade" id="edititem" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Item  </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'updateItem'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                    <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                                <h5>Edit items  </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'additem'>+</button>
                            </div>

                            <div class="row">
                                @foreach ($itemCount as $item)
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <input type="text" placeholder="Item Name (Marathi)" class="form-control"  name="ind[]" wire:model = 'item_name_mr.{{$loop->index}}' style="margin-right: 25px"/>
                                    <input type="text" placeholder="Item Name (Hinid)" class="form-control"   wire:model = 'item_name_hn.{{$loop->index}}' style="margin-right: 25px"/>
                                    @if ($loop->last and count($itemId) > 0)
                                        @if (count($itemId) >= count($itemCount))
                                         <button type="button"  wire:click = 'deleteItem({{$loop->index}}, {{$itemId[$loop->index]}})' class="btn btn-sm btn-danger bg-gradient">-</button>
                                         @else
                                         <button type="button"  wire:click = 'removeitem( {{$loop->index}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @endif

                                    @else
                                    <button type="button"   class="btn btn-sm btn-light bg-gradient">-</button>

                                    @endif
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <hr>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
     {{-- Add Ingredent Modal --}}
        <div wire:ignore.self class="modal fade" id="additemingredent" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add  Iitem Ingredents  ID: {{$recipeId}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'saveitemIngredent'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                    <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                               <h5>Ingrediets</h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'addingredent'>+</button>
                            </div>

                            <div class="row">
                                @foreach ($ingredentCount as $item)
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <input type="text" placeholder="Ingredent Name (Marathi)" class="form-control"  name="ind[]" wire:model = 'ingredents.{{$loop->index}}' style="margin-right: 25px"/>
                                    <input type="text" placeholder="Ingredent Name (Hinid)" class="form-control"   wire:model = 'ingredents_hn.{{$loop->index}}' style="margin-right: 25px"/>
                                    @if ($loop->last and count($ingredientId) > 0)

                                        @if (count($ingredientId) >= count($ingredentCount))
                                         <button type="button"  wire:click = 'deleteIngredent( {{$loop->index}}, {{$ingredientId[$loop->index ]}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @else
                                         <button type="button"  wire:click = 'removeingredent( {{$loop->index}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @endif

                                    @else
                                    <button type="button"   class="btn btn-sm btn-light bg-gradient">-</button>

                                    @endif
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <hr>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
    {{-- Edit Ingredent Modal --}}
    <div wire:ignore.self class="modal fade" id="edititemingredent" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Item Ingredent</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'updateitemIngredent'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                    <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                                <h5>Iitem: <select wire:model="item_id" wire:change="getIngredients"> 
                                    <option>--Select Item--</option>
                                    @foreach($items as $it)
                                     <option value="{{$it->id}}">{{$it->mr_name}}</option>
                                    @endforeach
                                </select> </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'addingredent'>+</button>
                            </div>

                            <div class="row">
                                @foreach ($ingredentCount as $item)
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <input type="text" placeholder="Ingredent Name (Marathi)" class="form-control"  name="ind[]" wire:model = 'ingredents.{{$loop->index}}' style="margin-right: 25px"/>
                                    <input type="text" placeholder="Ingredent Name (Hinid)" class="form-control"   wire:model = 'ingredents_hn.{{$loop->index}}' style="margin-right: 25px"/>
                                    @if ($loop->last and count($ingredientId) > 0)

                                        @if (count($ingredientId) >= count($ingredentCount))
                                         <button type="button"  wire:click = 'deleteIngredent( {{$loop->index}}, {{$ingredientId[$loop->index ]}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @else
                                         <button type="button"  wire:click = 'removeingredent( {{$loop->index}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @endif

                                    @else
                                    <button type="button"   class="btn btn-sm btn-light bg-gradient">-</button>

                                    @endif
                                </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                    <hr>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
      {{-- Add Direction Modal --}}
        <div wire:ignore.self class="modal fade" id="additemdirection" tabindex="-1" aria-labelledby="exampleModalgridLabel">
            <div class="modal-dialog modal-xl">
                <div class="modal-content ">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalgridLabel">Add Direection  ID: {{$recipeId}}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                    </div>
                    <form wire:submit = 'saveDirection'>
                    <div class="modal-body" style="overflow-y: scroll">
                   
                        <div class="row">
                            <div class="col-12">
                                <div class="title d-flex justify-content-between align-items-center">
                                    <h5>Directions </h5>
                                    <button type="button" class="btn btn-sm btn-success" wire:click = 'adddirection'>+</button>
                                </div>
    
    
                                <div class="row">
                                    @foreach ($directionCount as $item)
                                        <div class="col-12 d-flex align-items-center mb-3">
                                            <textarea wire:model= 'directions.{{$loop->index}}' placeholder="Recipe Directions (Marathi)" cols="30" rows="5" class="form-control ckeditor-classic" name="dir[]"   style="margin-right: 25px"></textarea>
                                            <textarea wire:model= 'directions_hn.{{$loop->index}}' placeholder="Recipe Directions (Hindi)" cols="30" rows="5" class="form-control ckeditor-classic"   style="margin-right: 25px"></textarea>
                                            @if ($loop->last )
                                            
                                                @if ( count($directionId) >= count($directionCount))
                                                    <button type="button"  wire:click = 'deleteDirection({{$loop->index}}, {{$directionId[$loop->index]}})' class="btn btn-lg btn-danger bg-gradien">-</button>
        
                                                @else
                                                    <button type="button"  wire:click = 'removedirection({{$loop->index}})' class="btn btn-lg btn-danger bg-gradien">-</button>
        
                                                @endif
                                            @else
                                                <button type="button"   class="btn btn-lg btn-light bg-gradient" >-</button>
    
                                            @endif
                                        </div>
                                    @endforeach
                                </div>
                            </div>
                        </div>
                     
                    </div>
                    <div class="modal-footer">
                        <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                        
                        <button type="submit" class="btn btn-primary bg-gradient">Submit</button>
    
    
                    </div>
                </form>
                </div>
            </div>
        </div>
    
    {{-- Edit Direction Modal --}}
    <div wire:ignore.self class="modal fade" id="edititemdirection" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Direction</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'updateitemDirection'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                       <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                               <h5>Iitem: <select wire:model="item_id" wire:change="getDirections"> 
                                    <option>--Select Item--</option>
                                    @foreach($items as $it)
                                     <option value="{{$it->id}}">{{$it->mr_name}}</option>
                                    @endforeach
                                </select> </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'adddirection'>+</button>
                            </div>


                            <div class="row"> 
                                @foreach ($directionCount as $item)
                                    <div class="col-12 d-flex align-items-center mb-3">
                                        <textarea wire:model= 'directions.{{$loop->index}}' placeholder="Recipe Directions (Marathi)" cols="30" rows="5" class="form-control ckeditor-classic" name="dir[]"   style="margin-right: 25px"></textarea>
                                      
                                        <textarea wire:model= 'directions_hn.{{$loop->index}}' placeholder="Recipe Directions (Hindis)" cols="30" rows="5" class="form-control ckeditor-classic1"   style="margin-right: 25px"></textarea>
                                        @if ($loop->last and count($directionId) > 0)
                                        
                                            @if ( count($directionId) >= count($directionCount))
                                                <button type="button"  wire:click = 'deleteDirection({{$loop->index}}, {{$directionId[$loop->index]}})' class="btn btn-lg btn-danger bg-gradien">-</button>
    
                                            @else
                                                <button type="button"  wire:click = 'removedirection({{$loop->index}})' class="btn btn-lg btn-danger bg-gradien">-</button>
    
                                            @endif
                                        @else
                                            <button type="button"   class="btn btn-lg btn-light bg-gradient" >-</button>

                                        @endif
                                    </div>
                                @endforeach
                            </div>
                        </div>
                    </div>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
     {{-- Add Instruction Modal --}}
        <div wire:ignore.self class="modal fade" id="additeminstruction" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Instruction  ID: {{$recipeId}}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'saveIngredent'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                      <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                                <h5>Instructions  </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'addinstruction'>+</button>
                            </div>
                                  <div class="row">
                                @foreach ($instructionCount as $item)
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <input type="text" placeholder="Ingredent Name (Marathi)" class="form-control"  name="ind[]" wire:model = 'instructions.{{$loop->index}}' style="margin-right: 25px"/>
                                    <input type="text" placeholder="Ingredent Name (Hinid)" class="form-control"   wire:model = 'instructions_hn.{{$loop->index}}' style="margin-right: 25px"/>
                                    @if ($loop->last and count($ingredientId) > 0)

                                        @if (count($instructionsId) >= count($instructionCount))
                                         <button type="button"  wire:click = 'deleteInstruction( {{$loop->index}}, {{$instructionsId[$loop->index ]}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @else
                                         <button type="button"  wire:click = 'removeinstruction( {{$loop->index}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @endif

                                    @else
                                    <button type="button"   class="btn btn-sm btn-light bg-gradient">-</button>

                                    @endif
                                </div>
                                @endforeach
                            </div>

                            
                        </div>
                    </div>
                    <hr>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>
    
    {{-- Edit Instructioon Modal --}}
    <div wire:ignore.self class="modal fade" id="edititeminstruction" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Item Instruction</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" wire:click='resetfeilds'></button>
                </div>
                <form wire:submit = 'updateitemInsturction'>
                <div class="modal-body" style="overflow-y: scroll">
                  
                   
                    <div class="row">
                        <div class="col-12">
                            <div class="title d-flex justify-content-between align-items-center">
                                 <h5>Iitem: <select wire:model="item_id" wire:change="getInstruction"> 
                                    <option>--Select Item--</option>
                                    @foreach($items as $it)
                                     <option value="{{$it->id}}">{{$it->mr_name}}</option>
                                    @endforeach
                                </select> </h5>
                                <button type="button" class="btn btn-sm btn-success" wire:click = 'addinstruction'>+</button>
                            </div>
                                  <div class="row">
                                @foreach ($instructionCount as $item)
                                <div class="col-12 d-flex align-items-center mb-3">
                                    <input type="text" placeholder="Instruction (Marathi)" class="form-control"  name="ind[]" wire:model = 'instructions.{{$loop->index}}' style="margin-right: 25px"/>
                                    <input type="text" placeholder="Instruction (Hinid)" class="form-control"   wire:model = 'instructions_hn.{{$loop->index}}' style="margin-right: 25px"/>
                                    @if ($loop->last and count($instructionsId) > 0)

                                        @if (count($instructionsId) >= count($instructionCount))
                                         <button type="button"  wire:click = 'deleteInstruction( {{$loop->index}}, {{$instructionsId[$loop->index ]}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @else
                                         <button type="button"  wire:click = 'removeinstruction( {{$loop->index}} )' class="btn btn-sm btn-danger bg-gradient">-</button>
    
                                        @endif

                                    @else
                                    <button type="button"   class="btn btn-sm btn-light bg-gradient">-</button>

                                    @endif
                                </div>
                                @endforeach
                            </div>

                            
                        </div>
                    </div>
                    <hr>
                   
                 
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal" wire:click='resetfeilds'>Close</button>
                    
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>


                </div>
            </form>
            </div>
        </div>
    </div>

</div>
