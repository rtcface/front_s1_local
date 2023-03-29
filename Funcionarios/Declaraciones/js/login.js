function login(){ 
    idUser=$('#userName').val();
    password= hex_md5($('#password').val());
    $.ajax({
        url: ip + '/declaraciones/data/login',
        type: 'POST', 
        contentType: "application/json",
        data: JSON.stringify({ 
            "username": idUser,
            "password": password
        })
    }).done(function(data,textStatus, xhr){
        if(data.status){
            token=xhr.getResponseHeader('X-AUTH-TOKEN');
            sessionStorage.setItem("sesion", true);
            idUser=data.result.id;
            sessionStorage.setItem("rol",data.result.role);
            sessionStorage.setItem("declaranteId", idUser);
            sessionStorage.setItem("token", token);
            
            $.ajax({
                url: ip + '/declaraciones/control/needChangePassword',
                type: "GET",
                dataType: "json",
                headers: {
                    'X-Auth-Token' : sessionStorage.getItem("token")
                }
            }).done(function(datos){ 
                if(datos.status){
                    $('#acceso').hide();
                    $('#nuevaContraseña').show();
                    sessionStorage.setItem("pass", password);
                }else{
                    window.location.href='declaracionPatrimonial.html'; 
                }
            }).fail( function( jqXHR, textStatus, errorThrown ) {
                alert(jqXHR.responseJSON.msg)
            });
        }else{
            alert('Usuario o Contraseña Incorrectos');
        }
        
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        
    });
        
}
 
function sesionI(){
    var entrar=sessionStorage.getItem("sesion");
    if(entrar==false || entrar==null){
        window.location.href='login.html';  
    }
}

function salir(){
    $.ajax({
        url: ip + '/declaraciones/data/logout ',
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
    }).done(function(datos,textStatus, xhr){
        sessionStorage.removeItem("sesion");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("rol");
        window.location.href='../index.html';
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        
    });  
}

function sesionI2(){
    var entrar=sessionStorage.getItem("sesion");
    if(entrar==false || entrar==null){
        window.location.href='../login.html';  
    }
}

function salir2(){
    $.ajax({
        url: ip + '/declaraciones/data/logout ',
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
    }).done(function(datos,textStatus, xhr){
        sessionStorage.removeItem("sesion");
        sessionStorage.removeItem("userId");
        sessionStorage.removeItem("token");
        sessionStorage.removeItem("rol");
        window.location.href='../index.html';
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        
    });  
}
////////////////////////// Historial de entes Publicos //////////////////////////
function historialEntes(){
    $('#anioFiscal').val(new Date().getFullYear());
    $.ajax({
        url: ip + '/declaraciones/control/selectUserEnteHistorial',
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
    }).done(function(datos,textStatus, xhr){
        var x = document.getElementById("enteAnterior");
        var option;
        for(var i=0;i<Object.keys(datos.result.data).length;i++){
            option = document.createElement("option");
            option.text = datos.result.data[i]['nombre_ente'];
            option.value = datos.result.data[i]['id_ente'];
            x.add(option); 
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        
    });
}

////////////////////////// Mostrar Delcaraciones //////////////////////////
function tipoDeclaracion(tipo){
    sessionStorage.setItem("tipoDec", tipo);
    $('#myModal').modal("show");
    if(tipo==1){
        $('#tituloDeclaracion').text('Declaración Inicial'); 
        $('#tituloModal').text('Declaración Inicial'); 
    }else if(tipo==2){
        $('#tituloDeclaracion').text('Declaración de Modificación');
        $('#tituloModal').text('Declaración de Modificación');
    }else if(tipo==3){
        $('#tituloDeclaracion').text('Declaración de Conclusión');
        $('#tituloModal').text('Declaración de Conclusión');
    }
    
}

function buscadorDeclaracion(){
    $('#myModal').modal("hide");
    $('#myModalBusqueda').modal("show");
    document.getElementById('tablaDeclaraciones').innerHTML=""; 
}
////////////////////////// Buscar Declaraciones //////////////////////////
function buscarDeclaraciones(){
    $.ajax({
        url: ip + '/declaraciones/declarante/selectControlDeclarante?tipo_declaracion='+sessionStorage.getItem("tipoDec")+'&anio='+$('#anioFiscal').val()+'&ente='+$('#enteAnterior').val(),
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
    }).done(function(datos,textStatus, xhr){
        if(datos.status){
            var tabla="<tr><th>Fecha de inicio</th><th>Fecha de envio</th><th>Estatus</th><th>Declaración Privada</th><th>Declaración Pública</th><th>Acuse Recibo</th></tr>";
            var estado='', fechaEnvio='-';
            for(var i=0;i<Object.keys(datos.result.data).length;i++){
                if(datos.result.data[i].fecha_enviada!=null){
                    fechaEnvio=datos.result.data[i].fecha_enviada;
                }
                if(datos.result.data[i].status){
                    estado='Finalizada';
                    tabla=tabla + '<tr><td>'+datos.result.data[i].fecha_inicio+'</td><td>'+fechaEnvio+'</td><td>'+estado+'</td>'+
                            '<td><button class="botonEnviar" onclick="descargarReporte2('+datos.result.data[i].id_declarante+')">Descargar</button></td>'+
                            '<td><button class="botonEnviar" onclick="descargarReportePublico2('+datos.result.data[i].id_declarante+')">Descargar</button></td>'+
                            '<td><button class="botonEnviar" onclick="descargarRecibo2('+datos.result.data[i].id_declarante+')">Descargar</button></td></tr>';
                }
            }
            document.getElementById('tablaDeclaraciones').innerHTML=tabla; 
        }else{
            alert('No se encontraron resultados en su busqueda.'); 
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        
    });
}

////////////////////////// Continuar Declaracio //////////////////////////
function continuarDeclaracion(){
    $.ajax({
        url: ip + '/declaraciones/declarante/selectControlDeclarante?tipo_declaracion='+sessionStorage.getItem("tipoDec")+'&anio=&ente=',
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
    }).done(function(datos,textStatus, xhr){
        if(datos.status){
            var cont=false, dec_completa=true;
            for(var i=0;i<Object.keys(datos.result.data).length;i++){
                if(!datos.result.data[i].status){
                    sessionStorage.setItem("id_declarante", datos.result.data[i].id_declarante);
                    cont=true;
                    dec_completa=datos.result.data[i].declaracion_completa;
                 }
            }
            sessionStorage.setItem("recomendaciones",true);
            sessionStorage.setItem("declaracion_completa", dec_completa);
            if(dec_completa==true){
                if(sessionStorage.getItem("tipoDec")==1 && cont ){
                    window.location.href='tipoDeclaracion/jefe_inicial.html'; 
                }else if(sessionStorage.getItem("tipoDec")==2 && cont){
                    window.location.href='tipoDeclaracion/jefe_modificacion.html';
                }else if(sessionStorage.getItem("tipoDec")==3 && cont){
                    window.location.href='tipoDeclaracion/jefe_conclusion.html';
                }else{
                    alert('No hay declaraciones sin concluir.');
                }
            }else{
                if(sessionStorage.getItem("tipoDec")==1 && cont){
                    window.location.href='tipoDeclaracion/enlace_inicial.html';
                }else if(sessionStorage.getItem("tipoDec")==2 && cont){
                    window.location.href='tipoDeclaracion/enlace_modificacion.html';
                }else if(sessionStorage.getItem("tipoDec")==3 && cont){
                    window.location.href='tipoDeclaracion/enlace_conclusion.html';
                }else{
                    alert('No hay declaraciones sin concluir.');
                }
            }
 
        }else{
            alert(datos.result.msg); 
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        
    });
}


////////////////////////// Envio de Declaracion //////////////////////////

function publicoPrivado(){
    var dec='/declaraciones/declarante/setDeclaracionPublica?tipo_declaracion=';
   
    $.ajax({
        url: ip + dec + sessionStorage.getItem("tipoDec"),
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos,textStatus, xhr){
        alert(datos.msg);
        envioFinal();
    }).fail( function(jqXHR, textStatus, errorThrown){
    });
}

function envioFinal(){
    $.ajax({
        url: ip + '/declaraciones/declarante/updateControlDeclarante?tipo_declaracion=' + sessionStorage.getItem("tipoDec"),
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos,textStatus, xhr){
        alert(datos.msg);
        autoDescargaRecibo();
    }).fail( function(jqXHR, textStatus, errorThrown){
    });
}

function passwordNew(){
    if($('#newPassword1').val()==$('#newPassword2').val() && $('#newPassword1').val()!='' && $('#newPassword2').val()!='' && hex_md5($('#oldPassword').val())==sessionStorage.getItem("pass")){
        var passwordN=hex_md5($('#newPassword1').val());
        sessionStorage.removeItem("pass");
        $.ajax({
            url: ip + '/declaraciones/control/updatePassword?psn='+ passwordN,
            type: "GET",
            dataType: "json",
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            }
            }).done(function(datos){
                if(datos.status){
                    alert('Recuerde guardar su contraseña antes de continuar.')
                    window.location.href='declaracionPatrimonial.html'; 
                }else{
                    alert('Algo salio mal intentelo de nuevo.')
                }
            }).fail( function( jqXHR, textStatus, errorThrown ) {
                alert(jqXHR.responseJSON.msg)
            });
    }else{
        alert('La nueva contraseña no coincide o la contraseña actual es incorrecta')
    }
}

function mostarBoton(){
    if(sessionStorage.getItem("rol") == 'seseaadmin' || sessionStorage.getItem("rol") == 'entadmin'){
        $('#botonAlta').show();
        $('#status').show();
        $('#adminOpciones').show();
        $('#userOpciones').hide();
    }else if(sessionStorage.getItem("rol") == 'contraloria'){
        $('#botonAlta').hide();
        $('#status').show();
        $('#adminOpciones').show();
        $('#userOpciones').hide();
    }
}

function adminUser(){
    if(sessionStorage.getItem("rol") == 'seseaadmin'){
        location.href='altaAdmin.html'
    }else{
        location.href='altaDeclarante.html'
    }
}
////////////////////////// Funciones Mostrar o Descargar Reporte //////////////////////////
function vistaPrevia(){ 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/preview?id_declarante=' + sessionStorage.getItem("id_declarante") + '&tipo_declaracion=' + sessionStorage.getItem("tipoDec") , true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        //link.target='blank';
        link.download = "Reporte Declaracion Vista Previa.pdf";
        //link.open = "Reporte Declaracion Vista Previa.pdf";
        link.click();       
      }
    };
    xhr.send();
}

