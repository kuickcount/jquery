// Daftar situs yang diizinkan
        var daftarSitusDiizinkan = [
            'https://www.livetvmalaysia.online',
            'https://www.tvmy.online',
            'https://www.aladala.tv'
        ];

        // Fungsi untuk memeriksa referer dan menghapus iframe jika tidak diizinkan
        function periksaReferer() {
            var referer = document.referrer;
            var diizinkan = false;

            for (var i = 0; i < daftarSitusDiizinkan.length; i++) {
                if (referer.indexOf(daftarSitusDiizinkan[i]) === 0) {
                    diizinkan = true;
                    break;
                }
            }

            if (!diizinkan) {
                // Hapus semua elemen dalam badan dokumen
                document.body.innerHTML = '';

                // Tampilkan pesan "Not Found"
                var notFoundMessage = document.createElement('h1');
                notFoundMessage.textContent = 'Not Found';
                document.body.appendChild(notFoundMessage);
            } else {
                // Inisialisasi player jika referer diizinkan
                var player = new Clappr.Player({
                    source: "https://tonton-live-ssai.akamaized.net/live/0e27ef78-4cc9-4c62-bec9-5c946c9e7354/cmaf.isml/.m3u8",
                    plugins: {playback: [DashShakaPlayback]},
                    parentId: "#player",
                    width: "100%",
                    height: "100%",
                    autoPlay: true,
                    poster: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg5QqMByb_mhkJafqOaObfrR2rg5AVFm4F_UMSWtS_eUjRJt3fQBS4kaVPaaQEkPd0VfQXdUwiHiZ9rU5ACSQZjnewdv2K8FmHpAmRgZq8WvX_0fTwwNfHVJIeaSp89yJpZ_lisQDQfGZsUgtivXkNd3I2B7sMlBZA6lWFoVrnYWB5IuL_zZO7LGXscxg/w320-h173-rw/didiktv%20live%20online%20malaysia.jpg"
                });
                
                function onFullScreenChange() {
                    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
                        // Memasuki mode layar penuh
                        if (screen.orientation && screen.orientation.lock) {
                            screen.orientation.lock('landscape');
                        }
                    } else {
                        // Keluar dari mode layar penuh
                        if (screen.orientation && screen.orientation.unlock) {
                            screen.orientation.unlock();
                        }
                    }
                }

                document.addEventListener('fullscreenchange', onFullScreenChange);
                document.addEventListener('webkitfullscreenchange', onFullScreenChange);
                document.addEventListener('mozfullscreenchange', onFullScreenChange);
                document.addEventListener('MSFullscreenChange', onFullScreenChange);
            }
        }

        // Panggil fungsi periksaReferer saat halaman dimuat
        window.onload = function() {
            periksaReferer();
        };
