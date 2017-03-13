 DROP TRIGGER IF EXISTS prestar_libro;
DELIMITER //
CREATE TRIGGER prestar_libro BEFORE INSERT ON Alquiler
 FOR EACH ROW UPDATE Libros
    SET prestado = true
    isbn=new.isbn_libro
    
//
DELIMITER ;
