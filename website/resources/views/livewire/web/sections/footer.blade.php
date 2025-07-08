 <footer class="main-footer" style="background-image:url({{asset('web/assets/images/background/5.png')}})">
    <div class="auto-container">
        <div class="logo">
            <a href="index.html"><img src="{{asset('web/assets/images/logo_light_orange.png')}}" alt="" width="200px" /></a>
        </div>
        <ul class="footer-nav">
            {{-- <li><a href="#">Home</a></li>
            <li><a href="#">Recipes</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Contacts</a></li> --}}
            <li class="{{request()->is('/') ? 'current': ''}}"><a href="{{route('index')}}">{{session()->get('lang') == 'hn' ? 'मुखपृष्ठ' : 'मुखपृष्ठ'}}</a> </li>
            <li class="{{request()->is('about-us') ? 'current': ''}}"><a href="{{route('about')}}">{{session()->get('lang') == 'hn' ? 'हमारे बारे में' : 'आमच्याबद्दल'}}</a></li>
            <li class="{{request()->is('recipes') ? 'current': ''}}"><a href="{{route('recipes')}}">{{session()->get('lang') == 'hn' ? 'व्यंजनों' : 'पाककृती'}}</a> </li>
            <li class="{{request()->is('categories') ? 'current': ''}}"><a href="{{route('categories')}}">{{session()->get('lang') == 'hn' ? 'श्रेणियाँ' : 'श्रेणी'}}</a></li>
            {{-- <li class="{{request()->is('blogs') ? 'current': ''}}"><a href="{{route('blogs')}}">Blog</a> </li> --}}
            <li class="{{request()->is('videos') ? 'current': ''}}"><a href="{{route('videos')}}">{{session()->get('lang') == 'hn' ? 'वीडियो' : 'व्हिडिओ'}}</a> </li>
            <li class="{{request()->is('contact-us') ? 'current': ''}}"><a href="{{route('contact')}}">{{session()->get('lang') == 'hn' ? 'संपर्क करें' : 'आमच्याशी संपर्क साधा'}}</a></li>
        </ul>
        <ul class="social-box">
            {{-- <li><a href="#"><span class="fa fa-pinterest-p"></span></a></li> --}}
            <li><a href="#"><span class="fa fa-facebook-f"></span></a></li>
            <li><a href="#"><span class="fa fa-instagram"></span></a></li>
            {{-- <li><a href="#"><span class="fa fa-twitter"></span></a></li>    --}}
            <li><a href="#"><span class="fa fa-youtube-play"></span></a></li>
        </ul>
        <div class="copyright">&copy; All Right Reserved 2024 | created by <a href="https://www.ziainnovation.com" target="_blank">Zia Innovation</a></div>
    </div>
    <!--<div class="lang-change" >-->
    <!--    <div class="button" wire:click='$dispatch("lang-changed")'>-->
    <!--        {{session()->has('lang') ? (session()->get('lang') == 'hn'? 'Marathi': 'Hindi') :'Marathi' }}-->
    <!--    </div>-->
    <!--</div>-->
</footer>
