<!doctype html>
<html lang="en" data-layout="vertical" data-topbar="light" data-sidebar="light" data-sidebar-size="lg" data-sidebar-image="none" data-preloader="disable">


<head>

    <meta charset="utf-8" />
    <title>Unathorized User</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
        <meta content="Cookint Ticket get your favourite recipe" name="description" />
        <meta content="Cooking ticket" name="author" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="{{asset('dahboard/assets/images/favicon.ico')}}">

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
                            {{-- <img src="dashboard/assets/images/logo-light-full.png" alt="" height="42" /> --}}
                            <h1 class="text-light"> Cooking Ticket</h1>
                            <img src="dashboard/assets/images/effect-pattern/auth-effect-2.png" alt="" class="auth-effect-2" />
                            <img src="dashboard/assets/images/effect-pattern/auth-effect.png" alt="" class="auth-effect" />
                            <img src="dashboard/assets/images/effect-pattern/auth-effect.png" alt="" class="auth-effect-3" />
                        </div>
                    </div>
                </div>
                <div class="col-lg-7">
                    <div class="card mb-0 rounded-0 rounded-end border-0">
                        <div class="card-body p-4 p-sm-5 m-lg-4 text-center">
                            <div class="text-center px-5">
                                <h1 class="error-title mb-0">401</h1>
                              </div>
                              <div class="mt-2 text-center">
                                  <div class="position-relative">
                                      <h4 class="fs-18 error-subtitle text-uppercase mb-0">Opps, You are not authorised.</h4>
                                      <p class="fs-15 text-muted mt-3">It will be as simple as Occidental in fact,
                                           it will Occidental to an English person</p>
                                          <div class="mt-4">
                                              <a href="{{route('index')}}" class="btn btn-primary"><i class="mdi mdi-home me-1"></i>Back to home</a>
                                          </div>
                                   </div>
                              </div>
                        </div><!-- end card body -->
                    </div>
                    <!-- end card -->
                </div><!--end col-->
            </div><!--end row-->
        </div><!--edn container-->
    </section>

    <!-- JAVASCRIPT -->
    <script src="{{asset('dashboard/assets/libs/bootstrap/js/bootstrap.bundle.min.js')}}"></script>
    <script src="{{asset('dashboard/assets/libs/simplebar/simplebar.min.js')}}"></script>
    <script src="{{asset('dashboard/assets/js/pages/plugins/lord-icon-2.1.0.js')}}"></script>
    {{-- <script src="{{asset('dashboard/assets/js/plugins.js')}}"></script> --}}

</body>


</html>
