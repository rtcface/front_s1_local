var ip=sessionStorage.getItem("ip");
var tipoDeclaracion=sessionStorage.getItem("tipoDec");

///////////////// Funciones Generales Para Todos Los Formularios /////////////////
$(document).ready(function(){
    var d = new Date(),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var fecha= year + "-" + month + "-" + day;
    $("input[type='date']").attr('max',fecha);
    $("input[type='date']").attr('min',"1940-01-01");
    $("input[type='number']").attr('pattern',"[0-9]{0,12}"); 
    $("input[type='tel']").attr('pattern',"[0-9]{10}");
    $("input[type='tel']").attr('maxlength',"10");
    $("#extencion").attr('pattern',"[0-9]{0,5}");
    $("#extencion").attr('maxlength',"5");
    $('input:radio[name=tipoBien]').prop('required',true);
    $('input:radio[name=declarado]').prop('required',true);
    $("#anio").attr('max',year);
    $('.datepicker').datepicker({
        format: "dd/mm/yyyy",
        startDate : new Date('1900-01-01'),
        endDate : new Date(),
        autoclose: true
    });
    $(".datepicker").keydown(function(e){
        e.preventDefault();
    });
    $('input:radio[name=extencion]').attr('pattern',"[0-9]{0,5}");
    $('[data-toggle="popover"]').popover();
});

$(document).ready(function() {
    $("form").keypress(function(e) {
        if (e.which == 13) {
            return false;
        }
    });
});

///////////////// Desplegables /////////////////
function declarante(){
    if($('input:radio[name=declarado]:checked').val() == 'Declarante' || $('#beneficiario').val()=='DECLARANTE' ){
        $('label').addClass('dato_publico');
    }else{
        $('label').removeClass('dato_publico');
    }

    if($('input:radio[name=repr]:checked').val() == 'fisica' || $('input:radio[name=client]:checked').val() == 'fisica' || $('input:radio[name=otorgante]:checked').val() == 'fisica'){
        $('#label_tipoTercero').removeClass('dato_publico');
        $('#label_nombreTercero').removeClass('dato_publico');
        $('#label_rfcTercero').removeClass('dato_publico');
    }else{
        $('#label_tipoTercero').addClass('dato_publico');
        $('#label_nombreTercero').addClass('dato_publico');
        $('#label_rfcTercero').addClass('dato_publico');
    }

    if($('input:radio[name=personaFideicomitente]:checked').val() == 'fisica'){
        $('#label_fideicomitente').removeClass('dato_publico');
        $('#label_fideicomitenteNombre').removeClass('dato_publico');
        $('#label_fideicomitenteRfc').removeClass('dato_publico');
    }else{
        $('#label_fideicomitente').addClass('dato_publico');
        $('#label_fideicomitenteNombre').addClass('dato_publico');
        $('#label_fideicomitenteRfc').addClass('dato_publico');
    }

    if($('input:radio[name=personaFideicomisario]:checked').val() == 'fisica'){
        $('#label_fideicomisario').removeClass('dato_publico');
        $('#label_fideicomisarioNombre').removeClass('dato_publico');
        $('#label_fideicomisarioRfc').removeClass('dato_publico');
    }else{
        $('#label_fideicomisario').addClass('dato_publico');
        $('#label_fideicomisarioNombre').addClass('dato_publico');
        $('#label_fideicomisarioRfc').addClass('dato_publico');
    }
    
    $('#label_titulo').removeClass('dato_publico');
    $('#label_noAplica').removeClass('dato_publico');
    $('#label_observaciones').removeClass('dato_publico');
    $('#label_final').removeClass('dato_publico');
    $('#label_institucion').removeClass('dato_publico');
    $('#label_rfc').removeClass('dato_publico');
}

