@component('mail::message')
# Pesan Baru dari Website

**Dari:** {{ $contact['name'] }}  
**Email:** {{ $contact['email'] }}  
**Subjek:** {{ $contact['subject'] }}

**Pesan:**  
{{ $contact['message'] }}

@component('mail::button', ['url' => config('app.url').'/admin/contacts'])
Lihat di Dashboard
@endcomponent

Terima kasih,<br>
{{ config('app.name') }}
@endcomponent 