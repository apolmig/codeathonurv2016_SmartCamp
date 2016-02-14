<?php
    ini_set('display_errors', 0);
    error_reporting(E_ERROR | E_WARNING | E_PARSE);

    require_once("../controller/functions_recurso.php");

    $ubicacion = "../recursos/";
    $recurso = $ubicacion . basename($_FILES["recurso"]["name"]);
    $uploadOk = 1;
    $tipoRecurso = pathinfo($recurso, PATHINFO_EXTENSION);

    if(isset($_POST["btnRecurso"])) {
        /*$validar = getimagesize($_FILES["recurso"]["tmp_name"]);
        if($validar !== false) {
            echo "File is an image - " . $validar["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
        }*/

        //var_dump($_FILES["recurso"]["tmp_name"]);
        //var_dump($recurso);
        if (move_uploaded_file($_FILES["recurso"]["tmp_name"], $recurso)){

            addRecurso($recurso, 1);

            echo "El archivo ha sido cargado correctamente.";
        }else{
            echo "Ocurrió algún error al subir el fichero. No pudo guardarse.";
        }
    }

?>
    <html>
        <body>
            <form action="upload.php" method="post" enctype="multipart/form-data">
                Selecciona el recurso a subir:
                <input type="file" name="recurso">
                <input type="submit" value="Subir recurso" name="btnRecurso">
            </form>
        </body>
    </html>