function insertUpdate(form) {
  if (actualizar == true) {
    switch (form) {
      case 1:
        actualizarDatosGenerales();
        break;
      case 2:
        actualizarDomicilio();
        break;
      case 3:
        actualizarDatosCurriculo();
        break;
      case 4:
        actualizarEmpleo();
        break;
      case 5:
        if ($("#trabajo_actual")[0].checked == true) {
          actualizarExpLaboral();
        } else {
          if (verificarFecha()) {
            actualizarExpLaboral();
          }
        }
        break;
      case 6:
        actualizarDatosParejaDependiente(true);
        break;
      case 7:
        actualizarDatosParejaDependiente(false);
        break;
      case 8:
        actualizarIngresosNetos();
        break;
      case 9:
        if (verificarFecha()) {
          actualizarServidorPublico();
        }
        break;
      case 10:
        actualizarBienesInmuebles();
        break;
      case 11:
        actualizarVehiculos();
        break;
      case 12:
        actualizarBienesMuebles();
        break;
      case 13:
        actualizarInversiones();
        break;
      case 14:
        actualizarAdeudos();
        break;
      case 15:
        actualizarPrestamos();
        break;
      case 16:
        actualizarEmpresasSociedades();
        break;
      case 17:
        actualizarInstituciones();
        break;
      case 18:
        actualizarApoyosBeneficios();
        break;
      case 19:
        actualizarRepresentacion();
        break;
      case 20:
        actualizarClientesPrincipales();
        break;
      case 21:
        actualizarBeneficiosPrivados();
        break;
      case 22:
        actualizarFideicomisos();
        break;
    }
  } else {
    switch (form) {
      case 1:
        insertarDatosGenerales();
        break;
      case 2:
        insertarDomicilio();
        break;
      case 3:
        insertarDatosCurriculo();
        break;
      case 4:
        insertarEmpleo();
        break;
      case 5:
        if ($("#trabajo_actual")[0].checked == true) {
          insertarExpLaboral();
        } else {
          if (verificarFecha()) {
            insertarExpLaboral();
          }
        }
        break;
      case 6:
        insertarDatosParejaDependiente(true);
        break;
      case 7:
        insertarDatosParejaDependiente(false);
        break;
      case 8:
        insertarIngresosNetos();
        break;
      case 9:
        if (verificarFecha()) {
          insertarServidorPublico();
        }
        break;
      case 10:
        insertarBienesInmuebles();
        break;
      case 11:
        insertarVehiculos();
        break;
      case 12:
        insertarBienesMuebles();
        break;
      case 13:
        insertarInversiones();
        break;
      case 14:
        insertarAdeudos();
        break;
      case 15:
        insertarPrestamos();
        break;
      case 16:
        insertarEmpresasSociedades();
        break;
      case 17:
        insertarInstituciones();
        break;
      case 18:
        insertarApoyosBeneficios();
        break;
      case 19:
        insertarRepresentacion();
        break;
      case 20:
        insertarClientesPrincipales();
        break;
      case 21:
        insertarBeneficiosPrivados();
        break;
      case 22:
        insertarFideicomisos();
        break;
    }
  }
}

function nuevoRegistro() {
  $("#formCompleto").show();
  $("#completo").prop("checked", false);
}

function nuevoCurriculo() {
  $("#formCompleto").show();
  $("#completo").prop("checked", false);
}

function verificarFecha() {
  var pasa = false;
  var fecha1 = document
    .getElementById("fecIngreso")
    .value.split("/")
    .reverse()
    .join("/");
  var fecha2 = document
    .getElementById("fecSalida")
    .value.split("/")
    .reverse()
    .join("/");
  var fechaIngreso = new Date(fecha1);
  var fechaSalida = new Date(fecha2);
  if (fechaIngreso < fechaSalida) {
    pasa = true;
  } else {
    alert("La fecha de ingreso debe ser menor a la fecha de salida.");
  }
  return pasa;
}

function obligarFinalizado() {
  var mandarMensaje = false;
  var niveles = [
    "PRIMARIA",
    "SECUNDARIA",
    "BACHILLERATO",
    "CARRERA TECNICA O COMERCIAL",
    "LICENCIATURA",
    "ESPECIALIDAD",
    "MAESTRIA",
    "DOCTORADO",
  ];
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/declarante/findCurricularSemaphore?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
        var selector = document.getElementById("nivelCurriculo");
        var selTam = selector.options.length;
        for (var j = selTam - 1; j > -1; j--) {
          selector.options[j] = null;
        }
        var x = document.getElementById("nivelCurriculo");
        var option;
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          if (!datos.result.data[i].inserted) {
            $("#estatus").val("FINALIZADO");
            $("#estatus").attr("disabled", "disabled");
            mandarMensaje = true;
            option = document.createElement("option");
            option.text = datos.result.data[i].level;
            option.value = datos.result.data[i].level;
            x.add(option);
          }
        }
        if (!mandarMensaje) {
          for (i = 0; i < 8; i++) {
            option = document.createElement("option");
            option.text = niveles[i];
            option.value = niveles[i];
            x.add(option);
          }
        }
        if (
          $("#nivelCurriculo").val() == "PRIMARIA" ||
          $("#nivelCurriculo").val() == "SECUNDARIA" ||
          $("#nivelCurriculo").val() == "BACHILLERATO"
        ) {
          $("#contCarrera").hide();
        } else {
          $("#contCarrera").show();
        }
      } else {
        alert(datos.msg);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      if (
        jqXHR.responseJSON.msg !=
        "Error general del sistema!Contacta al Administrador. null"
      ) {
        alert(jqXHR.responseJSON.msg);
      }
    });
}
