<section class="video-section">
    <div class="auto-container">
        <div class="row clearfix">

            @foreach ($recipes as $item)

                 <!-- Column -->
            <div class="column col-lg-6 col-md-6 col-sm-12">
                <!--Video Box-->
                <div class="video-box">
                    <div class="image">
                        <h4>{{$item[session()->get('lang').'_title']}}</h4>
                        <img src="{{asset('storage/recipe/'.$item->thumbnail)}}" alt="" />
                        <a href="{{$item->video }}"  class="lightbox-image overlay-box">
                            <span class="flaticon-media-play-symbol">
                                <i class="ripple"></i>
                            </span>
                        </a>
                    </div>
                </div>
            </div>
            @endforeach

        </div>
    </div>
</section>
