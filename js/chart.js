let grafik_v_kadir_zaman, grafik_c1_kadir_havakutlesi;


function c1_kadir_havakutlesigrafigi() {
    let egriCizgiKesikligi = [15, 5, 5, 5];
    const data = {
        datasets: [
            {
                label: 'U Filtresi',
                data: dataSet_c1_kadir_havakutlesi['U'],
                borderColor: 'rgba(190, 0, 255, 1)'

            }
            ,
            {
                label: 'U Eğim Çizgisi',
                data: veriSetiEgriDataSetOlustur(dataSet_c1_kadir_havakutlesi.U),
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
                data: dataSet_c1_kadir_havakutlesi['B'],
                borderColor: 'rgba(0, 40, 255, 1)'

            }
            ,
            {
                label: 'B Eğim Çizgisi',
                data: veriSetiEgriDataSetOlustur(dataSet_c1_kadir_havakutlesi.B),
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
                data: dataSet_c1_kadir_havakutlesi['V'],
                borderColor: 'rgba(100, 255, 40, 1)'

            }
            ,
            {
                label: 'V Eğim Çizgisi',
                data: veriSetiEgriDataSetOlustur(dataSet_c1_kadir_havakutlesi.V),
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
                    labels: { boxWidth: 15, usePointStyle: true, pointStyle: "rectRounded", padding: 20 }
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

    const grafikElement = document.getElementById('grafik-c1-kadir-havakutlesi');
    grafikElement.style.visibility = "visible";    
    grafik_c1_kadir_havakutlesi = new Chart(grafikElement, config);
}
function v_kadir_zamangrafigi() {
    const data = {
        datasets: [
            {
                label: 'U Filtresi',
                data: dataSet_v_kadir_havakutlesi['U'],
                borderColor: 'rgba(190, 0, 255, 1)'

            }
            ,
            {
                label: 'B Filtresi',
                data: dataSet_v_kadir_havakutlesi['B'],
                borderColor: 'rgba(0, 40, 255, 1)'

            }
            ,
            {
                label: 'V Filtresi',
                data: dataSet_v_kadir_havakutlesi['V'],
                borderColor: 'rgba(100, 255, 40, 1)'

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
                    text: 'Değişken Yıldıza Ait Kadir - Zaman Grafiği',
                    padding: 5,
                    font: {
                        size: 15,
                        borderColor: "red"
                    }
                },
                legend: {
                    position: "right",
                    labels: { boxWidth: 15, usePointStyle: true, pointStyle: "rectRounded", padding: 20 }
                }
            },
            scales: {
                x: {
                    title: {
                        display: true,
                        text: "Geçen Süre ( saat )",
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

    const grafikElement = document.getElementById('grafik-v-kadir-zaman');
    grafikElement.style.visibility = "visible";
    grafik_v_kadir_zaman = new Chart(grafikElement, config);
}