function mostrarTerceros(){
    if(!$("#titular").val().includes('TERCEROS')){
        $('#tercero').hide();
        $('#terceroDatos').hide();
        $('#botonTerceros').hide();
    }else{
        $('#tercero').show();
        $('#terceroDatos').show();
        $('#botonTerceros').show();
    }
    if($("#titular").val()=='DECLARANTE' || $("#titular").val()=='DECLARANTE EN COPROPIEDAD CON TERCEROS'){
        $('#label_tipoBien').addClass('dato_publico');
        $('#label_titular').addClass('dato_publico');
        $('#label_porcentaje').addClass('dato_publico');
        if($('input:radio[name=tercero]:checked').val() == 'fisica'){
            $('#label_tipoTercero').removeClass('dato_publico');
            $('#label_nombreTercero').removeClass('dato_publico');
            $('#label_rfcTercero').removeClass('dato_publico');
        }else{
            $('#label_tipoTercero').addClass('dato_publico');
            $('#label_nombreTercero').addClass('dato_publico');
            $('#label_rfcTercero').addClass('dato_publico');
        }
        $('#label_superficieTerreno').addClass('dato_publico');
        $('#label_superficieConstruccion').addClass('dato_publico');
        if($('input:radio[name=transmisor]:checked').val() == 'fisica'){
            $('#label_tipoTransmisor').removeClass('dato_publico');
            $('#label_nombreTransmisor').removeClass('dato_publico');
            $('#label_rfcTransmisor').removeClass('dato_publico');
            $('#label_relacionTransmisor').removeClass('dato_publico');
        }else{
            $('#label_tipoTransmisor').addClass('dato_publico');
            $('#label_nombreTransmisor').addClass('dato_publico');
            $('#label_rfcTransmisor').addClass('dato_publico');
            $('#label_relacionTransmisor').addClass('dato_publico');
        }
        $('#label_formaAdquisicion').addClass('dato_publico');
        $('#label_formaPago').addClass('dato_publico');
        $('#label_valor').addClass('dato_publico');
        $('#label_moneda').addClass('dato_publico');
        $('#label_valorInmueble').addClass('dato_publico');
        $('#label_fecha').addClass('dato_publico');
        $('#label_motivoBaja').addClass('dato_publico');
        $('#label_marca').addClass('dato_publico');
        $('#label_modelo').addClass('dato_publico');
        $('#label_anio').addClass('dato_publico');
        $('#label_descripcionMueble').addClass('dato_publico');
        $('#label_banco').addClass('dato_publico');
        $('#label_fondos').addClass('dato_publico');
        $('#label_organizaciones').addClass('dato_publico');
        $('#label_posesion').addClass('dato_publico');
        $('#label_seguros').addClass('dato_publico');
        $('#label_valores').addClass('dato_publico');
        $('#label_afores').addClass('dato_publico');
        $('#label_lugar').addClass('dato_publico');
        $('#label_institucion').addClass('dato_publico');
        $('#label_rfcInstitucion').addClass('dato_publico');
    }else{
        $('#label_tipoBien').removeClass('dato_publico');
        $('#label_titular').removeClass('dato_publico');
        $('#label_porcentaje').removeClass('dato_publico');
        if($('input:radio[name=tercero]:checked').val() == 'fisica'){
            $('#label_tipoTercero').removeClass('dato_publico');
            $('#label_nombreTercero').removeClass('dato_publico');
            $('#label_rfcTercero').removeClass('dato_publico');
        }else{
            $('#label_tipoTercero').addClass('dato_publico');
            $('#label_nombreTercero').addClass('dato_publico');
            $('#label_rfcTercero').addClass('dato_publico');
        }
        $('#label_superficieTerreno').removeClass('dato_publico');
        $('#label_superficieConstruccion').removeClass('dato_publico');
        if($('input:radio[name=transmisor]:checked').val() == 'fisica'){
            $('#label_tipoTransmisor').removeClass('dato_publico');
            $('#label_nombreTransmisor').removeClass('dato_publico');
            $('#label_rfcTransmisor').removeClass('dato_publico');
            $('#label_relacionTransmisor').removeClass('dato_publico');
        }else{
            $('#label_tipoTransmisor').addClass('dato_publico');
            $('#label_nombreTransmisor').addClass('dato_publico');
            $('#label_rfcTransmisor').addClass('dato_publico');
            $('#label_relacionTransmisor').addClass('dato_publico');
        }
        $('#label_formaAdquisicion').removeClass('dato_publico');
        $('#label_formaPago').removeClass('dato_publico');
        $('#label_valor').removeClass('dato_publico');
        $('#label_moneda').removeClass('dato_publico');
        $('#label_valorInmueble').removeClass('dato_publico');
        $('#label_fecha').removeClass('dato_publico');
        $('#label_motivoBaja').removeClass('dato_publico');
        $('#label_marca').removeClass('dato_publico');
        $('#label_modelo').removeClass('dato_publico');
        $('#label_anio').removeClass('dato_publico');
        $('#label_descripcionMueble').removeClass('dato_publico');
        $('#label_banco').removeClass('dato_publico');
        $('#label_fondos').removeClass('dato_publico');
        $('#label_organizaciones').removeClass('dato_publico');
        $('#label_posesion').removeClass('dato_publico');
        $('#label_seguros').removeClass('dato_publico');
        $('#label_valores').removeClass('dato_publico');
        $('#label_afores').removeClass('dato_publico');
        $('#label_lugar').removeClass('dato_publico');
        $('#label_institucion').removeClass('dato_publico');
        $('#label_rfcInstitucion').removeClass('dato_publico');
    }
}

function tipoPersona(){
    if($('input:radio[name=tercero]:checked').val() == 'fisica'){
        $("#rfcTercero").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_tipoTercero').removeClass('dato_publico');
        $('#label_nombreTercero').removeClass('dato_publico');
        $('#label_rfcTercero').removeClass('dato_publico');
    }else{
        $("#rfcTercero").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_tipoTercero').addClass('dato_publico');
        $('#label_nombreTercero').addClass('dato_publico');
        $('#label_rfcTercero').addClass('dato_publico');
    }
}

function tipoTransmisor(){
    if($('input:radio[name=transmisor]:checked').val() == 'fisica'){
        $("#rfc").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_tipoTransmisor').removeClass('dato_publico');
        $('#label_nombreTransmisor').removeClass('dato_publico');
        $('#label_rfcTransmisor').removeClass('dato_publico');
        $('#label_relacionTransmisor').removeClass('dato_publico');
    }else{
        $("#rfc").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_tipoTransmisor').addClass('dato_publico');
        $('#label_nombreTransmisor').addClass('dato_publico');
        $('#label_rfcTransmisor').addClass('dato_publico');
        $('#label_relacionTransmisor').addClass('dato_publico');
    }
}

function laboralPublico(){
    if($("#ambito").val() == 'PRIVADO' || $("#ambito").val() == 'OTRO'){
        $('#campoPrivadoRfc').show();
        $('#campoPrivadoSector').show();
        $('#campoPublico').hide();
        $('#campoPublicoFunciones').hide();
        $('#rfc').prop('required',true);
        $('#funciones').prop('required',false);
    }else{
        $('#campoPrivadoRfc').hide();
        $('#campoPrivadoSector').hide();
        $('#campoPublico').show();
        $('#campoPublicoFunciones').show();
        $('#funciones').prop('required',true);
        $('#rfc').prop('required',false);
    }
}

function laboralPrivado(){
    if($("#ambito").val() == 'PRIVADO' || $("#ambito").val() == 'OTRO'){
        $('#rfcPrivado').show();
        $('#areaPublico').hide();
        $('#funcionesPublico').hide();
        $('#rfcEmpresa').prop('required',true);
        $('#area').prop('required',false);
        $('#funciones').prop('required',false);
    }else if($("#ambito").val() == 'NINGUNO'){
        $('#nombreEnte').prop('required',false);
        $('#area').prop('required',false);
        $('#rfcEmpresa').prop('required',false);
        $('#cargo').prop('required',false);
        $('#funciones').prop('required',false);
        $('#fecIngreso').prop('required',false);
        $('#salario').prop('required',false);
        $('#areaPublico').hide();
        $('#funcionesPublico').hide();
        $('#rfcPrivado').hide();
    }else{
        $('#rfcPrivado').hide();
        $('#areaPublico').show();
        $('#funcionesPublico').show();
        $('#area').prop('required',true);
        $('#funciones').prop('required',true);
        $('#rfcEmpresa').prop('required',false);
    }
}

