<section class="entertaining-section">
    <div class="auto-container">
        <!-- Sec Title -->
        <div class="sec-title centered">
            <h2>{{session()->get('lang') == 'hn' ? 'मनोरंजक' : 'मनोरंजक'}}</h2>
        </div>

        <div class="row clearfix">

            @foreach ($recipes as $item)
                 <!-- Entertaining Block -->
            <div class="entertaining-block col-lg-3 col-md-6 col-sm-12">
                <div class="inner-box">
                    <div class="image">
                        <a href="{{route('recipe',1)}}"><img src="{{asset('storage/recipe/'.$item->sm_image)}}"
                                alt="" /></a>
                    </div>
                    <div class="lower-content">
                        <ul class="post-meta">
                            <li><span class="icon "></span>{{$item->created_at->diffForHumans()}}</li>
                            {{-- <li><span class="icon flaticon-comment"></span>4</li>
                            <li><span class="icon flaticon-heart"></span>5</li> --}}
                        </ul>
                        <h4><a href="{{route('recipe',1)}}">{{$item[session()->get('lang').'_title']}}</a>
                        </h4>
                        <a href="{{route('recipe',1)}}" class="theme-btn read-more">{{session()->get('lang') == 'hn' ? 'और पढ़ें' : 'पुढे वाचा'}}</a>
                    </div>
                </div>
            </div>
            @endforeach
        </div>
    </div>
</section>
