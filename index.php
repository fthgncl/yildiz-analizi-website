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
            <img src="img_avatar.png" alt="Avatar man">
            <h2>John Doe</h2>
            <p>Some text here too.</p>
        </div>
    </div>


</body>

</html>