let
    gozlem_yeri_enlem = document.getElementById("gozlem_yeri_enlem"),
    gozlem_yeri_boylam = document.getElementById("gozlem_yeri_boylam"),
    gozlenen_yildiz_enlem = document.getElementById("gozlenen_yildiz_enlem"),
    gozlem_baslangic_tarihi = document.getElementById("gozlem_baslangic_tarihi"),
    gozlem_verileri = document.getElementById("gozlem_verileri"),
    gozlem_analiz_dugmesi = document.getElementById("gozlem_analiz_dugmesi");

gozlem_analiz_dugmesi.addEventListener("click", analizIslemleri);

let olcumler;

let dataSet_c1_kadir_havakutlesi = {};
let dataSet_v_kadir_havakutlesi = {};
let sonumleme_sabitleri = {};

const filtreler = ['U', 'B', 'V'];
function analizIslemleri() {
    olcumler = verileriCek();                           // Girilen veriler array haline getirildi.
    olcumler = gokParlakliklariniCikart(olcumler);      // Gök parlıkları çıkartıldı.
    olcumler = tarihBilgisiEkle(olcumler);              // tarih bilgisi eklendi.
    olcumler = yildizZamaniHesapla(olcumler);           // Yıldız zamanı hesaplandı.
    olcumler = havaKutlesiHesapla(olcumler);            // Hava Kütlesi hesaplandı.
    olcumler = mukayeseKadirHesapla(olcumler);          // Mukayese yıldızının kadir değerleri hesaplandı.
    c1_kadir_havakutlesi_dataseti_olustur();
    sonumlemeSabitleriniHesapla();
    olcumler = degiskenYildizKadiriHesapla(olcumler);   // Değişen yıldızın kadir değerleri hesaplandı.

    grafikNesneleriniOlustur();

    c1_kadir_havakutlesigrafigi();
    sonumlemeSabitleriniSayfayaEkle();

    olcumler = degiskenYildizAtmosferDisiKadiriHesapla(olcumler);
    v_kadir_zaman_dataseti_olustur();
    v_kadir_zamangrafigi();
    console.log(olcumler);
}
function grafikNesneleriniOlustur(){
    const element = document.getElementById("sagpencere");
    element.innerHTML += '<canvas id="grafik-c1-kadir-havakutlesi"></canvas>';
    element.innerHTML += '<div id="sonumleme-sabiti-cerceve">';
    element.innerHTML += '<div id="sonumleme-U"><p class="sonumleme-sabiti-baslik">U Sonumleme Sabiti</p><p class="sonumleme-sabiti-deger"></p></div>';
    element.innerHTML += '<div id="sonumleme-B"><p class="sonumleme-sabiti-baslik">B Sonumleme Sabiti</p><p class="sonumleme-sabiti-deger"></p></div>';
    element.innerHTML += '<div id="sonumleme-V"><p class="sonumleme-sabiti-baslik">V Sonumleme Sabiti</p><p class="sonumleme-sabiti-deger"></p></div>';
    element.innerHTML += '</div><canvas id="grafik-v-kadir-zaman"></canvas>';
}
function sonumlemeSabitleriniSayfayaEkle() {

    filtreler.forEach(filtre => {
        element = document.getElementById("sonumleme-" + filtre).getElementsByClassName("sonumleme-sabiti-deger")[0];
        element.innerHTML = sonumleme_sabitleri[filtre];
    });
    document.getElementById('sonumleme-sabiti-cerceve').style.visibility = "visible";
}
function sonumlemeSabitleriniHesapla() {

    filtreler.forEach(filtre => {
        let veriSeti = dataSet_c1_kadir_havakutlesi[filtre];
        let n = veriSeti.length;
        let toplam_X = 0, toplam_Y = 0, toplam_XY = 0, toplam_X2 = 0;
        veriSeti.forEach(veri => {
            toplam_X += veri.x;
            toplam_Y += veri.y;
            toplam_XY += veri.x * veri.y;
            toplam_X2 += Math.pow(veri.x, 2);
        });

        let b = ((toplam_X * toplam_XY) - (toplam_X2 * toplam_Y)) / (Math.pow(toplam_X, 2) - (toplam_X2 * n));
        let a = (toplam_Y - b * n) / toplam_X;
        sonumleme_sabitleri[filtre] = a;
        

    });

}
function c1_kadir_havakutlesi_dataseti_olustur() {
    dataSet_c1_kadir_havakutlesi = {};
    filtreler.forEach(filtre => {
        dataSet_c1_kadir_havakutlesi[filtre] = kadir_havaKutlesi_verileriCek("C1", filtre);
    });
}

