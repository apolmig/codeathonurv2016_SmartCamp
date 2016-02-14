<?php

    require_once('Usuario.php');
    require_once('Profesor.php');
    require_once('Alumno.php');

    require_once('../bd/bd_tag.php');
    require_once('../bd/bd_puntuacion.php');
    require_once('../bd/bd_recurso.php');

    class Recurso
    {
        var $id;
        var $tipo;//documento/multimedia
        var $fechaPublicacion;
        var $usuario;
        var $ubicacion;//ruta de acceso

        var $puntuaciones;
        var $tags;

        /**
         * @return mixed
         */
        public function getId()
        {
            return $this->id;
        }

        /**
         * @param mixed $id
         */
        public function setId($id)
        {
            $this->id = $id;
        }

        /**
         * @return mixed
         */
        public function getTipo()
        {
            return $this->tipo;
        }

        /**
         * @param mixed $tipo
         */
        public function setTipo($tipo)
        {
            $this->tipo = $tipo;
        }

        /**
         * @return mixed
         */
        public function getFechaPublicacion()
        {
            return $this->fechaPublicacion;
        }

        /**
         * @param mixed $fechaPublicacion
         */
        public function setFechaPublicacion($fechaPublicacion)
        {
            $this->fechaPublicacion = $fechaPublicacion;
        }

        /**
         * @return mixed
         */
        public function getUsuario()
        {
            return $this->usuario;
        }

        /**
         * @param mixed $usuario
         */
        public function setUsuario($usuario)
        {
            $this->usuario = $usuario;
        }

        /**
         * @return mixed
         */
        public function getUbicacion()
        {
            return $this->ubicacion;
        }

        /**
         * @param mixed $ubicacion
         */
        public function setUbicacion($ubicacion)
        {
            $this->ubicacion = $ubicacion;
        }

        function __construct($recurso, $bd){
            var_dump($recurso);
            //if(!is_array($recurso)){ $recurso = getRecurso($recurso, $bd); }
            var_dump($recurso);
            $this->setId($recurso['id']);
            $this->setTipo($recurso['tipo']);
            $this->setFechaPublicacion($recurso['fecha_publicacion']);
            if($this->getTipo() == 1){
                $this->setUsuario(new Profesor($recurso['usuario_id'], $bd));
            }else{
                $this->setUsuario(new Alumno($recurso['usuario_id'], $bd));
            }
            $this->setUbicacion($recurso['ubicacion']);
        }

        function getPuntuaciones($bd){
            if(!isset($this->puntuaciones)) {
                $this->puntuaciones = getPuntuacionesRecurso($this->getId(), $bd);
            }
            return $this->puntuaciones;
        }

        function getTags($bd){
            if(!isset($this->tags)) {
                $this->tags = getTagsRecurso($this->getId(), $bd);
            }
            return $this->tags;
        }

        function save($bd){
            insertRecurso($this, $bd);
        }

    }