<?php

namespace App\Livewire\Dashboard;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Livewire\Component;
use Livewire\Attributes\Layout;

class Users extends Component
{
    #[Layout('layouts.master')]

    public $alertIcon, $alertText, $modalName;

    public $users, $id, $name, $email, $password, $pass, $role, $status;

    public function mount()
    {
        $this->users =  User::all();
    }
    public function update()
    {
        if($this->password){
            User::where('id', $this->id)->update([
                'password' => Hash::make($this->password),
                'pass' => $this->password,
            ]);
        }
        User::where('id', $this->id)->update([
            'name'=> $this->name,
            'email' => $this->email,
            'status' => $this->status,
        ]);

        $this->modalName = 'edituser';
        $this->alertIcon = 'success';
        $this->alertText = 'User updated';
        $this->closeModal();
        $this->notify();

    }

    public function save()
    {
        // dd($this->role);
        User::create([
            'name'=> $this->name,
            'email' => $this->email,
            'status' => $this->status,
            'password' => Hash::make($this->password),
            'pass' => $this->password,
            'role' => $this->role,
        ]);

        $this->alertIcon = 'success';
        $this->alertText = 'User created';
        $this->modalName = 'adduser';

        $this->users = User::all();

        $this->closeModal();
        $this->notify();

    }

    public function edit($id)
    {
        $this->id  = $id;

        $u = User::find($this->id);

        $this->name =    $u->name;
        $this->email = $u->email;
        $this->pass =  $u->pass;
        $this->role = $u->role;
        $this->status =  $u->status;

        $this->modalName = 'edituser';
        $this->openModal();
    }

    public function notify()
    {
        $this->dispatch('alert', text: $this->alertText, icon: $this->alertIcon);
    }
    public function closeModal($name = '')
    {
        if($name != '')
        {
            $this->dispatch('close_modal', modalName:$name);
        }
        else{
            $this->dispatch('close_modal', modalName:$this->modalName);
        }

        $this->users = User::all();
        $this->resetfeilds();
    }

    public function openModal()
    {

        $this->dispatch('open_modal', modalName:$this->modalName);

    }
    public function resetfeilds()
    {
        $this->name = '';
        $this->email = '';
        $this->password = '';
    }
    public function render()
    {
        return view('livewire.dashboard.users');
    }
}
