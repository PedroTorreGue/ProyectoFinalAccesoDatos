
/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */

var URLPrestamo='http://192.168.17.60:8080/ProyectoAccesoVFinal/webresources/com.iesvdc.entidades.alquiler/';

 var buscadorPrestamo =$('<div />').append($('<form />').append('<input name="buscar_dniPrestamo" id="buscar_dniPrestamo" type="text"/>','<button type="button" onclick="PrestamoReadREST()">Buscar</button>'));

function PrestamoReadREST() {
    
    $('#r_prestamo').html(buscadorPrestamo);
    var dniIdPrestamo=$('#buscar_dniPrestamo').val();
    if ( dniIdPrestamo === "" ) {
        $.ajax({
            url: URLPrestamo,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                console.log(JSON.stringify(json));
                //$('#r_alquiler').html('<h3>Listado de Alquileres</h3>');
                var table = $('<table />').addClass('table table-stripped');
                table.append($('<thead />').append($('<tr />').append('<th>id</th>','<th>isbn</th>', '<th>dni</th>','<th>fecha</th>')));
                var tbody = $('<tbody />');
                for (var alquiler in json) {
                    tbody.append($('<tr />').append('<td>' + json[alquiler].idAlquiler + '</td>','<td>' + json[alquiler].isbnLibro.isbn + '</td>', '<td>' + json[alquiler].dniAlumno.dni + '</td>','<td>' + json[alquiler].fecha + '</td>'));
                }
                table.append(tbody);
                $('#r_prestamo').append('<h3>Listado de Préstamos</h3>');
                $('#r_prestamo').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema');
            }
        });
    }else {
        $.ajax({
            url: URLPrestamo + dniIdPrestamo,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                console.log(JSON.stringify(json));
                $('#r_prestamo').html('<h3>Listado de Prestamos</h3>');
                var table = $('<table />').empty();
                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>isbn</th>', '<th>dni</th>', '<th>fecha</th>')));
                var tbody = $('<tbody />');
                tbody.append($('<tr />').append('<td>' + json.idAlquiler + '</td>','<td>' + json.isbnLibro.isbn + '</td>', '<td>' + json.dniAlumno.dni + '</td>','<td>' + json.fecha + '</td>'));
                table.append(tbody);

                $('#r_prestamo').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema, en préstamo con datos');
            }
        });
    }
    $('#buscar_dniPrestamo').val("");
}

function PrestamoPostREST() {
    //scanNow();
    var datos = {"id":5, "dniAlumno":{"dni":$('#dni_select').val()},"fecha":$('#fecha_prestamo').val()+"T00:00:00+01:00","isbnLibro":{"isbn":$('#isbn_select').val()}};
    
    console.log(JSON.stringify(datos));
        $.ajax({
            url: URLPrestamo,
            data : JSON.stringify(datos),
            contentType: "application/json",
            type: 'POST',
            dataType: 'json',
            success: function (json) {
               $('#div_parrafo_prestamo').remove();
                var div=$('<div id="div_parrafo_prestamo"/>').empty();
                var parrafoError="<p id='div_parrafo_prestamo'>"+"el prestamo se ha creado correctamente"+"</p>";
                $(div).html($(parrafoError))
                $('#c_prestamo').append( $(div));
            },
            error: function (xhr, status) {
                $('#div_parrafo_prestamo').remove();
                var div=$('<div id="div_parrafo_prestamo"/>').empty();
                var parrafoError="<p id='div_parrafo_prestamo'>"+"el prestamo ya existe en la base de datos"+"</p>";
                $(div).html($(parrafoError))
                $('#c_prestamo').append( $(div));
            }
        });
    
}
//post de Alquiler
function PrestamoForm() {
    $.ajax({
            url: URLPrestamo,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                $('#c_prestamo').html('<h3>Crear nuevo Alquiler:</h3>');
                var form = $('<form />');
                var div = $('<div />').addClass('form-group');
                div.append('<label for="dni">dni:</label>');
                var select_dni=$('<select id="dni_select" type="text" class="select-picker" />');
                obtenerDniSelect();
                div.append(select_dni);
                form.append(div);
                div = $('<div />').addClass('form-group');
                div.append('<label for="isbn">isbn:</label>');
                var select_isbn=$('<select id="isbn_select" type="text" class="select-picker" />');
                obtenerIsbnSelect();
                div.append(select_isbn);
                form.append(div);
                div = $('<div />').addClass('form-group');
                div.append('<label for="fecha">fecha:</label>');
                div.append('<input id="fecha_prestamo" type="text" class="form-control" />');
                form.append(div);
                div = $('<div />').addClass('form-group');
                div.append('<button onclick="PrestamoPostREST()" type="button" class="btn btn-success"> Aceptar </div>');
                form.append(div);

                $('#c_prestamo').append(form);
        }
    });
}