function vistaPrevia2(){ 
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#declarante'+i;
        var celda='#c'+i;
        if($(id).is(':checked')){
            var idDec=$(id).val();
            var tipoDeclaracion=$(celda).val();
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/preview?id_declarante=' + idDec + '&tipo_declaracion=' + tipoDeclaracion , true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Reporte Declaracion Vista Previa.pdf";
        link.click();       
      }
    };
    xhr.send();
}

function autoDescargaReporte(){ 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/declaracionReport?id_declarante=' + sessionStorage.getItem("id_declarante") + '&tipo_declaracion=' + sessionStorage.getItem("tipoDec")  + '&id_declarador=' + sessionStorage.getItem("declaranteId"), true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Reporte Declaracion de Bienes.pdf";
        link.click();  
        alert('Declaración descargada.'); 
        window.location.href='../declaracionPatrimonial.html';   
      }
    };
    xhr.send();
}
function autoDescargaRecibo(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/getAcuseRecibo?tipo_declaracion='+sessionStorage.getItem("tipoDec")+'&id_declarante='+sessionStorage.getItem("id_declarante") , true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "acuse_recibo.pdf";
        link.click(); 
        alert('Acuse recibo descargado.');  
        autoDescargaReporte(); 
      }
    };
    xhr.send();
}
function descargarReporte(){ 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/declaracionReport?id_declarante=' + sessionStorage.getItem("declaranteId") + '&tipo_declaracion=' + sessionStorage.getItem("tipoDec") , true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Reporte Declaracion de Bienes.pdf";
        link.click();       
      }
    };
    xhr.send();
}
function descargarReporte2(id){ 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/declaracionReport?id_declarante=' + id + '&tipo_declaracion=' + sessionStorage.getItem("tipoDec") + '&id_declarador=' + sessionStorage.getItem("declaranteId"), true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Reporte Declaracion de Bienes.pdf";
        link.click();       
      }
    };
    xhr.send();
}
function descargarReportePublico2(id){ 
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/publicDeclaracionReport?id_declarante=' + id + '&tipo_declaracion=' + sessionStorage.getItem("tipoDec") + '&id_declarador=' + sessionStorage.getItem("declaranteId"), true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Reporte Declaracion de Bienes.pdf";
        link.click();       
      }
    };
    xhr.send();
}
function descargarRecibo(){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/getAcuseRecibo?tipo_declaracion='+sessionStorage.getItem("tipoDec")+'&id_declarante='+sessionStorage.getItem("declaranteId") , true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "acuse_recibo.pdf";
        link.click();       
      }
    };
    xhr.send();
}
function descargarRecibo2(id){
    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/getAcuseRecibo?tipo_declaracion='+sessionStorage.getItem("tipoDec")+'&id_declarante='+id , true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "acuse_recibo.pdf";
        link.click();       
      }
    };
    xhr.send();
}
function consultarDeclaracionPrivada(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#id_declarante'+i;
        var radio='#declarante'+i;
        var celda='#c'+i;
        if($(radio).is(':checked')){
            var idDec=$(id).val();
            var declarador=$(radio).val();
            var tipoDeclaracion=$(celda).val();
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/declaracionReport?id_declarante=' + idDec + '&tipo_declaracion=' + tipoDeclaracion  + '&id_declarador=' + declarador, true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Reporte Declaracion de Bienes.pdf";
        link.click();   
      }
    };
    xhr.send();
}
function consultarDeclaracionPublica(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#id_declarante'+i;
        var radio='#declarante'+i;
        var celda='#c'+i;
        if($(radio).is(':checked')){
            var idDec=$(id).val();
            var declarador=$(radio).val();
            var tipoDeclaracion=$(celda).val();
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/publicDeclaracionReport?id_declarante=' + idDec + '&tipo_declaracion=' + tipoDeclaracion + '&id_declarador=' + declarador, true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Reporte Declaracion de Bienes.pdf";
        link.click();   
      }
    };
    xhr.send();
}
function consultarAcuseRecibo(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#id_declarante'+i;
        var radio='#declarante'+i;
        var celda='#c'+i;
        if($(radio).is(':checked')){
            var idDec=$(id).val();
            var tipoDeclaracion=$(celda).val();
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/getAcuseRecibo?id_declarante=' + idDec + '&tipo_declaracion=' + tipoDeclaracion , true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "acuse_recibo.pdf";
        link.click();   
      }
    };
    xhr.send();
}


