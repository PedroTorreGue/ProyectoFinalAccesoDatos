/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */

var URLLibro='http://192.168.17.60:8080/ProyectoAccesoVFinal/webresources/com.iesvdc.entidades.libros/'

var buscadorIsbn =$('<div />').append($('<form />').append('<input name="buscar_isbn_libro" id="buscar_isbn_libro" type="text"/>','<button type="button" onclick="LibroReadREST()">Buscar</button>'));

function LibroReadREST() {
    
    $('#r_libro').html(buscadorIsbn);
    
    var isbnId = $('#buscar_isbn_libro').val();
    //alert(isbnId);
    
    if ( isbnId === "" ) {
        $.ajax({
            url: URLLibro,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                console.log("Sin datos" + JSON.stringify(json));
                //$('#r_libro').html('<h3>Listado de Libros</h3>');
                var table = $('<table />').addClass('table table-stripped');

                table.append($('<thead />').append($('<tr />').append('<th>isbn</th>', '<th>nombre</th>', '<th>editorial</th>', '<th>prestado</th>')));
                var tbody = $('<tbody />');
                for (var libro in json) {
                    console.log(json[libro].prestado);
                    tbody.append($('<tr />').append('<td>' + json[libro].isbn + '</td>',
                                '<td>' + json[libro].nombre + '</td>', '<td>' + json[libro].editorial + '</td>', '<td>' + json[libro].prestado + '</td>'));
                }
                table.append(tbody);
                $('#r_libro').append('<h3>Listado de Libros</h3>');
                $('#r_libro').append($('<div />').append(table));
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema, en libro sin datos');
            }
        });
    }
    else{
        $.ajax({
            url: URLLibro + isbnId,
            type: 'GET',
            dataType: 'json',
            success: function (libro) {
                console.log("Con datos"+JSON.stringify(libro));
                //$('#r_libro').html('<h3>Listado de Libros</h3>');
                table = $('<table />').addClass('table table-stripped');
                table.append($('<thead />').append($('<tr />').append('<th>isbn</th>', '<th>nombre</th>', '<th>editorial</th>', '<th>prestado</th>')));
                var tbody = $('<tbody />');
                
                    //console.log(json[libro]);
                   
                    tbody.append($('<tr />').append('<td>' + libro.isbn + '</td>',
                                '<td>' + libro.nombre + '</td>', '<td>' + libro.editorial + '</td>', '<td>' + libro.prestado + '</td>'));
                
                table.append(tbody);

                $('#r_libro').append($('<div />').append(table));
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                console.log('rhgurehw, existió un problema, en libro con datos');
            }
        });
    }
    $('#buscar_isbn').val("");
}

//post de libro
function LibroPostREST() {
    var datos = {
        "isbn": $('#isbnPostLibro').val(),
        "nombre": $('#nombrePostLibro').val(),
        "editorial": $('#editorialPostLibro').val(),
        "prestado": false
};
    console.log(JSON.stringify(datos));
        $.ajax({
            url: URLLibro,
            data : JSON.stringify(datos),
            contentType: "application/json",
            type: 'POST',
            dataType: 'json',
            success: function (json) {
               $('#div_parrafo_libro').remove();
                var div=$('<div id="div_parrafo_libro"/>').empty();
                var parrafoError="<p id='parrafoError_libro'>"+"el libro se ha creado correctamente"+"</p>";
                $(div).html($(parrafoError))
                $('#c_libro').append( $(div));
            },
            error: function (xhr, status) {
                $('#div_parrafo_libro').remove();
                var div=$('<div id="div_parrafo_libro"/>').empty();
                var parrafoError="<p id='parrafoError_libro'>"+"el libro ya existe en la base de datos"+"</p>";
                $(div).html($(parrafoError))
                $('#c_libro').append( $(div));
            }
        });
    
}
// formulario para post de libro
function LibroForm() {
    $('#c_libro').html('<h3>Crear nuevo Libro:</h3>');
    var form = $('<form />');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="isbn">isbn:</label>');
    div.append('<input id="isbnPostLibro" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="nombre">nombre:</label>');
    div.append('<input id="nombrePostLibro" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="editorial">editorial:</label>');
    div.append('<input id="editorialPostLibro" type="text" class="form-control" />');
    form.append(div);

    /*div = $('<div />').addClass('form-group');
    div.append('<label for="id">id:</label>');
    div.append('<input id="id" type="text" class="form-control" />');
    form.append(div);*/
    
    div = $('<div />').addClass('form-group');
    div.append('<button  onclick="LibroPostREST()" type="button" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#c_libro').append(form);
}

