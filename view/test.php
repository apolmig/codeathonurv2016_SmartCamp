<?php

    ini_set('display_errors', 0);
    error_reporting(E_ERROR | E_WARNING | E_PARSE);

    require_once("../bd/bd_recurso.php");
    require_once("../bd/bd.php");

    $bd = openBD();

    //$array_recursos = getRecursos($bd);

    //var_dump($array_recursos);

    //$array_recursos = getRecurso(1, $bd);

    //var_dump($array_recursos);





    closeBD($bd);