function verileriCek() {
    let olcumler = gozlem_verileri.value.split("\n");

    olcumler = olcumler.map(satir => {
        return satir.split(" ").filter(veri => veri != "");
    });

    olcumler = olcumler.map(olcum => {

        const ortalama = (parseFloat(olcum[2]) + parseFloat(olcum[3]) + parseFloat(olcum[4])) / 3;
        let obje = {};
        obje.yildizSembolu = olcum[0]
        obje[olcum[1]] = "";
        obje[olcum[1]] = {
            parlaklik: ortalama,
            saat: olcum[5]
        }

        return obje;
    });

    let sonSembol;
    let ayniSembolTekrarSayisi;
    let obje = {};
    let yeniOlcumler = [];
    olcumler.forEach(olcum => {
        if (sonSembol == null || olcum.yildizSembolu != sonSembol) {
            sonSembol = olcum.yildizSembolu;
            ayniSembolTekrarSayisi = 0;
            obje = {};
            obje.yildizSembolu = olcum.yildizSembolu;
        }

        obje[filtreler[ayniSembolTekrarSayisi]] = {};
        obje[filtreler[ayniSembolTekrarSayisi]].parlaklik = olcum[filtreler[ayniSembolTekrarSayisi]].parlaklik;
        obje[filtreler[ayniSembolTekrarSayisi]].saat = olcum[filtreler[ayniSembolTekrarSayisi]].saat;

        if (ayniSembolTekrarSayisi == 0)
            yeniOlcumler.push(obje);

        ayniSembolTekrarSayisi++;
    });



    return yeniOlcumler;
}

function verileriDuzenle(olcumler) {
    let sonSembol, simdikiSembol;

    for (let i = 0, degisiklik = false; i < olcumler.length - 1; i += degisiklik && i > 0 ? -1 : 1, degisiklik = false) {
        simdikiSembol = olcumler[i].yildizSembolu.replace("S", "");

        if (sonSembol == null || simdikiSembol != sonSembol) {
            sonSembol = simdikiSembol;
        }
        else {
            if (olcumler[i].yildizSembolu.indexOf("S") == -1 && olcumler[i + 1].yildizSembolu.indexOf("S") != -1) {
                let aparatObje = olcumler[i];
                olcumler[i] = olcumler[i + 1];
                olcumler[i + 1] = aparatObje;
                degisiklik = true;
            }
        }

    }

    return olcumler;
}

