///// Funciones Altas Declarantes //////
function registros(){
    $.ajax({
        url: ip + '/declaraciones/masiveUpload/getGeneratedUsersMU',
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : token
        }
        }).done(function(datos){
            var tabla="<tr><th>Nombre</th><th>Apellido Paterno</th><th>Apellido Materno</th><th>RFC y Homoclave</th> <th>Seleccionar</th></tr>";
            for(var i=0;i<Object.keys(datos.result.data).length;i++){
                tabla=tabla + "<tr><td>" + datos.result.data[i]['nombres'] + "</td> <td>"
                                            + datos.result.data[i]['apellido_paterno'] + "</td> <td>"
                                            + datos.result.data[i]['apellido_materno'] + "</td> <td>"
                                            + datos.result.data[i]['rfc'] + datos.result.data[i]['rfc_homoclave'] + "</td> <td><input type='radio' name='op' id='cv"+i+"' value='"
                                            + datos.result.data[i]['id'] + "'></td> </tr>"
            }
            document.getElementById('contenido').innerHTML=tabla;
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}

function insertOrUpdate(){
    if(actualizar){
        updateDeclarante();
    }else{
        insertDeclarante();
    }
}


function selectDeclarante(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#cv'+i;
        if($(id).is(':checked')){
            idCurriculum=$(id).val();
        }
    }
    
    $.ajax({
        url: ip + '/declaraciones/masiveUpload/getGeneratedUserByIdMU?id='+idCurriculum,
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        if(datos.status){
            actualizar=true;
            $('#nuevoDeclarante').show();
            $("#nombres").val(datos.result.data.nombres);
            $("#apellido1").val(datos.result.data.apellido_paterno);
            $("#apellido2").val(datos.result.data.apellido_materno);
            $("#rfc").val(datos.result.data.rfc);
            $("#homoclave").val(datos.result.data.rfc_homoclave);
            $("#curp").val(datos.result.data.curp);
            selectEnte(datos.result.data.ente_publico);
            $("#mailInstitucion").val(datos.result.data.correo_electronico_lab);
            $("#mailPersonal").val(datos.result.data.correo_electronico_per);
            selectEmpleo();
        }else{
            alert(datos.msg)
        }       
        
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
}

function selectEmpleo(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#cv'+i;
        if($(id).is(':checked')){
            idCurriculum=$(id).val();
        }
    }
    $.ajax({
        url: ip + '/declaraciones/masiveUpload/selectDeclaranteEncargoActualByIDMU?id='+idCurriculum,
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
        }).done(function(datos){
            if(datos.status){
                actualizar=true;
                $("#nivelGob").val(datos.result.data.nivel);
                $("#poder").val(datos.result.data.poder);
                if(datos.result.data.nivel=='ESTATAL'){
                    $('#ambitoPublico').show();
                }else{
                    $('#ambitoPublico').hide();
                }
                document.getElementById('nombreEmpleo').value=datos.result.data.cargo_comision;
                if(datos.result.data.contrato_honorarios){
                    document.getElementById('contratoS').checked =true;
                }else{
                    document.getElementById('contratoN').checked =true;
                }
                document.getElementById('nivelEncargo').value=datos.result.data.nivel_encargo;
                document.getElementById('areaAds').value=datos.result.data.area_adscripcion;
                $("#fecPos").datepicker( "setDate" , new Date(datos.result.data.fecha_posesion.split("/").reverse().join("/")));
                document.getElementById('telOficina').value=datos.result.data.tel_oficina;
                document.getElementById('extencion').value=datos.result.data.ext_tel_oficina;
                document.getElementById('funciones').value=datos.result.data.funciones_principales;

                if(datos.result.data.pais_domicilio== '146'){
                    document.getElementById('lugar').checked =true;
                    $("#nacional").show();
                    $("#extranjero").hide();
                    $("#paisE").hide();
                    estado(datos.result.data.entidad_domicilio);
                    domMunicipio(datos.result.data.municipio_domicilio,datos.result.data.entidad_domicilio);
                    document.getElementById('cp').value=datos.result.data.cp_domicilio;
                    domColonia(datos.result.data.colonia_domicilio,datos.result.data.cp_domicilio);
                    $("#tipoVia").val(datos.result.data.tipo_via);
                    document.getElementById('nombreVia').value=datos.result.data.nombre_via;
                    document.getElementById('numExterior').value=datos.result.data.no_exterior_domicilio;
                    document.getElementById('numInterior').value=datos.result.data.no_interior_domicilio;
                }else{
                    document.getElementById('lugarE').checked =true;
                    $("#extranjero").show();
                    $("#paisE").show();
                    $("#nacional").hide();
                    pais(datos.result.data.pais_domicilio-1);
                    document.getElementById('cpExt').value=datos.result.data.cp_domicilio;
                    document.getElementById('coloniaExt').value=datos.result.data.colonia_domicilio;
                    $("#tipoViaExt").val(datos.result.data.tipo_via);
                    document.getElementById('nombreViaExt').value=datos.result.data.nombre_via;
                    document.getElementById('numExteriorExt').value=datos.result.data.no_exterior_domicilio;
                    document.getElementById('numInteriorExt').value=datos.result.data.no_interior_domicilio;
                    document.getElementById('entidadExt').value=datos.result.data.entidad_domicilio_extranjero;
                    document.getElementById('municipioExt').value=datos.result.data.ciudad_domicilio_extranjero;
                }
                if(datos.result.data.declaracion_completa){
                    document.getElementById('jefe').checked =true;
                }else{
                    document.getElementById('enlace').checked =true;
                }
                idEmpleo=datos.result.data.id;
            } else{
                alert(datos.msg);
                //location.reload();
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}


function updateDeclarante(){
    var rol='';
    
    if(sessionStorage.getItem("rol") == 'seseaadmin'){
        rol=$('#rol').val();
    }
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#cv'+i;
        if($(id).is(':checked')){
           var idCurriculum=$(id).val();
        }
    }
    
    $.ajax({
        type: "POST",
        url: ip + '/declaraciones/masiveUpload/updateGralUsersMU',
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
        crossDomain: true,
        data: JSON.stringify({ 
                    "id": idCurriculum,
                    "nombres":$('#nombres').val(),
                    "apellido_paterno":$('#apellido1').val(),
                    "apellido_materno":$('#apellido2').val(),
                    "rfc":$('#rfc').val(),
                    "rfc_homoclave": $('#homoclave').val(),
                    "curp":$('#curp').val(),
                    "ente_publico":$('#entePublico').val(),
                    "correo_electronico_lab":$('#mailInstitucion').val(),
                    "correo_electronico_per":$('#mailPersonal').val(),
                    "role": rol 
                }),
        contentType: "application/json",
    }).done(function(data){
        if(data.status){
            alert(data.msg);
            actualizarEmpleo()
        }else{
            alert(data.msg);
            refresh=false;
            location.reload();
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    }); 
}

function actualizarEmpleo(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#cv'+i;
        if($(id).is(':checked')){
            idCurriculum=$(id).val();
        }
    }
    
    var lugar=$('input:radio[name=lugar]:checked').val(),estado='',municipio='',estadoExt='',municipioExt='';
    var colonia='';
    var tipoVia='';
    var nombreVia='';
    var cp='';
    var noExt='';
    var noInt='';
    var ambito='';
    if($("#nivelGob").val() == 'ESTATAL'){
        ambito=$("#poder").val();
    }
    if(lugar!='146'){
        lugar=$("#pais").val();
        colonia=$("#coloniaExt").val();
        tipoVia=$("#tipoViaExt").val();
        nombreVia=$("#nombreViaExt").val();
        cp=$("#cpExt").val();
        noExt=$("#numExteriorExt").val();
        noInt=$("#numInteriorExt").val();
        estadoExt=$("#entidadExt").val();
        municipioExt=$("#municipioExt").val();
    }else{
        colonia=$("#colonia").val();
        tipoVia=$("#tipoVia").val();
        nombreVia=$("#nombreVia").val();
        cp=$("#cp").val();
        noExt=$("#numExterior").val();
        noInt=$("#numInterior").val();
        estado=$("#entidadFed").val();
        municipio=$("#municipio").val();
    }
    
    $.ajax({
        url: ip + '/declaraciones/masiveUpload/updateDeclaranteEncargoActualMU',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
        data: JSON.stringify({ 
                    "id": idEmpleo,
                    "tipo_declaracion": $("#tipoDecEditar").val(),
                    "id_declarante": idCurriculum,
                    "ente_publico":$('#entePublico').val(),
                    "cargo_comision": $("#nombreEmpleo").val(),
                    "nivel": $("#nivelGob").val(),
                    "poder": ambito,
                    "tipo_contrato": "",
                    "nivel_encargo": $("#nivelEncargo").val(),
                    "area_adscripcion": $("#areaAds").val(),
                    "funciones_principales": $("#funciones").val(),
                    "tel_oficina": $("#telOficina").val(),
                    "contrato_honorarios": $('input:radio[name=contrato]:checked').val(),
                    "pais_ubicacion": lugar,
                    "entidad_domicilio":  estado,
                    "municipio_domicilio":  municipio,
                    "pais_domicilio":  lugar,
                    "colonia_domicilio": colonia,
                    "tipo_via": tipoVia,
                    "nombre_via":  nombreVia,
                    "cp_domicilio":  cp,
                    "no_exterior_domicilio": noExt,
                    "no_interior_domicilio": noInt,
                    "ciudad_domicilio_extranjero":  municipioExt,
                    "entidad_domicilio_extranjero":  estadoExt,
                    "observaciones": $("#obsComentarios").val(),
                    "fecha_posesion": document.getElementById('fecPos').value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1'),
                    "sector_industria": "",
                    "otro_sector_industria": "",
                    "otro_funciones_principales": "",
                    "ext_tel_oficina": $("#extencion").val(),
                    "declaracion_completa":  $('input:radio[name=nivelEmpleado]:checked').val()
                })
        }).done(function(data){
            alert(data.msg);
            refresh=false;
            location.reload();
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}


function deleteDatosCurriculo(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#cv'+i;
        if($(id).is(':checked')){
           var idDeclaracion=$(id).val();
        }
    }
    $.ajax({
        url: ip + '/declaraciones/masiveUpload/deleteGralUsersMU?id=' + idDeclaracion,
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : token
        }
    }).done(function(datos){
        alert(datos.msg);
        refresh=false;
        location.reload();
    }).fail( function( jqXHR, textStatus, errorThrown ) {
       
    });
}

var idUser;
var password;
var refresh=true;
var token=sessionStorage.getItem("token");
var actualizar=false;
var actualizarEnte=false;
var actualizarEmail=false;
var ip=sessionStorage.getItem("ip");
var ente=null
var idEmpleo=0;
var idUpdate=null,rfcUpdate=null;


////////////////////// EXTRAS //////////////////////
function selectEnte(indice){
    var selector = document.getElementById('entePublico');
    var selTam=selector.options.length;
    for (var j = selTam-1; j >-1 ; j--) {
        selector.options[j]=null;
    }

        $.ajax({
            url: ip + '/declaraciones/ente/getEntePublicoUserLogged',
            type: 'GET', 
            dataType: 'json',
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            }
         }).done(function(datos){
                var x = document.getElementById("entePublico");
                var option;
                option = document.createElement("option");
                option.text = datos.result.data.nombre_ente;
                option.value = datos.result.data.id;
                x.add(option); 
                
            }).fail( function( jqXHR, textStatus, errorThrown ) {
                alert(jqXHR.responseJSON.msg)
        });
    
    
    
}
function estado(indice){
    $.ajax({
        url: ip + '/declaraciones/geoInfo/allEdos',
        type: 'GET', 
        dataType: 'json',
    }).done(function(data){
            var x = document.getElementById("entidadFed");
            var option;
            for(var i=0;i<Object.keys(data['data']).length;i++){
                option = document.createElement("option");
                option.text = data['data'][i]['nombre'];
                option.value = data['data'][i]['clave'];
                if(indice==option.value){
                    option.selected=true;
                }
                x.add(option); 
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
    });
}
function domMunicipio(indice,estado){
    $.ajax({
        url: ip + '/declaraciones/geoInfo/munByCveEdo?id_estado=' + estado,
        type: 'GET', 
        dataType: 'json',
    }).done(function(data){
            var x = document.getElementById("municipio");
            var option;
            for(var i=0;i<Object.keys(data).length;i++){
                option = document.createElement("option");
                option.text = data[i]['nombre'];
                option.value = data[i]['clave'];
                if(indice==option.value){
                    option.selected=true;
                }
                x.add(option); 
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
    });
}
function domColonia(indice,cp){
    $.ajax({
        url: ip + '/declaraciones/geoInfo/infoByCP?cp=' + cp,
        type: 'GET', 
        dataType: 'json',
     }).done(function(data){
            var x = document.getElementById("colonia");
            var option;
            for(var i=0;i<Object.keys(data).length;i++){
                option = document.createElement("option");
                option.text = data[i]['fraccionamiento'];
                option.value = data[i]['fraccionamiento'];
                if(indice==option.value){
                    option.selected=true;
                }
                x.add(option); 
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
    });
}




window.addEventListener("beforeunload", function(event) {
    if(refresh){
        event.returnValue = "TEXT";
    }
});
