use biblioteca;
DROP TRIGGER IF EXISTS devolver_libro;
DELIMITER //
CREATE TRIGGER devolver_libro AFTER DELETE ON Alquiler
 FOR EACH ROW UPDATE Libros
    SET prestado = false
    where isbn=old.isbn_libro
//
DELIMITER ;