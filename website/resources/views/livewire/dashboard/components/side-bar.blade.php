<div class="app-menu navbar-menu">

    @php
$setting = \App\Models\Setting::find(1)
    @endphp
    <!-- LOGO -->
    <div class="navbar-brand-box">
        <a href="index.html" class="logo logo-dark">
            <span class="logo-sm">
                <img src="{{asset('storage/logo/'.$setting->logo)}}" alt="" height="40">
            </span>
            <span class="logo-lg">
                <img src="{{asset('storage/logo/'.$setting->logo)}}" alt="" height="40">
            </span>
        </a>
        <a href="index.html" class="logo logo-light">
            <span class="logo-sm">
                <img src="{{asset('storage/logo/'.$setting->logo)}}" alt="" height="40">
            </span>
            <span class="logo-lg">
                <img src="{{asset('storage/logo/'.$setting->logo)}}" alt="" height="40">
            </span>
        </a>
        <button type="button" class="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
            id="vertical-hover">
            <i class="ri-record-circle-line"></i>
        </button>
    </div>

    <div id="scrollbar">
        <div class="container-fluid">

            <div id="two-column-menu">
            </div>
            <ul class="navbar-nav" id="navbar-nav">

                <li class="menu-title"><span data-key="t-menu">Menu</span></li>
                @if (auth()->user()->role ==  0))
                    <li class="nav-item">
                        <a href="{{route('admin.dashboard')}}" class="nav-link menu-link {{ request()->is('admin') ? 'active' : '' }}">
                            <i class="bi bi-speedometer2"></i>
                            <span data-key="t-dashboard">Dashboard</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{route('admin.slider')}}" class="nav-link menu-link {{ request()->is('admin/slider') ? 'active' : '' }}">
                            <i class="bi bi-images"></i>
                            <span data-key="t-dashboard">Slider</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{route('admin.trend')}}" class="nav-link menu-link {{ request()->is('admin/trend') ? 'active' : '' }}">
                            <i class="bi bi-x-diamond-fill"></i>
                            <span data-key="t-dashboard">Trending</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{route('admin.category')}}" class="nav-link menu-link {{ request()->is('admin/category') ? 'active' : '' }}">
                            <i class="bi bi-list-check"></i>
                            <span data-key="t-dashboard">Category</span>
                        </a>
                    </li>
                @endif
                <li class="nav-item">
                    <a href="{{route('admin.recipes')}}" class="nav-link menu-link {{ request()->is('admin/recipes') ? 'active' : '' }}">
                       <i class="bi bi-egg-fill"></i>
                        <span data-key="t-dashboard">Recipe</span>
                    </a>
                </li>
                <!--  <li class="nav-item">-->
                <!--    <a href="{{route('admin.comborecipes')}}" class="nav-link menu-link {{ request()->is('admin/recipes') ? 'active' : '' }}">-->
                <!--       <i class="bi bi-egg-fill"></i>-->
                <!--        <span data-key="t-dashboard">Combo Recipe</span>-->
                <!--    </a>-->
                <!--</li>-->
                @if (auth()->user()->role ==  0)
                    <li class="nav-item">
                        <a href="{{route('admin.images')}}" class="nav-link menu-link {{ request()->is('admin/images') ? 'active' : '' }}">
                            <i class="bi bi-image"></i>
                            <span data-key="t-dashboard">Images</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{route('admin.about')}}" class="nav-link menu-link {{ request()->is('admin/about') ? 'active' : '' }}">
                            <i class="bi bi-person-lines-fill"></i>
                            <span data-key="t-dashboard">About</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{route('admin.setting')}}" class="nav-link menu-link {{ request()->is('admin/setting') ? 'active' : '' }}">
                            <i class="bi bi-person-rolodex"></i>
                            <span data-key="t-dashboard">Contact</span>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a href="{{route('admin.users')}}" class="nav-link menu-link {{ request()->is('admin/users') ? 'active' : '' }}">
                            <i class="bi bi-people-fill"></i>
                            <span data-key="t-dashboard">Users</span>
                        </a>
                    </li>
                @endif


            </ul>
        </div>
        <!-- Sidebar -->
    </div>

    <div class="sidebar-background"></div>
</div>
