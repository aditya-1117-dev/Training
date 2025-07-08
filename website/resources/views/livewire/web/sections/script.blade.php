<div>
    <script src="{{asset('web/assets/js/jquery.js')}}"></script>
	<script src="{{asset('web/assets/js/popper.min.js')}}"></script>
	<script src="{{asset('web/assets/js/bootstrap.min.js')}}"></script>
	<script src="{{asset('web/assets/js/jquery.mCustomScrollbar.concat.min.js')}}"></script>
	<script src="{{asset('web/assets/js/jquery.fancybox.js')}}"></script>
	<script src="{{asset('web/assets/js/appear.js')}}"></script>
	<script src="{{asset('web/assets/js/owl.js')}}"></script>
	<script src="{{asset('web/assets/js/wow.js')}}"></script>
	<script src="{{asset('web/assets/js/jquery-ui.js')}}"></script>
	<script src="{{asset('web/assets/js/script.js')}}"></script>
    <script type="text/javascript">


        function printDiv() {


            // var printContents = document.getElementById('printarea').innerHTML;

            // console.log(printContents);
            // var originalContents = document.body.innerHTML;

            // document.body.innerHTML = printContents;

            // window.print();

            // document.body.innerHTML = originalContents;


        }

        function printData()
        {
                var printContents = document.querySelector('.printarea').innerHTML;

            console.log(printContents);
            var originalContents = document.body.innerHTML;

            document.body.innerHTML = printContents;

            window.print();

            document.body.innerHTML = originalContents;
        }

        $('#print_btn').on('click',function(){
            printData();
        })

    </script>
</div>
