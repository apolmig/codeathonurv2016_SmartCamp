<?php

    /**
     * Created by PhpStorm.
     * User: Miguel
     * Date: 13/2/16
     * Time: 18:59
     */

    class Tag
    {
        var $id;
        var $fechaPublicacion;
        var $recurso;
        var $usuario;
        var $posicionX;
        var $posicionY;
        var $pagina;
        var $comentario;

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
        public function getRecurso()
        {
            return $this->recurso;
        }

        /**
         * @param mixed $recurso
         */
        public function setRecurso($recurso)
        {
            $this->recurso = $recurso;
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
        public function getPosicionX()
        {
            return $this->posicionX;
        }

        /**
         * @param mixed $posicionX
         */
        public function setPosicionX($posicionX)
        {
            $this->posicionX = $posicionX;
        }

        /**
         * @return mixed
         */
        public function getPosicionY()
        {
            return $this->posicionY;
        }

        /**
         * @param mixed $posicionY
         */
        public function setPosicionY($posicionY)
        {
            $this->posicionY = $posicionY;
        }

        /**
         * @return mixed
         */
        public function getPagina()
        {
            return $this->pagina;
        }

        /**
         * @param mixed $pagina
         */
        public function setPagina($pagina)
        {
            $this->pagina = $pagina;
        }

        /**
         * @return mixed
         */
        public function getComentario()
        {
            return $this->comentario;
        }

        /**
         * @param mixed $comentario
         */
        public function setComentario($comentario)
        {
            $this->comentario = $comentario;
        }

        function __construct($tag, $bd){
            $this->setId($tag['id']);
            $this->setFechaPublicacion($tag['fecha_publicacion']);
            $this->setPosicionX($tag['posicion_x']);
            $this->setPosicionY($tag['posicion_y']);
            $this->setPosicionX($tag['pagina']);
            $this->setPosicionY($tag['comentario']);
        }

    }