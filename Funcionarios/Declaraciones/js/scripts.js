//Cambio de Formularios
function formDatosGenerales() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/1-datos_generales.html";
}
function formDomicilioDeclarante() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/2-domicilio_declarante.html";
}
function formDatosCurriculo() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/3-datos_curriculo.html";
}
function formDatosEmpleo() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/4-datos_empleo.html";
}
function formDatosEmpleoModificacion() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/4-datos_empleo_modificacion.html";
}
function formExperienciaLaboral() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/5-experiencia_laboral.html";
}
function formDatosPareja() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/6-datos_pareja.html";
}
function formDatosDependientes() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/7-datos_dependiente.html";
}
function formIngresosNetos() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/8-ingresos_netos.html";
}
function formServidorPublico() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/9-servidor_publico.html";
}
function formBienesInmuebles() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/10-bienes_inmuebles.html";
}
function formVehiculos() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/11-vehiculos.html";
}
function formBienesMuebles() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/12-bienes_muebles.html";
}
function formInversiones() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/13-inversiones.html";
}
function formAdeudos() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src = "../1-Dec_Patrimonial/14-adeudos.html";
}
function formPrestamos() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../1-Dec_Patrimonial/15-prestamos.html";
}

function formEmpresasSociedades() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../2-Dec_Intereses/1-empresas_sociedades.html";
}
function formInstituciones() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../2-Dec_Intereses/2-instituciones.html";
}
function formApoyosBeneficios() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../2-Dec_Intereses/3-apoyos_beneficios.html";
}
function formRepresentacion() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../2-Dec_Intereses/4-representacion.html";
}
function formClientesPrincipales() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../2-Dec_Intereses/5-clientes_principales.html";
}
function formBeneficiosPrivados() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../2-Dec_Intereses/6-beneficios_privados.html";
}
function formFideicomisos() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../2-Dec_Intereses/7-fideicomisos.html";
}
function formConstFiscal() {
  window.location.href = "#tituloD";
  document.getElementById("vista").src =
    "../Const_Dec_Fiscal/form_constancia.html";
}

/////////////// Variables ////////////////////////
var tipo_declaracion = sessionStorage.getItem("tipoDec");

///////////////////// funcion titulos /////////////////////////
function titulos(formulario) {
  switch (formulario) {
    case 4:
      if (tipoDeclaracion == 1) {
        $(".titulo").text("4. Datos del empleo, cargo o comisión que inicia");
        $(".tituloRuta").text("Datos del empleo, cargo o comisión");
      } else if (tipoDeclaracion == 2) {
        $(".titulo").text("4. Datos del empleo, cargo o comisión actual");
        $(".tituloRuta").text("Datos del empleo, cargo o comisión");
      } else {
        $(".titulo").text("4. Datos del empleo, cargo o comisión que concluye");
        $(".tituloRuta").text("Datos del empleo, cargo o comisión");
      }
      break;
    case 8:
      if (tipoDeclaracion == 1) {
        $(".titulo").text(
          "8. Ingresos netos del declarante, pareja y/o dependientes economicos (Situación actual)"
        );
        $(".tituloRuta").text(
          "Ingresos netos del declarante, pareja y/o dependientes economicos"
        );
      } else if (tipoDeclaracion == 2) {
        $(".titulo").text(
          "8. Ingresos netos del declarante, pareja y/o dependientes economicos (Entre el 1 de enero y 31 de diciembre del año inmediato anterior)"
        );
        $(".tituloRuta").text(
          "Ingresos netos del declarante, pareja y/o dependientes economicos"
        );
      } else {
        $(".titulo").text(
          "8. Ingresos del año en curso a la fecha de conclusión del empleo, cargo o comisión netos del declarante, pareja y/o dependientes economicos"
        );
        $(".tituloRuta").text(
          "Ingresos netos del declarante, pareja y/o dependientes economicos"
        );
      }
      break;
    case 10:
      if (tipoDeclaracion == 2) {
        $(".titulo").text(
          "9. Bienes inmuebles (Entre el 1 de enero y el 31 de diciembre del año inmediato anterior)"
        );
      }
      break;
    case 11:
      if (tipoDeclaracion == 2) {
        $(".titulo").text(
          "10. Vehículos (Entre el 1 de enero y el 31 de diciembre del año inmediato anterior)"
        );
      }
      break;
    case 12:
      if (tipoDeclaracion == 2) {
        $(".titulo").text(
          "11. Bienes muebles (Entre el 1 de enero y el 31 de diciembre del año inmediato anterior)"
        );
      }
      break;
    case 13:
      if (tipoDeclaracion == 2) {
        $(".titulo").text(
          "12. Inversiones, cuentas bancarias y otro tipo de valores/activos (Entre el 1 de enero y el 31 de diciembre del año inmediato anterior)"
        );
        $("#labelSaldo").text(
          "Saldo al 31 de diciembre del año anterior inmediato"
        );
      }
      break;
    case 14:
      if (tipoDeclaracion == 2) {
        $(".titulo").text(
          "13. Adeudos/Pasivos (Entre el 1 de enero y el 31 de diciembre del año inmediato anterior)"
        );
        $("#labelSaldo").text(
          "Saldo insoluto al 31 de diciembre del año anterior inmediato"
        );
      } else if (tipoDeclaracion == 1) {
        $("#labelSaldo").text("Saldo insoluto (Situación actual)");
      } else if (tipoDeclaracion == 3) {
        $("#labelSaldo").text(
          "Saldo insoluto a la fecha de conclusión del empleo"
        );
      }
      break;
    case 15:
      if (tipoDeclaracion == 2) {
        $(".titulo").text(
          "14. Préstamo o comodato por terceros (Entre el 1 de enero y el 31 de diciembre del año inmediato anterior)"
        );
      }
      break;
  }
}