function desPaises(){
    if(document.getElementById('nacionalidad').value=='MEXICANO'){
        $('#paisNacimiento').val('146');
    }
}
function allPaises(){
    var selector = document.getElementById('paisNacimiento');
    selector.options[0]=null;
    
    $.ajax({
        url: ip + '/declaraciones/geoInfo/allPaises',
        type: 'GET', 
        dataType: 'json',
    }).done(function(data){
            var x = document.getElementById("paisNacimiento");
            var option;
            for(var i=0;i<Object.keys(data).length;i++){
                option = document.createElement("option");
                option.text = data[i]['nombre'];
                option.value = data[i]['id_pais'];
                x.add(option); 
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
    });
}

function mostrarPais(){
    $('body').on('click', '.ext', function(){
        var valor = $(this).val();
        if(valor == 'extranjero'){
            $('#paisE').show();
            $('#extranjero').show();
            $('#nacional').hide();
            $('#entidadExt').prop('required',true);
            $('#municipioExt').prop('required',true);
            $('#cpExt').prop('required',true);
            $('#coloniaExt').prop('required',true);
            $('#nombreViaExt').prop('required',true);
            $('#numExteriorExt').prop('required',true);
            $('#cp').prop('required',false);
            $('#colonia').prop('required',false);
            $('#nombreVia').prop('required',false);
            $('#numExterior').prop('required',false);
        }else if(valor == '146'){
            $('#paisE').hide();
            $('#extranjero').hide();
            $('#nacional').show();
            $('#entidadExt').prop('required',false);
            $('#municipioExt').prop('required',false);
            $('#cpExt').prop('required',false);
            $('#coloniaExt').prop('required',false);
            $('#nombreViaExt').prop('required',false);
            $('#numExteriorExt').prop('required',false);
            $('#cp').prop('required',true);
            $('#colonia').prop('required',true);
            $('#nombreVia').prop('required',true);
            $('#numExterior').prop('required',true);
        }else{
            $('#paisE').hide();
            $('#extranjero').hide();
            $('#nacional').hide();
            $('#entidadExt').prop('required',false);
            $('#municipioExt').prop('required',false);
            $('#cpExt').prop('required',false);
            $('#coloniaExt').prop('required',false);
            $('#nombreViaExt').prop('required',false);
            $('#numExteriorExt').prop('required',false);
            $('#cp').prop('required',false);
            $('#colonia').prop('required',false);
            $('#nombreVia').prop('required',false);
            $('#numExterior').prop('required',false);
        }
    });
    pedirPaises('pais');
}

function formCompletoConst(){
    if($('#completo')[0].checked==true){
        $('#form_constancia').hide();
        $('#save_constancia').show();
    }else{
        $('#form_constancia').show();
        $('#save_constancia').hide();
    }  
}

function formularioCompleto(){
    if($('#completo')[0].checked==true){
        $('#agregar_nuevo').hide();
        $('#formCompleto').hide();
        $('#guardar_np').show();
    }else{
        $('#agregar_nuevo').show();
        $('#guardar_np').hide();
    }  
}

function formularioCompleto2(){
    if($('#completo')[0].checked==true){
        $('#formCompleto').hide();
        $('#guardar_np').show();
    }else{
        $('#formCompleto').show();
        $('#guardar_np').hide();
    }   
}

function mostrarOtroRegimen(){
    var estado = $('#regimenM').val();
    if (estado == 'OTRO') {
        $('#otroRegimen').show();
        $('#otroRegimen').prop('required',true);

    } else{
        $('#otroRegimen').hide();
        $('#otroRegimen').prop('required',false);
    }
}

function ambitoExpLaboral(){
    var estado = $('#ambito').val();
    if (estado == 'OTRO') {
        $('#ambitoEsp').show();
        $('#ambitoEsp').prop('required',true);
    } else{
        $('#ambitoEsp').hide();
        $('#ambitoEsp').prop('required',false);
    }
}

function sectorOtro(){
    $('body').on('click', '.sectorIndustria', function(){
        var valor = $(this).val();
        if(valor == 'sector_17'){
            $('#otroSector').show();
            $('#otroSector').prop('required',true);
        }else{
            $('#otroSector').hide();
            $('#otroSector').prop('required',false);
        }
      })
}

function mostrarCurp(){
    $('body').on('click', '.extranjero', function(){
        var valor = $(this).val();
        if(valor == 'false'){
            $('#curp').show();
            $('#curp').prop('required',true);
        }else{
            $('#curp').hide();
            $('#curp').prop('required',false);
        }
    });
}

function mostrarDomicilio(){
    $('body').on('click', '.habitaDeclarante', function(){
        var valor = $(this).val();
        if(valor == 'false'){
            $('#domicilioPareja').show();
            $('#extranjero').hide();
            $('#nacional').show();
            $('#paisE').hide();
            $('input:radio[name=lugar]').attr('disabled',false);
            $('#cp').attr('disabled',false);
            $('#colonia').attr('disabled',false);
            $('#tipoVia').attr('disabled',false);
            $('#nombreVia').attr('disabled',false);
            $('#numExterior').attr('disabled',false);
            $('#numInterior').attr('disabled',false);
            $('#entidadExt').attr('disabled',false);
            $('#municipioExt').attr('disabled',false);
            $('#cpExt').attr('disabled',false);
            $('#coloniaExt').attr('disabled',false);
            $('#tipoViaExt').attr('disabled',false);
            $('#nombreViaExt').attr('disabled',false);
            $('#numExteriorExt').attr('disabled',false);
            $('#numInteriorExt').attr('disabled',false);
            $('#pais').attr('disabled',false);
            document.getElementById('lugar').checked =true;
            $('#cp').val("");
            var selector2 = document.getElementById('colonia');
            var selTam2=selector2.options.length;
            for (var j = selTam2-1; j >-1 ; j--) {
                selector2.options[j]=null;
            }
            $('#nombreVia').val("");
            $('#numExterior').val("");
            $('#numInterior').val("");
            $('#entidadExt').val("");
            $('#municipioExt').val("");
            $('#cpExt').val("");
            $('#coloniaExt').val("");
            $('#nombreViaExt').val("");
            $('#numExteriorExt').val("");
            $('#numInteriorExt').val("");
        }else{
            selectDomicilioDependiente();
            $('input:radio[name=lugar]').attr('disabled','disabled');
            $('#entidadFed').attr('disabled','disabled');
            $('#municipio').attr('disabled','disabled');
            $('#cp').attr('disabled','disabled');
            $('#colonia').attr('disabled','disabled');
            $('#tipoVia').attr('disabled','disabled');
            $('#nombreVia').attr('disabled','disabled');
            $('#numExterior').attr('disabled','disabled');
            $('#numInterior').attr('disabled','disabled');
            $('#entidadExt').attr('disabled','disabled');
            $('#municipioExt').attr('disabled','disabled');
            $('#cpExt').attr('disabled','disabled');
            $('#coloniaExt').attr('disabled','disabled');
            $('#tipoViaExt').attr('disabled','disabled');
            $('#nombreViaExt').attr('disabled','disabled');
            $('#numExteriorExt').attr('disabled','disabled');
            $('#numInteriorExt').attr('disabled','disabled');
            $('#pais').attr('disabled','disabled');
        }
    });
}

function bajaBienes(){
    var estado = $('#motivoBaja').val();
    if (estado == 'OTRO') {
        $('#otroBaja').show();
    } else{
        $('#otroBaja').hide();
    }
}

function otroFamiliar(){
    var estado = $('#tipoRelacion').val();
    if(estado == 'OTRO'){
        $('#otroFam').show();
        $('#otroFam').prop('required',true);
    }else{
        $('#otroFam').hide();
        $('#otroFam').prop('required',false);
    }
}

function otroFamiliar2(){
    var estado = $('#beneficiario').val();
    if(estado == 'OTRO'){
        $('#otroFam').show();
        $('#otroFam').prop('required',true);
    }else{
        $('#otroFam').hide();
        $('#otroFam').prop('required',false);
    }
}

function otroInstrumento(){
    $('body').on('click', '.tipoInst', function(){
        if($('#otro').prop("checked")){
            $('#otroInst').show();
        }else{
            $('#otroInst').hide();
        }
    });
}

function otroTipoBien(){
    var estado = $('#tipoBien').val();
    if(estado == 'OTRO'){
        $('#otroBien').show();
        $('#otroBien').prop('required',true);
    }else{
        $('#otroBien').hide();
        $('#otroBien').prop('required',false);
    }
}

function lugarRegistro(){
    $('body').on('click', '.registro', function(){
        var valor = $(this).val();
        if(valor == 'true'){
            $('#pais').show();
            $('#entidadFed').hide();
        }else{
            $('#pais').hide();
            $('#entidadFed').show();
        }
    });
    pedirPaises('pais');
    desEstados();
}

function lugarRegistro2(){
    $('body').on('click', '.registro', function(){
        var valor = $(this).val();
        if(valor == 'extranjero'){
            $('#pais2').show();
            $('#entidadFed2').hide();
        }else{
            $('#pais2').hide();
            $('#entidadFed2').show();
        }
    });
    pedirPaises('pais2');
    desEstados2();
}

function lugarUbica(){
    $('body').on('click', '.registro', function(){
        var valor = $(this).val();
        if(valor == 'extranjero'){
            $('#pais').show();
            $('#entidadFed').hide();
        }else{
            $('#pais').hide();
            $('#entidadFed').show();
        }
    });
    pedirPaises('pais');
    desEstados();
}

function desTipoInversion(){
    switch($('#tipoBien').val()){
        case 'BANCARIA':
            $('#contenedorBancaria').show();
            $('#contenedorFondos').hide();
            $('#contenedorOrganizaciones').hide();
            $('#contenedorPosesion').hide();
            $('#contenedorSeguros').hide();
            $('#contenedorValores').hide();
            $('#contenedorAfores').hide();
        break;
        case 'FONDOS DE INVERSION':
            $('#contenedorBancaria').hide();
            $('#contenedorFondos').show();
            $('#contenedorOrganizaciones').hide();
            $('#contenedorPosesion').hide();
            $('#contenedorSeguros').hide();
            $('#contenedorValores').hide();
            $('#contenedorAfores').hide();
        break;
        case 'ORGANIZACIONES PRIVADAS Y/O MERCANTILES':
            $('#contenedorBancaria').hide();
            $('#contenedorFondos').hide();
            $('#contenedorOrganizaciones').show();
            $('#contenedorPosesion').hide();
            $('#contenedorSeguros').hide();
            $('#contenedorValores').hide();
            $('#contenedorAfores').hide();
        break;
        case 'POSESION DE MONEDAS Y/O METALES':
            $('#contenedorBancaria').hide();
            $('#contenedorFondos').hide();
            $('#contenedorOrganizaciones').hide();
            $('#contenedorPosesion').show();
            $('#contenedorSeguros').hide();
            $('#contenedorValores').hide();
            $('#contenedorAfores').hide();
        break;
        case 'SEGUROS':
            $('#contenedorBancaria').hide();
            $('#contenedorFondos').hide();
            $('#contenedorOrganizaciones').hide();
            $('#contenedorPosesion').hide();
            $('#contenedorSeguros').show();
            $('#contenedorValores').hide();
            $('#contenedorAfores').hide();
        break;
        case 'VALORES BURSATILES':
            $('#contenedorBancaria').hide();
            $('#contenedorFondos').hide();
            $('#contenedorOrganizaciones').hide();
            $('#contenedorPosesion').hide();
            $('#contenedorSeguros').hide();
            $('#contenedorValores').show();
            $('#contenedorAfores').hide();
        break;
        case 'AFORES Y OTROS':
            $('#contenedorBancaria').hide();
            $('#contenedorFondos').hide();
            $('#contenedorOrganizaciones').hide();
            $('#contenedorPosesion').hide();
            $('#contenedorSeguros').hide();
            $('#contenedorValores').hide();
            $('#contenedorAfores').show();
        break;
    }
}

function mostrarTipoBien(){
    $('body').on('click', '.tipoBien', function(){
        var valor = $(this).val();
        if(valor == 'INMUEBLE'){
            $('#contenedorInmueble').show();
            $('#contenedorvehiculo').hide();
            $('input:radio[name=lugar]').prop('required',true);
            $('#marca').prop('required',false);
            $('#modelo').prop('required',false);
            $('#anio').prop('required',false);
            $('#numeroSerie').prop('required',false);
        }else{
            $('#contenedorInmueble').hide();
            $('#contenedorvehiculo').show();
            $('input:radio[name=lugar]').prop('required',false);
            $('#marca').prop('required',true);
            $('#modelo').prop('required',true);
            $('#anio').prop('required',true);
            $('#numeroSerie').prop('required',true);
        }
    });
}

function mostrarOtroInmueble(){
    var estado = $('#tipoInmueble').val();
    if(estado == 'OTRO'){
        $('#otroInmueble').show();
    }else{
        $('#otroInmueble').hide();
    }
}

function mostrarOtroVehiculo(){
    var estado = $('#tipoVehiculo').val();
    if(estado == 'OTRO'){
        $('#otroVehiculo').show();
    }else{
        $('#otroVehiculo').hide();
    }
}

function otraParticipacion(){
    var estado = $('#tipoParticipacion').val();
    if(estado == 'OTRO'){
        $('#otraPart').show();
        $('#otraPart').prop('required',true);
    }else{
        $('#otraPart').hide();
        $('#otraPart').prop('required',false);
    }
}

function otraInstitucion(){
    var estado = $('#tipoInstitucion').val();
    if(estado == 'OTRO'){
        $('#otraInst').show();
        $('#otraInst').prop('required',true);
    }else{
        $('#otraInst').hide();
        $('#otraInst').prop('required',false);
    }
}

function mostrarOtroApoyo(){
    var estado = $('#tipoApoyo').val();
    if(estado == 'OTRO'){
        $('#otroApoyo').show();
        $('#otroApoyo').prop('required',true);
    }else{
        $('#otroApoyo').hide();
        $('#otroApoyo').prop('required',false);
    }
}

function estCiv(){
    var estado = $('#estadoCivil').val();
    if(estado == 'CASADO (A)'){
        $('#regimen').show();
        $("#regimenM").val("SOCIEDAD CONYUGAL");
    }else{
        $('#regimen').hide();
        $('#otroRegimen').hide();
        $('#otroRegimen').prop('required',false);
    }
}

function mostrarMontoRemuneracion(){
    $('body').on('click', '.remuneracion', function(){
    var valor = $(this).val();
        if(valor == 'true'){
            $('#montoRemuneracion').show();
            $('#monto').prop('required',true);
        }else{
            $('#montoRemuneracion').hide();
            $('#monto').prop('required',false);
        }
    });
}

function mostrarApoyoEspecifico(){
    $('body').on('click', '.recepcion', function(){
        var valor = $(this).val();
        if(valor == 'ESPECIE'){
            $('#apoyoEspecifico').show();
            $('#espApoyo').prop('required',true);
        }else{
            $('#apoyoEspecifico').hide();
            $('#espApoyo').prop('required',false);
        }
    });
}

function repFisicoMoral(){
    if($('input:radio[name=repr]:checked').val() == 'fisica'){
        $("#rfc").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_tipoTercero').removeClass('dato_publico');
        $('#label_nombreTercero').removeClass('dato_publico');
        $('#label_rfcTercero').removeClass('dato_publico');
    }else{
        $("#rfc").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_tipoTercero').addClass('dato_publico');
        $('#label_nombreTercero').addClass('dato_publico');
        $('#label_rfcTercero').addClass('dato_publico');
    }
}

function clientFisicoMoral(){
    if($('input:radio[name=client]:checked').val() == 'fisica'){
        $("#rfcCliente").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_tipoTercero').removeClass('dato_publico');
        $('#label_nombreTercero').removeClass('dato_publico');
        $('#label_rfcTercero').removeClass('dato_publico');
    }else{
        $("#rfcCliente").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_tipoTercero').addClass('dato_publico');
        $('#label_nombreTercero').addClass('dato_publico');
        $('#label_rfcTercero').addClass('dato_publico');
    }
}
         
function otorganteFisicoMoral(){
    if($('input:radio[name=otorgante]:checked').val() == 'fisica'){
        $("#rfc").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_tipoTercero').removeClass('dato_publico');
        $('#label_nombreTercero').removeClass('dato_publico');
        $('#label_rfcTercero').removeClass('dato_publico');
    }else{
        $("#rfc").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_tipoTercero').addClass('dato_publico');
        $('#label_nombreTercero').addClass('dato_publico');
        $('#label_rfcTercero').addClass('dato_publico');
    }
}

function fideicomitenteFisicoMoral(){
    if($('input:radio[name=personaFideicomitente]:checked').val() == 'fisica'){
        $("#rfcFideicomitente").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_fideicomitente').removeClass('dato_publico');
        $('#label_fideicomitenteNombre').removeClass('dato_publico');
        $('#label_fideicomitenteRfc').removeClass('dato_publico');
    }else{
        $("#rfcFideicomitente").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_fideicomitente').addClass('dato_publico');
        $('#label_fideicomitenteNombre').addClass('dato_publico');
        $('#label_fideicomitenteRfc').addClass('dato_publico');
    }
}

function fideicomisarioFisicoMoral(){
    if($('input:radio[name=personaFideicomisario]:checked').val() == 'fisica'){
        $("#rfcFideicomisario").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_fideicomisario').removeClass('dato_publico');
        $('#label_fideicomisarioNombre').removeClass('dato_publico');
        $('#label_fideicomisarioRfc').removeClass('dato_publico');
    }else{
        $("#rfcFideicomisario").attr('pattern',"([A-ZÑ\x26a-zñ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})");
        $('#label_fideicomisario').addClass('dato_publico');
        $('#label_fideicomisarioNombre').addClass('dato_publico');
        $('#label_fideicomisarioRfc').addClass('dato_publico');
    }
}

function mostrarAmbito(){
    var estado = $('#nivelGob').val();
    if(estado == 'ESTATAL'){
        $('#ambitoPublico').show();
    }else{
        $('#ambitoPublico').hide();
    }
}

function mostrarCarrera(){
    var estado = $('#nivelCurriculo').val();
    if(estado != 'PRIMARIA' && estado != 'SECUNDARIA' && estado != 'BACHILLERATO'){
        $('#contCarrera').show();
        $('#carrera').prop('required',true);
    }else{
        $('#contCarrera').hide();
        $('#carrera').prop('required',false);
    }
}

function fechaNull(){
    if( $('#trabajo_actual')[0].checked==true ){
        $('#fecSalida').attr('disabled','disabled');
    }else{
        $('#fecSalida').attr('disabled',false);
    }
}
/////////////////////// Campos extras por formilario ////////////////////////

function form1(){
    if(tipoDeclaracion==2){
        $('#pregunta').show();
    }
}

function formDependientes(){
    if($('#ambito').val()=='PUBLICO'){
        $('#contPublico').show();
        $('#contProveedor').hide();
        $('#contSector').hide();
        $('#cont1').show();
        $('#cont2').show();
        $('#cont3').show();
    }else if($('#ambito').val()=='NINGUNO'){
        $('#contPublico').hide();
        $('#contProveedor').hide();
        $('#contSector').hide();
        $('#cont1').hide();
        $('#cont2').hide();
        $('#cont3').hide();
    }else{
        $('#contPublico').hide();
        $('#contProveedor').show();
        $('#contSector').show();
        $('#cont1').show();
        $('#cont2').show();
        $('#cont3').show();
    }
}

function form8(){
    if(tipoDeclaracion==1){
        $('#enajenacion').hide();
        $('#tipoEnajenacion').hide();
        $('#campo1').text('I.- Remuneración mensual neta del declarante por su cargo público (Por concepto de sueldos, honorarios, compensaciones, bonos y otras prestaciones)');
        $('#campo13').text('A.- Ingresos mensual neto del declarante');
        $('#campo14').text('B.- Ingresos mensual neto de la pareja y/o dependientes económicos');
        $('#campo15').text('C.- Total de ingresos mensuales netos percibidos por el declarante, pareja y/o dependientes económicos');
    }else if(tipoDeclaracion==2){
        $('#enajenacion').show();
        $('#tipoEnajenacion').show();
        $('#campo1').text('I.- Remuneración anual neta del declarante por su cargo público (Por concepto de sueldos, honorarios, compensaciones, bonos y otras prestaciones)');
        $('#campo13').text('A.- Ingresos anual neto del declarante');
        $('#campo14').text('B.- Ingresos anual neto de la pareja y/o dependientes económicos');
        $('#campo15').text('C.- Total de ingresos anuales netos percibidos por el declarante, pareja y/o dependientes económicos');
    }else if(tipoDeclaracion==3){
        $('#enajenacion').show();
        $('#tipoEnajenacion').show();
        $('#campo1').text('I.- Remuneración neta del año en curso a la fecha de  conclusión del empleo, cargo o comisión del declarante por su cargo público (Por concepto de sueldos, honorarios, compensaciones, bonos y otras prestaciones)');
        $('#campo13').text('A.- Ingresos del declarante del año en curso a la fecha de conclusión del empleo, cargo o comisón');
        $('#campo14').text('B.- Ingresos del año en curso a la fecha de conclusión del empleo, cargo o comisón de la pareja y/o dependientes económicos');
        $('#campo15').text('C.- Total de ingresos netos del año en curso a la fecha de conclusión del empleo, cargo o comisón persibidos por el declarante, pareja y/o dependientes económicos');
    }
}

function formEmpleos(){
    if(tipoDeclaracion==2){
        $('#empleosModificacion').show();
        $('#empleoModificacion').show();
    }else{
        $('#empleosModificacion').hide();
        $('#empleoModificacion').hide();
    }
}

////////////////// Peticion de lista de paises ///////////////////////////
function pedirPaises(id){
    $.ajax({
        url: ip + '/declaraciones/geoInfo/allPaises',
        type: 'GET', 
        dataType: 'json',
    }).done(function(data){
            var x = document.getElementById(id);
            var option;
            for(var i=0;i<Object.keys(data).length;i++){
                option = document.createElement("option");
                option.text = data[i]['nombre'];
                option.value = data[i]['id_pais'];
                x.add(option); 
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
    });
}

////////////////////// Desplegar estados /////////////////
function desEstados(){
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
                x.add(option); 
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
    });
}
function desEstados2(){
    $.ajax({
        url: ip + '/declaraciones/geoInfo/allEdos',
        type: 'GET', 
        dataType: 'json',
     }).done(function(data){
            var x = document.getElementById("entidadFed2");
            var option;
            for(var i=0;i<Object.keys(data['data']).length;i++){
                option = document.createElement("option");
                option.text = data['data'][i]['nombre'];
                option.value = data['data'][i]['clave'];
                x.add(option); 
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
    });
}
/////////////// Desplegar municipios //////////////
function desMunicipios(){ 
    var selector = document.getElementById('municipio');
    var selTam=selector.options.length;
    for (var j = selTam-1; j >-1 ; j--) {
        console.log(selector.textContent);
        selector.options[j]=null;
      }
    var estado = document.getElementById('entidadFed').value;
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
                x.add(option); 
            }
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
    });
}

