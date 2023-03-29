var ip=sessionStorage.getItem("ip");
var resultado = sessionStorage.getItem("json");


function datosGenerales(){
    if(sessionStorage.getItem("tipo_declaracion")==2){
        $('#li_servidorAnterior').hide();
    }
    var data=JSON.parse(resultado);
    document.getElementById('nombre_completo').innerHTML=data.results[0].declaracion.situacionPatrimonial.datosGenerales.nombre + " " +
                                                        data.results[0].declaracion.situacionPatrimonial.datosGenerales.primerApellido + " " +
                                                        data.results[0].declaracion.situacionPatrimonial.datosGenerales.segundoApellido;
    document.getElementById('correo').innerHTML=data.results[0].declaracion.situacionPatrimonial.datosGenerales.correoElectronico.institucional;
    document.getElementById('encargo').innerHTML=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.empleoCargoComision;
}

function datosCurriculares(){
    var data=JSON.parse(resultado), contenidos='';
    if(data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante===undefined){
        $('#no_cuenta').text('El servidor público declara que no cuenta con datos curriculares');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad).length;i++){
            contenidos=contenidos + ' <div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-10">'+
                '<label>Institución educativa</label><br>'+
                    '<h4  style="padding: 0;text-align: left">'+data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[i].institucionEducativa.nombre+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group">' +
            '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Nivel</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[i].nivel.valor+'</h4>'+
                '</div>'
                if(data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[i].carreraAreaConocimiento != null &&  data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[i].carreraAreaConocimiento != ""){
                    contenidos=contenidos + '<div class="col-md-7">'+
                        '<label>Carrera o área de conocimiento</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[i].carreraAreaConocimiento+'</h4>'+
                    '</div>'
                }
            contenidos=contenidos + '</div><hr>'+
            '<div class="form-group">' +
                '<div class="col-md-1"></div>'+
                '<div class="col-md-4">'+
                    '<label>Documento obtenido</label><br>'+
                    '<h4  style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[i].documentoObtenido+'</h4>'+
                '</div>'+
                '<div class="col-md-5">'+
                    '<label>Fecha de obtención del documento</label><br>'+
                    '<h4 style="margin: 0"> '+data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[i].fechaObtencion+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-4">'+
                    '<label>Estatus</label><br>'+
                    '<h4  style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[i].estatus+'</h4>'+
                '</div>'+
                '<div class="col-md-6">'+
                    ' <label>Lugar donde se ubica la institución</label><br>'+
                    ' <h4 style="margin: 0"> '+data.results[0].declaracion.situacionPatrimonial.datosCurricularesDeclarante.escolaridad[i].institucionEducativa.ubicacion+' </h4>'+
                '</div>'+
            '</div><br><hr class="separador"><br>'
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosCargoActual(){
    if(sessionStorage.getItem("tipo_declaracion")==1){
        $('#titulo_form').text('2. Datos del empleo, cargo o comisión que inicia');
    }else if(sessionStorage.getItem("tipo_declaracion")==2){
        $('#titulo_form').text('2. Datos del empleo, cargo o comisión actual');
    }else if(sessionStorage.getItem("tipo_declaracion")==3){
        $('#titulo_form').text('2. Datos del empleo, cargo o comisión que concluye');
    }
    var data=JSON.parse(resultado), contenidos='';
    var contrato='No';
        var estado=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioMexico.entidadFederativa.valor;
        var municipio=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioMexico.municipioAlcaldia.valor;
        var colonia=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioMexico.coloniaLocalidad;
        var calle=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioMexico.calle;
        var cp=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioMexico.codigoPostal;
        var no_ext=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioMexico.numeroExterior;
        var no_int=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioMexico.numeroInterior;
        var pais='MX';
        if(data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.contratadoPorHonorarios){
            contrato='Si'
        }
        if(data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioExtranjero === undefined){
           
        }
        else if(data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioExtranjero.pais!='MX'){
            estado=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioExtranjero.estadoProvincia;
            municipio=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioExtranjero.ciudadLocalidad;
            colonia="";
            calle=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioExtranjero.calle;
            cp=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioExtranjero.codigoPostal;
            no_ext=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioExtranjero.numeroExterior;
            no_int=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioExtranjero.numeroInterior;
            pais=data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.domicilioExtranjero.pais;
        }
        contenidos=contenidos + '<div class="form-group">'+
            '<div class="col-md-1"></div>'+
            '<div class="col-md-10">'+
            '<label>Empleo, cargo o comisión</label><br>'+
                '<h4  style="padding: 0;text-align: left">'+data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.empleoCargoComision+'</h4>'+
            '</div>'+
        '</div><hr>'+
        '<div class="form-group">' +
            '<div class="col-md-1"></div>'+
            '<div class="col-md-3">'+
                '<label>Nivel / orden de gobierno</label><br>'+
                '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.nivelOrdenGobierno+'</h4>'+
            '</div>'+
            '<div class="col-md-4">'+
                '<label>Ámbito público</label><br>'+
                '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.ambitoPublico+'</h4>'+
            '</div>'+
            '<div class="col-md-4">'+
                '<label>¿Está contratado por honorarios?</label><br>'+
                '<h4 style="margin: 0">'+contrato+'</h4>'+
            '</div>'+
        '</div><hr>'+
        '<div class="form-group">' +
            '<div class="col-md-1"></div>'+
            '<div class="col-md-10">'+
                '<label>Nombre del ente público</label><br>'+
                '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.nombreEntePublico+'</h4>'+
            '</div>'+
        '</div><hr>'+
        '<div class="form-group"> '+
            '<div class="col-md-1"></div>'+
            '<div class="col-md-6">'+
                '<label>Area de adscripción</label><br>'+
                '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.areaAdscripcion+'</h4>'+
            '</div>'+
            '<div class="col-md-5">'+
                '<label>Nivel del empleo, cargo o comisión</label><br>'+
                '<h4  style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.nivelEmpleoCargoComision+'</h4>'+
            '</div>'+
        '</div><hr>'+
        '<div class="form-group">' +
            '<div class="col-md-1"></div>'+
            '<div class="col-md-10">'+
                ' <label>Especifique funciones principales</label><br>'+
                ' <h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.funcionPrincipal+'</h4>'+
            '</div>'+
        '</div><hr>'+
        '<div class="form-group"> '+
            '<div class="col-md-1"></div>'+
            '<div class="col-md-5">'+
                '<label>Fecha de toma de posesión</label><br>'+
                '<h4  style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.fechaTomaPosesion+'</h4>'+
            '</div>'+
            '<div class="col-md-5">'+
                '<label>Teléfono de oficina y extensión</label><br>'+
                '<h4  style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.telefonoOficina.telefono +'-'+ data.results[0].declaracion.situacionPatrimonial.datosEmpleoCargoComision.telefonoOficina.extension+'</h4>'+
            '</div>'+
        '</div><hr>'+
        '<div class="form-group"> '+
            '<div class="col-md-1"></div>'+
            '<div class="col-md-5">'+
                '<h4  style="margin: 0">Domicilio del empleo</h4>'+
                '<br>'+
                '<label>País</label><br>'+
                '<h4  style="margin: 0">'+pais +'</h4>'+
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
                '<h4  style="margin: 0">'+colonia +'</h4>'+
            '</div>'+
            '<div class="col-md-5">'+
                '<label>Calle</label><br>'+
                '<h4  style="margin: 0">'+calle +'</h4>'+
            '</div>'+
        '</div><hr>'+
        '<div class="form-group"> '+
            '<div class="col-md-1"></div>'+
            '<div class="col-md-3">'+
                '<label>Código postal</label><br>'+
                '<h4  style="margin: 0">'+cp +'</h4>'+
            '</div>'+
            '<div class="col-md-3">'+
                '<label>Número exterior</label><br>'+
                '<h4  style="margin: 0">'+no_ext +'</h4>'+
            '</div>'+
            '<div class="col-md-3">'+
                '<label>Número interior</label><br>'+
                '<h4  style="margin: 0">'+no_int+'</h4>'+
            '</div>'+
        '</div><br><hr class="separador"><br>'
    
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosExperienciaLaboral(){
    var data=JSON.parse(resultado), contenidos='';
    if(data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta con experiencia laboral anterior.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia).length;i++){
            var fecha_egreso=data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].fechaEgreso;
            if(fecha_egreso=="" || fecha_egreso==null){
                fecha_egreso="ENCARGO ACTUAL";
            }
            contenidos=contenidos + '<div class="form-group">'+
            '<div class="col-md-1"></div>'+
            '<div class="col-md-4">'+
                '<label>Fecha ingreso</label><br>'+
                '<h4 id="tiempo_encargo" style="padding: 0;text-align: left">'+
                data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].fechaIngreso +'</h4>'+
            '</div>'+
            '<div class="col-md-4">'+
                '<label>Fecha egreso</label><br>'+
                '<h4 id="tiempo_encargo" style="padding: 0;text-align: left">'+
                fecha_egreso +'</h4>'+
            '</div></div><hr>'

            if(data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].ambitoSector.clave=='PUB'){
                contenidos=contenidos+' <div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-7">'+
                    '<label>Empleo, cargo o comisión</label><br>'+
                    '<h4 id="puesto" style="padding: 0; text-align: left">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].empleoCargoComision+'</h4>'+
                '</div>'+
            '</div><hr>'
            + '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                    '<div class="col-md-5">'+
                        '<label>Nivel / orden de gobierno</label><br>'+
                        '<h4 id="nivel_gobierno" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].nivelOrdenGobierno+'</h4>'+
                    '</div>'+
                    '<div class="col-md-5">'+
                        '<label>Ámbito público</label><br>'+
                        '<h4 id="poder" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].ambitoPublico+'</h4>'+
                    '</div>'+
                '</div><hr>'
            +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-5">'+
                    '<label>Nombre del ente público</label><br>'+
                    '<h4 id="institucion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].nombreEntePublico+'</h4><br>'+
                '</div>'+
                '<div class="col-md-5">'+  
                    '<label>Área de adscripción</label><br>'+
                    '<h4 id="unidad_administrativa" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].areaAdscripcion+'</h4>'+
                '</div>'+
            '</div><hr>'
            +'<div class="form-group"> '+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-10">'+
                        '<label>Especifique funciones principales</label><br>'+
                        '<h4 id="institucion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].funcionPrincipal+'</h4><br>'+
                    '</div>'+
                '</div><hr>'
            }else{
                contenidos=contenidos+' <div class="form-group">'+
                '<div class="col-md-1"></div>'
                +'<div class="col-md-7">'+
                    '<label>Puesto</label><br>'+
                    '<h4 id="puesto" style="padding: 0; text-align: left">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].puesto+'</h4>'+
                '</div>'+
            '</div><hr>'
            +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-5">'+
                    '<label>Nombre de la empresa</label><br>'+
                    '<h4 id="institucion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].nombreEmpresaSociedadAsociacion+'</h4><br>'+
                '</div>'+
                '<div class="col-md-5">'+  
                    '<label>Sector al que pertenece</label><br>'+
                    '<h4 id="unidad_administrativa" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].area+'</h4>'+
                '</div>'+
            '</div><hr>'
            +'<div class="form-group"> '+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-10">'+
                        '<label>RFC</label><br>'+
                        '<h4 id="institucion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].rfc+'</h4><br>'+
                    '</div>'+
                '</div><hr>'
            }
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-5">'+    
                    '<label>Lugar donde se ubica</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.experienciaLaboral.experiencia[i].ubicacion+'</h4>'+
                '</div>'+
            '</div><br><hr class="separador"><br>'
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosIngresosNetos(){
    var data=JSON.parse(resultado), contenidos='';
    if(data.results[0].metadata.tipo.includes('INIC')){
        document.getElementById('ingresosCargoPublico').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.remuneracionMensualCargoPublico.valor;
        document.getElementById('totalOtrosIngresos').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.otrosIngresosMensualesTotal.valor;
        document.getElementById('ingresoDeclarante').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.ingresoMensualNetoDeclarante.valor;
        document.getElementById('ingresoTotal').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.totalIngresosMensualesNetos.valor;
        $('#remuneracion_cargo').text('I-Remuneración mensual neta del declarante por su cargo público (por conceptos de sueldos, honorarios, compensaciones, bonos y otras prestaciones)');
        $('#otros_ingresos').text('II-Otros ingresos mensuales del declarante (suma del II.1 al II.5)');
        $('#ingreso_declarante').text('A-Ingresos mensuales netos del declarante (suma del numeral I y II)');
        $('#total_ingreso').text('C-Total de ingresos mensuales netos percibidos por el declarante, pareja y/o dependientes económicos (suma de los apartados A y B)');
        $('#titulo_form').text('4. Ingresos netos del declarante, pareja y/o dependiente económico (Situación actual, cantidades netas después de impuestos)');
    }else if(data.results[0].metadata.tipo.includes('MODIFIC')){
        document.getElementById('ingresosCargoPublico').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.remuneracionAnualCargoPublico.valor;
        document.getElementById('totalOtrosIngresos').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.otrosIngresosAnualesTotal.valor;
        document.getElementById('ingresoDeclarante').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.ingresoAnualNetoDeclarante.valor;
        document.getElementById('ingresoTotal').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.totalIngresosAnualesNetos.valor;
        $('#remuneracion_cargo').text('I-Remuneración anual neta del declarante por su cargo público (por conceptos de sueldos, honorarios, compensaciones, bonos y otras prestaciones)');
        $('#otros_ingresos').text('II-Otros ingresos anuales del declarante (suma del II.1 al II.5)');
        $('#ingreso_declarante').text('A-Ingresos anuales netos del declarante (suma del numeral I y II)');
        $('#total_ingreso').text('C-Total de ingresos anuales netos percibidos por el declarante, pareja y/o dependientes económicos (suma de los apartados A y B)');
        $('#titulo_form').text('4. Ingresos netos del declarante, pareja y/o dependiente económico (Entre el 1 de enero y 31 de diciembre del año inmediato anterior, cantidades netas después de impuestos)');
    }else if(data.results[0].metadata.tipo.includes('CONCLU')){
        document.getElementById('ingresosCargoPublico').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.remuneracionConclusionCargoPublico.valor;
        document.getElementById('totalOtrosIngresos').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.otrosIngresosConclusionTotal.valor;
        document.getElementById('ingresoDeclarante').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.ingresoConclusionNetoDeclarante.valor;
        document.getElementById('ingresoTotal').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.ingresos.totalIngresosConclusionNetos.valor;
        $('#remuneracion_cargo').text('I-Remuneración neta del año en curso a la fecha de conclusión del empleo, cargo o comisión del declarante por su cargo público (por conceptos de sueldos, honorarios, compensaciones, bonos y otras prestaciones)');
        $('#otros_ingresos').text('II-Otros ingresos del declarante (suma del II.1 al II.5)');
        $('#ingreso_declarante').text('A-Ingresos netos del año en curso a la fecha de conclusión del empleo, cargo o comisión del declarante (suma del numeral I y II)');
        $('#total_ingreso').text('C-Total de ingresos netos del año en curso a la fecha de conclusión del empleo, cargo o comisión percibidos por el declarante, pareja y/o dependientes económicos (suma de los apartados A y B)');
        $('#titulo_form').text('4. Ingresos netos del declarante, pareja y/o dependiente económico (Del año en curso a la fecha de conclusión del empleo, cargo o comisión, cantidades netas después de impuestos)');
    }
    
    if(data.results[0].declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.actividades===undefined){}
    else{
        contenidos=contenidos +'<div class="form-group">'+
            '<div class="col-md-1"></div>'+
            '<div class="col-md-8">'+
                '<label>II.1 Total de ingresos por actividad industrial, comercial y/o empresarial</label><br>'+
                '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.remuneracionTotal.valor+'</h4><br>'+
            '</div>'+
        '</div>';
        for(var i=0;i<data.results[0].declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.actividades.length;i++){
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Ingresos</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.actividades[i].remuneracion.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-5">'+
                    '<label>Nombre o razón social</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.actividades[i].nombreRazonSocial+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Tipo de negocio</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.ingresos.actividadIndustialComercialEmpresarial.actividades[i].tipoNegocio+'</h4><br>'+
                '</div>'+
            '</div>';
        }
        contenidos=contenidos+'<hr>';
    }
    if(data.results[0].declaracion.situacionPatrimonial.ingresos.actividadFinanciera.actividades===undefined){}
    else{
        contenidos=contenidos +'<div class="form-group">'+
            '<div class="col-md-1"></div>'+
            '<div class="col-md-8">'+
                '<label>II.2 Total de ingresos por actividad financiera (rendimientos o ganancias)</label><br>'+
                '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.ingresos.actividadFinanciera.remuneracionTotal.valor+'</h4><br>'+
            '</div>'+
        '</div>';
        for(var i=0;i<data.results[0].declaracion.situacionPatrimonial.ingresos.actividadFinanciera.actividades.length;i++){
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Ingresos</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.ingresos.actividadFinanciera.actividades[i].remuneracion.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-7">'+
                    '<label>Tipo de actividad financiera</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.ingresos.actividadFinanciera.actividades[i].tipoInstrumento.valor+'</h4><br>'+
                '</div>'+
            '</div>';
        }
        contenidos=contenidos+'<hr>';
    }
    if(data.results[0].declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.servicios===undefined){}
    else{
        contenidos=contenidos +'<div class="form-group">'+
            '<div class="col-md-1"></div>'+
            '<div class="col-md-8">'+
                '<label>II.3 Total de ingresos por servicios profecionales, consejos, consultorías y/o asesorías</label><br>'+
                '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.remuneracionTotal.valor+'</h4><br>'+
            '</div>'+
        '</div>';
        for(var i=0;i<data.results[0].declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.servicios.length;i++){
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Ingresos</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.servicios[i].remuneracion.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-7">'+
                    '<label>Tipo de servicio profecional</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.ingresos.serviciosProfesionales.servicios[i].tipoServicio+'</h4><br>'+
                '</div>'+
            '</div>';
        }
        contenidos=contenidos+'<hr>';
    }
    if(data.results[0].declaracion.situacionPatrimonial.ingresos.otrosIngresos.ingresos===undefined){}
    else{
        contenidos=contenidos +'<div class="form-group">'+
            '<div class="col-md-1"></div>'+
            '<div class="col-md-8">'+
                '<label>II.4 Total de otros ingresos no considerados a los anteriores</label><br>'+
                '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.ingresos.otrosIngresos.remuneracionTotal.valor+'</h4><br>'+
            '</div>'+
        '</div>';
        for(var i=0;i<data.results[0].declaracion.situacionPatrimonial.ingresos.otrosIngresos.ingresos.length;i++){
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Ingresos</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.ingresos.otrosIngresos.ingresos[i].remuneracion.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-7">'+
                    '<label>Otro ingreso</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.ingresos.otrosIngresos.ingresos[i].tipoIngreso+'</h4><br>'+
                '</div>'+
            '</div>';
        }
        contenidos=contenidos+'<hr>';
    }
    if(!data.results[0].metadata.tipo.includes('INIC')){
        if(data.results[0].declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes===undefined){}
        else{
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-8">'+
                    '<label>II.5 Total de ingresos por enajenación de bienes</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.ingresos.enajenacionBienes.remuneracionTotal.valor+'</h4><br>'+
                '</div>'+
            '</div>';
            for(var i=0;i<data.results[0].declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes.length;i++){
                contenidos=contenidos +'<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Ingresos</label><br>'+
                        '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes[i].remuneracion.valor+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-7">'+
                        '<label>Tipo de bien enajenado</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.ingresos.enajenacionBienes.bienes[i].tipoBienEnajenado+'</h4><br>'+
                    '</div>'+
                '</div>';
            }
            contenidos=contenidos+'<hr>';
        }
    }
    
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosServidorAnterior(){
    var data=JSON.parse(resultado), contenidos='';
    if(!data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.servidorPublicoAnioAnterior){
        $('#no_cuenta').text('El servidor público declara que no se desempeño como servidor público el año anterior');
        $('.contenedor').hide();
    } else if(data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.servidorPublicoAnioAnterior){
        document.getElementById('fechaInicio').innerHTML=data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.fechaIngreso;
        document.getElementById('fechaFin').innerHTML=data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.fechaConclusion;
        document.getElementById('ingresosCargoPublico').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.remuneracionNetaCargoPublico.valor;
        document.getElementById('totalOtrosIngresos').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresosTotal.valor;
        document.getElementById('ingresoDeclarante').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.ingresoNetoAnualDeclarante.valor;
        document.getElementById('ingresoTotal').innerHTML='$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.totalIngresosNetosAnuales.valor;
        if(data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.actividades===undefined){}
        else{
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-8">'+
                    '<label>II.1 Total de ingresos por actividad industrial, comercial y/o empresarial</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.remuneracionTotal.valor+'</h4><br>'+
                '</div>'+
            '</div>';
            for(var i=0;i<data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.actividades.length;i++){
                contenidos=contenidos +'<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Ingresos</label><br>'+
                        '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.actividades[i].remuneracion.valor+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-5">'+
                        '<label>Nombre o razón social</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.actividades[i].nombreRazonSocial+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>Tipo de negocio</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadIndustialComercialEmpresarial.actividades[i].tipoNegocio+'</h4><br>'+
                    '</div>'+
                '</div>';
            }
            contenidos=contenidos+'<hr>';
        }
        if(data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.actividades===undefined){}
        else{
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-8">'+
                    '<label>II.2 Total de ingresos por actividad financiera (rendimientos o ganancias)</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.remuneracionTotal.valor+'</h4><br>'+
                '</div>'+
            '</div>';
            for(var i=0;i<data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.actividades.length;i++){
                contenidos=contenidos +'<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Ingresos</label><br>'+
                        '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.actividades[i].remuneracion.valor+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-7">'+
                        '<label>Tipo de actividad financiera</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.actividadFinanciera.actividades[i].tipoInstrumento.valor+'</h4><br>'+
                    '</div>'+
                '</div>';
            }
            contenidos=contenidos+'<hr>';
        }
        if(data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.servicios===undefined){}
        else{
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-8">'+
                    '<label>II.3 Total de ingresos por servicios profecionales, consejos, consultorías y/o asesorías</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.remuneracionTotal.valor+'</h4><br>'+
                '</div>'+
            '</div>';
            for(var i=0;i<data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.servicios.length;i++){
                contenidos=contenidos +'<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Ingresos</label><br>'+
                        '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.servicios[i].remuneracion.valor+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-7">'+
                        '<label>Tipo de servicio profecional</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.serviciosProfesionales.servicios[i].tipoServicio+'</h4><br>'+
                    '</div>'+
                '</div>';
            }
            contenidos=contenidos+'<hr>';
        }
        if(data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.ingresos===undefined){}
        else{
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-8">'+
                    '<label>II.4 Total de otros ingresos no considerados a los anteriores</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.remuneracionTotal.valor+'</h4><br>'+
                '</div>'+
            '</div>';
            for(var i=0;i<data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.ingresos.length;i++){
                contenidos=contenidos +'<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Ingresos</label><br>'+
                        '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.ingresos[i].remuneracion.valor+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-7">'+
                        '<label>Otro ingreso</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.otrosIngresos.ingresos[i].tipoIngreso+'</h4><br>'+
                    '</div>'+
                '</div>';
            }
            contenidos=contenidos+'<hr>';
        }
        if(data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.bienes===undefined){}
        else{
            contenidos=contenidos +'<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-8">'+
                    '<label>II.5 Total de ingresos por enajenación de bienes</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.remuneracionTotal.valor+'</h4><br>'+
                '</div>'+
            '</div>';
            for(var i=0;i<data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.bienes.length;i++){
                contenidos=contenidos +'<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Ingresos</label><br>'+
                        '<h4 style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.bienes[i].remuneracion.valor+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-7">'+
                        '<label>Tipo de bien enajenado</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.actividadAnualAnterior.enajenacionBienes.bienes[i].tipoBienEnajenado+'</h4><br>'+
                    '</div>'+
                '</div>';
            }
            contenidos=contenidos+'<hr>';
        }
        document.getElementById('contenido').innerHTML=contenidos;
        alturaMenu($('#contentSon').height());
    }else{
        $('#no_cuenta').text('El servidor público declara que no se desempeño como servidor público el año anterior');
    }
}

function datosBienesInmuebles(){
    var data=JSON.parse(resultado), contenidos='';
    if(sessionStorage.getItem("tipo_declaracion")==1){
        $('#titulo_form').text('6. Bienes inmuebles (Situación actual)');
    }else if(sessionStorage.getItem("tipo_declaracion")==2){
        $('#titulo_form').text('5. Bienes inmuebles (Entre el 1 de enero y 31 de diciembre del año inmediato anterior)');
    }else if(sessionStorage.getItem("tipo_declaracion")==3){
        $('#titulo_form').text('6. Bienes inmuebles (Situación actual)');
    }
    if(data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta o bien cuenta con bienes inmuebles en copropiedad con un tercero, por lo que lo anterior es información no pública.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble).length;i++){
            contenidos=contenidos + '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-5">'+
                    '<label>Tipo de inmueble</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].tipoInmueble.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-5">'+
                    '<label>¿El valor de adquisición es conforme a?</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].valorConformeA+'</h4><br>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Superficie del terreno</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].superficieTerreno.valor+' m2</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Superficie de construcción</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].superficieConstruccion.valor+' m2</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Valor de adquisición</label><br>'+
                    '<h4 style="margin: 0">$ '+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].valorAdquisicion.valor+'</h4><br>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Forma de adquisición</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].formaAdquisicion.valor+'</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Fecha de adquisición</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].fechaAdquiscion+'</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Forma de pago</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].formaPago+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-10">'+
                    '<label>Porcentaje de la propiedad del declarante conforme a escrituración o contrato</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].porcentajePropiedad+'%</h4>'+
                '</div>'+
            '</div>'
            if(data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].tercero != null  && data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].tercero.length>0){
                for(var j=0;j<data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].tercero.length;j++){
                    contenidos=contenidos +'<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Tercero</label><br>'+
                            '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Nombre o razón social</label><br>'+
                            '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].tercero[j].nombreRazonSocial+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Tipo de negocio</label><br>'+
                            '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].tercero[j].rfc+'</h4><br>'+
                        '</div>'+
                    '</div>';
                }
                contenidos=contenidos+'<hr>';
            }
            if(data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].transmisor != null  && data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].transmisor.length>0){
                for(var j=0;j<data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].transmisor.length;j++){
                contenidos=contenidos +'<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Transmisor</label><br>'+
                        '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                    '</div>'+
                    '<div class="col-md-5">'+
                        '<label>Nombre o razón social del transmisor</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].transmisor[j].nombreRazonSocial+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>RFC del transmisor</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesInmuebles.bienInmueble[i].transmisor[j].rfc+'</h4><br>'+
                    '</div>'+
                '</div>';
            }
        }
        contenidos=contenidos+ '</div><br><hr class="separador"><br>';
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosBienesMuebles(){
    var data=JSON.parse(resultado), contenidos='';
    if(sessionStorage.getItem("tipo_declaracion")==1){
        $('#titulo_form').text('7. Vehículos (Situación actual)');
    }else if(sessionStorage.getItem("tipo_declaracion")==2){
        $('#titulo_form').text('6. Vehículos (Entre el 1 de enero y 31 de diciembre del año inmediato anterior)');
    }else if(sessionStorage.getItem("tipo_declaracion")==3){
        $('#titulo_form').text('7. Vehículos (Situación actual)');
    }
    if(data.results[0].declaracion.situacionPatrimonial.vehiculos.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta o bien cuenta con vehículos en copropiedad con un tercero, por lo que lo anterior es información no pública.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo).length;i++){
            contenidos=contenidos + '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-7">'+
                    '<label>Tipo de vehículo</label><br>'+
                    '<h4 id="tipo_bien" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].tipoVehiculo.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Fecha de adquisición</label><br>'+
                    '<h4 id="fecha_adquisicion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].fechaAdquisicion+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Marca</label><br>'+
                    '<h4 id="marca" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].marca+'</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Modelo</label><br>'+
                    '<h4 id="modelo" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].modelo+'</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Año</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].anio+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    ' <label>Valor de adquisición</label><br>'+
                    ' <h4 id="precio_adquisicion" style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].valorAdquisicion.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                '<label>Forma de adquisición</label><br>'+
                    '<h4 id="forma_adquisicion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].formaAdquisicion.valor+'</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    ' <label>Forma de pago</label><br>'+
                    '<h4 id="relacion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].formaPago+'</h4>'+
                '</div>'+
            '</div><hr>';
            if(data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].tercero != null  && data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].tercero.length>0){
                for(var j=0;j<data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].tercero.length;j++){
                contenidos=contenidos +'<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Tercero</label><br>'+
                        '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                    '</div>'+
                    '<div class="col-md-5">'+
                        '<label>Nombre o razón social</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].tercero[j].nombreRazonSocial+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>Tipo de negocio</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].tercero[j].rfc+'</h4><br>'+
                    '</div>'+
                '</div>';
            }
            contenidos=contenidos+'<hr>';
            }
            if(data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].transmisor != null  && data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].transmisor.length>0){
                for(var j=0;j<data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].transmisor.length;j++){
                    contenidos=contenidos +'<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Transmisor</label><br>'+
                            '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Nombre o razón social del transmisor</label><br>'+
                            '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].transmisor[j].nombreRazonSocial+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>RFC del trasmisor</label><br>'+
                            '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.vehiculos.vehiculo[i].transmisor[j].rfc+'</h4><br>'+
                        '</div>'+
                    '</div>';
                }
            }
            contenidos=contenidos+ '</div><br><hr class="separador"><br>';
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosBienesMueblesNR(){
    var data=JSON.parse(resultado), contenidos='';
    if(sessionStorage.getItem("tipo_declaracion")==1){
        $('#titulo_form').text('8. Bienes muebles (Situación actual)');
    }else if(sessionStorage.getItem("tipo_declaracion")==2){
        $('#titulo_form').text('7. Bienes muebles (Entre el 1 de enero y 31 de diciembre del año inmediato anterior)');
    }else if(sessionStorage.getItem("tipo_declaracion")==3){
        $('#titulo_form').text('8. Bienes muebles (Situación actual)');
    }
    if(data.results[0].declaracion.situacionPatrimonial.bienesMuebles.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta o bien cuenta con bienes muebles en copropiedad con un tercero, por lo que lo anterior es información no pública.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble).length;i++){
            contenidos=contenidos + '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-7">'+
                    '<label>Tipo de bien</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].tipoBien.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Fecha de adquisición</label><br>'+
                    '<h4 id="fecha_adquisicion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].fechaAdquisicion+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-9">'+
                    '<label>Descripción general del bien</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].descripcionGeneralBien+'</h4><br>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Valor de adquisición</label><br>'+
                    '<h4 style="margin: 0">$ '+data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].valorAdquisicion.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                '<label>Forma de adquisición</label><br>'+
                    '<h4 id="forma_adquisicion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].formaAdquisicion.valor+'</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    ' <label>Forma de pago</label><br>'+
                    '<h4 id="relacion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].formaPago+'</h4>'+
                '</div>'+
            '</div><hr>';
            if(data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].tercero != null  && data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].tercero.length>0){
                for(var j=0;j<data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].tercero.length;j++){
                contenidos=contenidos +'<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Tercero</label><br>'+
                        '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                    '</div>'+
                    '<div class="col-md-5">'+
                        '<label>Nombre o razón social</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].tercero[j].nombreRazonSocial+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>Tipo de negocio</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].tercero[j].rfc+'</h4><br>'+
                    '</div>'+
                '</div>';
            }
            contenidos=contenidos+'<hr>';
            }
            if(data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].transmisor != null  && data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].transmisor.length>0){
                for(var j=0;j<data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].transmisor.length;j++){
                    contenidos=contenidos +'<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Transmisor</label><br>'+
                            '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Nombre o razón social del transmisor</label><br>'+
                            '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].transmisor[j].nombreRazonSocial+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>RFC del transmisor</label><br>'+
                            '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.bienesMuebles.bienMueble[i].transmisor[j].rfc+'</h4><br>'+
                        '</div>'+
                    '</div>';
                }
            }
            contenidos=contenidos+ '</div><br><hr class="separador"><br>';
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosInversionesCuentas(){
    var data=JSON.parse(resultado), contenidos='';
    if(sessionStorage.getItem("tipo_declaracion")==1){
        $('#titulo_form').text('9. Inversiones, cuentas bancarias y otros valores (Situación actual)');
    }else if(sessionStorage.getItem("tipo_declaracion")==2){
        $('#titulo_form').text('8. Inversiones, cuentas bancarias y otros valores (Entre el 1 de enero y 31 de diciembre del año inmediato anterior)');
    }else if(sessionStorage.getItem("tipo_declaracion")==3){
        $('#titulo_form').text('9. Inversiones, cuentas bancarias y otros valores (Situación actual)');
    }
    if(data.results[0].declaracion.situacionPatrimonial.inversiones.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta con inversiones o estan en copropiedad.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.situacionPatrimonial.inversiones.inversion).length;i++){
            var lugar = 'MÉXICO';
            if(data.results[0].declaracion.situacionPatrimonial.inversiones.inversion[i].localizacionInversion.pais=='146'){
                lugar = 'EXTRANJERO';
            }
            contenidos=contenidos + '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-5">'+
                    ' <label>Tipo de inversión / activo</label><br>'+
                    '<h4 id="tipo_inversion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.inversiones.inversion[i].tipoInversion.valor+'</h4>'+
                '</div>'+
                '<div class="col-md-6">'+
                    '<label>Tipo especifico de inversión</label><br>'+
                    '<h4 id="tipo_especifico" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.inversiones.inversion[i].subTipoInversion.valor+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-6">'+
                    '<label>Institución o razón social</label><br>'+
                    ' <h4 id="nombre_institucion" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.inversiones.inversion[i].localizacionInversion.institucionRazonSocial+'</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>RFC</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.inversiones.inversion[i].localizacionInversion.rfc+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-4">'+
                    '<label>¿Dónde se localiza la inversión / activo?</label><br>'+
                    '<h4 id="tipo_moneda" style="margin: 0">'+lugar+'</h4>'+
                '</div>'+
            '</div><hr>'
            if(data.results[0].declaracion.situacionPatrimonial.inversiones.inversion[i].tercero != null  && data.results[0].declaracion.situacionPatrimonial.inversiones.inversion[i].tercero.length>0){
                for(var j=0;j<data.results[0].declaracion.situacionPatrimonial.inversiones.inversion[i].tercero.length;j++){
                    contenidos=contenidos +'<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Tercero</label><br>'+
                            '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Nombre o razón social</label><br>'+
                            '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.inversiones.inversion[i].tercero[j].nombreRazonSocial+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>Tipo de negocio</label><br>'+
                            '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.inversiones.inversion[i].tercero[j].rfc+'</h4><br>'+
                        '</div>'+
                    '</div>';
                }
                contenidos=contenidos+'<hr>';
            }
            contenidos=contenidos+ '</div><br><hr class="separador"><br>';
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosDeudas(){
    var data=JSON.parse(resultado), contenidos='';
    if(sessionStorage.getItem("tipo_declaracion")==1){
        $('#titulo_form').text('10. Adeudos / pasivos (Situación actual)');
    }else if(sessionStorage.getItem("tipo_declaracion")==2){
        $('#titulo_form').text('9. Adeudos / pasivos (Entre el 1 de enero y 31 de diciembre del año inmediato anterior)');
    }else if(sessionStorage.getItem("tipo_declaracion")==3){
        $('#titulo_form').text('10. Adeudos / pasivos (Situación actual)');
    }
    if(data.results[0].declaracion.situacionPatrimonial.adeudos.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta o bien cuenta con adeudos y/o pasivos en copropiedad con un tercero, por lo que lo anterior es información no pública.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo).length;i++){
            contenidos=contenidos + '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-6">'+
                    '<label>Tipo de adeudo</label><br>'+
                    '<h4 id="tipo_acreedor" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].tipoAdeudo.valor+'</h4>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Fecha de adquisición del adeudo / pasivo</label><br>'+
                    '<h4 id="tasa_interes" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].fechaAdquision+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-4">'+
                    '<label>Monto original del adeudo / pasivo</label><br>'+
                    '<h4 id="pais" style="margin: 0">$'+data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].montoOriginal.valor+'</h4>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>¿Dónde se localiza el adeudo?</label><br>'+
                    ' <h4 id="fecha_adeudo" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].localizacionAdeudo.pais+'</h4>'+
                '</div>'+
            '</div><hr>'
            if(data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].tercero != null  && data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].tercero.length>0){
                for(var j=0;j<data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].tercero.length;j++){
                    contenidos=contenidos +'<div class="form-group">'+
                        '<div class="col-md-1"></div>'+
                        '<div class="col-md-3">'+
                            '<label>Tercero</label><br>'+
                            '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                        '</div>'+
                        '<div class="col-md-5">'+
                            '<label>Nombre o razón social</label><br>'+
                            '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].tercero[j].nombreRazonSocial+'</h4><br>'+
                        '</div>'+
                        '<div class="col-md-3">'+
                            '<label>RFC</label><br>'+
                            '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].tercero[j].rfc+'</h4><br>'+
                        '</div>'+
                    '</div>';
                }
                contenidos=contenidos+'<hr>';
            }
            if(data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].otorganteCredito.tipoPersona=="MORAL"){
                contenidos=contenidos + '<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Otorgante del crédito</label><br>'+
                        '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                    '</div>'+
                    '<div class="col-md-5">'+
                        '<label>Institución o razón social</label><br>'+
                        '<h4 id="pais" style="margin: 0">'+ data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].otorganteCredito.nombreInstitucion +'</h4>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>RFC</label><br>'+
                        '<h4 id="fecha_adeudo" style="margin: 0">'+ data.results[0].declaracion.situacionPatrimonial.adeudos.adeudo[i].otorganteCredito.rfc +'</h4>'+
                    '</div>'+
                '</div>'
            }
            contenidos=contenidos+ '</div><br><hr class="separador"><br>';
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosPrestamos(){
    var data=JSON.parse(resultado), contenidos='';
    if(sessionStorage.getItem("tipo_declaracion")==1){
        $('#titulo_form').text('11. Préstamo o comodato por terceros (Situación actual)');
    }else if(sessionStorage.getItem("tipo_declaracion")==2){
        $('#titulo_form').text('11. Préstamo o comodato por terceros (Entre el 1 de enero y 31 de diciembre del año inmediato anterior)');
    }else if(sessionStorage.getItem("tipo_declaracion")==3){
        $('#titulo_form').text('11. Préstamo o comodato por terceros (Situación actual)');
    }
    if(data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta con prestamos o comodatos.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo).length;i++){
            var tipoBien='No';
            if(data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo[i].tipoBien.inmueble != undefined || data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo[i].tipoBien.inmueble != null){
                tipoBien='Inmueble';
                contenidos=contenidos + '<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-4">'+
                        '<label>Tipo de bien</label><br>'+
                        '<h4 id="tipo_bien" style="margin: 0">'+tipoBien+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<label>Tipo de inmueble</label><br>'+
                        '<h4 id="tipo_bien" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo[i].tipoBien.inmueble.tipoInmueble.valor+'</h4><br>'+
                    '</div>'+
                '</div><hr>';
            }else{
                tipoBien='Vehículo';
                contenidos=contenidos + '<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-4">'+
                        '<label>Tipo de bien</label><br>'+
                        '<h4 id="tipo_bien" style="margin: 0">'+tipoBien+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-6">'+
                        '<label>Tipo de vehículo</label><br>'+
                        '<h4 id="tipo_bien" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo[i].tipoBien.vehiculo.tipo.valor+'</h4><br>'+
                    '</div>'+
                '</div><hr>'+
                '<div class="form-group"> '+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Marca</label><br>'+
                        '<h4 id="marca" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo[i].tipoBien.vehiculo.marca+'</h4>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>Modelo</label><br>'+
                        '<h4 id="modelo" style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo[i].tipoBien.vehiculo.modelo+'</h4>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>Año</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo[i].tipoBien.vehiculo.anio+'</h4>'+
                    '</div>'+
                '</div><hr>';
            }
            if(data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo[i].duenoTitular.tipoDuenoTitular== 'MORAL'){
                contenidos=contenidos + '<div class="form-group">'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-5">'+
                        '<label>Nombre del dueño o titular</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo[i].duenoTitular.nombreTitular+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-5">'+
                        '<label>RFC</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.situacionPatrimonial.prestamoOComodato.prestamo[i].duenoTitular.rfc+'</h4><br>'+
                    '</div>'+
                '</div><hr>'
            }
            contenidos=contenidos + '</div><br><hr class="separador"><br>';
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosEmpresas(){
    var data=JSON.parse(resultado), contenidos='';
    if(data.results[0].declaracion.interes.participacion.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta con participación en empresas, sociedades o asociaciones.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.interes.participacion.participacion).length;i++){
            var recibeRemuneracion='No';
            
            if(data.results[0].declaracion.interes.participacion.participacion[i].recibeRemuneracion){
                recibeRemuneracion='Si';
            }
            contenidos=contenidos +
                '<div class="form-group">'+
                    '<h4 style="padding: 0; text-align: left">'+data.results[0].declaracion.interes.participacion.participacion[i].tipoRelacion+'</h4><br>'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-6">'+
                        '<label>Nombre de la empresa, sociedad o asociación</label><br>'+
                        '<h4 id="nombre_empresa" style="margin: 0">'+data.results[0].declaracion.interes.participacion.participacion[i].nombreEmpresaSociedadAsociacion+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>RFC</label><br>'+
                        '<h4 id="rfc" style="margin: 0">'+data.results[0].declaracion.interes.participacion.participacion[i].rfc+'</h4><br>'+
                    '</div>'+
                '</div><hr>'+
                '<div class="form-group"> '+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Tipo de participación</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.interes.participacion.participacion[i].tipoParticipacion.valor+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>¿Recibe remuneración por su participación?</label><br>'+
                        '<h4 style="margin: 0">'+recibeRemuneracion+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>Monto mensual neto</label><br>'+
                        '<h4 style="margin: 0">$ '+data.results[0].declaracion.interes.participacion.participacion[i].montoMensual.valor+'</h4><br>'+
                    '</div>'+
                '</div><hr>'+
                '<div class="form-group"> '+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Porcentaje de participación de acuerdo a escritura</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.interes.participacion.participacion[i].porcentajeParticipacion+'%</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>Lugar donde se ubica</label><br>'+
                        '<h4 id="pais" style="margin: 0">'+data.results[0].declaracion.interes.participacion.participacion[i].ubicacion.pais+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>Sector productivo al que pertenece</label><br>'+
                        '<h4 id="sector_industria" style="margin: 0">'+data.results[0].declaracion.interes.participacion.participacion[i].sector.valor+'</h4><br>'+
                    '</div>'+
                '</div><br><hr class="separador"><br>'
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosInstituciones(){
    var data=JSON.parse(resultado), contenidos='';
    if(data.results[0].declaracion.interes.participacionTomaDecisiones.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta con participación en instituciones.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.interes.participacionTomaDecisiones.participacion).length;i++){
            var remuneracion='No';
            if(data.results[0].declaracion.interes.participacionTomaDecisiones.participacion[i].recibeRemuneracion){
                remuneracion='Si'
            }
            contenidos=contenidos +
                '<div class="form-group">'+
                    '<h4 style="padding: 0; text-align: left">'+data.results[0].declaracion.interes.participacionTomaDecisiones.participacion[i].tipoRelacion+'</h4><br>'+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-6">'+
                        '<label>Tipo de institución</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.interes.participacionTomaDecisiones.participacion[i].tipoInstitucion.valor+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>Puesto / Rol</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.interes.participacionTomaDecisiones.participacion[i].puestoRol+'</h4><br>'+
                    '</div>'+
                '</div><hr>'+
                '<div class="form-group"> '+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Fecha de inicio de particpación dentro de la institución</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.interes.participacionTomaDecisiones.participacion[i].fechaInicioParticipacion+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>¿Recibe remuneración por su participación?</label><br>'+
                        '<h4 style="margin: 0">'+remuneracion+'</h4><br>'+
                    '</div>'+
                    '<div class="col-md-3">'+
                        '<label>Monto mensual neto</label><br>'+
                        '<h4 style="margin: 0">$ '+data.results[0].declaracion.interes.participacionTomaDecisiones.participacion[i].montoMensual.valor+'</h4><br>'+
                    '</div>'+
                '</div><hr>'+
                '<div class="form-group"> '+
                    '<div class="col-md-1"></div>'+
                    '<div class="col-md-3">'+
                        '<label>Lugar donde se ubica</label><br>'+
                        '<h4 style="margin: 0">'+data.results[0].declaracion.interes.participacionTomaDecisiones.participacion[i].ubicacion.pais+'</h4><br>'+
                    '</div>'+
                '</div><br><hr class="separador"><br>'
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosApoyosPublicos(){
    var data=JSON.parse(resultado), contenidos='';
    if(data.results[0].declaracion.interes.apoyos.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta con apoyos o beneficios públicos.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.interes.apoyos.apoyo).length;i++){
            contenidos=contenidos +
            '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-5">'+
                    '<label>Nombre del programa</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.apoyos.apoyo[i].nombrePrograma+'</h4><br>'+
                '</div>'+
                '<div class="col-md-5">'+
                    '<label>Institución que otorga el apoyo</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.apoyos.apoyo[i].institucionOtorgante+'</h4><br>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Nivel u orden de gobierno</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.apoyos.apoyo[i].nivelOrdenGobierno+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Tipo de apoyo</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.apoyos.apoyo[i].tipoApoyo.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Forma de recepción del apoyo</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.apoyos.apoyo[i].formaRecepcion+'</h4><br>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group">'+
                '<div class="col-md-1"></div>'

            if(data.results[0].declaracion.interes.apoyos.apoyo[i].formaRecepcion == 'MONETARIO'){
                contenidos=contenidos +'<div class="col-md-3">'+
                    '<label>Monto aproximado del apoyo mensual</label><br>'+
                    '<h4 style="margin: 0">$ '+data.results[0].declaracion.interes.apoyos.apoyo[i].montoApoyoMensual.valor+'</h4><br>'+
                '</div>'
            }else{
                contenidos=contenidos +'<div class="col-md-3">'+
                    '<label>Especifique el apoyo</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.apoyos.apoyo[i].especifiqueApoyo+'</h4><br>'+
                '</div>'
            }

            contenidos=contenidos +'</div><br><hr class="separador"><br>'
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosRepActiva(){
    var data=JSON.parse(resultado), contenidos='';
    if(data.results[0].declaracion.interes.representacion.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta con representación.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.interes.representacion.representacion).length;i++){
            var remuneracion='No';
            if(data.results[0].declaracion.interes.representacion.representacion[i].recibeRemuneracion){
                remuneracion='Si'
            }
            contenidos=contenidos +
            '<div class="form-group">'+
                '<h4 style="padding: 0; text-align: left">'+data.results[0].declaracion.interes.representacion.representacion[i].tipoRelacion+'</h4><br>'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Tipo de representación</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.representacion.representacion[i].tipoRepresentacion+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Fecha de inicio de la representación</label><br>'+
                    '<h4 id="fecha_inicio" style="margin: 0">'+data.results[0].declaracion.interes.representacion.representacion[i].fechaInicioRepresentacion+'</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Lugar donde se ubica</label><br>'+
                    '<h4 id="sector_industria" style="margin: 0">'+data.results[0].declaracion.interes.representacion.representacion[i].ubicacion.pais+'</h4><br>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>¿Recibe remuneración por su representación?</label><br>'+
                    '<h4 style="margin: 0">'+remuneracion+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Monto mensual neto de su representación</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.interes.representacion.representacion[i].montoMensual.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Sector productivo al que pertenece</label><br>'+
                    '<h4 id="sector_industria" style="margin: 0">'+data.results[0].declaracion.interes.representacion.representacion[i].sector.valor+'</h4><br>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Representante / Representado</label><br>'+
                    '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Nombre o razón social del Representante / Representado</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.representacion.representacion[i].nombreRazonSocial+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>RFC del Representante / Representado</label><br>'+
                    '<h4 id="sector_industria" style="margin: 0">'+data.results[0].declaracion.interes.representacion.representacion[i].rfc+'</h4><br>'+
                '</div>'+                        
            '</div><br><hr class="separador"><br>'
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosClientesPrincipales(){
    var data=JSON.parse(resultado), contenidos='';
    if(data.results[0].declaracion.interes.clientesPrincipales.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta con clientes principales.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.interes.clientesPrincipales.cliente).length;i++){
            contenidos=contenidos +
            '<div class="form-group">'+
                '<h4 style="padding: 0; text-align: left">'+data.results[0].declaracion.interes.clientesPrincipales.cliente[i].tipoRelacion+'</h4><br>'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-5">'+
                    '<label>Nombre de la empresa o servicio que proporciona</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.clientesPrincipales.cliente[i].empresa.nombreEmpresaServicio+'</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>RFC de la empresa</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.clientesPrincipales.cliente[i].empresa.rfc+'</h4><br>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Cliente principal</label><br>'+
                    '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Nombre o razón social del cliente principal</label><br>'+
                    '<h4 id="registro" style="margin: 0">'+data.results[0].declaracion.interes.clientesPrincipales.cliente[i].clientePrincipal.nombreRazonSocial+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>RFC del cliente principal</label><br>'+
                    '<h4 id="sector_industria" style="margin: 0">'+data.results[0].declaracion.interes.clientesPrincipales.cliente[i].clientePrincipal.rfc+'</h4><br>'+
                '</div>'+ 
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Monto aproximado del beneficio o ganancia mensual que obtiene del cliente principal</label><br>'+
                    '<h4 style="margin: 0">$ '+data.results[0].declaracion.interes.clientesPrincipales.cliente[i].montoAproximadoGanancia.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Lugar donde se ubica</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.clientesPrincipales.cliente[i].ubicacion.pais+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Sector productivo al que pertenece</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.clientesPrincipales.cliente[i].sector.valor+'</h4><br>'+
                '</div>'+
            '</div><br><hr class="separador"><br>'
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosBeneficiosGratuitos(){
    var data=JSON.parse(resultado), contenidos='';
    if(data.results[0].declaracion.interes.beneficiosPrivados.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta con beneficios privados.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.interes.beneficiosPrivados.beneficio).length;i++){
            contenidos=contenidos +
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Otorgante</label><br>'+
                    '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                '</div>'+
                '<div class="col-md-5">'+
                    '<label>Nombre o razón social del otorgante</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.beneficiosPrivados.beneficio[i].otorgante.nombreRazonSocial+'</h4><br>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>RFC del otorgante</label><br>'+
                    '<h4 id="sector_industria" style="margin: 0">'+data.results[0].declaracion.interes.beneficiosPrivados.beneficio[i].otorgante.rfc+'</h4><br>'+
                '</div>'+ 
            '</div><hr>'+
            '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Tipo de beneficio</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.beneficiosPrivados.beneficio[i].tipoBeneficio.valor+'</h4><br>'+
                '</div>'+
                '<div class="col-md-5">'+
                    '<label>Sector productivo al que pertenece</label><br>'+
                    '<h4 id="sector_industria" style="margin: 0">'+data.results[0].declaracion.interes.beneficiosPrivados.beneficio[i].sector.valor+'</h4><br>'+    
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>Forma de recepción del beneficio</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.beneficiosPrivados.beneficio[i].formaRecepcion+'</h4><br>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group">'+
                '<div class="col-md-1"></div>'
            if(data.results[0].declaracion.interes.beneficiosPrivados.beneficio[i].formaRecepcion == 'MONETARIO'){
                contenidos=contenidos +'<div class="col-md-3">'+
                    '<label>Monto mensual aproximado del beneficio</label><br>'+
                    '<h4 style="margin: 0">$'+data.results[0].declaracion.interes.beneficiosPrivados.beneficio[i].montoMensualAproximado.valor+'</h4><br>'+
                '</div>'
            }else{
                contenidos=contenidos +'<div class="col-md-3">'+
                    '<label>Especifique el beneficio</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.beneficiosPrivados.beneficio[i].especifiqueBeneficio+'</h4><br>'+
                '</div>'
            }

            contenidos=contenidos +'</div><br><hr class="separador"><br>'
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}

function datosFideicomisos(){
    var data=JSON.parse(resultado), contenidos='';
    if(data.results[0].declaracion.interes.fideicomisos.ninguno){
        $('#no_cuenta').text('El servidor público declara que no cuenta con fideicomisos.');
    }else{
        for(var i=0;i<Object.keys(data.results[0].declaracion.interes.fideicomisos.fideicomiso).length;i++){
            contenidos=contenidos +
            '<div class="form-group">'+
                '<h4 style="padding: 0; text-align: left">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].tipoRelacion+'</h4><br>'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-4">'+
                    '<label>Tipo de fideicomiso</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].tipoFideicomiso+'</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Tipo de participación</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].tipoParticipacion+'</h4><br>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Fideicomisario</label><br>'+
                    '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Nombre o razón social del Fideicomisario</label><br>'+
                    '<h4 id="fiduciario" style="margin: 0">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].fideicomisario.nombreRazonSocial+'</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>RFC Fideicomisario</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].fideicomisario.rfc+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Fideicomitente</label><br>'+
                    '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Nombre o razón social del Fideicomitente</label><br>'+
                    '<h4  style="margin: 0">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].fideicomitente.nombreRazonSocial+'</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>RFC Fideicomitente</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].fideicomitente.rfc+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group"> '+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-3">'+
                    '<label>Fiduciario</label><br>'+
                    '<h4 style="margin: 0">PERSONA MORAL</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Nombre o razón social del Fiduciario</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].fiduciario.nombreRazonSocial+'</h4>'+
                '</div>'+
                '<div class="col-md-3">'+
                    '<label>RFC Fiduciario</label><br>'+
                    '<h4 id="rfc_fideicomitente" style="margin: 0">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].fiduciario.rfc+'</h4>'+
                '</div>'+
            '</div><hr>'+
            '<div class="form-group">'+
                '<div class="col-md-1"></div>'+
                '<div class="col-md-4">'+
                    '<label>¿Dónde se localiza el fideicomiso?</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].extanjero+'</h4><br>'+
                '</div>'+
                '<div class="col-md-4">'+
                    '<label>Sector productivo al que pertenece</label><br>'+
                    '<h4 style="margin: 0">'+data.results[0].declaracion.interes.fideicomisos.fideicomiso[i].sector.valor+'</h4><br>'+
                '</div>'+
            '</div><br><hr class="separador"><br>'
        }
    }
    document.getElementById('contenido').innerHTML=contenidos;
    alturaMenu($('#contentSon').height());
}