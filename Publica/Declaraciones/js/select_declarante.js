function selectDeclarante(){
    $.ajax({
        url: ip + '/declaraciones/public/selectDeclarante?id_declarador='+ id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var servAnt='No';
                if(datos.result.data[0].serv_publico_anterior){
                    servAnt='Si'
                }
                document.getElementById('nacionalidad').innerHTML=datos.result.data[0].nacionalidad;
                document.getElementById('servidorAnterior').innerHTML=servAnt;
                document.getElementById('estado_civil').innerHTML=datos.result.data[0].estado_civil;
                document.getElementById('regimen_matrimonial').innerHTML=datos.result.data[0].regimen_matrimonial;
        } else{
            alert(datos.msg);
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
} 

function selectDatosConyuge(){
    
    $.ajax({
        url: ip + '/declaraciones/public/selectDeclaranteConyuge?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    var dependiente='No', proveedor='No';
                    if(datos.result.data[i].ingresos_propios){
                        dependiente='Si'
                    }
                    if(datos.result.data[i].proveedor_gobierno){
                        proveedor='Si'
                    }
                    contenidos=contenidos +
                    '<div class="form-group">'+
                    '<h4 id="tiempo_encargo" style="padding: 0; text-align: left">'+datos.result.data[i].tipo_relacion+'</h4><br>'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-6">'+
                            '<label>Sector/Industria</label><br>'+
                            '<h4 id="sector_industria" style="margin: 0">'+ datos.result.data[i].id_sector_industria +'</h4>'+
                            '<br><br>'+
                            '<label>¿Es dependiente económico?</label><br>'+
                            '<h4 id="interes_sector" style="margin: 0">'+ dependiente +'</h4>'+
                        '</div>'+
                        ' <div class="col-md-5">'+
                            '<label>Proveedor o contratista de gobierno</label><br>'+
                            '<h4 id="proveedor_gobierno" style="margin: 0">'+ proveedor +'</h4>'+
                            ' <br><br>'+
                        '</div>'+
                        '</div><br><hr class="separador"><br>'
                }
                document.getElementById('contenido').innerHTML=contenidos;
        } else{
            alert(datos.msg);
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
    
} 

function selectDatosDependiente(){
    
    $.ajax({
        url: ip + '/declaraciones/public/selectDeclaranteDependiente?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    var proveedor='No';
                    if(datos.result.data[i].proveedor_gobierno){
                        proveedor='Si'
                    }
                    contenidos=contenidos +
                    '<div class="form-group">'+
                    '<h4 id="tiempo_encargo" style="padding: 0; text-align: left">'+datos.result.data[i].tipo_relacion+'</h4><br>'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-6">'+
                            '<label>Sector/Industria</label><br>'+
                            '<h4 id="sector_industria" style="margin: 0">'+ datos.result.data[i].id_sector_industria +'</h4>'+
                            '<br><br>'+
                        '</div>'+
                        ' <div class="col-md-5">'+
                            '<label>Proveedor o contratista de gobierno</label><br>'+
                            '<h4 id="proveedor_gobierno" style="margin: 0">'+ proveedor +'</h4>'+
                            ' <br><br>'+
                        '</div>'+
                        '</div><br><hr class="separador"><br>'
                }
                document.getElementById('contenido').innerHTML=contenidos;
        } else{
            alert(datos.msg);
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
    
} 


function selectDatosCurriculares(){
   
    $.ajax({
        url: ip + '/declaraciones/public/selectDeclaranteCurriculo?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
        if(datos.status){
            var contenidos=' ';
            for(var i=0;i<Object.keys(datos.result.data).length;i++){
                contenidos=contenidos + ' <div class="form-group"> '+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-10">'+
                        '<h2  style="padding: 0;text-align: left">'+datos.result.data[i].institucion_educativa+'</h2>'+
                    '</div>'+
                '</div>'+
                '<div class="form-group">' +
                '<div class="col-md-1"></div>'+
                    '<div class="col-md-5">'+
                        '<label>Nivel</label><br>'+
                        '<h4 style="margin: 0">'+datos.result.data[i].nivel_curricular+'</h4>'+
                    '</div>'
                    if(datos.result.data[i].especialidad != null &&  datos.result.data[i].especialidad != ""){
                        contenidos=contenidos + '<div class="col-md-5">'+
                            '<label>Especialidad</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].especialidad+'</h4>'+
                        '</div>'
                    }
                contenidos=contenidos + '</div><hr>'+
                '<div class="form-group">' +
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-5">'+
                        '<label>Documento obtenido</label><br>'+
                        '<h4  style="margin: 0">'+datos.result.data[i].documento_avala+'</h4>'+
                    '</div>'+
                    '<div class="col-md-5">'+
                        '<label>Fecha de conclusión</label><br>'+
                        '<h4 style="margin: 0"> '+datos.result.data[i].fecha_obtencion_doc+'</h4>'+
                    '</div>'+
                '</div><hr>'+
                '<div class="form-group"> '+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-5">'+
                        '<label>Estatus</label><br>'+
                        '<h4  style="margin: 0">'+datos.result.data[i].estatus+'</h4>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        ' <label>Ubicación de la Institución</label><br>'+
                        ' <h4 style="margin: 0"> '+datos.result.data[i].ubicacion_institucion+' </h4>'+
                    '</div>'+
                '</div><br><hr class="separador"><br>'
            }
            document.getElementById('contenido').innerHTML=contenidos;
            alturaMenu($('#contentSon').height());
        }else{
            alert(datos.msg);
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
    
} 

function selectCargoActual(){
   
    $.ajax({
        url: ip +'/declaraciones/public/selectDeclaranteEncargoActual?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                var contrato='No';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    var estado=datos.result.data[i].entidad_domicilio, municipio=datos.result.data[i].municipio_domicilio;
                    if(datos.result.data[i].contrato_honorarios){
                        contrato='Si'
                    }
                    if(datos.result.data[i].pais_ubicacion!='MEXICO'){
                        estado=datos.result.data[i].entidad_domicilio_extranjero;
                        municipio=datos.result.data[i].ciudad_domicilio_extranjero;
                    }
                    contenidos=contenidos + '<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-10">'+
                            '<h2  style="padding: 0;text-align: left">'+datos.result.data[i].cargo_comision+'</h2>'+
                        '</div>'+
                    '</div>'+
                    '<div class="form-group">' +
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-4">'+
                            '<label>Nivel / orden de gobierno</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].nivel+'</h4>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>Poder público</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].poder+'</h4>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Contrato por honorarios</label><br>'+
                            '<h4 style="margin: 0">'+contrato+'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group">' +
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-10">'+
                            '<label>Nombre del ente público</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].ente_publico+'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-6">'+
                            '<label>Area de adscripción</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].area_adscripcion+'</h4>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Nivel del empleo</label><br>'+
                            '<h4  style="margin: 0">'+datos.result.data[i].nivel_encargo+'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group">' +
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-10">'+
                            ' <label>Funciones principales</label><br>'+
                            ' <h4 style="margin: 0">'+datos.result.data[i].funciones_principales+'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-5">'+
                            '<label>Fecha de toma de posesión</label><br>'+
                            '<h4  style="margin: 0">'+datos.result.data[i].fecha_posesion+'</h4>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Teléfono de oficina y extensión</label><br>'+
                            '<h4  style="margin: 0">'+datos.result.data[i].tel_oficina +'-'+ datos.result.data[i].ext_tel_oficina+'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-5">'+
                            '<h4  style="margin: 0">Domicilio del empleo</h4>'+
                            '<br>'+
                            '<label>País</label><br>'+
                            '<h4  style="margin: 0">'+datos.result.data[i].pais_ubicacion +'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-5">'+
                            '<label>Estado</label><br>'+
                            '<h4  style="margin: 0">'+estado +'</h4>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Municipio / Ciudad</label><br>'+
                            '<h4  style="margin: 0">'+municipio +'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-5">'+
                            '<label>Colonia</label><br>'+
                            '<h4  style="margin: 0">'+datos.result.data[i].colonia_domicilio +'</h4>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Calle</label><br>'+
                            '<h4  style="margin: 0">'+datos.result.data[i].nombre_via +'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Código postal</label><br>'+
                            '<h4  style="margin: 0">'+datos.result.data[i].cp_domicilio +'</h4>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Número exterior</label><br>'+
                            '<h4  style="margin: 0">'+datos.result.data[i].no_exterior_domicilio +'</h4>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Número interior</label><br>'+
                            '<h4  style="margin: 0">'+datos.result.data[i].no_interior_domicilio +'</h4>'+
                        '</div>'+
                    '</div><br><hr class="separador"><br>'
                }
                document.getElementById('contenido').innerHTML=contenidos;
                alturaMenu($('#contentSon').height());
        } else{
            alert(datos.msg);
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
    
} 

function selectExperienciaLaboral(){
    
    $.ajax({
        url: ip + '/declaraciones/public/selectDeclaranteExperienciaLaboral?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    contenidos=contenidos + ' <div class="form-group">'+
                        '<h4 id="tiempo_encargo" style="padding: 0;text-align: left">de '+datos.result.data[i].fecha_ingreso +' a '+datos.result.data[i].fecha_salida+'</h4><br>'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-7">'+
                            '<h2 id="puesto" style="padding: 0; text-align: left">'+datos.result.data[i].cargo_puesto+'</h2>'+
                        '</div>'+
                    '</div><hr>'
                    if(datos.result.data[i].ambito=='PUBLICO'){
                        contenidos=contenidos + '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                            '<div class="col-md-5">'+
                                '<label>Nivel de gobierno</label><br>'+
                                '<h4 id="nivel_gobierno" style="margin: 0">'+datos.result.data[i].nivel+'</h4>'+
                            '</div>'+
                            '<div class="col-md-5">'+
                                '<label>Poder</label><br>'+
                                '<h4 id="poder" style="margin: 0">'+datos.result.data[i].poder+'</h4>'+
                            '</div>'+
                        '</div><hr>'
                    }
                    contenidos=contenidos +'<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-5">'+
                            '<label>Nombre del ente público o empresa</label><br>'+
                            '<h4 id="institucion" style="margin: 0">'+datos.result.data[i].nombre_institucion+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-5">'+  
                            '<label>Área de adscripción</label><br>'+
                            '<h4 id="unidad_administrativa" style="margin: 0">'+datos.result.data[i].unidad_administrativa+'</h4>'+
                        '</div>'+
                    '</div><hr>'
                    if(datos.result.data[i].ambito=='PUBLICO'){
                        contenidos=contenidos +'<div class="form-group"> '+
                            '<div class="col-md-1"></div>'+
                            '<div class="col-md-10">'+
                                '<label>Funciones principales</label><br>'+
                                '<h4 id="institucion" style="margin: 0">'+datos.result.data[i].funciones_principales+'</h4><br>'+
                            '</div>'+
                        '</div><hr>'
                    }else{
                        contenidos=contenidos +'<div class="form-group">'+
                            '<div class="col-md-1"></div>'+
                            '<div class="col-md-5">'+
                                '<label>RFC</label><br>'+
                                '<h4 id="institucion" style="margin: 0">'+datos.result.data[i].rfc+'</h4><br>'+
                            '</div>'+
                            '<div class="col-md-5">'+  
                                '<label>Sector / Industria</label><br>'+
                                '<h4 id="unidad_administrativa" style="margin: 0">'+datos.result.data[i].sector_industria+'</h4>'+
                            '</div>'+
                        '</div><hr>'
                    }
                    contenidos=contenidos +'<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-5">'+    
                            '<label>Lugar donde se ubica</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].pais_domicilio+'</h4>'+
                        '</div>'+
                    '</div><br><hr class="separador"><br>'
                }
                document.getElementById('contenido').innerHTML=contenidos;
                alturaMenu($('#contentSon').height());
       } else{
            alert(datos.msg);
        }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
    
} 

var id=sessionStorage.getItem("id");
var ip=sessionStorage.getItem("ip");
var td=sessionStorage.getItem("tipo_declaracion");