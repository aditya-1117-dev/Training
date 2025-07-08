<div>
    <!-- start page title -->
    <div class="row">
        <div class="col-12">
            <div class="page-title-box d-sm-flex
                        align-items-center justify-content-between">
                <h4 class="mb-sm-0">Cooking Ticket</h4>

                <div class="page-title-right">
                    <ol class="breadcrumb m-0">
                        {{-- <li class="breadcrumb-item"><a href="javascript: void(0);">users</a></li> --}}
                        <li class="breadcrumb-item active">Users</li>
                    </ol>
                </div>

            </div>
        </div>
    </div>
    <!-- end page title -->



    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <h5 class="card-title mb-0 " > Users</h5>
                    <button type="button" class="btn btn-primary " data-bs-toggle="modal" data-bs-target="#adduser">Add</button>
                </div>
                <div class="card-body">
                    <table id="example"
                        class="table
                                table-bordered dt-responsive nowrap
                                table-striped align-middle"
                        style="width:100%">
                        <thead>
                            <tr >

                                <th class="text-center">Sr.No</th>
                                <th class="text-center">Category marathi</th>
                                <th class="text-center">Category Hindi</th>
                                <th class="text-center">Status</th>
                                <th class="text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($users as $item)
                            <tr>
                                <td>{{$loop->iteration}}</td>
                                <td>{{$item->name}}</td>
                                <td>{{$item->email}}</td>
                                <td><span class="badge text-bg-{{$item->status == 1 ? 'success' :'danger'}}">{{$item->status == 1 ? 'Active' :'Inactive'}}</span></td>
                                <td><button class="btn btn-primary btn-sm" wire:click=  'edit({{$item->id}})'>Edit</button></td>
                            </tr>
                            @endforeach

                        </tbody>
                    </table>
                </div>
            </div>
        </div><!--end col-->
    </div><!--end row-->

    {{-- add Modal --}}
    <!-- Default Modals -->

    <div id="adduser" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myModalLabel">Add User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                </div>
                <form wire:submit.prevent = 'save'>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Name </label>
                                    <input type="text" wire:model='name' required class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Email</label>
                                    <input type="text" wire:model='email' required class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Password</label>
                                    <input type="text" wire:model='password' required class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Status</label>
                                    <select wire:model='status' class="form-control">
                                        <option value="0">Inactive</option>
                                        <option value="1">Active</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Role</label>
                                    <select wire:model='role' class="form-control">
                                        <option value="0">Admin</option>
                                        <option value="1">User</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary ">Add</button>
                    </div>
                </form>

            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->

    {{-- edit Modal --}}
    <div id="edituser" class="modal fade" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="myModalLabel">Edit User</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                </div>
                <form wire:submit.prevent = 'update'>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Name </label>
                                    <input type="text" wire:model='name' required class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Email</label>
                                    <input type="text" wire:model='email' required class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Password</label>
                                    <input type="text" wire:model='password'  class="form-control">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-6">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Status</label>
                                    <select wire:model='status' class="form-control">
                                        <option value="0">Inactive</option>
                                        <option value="1">Active</option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-12">
                                <div class="form-group mb-3">
                                    <label for="" class="form-label">Role</label>
                                    <select wire:model='role' class="form-control">
                                        <option value="0">Admin</option>
                                        <option value="1">User</option>
                                    </select>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-light" data-bs-dismiss="modal">Close</button>
                        <button type="submit" class="btn btn-primary ">Update</button>
                    </div>
                </form>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</div>

