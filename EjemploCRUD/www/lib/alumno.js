/*jslint browser:true, devel:true, white:true, vars:true */
/*global $:false, intel:false */
var URLAlumno='http://192.168.17.60:8080/ProyectoAccesoVFinal/webresources/com.iesvdc.entidades.alumnos/'

 var buscadorDni =$('<div />').append($('<form />').append('<input name="buscar_dni" id="buscar_dniAlumno" type="text"/>','<button type="button" onclick="AlumnoReadREST()">Buscar</button>'));

function AlumnoReadREST() {
    

    $('#r_alumno').html(buscadorDni);

    var dniId = $('#buscar_dniAlumno').val();
    if ( dniId === "" ) {
        $.ajax({
            url: URLAlumno,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                //$('#r_alumno').empty();
                var table = $('<table />').empty();
                //var table = $('<table />');
                table = $('<table />').addClass('table table-stripped');
                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>')));
                var tbody = $('<tbody />');
                for (var alumno in json) {
                    console.log(json[alumno]);
                    tbody.append($('<tr />').append('<td>' + json[alumno].dni + '</td>',
                                '<td>' + json[alumno].nombre + '</td>', '<td>' + json[alumno].apellidos + '</td>'));
                }
                table.append(tbody);

                $('#r_alumno').append('<h3>Listado de Alumnos</h3>');
                $('#r_alumno').append($('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema, en alumnos sin datos');
            }
        });
    }else {
        $.ajax({
            url: URLAlumno + dniId,
            type: 'GET',
            dataType: 'json',
            success: function (alumno) {
                console.log(JSON.stringify(alumno));
                //$('#r_alumno').html('<h3>Listado de Alumnos</h3>');
                table = $('<table />').addClass('table table-stripped');
                table.append($('<thead />').append($('<tr />').append('<th>id</th>', '<th>nombre</th>', '<th>apellidos</th>')));
                var tbody = $('<tbody />');
                    //console.log(alumno);
                    tbody.append($('<tr />').append('<td>' + alumno.dni + '</td>',
                                '<td>' + alumno.nombre + '</td>', '<td>' + alumno.apellidos + '</td>'));
                table.append(tbody);

                $('#r_alumno').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema, en alumnos con datos');
            }
        });
    }
    $('#buscar_dni').val("");
}
function PrestamoReadUsuarioREST(){
    $.ajax({
            url: URLPrestamo,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                console.log(JSON.stringify(json));
                $('#r_prestamo_usuario').html('<h3>Listado de Alumnos con prestamos</h3>');
                var ul = $('<ul />').empty();
                var alumnos=[];
                for (var alumno in json) {
                    var id="'"+json[alumno].dniAlumno.dni+"'";
                    if(alumnos.indexOf(json[alumno].dniAlumno.dni)==-1)
                        ul.append($('<li onclick="detallePrestamo('+id+')">'+json[alumno].dniAlumno.dni+'</li>'));
                        alumnos.push(json[alumno].dniAlumno.dni)
                }
                //table.append(tbody);
                $('#r_prestamo_usuario').append( $('<div />').append(ul) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema, en alumnos con datos');
            }
        });
}


function detallePrestamo(dniDetallePrestamo){
    $.ajax({
            url: URLPrestamo,
            type: 'GET',
            dataType: 'json',
            success: function (json) {
                console.log(JSON.stringify(json));
                $('#r_prestamo_usuario').html('<h3>Listado de Prestamos del alumno con dni '+dniDetallePrestamo+'</h3>');
                table = $('<table />').addClass('table table-stripped');
                table.append($('<thead />').append($('<tr />').append('<th>id</th>','<th>isbn</th>', '<th>dni</th>','<th>fecha</th>')));
                var tbody = $('<tbody />');
                for (var alquiler in json) {
                    if(json[alquiler].dniAlumno.dni==dniDetallePrestamo)
                        tbody.append($('<tr />').append('<td>' + json[alquiler].idAlquiler + '</td>','<td>' + json[alquiler].isbnLibro.isbn + '</td>', '<td>' + json[alquiler].dniAlumno.dni + '</td>','<td>' + json[alquiler].fecha + '</td>'));
            }
            //console.log(alumnos)
                table.append(tbody);
                $('#r_prestamo_usuario').append( $('<div />').append(table) );
                $('tr:odd').css('background','#CCCCCC');
            },
            error: function (xhr, status) {
                console.log('Disculpe, existió un problema, en alumnos con datos');
            }
        });

}

