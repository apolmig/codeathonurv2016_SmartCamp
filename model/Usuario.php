<?php

    /**
     * Created by PhpStorm.
     * User: Miguel
     * Date: 13/2/16
     * Time: 18:30
     */

    abstract class Usuario
    {
        var $id;
        var $nombre;
        var $tipo;
        var $foto;

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
        public function getNombre()
        {
            return $this->nombre;
        }

        /**
         * @param mixed $nombre
         */
        public function setNombre($nombre)
        {
            $this->nombre = $nombre;
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
        public function getFoto()
        {
            return $this->foto;
        }

        /**
         * @param mixed $foto
         */
        public function setFoto($foto)
        {
            $this->foto = $foto;
        }


        function __construct($usuario, $link){
            if(!is_array($usuario)){    }

        }
    }