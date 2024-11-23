<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Mail\ContactFormMail;
use App\Mail\ContactAutoReply;
use Illuminate\Support\Facades\Mail;
use Inertia\Inertia;

class ContactController extends Controller
{
    public function index()
    {
        return Inertia::render('Contact/Index');
    }

    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|email',
                'subject' => 'required|string|max:255',
                'message' => 'required|string',
            ]);

            // Log sebelum mengirim email
            \Log::info('Mencoba mengirim email ke: ' . $validated['email']);

            // Kirim email ke admin
            Mail::to('habibiexecutive@gmail.com')->send(new ContactFormMail($validated));

            // Kirim auto-reply ke pengirim
            Mail::to($validated['email'])->send(new ContactAutoReply($validated));

            \Log::info('Email berhasil dikirim');

            return back()->with('success', 'Pesan Anda telah terkirim!');
        } catch (\Exception $e) {
            \Log::error('Error saat mengirim email: ' . $e->getMessage());
            return back()->with('error', 'Terjadi kesalahan saat mengirim pesan.');
        }
    }
} 