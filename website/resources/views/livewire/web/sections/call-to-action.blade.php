<section class="call-to-action-section" style="background-image:url({{asset('web/assets/images/background/2.jpg')}})">
    <div class="auto-container">
        <div class="row clearfix">
            @foreach ($recipes as $item)
                <!-- Column -->
            <div class="column col-lg-6 col-md-12 col-sm-12">
                <!-- Sec Title -->
                <div class="sec-title light">
                    <div class="title">{{$item->category[session()->get('lang').'_name']}}</div>
                    <h2>{{$item[session()->get('lang').'_title' ]}}</h2>
                    <div class="text">{{$item[session()->get('lang').'_intro' ]}}</div>
                </div>
                <a href="{{route('recipes')}}" class="theme-btn btn-style-two"><span class="txt">{{session()->get('lang') == 'hn' ? 'रेसिपी देखें': 'रेसिपी पहा' }}</span></a>
            </div>
            @endforeach

        </div>
    </div>
</section>
