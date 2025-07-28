<section class="treats-section">
    <div class="layer-one" style="background-image: url({{asset('web/assets/images/background/3.png')}})"></div>
    <div class="layer-two" style="background-image: url({{asset('web/assets/images/background/4.png')}})"></div>
    <div class="auto-container">
        <!-- Sec Title -->
        <div class="sec-title">
            <div class="clearfix">
                <div class="pull-left">
                    <h2>{{ session()->get('lang') == "hn" ? "विंटर वंडरलैंड ट्रीट्स" : "विंटर वंडरलैंड ट्रीट्स" }}</h2>
                    <div class="text">{{ session()->get('lang') == "hn" ? "हमारी स्वादिष्ट मीठी रेसिपी देखें" : "आमच्या आनंददायी गोड पाककृती पहा" }}
                    </div>
                </div>
                <div class="pull-right">
                    <a href="recipes.html" class="theme-btn btn-style-one"><span class="txt">{{ session()->get('lang') == "hn" ? "सभी देखें" : "सर्व पाहा" }}</span></a>
                </div>
            </div>
        </div>

        <div class="row clearfix">
            @foreach ($sweet as $item)
               <!-- Treat Block -->
               <div class="treat-block col-lg-3 col-md-6 col-sm-12">
                    <div class="inner-box wow fadeInLeft" data-wow-delay="0ms" data-wow-duration="1500ms">
                        <div class="image">
                            <a href="{{route('recipes')}}"><img src="{{asset('storage/images/'.$item->image)}}" alt="" /></a>
                        </div>
                        <div class="lower-content">
                            <h4><a href="{{route('recipes')}}">{{ $item[session()->get('lang').'_title'] }}</a></h4>
                        </div>
                    </div>
                </div>
            @endforeach
        </div>
    </div>
</section>
