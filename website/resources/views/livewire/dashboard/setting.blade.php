<div>
    @livewire('dashboard.components.page-title', ['title' => 'Settings'])
    <div class="row mb-3" >
        <div class="col-12  d-flex justify-content-end" >
            {{-- <button class="btn btn-primary btn-sm" data-bs-toggle="modal"  data-bs-target ="#addslider" ">New</button> --}}
        </div>
    </div>
    <form wire:submit='update'>
        <div class="row mb-3">

            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Title </label>
                    <input type="text" wire:model='mr_title' placeholder="Title Marathi" class="form-control" required>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Title </label>
                    <input type="text" wire:model='hn_title' placeholder="Title Hindi" class="form-control" required>
                </div>
            </div>

            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Contat </label>
                    <input type="text" wire:model='contact1' placeholder="First Contact" class="form-control" required>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Contact </label>
                    <input type="text" wire:model='contact2' placeholder="Second Contact" class="form-control" required>
                </div>
            </div>

            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Email </label>
                    <input type="text" wire:model='email1' placeholder="First Email" class="form-control" required>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Email </label>
                    <input type="text" wire:model='email2' placeholder="Second Email" class="form-control" required>
                </div>
            </div>


            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Address </label>
                   <textarea wire:model='mr_address' cols="30" rows="5" placeholder="Address Marathi" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-3">
                    <label for="" class="form-label">Address </label>
                   <textarea wire:model='hn_address' cols="30" rows="5" placeholder="Address Hindi" class="form-control"></textarea>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-4">
                   <div class="image-box">
                    <img src="{{asset('storage/logo/'.$img)}}" alt="Logo" srcset="" width="100%">
                   </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-6">
                <div class="form-group mb-4 ">
                    <label for="" class="form-label">Image <small class="text-danger"> Image size: 1759px X 563px</small></label>
                 <input type="file" wire:model='logo' class="form-control">
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