/////////////// Desplegar colonia /////////////////////
function desColonia(){
    var selector = document.getElementById('colonia');
    var selTam=selector.options.length;
    for (var j = selTam-1; j >-1 ; j--) {
        selector.options[j]=null;
      }
    var cp = document.getElementById('cp').value;
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
                x.add(option); 
            }
            $('#entidadFed').val(data[0]['clave_estado']);
            domMunicipio(data[0]['clave_municipio'],data[0]['clave_estado']);
        }).fail( function( jqXHR, textStatus, errorThrown ) {
            alert(jqXHR.responseJSON.msg)
    });
}

/////////////// Funciones de sumas /////////////
function sumaOtrosIngresos(){
    var suma=0;
    var cant1=0;
    var cant2=0;
    var cant3=0;
    var cant4=0;
    var cant5=0;

    if($('#total_ingresos_industrial').val()!=''){
        cant1=parseInt($('#total_ingresos_industrial').val(),10);
    }
    if($('#total_ingresos_financiera').val()!=''){
        cant2=parseInt($('#total_ingresos_financiera').val(),10);
    }
    if($('#total_ingresos_servicios').val()!=''){
        cant3=parseInt($('#total_ingresos_servicios').val(),10);
    }
    if($('#total_ingresos_varios').val()!=''){
        cant4=parseInt($('#total_ingresos_varios').val(),10);
    }
    if($('#total_ingresos_enajenacion').val()!=''){
        cant5=parseInt($('#total_ingresos_enajenacion').val(),10);
    }
    
    if(tipoDeclaracion==1){
        suma=cant1+cant2+cant3+cant4;
    }else{
        suma=cant1+cant2+cant3+cant4+cant5;
    }
    $('#otros_ingresos').val(suma)
}