// formulario para put de libro
function LibroUpdateForm() {
    
    $('#u_libro').html('<h3>Actualizar Libro:</h3>');
    var form = $('<form />');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="isbn">isbn a buscar:</label>');
    div.append('<input id="isbnBusquedaPut" type="text" class="form-control" />');
    div.append('<button onclick="LibroRellenarPut()" type="button" class="btn btn-success"> Buscar');
    div.append('<br>');
    form.append(div);
    div.append('<label for="isbn">isbn:</label>');
    div.append('<input id="isbnLibroUpdate" type="text" class="form-control" disabled="true" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="nombre">nombre:</label>');
    div.append('<input id="nombreLibroUpdate" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="editorial">editorial:</label>');
    div.append('<input id="editorialLibroUpdate" type="text" class="form-control" />');
    form.append(div);

    
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="LibroPutREST()" type="button" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#u_libro').append(form);
}

// put de alumno
function LibroPutREST() {
     var isbnPutRest=$('#isbnBusquedaPut').val();
     var datos = {
        "isbn": $('#isbnLibroUpdate').val(),
        "nombre": $('#nombreLibroUpdate').val(),
        "editorial": $('#editorialLibroUpdate').val(),
        "prestado" : false
        
};
    
   
        $.ajax({
            url: URLLibro + isbnPutRest,
            data : JSON.stringify(datos),
            contentType: "application/json",
            type: 'PUT',
            dataType: 'json',
            success: function (json) {
               $('#div_parrafo_libro').remove();
                var div=$('<div id="div_parrafo_libro"/>').empty();
                var parrafoError="<p id='parrafoError_libro'>"+"el libro se ha actualizado correctamente"+"</p>";
                $(div).html($(parrafoError))
                $('#u_libro').append( $(div));
            },
            error: function (xhr, status) {
                $('#div_parrafo_libro').remove();
                var div=$('<div id="div_parrafo_libro"/>').empty();
                var parrafoError="<p id='parrafoError_libro'>"+"se ha producido un error al actualizar el libro"+"</p>";
                $(div).html($(parrafoError))
                $('#u_libro').append( $(div));
            }
        });
    
}

//metodo para rellenar los input en el put de alumnos
function LibroRellenarPut() {
    var isbnBusquedaPut=$('#isbnBusquedaPut').val();
    console.log(isbnBusquedaPut);
    $.ajax({
        url: URLLibro + isbnBusquedaPut,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $('#isbnLibroUpdate').val(json.isbn);
            $('#nombreLibroUpdate').val(json.nombre);
            $('#editorialLibroUpdate').val(json.editorial);
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema');
        }
    });
}

// formulario para put de alumno
function LibroDeleteForm() {
    
    $('#d_libro').html('<h3>Borrar Libros:</h3>');
    var form = $('<form />');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="isbnBusquedaBorrar">isbn a buscar:</label>');
    div.append('<input id="isbnBusquedaBorrar" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="LibroDeleteREST()" type="button" class="btn btn-success"> Borrar </div>');
    form.append(div);
    
    $('#d_libro').append(form);
}

// delete de alumno
function LibroDeleteREST() {
    var isbnBusquedaBorrar = $('#isbnBusquedaBorrar').val();
    console.log(isbnBusquedaBorrar);
        $.ajax({
            url: URLLibro + isbnBusquedaBorrar,
            type: 'DELETE',
            success: function (json) {
                $('#div_parrafo_libro').remove();
                var div=$('<div id="div_parrafo_libro"/>').empty();
                var parrafoError="<p id='parrafoError_libro'>"+"el libro se ha eliminado correctamente"+"</p>";
                $(div).html($(parrafoError))
                $('#d_libro').append( $(div));
            },
            error: function (xhr, status) {
                $('#div_parrafo_libro').remove();
                var div=$('<div id="div_parrafo_libro"/>').empty();
                var parrafoError="<p id='parrafoError_libro'>"+"el libro no existe en la base de datos"+"</p>";
                $(div).html($(parrafoError))
                $('#d_libro').append( $(div));
            }
        });
    
}


