<!DOCTYPE html>
<html lang="hn">

<head>

	<title>Cooking Ticket | Home</title>
    <link rel="shortcut icon" href="{{asset('web/assets/images/favicon_2.png')}}" type="image/x-icon">

	<!-- Stylesheets -->

    @livewire('web.sections.meta')
    @livewire('web.sections.style')


</head>

<body>

	<div class="page-wrapper">

		<!-- Preloader -->
		<div class="preloader"></div>

		<!-- Main Header-->
        @livewire('web.sections.header')
		<!--End Main Header -->

        {{$slot}}

		<!-- Main Footer -->
        @livewire('web.sections.footer')

	</div>
	<!--End pagewrapper-->

	<!--Scroll to top-->
	<div class="scroll-to-top scroll-to-target" data-target="html"><span class="fa fa-arrow-circle-up"></span></div>
	


    @livewire('web.sections.script')

</body>

</html>