function sumaOtrosIngresos2(){
    var suma=0;
    var cant1=0;
    var cant2=0;
    var cant3=0;
    var cant4=0;
    var cant5=0;

    if($('#total_ingresos_industrial').val()!=''){
        cant1=parseInt($('#total_ingresos_industrial').val(),10);
    }
    if($('#total_ingresos_financiera').val()!=''){
        cant2=parseInt($('#total_ingresos_financiera').val(),10);
    }
    if($('#total_ingresos_servicios').val()!=''){
        cant3=parseInt($('#total_ingresos_servicios').val(),10);
    }
    if($('#total_ingresos_varios').val()!=''){
        cant4=parseInt($('#total_ingresos_varios').val(),10);
    }
    if($('#total_ingresos_enajenacion').val()!=''){
        cant5=parseInt($('#total_ingresos_enajenacion').val(),10);
    }
    
    suma=cant1+cant2+cant3+cant4+cant5;
    
    $('#otros_ingresos').val(suma)
}

function sumaIngresosDeclarante(){
    var suma=0;
    var cant1=0;
    var cant2=0;

    if($('#remuneracion_neta').val()!=''){
        cant1=parseInt($('#remuneracion_neta').val(),10);
    }
    if($('#otros_ingresos').val()!=''){
        cant2=parseInt($('#otros_ingresos').val(),10);
    }

    suma=cant1+cant2;
   
    $('#ingresos_declarante').val(suma)
}

