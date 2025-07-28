<section class="instagram-section">
    <div class="auto-container">
        <!-- Title Box -->
        <div class="title-box">
            <div class="profile"><span class="fa fa-pinterest"></span> Follow On Instagram </div>
        </div>

    </div>

    <div class="instagram-carousel owl-carousel owl-theme">
        @foreach ($insta as $item)
              <!-- Instagram Block -->
        <div class="instagram-block">
            <div class="inner-box">
                <figure class="image-box"><img src="{{asset('storage/images/'.$item->image)}}" alt=""></figure>
                <!--Overlay Box-->
                <div class="overlay-box">
                    <div class="overlay-inner">
                        <div class="content">
                            <a href="{{$item->insta_link}}"
                                target="_blank"
                                class=" option-btn" title="Image Caption Here"
                                data-fancybox-group="example-gallery">
                                <span class="fa fa-search"></span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        @endforeach

    </div>

</section>
