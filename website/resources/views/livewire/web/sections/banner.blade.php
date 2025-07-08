<section class="banner-section">
    <div class="banner-carousel owl-theme owl-carousel">

        @foreach ($sliders as $item)
             <!-- Slide Item -->
        <div class="slide-item">
            <div class="image-layer" style="background-image:url({{asset('storage/slider/'.$item->image)}})"></div>

            <div class="auto-container">
                <div class="content-box">
                    <div class="author-image">
                        <img src="{{asset('storage/recipe/'.$item->recipe->sm_image)}}" alt=""/>
                    </div>
                    <div class="info-list clearfix">
                        <div class="sales">{{$item->recipe->category[session()->get('lang').'_name']}}</div>
                        <div class="rating">
                            {{-- <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star-half-o"></span>&ensp;
                            8 Review --}}
                        </div>
                        <!-- Author Name -->
                        <div class="author-name">
                            <div class="author-inner">
                                <div class="author-icon">
                                    {{-- <img src="{{asset(' ')}}" alt="" /> --}}
                                </div>
                                {{-- cooking ticket --}}
                            </div>
                        </div>
                    </div>
                    <h1>{{$item->recipe[session()->get('lang').'_title']}}</h1>
                    <div class="text">{{$item->recipe[session()->get('lang').'_intro']}}</div>
                    <ul class="post-meta">
                        {{-- <li><span class="icon flaticon-dish"></span>4 ingredients</li>
                        <li><span class="icon flaticon-clock-3"></span>6 Min</li>
                        <li><span class="icon flaticon-business-and-finance"></span>4 People</li> --}}
                    </ul>
                </div>
            </div>
        </div>
        @endforeach


        {{-- <!-- Slide Item -->
        <div class="slide-item">
            <div class="image-layer" style="background-image:url({{asset('web/assets/images/main-slider/1.jpg')}})"></div>

            <div class="auto-container">
                <div class="content-box">
                    <div class="author-image">
                        <img src="{{asset('web/assets/images/resource/author-2.jpg')}}" alt="" />
                    </div>
                    <div class="info-list clearfix">
                        <div class="sales">Salad</div>
                        <div class="rating">
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star-half-o"></span>&ensp;
                            8 Review
                        </div>
                        <!-- Author Name -->
                        <div class="author-name">
                            <div class="author-inner">
                                <div class="author-icon">
                                    <img src="{{asset('web/assets/images/resource/author-1.jpg')}}" alt="" />
                                </div>
                                by Mahfuz Riad
                            </div>
                        </div>
                    </div>
                    <h1>Roasted Pumpkin and <br> Beet Salad</h1>
                    <div class="text">Lorem ipsum dolor sit amet, consectetuer <br> adipiscing elit, sed
                        tinciduntut laore dolore </div>
                    <ul class="post-meta">
                        <li><span class="icon flaticon-dish"></span>4 ingredients</li>
                        <li><span class="icon flaticon-clock-3"></span>6 Min</li>
                        <li><span class="icon flaticon-business-and-finance"></span>4 People</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Slide Item -->
        <div class="slide-item">
            <div class="image-layer" style="background-image:url({{asset('web/assets/images/main-slider/1.jpg')}})"></div>

            <div class="auto-container">
                <div class="content-box">
                    <div class="author-image">
                        <img src="{{asset('web/assets/images/resource/author-2.jpg')}}" alt="" />
                    </div>
                    <div class="info-list clearfix">
                        <div class="sales">Salad</div>
                        <div class="rating">
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star"></span>
                            <span class="fa fa-star-half-o"></span>&ensp;
                            8 Review
                        </div>
                        <!-- Author Name -->
                        <div class="author-name">
                            <div class="author-inner">
                                <div class="author-icon">
                                    <img src="{{asset('web/assets/images/resource/author-1.jpg')}}" alt="" />
                                </div>
                                by Mahfuz Riad
                            </div>
                        </div>
                    </div>
                    <h1>Roasted Pumpkin and <br> Beet Salad</h1>
                    <div class="text">Lorem ipsum dolor sit amet, consectetuer <br> adipiscing elit, sed
                        tinciduntut laore dolore </div>
                    <ul class="post-meta">
                        <li><span class="icon flaticon-dish"></span>4 ingredients</li>
                        <li><span class="icon flaticon-clock-3"></span>6 Min</li>
                        <li><span class="icon flaticon-business-and-finance"></span>4 People</li>
                    </ul>
                </div>
            </div>
        </div> --}}

    </div>
</section>
