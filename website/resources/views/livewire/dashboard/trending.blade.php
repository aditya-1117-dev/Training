<div>
    @livewire('dashboard.components.page-title', ['title' => 'Trends'])
    <div class="row mb-3" >
        <div class="col-12  d-flex justify-content-end" >
            {{-- <button class="btn btn-primary btn-sm" data-bs-toggle="modal"  data-bs-target ="#addslider" ">New</button> --}}
        </div>
    </div>
    <form wire:submit='update'>
        <div class="row mb-3">
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Small Title </label>
                    <input type="text" wire:model='smTextmr' placeholder="Small Title Marathi" class="form-control" required>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Small Title </label>
                    <input type="text" wire:model='smTexthn' placeholder="Small Title Hindi" class="form-control" required>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Title </label>
                    <input type="text" wire:model='titlemr' placeholder="Title Marathi" class="form-control" required>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Title </label>
                    <input type="text" wire:model='titlehn' placeholder="Title Hindi" class="form-control" required>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Description </label>
                   <textarea wire:model='descmr' cols="30" rows="5" placeholder="Descripiton Marathi" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Description </label>
                   <textarea wire:model='deschn' cols="30" rows="5" placeholder="Description Hindi" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-4">
                   <div class="image-box">
                    <img src="{{asset('storage/trending/'.$img)}}" alt="" srcset="" width="100%">
                   </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-4 ">
                    <label for="" class="form-label">Image <small class="text-danger"> Image size: 478px X 474px</small></label>
                 <input type="file" wire:model='image' class="form-control">
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
