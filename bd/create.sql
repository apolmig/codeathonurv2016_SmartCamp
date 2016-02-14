CREATE TABLE puntuacion
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  recurso_id INT NOT NULL,
  usuario_id INT NOT NULL,
  tag_id INT NOT NULL,
  valor INT NOT NULL
);
CREATE TABLE recurso
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  tipo INT NOT NULL,
  fecha_publicacion DATETIME NOT NULL,
  usuario_id INT NOT NULL,
  ubicacion VARCHAR(255) NOT NULL
);
CREATE TABLE tag
(
  id INT PRIMARY KEY NOT NULL,
  fecha_publicacion INT NOT NULL,
  archivo_id INT NOT NULL,
  usuario_id INT NOT NULL,
  posicion_x INT,
  posicion_y INT,
  pagina INT,
  comentario LONGTEXT NOT NULL
);
CREATE TABLE usuario
(
  id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(255) NOT NULL,
  tipo INT DEFAULT 0 NOT NULL,
  foto VARCHAR(255) NOT NULL
);


INSERT INTO `Recurso` (`id`, `tipo`, `fecha_publicacion`, `usuario_id`, `ubicacion`) VALUES ('2', '1', '2016-02-14 00:00:00', '1', 'http://www.google.com');