function descargarReporteDeclarantes(){ 
    var ente=$('#entePublico').val();
    var tipo=$('#tipoDeDeclaracion').val();
    var tiempo=$('#tiempoEnvio').val();
    var aprobacion=$('#aprobado').val();

    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/generate/getMonitorDeclaraciones?tipo_declaracion='+tipo+'&tiempo_envio='+tiempo+'&aprobacion='+aprobacion+'&ente_publico='+ente , true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Reporte Declaracion de Bienes.pdf";
        link.click();       
      }
    };
    xhr.send();
}
function consultarDeclaracionFiscal(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#declarante'+i;
        var celda='#c'+i;
        if($(id).is(':checked')){
            var idDec=$(id).val();
            var tipoDeclaracion=$(celda).val();
        }
    }

    var xhr = new XMLHttpRequest();
    xhr.open('GET', ip + '/declaraciones/decFiscal/downloadDecFiscal?id_declarador=' + idDec, true);
    xhr.setRequestHeader('X-Auth-Token',sessionStorage.getItem("token"));
    xhr.responseType = 'blob';

    xhr.onload = function(e) {
      if (this.status == 200) {
        /*var blob = new Blob([this.response], {type: 'application/pdf'});
        var url=window.URL.createObjectURL(blob);
        document.getElementById('consultaReporte').src=url; */
        var blob = new Blob([this.response], {type: 'application/pdf'});
        var link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = "Reporte Declaracion de Fiscal.pdf";
        link.click();   
      }
    };
    xhr.send();
}
////////////////////////// Funciones Altas Declarantes //////////////////////////
function alta(){
    if(sessionStorage.getItem("rol") == 'seseaadmin'){
        $('#texto').text('Alta Administrador');
        $('#contenedorEnte').show();
    }
    $.ajax({
        url: ip + '/declaraciones/control/getGeneratedUsers',
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
        }).done(function(datos){
            var tabla="";
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
function selectDeclarante(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#cv'+i;
        if($(id).is(':checked')){
            idCurriculum=$(id).val();
        }
    }
    
    $.ajax({
        url: ip + '/declaraciones/control/getGeneratedUserById?id='+idCurriculum,
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
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
        $('#myModalEditar').modal('hide');
        
        if(sessionStorage.getItem("rol") == 'seseaadmin'){
            alert(datos.msg);
            $("#rol").val(datos.result.data.role);
        }else{
            selectEmpleo();
        }
        
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
}
function insertDeclarante(){
    var insertar, rol='';
    
    if(sessionStorage.getItem("rol") == 'seseaadmin'){
        insertar='/declaraciones/control/insertEntAdmin';
        rol=$('#rol').val();
    }else{
        insertar='/declaraciones/control/insertSimpleUser';
    }
    $.ajax({
        url: ip + insertar,
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
    data: JSON.stringify({ 
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
            })
    }).done(function(datos){
        if(datos.status){
            if(sessionStorage.getItem("rol") == 'seseaadmin'){
                alert(datos.msg);
                location.reload();
            }else{
                insertarEmpleo(datos.result.id);
            }
        }else{
            alert(datos.msg);
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
        url: ip + '/declaraciones/control/updateGralUsers',
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
            if(sessionStorage.getItem("rol") == 'seseaadmin'){
                alert(data.msg);
                location.reload();
            }else{
                actualizarEmpleo(); 
            }
        }else{
            alert(data.msg);
            location.reload();
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    }); 
}
function deleteDeclarante(){
    if($('input:radio[name=op]').is(':checked')){
        var nFilas = $("#tablaDeclarantes tr").length;
        for(var i=0;i<nFilas;i++){
            var id='#cv'+i;
            if($(id).is(':checked')){
            var idCurriculum=$(id).val();
            }
        }
        if(confirm('¿Seguro que desea eliminar este registro?')){
            $.ajax({
                url: ip + '/declaraciones/control/deleteGralUsers',
                type: "POST",
                contentType: "application/json",
                headers: {
                    'X-Auth-Token' : sessionStorage.getItem("token")
                },
                data: JSON.stringify({ 
                    "id": idCurriculum 
                })
            }).done(function(datos){
                alert(datos.msg);
                location.reload();
            }).fail( function(jqXHR, textStatus, errorThrown){
                alert(jqXHR.responseJSON.msg);
            });
        }
    }else{
        alert('No se ha seleccionado ninguna opción.')
    }
}
function insertOrUpdate(){
    if(actualizar){
        if(idUpdate!=null){
            actualizarEntePublico();
        }else{
            updateDeclarante();
        }
    }else{
        insertDeclarante();
    }
}

////////////////////////// Ente Publico //////////////////////////

function cargarEntes(){
    $.ajax({
        url: ip + '/declaraciones/ente/getEntePublicoByUser',
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        var tabla="<tr><th>Nombre del ente</th><th>Siglas</th><th>Estado</th><th>Municipio</th> <th>Seleccionar</th></tr>";
        for(var i=0;i<Object.keys(datos.result.data).length;i++){
            tabla=tabla + "<tr><td>" + datos.result.data[i]['nombre_ente'] + "</td> <td>"
                                        + datos.result.data[i]['siglas_ente'] + "</td> <td>"
                                        + datos.result.data[i]['estado_ente'] + "</td> <td>"
                                        + datos.result.data[i]['municipio_ente'] + "</td> <td><input type='radio' name='opEnte' id='ente"+i+"' value='"
                                        + datos.result.data[i]['id'] + "'></td> </tr>"
        }
        document.getElementById('contenidoEntes').innerHTML=tabla;
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    }); 
}
function insertEnte(){
   if($('#nombreEnte').val()!='' && $('#siglas').val()!='' && $('#entidadFed').val()!=null && $('#municipio').val()!=null){
    $.ajax({
        url: ip + '/declaraciones/ente/insertEntePublico',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
    data: JSON.stringify({ 
                "nombre_ente":$('#nombreEnte').val(),
                "siglas_ente":$('#siglas').val(),
                "estado_ente":$('#entidadFed').val(),
                "municipio_ente":$('#municipio').val()    
            })
    }).done(function(data){
        alert(data.msg);
        location.reload();
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    }); 
    }else{
        alert('Llene todos los campos'); 
    }
}
function selectEnteById(){
    var nFilas = $("#tablaEntes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#ente'+i;
        if($(id).is(':checked')){
            idCurriculum=$(id).val();
        }
    }

    $.ajax({
        url: ip + '/declaraciones/ente/getEntePublicoById?id=' + idCurriculum,
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        $('#nombreEnte').val(datos.result.data.nombre_ente);
        $('#siglas').val(datos.result.data.siglas_ente);
        document.getElementById('entidadFed').value=datos.result.data.estado_ente;
        domMunicipio(datos.result.data.municipio_ente,datos.result.data.estado_ente);
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    }); 
    actualizarEnte=true;
}
function updateEnte(){
    var nFilas = $("#tablaEntes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#ente'+i;
        if($(id).is(':checked')){
           var idCurriculum=$(id).val();
        }
    }
    if($('#nombreEnte').val()!='' && $('#siglas').val()!='' && $('#entidadFed').val()!=null && $('#municipio').val()!=null){
        $.ajax({
            url: ip + '/declaraciones/ente/updateEntePublico',
            type: "POST",
            contentType: "application/json",
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            },
        data: JSON.stringify({ 
                    "id":idCurriculum,
                    "nombre_ente":$('#nombreEnte').val(),
                    "siglas_ente":$('#siglas').val(),
                    "estado_ente":$('#entidadFed').val(),
                    "municipio_ente":$('#municipio').val()    
                })
        }).done(function(data){
            alert(data.msg);
            location.reload();
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        }); 
    }else{
        alert('Llene todos los campos'); 
    }
}
function deleteEnte(){
    var nFilas = $("#tablaEntes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#ente'+i;
        if($(id).is(':checked')){
           var idCurriculum=$(id).val();
        }
    }
    $.ajax({
        url: ip + '/declaraciones/ente/deleteEntePublico?id='+idCurriculum,
        type: "GET",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        alert(datos.msg);
        location.reload();
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
}
function insertUpdateEnte(){
    if(actualizarEnte){
        updateEnte();
    }else{
        insertEnte();
    }
}

////////////////////////// Mostrar Ente Publico en Select //////////////////////////
function entes(){ 
    if(sessionStorage.getItem("rol") == 'seseaadmin' || sessionStorage.getItem("rol") == 'contraloria'){
        $.ajax({
            url: ip + '/declaraciones/ente/getEntePublico',
            type: "GET",
            dataType: "json",
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            }
        }).done(function(datos){
            var x = document.getElementById("entePublico");
            var option;
            for(var i=0;i<Object.keys(datos.result.data).length;i++){
                option = document.createElement("option");
                option.text = datos.result.data[i]['nombre_ente'];
                option.value = datos.result.data[i]['id'];
                x.add(option); 
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        }); 
    }else{
        $.ajax({
            url: ip + '/declaraciones/ente/getEntePublicoUserLogged',
            type: "GET",
            dataType: "json",
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
           ente=datos.result.data.id;
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        }); 
    }
    
}
function selectEnte(indice){
    var selector = document.getElementById('entePublico');
    var selTam=selector.options.length;
    for (var j = selTam-1; j >-1 ; j--) {
        selector.options[j]=null;
    }

    if(sessionStorage.getItem("rol") == 'seseaadmin'){
        $.ajax({
            url: ip + '/declaraciones/ente/getEntePublico',
            type: 'GET', 
            dataType: 'json',
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            }
         }).done(function(datos){
                var x = document.getElementById("entePublico");
                var option;
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    option = document.createElement("option");
                    option.text = datos.result.data[i]['nombre_ente'];
                    option.value = datos.result.data[i]['id'];
                    if(datos.result.data[i]['id']==indice){
                        option.selected=true;
                    }
                    x.add(option); 
                }
            }).fail( function( jqXHR, textStatus, errorThrown ) {
                alert(jqXHR.responseJSON.msg)
        });
    }else{
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

////////////////////////// Estatus Declarantes //////////////////////////
function allStatus(){
    if(sessionStorage.getItem("rol") == 'seseaadmin'){
        $('#envioEmail').show();
        $('#addEmail').show();
    }
    $.ajax({
        url: ip + '/declaraciones/monitor/getMonitorDeclaraciones?tipo_declaracion=null&tiempo_envio=null&ente_publico=null',
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        var tabla="";
        for(var i=0;i<Object.keys(datos.result.data).length;i++){
            var declaracion;
            if(datos.result.data[i]['tipo_declaracion']==1){
                declaracion='Inicial';
            }else if(datos.result.data[i]['tipo_declaracion']==2){
                declaracion='Modificación';
            }else{
                declaracion='Conclusión';
            }
            var url="";
            if(datos.result.data[i]['status']=='Enviada'){
                url=ip + '/declaraciones/public/publicDeclaracionReport?id_declarante=' + datos.result.data[i]['id_declarante'] + '&tipo_declaracion=' + datos.result.data[i]['tipo_declaracion'] + '&id_declarador=' + datos.result.data[i]['id'];
            }
            tabla=tabla + "<tr><td>" + datos.result.data[i]['nombres'] + " "  + datos.result.data[i]['apellido_paterno'] + " " + datos.result.data[i]['apellido_materno'] + "</td> <td>" 
            + datos.result.data[i]['rfc'] + "</td> <td>"
            + datos.result.data[i]['anio_fiscal'] + "</td> <td>"
            +"<input id='c"+i+"' style='display: none' value='"+datos.result.data[i]['tipo_declaracion'] + "'>" + declaracion + "</td> <td>"
            + datos.result.data[i]['status'] + "</td> <td>"
            + datos.result.data[i]['tiempo_envio'] + "</td> <td>"
            + datos.result.data[i]['aprobacion_fiscal'] + "</td> <td><input type='radio' name='declarante' id='declarante"+i+"' value='"
            + datos.result.data[i]['id'] + "'></td> <td style='display: none'>" +"<input id='id_declarante"+i+"' value='"+datos.result.data[i]['id_declarante'] + "'>"
            + datos.result.data[i]['curp'] + "</td><td style='display: none'>"
            + datos.result.data[i]['area_adscripcion'] + "</td><td style='display: none'>"
            + datos.result.data[i]['nivel_encargo'] + "</td><td style='display: none'>"
            + datos.result.data[i]['cargo_comision'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_alta'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_baja'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_enviada'] + "</td><td style='display: none'>"
            + datos.result.data[i]['activo_inactivo'] + "</td><td style='display: none'>"
            + url +"</td> </tr>"
        }
        document.getElementById('contenido').innerHTML=tabla;
        reporteExcel()
    }).fail( function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.responseJSON.msg);
    }); 
}

function verStatus(){
    var ente=$('#entePublico').val();
    var tipo=$('#tipoDeDeclaracion').val();
    var tiempo=$('#tiempoEnvio').val();
    var aprobacion=$('#aprobado').val();
    $.ajax({
        url: ip + '/declaraciones/monitor/getMonitorDeclaraciones?tipo_declaracion='+tipo+'&tiempo_envio='+tiempo+'&ente_publico='+ente,
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        var tabla="";
        for(var i=0;i<Object.keys(datos.result.data).length;i++){
            var declaracion;
            if(datos.result.data[i]['tipo_declaracion']==1){
                declaracion='Inicial';
            }else if(datos.result.data[i]['tipo_declaracion']==2){
                declaracion='Modificación';
            }else{
                declaracion='Conclusión';
            }
            var url="";
            if(datos.result.data[i]['status']=='Enviada'){
                url=ip + '/declaraciones/public/publicDeclaracionReport?id_declarante=' + datos.result.data[i]['id_declarante'] + '&tipo_declaracion=' + datos.result.data[i]['tipo_declaracion'] + '&id_declarador=' + datos.result.data[i]['id'];
            }
            tabla=tabla + "<tr><td>" + datos.result.data[i]['nombres'] + " "  + datos.result.data[i]['apellido_paterno'] + " " + datos.result.data[i]['apellido_materno'] + "</td> <td>" 
            + datos.result.data[i]['rfc'] + "</td> <td>"
            + datos.result.data[i]['anio_fiscal'] + "</td> <td>"
            +"<input id='c"+i+"' style='display: none' value='"+datos.result.data[i]['tipo_declaracion'] + "'>" + declaracion + "</td> <td>"
            + datos.result.data[i]['status'] + "</td> <td>"
            + datos.result.data[i]['tiempo_envio'] + "</td> <td>"
            + datos.result.data[i]['aprobacion_fiscal'] + "</td> <td><input type='radio' name='declarante' id='declarante"+i+"' value='"
            + datos.result.data[i]['id'] + "'></td> <td style='display: none'>" +"<input id='id_declarante"+i+"' value='"+datos.result.data[i]['id_declarante'] + "'>"
            + datos.result.data[i]['curp'] + "</td><td style='display: none'>"
            + datos.result.data[i]['area_adscripcion'] + "</td><td style='display: none'>"
            + datos.result.data[i]['nivel_encargo'] + "</td><td style='display: none'>"
            + datos.result.data[i]['cargo_comision'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_alta'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_baja'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_enviada'] + "</td><td style='display: none'>"
            + datos.result.data[i]['activo_inactivo'] + "</td><td style='display: none'>"
            + url +"</td> </tr>"
        }
        document.getElementById('contenido').innerHTML=tabla;
        resetReportExcel();
    }).fail( function( jqXHR, textStatus, errorThrown ){
        alert(jqXHR.responseJSON.msg);
    }); 
}

function validarDecFiscal(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#declarante'+i;
        var celda='#c'+i;
        if($(id).is(':checked')){
            var idDec=$(id).val();
            var tipoDeclaracion=$(celda).val();
        }
    }
    if(confirm("Al dar clic aquí la Declaracón Fiscal se marcará como no válida.")){
        $.ajax({
            url: ip + '/declaraciones/decFiscal/rechazaDecFiscal?id_declarador='+idDec,
            type: "GET",
            dataType: "json",
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            }
        }).done(function(datos){
            alert(datos.msg);
            window.location.reload();
        }).fail( function( jqXHR, textStatus, errorThrown ){
            alert(jqXHR.responseJSON.msg);
        });
    }
}

function reactivarDeclaracion(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#declarante'+i;
        var id_declarante='#id_declarante'+i;
        if($(id).is(':checked')){
            var idDec=$(id_declarante).val();
        }
    }
    if(confirm("Al dar clic aquí se reactivara la Declaración Patrimonial y dejara de aparecer como enviada.")){
        $.ajax({
            url: ip + '/declaraciones/monitor/reactivarDeclaracion?id_declarante='+idDec,
            type: "POST",
            contentType: "application/json",
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            }
        }).done(function(datos){
            alert(datos.msg);
            window.location.reload();
        }).fail( function( jqXHR, textStatus, errorThrown ){
            alert(jqXHR.responseJSON.msg);
        });
    }
}
////////////////////////// Correos Electronicos //////////////////////////
function insertOrUpdateEmail(){
    if(actualizarEmail){
        updateEmail();
    }else{
        insertEmail();
    }
}
function selectEmails(){
    $.ajax({
        url: ip + '/declaraciones/monitor/getMonitorEmailEnvio',
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        var tabla="<tr><th>Nombre</th><th>Apellido Paterno</th><th>Apellido Materno</th><th>Correo Electronico</th> <th>Seleccionar</th></tr>";
        for(var i=0;i<Object.keys(datos.result.data).length;i++){
            tabla=tabla + "<tr><td>" + datos.result.data[i]['nombre_envio'] + "</td> <td>"
                                        + datos.result.data[i]['apat_envio'] + "</td> <td>"
                                        + datos.result.data[i]['amat_envio'] + "</td> <td>"
                                        + datos.result.data[i]['correo_envio'] + "</td> <td><input type='radio' name='opCorreo' id='correo"+i+"' value='"
                                        + datos.result.data[i]['id'] + "'></td> </tr>"
        }
        document.getElementById('contenido').innerHTML=tabla;
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    }); 
}
function insertEmail(){
    if($('#nombres').val()!='' && $('#apellido1').val()!='' && $('#apellido2').val()!='' && $('#correo').val()!=''){
        $.ajax({
            url: ip + '/declaraciones/monitor/insertMonitorEmailEnvio',
            type: "POST",
            contentType: "application/json",
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            },
        data: JSON.stringify({ 
                    "nombre_envio":$('#nombres').val(),
                    "apat_envio":$('#apellido1').val(),
                    "amat_envio":$('#apellido2').val(),
                    "correo_envio":$('#correo').val()    
                })
        }).done(function(data){
            alert(data.msg);
            location.reload();
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        }); 
        }else{
            alert('Llene todos los campos'); 
        }
}
function selectEmailById(){
    var nFilas = $("#tablaCorreos tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#correo'+i;
        if($(id).is(':checked')){
            idCurriculum=$(id).val();
        }
    }

    $.ajax({
        url: ip + '/declaraciones/monitor/getMonitorEmailEnvioById?id=' + idCurriculum,
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        $('#nombres').val(datos.result.data.nombre_envio);
        $('#apellido1').val(datos.result.data.apat_envio);
        $('#apellido2').val(datos.result.data.amat_envio);
        $('#correo').val(datos.result.data.correo_envio);
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    }); 
    actualizarEmail=true;
}
function updateEmail(){
    var nFilas = $("#tablaCorreos tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#correo'+i;
        if($(id).is(':checked')){
            idCurriculum=$(id).val();
        }
    }
    if($('#nombres').val()!='' && $('#apellido1').val()!='' && $('#apellido2').val()!='' && $('#correo').val()!=''){
        $.ajax({
            url: ip + '/declaraciones/monitor/updateMonitorEmailEnvio',
            type: "POST",
            contentType: "application/json",
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            },
        data: JSON.stringify({ 
                    "id":idCurriculum,
                    "nombre_envio":$('#nombres').val(),
                    "apat_envio":$('#apellido1').val(),
                    "amat_envio":$('#apellido2').val(),
                    "correo_envio":$('#correo').val()      
                })
        }).done(function(data){
            alert(data.msg);
            location.reload();
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        }); 
    }else{
        alert('Llene todos los campos'); 
    }
}
function deleteEmail(){
    var nFilas = $("#tablaCorreos tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#correo'+i;
        if($(id).is(':checked')){
            idCurriculum=$(id).val();
        }
    }
    $.ajax({
        url: ip + '/declaraciones/monitor/deleteMonitorEmailEnvio?id='+idCurriculum,
        type: "GET",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        alert(datos.msg);
        location.reload();
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
}

////////////////////////// EXTRAS //////////////////////////
function mostrarFecha(){
    var estado = $('#tipoDeclaracion').val();
    if (estado == '3') {
        $('#contFecha').show();
        $("#fecFinal").datepicker( "setDate" , new Date());
    } else{
        $('#contFecha').hide();
    }
}

function mostrarFormulario(){
    if($('input:radio[name=op]').is(':checked')){
        if(confirm('¿Desea descartar sus cambios?')){
            document.getElementById("nuevoDeclarante").reset();
            actualizar=false;
            $('#nuevoDeclarante').show();
        }
    }else{
        $('#nuevoDeclarante').show();
    }
}

function mostrarModal(){
    if($('input:radio[name=op]').is(':checked')){
        $('#myModal').modal("show");
        $('#tipoDeclaracion').val('1');
        $('#tipoDeclaracion').show();
        $('#labelTipoDeclaracion').show();
        $('#contFecha').hide();
        $('#activarDeclaracion').text('Activar');
        $('#tituloModal').text('Activar Declaración');
    }else{
        alert('No se ha seleccionado ninguna opción.')
    }
}

function mostrarModalEditar(){
    if($('input:radio[name=op]').is(':checked')){
        $('#myModalEditar').modal("show");
    }else{
        alert('No se ha seleccionado ninguna opción.')
    }
}

function mostrarModalBaja(){
    if($('input:radio[name=op]').is(':checked')){
        $('#myModalBaja').modal("show");
    }else{
        alert('No se ha seleccionado ninguna opción.')
    }
}

function abrirModal(){
    if($('input:radio[name=declarante]').is(':checked')){
        $('#myModal').modal("show");
    }else{
        alert('No se ha seleccionado ninguna opción.')
    }
}
////////////////////////// Insertar Encargo Actual //////////////////////////
function insertarEmpleo(id){
    var lugar=$('input:radio[name=lugar]:checked').val();
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
    }else{
        colonia=$("#colonia").val();
        tipoVia=$("#tipoVia").val();
        nombreVia=$("#nombreVia").val();
        cp=$("#cp").val();
        noExt=$("#numExterior").val();
        noInt=$("#numInterior").val();
    }
    $.ajax({
        url: ip + '/declaraciones/declarante/insertDeclaranteEncargoActual',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
        data: JSON.stringify({ 
                    "id_declarante": id,
                    "tipo_declaracion": 1,
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
                    "entidad_domicilio":  $("#entidadFed").val(),
                    "municipio_domicilio":  $("#municipio").val(),
                    "pais_domicilio":  lugar,
                    "colonia_domicilio": colonia,
                    "tipo_via": tipoVia,
                    "nombre_via":  nombreVia,
                    "cp_domicilio":  cp,
                    "no_exterior_domicilio": noExt,
                    "no_interior_domicilio": noInt,
                    "ciudad_domicilio_extranjero":  $("#municipioExt").val(),
                    "entidad_domicilio_extranjero":  $("#entidadExt").val(),
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
            location.reload();
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
////////////////////////// Update Empleo Actual //////////////////////////
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
        url: ip + '/declaraciones/declarante/updateDeclaranteEncargoActual',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
        data: JSON.stringify({ 
                    "id": sessionStorage.getItem("idEmpleo"),
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
            location.reload();
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
////////////////////////// Select Empleo Actual //////////////////////////
function selectEmpleo(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#cv'+i;
        if($(id).is(':checked')){
            idCurriculum=$(id).val();
        }
    }

    $.ajax({
        url: ip + '/declaraciones/declarante/selectDeclaranteEncargoActualByID?tipo_declaracion='+ $("#tipoDecEditar").val() +'&id_declarador='+idCurriculum+'&id=',
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
        }).done(function(datos){
            if(datos.status){
                actualizar=true;
                sessionStorage.setItem("idEmpleo",datos.result.data.id);
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
        
            } else{
                alert(datos.msg);
                location.reload();
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}

////////////////////////// Funciones para completar datos //////////////////////////
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


var idUser;
var password;
var token;
var actualizar=false;
var actualizarEnte=false;
var actualizarEmail=false;

var ip=sessionStorage.getItem("ip");
var ente=null
var idEmpleo=0;
var idUpdate=null,rfcUpdate=null;

////////////////////////// Activar Declaracion //////////////////////////
function activarDeclaracion(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#cv'+i;
        if($(id).is(':checked')){
            var id_declarador=$(id).val();
        }
    }
    $.ajax({
        url: ip + '/declaraciones/declarante/activateControlDeclarante?tipo_declaracion='+ $("#tipoDeclaracion").val() + '&id_declarador=' + id_declarador+'&fecha_finalizacion='+$("#fecFinal").val(),
        type: 'GET', 
        dataType: 'json',
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
    }).done(function(data){
        $('#myModal').modal("hide");
        alert(data.msg);
        location.reload();
    }).fail( function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.responseJSON.msg);
    });
}

////////////////////////// Buscar Funcionario Publico //////////////////////////
function buscarFuncionario(){
    var rfc = document.getElementById("buscar").value.toUpperCase();
    var expreg = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])([A-Z0-9]{3}))$/;
    if(!expreg.test(rfc)){
        alert("La RFC es incorrecta");
    }else{
        $.ajax({
            url: ip + '/declaraciones/declarante/selectDeclaranteByRFC?rfc='+rfc,
            type: 'GET', 
            dataType: 'json',
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            },
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
                $("#mailInstitucion").val(datos.result.data.correo_electronico_lab);
                $("#mailPersonal").val(datos.result.data.correo_electronico_per);
                idUpdate=datos.result.data.id;
                rfcUpdate=datos.result.data.rfc+datos.result.data.rfc_homoclave;
            }else{
                alert(datos.msg);
            }
        }).fail( function(jqXHR, textStatus, errorThrown){
        });
    }
}

////////////////////////// Actualizar Ente Publico //////////////////////////
function actualizarEntePublico(){
    $.ajax({
        url: ip + '/declaraciones/declarante/updateDeclaradorEntePublico', 
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
        data: JSON.stringify({ 
            "id": idUpdate,
            "nombres":$('#nombres').val(),
            "apellido_paterno":$('#apellido1').val(),
            "apellido_materno":$('#apellido2').val(),
            "rfc":$('#rfc').val(),
            "rfc_homoclave": $('#homoclave').val(),
            "curp":$('#curp').val(),
            "ente_publico":$('#entePublico').val(),
            "correo_electronico_lab":$('#mailInstitucion').val(),
            "correo_electronico_per":$('#mailPersonal').val(),
            "role": ""
        }),
    }).done(function(datos){
        alert(datos.msg);
        if(datos.status){
            insertarEmpleo(idUpdate);
        }else{
            location.reload();
        }
    }).fail( function(jqXHR, textStatus, errorThrown){
    });
}

////////////////////////// Notificacion de Cambio de Ente Publico //////////////////////////
function cambioEnte(){
    if($('input:radio[name=op]').is(':checked')){
        var nFilas = $("#tablaDeclarantes tr").length;
        for(var i=0;i<nFilas;i++){
            var id='#cv'+i;
            if($(id).is(':checked')){
                var id_declarador=$(id).val();
            }
        }
        if(confirm('Se enviara la notificación para realizar el cambio de ente público dentro del mismo nivel de gobierno.')){
            $.ajax({
                url: ip + '/declaraciones/declarante/notificaCambioEnteDeclarante?id_declarador='+id_declarador,
                type: 'GET', 
                dataType: 'json',
                headers: {
                    'X-Auth-Token' : sessionStorage.getItem("token")
                },
            }).done(function(datos){
                alert(datos.msg);
                location.reload();
            }).fail( function(jqXHR, textStatus, errorThrown){
            });
        }
    }else{
        alert('No se ha seleccionado ninguna opción.');
    } 
}

////////////////////////// Notificacion de Baja de Ente Publico ////////////////////////// 
function bajaEnte(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#cv'+i;
        if($(id).is(':checked')){
            var id_declarador=$(id).val();
        }
    }
    $.ajax({
        url: ip + '/declaraciones/declarante/notificaBajaEnteDeclarante?id_declarador='+id_declarador,
        type: 'GET', 
        dataType: 'json',
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
    }).done(function(datos){
        alert(datos.msg);
        location.reload();
    }).fail( function( jqXHR, textStatus, errorThrown){
        alert('Intentelo de nuevo');
    });
}
//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-*

function desactivarDeclaracion(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#declarante'+i;
        var id_declarante='#id_declarante'+i;
        if($(id).is(':checked')){
            var idDec=$(id_declarante).val();
        }
    }
    if(confirm("Al dar clic aquí la Declaracón Patriminial se desactivara.")){
        $.ajax({
            url: ip + '/declaraciones/declarante/desactivarControlDeclarante?id_declarante='+idDec,
            type: "GET",
            dataType: "json",
            headers: {
                'X-Auth-Token' : sessionStorage.getItem("token")
            }
        }).done(function(datos){
            alert(datos.msg);
            window.location.reload();
        }).fail( function( jqXHR, textStatus, errorThrown ){
            alert(jqXHR.responseJSON.msg);
        });
    }
}