function obtenerDniSelect(){
    $.ajax({
            url: URLAlumno,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                
                for (var alumno in json) {
                    $('<option/>').attr("value",json[alumno].dni).text(json[alumno].dni).appendTo("#dni_select");
                }
               
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema, en alumnos sin datos');
            }
        });
}

function obtenerIsbnSelect(){
    $.ajax({
            url: URLLibro,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                
                for (var libro in json) {
                    if(json[libro].prestado==false)
                    $('<option/>').attr("value",json[libro].isbn).text(json[libro].isbn).appendTo("#isbn_select");
                }
               
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema, en libro sin datos');
            }
        });
}

function PrestamoRellenarPut() {
    var idBusquedaPut=$('#id_busqueda').val();
    console.log(idBusquedaPut);
    $.ajax({
        url: URLPrestamo + idBusquedaPut,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            console.log(json)
            $('#dni_prestamo_update').val(json.dniAlumno.dni);
            $('#fecha_prestamo_update').val(json.fecha);
            $('#isbn_prestamo_update').val(json.isbnLibro.isbn);
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema');
        }
    });
}

function PrestamoPutREST() {
     var idBusquedaPutRest=$('#id_busqueda').val();
     var datos = {"dniAlumno":{"dni":$('#dni_prestamo_update').val()},"fecha":$('#fecha_prestamo_update').val(),
      "isbnLibro":{"isbn":$('#isbn_prestamo_update').val()}};
      console.log(idBusquedaPutRest)
    
   
        $.ajax({
            url: URLPrestamo + idBusquedaPutRest,
            data : JSON.stringify(datos),
            contentType: "application/json",
            type: 'PUT',
            dataType: 'json',
            success: function (json) {
                $('#div_parrafo_prestamo').remove();
                var div=$('<div id="div_parrafo_prestamo"/>').empty();
                var parrafoError="<p id='div_parrafo_prestamo'>"+"el prestamo se ha actualizado correctamente"+"</p>";
                $(div).html($(parrafoError))
                $('#u_prestamo').append( $(div));
            },
            error: function (xhr, status) {
                $('#div_parrafo_prestamo').remove();
                var div=$('<div id="div_parrafo_prestamo"/>').empty();
                var parrafoError="<p id='div_parrafo_prestamo'>"+"se ha producido un error al actualizar el prestamo"+"</p>";
                $(div).html($(parrafoError))
                $('#u_prestamo').append( $(div));
            }
        });
    
}

//put de Alquiler
function PrestamoUpdateForm() {
    $('#u_prestamo').html('<h3>Actualizar Prestamo:</h3>');
    var form = $('<form />');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="id_busqueda">id a buscar:</label>');
    div.append('<input id="id_busqueda" type="text" class="form-control" />');
    div.append('<button onclick="PrestamoRellenarPut()" type="button" class="btn btn-success"> Buscar');
    div.append('<br>');
    form.append(div);
    div.append('<label for="dni">dni:</label>');
    div.append('<input id="dni_prestamo_update" type="text" class="form-control" disabled="true" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="fecha_prestamo_update">nombre:</label>');
    div.append('<input id="fecha_prestamo_update" type="text" class="form-control"/>');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="isbn_prestamo_update">isbn:</label>');
    div.append('<input id="isbn_prestamo_update" type="text" class="form-control" disabled="true" />');
    form.append(div);


    div = $('<div />').addClass('form-group');
    div.append('<button onclick="PrestamoPutREST()" type="button" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#u_prestamo').append(form);
}

function PrestamoDeleteForm() {
    $('#d_prestamo').html('<h3>Borrar Prestamo:</h3>');
    var form = $('<form />');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="idBusquedaBorrar">id prestamo</label>');
    div.append('<input id="idBusquedaBorrar" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="PrestamoDeleteREST()" type="button" class="btn btn-success"> Borrar </div>');
    form.append(div);
    
    $('#d_prestamo').append(form);
}

// delete de alumno
function PrestamoDeleteREST() {
    var idPrestamoBorrar = $('#idBusquedaBorrar').val();
        $.ajax({
            url: URLPrestamo + idPrestamoBorrar,
            type: 'DELETE',
            success: function (json) {
                $('#div_parrafo_prestamo').remove();
                var div=$('<div id="div_parrafo_prestamo"/>').empty();
                var parrafoError="<p id='div_parrafo_prestamo'>"+"el prestamo se ha borrado correctamente"+"</p>";
                $(div).html($(parrafoError))
                $('#d_prestamo').append( $(div));
            },
            error: function (xhr, status) {
                $('#div_parrafo_prestamo').remove();
                var div=$('<div id="div_parrafo_prestamo"/>').empty();
                var parrafoError="<p id='div_parrafo_prestamo'>"+"el prestamo no se encuentra en la base de datos"+"</p>";
                $(div).html($(parrafoError))
                $('#d_prestamo').append( $(div));
            }
        });
    
}

