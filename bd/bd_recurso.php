<?php

    require_once('bd.php');
    require_once('../model/Recurso.php');

    function getRecursos($bd){
        $recursos = array();

        $sql_query = "SELECT * FROM recurso";

        $resultado = selectBD($sql_query, $bd);

        if(isset($resultado) && count($resultado) > 0){
            foreach($resultado as $recurso){
                $recursos[] = new Recurso($recurso);
            }
        }

        return $recursos;
    }

    function getRecurso($idRecurso, $bd){
        $sql_query = "SELECT * FROM recurso WHERE id=".mysqli_real_escape_string($bd, $idRecurso);

        $resultado = selectBD($sql_query, $bd);
        if(isset($resultado) && count($resultado) > 0){
            $recurso = new Recurso($resultado);
        }

        return $recurso;
    }

    function insertRecurso($recurso, $bd){
        $sql_insert = "INSERT INTO recurso (id, tipo, fecha_publicacion, usuario_id, ubicacion)
                        VALUES (NULL, ".mysqli_real_escape_string($bd, $recurso->getTipo()).",
                        ".mysqli_real_escape_string($bd, $recurso->getFechaPublicacion()).",
                        ".mysqli_real_escape_string($bd, $recurso->getUusario()->getId()).",
                        ".mysqli_real_escape_string($bd, $recurso->getUbicacion()).");";
        var_dump($sql_insert);

        insertBD($sql_insert, $bd);
    }

    function updateRecurso(){

    }

