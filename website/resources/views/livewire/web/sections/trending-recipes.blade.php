<section class="trending-recipes-section">
    <div class="auto-container">
        <!-- Sec Title -->
        <div class="sec-title">
            <div class="clearfix">
                <div class="pull-left">
                    <h2>{{ session()->get('lang') == "hn" ? "ट्रेंडिंग रेसिपी" : "ट्रेंडिंग पाककृती" }} </h2>
                    <div class="text">{{ session()->get('lang') == "hn" ? "ट्रेंडिंग व्यंजनों के हमारे क्यूरेटेड चयन के साथ नवीनतम पाक रुझानों की खोज करें" : "ट्रेंडिंग पाककृतींच्या आमच्या निवडलेल्या निवडीसह नवीनतम पाककला ट्रेंड शोधा" }}
                    </div>
                </div>
                @if (request()->is('/'))
                <div class="pull-right">
                    <a href="{{route('recipes')}}" class="theme-btn btn-style-one"><span class="txt"> {{ session()->get('lang') == "hn" ? "सभी देखें" : "सर्व पाहा" }} </span></a>
                </div>
                @endif
            </div>
        </div>

        <div class="row clearfix">

            @foreach ($recipes as $item)
                 <!-- Recipes Block -->
            <div class="recipes-block style-two col-lg-4 col-md-6 col-sm-12">
                <div class="inner-box">
                    <div class="image">
                        <a href="{{route('recipe',$item->id)}}"><img src="{{asset('storage/recipe/'.$item->sm_image)}}" alt="" /></a>
                    </div>
                    <div class="lower-content">
                        <div class="author-image">
                            <a href="{{route('recipe',$item->id)}}">
                                @if ($item->veg == 1)
                                    <img src="{{asset('web/assets/images/veg.png')}}" alt="" />
                                @else
                                    <img src="{{asset('web/assets/images/non_veg.png')}}" alt="" />
                                @endif

                            </a>
                        </div>
                        <div class="category">{{$item->category[session()->get('lang').'_name']}}</div>
                        <h4><a href="{{route('recipe',$item->id)}}">{{$item[session()->get('lang').'_title']}}</a></h4>

                        <div class="text">{{$item[session()->get('lang').'_intro']}}.</div>
                        {{-- <ul class="post-meta">
                            <li><span class="icon flaticon-dish"></span>4 ingredients</li>
                            <li><span class="icon flaticon-clock-3"></span>6 Min</li>
                            <li><span class="icon flaticon-business-and-finance"></span>4 People</li>
                        </ul> --}}
                    </div>
                </div>
            </div>
            @endforeach

        </div>

    </div>
</section>
