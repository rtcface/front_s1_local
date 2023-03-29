function actualizarDatosGenerales(){
    var regimen="",amt=null;
    if($('#estadoCivil').val()=="CASADO (A)"){
        regimen=$('#regimenM').val();
    }
    if(regimen=='OTRO'){
        regimen=$('#otroRegimen').val();
    }
    if($('#segundoApellido').val() != ""){
        amt=$('#segundoApellido').val();
    }
    $.ajax({
        url: ip + '/declaraciones/declarante/updateDeclarante',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": 1,
                    'nombres': $('#nombre').val(),
                    'apellido_paterno': $('#primerApellido').val(),
                    'apellido_materno': amt,
                    'curp': $('#curp').val(),
                    'rfc': $('#rfc').val(),
                    'correo_electronico_lab': $('#emailInstituto').val(),
                    'correo_electronico_per': $('#emailPersonal').val(),
                    'tel_per': $('#telParticular').val(),
                    'tel_cel': $('#telCelular').val(),
                    'nacionalidad': $('#nacionalidad').val(),
                    'pais_nacimimiento': $('#paisNacimiento').val(),
                    "entidad_nacimiento": 0,
                    'estado_civil': $('#estadoCivil').val(),
                    'regimen_matrimonial': regimen,
                    "observaciones": $("#obsComentarios").val(),
                    "fecha_nacimiento": null,
                    "no_iden_oficial": "",
                    "fecha_declaracion": null,
                    "usuario_login": "",
                    "rfc_homoclave": $('#homoclave').val(),
                    "serv_publico_anterior": $('input:radio[name=desempeño]:checked').val()
                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoDatos').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarDomicilio(){
    var lugar=$('input:radio[name=lugar]:checked').val(),estado='',municipio='',estadoExt='',municipioExt='';
    var colonia='';
    var tipoVia='';
    var nombreVia='';
    var cp='';
    var noExt='';
    var noInt='';
 
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
        url: ip + '/declaraciones/declarante/updateDeclaranteDomicilio',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": sessionStorage.getItem("idDomicilio"),
                    "id_declarante": id_declarante,
                    "tipo_declaracion": tipoDeclaracion,
                    "entidad_domicilio":  estado,
                    "municipio_domicilio":  municipio,
                    "pais_domicilio":  lugar,
                    "colonia_domicilio": colonia,
                    "tipo_via_domicilio": tipoVia,
                    "nombre_via_domicilio":  nombreVia,
                    "cp_domicilio":  cp,
                    "no_exterior_domicilio": noExt,
                    "no_interior_domicilio": noInt,
                    "ciudad_domicilio_extranjero":  municipioExt,
                    "estado_domicilio_extranjero":  estadoExt,
                    "observaciones": $("#obsComentarios").val()
     
                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoDomicilio').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarDatosCurriculo(){
    var lugar=$('input:radio[name=lugar]:checked').val();
    if(lugar!='146'){
        lugar=$("#pais").val();
    }
    $.ajax({
        url: ip + '/declaraciones/declarante/updateDeclaranteCurriculo',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": idDeclaracion,
                    "tipo_declaracion": tipoDeclaracion,
                    "id_declarante": id_declarante,
                    "nivel_curricular": $("#nivelCurriculo").val(),
                    "institucion_educativa": $("#institucionEducativa").val(),
                    "ubicacion_institucion": lugar,
                    "entidad": '',
                    "municipio": '',
                    "especialidad": $("#carrera").val(),
                    "estatus": $("#estatus").val(),
                    "documento_avala": $("#docObtenido").val(),
                    "cedula": '',
                    "anio_fin": 0,
                    "ultimo_grado": $('#ultimoGrado').is(':checked'),
                    "observaciones": $("#obsComentarios").val(),
                    "fecha_obtencion_doc": document.getElementById('finalizado').value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1')
                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoCurriculo').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarEmpleo(){
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
        url: ip + '/declaraciones/declarante/updateDeclaranteOtroEncargoActual',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": idDeclaracion,
                    "tipo_declaracion":tipoDeclaracion,
                    "id_declarante": id_declarante,
                    "ente_publico": $("#entePublico").val(),
                    "cargo_comision": $("#nombreEmpleo").val(),
                    "nivel": $("#nivelGob").val(),
                    "poder": ambito,
                    "tipo_contrato": "",
                    "nivel_encargo": $("#nivelEncargo").val(),
                    "area_adscripcion": $("#areaAds").val(),
                    "funciones_principales": $("#funciones").val(),
                    "tel_oficina": $("#telOficina").val(),
                    "ext_tel_oficina": $("#extencion").val(),
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

                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoCargo').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarExpLaboral(){
    var lugar= $('input:radio[name=lugar]:checked').val();
    var ambito= $('#ambito').val(), rfc=null, funciones="", sector="", nivel="";
    var ambitoPublico='', empleo_actual=false, fechaSalida=null;
    if( $('#trabajo_actual')[0].checked==true ){
        empleo_actual=true;
    }else{
        fechaSalida=document.getElementById('fecSalida').value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1');
    }
    
    if(lugar!='146'){
        lugar=$("#pais").val();
    }if($("#ambito").val() == 'PRIVADO' || $("#ambito").val() =='OTRO'){
        rfc=$("#rfc").val();
        sector=$('input:radio[name=sectorIndustria]:checked').val();
    }else{
        funciones=$('#funciones').val();
        nivel=$('#nivelGob').val();
        if($("#nivelGob").val() == 'ESTATAL'){
            ambitoPublico=$('#poder').val();
        }
    }
    if(ambito=='OTRO'){
        ambito=$("#ambitoEsp").val();
    }
    $.ajax({
        url: ip + '/declaraciones/declarante/updateDeclaranteExperienciaLaboral',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": idDeclaracion,
                    "tipo_declaracion": tipoDeclaracion,
                    "ambito": ambito,
                    "nivel": nivel,
                    "poder": ambitoPublico,
                    "rfc": rfc,
                    "nombre_institucion": $('#nombreEnte').val(),
                    "unidad_administrativa": $('#area').val(),
                    "entidad_domicilio": "",
                    "municipio_domicilio": "",
                    "pais_domicilio": lugar,
                    "jerarquia_rango": "",
                    "cargo_puesto": $('#cargo').val(),
                    "fecha_ingreso": document.getElementById('fecIngreso').value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1'),
                    "fecha_salida": document.getElementById('fecSalida').value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1'),
                    "id_declarante": id_declarante,
                    "sector_industria": sector,
                    "funciones_principales": funciones,
                    "otro_sector_industria": $('#otroSector').val(),
                    "otro_funciones_principales": "",
                    "observaciones":  $('#obsComentarios').val(),
                    "empleo_actual":  empleo_actual  
                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoExperiencia').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarDatosParejaDependiente(pareja){
    var lugar=$('input:radio[name=lugar]:checked').val(),amt=null;
    var colonia='', tipoVia='', nombreVia='', cp='0', noExt='', noInt='',estado='',municipio='',estadoExt='',municipioExt='';
    var tipoRelacion=$("#tipoRelacion").val();
    var actividadLaboral=$("#ambito").val(), rfc=null, funciones="", sector="", nivel="", area="";
    var curp=null;
    var ambitoPublico='';
    
    if($('input:radio[name=extranjero]:checked').val()=="false"){
        curp=$("#curp").val();
    }
    if($('#segundoApellido').val() != ""){
        amt=$("#segundoApellido").val();
    }
    if(lugar=='extranjero'){
        lugar=$("#pais").val();
        colonia=$("#coloniaExt").val();
        tipoVia=$("#tipoViaExt").val();
        nombreVia=$("#nombreViaExt").val();
        cp=$("#cpExt").val();
        noExt=$("#numExteriorExt").val();
        noInt=$("#numInteriorExt").val();
        estadoExt=$("#entidadExt").val();
        municipioExt=$("#municipioExt").val();
    }else if(lugar=='146'){
        colonia=$("#colonia").val();
        tipoVia=$("#tipoVia").val();
        nombreVia=$("#nombreVia").val();
        cp=$("#cp").val();
        noExt=$("#numExterior").val();
        noInt=$("#numInterior").val();
        estado=$("#entidadFed").val();
        municipio=$("#municipio").val();
    }else if(lugar=='no_especifica'){
        lugar=null;
    }
    if(tipoRelacion=='OTRO'){
        tipoRelacion=$("#otroFam").val();
    }
    if($("#ambito").val() == 'PRIVADO' || $("#ambito").val() =='OTRO'){
        rfc=$("#rfcEmpresa").val();
        sector=$('input:radio[name=sectorIndustria]:checked').val();
    }else{
        funciones=$('#funciones').val();
        nivel=$('#nivelGob').val();
        if($("#nivelGob").val() == 'ESTATAL'){
            ambitoPublico=$('#poder').val();
        }
        area=$('#area').val();
    }
    if(actividadLaboral=='OTRO'){
        actividadLaboral=$("#ambitoEsp").val();
    }
    $.ajax({
        url: ip + '/declaraciones/declarante/updateDeclaranteConyugeDep',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": idDeclaracion,
                    "tipo_declaracion": tipoDeclaracion,
                    "tipo_relacion": tipoRelacion,
                    "nombres": $("#nombre").val(),
                    "apellido_paterno": $("#primerApellido").val(),
                    "apellido_materno": amt,
                    "nacionalidad": "",
                    "curp": curp,
                    "rfc": $("#rfc").val(),
                    "fecha_nacimiento": document.getElementById('fecNac').value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1'),
                    "no_identificacion": "",
                    "vive_con_declarante": $('input:radio[name=habita]:checked').val(),
                    "medio_contacto": "",
                    "ingresos_propios": $('input:radio[name=dependiente]:checked').val(),
                    "ocupacion_profesion": "",
                    "id_declarante": id_declarante,
                    "entidad_domicilio": estado,
                    "municipio_domicilio": municipio,
                    "pais_domicilio": lugar,
                    "cp_domicilio": cp,
                    "colonia_domicilio": colonia,
                    "tipo_via_domicilio": tipoVia,
                    "nombre_via_domicilio": nombreVia,
                    "no_exterior_domicilio": noExt,
                    "no_interior_domicilio": noInt,
                    "otro_sector_industria": $("#otroSector").val(),
                    "ciudadano_extranjero": $('input:radio[name=extranjero]:checked').val(),
                    "actividad_laboral": actividadLaboral,
                    "nivel": nivel,
                    "poder": ambitoPublico,
                    "nombre_institucion": $("#nombreEnte").val(),
                    "area_adscripcion": area,
                    "cargo_puesto": $("#cargo").val(),
                    "salario_mensual_neto": $("#salario").val(),
                    "fecha_ingreso": document.getElementById('fecIngreso').value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1'),
                    "funciones_principales": funciones,
                    "proveedor_gobierno": $('input:radio[name=proveedor]:checked').val(),
                    "id_sector_industria": sector,
                    "rfc_empresa": rfc,
                    "pareja_conyuge": pareja,
                    "ciudad_domicilio_extranjero": municipioExt,
                    "entidad_domicilio_extranjero": estadoExt,
                    "observaciones": $("#obsComentarios").val(),
                    "dependiente_economico": $('input:radio[name=dependiente]:checked').val()
                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    if(pareja){
                        window.parent.document.getElementById('semaforoPareja').style.color='#1EE164'
                    }else{
                        window.parent.document.getElementById('semaforoDependiente').style.color='#1EE164'
                    }
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}



function actualizarPrestamos(){
    var inmueble='',tipo_inmueble='',pais_domicilio='',entidad_domicilio='',municipio_domicilio='',cp_domicilio='',
    colonia_domicilio='',tipo_via_domicilio='',nombre_via_domicilio='',no_exterior_domicilio='',no_interior_domicilio='',
    ciudad_domicilio_extranjero='',entidad_domicilio_extranjero='',
    vehiculo='',tipo_vehiculo='',marca_vehiculo='',modelo_vehiculo='',anio_vehiculo='',no_serie_vehiculo='',pais_registro_vehiculo='',entidad_registro_vehiculo;
    var tipoRelacion=$("#tipoRelacion").val();
    var fisicaPro=false, moralPro=false;

    if($('input:radio[name=transmisor]:checked').val() == "fisica"){
        fisicaPro=true;
    }else{
        moralPro=true;
    }
    
    if(tipoRelacion=='OTRO'){
        tipoRelacion=$("#otroFam").val();
    }
    if($('input:radio[name=tipoBien]:checked').val()=='INMUEBLE'){
        inmueble=true;
        vehiculo=false;
        tipo_inmueble=$("#tipoInmueble").val();
        if(tipo_inmueble=='OTRO'){
            tipo_inmueble=$("#otroInmueble").val();
        }
        if($('input:radio[name=lugar]:checked').val()!='146'){
            pais_domicilio=$("#pais").val();
            entidad_domicilio_extranjero=$("#entidadExt").val();
            ciudad_domicilio_extranjero=$("#municipioExt").val();
            colonia_domicilio=$("#coloniaExt").val();
            tipo_via_domicilio=$("#tipoViaExt").val();
            nombre_via_domicilio=$("#nombreViaExt").val();
            cp_domicilio=$("#cpExt").val();
            no_exterior_domicilio=$("#numExteriorExt").val();
            no_interior_domicilio=$("#numInteriorExt").val();
        }else{
            pais_domicilio=$('input:radio[name=lugar]:checked').val();
            entidad_domicilio=$("#entidadFed").val();
            municipio_domicilio=$("#municipio").val();
            colonia_domicilio=$("#colonia").val();
            tipo_via_domicilio=$("#tipoVia").val();
            nombre_via_domicilio=$("#nombreVia").val();
            cp_domicilio=$("#cp").val();
            no_exterior_domicilio=$("#numExterior").val();
            no_interior_domicilio=$("#numInterior").val();
        }
    }else{
        inmueble=false;
        vehiculo=true;
        pais_registro_vehiculo=$('input:radio[name=registro]:checked').val();
        tipo_vehiculo=$("#tipoVehiculo").val();

        if(pais_registro_vehiculo == 'extranjero'){
            pais_registro_vehiculo=$("#pais2").val();
        }else{
            entidad_registro_vehiculo=$("#entidadFed2").val();
        }
        if(tipo_vehiculo=='OTRO'){
            tipo_vehiculo=$("#otroVehiculo").val();
        }
        marca_vehiculo=$('#marca').val();
        modelo_vehiculo=$('#modelo').val();
        anio_vehiculo=$('#anio').val();
        no_serie_vehiculo=$('#numeroSerie').val();
    }
    $.ajax({
        url: ip + '/declaraciones/pasivos/updatePasivosPrestamoComodato',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": idDeclaracion,
                    "id_declarante": id_declarante,
                    "tipo_declaracion": tipoDeclaracion,
                    "inmueble": inmueble,
                    "tipo_inmueble": tipo_inmueble,
                    "pais_domicilio": pais_domicilio,
                    "entidad_domicilio": entidad_domicilio,
                    "municipio_domicilio": municipio_domicilio,
                    "cp_domicilio": cp_domicilio,
                    "colonia_domicilio": colonia_domicilio,
                    "tipo_via_domicilio": tipo_via_domicilio,
                    "nombre_via_domicilio": nombre_via_domicilio,
                    "no_exterior_domicilio": no_exterior_domicilio,
                    "no_interior_domicilio": no_interior_domicilio,
                    "ciudad_domicilio_extranjero": ciudad_domicilio_extranjero,
                    "entidad_domicilio_extranjero": entidad_domicilio_extranjero,
                    "vehiculo": vehiculo,
                    "tipo_vehiculo": tipo_vehiculo,
                    "marca_vehiculo": marca_vehiculo,
                    "modelo_vehiculo": modelo_vehiculo,
                    "anio_vehiculo": anio_vehiculo,
                    "no_serie_vehiculo": no_serie_vehiculo,
                    "pais_registro_vehiculo": pais_registro_vehiculo,
                    "entidad_registro_vehiculo": entidad_registro_vehiculo,
                    "titular_vehiculo": $("#nombreTitular").val(),
                    "rfc_titular_vehiculo": $("#rfc").val(),
                    "relacion_titular": tipoRelacion,
                    "observaciones": $("#obsComentarios").val(),
                    "titular_fisica": fisicaPro,
                    "titular_moral": moralPro
                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoPrestamos').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarEmpresasSociedades(){
    var pais=$('input:radio[name=registro]:checked').val(), estado=$('#entidadFed').val(),
    declarante='', pareja='', dependiente_economico='';
    var monto=0;
    if($('input:radio[name=remuneracion]:checked').val()=="true"){
        monto=$('#monto').val();
    }
    if(pais!='146'){
        pais=$('#pais').val();
    }
    if($('input:radio[name=declarado]:checked').val()=='Declarante'){
        declarante=true;
        pareja=false;
        dependiente_economico=false;
    }else if($('input:radio[name=declarado]:checked').val()=='Pareja'){
        declarante=false;
        pareja=true;
        dependiente_economico=false;
    }else if($('input:radio[name=declarado]:checked').val()=='Dependiente económico'){
        declarante=false;
        pareja=false;
        dependiente_economico=true;
    }
    $.ajax({
        url: ip + '/declaraciones/intereses/updateInteresesEmpSoc',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": idDeclaracion,
                    "id_declarante": id_declarante,
                    "tipo_declaracion": tipoDeclaracion,
                    "nombre": $('#nombreEmpresa').val(),
                    "registro": "",
                    "rfc": $('#rfc').val(),
                    "entidad_domicilio": estado,
                    "pais_domicilio": pais,
                    "porcentaje_participacion": $('#porcentaje').val(),
                    "id_sector_industria": $('input:radio[name=sectorIndustria]:checked').val(),
                    "otro_sector_industria": $('#otroSector').val(),
                    "declarante": declarante,
                    "pareja": pareja,
                    "dependiente_economico": dependiente_economico,
                    "tipo_participacion": $('#tipoParticipacion').val(),
                    "otro_tipo_participacion": $('#otraPart').val(),
                    "recibe_remuneracion": $('input:radio[name=remuneracion]:checked').val(),
                    "observaciones": $('#obsComentarios').val(),
                    "monto_remuneracion": monto,
                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoEmpresas').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarInstituciones(){
    var pais=$('input:radio[name=registro]:checked').val(), estado=$('#entidadFed').val(),
    declarante='', pareja='', dependiente_economico='',tipoInstitucion=$('#tipoInstitucion').val();
    var monto=0;
    if($('input:radio[name=remuneracion]:checked').val()=="true"){
        monto=$('#monto').val();
    }
    if(pais!='146'){
        pais=$('#pais').val();
    }
    if($('input:radio[name=declarado]:checked').val()=='Declarante'){
        declarante=true;
        pareja=false;
        dependiente_economico=false;
    }else if($('input:radio[name=declarado]:checked').val()=='Pareja'){
        declarante=false;
        pareja=true;
        dependiente_economico=false;
    }else if($('input:radio[name=declarado]:checked').val()=='Dependiente económico'){
        declarante=false;
        pareja=false;
        dependiente_economico=true;
    }
    if(tipoInstitucion=='OTRO'){
        tipoInstitucion=$('#otraInst').val();
    }
    $.ajax({
        url: ip + '/declaraciones/intereses/updateInteresesInstituciones',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": idDeclaracion,
                    "tipo_declaracion": tipoDeclaracion,
                    "id_declarante": id_declarante,
                    "declarante": declarante,
                    "pareja": pareja,
                    "dependiente_economico": dependiente_economico,
                    "tipo_institucion": tipoInstitucion,
                    "nombre_institucion": $('#nombreInstitucion').val(),
                    "rfc": $('#rfc').val(),
                    "puesto_rol": $('#puesto').val(),
                    "fecha_inicio_part": document.getElementById('fechaInicio').value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1'),
                    "recibe_remuneracion": $('input:radio[name=remuneracion]:checked').val(),
                    "pais_ubicacion": pais,
                    "entidad_ubicacion": estado,
                    "observaciones": $('#obsComentarios').val(),
                    "monto_remuneracion": monto,
    
                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoInstituciones').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarApoyosBeneficios(){
    var beneficiario= $('#beneficiario').val(),tipoBeneficio= $('#tipoApoyo').val(), especie="";
    if($('input:radio[name=recepcion]:checked').val() == 'ESPECIE'){
        especie=$('#espApoyo').val();
    }
    if(beneficiario=='OTRO'){
        beneficiario=$('#otroFam').val();
    }
    if(tipoBeneficio=='OTRO'){
        tipoBeneficio=$('#otroApoyo').val();
    }
    $.ajax({
        url: ip + '/declaraciones/intereses/updateInteresesBeneficiosPublicos',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": idDeclaracion,
                    "tipo_declaracion": tipoDeclaracion,
                    "id_declarante": id_declarante,
                    "beneficiario": beneficiario,
                    "nombre_programa": $('#nombrePrograma').val(),
                    "nombre_otorgante": $('#institucion').val(),
                    "nivel": $('#nivelGob').val(),
                    "tipo_beneficio": tipoBeneficio,
                    "forma_beneficio": $('input:radio[name=recepcion]:checked').val(),
                    "monto_beneficio": $('#monto').val(),
                    "especifica_beneficio": especie,
                    "observaciones": $('#obsComentarios').val()
                    
                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoBeneficiosPublicos').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarRepresentacion(){
    var pais=$('input:radio[name=registro]:checked').val(), estado=$('#entidadFed').val(),
    declarante='', pareja='', dependiente_economico='';
    var monto=0;
    if($('input:radio[name=remuneracion]:checked').val()=="true"){
        monto=$('#monto').val();
    }
    var fisicaRep=false, moralRep=false;
    if($('input:radio[name=repr]:checked').val() == "fisica"){
        fisicaRep=true;
    }else{
        moralRep=true;
    } 
    if(pais!='146'){
        pais=$('#pais').val();
    }
    if($('input:radio[name=declarado]:checked').val()=='Declarante'){
        declarante=true;
        pareja=false;
        dependiente_economico=false;
    }else if($('input:radio[name=declarado]:checked').val()=='Pareja'){
        declarante=false;
        pareja=true;
        dependiente_economico=false;
    }else if($('input:radio[name=declarado]:checked').val()=='Dependiente económico'){
        declarante=false;
        pareja=false;
        dependiente_economico=true;
    }
    $.ajax({
        url: ip + '/declaraciones/intereses/updateInteresesRepresentacionActiva',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                "id": idDeclaracion,
                "tipo_declaracion": tipoDeclaracion,
                "id_declarante": id_declarante,
                "tipo_repreentacion": $('input:radio[name=representacion]:checked').val(),
                "nombre_representado": $('#nombreRazon').val(),
                "rfc_representado": $('#rfc').val(),
                "id_sector_industria": $('input:radio[name=sectorIndustria]:checked').val(),
                "otro_sector_industria": $('#otroSector').val(),
                "fecha_inicio": document.getElementById('fechaInicio').value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g,'$3/$2/$1'),
                "declarante": declarante,
                "pareja": pareja,
                "dependiente_economico": dependiente_economico,
                "recibe_remuneracion": $('input:radio[name=remuneracion]:checked').val(),
                "monto_representacion": monto,
                "pais_rep": pais,
                "entidad_rep": estado, 
                "observaciones": $('#obsComentarios').val(),
                "representado_fisica": fisicaRep,
                "representado_moral": moralRep
                
            })
    }).done(function(data){
        alert(data.msg);
        if(data.msg=='Sesión Expirada'){
            window.parent.location.href='../login.html'
        }else{
            if(confirm('¿Desea realizar otra modificación?')){
                window.parent.document.getElementById('semaforoRepresentacion').style.color='#1EE164'
                window.location.href='#tituloD';
                location.reload();
            }else{
                window.parent.location.reload();
            }
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
}
function actualizarClientesPrincipales(){
    var pais=$('input:radio[name=registro]:checked').val(), estado=$('#entidadFed').val(),
    declarante='', pareja='', dependiente_economico='';
    var fisicaRep=false, moralRep=false;
    if($('input:radio[name=client]:checked').val() == "fisica"){
        fisicaRep=true;
    }else{
        moralRep=true;
    } 

    if(pais!='146'){
        pais=$('#pais').val();
    }
    if($('input:radio[name=declarado]:checked').val()=='Declarante'){
        declarante=true;
        pareja=false;
        dependiente_economico=false;
    }else if($('input:radio[name=declarado]:checked').val()=='Pareja'){
        declarante=false;
        pareja=true;
        dependiente_economico=false;
    }else if($('input:radio[name=declarado]:checked').val()=='Dependiente económico'){
        declarante=false;
        pareja=false;
        dependiente_economico=true;
    }
$.ajax({
    url: ip + '/declaraciones/intereses/updateInteresesClientesPrincipales',
    type: "POST",
    contentType: "application/json",
    headers: {
        'X-Auth-Token' : token
    },
    data: JSON.stringify({ 
                "id": idDeclaracion,
                "tipo_declaracion": tipoDeclaracion,
                "actividad_lucrativa": $('input:radio[name=actividadLucrativa]:checked').val(),
                "declarante": declarante,
                "pareja": pareja,
                "dependiente_economico": dependiente_economico,
                "nombre_empresa": $('#nombreEmpresa').val(),
                "rfc_empresa": $('#rfc').val(),
                "nombre_cte_principal": $('#nombreCliente').val(),
                "rfc_cte_principal": $('#rfcCliente').val(),
                "ganancia_por_cte_principal": $('#monto').val(),
                "ciudad_domicilio_extranjero": estado,
                "pais_domicilio_extranjero": pais,
                "id_sector_industria": $('input:radio[name=sectorIndustria]:checked').val(),
                "otro_sector_industria": $('#otroSector').val(),
                "observaciones": $('#obsComentarios').val(),
                "cliente_fisica": fisicaRep,
                "cliente_moral": moralRep
                                
            })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoClientes').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarBeneficiosPrivados(){
    var tipoBeneficio=$('#tipoApoyo').val(), beneficiario=$('#beneficiario').val();
    var fisicaRep=false, moralRep=false, especie="";
    if($('input:radio[name=recepcion]:checked').val() == 'ESPECIE'){
        especie=$('#espApoyo').val();
    }
    if($('input:radio[name=otorgante]:checked').val() == "fisica"){
        fisicaRep=true;
    }else{
        moralRep=true;
    } 
    if(tipoBeneficio=='OTRO'){
        tipoBeneficio=$('#otroApoyo').val();
    }
    if(beneficiario=='OTRO'){
        beneficiario=$('#otroFam').val();
    }
    
    $.ajax({
        url: ip + '/declaraciones/intereses/updateInteresesBeneficiosPrivados',
        type: "POST",
        contentType: "application/json",
        headers: {
            'X-Auth-Token' : token
        },
        data: JSON.stringify({ 
                    "id": idDeclaracion,
                    "tipo_declaracion": tipoDeclaracion,
                    "id_declarante": id_declarante,
                    "tipo_beneficio": tipoBeneficio,
                    "beneficiario": beneficiario,
                    "nombre_otorgante": $('#nombreOtorgante').val(),
                    "rfc_otorgante": $('#rfc').val(),
                    "forma_beneficio": $('input:radio[name=recepcion]:checked').val(),
                    "especifica_beneficio": especie,
                    "monto": $('#monto').val(),
                    "moneda": $('#tipoMoneda').val(),
                    "sector_industria": $('input:radio[name=sectorIndustria]:checked').val(),
                    "otro_sector_industria": $('#otroSector').val(),
                    "observaciones": $('#obsComentarios').val(),
                    "otorgante_fisica": fisicaRep,
                    "otorgante_moral": moralRep
                })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoBeneficiosPrivados').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}
function actualizarFideicomisos(){
    var pais=$('input:radio[name=registro]:checked').val(), estado=$('#entidadFed').val(),
    declarante='', pareja='', dependiente_economico='';
    var fisicaCoo=false, moralCoo=false, fisicaPro=false, moralPro=false;

    if($('input:radio[name=personaFideicomitente]:checked').val() == "fisica"){
        fisicaCoo=true;
    }else{
        moralCoo=true;
    }
    if($('input:radio[name=personaFideicomisario]:checked').val() == "fisica"){
        fisicaPro=true;
    }else{
        moralPro=true;
    }

    if(pais!='146'){
        pais=$('#pais').val();
    }
    if($('input:radio[name=declarado]:checked').val()=='Declarante'){
        declarante=true;
        pareja=false;
        dependiente_economico=false;
    }else if($('input:radio[name=declarado]:checked').val()=='Pareja'){
        declarante=false;
        pareja=true;
        dependiente_economico=false;
    }else if($('input:radio[name=declarado]:checked').val()=='Dependiente económico'){
        declarante=false;
        pareja=false;
        dependiente_economico=true;
    }
$.ajax({
    url: ip + '/declaraciones/intereses/updateInteresesFideicomisos',
    type: "POST",
    contentType: "application/json",
    headers: {
        'X-Auth-Token' : token
    },
    data: JSON.stringify({ 
                "id": idDeclaracion,
                "tipo_declaracion": tipoDeclaracion,
                "id_declarante": id_declarante,
                "declarante": declarante,
                "pareja": pareja,
                "dependiente_economico": dependiente_economico,
                "tipo_fideicomiso": $('#tipoFideicomiso').val(),
                "tipo_participacion": $('#tipoParticipacion').val(),
                "rfc_fideicomiso": $('#rfcFideicomiso').val(),
                "nombre_fideicomitente": $('#nombreFideicomitente').val(),
                "rfc_fideicomitente": $('#rfcFideicomitente').val(),
                "nombre_fidiuciario": $('#nombreFiduciario').val(),
                "rfc_fidiuciario": $('#rfcFiduciario').val(),
                "nombre_fideicomisario": $('#nombreFideicomisario').val(),
                "rfc_fideicomisario": $('#rfcFideicomisario').val(),
                "id_sector_industria": $('input:radio[name=sectorIndustria]:checked').val(),
                "otro_sector_industria": $('#otroSector').val(),
                "pais_fideicomiso": pais,
                "estado_fideicomiso": estado,
                "observaciones": $('#obsComentarios').val(),
                "fideicomitente_fisica": fisicaCoo,
                "fideicomitente_moral": moralCoo,
                "fideicomisario_fisica": fisicaPro,
                "fideicomisario_moral": moralPro
               
            })
        }).done(function(data){
            alert(data.msg);
            if(data.msg=='Sesión Expirada'){
                window.parent.location.href='../login.html'
            }else{
                if(confirm('¿Desea realizar otra modificación?')){
                    window.parent.document.getElementById('semaforoFideicomisos').style.color='#1EE164'
                    window.location.href='#tituloD';
                    location.reload();
                }else{
                    window.parent.location.reload();
                }
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
        });
}

var ip=sessionStorage.getItem("ip");
var tipoDeclaracion=sessionStorage.getItem("tipoDec");
var id_declarante=sessionStorage.getItem("declaranteId");