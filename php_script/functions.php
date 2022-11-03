<?php
if ( !isset($GLOBALS['functionsphp']) ){
    $GLOBALS['functionsphp'] = true;

    function addFile($fileType,$file)
    {
        switch($fileType){
            case "script":{
                echo "<script src='",$file,"'></script>";
                break;
            }
            case "css":
            {
                echo "<link href='",$file,"' rel='stylesheet'>";
                break;
            }
        }    
    }


    function addSideBar(){
        
        addFile("css","https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css");
        addFile("script","https://unpkg.com/boxicons@2.1.4/dist/boxicons.js");
        addFile("css","./css/sidebar.css");
        include $_SERVER['DOCUMENT_ROOT']."/sidebar.php";
        addFile("script","./js/sidebar.js");

    }

    function includePhpFile($path){
        $solyatik = strrpos($path,'\\')+1;
        $sagyatik = strrpos($path,'/')+1;
        $pathFilt = substr($path,$sagyatik>$solyatik?$sagyatik:$solyatik);
        $pathFilt = str_replace(".","",$pathFilt);

        if( !isset($GLOBALS[$pathFilt]) ){
            $GLOBALS[$pathFilt] = true;
            include realpath($_SERVER["DOCUMENT_ROOT"])."/".$path;
        }
    }
}
?>