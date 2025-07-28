<div>
   	<!--Page Title-->
       <section class="page-title" style="background-image:url({{asset('web/assets/images/background/12.png')}})">
    	<div class="auto-container">
			<h1>{{session()->get('lang') =='hn'? 'व्यंजनों'  :  'पाककृती'}}</h1>
        </div>
    </section>
    <!--End Page Title-->

	<!-- Product Form Section -->
	@livewire('web.sections.product')
	<!-- End Keyword Section -->

    {{-- Latest Recipes Seciton--}}
    <section class="popular-recipes-section">
        <div class="auto-container">
            <!-- Sec Title -->
            <div class="sec-title">
                <div class="clearfix">
                    <div class="pull-left">
                        <h2>{{session()->get('lang') =='hn'? 'हमारी नवीनतम रेसिपी'  :  'आमची नवीनतम रेसिपी'}}</h2>
                        <div class="text">{{session()->get('lang') =='hn'? 'ताजा प्रेरणा और ट्रेंडिंग स्वादों के साथ हमारे नवीनतम व्यंजनों के साथ पाक कला में आगे रहें।'  :  'ताज्या प्रेरणा आणि ट्रेंडिंग फ्लेवर्ससह, आमच्या नवीनतम पाककृतींसह पाककला वक्रच्या पुढे रहा.'}}
                        </div>
                    </div>
                    <div class="pull-right">
                        {{-- <a href="recipes.html" class="theme-btn btn-style-one"><span class="txt">See all
                                Post</span></a> --}}
                    </div>
                </div>
            </div>
        </div>
        <div class="outer-container">
            <div class="row clearfix">

                @forelse($recipes as $item)
                     <!-- Recipes Block -->
                <div class="recipes-block col-lg-3 col-md-6 col-sm-12">
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

                        </div>
                    </div>
                </div>
                @empty
                    <h2>No Recipe Found..</h2>
                @endforelse
            </div>
            @if ($count > 10 || $count < $limit)
                <div class="d-flex justify-content-center align-times-center">
                    <button class="btn btn-warning btn-rounded text-light" wire:click ='newpost()'>Load More</button>
                </div>
            @endif

        </div>
    </section>
    {{-- End Latest Recipes Seciton--}}

	<!-- Popular Recipes Section -->
	@livewire('web.sections.popular-recipes')
	<!-- End Popular Recipes Section -->

	<!-- Entertaining Section -->
	@livewire('web.sections.entertaining')
	<!-- End Entertaining Section -->

	<!-- Subscribe Section -->
	@livewire('web.sections.subscribe')
	<!-- End Subscribe Section -->

	<!-- Instagram Section -->
	@livewire('web.sections.instagram')
	<!-- End Instagram Section -->
</div>
