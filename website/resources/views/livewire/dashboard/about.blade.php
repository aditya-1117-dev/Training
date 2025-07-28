<div>
    @livewire('dashboard.components.page-title', ['title' => 'About us'])
    <div class="row mb-3" >
        <div class="col-12  d-flex justify-content-end" >
            {{-- <button class="btn btn-primary btn-sm" data-bs-toggle="modal"  data-bs-target ="#addslider" ">New</button> --}}
        </div>
    </div>
    <form wire:submit='update'>
        <div class="row mb-3">

            <div class="col-sm-12 col-md-6 mb-3">
                <div class="form-group mb-4">
                   <div class="image-box">
                    <img src="{{asset('storage/about/'.$img1)}}" alt="" srcset="" width="50%">
                   </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 mb-3">
                <div class="form-group mb-4 ">
                    <label for="" class="form-label">Image One <small class="text-danger"> Image size: 502px X 502px</small></label>
                 <input type="file" wire:model='image_one' class="form-control">
                </div>
            </div>
            <div class="col-sm-12 col-md-6 mb-3">
                <div class="form-group mb-4">
                   <div class="image-box">
                    <img src="{{asset('storage/about/'.$img2)}}" alt="" srcset="" width="50%">
                   </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 mb-3">
                <div class="form-group mb-4 ">
                    <label for="" class="form-label">Image two <small class="text-danger"> Image size: 532px X 401px</small></label>
                 <input type="file" wire:model='image_two' class="form-control">
                </div>
            </div>

            <div class="col-sm-12 col-md-6 mb-3">
                <div class="form-group mb-3">
                    <label for="" class="form-label"> First Description <small>Marathi</small> </label>
                   <textarea wire:model='mr_desc_one' cols="30" rows="10" placeholder="Descripiton Marathi" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 mb-3">
                <div class="form-group mb-3">
                    <label for="" class="form-label">First Description <small>Hindi</small> </label>
                   <textarea wire:model='hn_desc_one' cols="30" rows="10" placeholder="Description Hindi" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 mb-3">
                <div class="form-group mb-3">
                    <label for="" class="form-label"> Second Description <small>Marathi</small> </label>
                   <textarea wire:model='mr_desc_two' cols="30" rows="10" placeholder="Descripiton Marathi" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-sm-12 col-md-6 mb-3">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Second Description <small>Hindi</small> </label>
                   <textarea wire:model='hn_desc_two' cols="30" rows="10" placeholder="Description Hindi" class="form-control"></textarea>
                </div>
            </div>


            <div class="col-12">
                <div class="form-group mb-3">
                    <div class="form-group d-flex justify-content-end align-items-center">
                        <button type="submit" class="btn btn-primary" >Update</button>
                    </div>
                </div>
            </div>

        </div><!-- end row -->
    </form>

</div>