function sumaIngresosNetos(){
    var suma=0;
    var cant1=0;
    var cant2=0;

    if($('#ingresos_declarante').val()!=''){
        cant1=parseInt($('#ingresos_declarante').val(),10);
    }
    if($('#ingresos_pareja').val()!=''){
        cant2=parseInt($('#ingresos_pareja').val(),10);
    }

    suma=cant1+cant2;
   
    $('#ingresos_total').val(suma)
}

function obligarNegocio(){
    if($("#ingresos_industrial").val()>0){
        $('#nombre_industria').prop('required',true);
        $('#tipoNegocio').prop('required',true);
    }else{
        $('#nombre_industria').prop('required',false);
        $('#tipoNegocio').prop('required',false);
    }
}

function obligarTipoInstrumento(){
    if($("#ingresos_financiera").val()>0){
        $('input:radio[name=tipoInstrumento]').prop('required',true);
        document.getElementById('capital').checked =true;
        $('input:radio[name=tipoInstrumento]').prop('disabled', false);
        $('#noAplica').prop('disabled', 'disabled');
    }else{
        $('input:radio[name=tipoInstrumento]').prop('required',false);
        document.getElementById('noAplica').checked =true;
        $('input:radio[name=tipoInstrumento]').prop('disabled', 'disabled');
        $('#noAplica').prop('disabled', 'disabled');
        $('#otroInst').hide();
    }
}

