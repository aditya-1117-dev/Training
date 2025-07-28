<section class="subscribe-section">
    <div class="auto-container">
        <div class="row clearfix">

            <!-- Column -->
            <div class="column col-lg-6 col-md-12 col-sm-12">
                <h2 class="text-light mb-2">{{ session()->get('lang') == "hn" ? "सर्वोत्तम रेसिपी फ़ीड की सदस्यता लें।" : "सर्वोत्तम पाककृती फीडची सदस्यता घ्या." }}</h2>
                <!-- Subscribe Form -->
                <div class="subscribe-form">
                    <form method="post" action="#">
                        <div class="form-group clearfix">
                            <input type="email" name="email" value="" placeholder="{{ session()->get('lang') == "hn" ? "अपना ईमेल दर्ज करें" : "तुमचा ईमेल टाका" }}" required>
                            <button type="submit" class="theme-btn send-btn flaticon-paper-plane-2"></button>
                        </div>
                    </form>
                </div>
                <div class="inbox">{{ session()->get('lang') == "hn" ? "रेसिपी, टिप्स और समाचार अपने इनबॉक्स में प्राप्त करें।" : "तुमच्या इनबॉक्समध्ये पाककृती, टिपा आणि बातम्या मिळवा." }}</div>
            </div>

            <!-- Column -->
            <div class="column col-lg-6 col-md-12 col-sm-12">
                <h1>{{ session()->get('lang') == "hn" ? "हमारे स्टोर पर आएं" : "आमच्या स्टोअरला भेट द्या." }}</h1>
                <div class="bold-text">{{ session()->get('lang') == "hn" ? "यहां आपको सावधानीपूर्वक चुनी गई रसोई सूची मिलेगी।" : "येथे तुम्हाला स्वयंपाकघरातील काळजीपूर्वक निवडलेली यादी मिळेल." }}</div>
                <ul class="subscribe-list">
                    <li>{{ session()->get('lang') == "hn" ? "घर का स्वाद पुणे का नंबर 1 है" : "घरची चव पुण्याची #1 आहे" }}<br> Cooking Ticket</li>
                    @foreach ($categories as $item)
                     <li class="mb-0"> {{ $item[session()->get('lang').'_name'] }} </li>
                    @endforeach
                </ul>
            </div>

        </div>
    </div>
</section>