function gokParlakliklariniCikart(olcumler) {

    olcumler = gokParlagiAnalizFormatinaCevir(olcumler);

    let gokParlakligindanArindirilmisOlcumler = [];
    let islemeAlinacakOlcumler = [];

    for (let i = 0; i < olcumler.length; i++) {

        let sembol = olcumler[i].yildizSembolu;
        if (sembol.indexOf("S") != -1)
            islemeAlinacakOlcumler[0] = olcumler[i];
        else {
            islemeAlinacakOlcumler[1] = olcumler[i];
            gokParlakliginiCikart();
        }

    }

    function gokParlakliginiCikart() {
        filtreler.forEach(filtre => {
            islemeAlinacakOlcumler[1][filtre].parlaklik -= islemeAlinacakOlcumler[0][filtre].parlaklik;
        });
        gokParlakligindanArindirilmisOlcumler.push(islemeAlinacakOlcumler[1]);
    }


    function gokParlagiAnalizFormatinaCevir(olcumler) {
        for (let i = 0; i < olcumler.length - 1; i++) {

            let sembol1 = olcumler[i].yildizSembolu;
            let sembol2 = olcumler[i + 1].yildizSembolu;

            if (yildizSembolleriAyniMi(sembol1, sembol2))
                if (verileriYerDegistirmekGerekiyorMu(sembol1, sembol2)) {
                    let aparatObje = olcumler[i];
                    olcumler[i] = olcumler[i + 1];
                    olcumler[i + 1] = aparatObje;
                }


        }


        function yildizSembolleriAyniMi(sembol1, sembol2) {
            sembol1 = sembol1.replace("S", "");
            sembol2 = sembol2.replace("S", "");
            return sembol1 === sembol2;
        }

        function verileriYerDegistirmekGerekiyorMu(sembol1, sembol2) {
            let sembol1_S = sembol1.indexOf("S") != -1;
            let sembol2_S = sembol2.indexOf("S") != -1;
            return !sembol1_S && sembol2_S;
        }

        return olcumler;
    }

    return gokParlakligindanArindirilmisOlcumler;
}
function tarihBilgisiEkle(olcumler) {
    let gecenGunSayisi = 0;
    let sonOlcumSaati;


    olcumler.forEach(olcum => {
        filtreler.forEach(filtre => {

            let simdikiSaat = saatiGetir(olcum[filtre].saat);

            if (sonOlcumSaati == null)
                sonOlcumSaati = simdikiSaat;

            if (Math.abs(simdikiSaat - sonOlcumSaati) >= 23) {
                gecenGunSayisi++;
            }

            sonOlcumSaati = simdikiSaat;

            let tarih = new Date(gozlem_baslangic_tarihi.value);
            tarih.setDate(tarih.getDate() + gecenGunSayisi);
            tarih.setMonth(tarih.getMonth() + 1);

            olcum[filtre].tarih = tarih.getFullYear() + "-" + tarih.getMonth() + "-" + tarih.getDate();
        });
    });

    function saatiGetir(str_Zaman) {
        return str_Zaman.split(":")[0];
    }

    return olcumler;
}
function yildizZamaniHesapla(olcumler) {

    const sabit1 = 18.697374558;
    const sabit2 = 24.06570982441908;


    olcumler.forEach(olcum => {
        filtreler.forEach(filtre => {
            JD = julyenGunuHesapla(olcum[filtre].tarih + " " + olcum[filtre].saat);
            const D = JD - 2451545;
            const GMST_yildizZamani = sabit1 + (sabit2 * D);
            const LOCAL_yildizZamani = GMST_yildizZamani + gozlem_yeri_boylam.value / 15;
            olcum[filtre].yildizZamani = LOCAL_yildizZamani;
        });
    });

    function julyenGunuHesapla(tarih) {
        const ocak1_1992_julyen_gunu = 2448622.5;
        const ocak1_1992 = new Date("1992-1-1 0:0:0: +0");
        tarih = new Date(tarih + " +0");
        return ocak1_1992_julyen_gunu + (tarih - ocak1_1992) / 86400000;
    }
    return olcumler;
}
function havaKutlesiHesapla(olcumler) {

    let enlem_gozlemYeri = gozlem_yeri_enlem.value
    let enlem_mukayeseYildizi = gozlenen_yildiz_enlem.value;

    olcumler.forEach(olcum => {
        filtreler.forEach(filtre => {
            olcum[filtre].havaKutlesi = 1 / (aci_sin(enlem_gozlemYeri) * aci_sin(enlem_mukayeseYildizi) + aci_cos(enlem_gozlemYeri) * aci_cos(enlem_mukayeseYildizi) * aci_cos(olcum[filtre].yildizZamani*15));
        });
    });

    function aci_sin(aci) {
        return Math.sin(aci * Math.PI / 180);
    }
    function aci_cos(aci) {
        return Math.cos(aci * Math.PI / 180);
    }

    return olcumler;
}

function mukayeseKadirHesapla(olcumler) {

    let sonC1katmani;
    let sonVkatmani;
    let kadirKatmani;

    for (let i = 0; i < olcumler.length; i++) {

        if (olcumler[i].yildizSembolu.indexOf("C1") != -1) {   // c1 ise
            sonC1katmani = i;
            kadirKatmani = 0;
        }
        else {
            if (olcumler[i].yildizSembolu.indexOf("V") != -1) {
                sonVkatmani = i;
                kadirKatmani++;
            }

            if (sonC1katmani != null && sonVkatmani != null) {
                filtreler.forEach(filtre => {

                    olcumler[sonC1katmani][filtre]["kadir" + kadirKatmani] = kadirHesapla(olcumler[sonC1katmani][filtre].parlaklik - olcumler[sonVkatmani][filtre].parlaklik);
                });
            }
        }
    }


    function kadirHesapla(isikSiddetiFarki) {
        return -2.5 * Math.log10(Math.abs(isikSiddetiFarki)) + 15;
    }

    return olcumler;
}

