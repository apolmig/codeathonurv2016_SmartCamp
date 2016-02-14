<?php

    require_once("../bd/bd.php");
    require_once("../bd/bd_recurso.php");
    require_once('../model/Recurso.php');

    function addRecurso($ubicacion, $idUsuario){
        $bd = openBD();

        $recurso_obj = new Recurso(null, $bd);

        $recurso_obj->setFechaPublicacion(date('Y/m/d h:i:s'));
        $recurso_obj->setUsuario($idUsuario);
        $recurso_obj->setUbicacion($ubicacion);
        $recurso_obj->setTipo(1);

        $recurso_obj->save($bd);

        closeBD($bd);
    }

    /*function getRecursos($idUsuario){
        $bd = openBD();

        getRecursosUsuario($idUsuario, $bd);

        closeBD($bd);
    }*/