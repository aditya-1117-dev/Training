<section class="categories-section">
    <div class="auto-container">

        <!-- Sec Title -->
        <div class="sec-title centered">
            <h2>{{session()->get('lang') ==  'hn' ? 'शीर्ष श्रेणियाँ' : 'शीर्ष श्रेणी'}}</h2>
            <div class="text">{{session()->get('lang') ==  'hn' ? 'हमारे शीर्ष व्यंजनों की श्रेणी के साथ फसल की मलाई का अन्वेषण करें, हमारे समुदाय द्वारा पसंद किए गए आजमाए हुए और सच्चे पसंदीदा का प्रदर्शन करें।' : 'आमच्या शीर्ष पाककृती श्रेणीसह क्रॉपची क्रीम एक्सप्लोर करा, आमच्या समुदायाला आवडलेल्या ट्राय आणि ट्रू फेव्हरेट्सचे प्रदर्शन करा.'}}</div>
        </div>

        <!-- Categories Tabs -->
        <div class="categories-tab">

            <div class="tab-btns-box">
                <!--Tabs Header-->
                <div class="tabs-header">

                    <ul class="product-tab-btns clearfix">
                        @foreach ($categories as $item)
                            <li class="p-tab-btn {{$loop->index == 0 ? 'active-btn' : ''}}" data-tab="#p-tab-{{$item->id}}">{{$item[session()->get('lang').'_name']}} <span
                                {{-- class="number">14</span> --}}
                            </li>
                        @endforeach
                    </ul>
                </div>
            </div>

            <!-- Tabs Content -->
           <div class="p-tabs-content">
                @foreach ($categories    as $item)
                <!-- Portfolio Tab / Active Tab -->
                <div class="p-tab {{$loop->index == 0 ? 'active-tab' : ''}}" id="p-tab-{{$item->id}}">
                    <div class="project-carousel owl-theme owl-carousel">

                        @foreach ($item->recipe as $recipe)
                        <div class="category-block">
                            <div class="inner-box">
                                <div class="image">
                                    <img src="{{asset('storage/recipe/'.$recipe->sm_image)}}" alt="" />
                                </div>
                                <div class="lower-content">
                                    <h4><a href="{{route('recipe', $recipe->id) }}">{{$recipe[session()->get('lang').'_title']}}</a></h4>
                                    <div class="text">{{$recipe[session()->get('lang').'_intro']}}</div>
                                </div>
                            </div>
                        </div>
                        @endforeach
                        <!-- Category Block -->

                    </div>
                </div>
                @endforeach


            </div>

        </div>
    </div>
</section>
