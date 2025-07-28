<div>
    @livewire('dashboard.components.page-title', ['title' => 'Slider'])
    <div class="row mb-3" >
        <div class="col-12  d-flex justify-content-end" >
            <button class="btn btn-primary btn-sm" data-bs-toggle="modal"  data-bs-target ="#addimage" ">New</button>
        </div>
    </div>
    <hr>
    <div class="row mb-3">
        <div class="d-flex mb-3 justify-content-between align-items-center w-100">
            <h3>Instagram</h3>
            <select wire:model.change='insta_limit' class="form-control" style="width:100px; margin-right:10px" wire:change='loadinsta' >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
                <option value="0">All</option>
            </select>
        </div>
        @foreach ($instagram as $item)
            <div class="col-sm-12 col-xl-4">
                <!-- Simple card -->
                <div class="card">
                    <img class="card-img-top img-fluid" src="{{asset('storage/images/'.$item->image)}}"
                        alt="Card image cap">
                    <div class="card-body">
                        <h4 class="card-title mb-2">{{$item[session()->get('lang').'_title']}}</h4>
                        {{-- <p class="card-text">{{$item[session()->get('lang').'_intro']}}</p> --}}
                        <div class="text-end">
                            <a href="javascript:void(0);" class="btn btn-primary" wire:click="edit({{$item->id}})">Edit</a>
                        </div>
                    </div>
                </div><!-- end card -->
            </div><!-- end col -->
        @endforeach
    </div><!-- end row -->
    <hr>
    <div class="row mb-3">
        <div class="d-flex mb-3 justify-content-between align-items-center w-100">
            <h3>Sweets</h3>
            <select wire:model.change='sweet_limit' class="form-control" style="width:100px; margin-right:10px" wire:change='loadsweet' >
                <option value="10">10</option>
                <option value="25">25</option>
                <option value="50">50</option>
                <option value="75">75</option>
                <option value="100">100</option>
                <option value="0">All</option>
            </select>
        </div>
        @foreach ($sweet as $item)
            <div class="col-sm-12 col-xl-4  ">
                <!-- Simple card -->
                <div class="card">
                    <img class="card-img-top img-fluid" src="{{asset('storage/images/'.$item->image)}}"
                        alt="Card image cap">
                    <div class="card-body">
                        <h4 class="card-title mb-2">{{$item[session()->get('lang').'_title']}}</h4>
                        {{-- <p class="card-text">{{$item[session()->get('lang').'_intro']}}</p> --}}
                        <div class="text-end">
                            <a href="javascript:void(0);" class="btn btn-primary" wire:click="edit({{$item->id}})">Edit</a>
                        </div>
                    </div>
                </div><!-- end card -->
            </div><!-- end col -->
        @endforeach
    </div><!-- end row -->
    <div wire:ignore.self class="modal fade" id="addimage" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-lg">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Add Images</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form wire:submit = 'save'>
                    <div class="modal-body" style="overflow-y: scroll">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label"> Type {{$type}}</label>
                                    <select wire:model.change="type" class="form-control">
                                        <option value="insta">Instagram</option>
                                        <option value="sweet">Sweet</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label"> Status</label>
                                    <select wire:model="status" class="form-control">
                                        <option value="0">Inactive</option>
                                        <option value="1">Active</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label"> Image <small class="text-danger">  size: 270px X 914px</small></label>
                                    <input type="file" wire:model='image'class='form-control' required>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label"> Insta Link</label>
                                    <input type="text" wire:model='link' class='form-control' {{$type == 'insta' ? '': 'disabled'}}>
                                </div>
                            </div>


                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label">Sweet Title <small> Marathi</small></label>
                                    <input type="text" wire:model='mr_title'class='form-control' {{$type == 'sweet' ? '': 'disabled'}}>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label"> Sweet Title <small> Hindi</small></label>
                                    <input type="text" wire:model='hn_title'class='form-control' {{$type == 'sweet' ? '': 'disabled'}}>
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

    <div wire:ignore.self class="modal fade" id="editimage" tabindex="-1" aria-labelledby="exampleModalgridLabel">
        <div class="modal-dialog modal-lg">
            <div class="modal-content ">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalgridLabel">Edit Images</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <form wire:submit = 'update'>
                    <div class="modal-body" style="overflow-y: scroll">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label"> Type {{$type}}</label>
                                    <select wire:model.change="type" class="form-control">
                                        <option value="insta">Instagram</option>
                                        <option value="sweet">Sweet</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label"> Status</label>
                                    <select wire:model="status" class="form-control">
                                        <option value="0">Inactive</option>
                                        <option value="1">Active</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label"> Image <small class="text-danger"> size: 270px X 914px</small></label>
                                    <input type="file" wire:model='image'class='form-control' required>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label"> Insta Link</label>
                                    <input type="text" wire:model='link' class='form-control' {{$type == 'insta' ? '': 'disabled'}}>
                                </div>
                            </div>


                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label">Sweet Title <small> Marathi</small></label>
                                    <input type="text" wire:model='mr_title'class='form-control' {{$type == 'sweet' ? '': 'disabled'}}>
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label  class="from-label"> Sweet Title <small> Hindi</small></label>
                                    <input type="text" wire:model='hn_title'class='form-control' {{$type == 'sweet' ? '': 'disabled'}}>
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
