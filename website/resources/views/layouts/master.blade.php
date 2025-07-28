<!doctype html>
<html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="light" data-sidebar-size="lg"
    data-sidebar-image="none" data-preloader="disable">



<head>

    <meta charset="utf-8" />
    <title>Cooking Ticket | Admin</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="" name="description" />
    <meta content="" name="keywords"  content="recipe, "/>
    <meta content="Zia Innovation" name="author" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="{{asset('web/assets/images/favicon_2.png')}}">

    <!-- Layout config Js -->
    <script src="{{asset('dashboard/assets/js/layout.js')}}"></script>

    <link rel="stylesheet" href="{{ asset('dashboard/assets/css/alert.css') }}">


    <!--datatable css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/1.11.5/css/dataTables.bootstrap5.min.css" />
    <!--datatable responsive css-->
    <link rel="stylesheet" href="https://cdn.datatables.net/responsive/2.2.9/css/responsive.bootstrap.min.css" />

    <link rel="stylesheet" href="https://cdn.datatables.net/buttons/2.2.2/css/buttons.dataTables.min.css">

    <!-- Sweet Alert css-->
    <link href="{{ asset('dashboard/assets/libs/sweetalert2/sweetalert2.min.css') }}" rel="stylesheet"
        type="text/css" />
    <!-- Bootstrap Css -->
    <link href="{{asset('dashboard/assets/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
    <!-- Icons Css -->
    <link href="{{asset('dashboard/assets/css/icons.min.css')}}" rel="stylesheet" type="text/css" />
    <!-- App Css-->
    <link href="{{asset('dashboard/assets/css/app.min.css')}}" rel="stylesheet" type="text/css" />
    <!-- custom Css-->
    <link href="{{asset('dashboard/assets/css/custom.min.css')}}" rel="stylesheet" type="text/css" />
    <style>
        .welcome{
            width: 100%;
            height: 300px;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .image-box{
            width: 200px;
        }
    </style>

</head>

<body>

    <!-- Begin page -->
    <div id="layout-wrapper">

        <div class="top-tagbar">
            <div class="w-100">
                <div class="row justify-content-between align-items-center">
                    <div class="col-md-4 col-9">
                        <div class="text-white-50 fs-13">
                            <i class="bi bi-clock align-middle me-2"></i> <span id="">{{date('d-M-Y H:i')}} </span>
                        </div>
                    </div>
                    <div class="col-md-4 col-6 d-none d-lg-block">
                        <div class="d-flex align-items-center justify-content-center gap-3 fs-13 text-white-50">
                            <div>
                               <a class="text-white-50" href="mailto:get-support@ziainnovation.com">  <i class="bi bi-envelope align-middle me-2"></i> get-support@ziainnovation.com </a>
                            </div>
                            <div>
                              <a href="http://www.ziainnovation.com" target="_blank" class="text-white-50 "> <i class="bi bi-globe align-middle me-2"></i> www.ziainnovation.com</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4 col-3">
                        {{-- <div class="dropdown topbar-head-dropdown topbar-tag-dropdown justify-content-end">
                            <button type="button" class="btn btn-icon btn-topbar rounded-circle text-white-50 fs-13"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <img id="header-lang-img" src="{{asset('dashboard/assets/images/flags/us.svg')}}" alt="Header Language"
                                    height="16" class="rounded-circle me-2"> <span id="lang-name">English</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">

                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item language py-2"
                                    data-lang="en" title="English">
                                    <img src="{{asset('dashboard/assets/images/flags/us.svg')}}" alt="user-image" class="me-2 rounded-circle"
                                        height="18">
                                    <span class="align-middle">English</span>
                                </a>

                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="sp"
                                    title="Spanish">
                                    <img src="{{asset('dashboard/assets/images/flags/spain.svg')}}" alt="user-image"
                                        class="me-2 rounded-circle" height="18">
                                    <span class="align-middle">Española</span>
                                </a>

                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="gr"
                                    title="German">
                                    <img src="{{asset('dashboard/assets/images/flags/germany.svg')}}" alt="user-image"
                                        class="me-2 rounded-circle" height="18"> <span
                                        class="align-middle">Deutsche</span>
                                </a>

                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="it"
                                    title="Italian">
                                    <img src="{{asset('dashboard/assets/images/flags/italy.svg')}}" alt="user-image"
                                        class="me-2 rounded-circle" height="18">
                                    <span class="align-middle">Italiana</span>
                                </a>

                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="ru"
                                    title="Russian">
                                    <img src="{{asset('dashboard/assets/images/flags/russia.svg')}}" alt="user-image"
                                        class="me-2 rounded-circle" height="18">
                                    <span class="align-middle">русский</span>
                                </a>

                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="ch"
                                    title="Chinese">
                                    <img src="{{asset('dashboard/assets/images/flags/china.svg')}}" alt="user-image"
                                        class="me-2 rounded-circle" height="18">
                                    <span class="align-middle">中国人</span>
                                </a>

                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="fr"
                                    title="French">
                                    <img src="{{asset('dashboard/assets/images/flags/french.svg')}}" alt="user-image"
                                        class="me-2 rounded-circle" height="18">
                                    <span class="align-middle">français</span>
                                </a>

                                <!-- item-->
                                <a href="javascript:void(0);" class="dropdown-item notify-item language" data-lang="ar"
                                    title="Arabic">
                                    <img src="{{asset('dashboard/assets/images/flags/ae.svg')}}" alt="user-image" class="me-2 rounded-circle"
                                        height="18">
                                    <span class="align-middle">عربى</span>
                                </a>
                            </div>
                        </div> --}}
                    </div>
                </div>
            </div>
        </div>
        <header id="page-topbar">
            <div class="layout-width">
                <div class="navbar-header">
                    <div class="d-flex">
                        <!-- LOGO -->
                        <div class="navbar-brand-box horizontal-logo">
                            <a href="index.html" class="logo logo-dark">
                                <span class="logo-sm">
                                    <img src="{{asset('web/assets/images/logo_orange.png')}}" alt="" height="22">
                                </span>
                                <span class="logo-lg">
                                    <img src="{{asset('web/assets/images/logo_orange.png')}}" alt="" height="25">
                                </span>
                            </a>

                            <a href="index.html" class="logo logo-light">
                                <span class="logo-sm">
                                    <img src="{{asset('web/assets/images/logo_orange.png')}}" alt="" height="22">
                                </span>
                                <span class="logo-lg">
                                    <img src="{{asset('web/assets/images/logo_orange.png')}}" alt="" height="25">
                                </span>
                            </a>
                        </div>

                        <button type="button"
                            class="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                            id="topnav-hamburger-icon">
                            <span class="hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>

                        {{-- <button type="button" class="btn btn-sm px-3 fs-15 text-muted header-item d-none d-md-block"
                            data-bs-toggle="modal" data-bs-target="#searchModal">
                            <span class="bi bi-search me-2"></span> Search for hybrix...
                        </button> --}}
                    </div>

                    <div class="d-flex align-items-center">

                        {{-- <div class="d-md-none topbar-head-dropdown header-item">
                            <button type="button" class="btn btn-icon btn-topbar btn-ghost-dark rounded-circle"
                                id="page-header-search-dropdown" data-bs-toggle="modal" data-bs-target="#searchModal">
                                <i class="bi bi-search fs-16"></i>
                            </button>
                        </div>

                        <div class="dropdown topbar-head-dropdown ms-1 header-item">
                            <button type="button" class="btn btn-icon btn-topbar btn-ghost-dark rounded-circle"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class='bi bi-grid fs-18'></i>
                            </button>
                            <div class="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
                                <div class="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h6 class="m-0 fw-semibold fs-15"> Browse by Apps </h6>
                                        </div>
                                        <div class="col-auto">
                                            <a href="#!" class="btn btn-sm btn-soft-info"> View All Apps
                                                <i class="ri-arrow-right-s-line align-middle"></i></a>
                                        </div>
                                    </div>
                                </div>

                                <div class="p-2">
                                    <div class="row g-0">
                                        <div class="col">
                                            <a class="dropdown-icon-item" href="#!">
                                                <img src="{{asset('dashboard/assets/images/brands/github.png')}}" alt="Github">
                                                <span>GitHub</span>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a class="dropdown-icon-item" href="#!">
                                                <img src="{{asset('dashboard/assets/images/brands/bitbucket.png')}}" alt="bitbucket">
                                                <span>Bitbucket</span>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a class="dropdown-icon-item" href="#!">
                                                <img src="{{asset('dashboard/assets/images/brands/dribbble.png')}}" alt="dribbble">
                                                <span>Dribbble</span>
                                            </a>
                                        </div>
                                    </div>

                                    <div class="row g-0">
                                        <div class="col">
                                            <a class="dropdown-icon-item" href="#!">
                                                <img src="{{asset('dashboard/assets/images/brands/dropbox.png')}}" alt="dropbox">
                                                <span>Dropbox</span>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a class="dropdown-icon-item" href="#!">
                                                <img src="{{asset('dashboard/assets/images/brands/mail_chimp.png')}}" alt="mail_chimp">
                                                <span>Mail Chimp</span>
                                            </a>
                                        </div>
                                        <div class="col">
                                            <a class="dropdown-icon-item" href="#!">
                                                <img src="{{asset('dashboard/assets/images/brands/slack.png')}}" alt="slack">
                                                <span>Slack</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> --}}

                        {{-- <div class="dropdown topbar-head-dropdown ms-1 header-item">
                            <button type="button" class="btn btn-icon btn-topbar btn-ghost-dark rounded-circle"
                                id="page-header-cart-dropdown" data-bs-toggle="dropdown" data-bs-auto-close="outside"
                                aria-haspopup="true" aria-expanded="false">
                                <i class='bi bi-bag fs-18'></i>
                                <span
                                    class="position-absolute topbar-badge cartitem-badge fs-10 translate-middle badge rounded-pill bg-info">5</span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-xl dropdown-menu-end p-0 dropdown-menu-cart"
                                aria-labelledby="page-header-cart-dropdown">
                                <div class="p-3 border-top-0 border-start-0 border-end-0 border-dashed border">
                                    <div class="row align-items-center">
                                        <div class="col">
                                            <h6 class="m-0 fs-16 fw-semibold"> My Cart</h6>
                                        </div>
                                        <div class="col-auto">
                                            <span class="badge badge-soft-warning fs-13"><span
                                                    class="cartitem-badge">7</span>
                                                items</span>
                                        </div>
                                    </div>
                                </div>
                                <div data-simplebar style="max-height: 300px;">
                                    <div class="p-2">
                                        <div class="text-center empty-cart" id="empty-cart">
                                            <div class="avatar-md mx-auto my-3">
                                                <div class="avatar-title bg-soft-info text-info fs-36 rounded-circle">
                                                    <i class='bx bx-cart'></i>
                                                </div>
                                            </div>
                                            <h5 class="mb-3">Your Cart is Empty!</h5>
                                            <a href="#!" class="btn btn-success w-md mb-3">Shop Now</a>
                                        </div>
                                        <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                                            <div class="d-flex align-items-center">
                                                <img src="{{asset('dashboard/assets/images/products/img-1.png')}}"
                                                    class="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic">
                                                <div class="flex-grow-1">
                                                    <h6 class="mt-0 mb-1 fs-14">
                                                        <a href="#!" class="text-reset">Branded
                                                            T-Shirts</a>
                                                    </h6>
                                                    <p class="mb-0 fs-13 text-muted">
                                                        Quantity: <span>10 x $32</span>
                                                    </p>
                                                </div>
                                                <div class="px-2">
                                                    <h5 class="m-0 fw-normal">$<span class="cart-item-price">320</span>
                                                    </h5>
                                                </div>
                                                <div class="ps-2">
                                                    <button type="button"
                                                        class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                                                            class="ri-close-fill fs-16"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                                            <div class="d-flex align-items-center">
                                                <img src="{{asset('dashboard/assets/images/products/img-2.png')}}"
                                                    class="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic">
                                                <div class="flex-grow-1">
                                                    <h6 class="mt-0 mb-1 fs-14">
                                                        <a href="#!" class="text-reset">Bentwood Chair</a>
                                                    </h6>
                                                    <p class="mb-0 fs-13 text-muted">
                                                        Quantity: <span>5 x $18</span>
                                                    </p>
                                                </div>
                                                <div class="px-2">
                                                    <h5 class="m-0 fw-normal">$<span class="cart-item-price">89</span>
                                                    </h5>
                                                </div>
                                                <div class="ps-2">
                                                    <button type="button"
                                                        class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                                                            class="ri-close-fill fs-16"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                                            <div class="d-flex align-items-center">
                                                <img src="{{asset('dashboard/assets/images/products/img-3.png')}}"
                                                    class="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic">
                                                <div class="flex-grow-1">
                                                    <h6 class="mt-0 mb-1 fs-14">
                                                        <a href="#!" class="text-reset">
                                                            Borosil Paper Cup</a>
                                                    </h6>
                                                    <p class="mb-0 fs-13 text-muted">
                                                        Quantity: <span>3 x $250</span>
                                                    </p>
                                                </div>
                                                <div class="px-2">
                                                    <h5 class="m-0 fw-normal">$<span class="cart-item-price">750</span>
                                                    </h5>
                                                </div>
                                                <div class="ps-2">
                                                    <button type="button"
                                                        class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                                                            class="ri-close-fill fs-16"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                                            <div class="d-flex align-items-center">
                                                <img src="{{asset('dashboard/assets/images/products/img-6.png')}}"
                                                    class="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic">
                                                <div class="flex-grow-1">
                                                    <h6 class="mt-0 mb-1 fs-14">
                                                        <a href="#!" class="text-reset">Gray
                                                            Styled T-Shirt</a>
                                                    </h6>
                                                    <p class="mb-0 fs-13 text-muted">
                                                        Quantity: <span>1 x $1250</span>
                                                    </p>
                                                </div>
                                                <div class="px-2">
                                                    <h5 class="m-0 fw-normal">$ <span
                                                            class="cart-item-price">1250</span></h5>
                                                </div>
                                                <div class="ps-2">
                                                    <button type="button"
                                                        class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                                                            class="ri-close-fill fs-16"></i></button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="d-block dropdown-item dropdown-item-cart text-wrap px-3 py-2">
                                            <div class="d-flex align-items-center">
                                                <img src="{{asset('dashboard/assets/images/products/img-5.png')}}"
                                                    class="me-3 rounded-circle avatar-sm p-2 bg-light" alt="user-pic">
                                                <div class="flex-grow-1">
                                                    <h6 class="mt-0 mb-1 fs-14">
                                                        <a href="#!" class="text-reset">Stillbird Helmet</a>
                                                    </h6>
                                                    <p class="mb-0 fs-13 text-muted">
                                                        Quantity: <span>2 x $495</span>
                                                    </p>
                                                </div>
                                                <div class="px-2">
                                                    <h5 class="m-0 fw-normal">$<span class="cart-item-price">990</span>
                                                    </h5>
                                                </div>
                                                <div class="ps-2">
                                                    <button type="button"
                                                        class="btn btn-icon btn-sm btn-ghost-secondary remove-item-btn"><i
                                                            class="ri-close-fill fs-16"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="p-3 border-bottom-0 border-start-0 border-end-0 border-dashed border"
                                    id="checkout-elem">
                                    <div class="d-flex justify-content-between align-items-center pb-3">
                                        <h5 class="m-0 text-muted">Total:</h5>
                                        <div class="px-2">
                                            <h5 class="m-0" id="cart-item-total">$1258.58</h5>
                                        </div>
                                    </div>

                                    <a href="#!" class="btn btn-success text-center w-100">
                                        Checkout
                                    </a>
                                </div>
                            </div>
                        </div> --}}

                        <div class="ms-1 header-item d-none d-sm-flex">
                            <button type="button" class="btn btn-icon btn-topbar btn-ghost-dark rounded-circle"
                                data-toggle="fullscreen">
                                <i class='bi bi-arrows-fullscreen fs-16'></i>
                            </button>
                        </div>

                        <div class="dropdown topbar-head-dropdown ms-1 header-item">
                            <button type="button"
                                class="btn btn-icon btn-topbar btn-ghost-dark rounded-circle mode-layout"
                                data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i class="bi bi-sun align-middle fs-20"></i>
                            </button>
                            <div class="dropdown-menu p-2 dropdown-menu-end" id="light-dark-mode">
                                <a href="#!" class="dropdown-item" data-mode="light"><i
                                        class="bi bi-sun align-middle me-2"></i> Defualt (light mode)</a>
                                <a href="#!" class="dropdown-item" data-mode="dark"><i
                                        class="bi bi-moon align-middle me-2"></i> Dark</a>
                                <a href="#!" class="dropdown-item" data-mode="auto"><i
                                        class="bi bi-moon-stars align-middle me-2"></i> Auto (system defualt)</a>
                            </div>
                        </div>

                        {{-- <div class="dropdown topbar-head-dropdown ms-1 header-item" id="notificationDropdown">
                            <button type="button" class="btn btn-icon btn-topbar btn-ghost-dark rounded-circle"
                                id="page-header-notifications-dropdown" data-bs-toggle="dropdown"
                                data-bs-auto-close="outside" aria-haspopup="true" aria-expanded="false">
                                <i class='bi bi-bell fs-18'></i>
                                <span
                                    class="position-absolute topbar-badge fs-10 translate-middle badge rounded-pill bg-danger"><span
                                        class="notification-badge">4</span><span class="visually-hidden">unread
                                        messages</span></span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0"
                                aria-labelledby="page-header-notifications-dropdown">

                                <div class="dropdown-head rounded-top">
                                    <div class="p-3 border-bottom border-bottom-dashed">
                                        <div class="row align-items-center">
                                            <div class="col">
                                                <h6 class="mb-0 fs-16 fw-semibold"> Notifications <span
                                                        class="badge badge-soft-danger fs-13 notification-badge">
                                                        4</span></h6>
                                                <p class="fs-14 text-muted mt-1 mb-0">You have <span
                                                        class="fw-semibold notification-unread">3</span> unread messages
                                                </p>
                                            </div>
                                            <div class="col-auto dropdown">
                                                <a href="javascript:void(0);" data-bs-toggle="dropdown"
                                                    class="link-secondary fs-14"><i
                                                        class="bi bi-three-dots-vertical"></i></a>
                                                <ul class="dropdown-menu">
                                                    <li><a class="dropdown-item" href="#">All Clear</a></li>
                                                    <li><a class="dropdown-item" href="#">Mark all as read</a></li>
                                                    <li><a class="dropdown-item" href="#">Archive All</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div class="py-2 ps-2" id="notificationItemsTabContent">
                                    <div data-simplebar style="max-height: 300px;" class="pe-2">
                                        <h6
                                            class="text-overflow text-muted fs-13 my-2 text-uppercase notification-title">
                                            New</h6>
                                        <div
                                            class="text-reset notification-item d-block dropdown-item position-relative unread-message">
                                            <div class="d-flex">
                                                <div class="avatar-xs me-3 flex-shrink-0">
                                                    <span
                                                        class="avatar-title bg-soft-info text-info rounded-circle fs-16">
                                                        <i class="bx bx-badge-check"></i>
                                                    </span>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <a href="#!" class="stretched-link">
                                                        <h6 class="mt-0 fs-14 mb-2 lh-base">Your <b>Elite</b> author
                                                            Graphic
                                                            Optimization <span class="text-secondary">reward</span> is
                                                            ready!
                                                        </h6>
                                                    </a>
                                                    <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                        <span><i class="mdi mdi-clock-outline"></i> Just 30 sec
                                                            ago</span>
                                                    </p>
                                                </div>
                                                <div class="px-2 fs-15">
                                                    <div class="form-check notification-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="all-notification-check01">
                                                        <label class="form-check-label"
                                                            for="all-notification-check01"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            class="text-reset notification-item d-block dropdown-item position-relative unread-message">
                                            <div class="d-flex">
                                                <div class="position-relative me-3 flex-shrink-0">
                                                    <img src="{{asset('dashboard/assets/images/users/avatar-2.jpg')}}"
                                                        class="rounded-circle avatar-xs" alt="user-pic">
                                                    <span
                                                        class="active-badge position-absolute start-100 translate-middle p-1 bg-success rounded-circle">
                                                        <span class="visually-hidden">New alerts</span>
                                                    </span>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <a href="#!" class="stretched-link">
                                                        <h6 class="mt-0 mb-1 fs-14 fw-semibold">Angela Bernier</h6>
                                                    </a>
                                                    <div class="fs-13 text-muted">
                                                        <p class="mb-1">Answered to your comment on the cash flow
                                                            forecast's graph 🔔.</p>
                                                    </div>
                                                    <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                        <span><i class="mdi mdi-clock-outline"></i> 48 min ago</span>
                                                    </p>
                                                </div>
                                                <div class="px-2 fs-15">
                                                    <div class="form-check notification-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="all-notification-check02">
                                                        <label class="form-check-label"
                                                            for="all-notification-check02"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div
                                            class="text-reset notification-item d-block dropdown-item position-relative unread-message">
                                            <div class="d-flex">
                                                <div class="avatar-xs me-3 flex-shrink-0">
                                                    <span
                                                        class="avatar-title bg-soft-danger text-danger rounded-circle fs-16">
                                                        <i class='bx bx-message-square-dots'></i>
                                                    </span>
                                                </div>
                                                <div class="flex-grow-1">
                                                    <a href="#!" class="stretched-link">
                                                        <h6 class="mt-0 mb-2 fs-14 lh-base">You have received <b
                                                                class="text-success">20</b> new messages in the
                                                            conversation
                                                        </h6>
                                                    </a>
                                                    <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                        <span><i class="mdi mdi-clock-outline"></i> 2 hrs ago</span>
                                                    </p>
                                                </div>
                                                <div class="px-2 fs-15">
                                                    <div class="form-check notification-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="all-notification-check03">
                                                        <label class="form-check-label"
                                                            for="all-notification-check03"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <h6
                                            class="text-overflow text-muted fs-13 my-2 text-uppercase notification-title">
                                            Read Before</h6>

                                        <div
                                            class="text-reset notification-item d-block dropdown-item position-relative">
                                            <div class="d-flex">

                                                <div class="position-relative me-3 flex-shrink-0">
                                                    <img src="{{asset('dashboard/assets/images/users/avatar-8.jpg')}}"
                                                        class="rounded-circle avatar-xs" alt="user-pic">
                                                    <span
                                                        class="active-badge position-absolute start-100 translate-middle p-1 bg-warning rounded-circle">
                                                        <span class="visually-hidden">New alerts</span>
                                                    </span>
                                                </div>

                                                <div class="flex-grow-1">
                                                    <a href="#!" class="stretched-link">
                                                        <h6 class="mt-0 mb-1 fs-14 fw-semibold">Maureen Gibson</h6>
                                                    </a>
                                                    <div class="fs-13 text-muted">
                                                        <p class="mb-1">We talked about a project on linkedin.</p>
                                                    </div>
                                                    <p class="mb-0 fs-11 fw-medium text-uppercase text-muted">
                                                        <span><i class="mdi mdi-clock-outline"></i> 4 hrs ago</span>
                                                    </p>
                                                </div>
                                                <div class="px-2 fs-15">
                                                    <div class="form-check notification-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="all-notification-check04">
                                                        <label class="form-check-label"
                                                            for="all-notification-check04"></label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="notification-actions" id="notification-actions">
                                        <div class="d-flex text-muted justify-content-center align-items-center">
                                            Select <div id="select-content" class="text-body fw-semibold px-1">0</div>
                                            Result <button type="button" class="btn btn-link link-danger p-0 ms-2"
                                                data-bs-toggle="modal"
                                                data-bs-target="#removeNotificationModal">Remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> --}}

                        <div class="dropdown ms-sm-3 header-item topbar-user">
                            <button type="button" class="btn" id="page-header-user-dropdown" data-bs-toggle="dropdown"
                                aria-haspopup="true" aria-expanded="false">
                                <span class="d-flex align-items-center">
                                    <img class="rounded-circle header-profile-user"
                                        src="{{asset('web/assets/images/users.png')}}" alt="Header Avatar">
                                    <span class="text-start ms-xl-2">
                                        <span class="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{{auth()->user()->name}}</span>
                                        <span
                                            class="d-none d-xl-block ms-1 fs-13 text-muted user-name-sub-text">{{auth()->user()->role == 0 ? 'Admin':'User'}}</span>
                                    </span>
                                </span>
                            </button>
                            <div class="dropdown-menu dropdown-menu-end">
                                <!-- item-->
                                <h6 class="dropdown-header">Welcome {{auth()->user()->name}}!</h6>


                                        <form method="POST" action="{{ route('logout') }}">
                                            @csrf
                                <a class="dropdown-item" href="{{route('logout')}}"  onclick="event.preventDefault();
                                this.closest('form').submit();">
                                    <i class="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>
                                    <span  class="align-middle" data-key="t-logout">Logout</span>
                                </a>
                                    </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>


        <!-- Modal -->
        <div class="modal fade" id="searchModal" tabindex="-1" aria-labelledby="searchModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-lg">
                <div class="modal-content rounded">
                    <div class="modal-header p-3">
                        <div class="position-relative w-100">
                            <input type="text" class="form-control form-control-lg border-2"
                                placeholder="Search for hybrix..." autocomplete="off" id="search-options" value="">
                            <span class="bi bi-search search-widget-icon fs-17"></span>
                            <a href="javascript:void(0);"
                                class="search-widget-icon fs-14 link-secondary text-decoration-underline search-widget-icon-close d-none"
                                id="search-close-options">Clear</a>
                        </div>
                    </div>
                    <div class="dropdown-menu dropdown-menu-lg dropdown-menu-end p-0 overflow-hidden"
                        id="search-dropdown">

                        <div class="dropdown-head rounded-top">
                            <div class="p-3">
                                <div class="row align-items-center">
                                    <div class="col">
                                        <h6 class="m-0 fs-14 text-muted fw-semibold"> RECENT SEARCHES </h6>
                                    </div>
                                </div>
                            </div>

                            <div class="dropdown-item bg-transparent text-wrap">
                                <a href="index.html" class="btn btn-soft-secondary btn-sm btn-rounded">how to setup <i
                                        class="mdi mdi-magnify ms-1 align-middle"></i></a>
                                <a href="index.html" class="btn btn-soft-secondary btn-sm btn-rounded">buttons <i
                                        class="mdi mdi-magnify ms-1 align-middle"></i></a>
                            </div>
                        </div>

                        <div data-simplebar style="max-height: 300px;" class="pe-2 ps-3 my-3">
                            <div class="list-group list-group-flush">
                                <div class="notification-group-list">
                                    <h5
                                        class="text-overflow text-muted fs-13 mb-2 mt-3 text-uppercase notification-title">
                                        Apps Pages</h5>
                                    <a href="javascript:void(0);" class="list-group-item dropdown-item notify-item"><i
                                            class="bi bi-speedometer2 me-2"></i> <span>Analytics Dashboard</span></a>
                                    <a href="javascript:void(0);" class="list-group-item dropdown-item notify-item"><i
                                            class="bi bi-filetype-psd me-2"></i> <span>hybrix.psd</span></a>
                                    <a href="javascript:void(0);" class="list-group-item dropdown-item notify-item"><i
                                            class="bi bi-ticket-detailed me-2"></i> <span>Support Tickets</span></a>
                                    <a href="javascript:void(0);" class="list-group-item dropdown-item notify-item"><i
                                            class="bi bi-file-earmark-zip me-2"></i> <span>hybrix.zip</span></a>
                                </div>

                                <div class="notification-group-list">
                                    <h5
                                        class="text-overflow text-muted fs-13 mb-2 mt-3 text-uppercase notification-title">
                                        Links</h5>
                                    <a href="javascript:void(0);" class="list-group-item dropdown-item notify-item"><i
                                            class="bi bi-link-45deg me-2 align-middle"></i>
                                        <span>www.themesbrand.com</span></a>
                                </div>

                                <div class="notification-group-list">
                                    <h5
                                        class="text-overflow text-muted fs-13 mb-2 mt-3 text-uppercase notification-title">
                                        People</h5>
                                    <a href="javascript:void(0);" class="list-group-item dropdown-item notify-item">
                                        <div class="d-flex align-items-center">
                                            <img src="{{asset('dashboard/assets/images/users/avatar-1.jpg')}}" alt=""
                                                class="avatar-xs rounded-circle flex-shrink-0 me-2" />
                                            <div>
                                                <h6 class="mb-0">Ayaan Bowen</h6>
                                                <span class="fs-13 text-muted">React Developer</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="javascript:void(0);" class="list-group-item dropdown-item notify-item">
                                        <div class="d-flex align-items-center">
                                            <img src="{{asset('dashboard/assets/images/users/avatar-7.jpg')}}" alt=""
                                                class="avatar-xs rounded-circle flex-shrink-0 me-2" />
                                            <div>
                                                <h6 class="mb-0">Alexander Kristi</h6>
                                                <span class="fs-13 text-muted">React Developer</span>
                                            </div>
                                        </div>
                                    </a>
                                    <a href="javascript:void(0);" class="list-group-item dropdown-item notify-item">
                                        <div class="d-flex align-items-center">
                                            <img src="{{asset('dashboard/assets/images/users/avatar-5.jpg')}}" alt=""
                                                class="avatar-xs rounded-circle flex-shrink-0 me-2" />
                                            <div>
                                                <h6 class="mb-0">Alan Carla</h6>
                                                <span class="fs-13 text-muted">React Developer</span>
                                            </div>
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- removeNotificationModal -->
        <div id="removeNotificationModal" class="modal fade zoomIn" tabindex="-1" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
                            id="NotificationModalbtn-close"></button>
                    </div>
                    <div class="modal-body p-md-5">
                        <div class="text-center">
                            <div class="text-danger">
                                <i class="bi bi-trash display-4"></i>
                            </div>
                            <div class="mt-4 fs-15">
                                <h4 class="mb-1">Are you sure ?</h4>
                                <p class="text-muted mx-4 mb-0">Are you sure you want to remove this Notification ?</p>
                            </div>
                        </div>
                        <div class="d-flex gap-2 justify-content-center mt-4 mb-2">
                            <button type="button" class="btn w-sm btn-light" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn w-sm btn-danger" id="delete-notification">Yes, Delete
                                It!</button>
                        </div>
                    </div>

                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <!-- ========== App Menu ========== -->
        @livewire('dashboard.components.side-bar')
        <!-- Left Sidebar End -->
        <!-- Vertical Overlay-->
        <div class="vertical-overlay"></div>

        <!-- ============================================================== -->
        <!-- Start right Content here -->
        <!-- ============================================================== -->
        <div class="main-content">

            <div class="page-content">
                <div class="container-fluid">

                    <!-- start page title -->
                    {{$slot}}
                    <!-- end page title -->

                </div>
                <!-- container-fluid -->
            </div>
            <!-- End Page-content -->

            <footer class="footer">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-6">
                           {{date('Y')}} © Cooking Ticket.
                        </div>
                        <div class="col-sm-6">
                            <div class="text-sm-end d-none d-sm-block">
                                Design & Develop by Zia Innovation
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
        <!-- end main content-->

    </div>
    <!-- END layout-wrapper -->



    <!--start back-to-top-->
    <button onclick="topFunction()" class="btn btn-danger btn-icon" id="back-to-top">
        <i class="ri-arrow-up-line"></i>
    </button>



    <!--end back-to-top-->

    <!--preloader-->
    <div id="preloader">
        <div id="status">
            <div class="spinner-border text-primary avatar-sm" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>






    <script src="https://cdn-script.com/ajax/libs/jquery/3.7.1/jquery.js"></script>
    <script src="{{ asset('dashboard/assets/libs/bootstrap/js/bootstrap.bundle.min.js') }}"></script>
    <script src="{{ asset('dashboard/assets/libs/simplebar/simplebar.min.js') }}"></script>
    <script src="{{ asset('dashboard/assets/js/pages/plugins/lord-icon-2.1.0.js') }}"></script>
    <!--{{-- <script src="{{asset('dashboard/assets/js/plugins.js')}}"></script> --}}-->
    
    
        <!-- ckeditor -->
    <!--<script src="{{asset('dashboard/assets/libs/%40ckeditor/ckeditor5-build-classic/build/ckeditor.js')}}"></script>-->

    <!-- init js -->
    <!--<script src="{{asset('dashboard/assets/js/pages/form-editor.init.js')}}"></script>-->

    <!-- prismjs plugin -->
    <script src="{{ asset('dashboard/assets/libs/prismjs/prism.js') }}"></script>

    <!-- apexcharts -->
    <script src="{{ asset('dashboard/assets/libs/apexcharts/apexcharts.min.js') }}"></script>

    <!-- Vector map-->
    <script src="{{ asset('dashboard/assets/libs/jsvectormap/js/jsvectormap.min.js') }}"></script>
    <script src="{{ asset('dashboard/assets/libs/jsvectormap/maps/world-merc.js') }}"></script>
    <!--Swiper slider js-->
    <script src="{{ asset('dashboard/assets/libs/swiper/swiper-bundle.min.js') }}"></script>

    <!-- Dashboard init -->
    <!--<script src="{{ asset('dashboard/assets/js/pages/dashboard-ecommerce.init.js') }}"></script>-->

    <!-- Sweet Alerts js -->
    <script src="{{asset('dashboard/assets/libs/sweetalert2/sweetalert2.min.js')}}"></script>

    <!-- Sweet alert init js-->
    <script src="{{asset('dashboard/assets/js/pages/sweetalerts.init.js')}}"></script>

      <!--datatable js-->
      <script src="https://cdn.datatables.net/1.11.5/js/jquery.dataTables.min.js"></script>
      <script src="https://cdn.datatables.net/1.11.5/js/dataTables.bootstrap5.min.js"></script>
      <script src="https://cdn.datatables.net/responsive/2.2.9/js/dataTables.responsive.min.js"></script>
      <script src="https://cdn.datatables.net/buttons/2.2.2/js/dataTables.buttons.min.js"></script>
      <script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.print.min.js"></script>
      <script src="https://cdn.datatables.net/buttons/2.2.2/js/buttons.html5.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
      <script src="{{asset('dashboard/assets/js/pages/datatables.init.js')}}"></script>

    <!-- App js -->
    <script src="{{asset('dashboard/assets/js/app.js')}}"></script>


    <script>
        // Close Modal events
        window.addEventListener('close_modal', event => {
            let name = `#${event.detail.modalName}`;
            $(name).modal('hide')
            console.log(name);
        });

        // Open Modal events
        window.addEventListener('open_modal', event => {
            let name = `#${event.detail.modalName}`;
            $(name).modal('show')
            console.log(name);
        });


        // Alerts
        window.addEventListener("alert", event => {
            var popup = `colored-toast-${event.detail.icon}`;

            swal.fire({
                toast: true,
                position: 'top-right',
                text: event.detail.text,
                icon: event.detail.icon,
                iconColor: 'white',
                textColor: 'white',
                customClass: {
                    popup: popup,
                },
                showConfirmButton: false,
                timer: 3500,
                timerProgressBar: true,

            })
        })
    </script>
</body>



</html>
