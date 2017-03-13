create database IF NOT EXISTS biblioteca;
use biblioteca;
drop table if exists Alumnos;

CREATE TABLE IF NOT EXISTS Alumnos (
dni varchar(9) NOT NULL PRIMARY KEY, 
nombre varchar(15) default null, 
apellidos varchar(50) default null
);

CREATE TABLE IF NOT EXISTS Libros (
isbn varchar(30) NOT NULL PRIMARY KEY, 
nombre varchar(15)  default null,
editorial varchar(30) default null
);

CREATE TABLE IF NOT EXISTS Alquiler(
isbn_libro varchar(30) default null,
dni_alumno varchar(9) default null,
fecha date NOT NULL,
PRIMARY KEY(isbn_libro, dni_alumno, fecha),
foreign key (dni_alumno) references Alumnos(dni) on delete cascade on update cascade,
foreign key (isbn_libro) references Libros (isbn) on delete cascade on update cascade
);

