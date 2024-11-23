@component('mail::message')
# Terima Kasih Telah Menghubungi Kami

Hai {{ $contact['name'] }},

Terima kasih telah menghubungi kami. Kami telah menerima pesan Anda dan akan segera merespons dalam waktu 1x24 jam.

Detail pesan Anda:
- Subjek: {{ $contact['subject'] }}
- Pesan: {{ $contact['message'] }}

Salam,<br>
{{ config('app.name') }}
@endcomponent 