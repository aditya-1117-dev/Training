<?php

namespace App\Livewire\Web;

use Livewire\Component;
use App\Mail\ContactMail;
use App\Models\Setting;
use Livewire\Attributes\On;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Session;
use tidy;

class ContactUs extends Component
{

    public $subject, $name, $email, $message, $alert =0;

    public $mr_Title, $hn_Title, $email1, $email2, $contact1, $contact2, $hn_address, $mr_address, $image;

    public $setting;

    #[On('lang-changed')]
    public function mount()
    {
        $this->setting = Setting::find(1);

        // $this->mr_Title = $setting->mr_title;
        // $this->hn_Title = $setting->hn_title;
        // $this->email1 =  $setting->email;
        // $this->email2 = $setting->email2;
        // $this->contact1 = $setting->contact;
        // $this->contact2 = $setting->contat2;
        // $this->mr_address =  $setting->mr_address;
        // $this->hn_address = $setting->hn_address;


    }
    public function sendMail()
    {
        $this->alert = 1;
        $this->dispatch('send-mail')->self();
    }

    #[On('send-mail')]
    public function send()
    {
        $data=['name' => $this->name,'email'=> $this->email, 'subject'=> $this->subject, 'message' => $this->message];
        Mail::to('imtyas.sayad@gmail.com')->send(new ContactMail($data));

        $this->resetalert();


        // $this->dispatch('alert', text: 'Thank you for choosing Coact', icon: 'success');
    }

    public function resetalert()
    {
        $this->alert = 0;
        $this->name = '';
        $this->email = '';
        $this->subject = '';
        $this->message = '';
    }


    public function render()
    {
        return view('livewire.web.contact-us');
    }
}
