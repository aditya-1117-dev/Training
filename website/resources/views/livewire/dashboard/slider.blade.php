<div>
    @livewire('dashboard.components.page-title', ['title' => 'Slider'])
    <div class="row mb-3" >
        <div class="col-12  d-flex justify-content-end" >
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal"  data-bs-target ="#addslider" ">New</button>
        </div>
    </div>
    <div class="row mb-3">
        @foreach ($sliders as $item)
        <div class="col-sm-12 col-xl-6">
            <!-- Simple card -->
            <div class="card">
                <img class="card-img-top img-fluid" src="{{asset('storage/slider/'.$item->image)}}"
                    alt="Card image cap">
                <div class="card-body">
                    <h4 class="card-title mb-2">{{$item->recipe[session()->get('lang').'_title']}}</h4>
                    <p class="card-text">{{$item->recipe[session()->get('lang').'_intro']}}</p>
                    <div class="text-end">
                        <a href="javascript:void(0);" class="btn btn-primary" wire:click="edit({{$item->id}})">Edit</a>
                    </div>
                </div>
            </div><!-- end card -->
        </div><!-- end col -->
        @endforeach


    </div><!-- end row -->
    <div wire:ignore.self class="modal fade" id="addslider" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-xl">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Recipe</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form wire:submit = 'save'>
                <div class="modal-body" style="overflow-y: scroll">
                    <div class="row g-3">
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Category <span class="text-danger">*</span></label>
                                <select wire:model="recipeId" class="form-control" name="category" required >
                                    <option value="">--Select Category--</option>
                                    @foreach ($recipes as $item)
                                        <option value="{{$item->id}}">{{$item->mr_title}}</option>
                                    @endforeach
                                </select>
                                @error('category')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Image  <span class="text-danger">*</span> <small class="text-danger"> Image size: 1920px X 914px</small></label>
                               <input type="file" class="form-control" wire:model="image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>
                </div>
            </form>
            </div>
        </div>
    </div>

    <div wire:ignore.self class="modal fade" id="editslider" tabindex="-1" aria-labelledby="exampleModalgridLabel">
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
                                <select wire:model="recipeId" class="form-control" name="category" required >
                                    <option value="">--Select Category--</option>
                                    @foreach ($recipes as $item)
                                        <option value="{{$item->id}}">{{$item->mr_title}}</option>
                                    @endforeach
                                </select>
                                @error('category')
                                    <span class="text-dandger">{{$message}}</span>
                                @enderror
                            </div>
                        </div>
                        <div class="col-sm-12 col-md-6 ">
                            <div class="form-group mb-3">
                                <label  class="form-label">Image <span class="text-danger">*</span> <small class="text-danger"> Image size: 1920px X 914px</small></label>
                               <input type="file" class="form-control" wire:model="image">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button  type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary bg-gradient">Submit</button>
                </div>
            </form>
            </div>
        </div>
    </div>
</div>
