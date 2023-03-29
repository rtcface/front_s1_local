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
        if(data.status && data.result.role=='user'){
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
                        window.location.href='constancia_fiscal.html'; 
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
                    window.location.href='constancia_fiscal.html'; 
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

function sesionI(){
    var entrar=sessionStorage.getItem("sesion");
    if(entrar==false || entrar==null){
        window.location.href='index.html';  
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
        window.location.href='../../index.html';
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        
    });
    
}


var idUser;
var password;
var token;
var actualizar=false;
var actualizarEnte=false;
var actualizarEmail=false;

sessionStorage.setItem("ip",host);
var ip=sessionStorage.getItem("ip");
var ente=null
var idEmpleo=0;
var idUpdate=null,rfcUpdate=null;

function revisarCheck(){
    if($("input:checkbox[name=habilita_fiscal]").is(':checked')){
        $("input:checkbox[name=habilita_fiscal]").removeAttr("disabled");
        $("input:checkbox[name=no_habilita_fiscal]").attr("disabled", true);
        $("#cargaFile").removeAttr("disabled");
    }else if($("input:checkbox[name=no_habilita_fiscal]").is(':checked')){
        $("input:checkbox[name=habilita_fiscal]").attr("disabled", true);
        $("input:checkbox[name=no_habilita_fiscal]").removeAttr("disabled");
        $("#cargaFile").attr("disabled", true);
    }else if(!$("input:checkbox[name=no_habilita_fiscal]").is(':checked') && !$("input:checkbox[name=habilita_fiscal]").is(':checked')){
        $("input:checkbox[name=habilita_fiscal]").removeAttr("disabled");
        $("input:checkbox[name=no_habilita_fiscal]").removeAttr("disabled");
        $("#cargaFile").attr("disabled", true);
    }
}

function cargarArchivo(){
    var paqueteDeDatos = new FormData();
    paqueteDeDatos.append('file', $('#cargaFile')[0].files[0]);
    paqueteDeDatos.append('properties', new Blob([JSON.stringify({
        "ingresos_mayores4":$("#habilitado1").is(':checked'),
        "mas_2patrones_anio":$("#habilitado2").is(':checked'),
        "fin_serv_anio_ant":$("#habilitado3").is(':checked'),
        "serv_no_retencion":$("#habilitado4").is(':checked'),
        "otros_ing_acumilados":$("#habilitado5").is(':checked'),
        "ing_jubilacion_otros":$("#habilitado6").is(':checked'),
     
        "ing_1ente_con_cfdi":$("#deshabilitado1").is(':checked'),
        "ing_salarios_int_nominal":$("#deshabilitado2").is(':checked')
    })], {
        type: "application/json"
    }));
    
        $.ajax({
            url: ip + '/declaraciones/decFiscal/uploadDecFiscal',
            type: 'POST', 
            data: paqueteDeDatos,
            cache: false,
            contentType: false,
            processData: false,
            headers: {
                'X-Auth-Token' :  sessionStorage.getItem("token")
            }
        }).done(function(data,textStatus, xhr){
            alert(data.msg);
            constFiscalAplica(true)
            window.location.reload();
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert("Error al subir el archivo.");
        }); 
    
}

function infoFiscal(){
    $.ajax({
        url: ip + '/declaraciones/decFiscal/getInfoDecFiscal',
        type: 'GET', 
        dataType: 'json',
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        if(datos.status){
            if(datos.result.data.ingresos_mayores4){
                document.getElementById('habilitado1').checked =true;
            }
            if(datos.result.data.mas_2patrones_anio){
                document.getElementById('habilitado2').checked =true;
            }
            if(datos.result.data.fin_serv_anio_ant){
                document.getElementById('habilitado3').checked =true;
            }
            if(datos.result.data.serv_no_retencion){
                document.getElementById('habilitado4').checked =true;
            }
            if(datos.result.data.otros_ing_acumilados){
                document.getElementById('habilitado5').checked =true;
            }
            if(datos.result.data.ing_jubilacion_otros){
                document.getElementById('habilitado6').checked =true;
            }
            if(datos.result.data.ing_1ente_con_cfdi){
                document.getElementById('deshabilitado1').checked =true;
            } 
            if(datos.result.data.ing_salarios_int_nominal){
                document.getElementById('deshabilitado2').checked =true;
            }
            if($("input:checkbox[name=habilita_fiscal]").is(':checked')){
                $("input:checkbox[name=habilita_fiscal]").removeAttr("disabled");
                $("input:checkbox[name=no_habilita_fiscal]").attr("disabled", true);
                $("#cargaFile").removeAttr("disabled");
            }else if($("input:checkbox[name=no_habilita_fiscal]").is(':checked')){
                $("input:checkbox[name=habilita_fiscal]").attr("disabled", true);
                $("input:checkbox[name=no_habilita_fiscal]").removeAttr("disabled");
                $("#cargaFile").attr("disabled", true);
            }else if(!$("input:checkbox[name=no_habilita_fiscal]").is(':checked') && !$("input:checkbox[name=habilita_fiscal]").is(':checked')){
                $("input:checkbox[name=habilita_fiscal]").removeAttr("disabled");
                $("input:checkbox[name=no_habilita_fiscal]").removeAttr("disabled");
                $("#cargaFile").attr("disabled", true);
            }
            var valida='';
            if(datos.result.data.activa && datos.result.data.aprobada){
                valida='Declaración Fiscal Válida'
            }
            if(!datos.result.data.activa){
                valida='Declaración Fiscal No Válida'
            }
            if(!datos.result.data.aprobada){
                valida='Declaración Fiscal Rechazada por el Organo Interno de Control'
            }
            document.getElementById('datos_archivo').innerHTML='<h5>Fecha: '+datos.result.data.fecha_alta+'<br>'+
                'Nombre del archivo: '+datos.result.data.nombre_archivo+'<br>'+valida+'</h5>'
        }else{
            alert(datos.result.msg);
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
    
}