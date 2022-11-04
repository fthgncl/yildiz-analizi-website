
function grafikCiz(dataset_U, dataset_B, dataset_V) {
    let egriCizgiKesikligi = [15, 5, 5, 5];
    const data = {
        datasets: [
            {
                label: 'U Filtresi',
                data: dataset_U,
                borderColor: 'rgba(200, 0, 55, 1)'

            }
            ,
            {
                label: 'U Eğim Çizgisi',
                data: veriSetiEgriDataSetOlustur(dataset_U),
                showLine: true,
                borderColor: 'black',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                pointBorderColor: 'rgba(0, 0, 0, 0.5)',
                borderDash: egriCizgiKesikligi


            }
            ,
            {
                label: 'B Filtresi',
                data: dataset_B,
                borderColor: 'rgba(0, 40, 255, 1)'

            }
            ,
            {
                label: 'B Eğim Çizgisi',
                data: veriSetiEgriDataSetOlustur(dataset_B),
                showLine: true,
                borderColor: 'black',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                pointBorderColor: 'rgba(0, 0, 0, 0.5)',
                borderDash: egriCizgiKesikligi


            }
            ,
            {
                label: 'V Filtresi',
                data: dataset_V,
                borderColor: 'rgba(100, 255, 40, 1)'

            }
            ,
            {
                label: 'B Eğim Çizgisi',
                data: veriSetiEgriDataSetOlustur(dataset_V),
                showLine: true,
                borderColor: 'black',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(0, 0, 0, 0.5)',
                pointBorderColor: 'rgba(0, 0, 0, 0.5)',
                borderDash: egriCizgiKesikligi


            }
        ]
    }

    const config = {
        type: 'scatter',
        data: data,
        options: {
            responsive: true,
            plugins: {
                subtitle: {
                    display: true,
                    text: 'Mukayese Yıldızına Ait Kadir - Hava Kütlesi Grafiği',
                    padding: 5,
                    font: {
                        size: 15,
                        borderColor: "red"
                    }
                },
                legend: { 
                    position: "right",
                    labels : { boxWidth : 15 , usePointStyle : true , pointStyle : "rectRounded" , padding : 20}
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "HAVA KÜTLESİ",
                        font: { size: 15 }
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: "KADİR",
                        font: { size: 15 }
                    }
                }
            }
        }
    };

    const grafikElement = document.getElementById('grafik-kadir-havakutlesi');
    grafikElement.style.visibility = "visible";
    const myChart = new Chart(grafikElement, config);

}


function grafikIslemleri() {


    let U_dataSet = kadir_havaKutlesi_verileriCek("U");
    let B_dataSet = kadir_havaKutlesi_verileriCek("B");
    let V_dataSet = kadir_havaKutlesi_verileriCek("V");

    grafikCiz(U_dataSet, B_dataSet, V_dataSet);


}
function kadir_havaKutlesi_verileriCek(filtre) {
    let dataSet = [];
    olcumler.forEach(olcum => {
        if (olcum.yildizSembolu == "C1" && olcum[filtre].kadir1 != null && olcum[filtre].kadir2 != null) {
            dataSet.push({ x: olcum[filtre].havaKutlesi, y: olcum[filtre].kadir1 });
            dataSet.push({ x: olcum[filtre].havaKutlesi, y: olcum[filtre].kadir2 });
        }
    });
    return dataSet;
}
function veriSetiEgriDataSetOlustur(veriSeti) {
    let n = veriSeti.length;
    let toplam_X = 0, toplam_Y = 0, toplam_XY = 0, toplam_X2 = 0;
    console.log(veriSeti);
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