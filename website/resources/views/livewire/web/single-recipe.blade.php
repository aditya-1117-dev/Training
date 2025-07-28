<div>
    
    <!-- Page Title -->
    <section class="page-title" style="background-image:url({{ asset('web/assets/images/background/12.png') }})">
        <div class="auto-container">
            <h1>{{ $recipe->category[session()->get('lang') . '_name'] }}</h1>
        </div>
    </section>
    <!--End Page Title-->

    <!--Sidebar Page Container-->
    <div class="sidebar-page-container recipes-details-area">
        <div class="auto-container">
            <div class="row clearfix">
                <!-- Content Side -->
                <div class="content-side col-lg-12 col-md-12 col-sm-12">
                    <div class="recipe-detail">
                        <div class="inner-box">
                            <div class="image">
                                <img src="{{ asset('storage/recipe/' . $recipe->big_image) }}" alt="" />
                            </div>
                            <div class="content"
                                style="background-image:url({{ asset('web/assets/images/background/13.png') }})">
                                <div class="author-image">
                                    @if ($recipe->veg == 1)
                                        <img src="{{ asset('web/assets/images/veg.png') }}" alt=""
                                            width="40px" />
                                    @else
                                        <img src="{{ asset('web/assets/images/non_veg.png') }}" alt=""
                                            width="40px" />
                                    @endif

                                </div>
                                <div class="category">{{ $recipe->category[session()->get('lang') . '_name'] }}</div>
                                <h2> </h2>
                                <div class="post">{{ $recipe->created_at->diffForHumans() }} <span>By :
                                        {{ config('app.name') }}</span></div>
                                <div class="rating">
                                    <button type="button" class="btn btn-sm btn-rounded" id="print_btn""><i
                                            class="fa fa-download"></i> Download Recipe</a>
                                </div>

                                <div class="text">{{ $recipe[session()->get('lang') . '_intro'] }}</div>

                            </div>
                            {{-- <div class="text">Good Food sounds like the name of an amazingly delicious food delivery service, but don't be fooled. The blog is actually a compilation of recipes, cooking videos, and nutrition tips</div> --}}

                            <div class="row clearfix">

                                <div class="column col-lg-12">

                                    <div class="my-tab">
                                        <ul class="nav nav-pills mb-3" id="pills-tab" role="tablist">
                                            <li class="nav-item">
                                                <a class="nav-link active" id="pills-home-tab" data-toggle="pill"
                                                    href="#pills-home" role="tab" aria-controls="pills-home"
                                                    aria-selected="true">Description</a>
                                            </li>
                                            <li class="nav-item">
                                                <a class="nav-link" id="pills-profile-tab" data-toggle="pill"
                                                    href="#pills-profile" role="tab" aria-controls="pills-profile"
                                                    aria-selected="false">See Video</a>
                                            </li>
                                            <li class="nav-item">
                                                {{-- <a class="nav-link" id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">Reviews</a> --}}
                                            </li>
                                        </ul>
                                       
                                        <div class="tab-content" id="pills-tabContent">
                                        
                                       
                                            <div class=" tab-pane fade show active " id="pills-home" role="tabpanel"
                                                aria-labelledby="pills-home-tab">
                                                 
                                                <div class="row ">
                                                   <div class="col-lg-12">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="discription-para">
                                                                    <img src="{{ asset('storage/recipe/'. $recipe->sm_image) }}"
                                                                        alt=""> 
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="discription-para">
                                                                    <h4>{{ $recipe[session()->get('lang') . '_intro'] }}
                                                                    </h4>
                                                                    <p>{{ $recipe[session()->get('lang') . '_description'] }}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> 
                                                     @if(count($item) > 0)
                                                    <div class="row">
                                                        <div class="col-12 mb-3">
                                                        
                                                            <h5 class="mb-2">Recipe Item</h5>
                                                            
                                                                <ul class="d-flex " >
                                                                @foreach($recipe->item as $item)
                                                                     <li class="nav-item" style="margin-right: 5px;">
                                                                        <button wire:click='getItem({{$item->id}})' class="btn {{$item->id == $item_id ? "active_item" : "" }}" style=" min-width:150px;  height:60px;border: 1px solid lightgrey; color:#000; font-size: 1.5rem">{{ $item[session()->get('lang') . '_name'] }}</button>
                                                                     </li>
                                                                
                                                                @endforeach
                                                            </ul>
                                                        </div>
                                                    </div>
                                                    @endif
                                                    @if(count($ingredients) > 0 )
                                                    <div class="row printarea w-100">
                                                        <div class="col-sm-12  col-md-6">
                                                            <!-- Ingredients Block -->
                                                            <div class="ingredients-block">
                                                                <div class="block-inner">
                                                                    <h4>Ingredients</h4>
                                                                    <ul class="ingredients-list">
                                                                        @foreach ($ingredients as $item)
                                                                            <li> <span>{{ $loop->iteration }}</span>
                                                                                {{ $item[session()->get('lang') . '_name'] }}
                                                                            </li>
                                                                        @endforeach
                                                                    </ul>
                                                                </div>
                                                            </div>
 
                                                        </div>
                                                        <div class="col-sm-12 col-md-6">
                                                            <!-- Ingredients Block -->
                                                            <div class="ingredients-block">
                                                                <div class="block-inner">
                                                                    <h4>Directions</h4>
                                                                    <ul class="direction-list">

                                                                        @foreach ($directions as $item)
                                                                            <li>
                                                                                <span>{{ $loop->iteration }}</span>
                                                                                <br>
                                                                                {{ $item[session()->get('lang') . '_description'] }}.
                                                                            </li>
                                                                        @endforeach


                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-sm-12  "> 
                                                           
                                                            <!-- Nutrition Block -->
                                                            <div class="ingredients-block d-none-sm">
                                                                <div class="block-inner">
                                                                  <h4>Instructions</h4>
                                                                    <ul class="ingredients-list">
                                                                        @foreach ($instructions as $item)
                                                                            <li> <span>{{ $loop->iteration }}</span>
                                                                                {{ $item[session()->get('lang') . '_instruction'] }}
                                                                            </li>
                                                                        @endforeach
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    @endif
                                                </div>
                                            </div>
                                            <div class="tab-pane fade" id="pills-profile" role="tabpanel"
                                                aria-labelledby="pills-profile-tab">
                                                <!-- Video Boxed -->
                                                <div class="video-boxed">
                                                    <!-- Video Box Two -->
                                                    <div class="video-box-two">
                                                        <div class="image">
                                                            <img src="{{ asset('storage/recipe/' . $recipe->thumbnail) }}"
                                                                alt="" />
                                                            <a href="{{ $recipe->video }}"
                                                                class="lightbox-image overlay-box"><span
                                                                    class="flaticon-media-play-symbol"><i
                                                                        class="ripple"></i></span></a>

                                                        </div>
                                                    </div>
                                                </div>
                                                <!--post-share-options-->
                                                <div class="post-share-options">
                                                    <div class="post-share-inner clearfix">
                                                        <div class="pull-left tags">
                                                            <span class="fa fa-share"> </span>
                                                            <a href="https://www.facebook.com" target="_blank">Facebook
                                                                .</a>
                                                            <a href="https://www.youtube.com" target="_blank">Youtube
                                                                .</a>
                                                            {{-- <a href="#" target="_blank">Linkein .</a>
                                                              <a href="#" target="_blank">Pinterest .</a> --}}
                                                            <a href="https://www.instagram"
                                                                target="_blank">Instragram</a>
                                                        </div>
                                                        <div class="pull-right">
                                                            {{-- <div class="save"><span class="icon flaticon-bookmark"></span>Save Recipe</div> --}}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div class="tab-pane fade" id="pills-contact" role="tabpanel"
                                                aria-labelledby="pills-contact-tab">
                                                <!-- Comment Form -->
                                                <div class="comment-form">
                                                    <div class="group-title">
                                                        <h2>leave a Reply</h2>
                                                    </div>
                                                    <!--Comment Form-->
                                                    <form method="post" action="https://gico.io/spcica/blog.html">
                                                        <div class="row clearfix">

                                                            <div
                                                                class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">
                                                                <textarea name="message" placeholder="Massage"></textarea>
                                                            </div>

                                                            <div
                                                                class="col-lg-12 col-md-12 col-sm-12 col-xs-12 form-group">
                                                                <div class="clearfix">
                                                                    <div class="pull-left">
                                                                        <div class="rating">
                                                                            Your Rate :
                                                                            <span class="fa fa-star-o"></span>
                                                                            <span class="fa fa-star-o"></span>
                                                                            <span class="fa fa-star-o"></span>
                                                                            <span class="fa fa-star-o"></span>
                                                                            <span class="fa fa-star-o"></span>
                                                                        </div>
                                                                    </div>
                                                                    <div class="pull-right">
                                                                        <button class="theme-btn comment-btn"
                                                                            type="submit" name="submit-form">Post
                                                                            Review</button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </form>
                                                </div>
                                                <!-- End Comment Form -->

                                                <!-- Comments Area -->
                                                <div class="comments-area">

                                                    <div class="comment-box">
                                                        <div class="comment">
                                                            <div class="author-thumb"><img
                                                                    src="{{ asset('web/assets/images/resource/author-15.jpg') }}"
                                                                    alt=""></div>
                                                            <div class="comment-info clearfix">
                                                                <div class="comment-time">1 months ago · 0 Likes</div>
                                                            </div>
                                                            <div class="text">Duis aute irure dolor in reprehenderit
                                                                in voluptate velit esse cillum dolore eu fugiat nulla
                                                                pariatur. Excepteur sint occaecat cupidatat non
                                                                proident, sunt in…Sed ut perspiciatis unde omnis iste
                                                                natus error sit voluptatem accusantium doloremque
                                                                laudantium, totam rem aperiam</div>
                                                            <a class="theme-btn reply-btn" href="#"><span
                                                                    class="icon fa fa-reply"></span> Reply</a>
                                                            <a class="theme-btn heart-btn" href="#"><span
                                                                    class="icon fa fa-heart"></span> Like</a>
                                                        </div>
                                                    </div>

                                                    <div class="comment-box">
                                                        <div class="comment">
                                                            <div class="author-thumb"><img
                                                                    src="{{ asset('web/assets/images/resource/author-16.jpg') }}"
                                                                    alt=""></div>
                                                            <div class="comment-info clearfix">
                                                                <div class="comment-time">12 january 2020 · 2 Likes
                                                                </div>
                                                            </div>
                                                            <div class="text">Duis aute irure dolor in reprehenderit
                                                                in voluptate velit esse cillum dolore eu fugiat nulla
                                                                pariatur. Excepteur sint occaecat cupidatat non
                                                                proident, sunt in…</div>
                                                        </div>
                                                    </div>

                                                    <div class="comment-box reply-comment">
                                                        <div class="comment">
                                                            <div class="author-thumb"><img
                                                                    src="{{ asset('web/assets/images/resource/author-17.jpg') }}"
                                                                    alt=""></div>
                                                            <div class="comment-info clearfix">
                                                                <div class="comment-time">1 months ago · 1 Likes</div>
                                                            </div>
                                                            <div class="text">Duis aute irure dolor in reprehenderit
                                                                in voluptate velit esse cillum dolore eu fugiat nulla
                                                                pariatur. Excepteur sint occaecat cupidatat non
                                                                proident, sunt in…</div>
                                                        </div>
                                                    </div>

                                                    <div class="comment-box">
                                                        <div class="comment">
                                                            <div class="author-thumb"><img
                                                                    src="{{ asset('web/assets/images/resource/author-18.jpg') }}"
                                                                    alt=""></div>
                                                            <div class="comment-info clearfix">
                                                                <div class="comment-time">12 january 2020 · 0 Likes
                                                                </div>
                                                            </div>
                                                            <div class="text">Duis aute irure dolor in reprehenderit
                                                                in voluptate velit esse cillum dolore eu fugiat nulla
                                                                pariatur. Excepteur sint occaecat cupidatat non
                                                                proident, sunt in…</div>
                                                        </div>
                                                    </div>

                                                    <div class="comment-box reply-comment">
                                                        <div class="comment">
                                                            <div class="author-thumb"><img
                                                                    src="{{ asset('web/assets/images/resource/author-19.jpg') }}"
                                                                    alt=""></div>
                                                            <div class="comment-info clearfix">
                                                                <div class="comment-time">1 months ago · 4 Likes</div>
                                                            </div>
                                                            <div class="text">Duis aute irure dolor in reprehenderit
                                                                in voluptate velit esse cillum dolore eu fugiat nulla
                                                                pariatur. Excepteur sint occaecat cupidatat non
                                                                proident, sunt in…</div>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Related Items -->
                            <div class="related-items">
                                <h4>{{ session()->get('lang') == 'hn' ? 'आपको ये भी पसंद आ सकता है' : 'तुम्हाला हे देखील आवडेल' }}
                                </h4>
                                <div class="row clearfix">
                                    @foreach ($recipes as $item)
                                        <!-- Recipes Block -->
                                        <div class="recipes-block style-two col-lg-4 col-md-6 col-sm-12">
                                            <div class="inner-box">
                                                <div class="image">
                                                    <a href="{{ route('recipe', $item->id) }}">
                                                        <img  src="{{ asset('storage/recipe/' . $item->sm_image) }}" alt="" />
                                                    </a>
                                                </div>
                                                <div class="lower-content">
                                                    <div class="author-image">
                                                        <a href="{{ route('recipe', $item->id) }}">
                                                            @if ($item->veg == 1)
                                                                <img src="{{ asset('web/assets/images/veg.png') }}" alt="" />
                                                            @else
                                                                <img src="{{ asset('web/assets/images/non_veg.png') }}" alt="" />
                                                            @endif
                                                            <div class="category">
                                                                {{ $item->category[session()->get('lang') . '_name'] }}
                                                            </div>
                                                        </a>
                                                            <h4>
                                                                <a  href="{{ route('recipe', $item->id) }}">{{ $item[session()->get('lang') . '_title'] }}</a>
                                                            </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    @endforeach

                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Subscribe Section -->
    @livewire('web.sections.subscribe')
    <!-- End Subscribe Section -->

    <!-- Instagram Section -->
    @livewire('web.sections.instagram')
    <!-- End Instagram Section -->
</div>