function AlumnoPostREST() {
    var datos = {
        "dni": $('#dniPostAlumno').val(),
        "nombre": $('#nombrePostAlumno').val(),
        "apellidos": $('#apellidosPostAlumno').val()
};
    console.log(JSON.stringify(datos));
        $.ajax({
            url: URLAlumno,
            data : JSON.stringify(datos),
            contentType: "application/json",
            type: 'POST',
            dataType: 'json',
            success: function (json) {
                $('#div_parrafo').remove();
                var div=$('<div id="div_parrafo"/>').empty();
                var parrafoError="<p id='parrafoError'>"+"alumno creado correctamente"+"</p>";
                $(div).html($(parrafoError))
                $('#c_alumno').append( $(div));
            },
            error: function (xhr, status) {
                $('#div_parrafo').remove();
                var div=$('<div id="div_parrafo"/>').empty();
                var parrafoError="<p id='parrafoError'>"+"el dni ya existe en la base de datos"+"</p>";
                $(div).html($(parrafoError))
                $('#c_alumno').append( $(div));
            }
        });
    
}
//post de alumno
function AlumnoForm() {
    $('#c_alumno').html('<h3>Crear nuevo Alumno:</h3>');
    var form = $('<form />');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="dni">dni:</label>');
    div.append('<input id="dniPostAlumno" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="nombre">nombre:</label>');
    div.append('<input id="nombrePostAlumno" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="apellidos">apellidos:</label>');
    div.append('<input id="apellidosPostAlumno" type="text" class="form-control" />');
    form.append(div);

    /*div = $('<div />').addClass('form-group');
    div.append('<label for="id">id:</label>');
    div.append('<input id="id" type="text" class="form-control" />');
    form.append(div);*/
    
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="AlumnoPostREST()" type="button" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#c_alumno').append(form);
}

//put de alumno
function AlumnoUpdateForm() {
    $('#u_alumno').html('<h3>Actualizar Alumno:</h3>');
    var form = $('<form />');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="dni_busqueda">dni a buscar:</label>');
    div.append('<input id="dni_busqueda" type="text" class="form-control" />');
    div.append('<button onclick="AlumnoRellenarPut()" type="button" class="btn btn-success"> Buscar');
    div.append('<br>');
    form.append(div);
    
    div.append('<label for="dni">dni:</label>');
    div.append('<input id="dniAlumnoPut" type="text" class="form-control" disabled="true"/>');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="nombre">nombre:</label>');
    div.append('<input id="nombreAlumnoPut" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<label for="apellidos">apellidos:</label>');
    div.append('<input id="apellidosAlumnoPut" type="text" class="form-control" />');
    form.append(div);

    /*div = $('<div />').addClass('form-group');
    div.append('<label for="id">id:</label>');
    div.append('<input id="id" type="text" class="form-control" />');
    form.append(div);*/
    
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="AlumnoPutREST()" type="button" class="btn btn-success"> Aceptar </div>');
    form.append(div);
    
    $('#u_alumno').append(form);
}

function AlumnoRellenarPut() {
    var dniRellenarPut=$('#dni_busqueda').val();
    $.ajax({
        url: URLAlumno + dniRellenarPut,
        type: 'GET',
        dataType: 'json',
        success: function (json) {
            $('#dniAlumnoPut').val(json.dni);
            $('#nombreAlumnoPut').val(json.nombre);
            $('#apellidosAlumnoPut').val(json.apellidos);
        },
        error: function (xhr, status) {
            console.log('Disculpe, existió un problema');
        }
    }); 
}

// put de alumno
function AlumnoPutREST() {
    var datos = {
        "dni": $('#dniAlumnoPut').val(),
        "nombre": $('#nombreAlumnoPut').val(),
        "apellidos": $('#apellidosAlumnoPut').val()
};
    var dni=$('#dniBusqueda').val();
        $.ajax({
            url: URLAlumno + dni,
            data : JSON.stringify(datos),
            contentType: "application/json",
            type: 'PUT',
            dataType: 'json',
            success: function (json) {
                $('#div_parrafo').remove();
                var div=$('<div id="div_parrafo"/>').empty();
                var parrafoError="<p id='parrafoError'>"+"alumno actualizado correctamente"+"</p>";
                $(div).html($(parrafoError))
                $('#u_alumno').append( $(div));
            },
            error: function (xhr, status) {
                 $('#div_parrafo').remove();
                var div=$('<div id="div_parrafo"/>').empty();
                var parrafoError="<p id='parrafoError'>"+"se ha producido un error al actualizar el alumno"+"</p>";
                $(div).html($(parrafoError))
                $('#u_alumno').append( $(div));
            }
        });
    
}

function AlumnoDeleteForm() {
    
    $('#d_alumno').html('<h3>Borrar Alumno:</h3>');
    var form = $('<form />');
    var div = $('<div />').addClass('form-group');
    div.append('<label for="dniBusquedaBorrar">dni a buscar:</label>');
    div.append('<input id="dniBusquedaBorrar" type="text" class="form-control" />');
    form.append(div);
    div = $('<div />').addClass('form-group');
    div.append('<button onclick="AlumnoDeleteREST()" type="button" class="btn btn-success"> Borrar </div>');
    form.append(div);
    
    $('#d_alumno').append(form);
}

// delete de alumno
function AlumnoDeleteREST() {
    var dni = $('#dniBusquedaBorrar').val();
        $.ajax({
            url: URLAlumno + dni,
            type: 'DELETE',
            success: function (json) {
                $('#div_parrafo').remove();
                var div=$('<div id="div_parrafo"/>').empty();
                var parrafoError="<p id='parrafoError'>"+"el alumno se ha eliminado correctamente"+"</p>";
                $(div).html($(parrafoError))
                $('#d_alumno').append( $(div));
            },
            error: function (xhr, status) {
                $('#div_parrafo').remove();
                var div=$('<div id="div_parrafo"/>').empty();
                var parrafoError="<p id='parrafoError'>"+"el alumno no existe en la base de datos"+"</p>";
                $(div).html($(parrafoError))
                $('#d_alumno').append( $(div));
            }
        });
    
}



