<div>

		<!-- Page Title -->
        <section class="page-title" style="background-image:url({{asset('web/assets/images/background/14.jpg')}})">
            <div class="auto-container">
                <h1>{{session()->get('lang') == 'hn'? 'वीडियो के साथ रेसिपी' : 'व्हिडिओसह पाककृती'}}</h1>
            </div>
        </section>
		<!--End Page Title-->

		<!-- Product Form Section -->
        @livewire('web.sections.product')
		<!-- End Keyword Section -->

		<!-- Video Section -->
        @livewire('web.sections.video')
		<!-- End Video Section -->

		<!-- Trending Recipes Section -->
        @livewire('web.sections.trending-recipes')
		<!-- End Trending Recipes Section -->

		<!-- Subscribe Section -->
        @livewire('web.sections.subscribe')
		<!-- End Subscribe Section -->

		<!-- Instagram Section -->
        @livewire('web.sections.instagram')
		<!-- End Instagram Section -->
</div>
