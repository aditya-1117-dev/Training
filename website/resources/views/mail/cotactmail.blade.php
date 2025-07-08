<x-mail::message>
Hello Admin,</br>


You have message from {{$name}}. Eamil {{$email}}</br>

Message:

{{$message}}


Thanks,<br>
{{ config('app.name') }}
</x-mail::message>
