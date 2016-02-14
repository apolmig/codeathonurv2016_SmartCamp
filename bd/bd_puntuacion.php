<?php

    require_once('bd.php');
    require_once('../model/Puntuacion.php');

    function getPuntuacionesUsuario($idUsuario, $bd){
        $sql_query = "SELECT * FROM puntuacion WHERE usuario_id=".mysqli_real_escape_string($bd, $idUsuario);

        $resultado = selectBD($sql_query, $bd);
        if(isset($resultado) && count($resultado) > 0){
            $puntuacion = new Puntuacion($resultado);
        }

        return $puntuacion;
    }

    function getPuntuacionesRecurso($idRecurso, $bd){
        $sql_query = "SELECT * FROM puntuacion WHERE recurso_id=".mysqli_real_escape_string($bd, $idRecurso);

        $resultado = selectBD($sql_query, $bd);
        if(isset($resultado) && count($resultado) > 0){
            $puntuacion = new Puntuacion($resultado);
        }

        return $puntuacion;
    }