function obligarServicioPrestado(){
    if($("#ingresos_servicios").val()>0){
        $('#tipo_servicio').prop('required',true);
    }else{
        $('#tipo_servicio').prop('required',false);
    }
}

function obligarOtroIngreso(){
    if($("#ingresos_varios").val()>0){
        $('#especificar_varios').prop('required',true);
    }else{
        $('#especificar_varios').prop('required',false);
    }
}

function obligarTipoEnajenacion(){
    if($("#ingresos_enajenacion").val()>0){
        $('input:radio[name=tipoBienEnajenado]').prop('required',true);
        document.getElementById('bienMueble').checked =true;
        $('input:radio[name=tipoBienEnajenado]').prop('disabled', false);
        $('#bienNoAplica').prop('disabled', 'disabled');
    }else{
        $('input:radio[name=tipoBienEnajenado]').prop('required',false);
        document.getElementById('bienNoAplica').checked =true;
        $('input:radio[name=tipoBienEnajenado]').prop('disabled', 'disabled');
        $('#bienNoAplica').prop('disabled', 'disabled');
    }
}

///////////////// Funciones del Semaforo /////////////////////////
var form=0;
function actualizarSemaforo(){
    $.ajax({
        url: ip + '/declaraciones/aplicaControl/selectControlAplica?tipo_declaracion='+tipo_declaracion,
        type: 'GET', 
        dataType: 'json',
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
        semaforoNuevo(datos.result.data)
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
    
}

function semaforoNuevo(objeto){
    $.ajax({
        url: ip + '/declaraciones/declarante/findGlobalSemaphore?tipo_declaracion='+tipo_declaracion,
        type: 'GET', 
        dataType: 'json',
        headers: {
            'X-Auth-Token' : sessionStorage.getItem("token")
        }
    }).done(function(datos){
            if(datos.status){
                if(datos.result.data.dec_fiscal_data ){
                    document.getElementById('semaforoDecFiscal').style.color='#1EE164';
                }else{
                    form=22;
                }
                if(datos.result.data.intereses_fideicomisos || !objeto.aplica_fideicomisos){
                    document.getElementById('semaforoFideicomisos').style.color='#1EE164'
                }else{
                    form=21;
                }
                if(datos.result.data.intereses_beneficios_privados || !objeto.aplica_beneficios_privados){
                    document.getElementById('semaforoBeneficiosPrivados').style.color='#1EE164'
                }else{
                    form=20;
                }
                if(datos.result.data.intereses_clientes_principales || !objeto.aplica_clientes_principales){
                    document.getElementById('semaforoClientes').style.color='#1EE164'
                }else{
                    form=19;
                }
                if(datos.result.data.intereses_representacion_activa || !objeto.aplica_representacion){
                    document.getElementById('semaforoRepresentacion').style.color='#1EE164'
                }else{
                    form=18;
                }
                if(datos.result.data.intereses_beneficios_publicos || !objeto.aplica_beneficios_publicos){
                    document.getElementById('semaforoBeneficiosPublicos').style.color='#1EE164'
                }else{
                    form=17;
                }
                if(datos.result.data.intereses_instituciones || !objeto.aplica_part_instituciones){
                    document.getElementById('semaforoInstituciones').style.color='#1EE164'
                }else{
                    form=16;
                }
                if(datos.result.data.intereses_empresas_sociedades || !objeto.aplica_emp_soc){
                    document.getElementById('semaforoEmpresas').style.color='#1EE164'
                }else{
                    form=15;
                }

                if(sessionStorage.getItem("declaracion_completa")=="true"){
                    if(datos.result.data.pasivos_prestamo_comodato || !objeto.aplica_prestamo_comodato){
                        document.getElementById('semaforoPrestamos').style.color='#1EE164'
                    }else{
                        form=14;
                    }
                    if(datos.result.data.pasivos_adeudos || !objeto.aplica_adeudos){
                        document.getElementById('semaforoPasivos').style.color='#1EE164'
                    }else{
                        form=13;
                    }
                    if(datos.result.data.activos_inversiones_cuentas || !objeto.aplica_inversiones_cuentas){
                        document.getElementById('semaforoInversiones').style.color='#1EE164'
                    }else{
                        form=12;
                    }
                    if(datos.result.data.activos_bienes_muebles_nr || !objeto.aplica_bienes_muebles_nr){
                        document.getElementById('semaforoMuebles').style.color='#1EE164'
                    }else{
                        form=11;
                    }
                    if(datos.result.data.activos_bienes_muebles || !objeto.aplica_bienes_muebles){
                        document.getElementById('semaforoVehiculo').style.color='#1EE164'
                    }else{
                        form=10;
                    }
                    if(datos.result.data.activos_bienes_inmuebles || !objeto.aplica_bienes_inmuebles){
                        document.getElementById('semaforoInmuebles').style.color='#1EE164'
                    }else{
                        form=9;
                    }
                }
                
                if(datos.result.data.anterior_servidor || !objeto.aplica_anterior_servidor){
                    document.getElementById('semaforoAnteriorServidor').style.color='#1EE164'
                }else{
                    if(tipoDeclaracion!=2){
                        form=8;
                    }
                }
                if(datos.result.data.ingresos_netos){
                    document.getElementById('semaforoIngresos').style.color='#1EE164'
                }else{
                    form=7;
                }

                if(sessionStorage.getItem("declaracion_completa")=="true"){
                    if(datos.result.data.dependientes || !objeto.aplica_dependiente){
                        document.getElementById('semaforoDependiente').style.color='#1EE164'
                    }else{
                        form=6;
                    }
                    if(datos.result.data.conyuge || !objeto.aplica_conyuge){
                        document.getElementById('semaforoPareja').style.color='#1EE164'
                    }else{
                        form=5;
                    }
                }
               
                if(datos.result.data.exp_laboral || !objeto.aplica_exp_laboral){
                    document.getElementById('semaforoExperiencia').style.color='#1EE164'
                }else{
                    form=4;
                }
                if(datos.result.data.encargo_actual){
                    document.getElementById('semaforoCargo').style.color='#1EE164'
                }else{
                    form=3;
                }
                if(datos.result.data.curriculo_declarante || !objeto.aplica_curriculo_declarante){
                    document.getElementById('semaforoCurriculo').style.color='#1EE164'
                }else{
                    form=2;
                }
                if(datos.result.data.declarante_domicilio){
                    document.getElementById('semaforoDomicilio').style.color='#1EE164'
                }else{
                    form=1;
                }
                if(datos.result.data.informacion_general){
                    document.getElementById('semaforoDatos').style.color='#1EE164'
                }else{
                    form=0;
                }
                sigForm(form)
            }
    }).fail( function( jqXHR, textStatus, errorThrown ) {
        alert(jqXHR.responseJSON.msg)
    });
    
}

function sigForm(){
    $('.panel-body li a').removeClass('active');
    switch(form){
        case 0:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/1-datos_generales.html';
            $('#semaforoDatos').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 1:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/2-domicilio_declarante.html';
            $('#semaforoDomicilio').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 2:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/3-datos_curriculo.html';
            $('#semaforoCurriculo').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 3:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/4-datos_empleo.html';
            $('#semaforoCargo').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 4:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/5-experiencia_laboral.html';
            $('#semaforoExperiencia').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 5:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/6-datos_pareja.html';
            $('#semaforoPareja').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 6:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/7-datos_dependiente.html';
            $('#semaforoDependiente').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 7:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/8-ingresos_netos.html';
            $('#semaforoIngresos').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 8:
            if(tipoDeclaracion==2){
                window.location.href='#tituloD';
                document.getElementById('vista').src='../1-Dec_Patrimonial/10-bienes_inmuebles.html';
                $('#semaforoInmuebles').parent().addClass('active');
                $('#collapseOne').addClass('in')
            }else{
                window.location.href='#tituloD';
                document.getElementById('vista').src='../1-Dec_Patrimonial/9-servidor_publico.html';
                $('#semaforoAnteriorServidor').parent().addClass('active');
                $('#collapseOne').addClass('in')
            }
        break;
        case 9:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/10-bienes_inmuebles.html';
            $('#semaforoInmuebles').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 10:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/11-vehiculos.html';
            $('#semaforoVehiculo').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 11:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/12-bienes_muebles.html';
            $('#semaforoMuebles').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 12:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/13-inversiones.html';
            $('#semaforoInversiones').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 13:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/14-adeudos.html';
            $('#semaforoPasivos').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 14:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/15-prestamos.html';
            $('#semaforoPrestamos').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
        case 15:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../2-Dec_Intereses/1-empresas_sociedades.html';
            $('#semaforoEmpresas').parent().addClass('active');
            $('#collapseTwo').addClass('in')
        break;
        case 16:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../2-Dec_Intereses/2-instituciones.html';
            $('#semaforoInstituciones').parent().addClass('active');
            $('#collapseTwo').addClass('in')
        break;
        case 17:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../2-Dec_Intereses/3-apoyos_beneficios.html';
            $('#semaforoBeneficiosPublicos').parent().addClass('active');
            $('#collapseTwo').addClass('in')
        break;
        case 18:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../2-Dec_Intereses/4-representacion.html';
            $('#semaforoRepresentacion').parent().addClass('active');
            $('#collapseTwo').addClass('in')
        break;
        case 19:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../2-Dec_Intereses/5-clientes_principales.html';
            $('#semaforoClientes').parent().addClass('active');
            $('#collapseTwo').addClass('in')
        break;
        case 20:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../2-Dec_Intereses/6-beneficios_privados.html';
            $('#semaforoBeneficiosPrivados').parent().addClass('active');
            $('#collapseTwo').addClass('in')
        break;
        case 21:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../2-Dec_Intereses/7-fideicomisos.html';
            $('#semaforoFideicomisos').parent().addClass('active');
            $('#collapseTwo').addClass('in')
        break;
        case 22:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../Const_Dec_Fiscal/form_constancia.html';
            $('#semaforoDecFiscal').parent().addClass('active');
            $('#collapse3').addClass('in');
            alert('Recuerde enviar antes su Constancia de Declaración Fiscal para poder concluir.')
        break;
        default:
            window.location.href='#tituloD';
            document.getElementById('vista').src='../1-Dec_Patrimonial/1-datos_generales.html';
            $('#semaforoDatos').parent().addClass('active');
            $('#collapseOne').addClass('in')
        break;
    }
}



