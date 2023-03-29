function selectEmpresas(){
    $.ajax({
        url: ip + '/declaraciones/public/selectInteresesEmpSoc?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    var beneficiario='', recibeRemuneracion='No';
                    if(datos.result.data[i].declarante){
                        beneficiario='Declarante'
                    }else if(datos.result.data[i].pareja){
                        beneficiario='Pareja'
                    }else if(datos.result.data[i].dependiente_economico){
                        beneficiario='Dependiente económico'
                    }
                    if(datos.result.data[i].recibe_remuneracion){
                        recibeRemuneracion='Si';
                    }
                    contenidos=contenidos +
                        '<div class="form-group">'+
                            '<h4 style="padding: 0; text-align: left">'+beneficiario+'</h4><br>'+
                            '<div class="col-md-1"></div>'+
                            '<div class="col-md-6">'+
                                '<label>Nombre de la empresa, sociedad o asociación</label><br>'+
                                '<h4 id="nombre_empresa" style="margin: 0">'+datos.result.data[i].nombre+'</h4><br>'+
                            '</div>'+
                            '<div class="col-md-3">'+
                                '<label>RFC</label><br>'+
                                '<h4 id="rfc" style="margin: 0">'+datos.result.data[i].rfc+'</h4><br>'+
                            '</div>'+
                        '</div><hr>'+
                        '<div class="form-group"> '+
                            '<div class="col-md-1"></div>'+
                            '<div class="col-md-3">'+
                                '<label>Tipo de participación</label><br>'+
                                '<h4 style="margin: 0">'+datos.result.data[i].tipo_participacion+'</h4><br>'+
                            '</div>'+
                            '<div class="col-md-3">'+
                                '<label>Recibe remuneración</label><br>'+
                                '<h4 style="margin: 0">'+recibeRemuneracion+'</h4><br>'+
                            '</div>'+
                            '<div class="col-md-3">'+
                                '<label>Monto mensual</label><br>'+
                                '<h4 style="margin: 0">$'+datos.result.data[i].monto_remuneracion+'</h4><br>'+
                            '</div>'+
                        '</div><hr>'+
                        '<div class="form-group"> '+
                            '<div class="col-md-1"></div>'+
                            '<div class="col-md-3">'+
                                '<label>Porcentaje de participación</label><br>'+
                                '<h4 style="margin: 0">'+datos.result.data[i].porcentaje_participacion+'%</h4><br>'+
                            '</div>'+
                            '<div class="col-md-3">'+
                                '<label>País</label><br>'+
                                '<h4 id="pais" style="margin: 0">'+datos.result.data[i].pais_domicilio+'</h4><br>'+
                            '</div>'+
                            '<div class="col-md-3">'+
                                '<label>Sector/Industria</label><br>'+
                                '<h4 id="sector_industria" style="margin: 0">'+datos.result.data[i].id_sector_industria+'</h4><br>'+
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

function selectInstituciones(){
    
    $.ajax({
        url: ip + '/declaraciones/public/selectInteresesInstituciones?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    var beneficiario='',remuneracion='No';
                    if(datos.result.data[i].declarante){
                        beneficiario='Declarante'
                    }else if(datos.result.data[i].pareja){
                        beneficiario='Pareja'
                    }else if(datos.result.data[i].dependiente_economico){
                        beneficiario='Dependiente económico'
                    }
                    if(datos.result.data[i].recibe_remuneracion){
                        remuneracion='Si'
                    }
                    contenidos=contenidos +
                        '<div class="form-group">'+
                            '<h4 style="padding: 0; text-align: left">'+beneficiario+'</h4><br>'+
                            '<div class="col-md-1"></div>'+
                            '<div class="col-md-6">'+
                                '<label>Tipo de institución</label><br>'+
                                '<h4 style="margin: 0">'+datos.result.data[i].tipo_institucion+'</h4><br>'+
                            '</div>'+
                            '<div class="col-md-3">'+
                                '<label>Puesto / Rol</label><br>'+
                                '<h4 style="margin: 0">'+datos.result.data[i].puesto_rol+'</h4><br>'+
                            '</div>'+
                        '</div><hr>'+
                        '<div class="form-group"> '+
                            '<div class="col-md-1"></div>'+
                            '<div class="col-md-3">'+
                                '<label>Fecha de inicio</label><br>'+
                                '<h4 style="margin: 0">'+datos.result.data[i].fecha_inicio_part+'</h4><br>'+
                            '</div>'+
                            '<div class="col-md-3">'+
                                '<label>Recibe remuneración</label><br>'+
                                '<h4 style="margin: 0">'+remuneracion+'</h4><br>'+
                            '</div>'+
                            '<div class="col-md-3">'+
                                '<label>Monto mensual</label><br>'+
                                '<h4 style="margin: 0">$'+datos.result.data[i].monto_remuneracion+'</h4><br>'+
                            '</div>'+
                        '</div><hr>'+
                        '<div class="form-group"> '+
                            '<div class="col-md-1"></div>'+
                            '<div class="col-md-3">'+
                                '<label>País</label><br>'+
                                '<h4 style="margin: 0">'+datos.result.data[i].pais_ubicacion+'</h4><br>'+
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

function selectApoyosPublicos(){
    
    $.ajax({
        url: ip + '/declaraciones/public/selectInteresesBeneficiosPublicos?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    contenidos=contenidos +
                    '<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-5">'+
                            '<label>Nombre del programa</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].nombre_programa+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Institución que otorga</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].nombre_otorgante+'</h4><br>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Orden de gobierno</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].nivel+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Tipo de apoyo</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].tipo_beneficio+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Forma de recepción</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].forma_beneficio+'</h4><br>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group">'+
                        '<div class="col-md-1"></div>'

                        if(datos.result.data[i].forma_beneficio == 'MONETARIO'){
                            contenidos=contenidos +'<div class="col-md-3">'+
                                '<label>Monto mensual</label><br>'+
                                '<h4 style="margin: 0">$'+datos.result.data[i].monto_beneficio+'</h4><br>'+
                            '</div>'
                        }else{
                            contenidos=contenidos +'<div class="col-md-3">'+
                                '<label>Especificación del apoyo</label><br>'+
                                '<h4 style="margin: 0">'+datos.result.data[i].especifica_beneficio+'</h4><br>'+
                            '</div>'
                        }

                        contenidos=contenidos +'</div><br><hr class="separador"><br>'
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

function selectRepActiva(){
    
    $.ajax({
        url: ip + '/declaraciones/public/selectInteresesRepresentacionActiva?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    var beneficiario='',remuneracion='No';
                    if(datos.result.data[i].declarante){
                        beneficiario='Declarante'
                    }else if(datos.result.data[i].pareja){
                        beneficiario='Pareja'
                    }else if(datos.result.data[i].dependiente_economico){
                        beneficiario='Dependiente económico'
                    }
                    if(datos.result.data[i].recibe_remuneracion){
                        remuneracion='Si'
                    }
                    contenidos=contenidos +
                    '<div class="form-group">'+
                        '<h4 style="padding: 0; text-align: left">'+beneficiario+'</h4><br>'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Tipo de representación</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].tipo_repreentacion+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Fecha de inicio</label><br>'+
                            '<h4 id="fecha_inicio" style="margin: 0">'+datos.result.data[i].fecha_inicio+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>País</label><br>'+
                            '<h4 id="sector_industria" style="margin: 0">'+datos.result.data[i].pais_rep+'</h4><br>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Recibe remuneración</label><br>'+
                            '<h4 style="margin: 0">'+remuneracion+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Monto mensual</label><br>'+
                            '<h4 style="margin: 0">$'+datos.result.data[i].monto_representacion+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>Sector/Industria</label><br>'+
                            '<h4 id="sector_industria" style="margin: 0">'+datos.result.data[i].id_sector_industria+'</h4><br>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Representante / Representado</label><br>'+
                            '<h4 style="margin: 0">Persona moral</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>Nombre o razón social</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].nombre_representado+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>RFC</label><br>'+
                            '<h4 id="sector_industria" style="margin: 0">'+datos.result.data[i].rfc_representado+'</h4><br>'+
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

function selectClientesPrincipales(){
    
    $.ajax({
        url: ip + '/declaraciones/public/selectInteresesClientesPrincipales?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    var beneficiario='';
                    if(datos.result.data[i].declarante){
                        beneficiario='Declarante'
                    }else if(datos.result.data[i].pareja){
                        beneficiario='Pareja'
                    }else if(datos.result.data[i].dependiente_economico){
                        beneficiario='Dependiente económico'
                    }
                    contenidos=contenidos +
                    '<div class="form-group">'+
                        '<h4 style="padding: 0; text-align: left">'+beneficiario+'</h4><br>'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-5">'+
                            '<label>Nombre de la empresa o servicio</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].nombre_empresa+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>RFC de la empresa</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].rfc_empresa+'</h4><br>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Representante / Representado</label><br>'+
                            '<h4 style="margin: 0">Persona moral</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>Nombre o razón social del cliente</label><br>'+
                            '<h4 id="registro" style="margin: 0">'+datos.result.data[i].nombre_cte_principal+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>RFC del cliente</label><br>'+
                            '<h4 id="sector_industria" style="margin: 0">'+datos.result.data[i].rfc_cte_principal+'</h4><br>'+
                        '</div>'+ 
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Monto menusal aproximado</label><br>'+
                            '<h4 style="margin: 0">$'+datos.result.data[i].ganancia_por_cte_principal+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>Pais</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].pais_domicilio_extranjero+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Sector/Industria</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].id_sector_industria+'</h4><br>'+
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

function selectBeneficiosGratuitos(){
    
    $.ajax({
        url: ip + '/declaraciones/public/selectInteresesBeneficiosPrivados?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    contenidos=contenidos +
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Otorgante</label><br>'+
                            '<h4 style="margin: 0">Persona moral</h4><br>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Nombre o razon social del otorgante</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].nombre_otorgante+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>RFC del otorgante</label><br>'+
                            '<h4 id="sector_industria" style="margin: 0">'+datos.result.data[i].rfc_otorgante+'</h4><br>'+
                        '</div>'+ 
                    '</div><hr>'+
                    '<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Tipo de apoyo</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].tipo_beneficio+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Sector/Industria</label><br>'+
                            '<h4 id="sector_industria" style="margin: 0">'+datos.result.data[i].sector_industria+'</h4><br>'+    
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Forma de recepción</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].forma_beneficio+'</h4><br>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group">'+
                        '<div class="col-md-1"></div>'
                        if(datos.result.data[i].forma_beneficio == 'MONETARIO'){
                            contenidos=contenidos +'<div class="col-md-3">'+
                                '<label>Monto mensual</label><br>'+
                                '<h4 style="margin: 0">$'+datos.result.data[i].monto+'</h4><br>'+
                            '</div>'
                        }else{
                            contenidos=contenidos +'<div class="col-md-3">'+
                                '<label>Especificación del apoyo</label><br>'+
                                '<h4 style="margin: 0">'+datos.result.data[i].especifica_beneficio+'</h4><br>'+
                            '</div>'
                        }

                        contenidos=contenidos +'</div><br><hr class="separador"><br>'
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

function selectFideicomisos(){
    
    $.ajax({
        url: ip + '/declaraciones/public/selectInteresesFideicomisos?tipo_declaracion='+td+'&id_declarador='+id,
        type: "GET",
        dataType: "json",
    }).done(function(datos){
            if(datos.status){
                var contenidos=' ';
                for(var i=0;i<Object.keys(datos.result.data).length;i++){
                    var beneficiario='';
                    if(datos.result.data[i].declarante){
                        beneficiario='Declarante'
                    }else if(datos.result.data[i].pareja){
                        beneficiario='Pareja'
                    }else if(datos.result.data[i].dependiente_economico){
                        beneficiario='Dependiente económico'
                    }
                    contenidos=contenidos +
                    '<div class="form-group">'+
                        '<h4 style="padding: 0; text-align: left">'+beneficiario+'</h4><br>'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-4">'+
                            '<label>Tipo de fideicomiso</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].tipo_fideicomiso+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>Tipo de participación</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].tipo_participacion+'</h4><br>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Fideicomisario</label><br>'+
                            '<h4 style="margin: 0">Persona moral</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>Nombre o razón social</label><br>'+
                            '<h4 id="fiduciario" style="margin: 0">'+datos.result.data[i].nombre_fideicomisario+'</h4>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>RFC Fideicomisario</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].rfc_fideicomisario+'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Fideicomitente</label><br>'+
                            '<h4 style="margin: 0">Persona moral</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>Nombre o razón social</label><br>'+
                            '<h4  style="margin: 0">'+datos.result.data[i].nombre_fideicomitente+'</h4>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>RFC Fideicomitente</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].rfc_fideicomitente+'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group"> '+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Fiduciario</label><br>'+
                            '<h4 style="margin: 0">Persona moral</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>Nombre o razón social</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].nombre_fidiuciario+'</h4>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>RFC Fiduciario</label><br>'+
                            '<h4 id="rfc_fideicomitente" style="margin: 0">'+datos.result.data[i].rfc_fidiuciario+'</h4>'+
                        '</div>'+
                    '</div><hr>'+
                    '<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-4">'+
                            '<label>País</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].pais_fideicomiso+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-4">'+
                            '<label>Sector / Industria</label><br>'+
                            '<h4 style="margin: 0">'+datos.result.data[i].id_sector_industria+'</h4><br>'+
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