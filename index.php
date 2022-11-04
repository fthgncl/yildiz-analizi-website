<?php include $_SERVER['DOCUMENT_ROOT'] . "/php_script/functions.php"; ?>

<!DOCTYPE html>
<html lang="tr">

<head>
    <meta charset="UTF-8">
    <title>Yıldız Analiz</title>
    <?php
    addFile("css", "./css/tasarimlar.css");
    addFile("css", "https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css");
    ?>
</head>

<body class="arkaplan-karlidag">
    <?php addSideBar(); ?>
    <h1 class="ustBaslik">Yıldız Analiz Formu</h1>

    <div class="split left">
        <div>
            <?php includePhpFile("form.php"); ?>
        </div>
    </div>

    <div class="split right">
        <div class="centered">
        </div>
    </div>

</body>
<?php
includePhpFile("form.php");
addFile("script", "./js/verianalizi.js");
addFile("script", "./js/verileridoldur.js");
?>

</html>