<div>
   <!-- Page Title -->
    <section class="page-title" style="background-image:url({{asset('web/assets/images/background/14.jpg')}})">
        <div class="auto-container">
            <h1>{{session()->get('lang') == 'hn'? ' संपर्क करें' : 'संपर्क साधा'}}</h1>
        </div>
    </section>
		<!--End Page Title-->

		<!-- Contact Page Container -->
		<div class="contact-page-container">
			<div class="pattern-layer" style="background-image:url({{asset  ('web/assets/images/background/16.png')}})"></div>
			<div class="auto-container">
				<div class="row clearfix">

					<!-- Info Column -->
					<div class="info-column col-lg-6 col-md-12 col-sm-12">
						<div class="inner-column">
							<!-- Sec Title -->
							<div class="sec-title">
                                        <h2>{{session()->get('lang') == 'hn' ? 'संपर्क करें' : 'आमच्याशी संपर्क साधा'}}</h2>

								<div class="text">{{session()->get('lang') == 'hn' ? $hn_Title : $mr_Title}}</div>
							</div>
							<ul class="contact-info-list">
								<li>Address : {{ $setting[session()->get('lang').'_address']}}5</li>
								<li>Email : <a href="mailto:{{$setting->email}}"> {{$setting->email}} </a></li>
								<li>Phone : <a href="tel:+{{$setting->contact}}"> {{$setting->contact}} </a></li>
							</ul>
							<div class="map">
								<img src="{{asset('web/assets/images/icons/map.png')}}" alt="" />
							</div>
						</div>
					</div>

					<!-- Form Column -->
					<div class="form-column col-lg-6 col-md-12 col-sm-12">
						<div class="inner-column">

							<!-- Contact Form -->
							<div class="contact-form">

								<!-- Contact Form -->
								<form wire:submit.prevent = 'sendMail'>

									<div class="form-group">
										<input type="text" wire:model= 'subject' placeholder="{{ session()->get('lang') == "hn" ? "विषय." : "विषय." }}" required>
									</div>

									<div class="form-group">
										<input type="text" wire:model='name' placeholder="{{ session()->get('lang') == "hn" ? "नाम." : "नाव." }}" required>
									</div>

									<div class="form-group">
										<input type="email" wire:model='email' placeholder="{{ session()->get('lang') == "hn" ? "ईमेल." : "ईमेल." }}" required>
									</div>

									<div class="form-group">
										<textarea class="darma" wire:model='message'
											placeholder="{{ session()->get('lang') == "hn" ? "संदेश..." : "संदेश..." }}"></textarea>
									</div>

									<div class="form-group text-center">

                                        @if ($alert == 1)
                                        <span class="bg-info px-2 text-light" style="border-radius:10px" >Sending Email..  </span>
                                    @else
                                    <button class="theme-btn btn-style-one" type="submit" name="submit-form"><span
                                        class="txt">{{session()->get('lang') == 'hn' ? 'मेसेज भेजें' : 'संदेश पाठवा'}}</span></button>
                                    @endif


									</div>

								</form>

							</div>
							<!-- End Contact Form -->

						</div>
					</div>

				</div>
			</div>
		</div>

		<!-- Instagram Section -->
		@livewire('web.sections.instagram')
		<!-- End Instagram Section -->
</div>