$(document).ready(function () {
  $(".panel-body li a").click(function (e) {
    e.preventDefault();
    var menu = $(this);
    $(".panel-body li a").removeClass("active");
    $(this).addClass("active");
  });
});

////////////////////// Habilitar Envio Final //////////////
function revisarHabilitar() {
  $.ajax({
    url:
      ip +
      "/declaraciones/aplicaControl/selectControlAplica?tipo_declaracion=" +
      tipo_declaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": sessionStorage.getItem("token"),
    },
  })
    .done(function (datos) {
      habilitarEnvio(datos.result.data);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function habilitarEnvio(objeto) {
  var habilitar = true;
  var mensaje = "Aun no completa su declaración. Faltantes: \n";
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/findGlobalSemaphore?tipo_declaracion=" +
      tipo_declaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": sessionStorage.getItem("token"),
    },
  })
    .done(function (datos) {
      if (datos.status) {
        if (
          !datos.result.data.intereses_fideicomisos &&
          objeto.aplica_fideicomisos
        ) {
          habilitar = false;
          mensaje = mensaje + "Fideicomisos \n";
        }
        if (
          !datos.result.data.intereses_beneficios_privados &&
          objeto.aplica_beneficios_privados
        ) {
          habilitar = false;
          mensaje = mensaje + "Beneficios privados \n";
        }
        if (
          !datos.result.data.intereses_clientes_principales &&
          objeto.aplica_clientes_principales
        ) {
          habilitar = false;
          mensaje = mensaje + "Clientes principales \n";
        }
        if (
          !datos.result.data.intereses_representacion_activa &&
          objeto.aplica_representacion
        ) {
          habilitar = false;
          mensaje = mensaje + "Representación \n";
        }
        if (
          !datos.result.data.intereses_beneficios_publicos &&
          objeto.aplica_beneficios_publicos
        ) {
          habilitar = false;
          mensaje = mensaje + "Beneficios públicos \n";
        }
        if (
          !datos.result.data.intereses_instituciones &&
          objeto.aplica_part_instituciones
        ) {
          habilitar = false;
          mensaje = mensaje + "Participación en instituciones \n";
        }
        if (
          !datos.result.data.intereses_empresas_sociedades &&
          objeto.aplica_emp_soc
        ) {
          habilitar = false;
          mensaje = mensaje + "Empresas, sociendades y asociaciones \n";
        }
        if (
          !datos.result.data.pasivos_prestamo_comodato &&
          objeto.aplica_prestamo_comodato &&
          sessionStorage.getItem("declaracion_completa") == true
        ) {
          habilitar = false;
          mensaje = mensaje + "Prestamos o comodatos \n";
        }
        if (
          !datos.result.data.pasivos_adeudos &&
          objeto.aplica_adeudos &&
          sessionStorage.getItem("declaracion_completa") == true
        ) {
          habilitar = false;
          mensaje = mensaje + "Adeudos \n";
        }
        if (
          !datos.result.data.activos_inversiones_cuentas &&
          objeto.aplica_inversiones_cuentas &&
          sessionStorage.getItem("declaracion_completa") == true
        ) {
          habilitar = false;
          mensaje = mensaje + "Inversiones \n";
        }
        if (
          !datos.result.data.activos_bienes_muebles_nr &&
          objeto.aplica_bienes_muebles_nr &&
          sessionStorage.getItem("declaracion_completa") == true
        ) {
          habilitar = false;
          mensaje = mensaje + "Bienes muebles \n";
        }
        if (
          !datos.result.data.activos_bienes_muebles &&
          objeto.aplica_bienes_muebles &&
          sessionStorage.getItem("declaracion_completa") == true
        ) {
          habilitar = false;
          mensaje = mensaje + "Vehiculos \n";
        }
        if (
          !datos.result.data.activos_bienes_inmuebles &&
          objeto.aplica_bienes_inmuebles &&
          sessionStorage.getItem("declaracion_completa") == true
        ) {
          habilitar = false;
          mensaje = mensaje + "Bienes inmuebles \n";
        }
        if (
          !datos.result.data.anterior_servidor &&
          objeto.aplica_anterior_servidor
        ) {
          if (tipo_declaracion != 2) {
            habilitar = false;
            mensaje = mensaje + "Servidor público anteriormente \n";
          }
        }
        if (!datos.result.data.ingresos_netos) {
          habilitar = false;
          mensaje = mensaje + "Ingresos netos \n";
        }
        if (
          !datos.result.data.dependientes &&
          objeto.aplica_dependiente &&
          sessionStorage.getItem("declaracion_completa") == true
        ) {
          habilitar = false;
          mensaje = mensaje + "Dependiente Economico \n";
        }
        if (
          !datos.result.data.conyuge &&
          objeto.aplica_conyuge &&
          sessionStorage.getItem("declaracion_completa") == true
        ) {
          habilitar = false;
          mensaje = mensaje + "Pareja o conyuge \n";
        }
        if (!datos.result.data.exp_laboral && objeto.aplica_exp_laboral) {
          habilitar = false;
          mensaje = mensaje + "Experiencia laboral \n";
        }
        if (!datos.result.data.encargo_actual) {
          habilitar = false;
          mensaje = mensaje + "Encargo actual \n";
        }
        if (
          !datos.result.data.curriculo_declarante &&
          objeto.aplica_curriculo_declarante
        ) {
          habilitar = false;
          mensaje = mensaje + "Datos curriculares \n";
        }
        if (!datos.result.data.declarante_domicilio) {
          habilitar = false;
          mensaje = mensaje + "Domicilio \n";
        }
        if (!datos.result.data.informacion_general) {
          habilitar = false;
          mensaje = mensaje + "Datos generales \n";
        }

        if (habilitar) {
          publicoPrivado();
        } else {
          alert(mensaje);
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

//////////////// Get Ente Publico ////////////////
function entesPub() {
  $.ajax({
    url: ip + "/declaraciones/ente/getEntePublico",
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": sessionStorage.getItem("token"),
    },
  })
    .done(function (datos) {
      var x = document.getElementById("entePublico");
      var option;
      for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
        option = document.createElement("option");
        option.text = datos.result.data[i]["nombre_ente"];
        option.value = datos.result.data[i]["nombre_ente"];
        x.add(option);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
/////////////// Modal Recomendaciones //////////////////

$(document).ready(function () {
  if (sessionStorage.getItem("recomendaciones")) {
    $("#modalRecomendaciones").modal("toggle");
    sessionStorage.removeItem("recomendaciones");
  }
});