function activateOrBaja(){
    if($('#activeConclusion').is(':checked')){
        activarDeclaracionConclusion();
    }else{
        bajaEnte();
    }
}


function activarDeclaracionConclusion(){
    var nFilas = $("#tablaDeclarantes tr").length;
    for(var i=0;i<nFilas;i++){
        var id='#cv'+i;
        if($(id).is(':checked')){
            var id_declarador=$(id).val();
        }
    }
    $.ajax({
        url: ip + '/declaraciones/declarante/activateControlDeclarante?tipo_declaracion=3' + '&id_declarador=' + id_declarador+'&fecha_finalizacion='+$("#fecFinalBaja").val(),
        type: 'GET', 
        dataType: 'json',
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
    }).done(function(data){
        $('#myModal').modal("hide");
        alert(data.msg);
        location.reload();
    }).fail( function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.responseJSON.msg);
    });
}




/////////////////////////////// prueba ////////////////////////////
function allStatus2(){
    if(sessionStorage.getItem("rol") == 'seseaadmin'){
        $('#envioEmail').show();
        $('#addEmail').show();
    }
    $.ajax({
        url: ip + '/declaraciones/monitor/getMonitorDeclaracionesV2',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
        data: JSON.stringify({
            "pageSize": 1000,
            "numberPage": 1,
            "tipo_declaracion": null,
            "tiempo_envio": null,
            "ente_publico": null
        })
    }).done(function(datos){
        var x = document.getElementById("numPag");
        var option;
        for(var i=0;i<datos.result.totalPage;i++){
            option = document.createElement("option");
            option.text = (i+1);
            option.value = (i+1);
             x.add(option); 
        }
        var tabla="";
        $tabla=$('#contenido');
        for(var i=0;i<Object.keys(datos.result.data).length;i++){
            var declaracion;
            if(datos.result.data[i]['tipo_declaracion']==1){
                declaracion='Inicial';
            }else if(datos.result.data[i]['tipo_declaracion']==2){
                declaracion='Modificación';
            }else{
                declaracion='Conclusión';
            }
            var url="";
            if(datos.result.data[i]['status']=='Enviada'){
                url=ip + '/declaraciones/public/publicDeclaracionReport?id_declarante=' + datos.result.data[i]['id_declarante'] + '&tipo_declaracion=' + datos.result.data[i]['tipo_declaracion'] + '&id_declarador=' + datos.result.data[i]['id'];
            }
            tabla=tabla + "<tr><td>" + datos.result.data[i]['nombres'] + " "  + datos.result.data[i]['apellido_paterno'] + " " + datos.result.data[i]['apellido_materno'] + "</td> <td>" 
            + datos.result.data[i]['rfc'] + "</td> <td>"
            + datos.result.data[i]['anio_fiscal'] + "</td> <td>"
            +"<input id='c"+i+"' style='display: none' value='"+datos.result.data[i]['tipo_declaracion'] + "'>" + declaracion + "</td> <td>"
            + datos.result.data[i]['status'] + "</td> <td>"
            + datos.result.data[i]['tiempo_envio'] + "</td> <td>"
            + datos.result.data[i]['aprobacion_fiscal'] + "</td> <td><input type='radio' name='declarante' id='declarante"+i+"' value='"
            + datos.result.data[i]['id'] + "'></td> <td style='display: none'>" +"<input id='id_declarante"+i+"' value='"+datos.result.data[i]['id_declarante'] + "'>"
            + datos.result.data[i]['curp'] + "</td><td style='display: none'>"
            + datos.result.data[i]['area_adscripcion'] + "</td><td style='display: none'>"
            + datos.result.data[i]['nivel_encargo'] + "</td><td style='display: none'>"
            + datos.result.data[i]['cargo_comision'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_alta'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_baja'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_enviada'] + "</td><td style='display: none'>"
            + datos.result.data[i]['activo_inactivo'] + "</td><td style='display: none'>"
            + url +"</td> </tr>"
        }
        //document.getElementById('contenido').innerHTML=tabla;
        $tabla.html(tabla);
        reporteExcel()
    }).fail( function(jqXHR, textStatus, errorThrown){
        alert(jqXHR.responseJSON.msg);
    }); 
}

function verStatus2(pag){
    var ente=$('#entePublico').val();
    var tipo=$('#tipoDeDeclaracion').val();
    var tiempo=$('#tiempoEnvio').val();

    var numeroPagina=$('#numPag').val();
    if(pag>0){
        numeroPagina=1;
    }
    var selector = document.getElementById('numPag');
    var selTam=selector.options.length;
    for (var j = selTam-1; j >-1 ; j--) {
        selector.options[j]=null;
    }
    document.getElementById('contenido').innerHTML="";
    $.ajax({
        url: ip + '/declaraciones/monitor/getMonitorDeclaracionesV2',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        },
        data: JSON.stringify({
            "pageSize": $('#tamPag').val(),
            "numberPage": numeroPagina,
            "tipo_declaracion": tipo,
            "tiempo_envio": tiempo,
            "ente_publico": ente
        })
    }).done(function(datos){
        var x = document.getElementById("numPag");
        var option;
        for(var i=0;i<datos.result.totalPage;i++){
            option = document.createElement("option");
            option.text = (i+1);
            option.value = (i+1);
            if(numeroPagina==option.value){
                option.selected=true;
            }
            x.add(option); 
        }
        var tabla="";
        $tabla=$('#contenido');
        for(var i=0;i<Object.keys(datos.result.data).length;i++){
            var declaracion;
            if(datos.result.data[i]['tipo_declaracion']==1){
                declaracion='Inicial';
            }else if(datos.result.data[i]['tipo_declaracion']==2){
                declaracion='Modificación';
            }else{
                declaracion='Conclusión';
            }
            var url="";
            if(datos.result.data[i]['status']=='Enviada'){
                url=ip + '/declaraciones/public/publicDeclaracionReport?id_declarante=' + datos.result.data[i]['id_declarante'] + '&tipo_declaracion=' + datos.result.data[i]['tipo_declaracion'] + '&id_declarador=' + datos.result.data[i]['id'];
            }
            tabla=tabla + "<tr><td>" + datos.result.data[i]['nombres'] + " "  + datos.result.data[i]['apellido_paterno'] + " " + datos.result.data[i]['apellido_materno'] + "</td> <td>" 
            + datos.result.data[i]['rfc'] + "</td> <td>"
            + datos.result.data[i]['anio_fiscal'] + "</td> <td>"
            +"<input id='c"+i+"' style='display: none' value='"+datos.result.data[i]['tipo_declaracion'] + "'>" + declaracion + "</td> <td>"
            + datos.result.data[i]['status'] + "</td> <td>"
            + datos.result.data[i]['tiempo_envio'] + "</td> <td>"
            + datos.result.data[i]['aprobacion_fiscal'] + "</td> <td><input type='radio' name='declarante' id='declarante"+i+"' value='"
            + datos.result.data[i]['id'] + "'></td> <td style='display: none'>" +"<input id='id_declarante"+i+"' value='"+datos.result.data[i]['id_declarante'] + "'>"
            + datos.result.data[i]['curp'] + "</td><td style='display: none'>"
            + datos.result.data[i]['area_adscripcion'] + "</td><td style='display: none'>"
            + datos.result.data[i]['nivel_encargo'] + "</td><td style='display: none'>"
            + datos.result.data[i]['cargo_comision'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_alta'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_baja'] + "</td><td style='display: none'>"
            + datos.result.data[i]['fecha_enviada'] + "</td><td style='display: none'>"
            + datos.result.data[i]['activo_inactivo'] + "</td><td style='display: none'>"
            + url +"</td> </tr>"
        }
        $tabla.html(tabla);
        resetReportExcel();
    }).fail( function( jqXHR, textStatus, errorThrown ){
        alert(jqXHR.responseJSON.msg);
    }); 
}