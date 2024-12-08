const Ziggy = {"url":"http:\/\/localhost","port":null,"defaults":{},"routes":{"sanctum.csrf-cookie":{"uri":"sanctum\/csrf-cookie","methods":["GET","HEAD"]},"welcome":{"uri":"\/","methods":["GET","HEAD"]},"login":{"uri":"login","methods":["GET","HEAD"]},"logout":{"uri":"logout","methods":["POST"]},"admin.dashboard":{"uri":"admin","methods":["GET","HEAD"]},"admin.program-studi.index":{"uri":"admin\/program-studi","methods":["GET","HEAD"]},"program-studi.create":{"uri":"admin\/program-studi\/create","methods":["GET","HEAD"]},"admin.program-studi.store":{"uri":"admin\/program-studi","methods":["POST"]},"program-studi.show":{"uri":"admin\/program-studi\/{program_studi}","methods":["GET","HEAD"],"parameters":["program_studi"]},"program-studi.edit":{"uri":"admin\/program-studi\/{program_studi}\/edit","methods":["GET","HEAD"],"parameters":["program_studi"]},"admin.program-studi.update":{"uri":"admin\/program-studi\/{program_studi}","methods":["PUT","PATCH"],"parameters":["program_studi"]},"admin.program-studi.destroy":{"uri":"admin\/program-studi\/{program_studi}","methods":["DELETE"],"parameters":["program_studi"]},"admin.gelombang.index":{"uri":"admin\/gelombang","methods":["GET","HEAD"]},"gelombang.create":{"uri":"admin\/gelombang\/create","methods":["GET","HEAD"]},"admin.gelombang.store":{"uri":"admin\/gelombang","methods":["POST"]},"gelombang.show":{"uri":"admin\/gelombang\/{gelombang}","methods":["GET","HEAD"],"parameters":["gelombang"]},"gelombang.edit":{"uri":"admin\/gelombang\/{gelombang}\/edit","methods":["GET","HEAD"],"parameters":["gelombang"]},"admin.gelombang.update":{"uri":"admin\/gelombang\/{gelombang}","methods":["PUT","PATCH"],"parameters":["gelombang"]},"admin.gelombang.destroy":{"uri":"admin\/gelombang\/{gelombang}","methods":["DELETE"],"parameters":["gelombang"]},"admin.jalur-masuk.index":{"uri":"admin\/jalur-masuk","methods":["GET","HEAD"]},"jalur-masuk.create":{"uri":"admin\/jalur-masuk\/create","methods":["GET","HEAD"]},"admin.jalur-masuk.store":{"uri":"admin\/jalur-masuk","methods":["POST"]},"jalur-masuk.show":{"uri":"admin\/jalur-masuk\/{jalur_masuk}","methods":["GET","HEAD"],"parameters":["jalur_masuk"]},"jalur-masuk.edit":{"uri":"admin\/jalur-masuk\/{jalur_masuk}\/edit","methods":["GET","HEAD"],"parameters":["jalur_masuk"]},"admin.jalur-masuk.update":{"uri":"admin\/jalur-masuk\/{jalur_masuk}","methods":["PUT","PATCH"],"parameters":["jalur_masuk"]},"admin.jalur-masuk.destroy":{"uri":"admin\/jalur-masuk\/{jalur_masuk}","methods":["DELETE"],"parameters":["jalur_masuk"]},"admin.dokumen.index":{"uri":"admin\/dokumen","methods":["GET","HEAD"]},"dokumen.create":{"uri":"admin\/dokumen\/create","methods":["GET","HEAD"]},"admin.dokumen.store":{"uri":"admin\/dokumen","methods":["POST"]},"dokumen.show":{"uri":"admin\/dokumen\/{dokuman}","methods":["GET","HEAD"],"parameters":["dokuman"]},"dokumen.edit":{"uri":"admin\/dokumen\/{dokuman}\/edit","methods":["GET","HEAD"],"parameters":["dokuman"]},"admin.dokumen.update":{"uri":"admin\/dokumen\/{dokuman}","methods":["PUT","PATCH"],"parameters":["dokuman"]},"admin.dokumen.destroy":{"uri":"admin\/dokumen\/{dokuman}","methods":["DELETE"],"parameters":["dokuman"]},"admin.biaya.index":{"uri":"admin\/biaya","methods":["GET","HEAD"]},"biaya.create":{"uri":"admin\/biaya\/create","methods":["GET","HEAD"]},"admin.biaya.store":{"uri":"admin\/biaya","methods":["POST"]},"biaya.show":{"uri":"admin\/biaya\/{biaya}","methods":["GET","HEAD"],"parameters":["biaya"]},"biaya.edit":{"uri":"admin\/biaya\/{biaya}\/edit","methods":["GET","HEAD"],"parameters":["biaya"]},"admin.biaya.update":{"uri":"admin\/biaya\/{biaya}","methods":["PUT","PATCH"],"parameters":["biaya"]},"admin.biaya.destroy":{"uri":"admin\/biaya\/{biaya}","methods":["DELETE"],"parameters":["biaya"]},"admin.pengumuman.index":{"uri":"admin\/pengumuman","methods":["GET","HEAD"]},"pengumuman.create":{"uri":"admin\/pengumuman\/create","methods":["GET","HEAD"]},"admin.pengumuman.store":{"uri":"admin\/pengumuman","methods":["POST"]},"pengumuman.show":{"uri":"admin\/pengumuman\/{pengumuman}","methods":["GET","HEAD"],"parameters":["pengumuman"]},"pengumuman.edit":{"uri":"admin\/pengumuman\/{pengumuman}\/edit","methods":["GET","HEAD"],"parameters":["pengumuman"]},"admin.pengumuman.update":{"uri":"admin\/pengumuman\/{pengumuman}","methods":["PUT","PATCH"],"parameters":["pengumuman"],"bindings":{"pengumuman":"id"}},"admin.pengumuman.destroy":{"uri":"admin\/pengumuman\/{pengumuman}","methods":["DELETE"],"parameters":["pengumuman"],"bindings":{"pengumuman":"id"}},"admin.jadwal-ujian.index":{"uri":"admin\/jadwal-ujian","methods":["GET","HEAD"]},"jadwal-ujian.create":{"uri":"admin\/jadwal-ujian\/create","methods":["GET","HEAD"]},"admin.jadwal-ujian.store":{"uri":"admin\/jadwal-ujian","methods":["POST"]},"jadwal-ujian.show":{"uri":"admin\/jadwal-ujian\/{jadwal_ujian}","methods":["GET","HEAD"],"parameters":["jadwal_ujian"]},"jadwal-ujian.edit":{"uri":"admin\/jadwal-ujian\/{jadwal_ujian}\/edit","methods":["GET","HEAD"],"parameters":["jadwal_ujian"]},"admin.jadwal-ujian.update":{"uri":"admin\/jadwal-ujian\/{jadwal_ujian}","methods":["PUT","PATCH"],"parameters":["jadwal_ujian"]},"admin.jadwal-ujian.destroy":{"uri":"admin\/jadwal-ujian\/{jadwal_ujian}","methods":["DELETE"],"parameters":["jadwal_ujian"]},"admin.faq.index":{"uri":"admin\/faq","methods":["GET","HEAD"]},"faq.create":{"uri":"admin\/faq\/create","methods":["GET","HEAD"]},"admin.faq.store":{"uri":"admin\/faq","methods":["POST"]},"faq.show":{"uri":"admin\/faq\/{faq}","methods":["GET","HEAD"],"parameters":["faq"]},"faq.edit":{"uri":"admin\/faq\/{faq}\/edit","methods":["GET","HEAD"],"parameters":["faq"]},"admin.faq.update":{"uri":"admin\/faq\/{faq}","methods":["PUT","PATCH"],"parameters":["faq"]},"admin.faq.destroy":{"uri":"admin\/faq\/{faq}","methods":["DELETE"],"parameters":["faq"]},"pendaftar.index":{"uri":"admin\/pendaftar","methods":["GET","HEAD"]},"pendaftar.create":{"uri":"admin\/pendaftar\/create","methods":["GET","HEAD"]},"pendaftar.store":{"uri":"admin\/pendaftar","methods":["POST"]},"pendaftar.show":{"uri":"admin\/pendaftar\/{pendaftar}","methods":["GET","HEAD"],"parameters":["pendaftar"]},"pendaftar.edit":{"uri":"admin\/pendaftar\/{pendaftar}\/edit","methods":["GET","HEAD"],"parameters":["pendaftar"]},"pendaftar.update":{"uri":"admin\/pendaftar\/{pendaftar}","methods":["PUT","PATCH"],"parameters":["pendaftar"]},"pendaftar.destroy":{"uri":"admin\/pendaftar\/{pendaftar}","methods":["DELETE"],"parameters":["pendaftar"]},"admin.pendaftar.verifikasi-dokumen":{"uri":"admin\/pendaftar\/{id}\/verifikasi-dokumen","methods":["POST"],"parameters":["id"]},"admin.pendaftar.verifikasi-pembayaran":{"uri":"admin\/pendaftar\/{id}\/verifikasi-pembayaran","methods":["POST"],"parameters":["id"]},"admin.pembayaran.index":{"uri":"admin\/pembayaran","methods":["GET","HEAD"]},"pembayaran.create":{"uri":"admin\/pembayaran\/create","methods":["GET","HEAD"]},"pembayaran.store":{"uri":"admin\/pembayaran","methods":["POST"]},"pembayaran.show":{"uri":"admin\/pembayaran\/{pembayaran}","methods":["GET","HEAD"],"parameters":["pembayaran"]},"pembayaran.edit":{"uri":"admin\/pembayaran\/{pembayaran}\/edit","methods":["GET","HEAD"],"parameters":["pembayaran"]},"admin.pembayaran.update":{"uri":"admin\/pembayaran\/{pembayaran}","methods":["PUT","PATCH"],"parameters":["pembayaran"]},"pembayaran.destroy":{"uri":"admin\/pembayaran\/{pembayaran}","methods":["DELETE"],"parameters":["pembayaran"]},"admin.laporan.index":{"uri":"admin\/laporan","methods":["GET","HEAD"]},"admin.berita.index":{"uri":"admin\/berita","methods":["GET","HEAD"]},"berita.create":{"uri":"admin\/berita\/create","methods":["GET","HEAD"]},"admin.berita.store":{"uri":"admin\/berita","methods":["POST"]},"berita.show":{"uri":"admin\/berita\/{beritum}","methods":["GET","HEAD"],"parameters":["beritum"]},"berita.edit":{"uri":"admin\/berita\/{beritum}\/edit","methods":["GET","HEAD"],"parameters":["beritum"]},"admin.berita.update":{"uri":"admin\/berita\/{beritum}","methods":["PUT","PATCH"],"parameters":["beritum"]},"admin.berita.destroy":{"uri":"admin\/berita\/{beritum}","methods":["DELETE"],"parameters":["beritum"]},"admin.dokumen.verify":{"uri":"admin\/dokumen\/{id}\/verify","methods":["POST"],"parameters":["id"]},"admin.pembayaran.verify":{"uri":"admin\/pembayaran\/{id}\/verify","methods":["POST"],"parameters":["id"]},"admin.pengumuman.announce":{"uri":"admin\/pengumuman\/announce","methods":["POST"]},"admin.pendaftar.export":{"uri":"admin\/pendaftar\/export","methods":["GET","HEAD"]},"dashboard":{"uri":"dashboard","methods":["GET","HEAD"]},"prodi.ti":{"uri":"prodi\/ti","methods":["GET","HEAD"]},"prodi.si":{"uri":"prodi\/si","methods":["GET","HEAD"]},"prodi.mi":{"uri":"prodi\/mi","methods":["GET","HEAD"]},"prodi.ka":{"uri":"prodi\/ka","methods":["GET","HEAD"]},"facilities":{"uri":"facilities","methods":["GET","HEAD"]},"about":{"uri":"about","methods":["GET","HEAD"]},"pmb":{"uri":"pmb","methods":["GET","HEAD"]},"contact":{"uri":"contact","methods":["GET","HEAD"]},"contact.store":{"uri":"contact","methods":["POST"]},"pmb.dashboard":{"uri":"pmb\/dashboard","methods":["GET","HEAD"]},"pmb.register":{"uri":"pmb\/register","methods":["GET","HEAD"]},"pmb.register.store":{"uri":"pmb\/register\/store","methods":["POST"]},"pmb.status-pendaftaran":{"uri":"pmb\/status-pendaftaran","methods":["GET","HEAD"]},"pmb.dokumen":{"uri":"pmb\/dokumen","methods":["GET","HEAD"]},"pmb.dokumen.store":{"uri":"pmb\/dokumen\/store","methods":["POST"]},"pmb.pembayaran":{"uri":"pmb\/pembayaran","methods":["GET","HEAD"]},"pmb.pembayaran.store":{"uri":"pmb\/pembayaran\/store","methods":["POST"]},"pmb.jadwal":{"uri":"pmb\/jadwal","methods":["GET","HEAD"]},"pmb.pengumuman":{"uri":"pmb\/pengumuman","methods":["GET","HEAD"]},"register":{"uri":"register","methods":["POST"]},"password.request":{"uri":"forgot-password","methods":["GET","HEAD"]},"password.email":{"uri":"forgot-password","methods":["POST"]},"password.reset":{"uri":"reset-password\/{token}","methods":["GET","HEAD"],"parameters":["token"]},"password.store":{"uri":"reset-password","methods":["POST"]},"verification.notice":{"uri":"verify-email","methods":["GET","HEAD"]},"verification.verify":{"uri":"verify-email\/{id}\/{hash}","methods":["GET","HEAD"],"parameters":["id","hash"]},"verification.send":{"uri":"email\/verification-notification","methods":["POST"]},"password.confirm":{"uri":"confirm-password","methods":["GET","HEAD"]},"password.update":{"uri":"password","methods":["PUT"]}}};
if (typeof window !== 'undefined' && typeof window.Ziggy !== 'undefined') {
  Object.assign(Ziggy.routes, window.Ziggy.routes);
}
export { Ziggy };
