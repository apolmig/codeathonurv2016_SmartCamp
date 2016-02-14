<?php

    $ubicacion = "recursos/";
    $recurso = $ubicacion . basename($_FILES["recurso"]["name"]);
    $uploadOk = 1;
    $tipoRecurso = pathinfo($recurso, PATHINFO_EXTENSION);

    if(isset($_POST["btnRecurso"])) {
        $validar = getimagesize($_FILES["recurso"]["tmp_name"]);
        if($validar !== false) {
            echo "File is an image - " . $validar["mime"] . ".";
            $uploadOk = 1;
        } else {
            echo "File is not an image.";
            $uploadOk = 0;
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