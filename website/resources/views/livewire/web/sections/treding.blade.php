<section class="trending-section">
    <div class="auto-container">
        <div class="layer-one" style="background-image: url(web/assets/images/resource/category-pattern-1.png)"></div>
        <div class="layer-two" style="background-image: url(web/assets/images/resource/category-pattern-1.png)"></div>
        <div class="row clearfix">

            <!-- Content Column -->
            <div class="content-column col-lg-7 col-md-12 col-sm-12">
                <div class="inner-column">
                    <!-- Sec Title -->
                    <div class="sec-title">
                        <div class="title">{{$trend[session()->get('lang').'_smText']}}</div>
                        <h2>{{$trend[session()->get('lang').'_title']}}</h2>
                        <div class="text">{{$trend[session()->get('lang').'_description']}}.</div>
                    </div>

                </div>
            </div>

            <!-- Image Column -->
            <div class="image-column col-lg-5 col-md-12 col-sm-12">
                <div class="inner-column">
                    <div class="image">
                        <img src="{{asset('web/assets/images/resource/category.png')}}" alt="" />
                        <div class="mints">15 Min</div>
                    </div>
                </div>
            </div>

        </div>
    </div>
</section>
