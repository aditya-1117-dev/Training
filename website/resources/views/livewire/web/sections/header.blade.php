<header class="main-header header-style-one">

    <!--Header-Upper-->
    <div class="header-upper">
        <div class="auto-container">
            <div class="clearfix">

                <div class="pull-left logo-box">
                    <div class="logo">
                        <a href="index.html">
                            <img src="{{asset('storage/logo/'.$setting->logo)}}" alt="" title="">
                        </a>

                    </div>
                    {{-- <button class="btn btn-sm btn-warning l-button  pull-right" wire:click='changelangtwo'>
                        {{session()->has('lang') ? (session()->get('lang') == 'hn'? 'Marathi': 'Hindi') :'Marathi' }} </button> --}}

                </div>


                <div class="nav-outer clearfix">

                    <!-- Mobile Navigation Toggler -->
                    <div class="mobile-nav-toggler">

                        <span class="icon flaticon-menu"></span>
                    </div>
                    <!-- Main Menu -->
                    <nav class="main-menu navbar-expand-md">
                        <div class="navbar-header">
                            <button class="navbar-toggler" type="button" data-toggle="collapse"
                                data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                        </div>

                        <div class="navbar-collapse show collapse clearfix" id="navbarSupportedContent">
                            <ul class="navigation clearfix">
                                <li  class="{{request()->is('/') ? 'current': ''}}"><a  href="{{route('index')}}">{{session()->get('lang') == 'hn' ? 'मुखपृष्ठ' : 'मुखपृष्ठ'}}</a> </li>
                                <li class="{{request()->is('about-us') ? 'current': ''}}"><a href="{{route('about')}}">{{session()->get('lang') == 'hn' ? 'हमारे बारे में' : 'आमच्याबद्दल'}}</a></li>
                                <li class="{{request()->is('recipes') ? 'current': ''}}"><a href="{{route('recipes')}}">{{session()->get('lang') == 'hn' ? 'व्यंजनों' : 'पाककृती'}}</a> </li>
                                <li class="{{request()->is('categories') ? 'current': ''}}"><a href="{{route('categories')}}">{{session()->get('lang') == 'hn' ? 'श्रेणियाँ' : 'श्रेणी'}}</a></li>
                                {{-- <li class="{{request()->is('blogs') ? 'current': ''}}"><a href="{{route('blogs')}}">Blog</a> </li> --}}
                                <li class="{{request()->is('videos') ? 'current': ''}}"><a href="{{route('videos')}}">{{session()->get('lang') == 'hn' ? 'वीडियो' : 'व्हिडिओ'}}</a> </li>
                                <li class="{{request()->is('contact-us') ? 'current': ''}}"><a href="{{route('contact')}}">{{session()->get('lang') == 'hn' ? 'संपर्क करें' : 'आमच्याशी संपर्क साधा'}}</a></li>
                                <li class="">
                                    {{-- <button class="btn btn-sm btn-warning m-button" wire:click='changelang'>
                                        {{session()->has('lang') ? (session()->get('lang') == 'hn'? 'Marathi': 'Hindi') :'Marathi' }} </button> --}}
                                </li>
                            </ul>
                        </div>

                    </nav>

                    <!-- Outer Box -->
                    <div class="outer-box">
                        <!-- Search Box -->
                        <!-- <div class="search-box-outer">
                            <div class="dropdown">
                                <button class="search-box-btn dropdown-toggle" type="button" id="dropdownMenu3"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span
                                        class="fa fa-search"></span></button>
                                <ul class="dropdown-menu pull-right search-panel"
                                    aria-labelledby="dropdownMenu3">
                                    <li class="panel-outer">
                                        <div class="form-container">
                                            <form method="post" action="#">
                                                <div class="form-group">
                                                    <input type="search" name="field-name" value=""
                                                        placeholder="Search Here" required>
                                                    <button type="submit" class="search-btn"><span
                                                            class="fa fa-search"></span></button>
                                                </div>
                                            </form>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div> -->
                        <!-- <ul class="login-info">
                        <li><a href="login.html"><span class="icon fa fa-user"></span>Login</a></li>
                        <li class="recipe"><a href="add-recipe.html"><span class="fa fa-plus-circle"></span>&nbsp; Add Recipe</a></li>
                    </ul> -->
                    </div>

                </div>

            </div>
        </div>
    </div>
    <!--End Header Upper-->

    <!-- Mobile Menu  -->
    <div class="mobile-menu">
        <div class="menu-backdrop"></div>
        <div class="close-btn"><span class="icon fa fa-remove"></span></div>

        <nav class="menu-box">
            <div class="nav-logo"><a href="index.html"><img src="{{asset('web/assets/images/logo_light_orange.png')}}" alt="" title=""></a>
            </div>
            <div class="menu-outer">
                <!--Here Menu Will Come Automatically Via Javascript / Same Menu as in Header--></div>
        </nav>
    </div><!-- End Mobile Menu -->
    
     <div class="lang-change" >
        <div class="button" wire:click='$dispatch("lang-changed")'>
            {{session()->has('lang') ? (session()->get('lang') == 'hn'? 'Marathi': 'Hindi') :'Marathi' }}
        </div>
    </div>

</header>
