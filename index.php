<?php include $_SERVER['DOCUMENT_ROOT'] . "/php_script/functions.php"; ?>

<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <title>Yıldız Analiz</title>
    <?php
    addFile("css", "./css/tasarimlar.css");
    addFile("css", "https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css");
    addFile("script","https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.js");
    addFile("script", "./js/chart.js");
    ?>
</head>

<body class="arkaplan-karlidag">
    <?php addSideBar(); ?>
    <h1 class="ustBaslik">Yıldız Analiz Formu</h1>

    <div id = "solpencere" class="split left">
        <div>
            <?php includePhpFile("form.php"); ?>
        </div>
    </div>

    <div id ="sagpencere" class="split right">
            <div id = "analiz-sonuclari">
                <canvas id="grafik-c1-kadir-havakutlesi"></canvas>
                <div id="sonumleme-sabiti-cerceve" >
                    <div id="sonumleme-U"><p class="sonumleme-sabiti-baslik" >U Sonumleme Sabiti</p><p class="sonumleme-sabiti-deger" ></p></div>
                    <div id="sonumleme-B"><p class="sonumleme-sabiti-baslik" >B Sonumleme Sabiti</p><p class="sonumleme-sabiti-deger" ></p></div>
                    <div id="sonumleme-V"><p class="sonumleme-sabiti-baslik" >V Sonumleme Sabiti</p><p class="sonumleme-sabiti-deger" ></p></div>
                </div>
                <canvas id="grafik-v-kadir-zaman"></canvas>
            </div>
    </div>

</body>
<?php
includePhpFile("form.php");
addFile("script", "./js/verianalizi.js");
addFile("script", "./js/verileridoldur.js");
?>

</html>