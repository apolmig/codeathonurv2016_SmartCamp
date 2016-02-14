<?php

    require_once('bd.php');
    require_once('../model/Puntuacion.php');

    function insertTag($tag, $link){

    }

    function getTagsUsuario($idUsuario, $bd){
        $sql_query = "SELECT * FROM tag WHERE usuario_id=".mysqli_real_escape_string($bd, $idUsuario);

        $tags = array();

        $resultado = selectBD($sql_query, $bd);
        if(isset($resultado) && count($resultado) > 0){
            $tags[] = new Tag($resultado);
        }

        return $tags;
    }

    function getTagsRecurso($idRecurso, $bd){
        $sql_query = "SELECT * FROM tag WHERE recurso_id=".mysqli_real_escape_string($bd, $idRecurso);

        $tags = array();

        $resultado = selectBD($sql_query, $bd);
        if(isset($resultado) && count($resultado) > 0){
            $tags[] = new Tag($resultado);
        }

        return $tags;
    }

    function getTags($bd){
        $sql_query = "SELECT * FROM tag";

        $tags = array();

        $resultado = selectBD($sql_query, $bd);
        if(isset($resultado) && count($resultado) > 0){
            $tags = new Tag($resultado);
        }

        return $tags;
    }
