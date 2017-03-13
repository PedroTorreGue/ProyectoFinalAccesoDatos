# ProyectoFinalAccesoDatos
Proyecto Final del Módulo de acceso a datos

Lo primero que debemos de hacer es ejecutar en sql el archivo de creación de la base de datos. << create_database.sql >>

Lo siguiente es ejecutar el archivo sql de insercción de datos en la base de datos. << insertar_datos.sql >>

También en sql debemos ejecutar tanto trigger.sql como trigger_borrado.sql

Debemos configurar las direcciones IP tanto en el servidor para conectar a la base de datos como en el cliente para la conexión con el servidor.

Manual de utilización

Dentro de las posibilidades de la app podemos crear, listar, modificar y borrar alumnos, libros, y préstamos.
El desglose es el siguiente. 

Alumno contiene:
  Nombre
  DNI
  Apellidos
  
Libro contiene:
  Nombre
  ISBN
  Editorial
  Prestado
  
Alquiler contiene:
  DNI_alumno
  ISBN_libro
  fecha
  
Solo podemos alquilar un libro si dentro de la tabla libros aparece como NO prestado, en ese caso al prestarlo, se ejecuta un trigger que cambia el valor de prestado dentro del registro de ese libro en la tabla de false a true.
Al borrar el alquiler el proceso es el inverso, se ejecutar el trigger de borrado que cambiar de true a false el registro.