function degiskenYildizKadiriHesapla(olcumler) {

    let sonC1katmani;
    let sonVkatmani;
    let kadirKatmani;

    for (let i = 0; i < olcumler.length; i++) {

        if (olcumler[i].yildizSembolu.indexOf("C1") != -1) {   // c1 ise
            sonC1katmani = i;
            kadirKatmani = 0;
        }
        else {
            if (olcumler[i].yildizSembolu.indexOf("V") != -1) {
                sonVkatmani = i;
                kadirKatmani++;
            }

            if (sonC1katmani != null && sonVkatmani != null) {
                filtreler.forEach(filtre => {
                    olcumler[sonVkatmani][filtre].kadir = 2.5 * Math.log10(olcumler[sonC1katmani][filtre].parlaklik / olcumler[sonVkatmani][filtre].parlaklik) + olcumler[sonC1katmani][filtre]["kadir" + kadirKatmani];
                });
            }
        }
    }

    return olcumler;
}






function kadir_havaKutlesi_verileriCek(sembol, filtre) {
    let dataSet = [];
    olcumler.forEach(olcum => {
        if (olcum.yildizSembolu == sembol) {
            if (sembol == "C1" && olcum[filtre].kadir1 && olcum[filtre].kadir2) {
                dataSet.push({ x: olcum[filtre].havaKutlesi, y: olcum[filtre].kadir1 });
                dataSet.push({ x: olcum[filtre].havaKutlesi, y: olcum[filtre].kadir2 });
            }
            else if (sembol == "V") {
                dataSet.push({ x: olcum[filtre].havaKutlesi, y: olcum[filtre].kadir });
            }
        }
    });
    return dataSet;
}
function veriSetiEgriDataSetOlustur(veriSeti) {

    let n = veriSeti.length;
    let toplam_X = 0, toplam_Y = 0, toplam_XY = 0, toplam_X2 = 0;
    veriSeti.forEach(veri => {
        toplam_X += veri.x;
        toplam_Y += veri.y;
        toplam_XY += veri.x * veri.y;
        toplam_X2 += Math.pow(veri.x, 2);
    });

    let b = ((toplam_X * toplam_XY) - (toplam_X2 * toplam_Y)) / (Math.pow(toplam_X, 2) - (toplam_X2 * n));
    let a = (toplam_Y - b * n) / toplam_X;

    let ilkNokta = {};
    ilkNokta.x = veriSeti[0].x;
    ilkNokta.y = a * ilkNokta.x + b;

    let ikinciNokta = {};
    ikinciNokta.x = veriSeti[veriSeti.length - 1].x;
    ikinciNokta.y = a * ikinciNokta.x + b;

    return [ilkNokta, ikinciNokta];
}

function degiskenYildizAtmosferDisiKadiriHesapla(olcumler) {
    olcumler.forEach(olcum => {
        filtreler.forEach(filtre => {
            olcum[filtre].kadir = olcum[filtre].kadir - sonumleme_sabitleri[filtre] * olcum[filtre].havaKutlesi;
        });
    });
    return olcumler;
}

function v_kadir_zaman_dataseti_olustur() {
    dataSet_v_kadir_havakutlesi = {};
    filtreler.forEach(filtre => {
        dataSet_v_kadir_havakutlesi[filtre] = kadir_zaman_verileriCek("V", filtre);
    });
}
function kadir_zaman_verileriCek(sembol, filtre) {
    let dataSet = [];
    let olcumBaslangicTarihi = new Date(olcumler[0].U.tarih+" "+olcumler[0].U.saat+" +0");
    olcumler.forEach(olcum => {
        if (olcum.yildizSembolu == sembol) {
            let olcumZamani = new Date(olcum[filtre].tarih+" "+olcum[filtre].saat+" +0");
            let gecenZaman = (olcumZamani - olcumBaslangicTarihi)/3600000;
            dataSet.push({ x: gecenZaman, y: olcum[filtre].kadir });
        }
    });

    function str_saate_cevir(str_saat){
        let zaman = str_saat.split(':');
        return parseFloat(zaman[0])+parseFloat(zaman[1])/60+parseFloat(zaman[2])/3600;
    }

    return dataSet;
}