<section class="product-form-section">
    <div class="auto-container">
        <div class="inner-container margin-top">

            <!-- Default Form -->
            <div class="default-form">
                <form wire:submit.prevent='search'>
                    <div class="clearfix">

                        <!-- Form Group -->
                        <div class="form-group col-lg-3 col-md-6 col-sm-12">
                            <select class="custom-select-box" id="category" wire:model='id'>
                                <option>Categories</option>
                                @foreach ($categories as $item)
                                    <option value="{{$item->id}}">{{$item[session()->get('lang').'_name']}}</option>
                                @endforeach
                            </select>
                        </div>

                        <!-- Form Group -->
                        <div class="form-group col-lg-6  col-md-6 col-sm-12">
                            <input type="text" name="text" placeholder="Recipe Kayword"  wire:model="query">
                        </div>

                        <div class="form-group col-lg-2 col-md-12 col-sm-12 ">
                            <button type="submit" class="theme-btn search-btn"  style="margin-right: 5px !important"><span class="fa fa-search">
                                    Search</span></button>
                        </div>
                        <div class="form-group col-lg-1 col-md-12 col-sm-12 p-3">
                            <span wire:click='resetsearch' style="cursor: pointer" class="text-danger">Reset</span>
                        </div>

                    </div>
                </form>
            </div>

        </div>
    </div>
</section>
