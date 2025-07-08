<!doctype html>
<html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="light" data-sidebar-size="lg" data-sidebar-image="none" data-preloader="disable">


<head>

        <meta charset="utf-8" />
        <title>Sign In </title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta content="Cookint Ticket get your favourite recipe" name="description" />
        <meta content="Cooking ticket" name="author" />
        <!-- App favicon -->
        <link rel="shortcut icon" href="{{asset('web/assets/images/favicon_2.png')}}" type="image/x-icon">

        <!-- Layout config Js -->
        <script src="{{asset('dashboard/assets/js/layout.js')}}"></script>
        <!-- Bootstrap Css -->
        <link href="{{asset('dashboard/assets/css/bootstrap.min.css')}}" rel="stylesheet" type="text/css" />
        <!-- Icons Css -->
        <link href="{{asset('dashboard/assets/css/icons.min.css')}}" rel="stylesheet" type="text/css" />
        <!-- App Css-->
        <link href="{{asset('dashboard/assets/css/app.min.css')}}" rel="stylesheet" type="text/css" />
        <!-- custom Css-->
        <link href="{{asset('dashboard/assets/css/custom.min.css')}}" rel="stylesheet" type="text/css" />

    </head>

    <body>


        <section class="auth-page-wrapper-2 py-4 position-relative d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div class="container">
                <div class="row g-0">
                    <div class="col-lg-5">
                        <div class="auth-card card bg-primary h-100 rounded-0 rounded-start border-0 d-flex align-items-center justify-content-center overflow-hidden p-4">
                            <div class="auth-image">
                                <h1 class="text-light">Cooking Ticket</h1>
                                <img src="dashboard/assets/images/effect-pattern/auth-effect-2.png" alt="" class="auth-effect-2" />
                                <img src="dashboard/assets/images/effect-pattern/auth-effect.png" alt="" class="auth-effect" />
                                <img src="dashboard/assets/images/effect-pattern/auth-effect.png" alt="" class="auth-effect" />
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="card mb-0 rounded-0 rounded-end border-0">
                            <div class="card-body p-4 p-sm-5 m-lg-4">
                                <div class="text-center mt-2">
                                    <h5 class="text-primary fs-22">Welcome Back !</h5>
                                    <p class="text-muted">Sign in to continue to Cooking Ticket.</p>
                                </div>
                                <div class="p-2 mt-5">
                                    <form action="{{route('login')}}" method="POST">
                                        @csrf
                                        <div class="mb-3">
                                            <label for="username" class="form-label">Username</label>
                                            <div class="input-group">
                                                <span class="input-group-text bg-card-custom" id="basic-addon1"><i class="ri-user-3-line"></i></span>
                                                <input type="text" class="form-control" name="email" placeholder="Enter Email" value="{{old('email')}}">
                                            </div>
                                            @error('email')
                                            <span class="text-danger">{{$message}}</span>
                                        @enderror
                                        </div>

                                        <div class="mb-3">
                                            <div class="float-end">
                                                {{-- <a href="auth-pass-reset-basic.html" class="text-muted">Forgot password?</a> --}}
                                            </div>
                                            <label class="form-label" for="password-input">Password</label>
                                            <div class="position-relative auth-pass-inputgroup overflow-hidden">
                                                <div class="input-group">
                                                    <span class="input-group-text bg-card-custom" id="basic-addon1"><i class="ri-lock-2-line"></i></span>
                                                    <input type="password" class="form-control pe-5 password-input" placeholder="Enter password" name="password">
                                                </div>
                                                @error('password')
                                                <span class="text-danger">{{$message}}</span>
                                            @enderror
                                                <button class="btn btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon"><i class="ri-eye-fill align-middle"></i></button>
                                            </div>
                                        </div>
                                        <div class="mt-4">
                                            <button class="btn btn-primary w-100" type="submit">Sign In</button>
                                        </div>


                                    </form>
                                </div>
                            </div>
                            <!-- end card body -->
                        </div>
                        <!-- end card -->
                    </div>
                </div>
            </div>
        </section>

        <!-- JAVASCRIPT -->
        <script src="{{asset('dsahboard/assets/libs/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
        <script src="{{asset('dsahboard/assets/libs/simplebar/simplebar.min.js')}}"></script>
        <script src="{{asset('dashboard/assets/js/pages/plugins/lord-icon-2.1.0.js')}}"></script>
        {{-- <script src="{{asset('dashboard/assets/js/plugins.js')}}"></script> --}}


        {{-- <script src="{{asset('dashboard/assets/js/pages/two-step-verification.init.js')}}"></script> --}}

    </body>


</html>
