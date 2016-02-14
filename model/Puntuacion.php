<?php

    /**
     * Created by PhpStorm.
     * User: Miguel
     * Date: 13/2/16
     * Time: 18:41
     */
    class Puntuacion
    {
        var $id;
        var $recurso;
        var $usuario;
        var $tag;
        var $valor;

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
        public function getTag()
        {
            return $this->tag;
        }

        /**
         * @param mixed $tag
         */
        public function setTag($tag)
        {
            $this->tag = $tag;
        }

        /**
         * @return mixed
         */
        public function getValor()
        {
            return $this->valor;
        }

        /**
         * @param mixed $valor
         */
        public function setValor($valor)
        {
            $this->valor = $valor;
        }

        function __construct($puntuacion, $bd){
            $this->setId($puntuacion['id']);
            if($this->getTipo() == 1){
                $this->setUsuario(new Profesor($puntuacion['usuario_id'], $bd));
            }else{
                $this->setUsuario(new Alumno($puntuacion['usuario_id'], $bd));
            }
            $this->setUsuario(new Recurso($puntuacion['recurso_id'], $bd));
            $this->setValor($puntuacion['valor']);
        }
    }