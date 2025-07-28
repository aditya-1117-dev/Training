<div>
    	<!--Page Title-->
        @livewire('web.sections.page-title', ['image' => $page_image,'title' => $page_title])
        <!--End Page Title-->

        <!-- Product Form Section -->
        @livewire('web.sections.product')
        <!-- End Keyword Section -->

        <!-- About Section -->
        <section class="about-section">
            <div class="layer-one" style="background-image: url({{asset('web/assets/images/resource/category-pattern-1.png')}})"></div>
            <div class="layer-two" style="background-image: url({{asset('web/assets/images/resource/category-pattern-1.png')}})"></div>
            <div class="auto-container">
                <div class="row clearfix">

                    <!-- Image Column -->
                    <div class="image-column col-lg-6 col-md-12 col-sm-12">
                        <div class="inner-column">
                            <div class="image">
                                <img src="{{asset('storage/about/'.$about->image_one)}}" alt="" />
                            </div>
                        </div>
                    </div>

                    <!-- Content Column -->
                    <div class="content-column col-lg-6 col-md-12 col-sm-12">
                        <div class="inner-column">
                            <!-- Sec Title -->
                            <div class="sec-title">
                                <div class="title">{{session()->get('lang') == 'hn' ? 'हमारे बारे में' : 'आमच्याबद्दल'}}</div>
                                <h2>{{session()->get('lang') == 'hn' ? 'हमारा दर्शन' : 'आमचे तत्वज्ञान'}}</h2>
                            </div>
                            <div class="bold-text">{{session()->get('lang') == 'hn' ? 'रसोई टिकट की अद्भुत दुनिया में आपका स्वागत है! मुझे ख़ुशी है कि आप यहाँ हैं' : 'किचन तिकिटाच्या अद्भुत जगात आपले स्वागत आहे! तुम्ही येथे आहात याचा मला आनंद आहे'}}.</div>
                            <div class="text">
                                <p style="white-space:pre-wrap">{{$about[session()->get('lang').'_desc_one']}}.</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        <!-- End About Section -->

        <!-- Founder Section -->
        <section class="founder-section">
            <div class="auto-container">
                <div class="row clearfix">

                    <!-- Content Column -->
                    <div class="content-column col-lg-6 col-md-12 col-sm-12">
                        <div class="inner-column">
                            <h3>{{session()->get('lang') == 'hn' ? 'कुकिंग टिकट संस्थापक' : 'पाककला तिकीट संस्थापक'}}</h3>
                            {{-- <div class="bold-text">When I am not focused on beets, I also enjoy traveling, yoga, reading, laughing, cooking, humanitarian outreach, volunteering with animal rescues, dancing, hugging trees (and anything/anyone who will accept hugs), and eating.  Yes – I love food! </div> --}}
                            <div class="text">
                                <p style="white-space:pre-wrap" >{{$about[session()->get('lang').'_desc_one']}}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Image Column -->
                    <div class="image-column col-lg-6 col-md-12 col-sm-12">
                        <div class="inner-column">
                            <div class="image">
                                <img src="{{asset('storage/about/'.$about->image_two)}}" alt="" />
                                <div class="year">15 <span>Years</span></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        <!-- End Founder Section -->

        <!-- Call To Action Section -->

        @livewire('web.sections.call-to-action')
        <!-- End Call To Action Section -->

        <!-- Authors Section -->
        <section class="authors-section style-two">
            <div class="auto-container">
                <!-- Sec Title -->
                <div class="sec-title centered">
                    <h2>Top Rated Authors</h2>
                    <div class="text">Lorem Ipsum proin gravida nibh vel velit auctor aliquetenean sollicitudin, <br> bibendum auctor, nisi elit consequat gravida nibh</div>
                </div>

                <div class="row clearfix">

                    <!-- Author Block -->
                    <div class="author-block col-lg-3 col-md-6 col-sm-12">
                        <div class="inner-box wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                            <div class="image">
                                <a href="recipes-detail.html"><img src="{{asset('web/assets/images/resource/author-10.jpg')}}" alt="" /></a>
                            </div>
                            <div class="lower-content">
                                <h4><a href="recipes-detail.html">Kopa Kapi</a></h4>
                                <div class="designation">Head Chef</div>
                            </div>
                        </div>
                    </div>

                    <!-- Author Block -->
                    <div class="author-block col-lg-3 col-md-6 col-sm-12">
                        <div class="inner-box wow fadeInUp" data-wow-delay="200ms" data-wow-duration="1500ms">
                            <div class="image">
                                <a href="recipes-detail.html"><img src="{{asset('web/assets/images/resource/author-11.jpg')}}" alt="" /></a>
                            </div>
                            <div class="lower-content">
                                <h4><a href="recipes-detail.html">Fariya Keya</a></h4>
                                <div class="designation">Baker</div>
                            </div>
                        </div>
                    </div>

                    <!-- Author Block -->
                    <div class="author-block col-lg-3 col-md-6 col-sm-12">
                        <div class="inner-box wow fadeInUp" data-wow-delay="400ms" data-wow-duration="1500ms">
                            <div class="image">
                                <a href="recipes-detail.html"><img src="{{asset('web/assets/images/resource/author-12.jpg')}}" alt="" /></a>
                            </div>
                            <div class="lower-content">
                                <h4><a href="recipes-detail.html">Raj Ghosh</a></h4>
                                <div class="designation">Chef</div>
                            </div>
                        </div>
                    </div>

                    <!-- Author Block -->
                    <div class="author-block col-lg-3 col-md-6 col-sm-12">
                        <div class="inner-box wow fadeInUp" data-wow-delay="600ms" data-wow-duration="1500ms">
                            <div class="image">
                                <a href="recipes-detail.html"><img src="{{asset('web/assets/images/resource/author-13.jpg')}}" alt="" /></a>
                            </div>
                            <div class="lower-content">
                                <h4><a href="recipes-detail.html">Yea Cup lee</a></h4>
                                <div class="designation">Cook head </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        <!-- End Treats Section -->

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
