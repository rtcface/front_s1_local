function selectAllDatosCurriculo() {
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteCurriculo?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Institución</th><th>Estatus</th><th>Documento<br> Obtenido</th> <th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["institucion_educativa"] +
            "</td> <td>" +
            datos.result.data[i]["estatus"] +
            "</td> <td>" +
            datos.result.data[i]["documento_avala"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#nivelMax").text("Seleccione el nivel máximo de estudios");
          document.getElementById("ultimoGrado").checked = true;
          $("#checkUltimoGrado").hide();
          marcarAplica(1);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllEmpleo() {
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteEncargoActual?tipo_declaracion=" +
      tipoDeclaracion +
      "&id_declarador=",
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Ente público</th><th>Cargo</th><th>Nivel</th><th>Poder</th> <th>Seleccionar</th></tr>";
      var i = 0;
      if (datos.status) {
        for (i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["ente_publico"] +
            "</td> <td>" +
            datos.result.data[i]["cargo_comision"] +
            "</td> <td>" +
            datos.result.data[i]["nivel"] +
            "</td> <td>" +
            datos.result.data[i]["poder"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
        if (i > 1) {
          $("#agregar_nuevo").hide();
        } else {
          $("#agregar_nuevo").show();
        }
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllExpLaboral() {
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteExperienciaLaboral?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Ámbito</th><th>Nivel</th><th>Poder</th><th>Institución</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          var poder = "",
            nivel = "";
          if (datos.result.data[i]["nivel"] != null) {
            nivel = datos.result.data[i]["nivel"];
          }
          if (datos.result.data[i]["poder"] != null) {
            poder = datos.result.data[i]["poder"];
          }
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["ambito"] +
            "</td> <td>" +
            nivel +
            "</td> <td>" +
            poder +
            "</td> <td>" +
            datos.result.data[i]["nombre_institucion"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(2);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllDatosParejaDependiente(pareja) {
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteConyugeDep?tipo_declaracion=" +
      tipoDeclaracion +
      "&conyuge=" +
      pareja,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Tipo de relación</th><th>Nombre(s)</th><th>Primer apellido</th><th>Segundo apellido</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          var apellido2 = "";
          if (datos.result.data[i]["apellido_materno"] != null) {
            apellido2 = datos.result.data[i]["apellido_materno"];
          }
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["tipo_relacion"] +
            "</td> <td>" +
            datos.result.data[i]["nombres"] +
            "</td> <td>" +
            datos.result.data[i]["apellido_paterno"] +
            "</td> <td>" +
            apellido2 +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          if (pareja) {
            marcarAplica(3);
          } else {
            marcarAplica(4);
          }
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllBienesInmuebles() {
  $.ajax({
    url:
      ip +
      "/declaraciones/activos/selectActivosBienesInmuebles?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Tipo de inmueble</th><th>Titular</th><th>Porcentaje de propiedad</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["tipo_bien"] +
            "</td> <td>" +
            datos.result.data[i]["titular"] +
            "</td> <td>" +
            datos.result.data[i]["porcentaje_propiedad"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(6);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllVehiculos() {
  $.ajax({
    url:
      ip +
      "/declaraciones/activos/selectActivosVehiculos?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Tipo de vehículo</th><th>Titular</th><th>Marca</th><th>Modelo</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["tipo_mueble"] +
            "</td> <td>" +
            datos.result.data[i]["titular"] +
            "</td> <td>" +
            datos.result.data[i]["marca"] +
            "</td> <td>" +
            datos.result.data[i]["modelo"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(7);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllBienesMuebles() {
  $.ajax({
    url:
      ip +
      "/declaraciones/activos/selectActivosBienesMueblesNR?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Tipo de mueble</th><th>Descripción</th><th>Titular</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["tipo_bien"] +
            "</td> <td>" +
            datos.result.data[i]["descripcion_bien"] +
            "</td> <td>" +
            datos.result.data[i]["titular"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(8);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllInversiones() {
  $.ajax({
    url:
      ip +
      "/declaraciones/activos/selectActivosInversionesCuentas?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Tipo de Inversión</th><th>Número de cuenta</th><th>Titular</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["tipo_inversion"] +
            "</td> <td>" +
            datos.result.data[i]["cuenta_contrato"] +
            "</td> <td>" +
            datos.result.data[i]["titular"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(9);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllAdeudos() {
  $.ajax({
    url:
      ip +
      "/declaraciones/pasivos/selectPasivosAdeudos?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Titular</th><th>Número de cuenta</th><th>Fecha Adeudo</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["titular_adeudo"] +
            "</td> <td>" +
            datos.result.data[i]["no_cuenta"] +
            "</td> <td>" +
            datos.result.data[i]["fecha_adeudo"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(10);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllPrestamos() {
  $.ajax({
    url:
      ip +
      "/declaraciones/pasivos/selectPasivosPrestamoComodato?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Tipo de bien</th><th>Nombre del titular</th><th>RFC</th><th>Tipo de relación</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          var bien = "";
          if (datos.result.data[i]["inmueble"]) {
            bien = "Inmueble";
          } else {
            bien = "Vehículo";
          }
          tabla =
            tabla +
            "<tr><td>" +
            bien +
            "</td> <td>" +
            datos.result.data[i]["titular_vehiculo"] +
            "</td> <td>" +
            datos.result.data[i]["rfc_titular_vehiculo"] +
            "</td> <td>" +
            datos.result.data[i]["relacion_titular"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(11);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllEmpresasSociedades() {
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesEmpSoc?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Nombre empresa o sociedad</th><th>RFC</th><th>Porcentaje de participación</th><th>Tipo de participación</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["nombre"] +
            "</td> <td>" +
            datos.result.data[i]["rfc"] +
            "</td> <td>" +
            datos.result.data[i]["porcentaje_participacion"] +
            "</td> <td>" +
            datos.result.data[i]["tipo_participacion"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(12);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllInstituciones() {
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesInstituciones?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Nombre</th><th>RFC</th><th>Puesto</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["nombre_institucion"] +
            "</td> <td>" +
            datos.result.data[i]["rfc"] +
            "</td> <td>" +
            datos.result.data[i]["puesto_rol"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(13);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllApoyosBeneficios() {
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesBeneficiosPublicos?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Beneficiario</th><th>Nombre del programa</th><th>Institución que lo otorga</th><th>Nivel de gobierno</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["beneficiario"] +
            "</td> <td>" +
            datos.result.data[i]["nombre_programa"] +
            "</td> <td>" +
            datos.result.data[i]["nombre_otorgante"] +
            "</td> <td>" +
            datos.result.data[i]["nivel"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(14);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllRepresentacion() {
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesRepresentacionActiva?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Tipo de representación</th><th>Nombre o razón social</th><th>RFC</th><th>Monto de la representación</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["tipo_repreentacion"] +
            "</td> <td>" +
            datos.result.data[i]["nombre_representado"] +
            "</td> <td>" +
            datos.result.data[i]["rfc_representado"] +
            "</td> <td>" +
            datos.result.data[i]["monto_representacion"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(15);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllClientesPrincipales() {
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesClientesPrincipales?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Nombre de la empresa</th><th>RFC de la empresa</th><th>Nombre del cliente</th><th>RFC del cliente</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["nombre_empresa"] +
            "</td> <td>" +
            datos.result.data[i]["rfc_empresa"] +
            "</td> <td>" +
            datos.result.data[i]["nombre_cte_principal"] +
            "</td> <td>" +
            datos.result.data[i]["rfc_cte_principal"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(16);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllBeneficiosPrivados() {
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesBeneficiosPrivados?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Tipo de beneficio</th><th>Beneficiario</th><th>Nombre del otorgante</th><th>RFC</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["tipo_beneficio"] +
            "</td> <td>" +
            datos.result.data[i]["beneficiario"] +
            "</td> <td>" +
            datos.result.data[i]["nombre_otorgante"] +
            "</td> <td>" +
            datos.result.data[i]["rfc_otorgante"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(17);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function selectAllFideicomisos() {
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesFideicomisos?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      var tabla =
        "<tr><th>Tipo de fideicomiso</th><th>Tipo de participación</th><th>RFC del fideicomiso</th><th>Seleccionar</th></tr>";
      if (datos.status) {
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          tabla =
            tabla +
            "<tr><td>" +
            datos.result.data[i]["tipo_fideicomiso"] +
            "</td> <td>" +
            datos.result.data[i]["tipo_participacion"] +
            "</td> <td>" +
            datos.result.data[i]["rfc_fideicomiso"] +
            "</td> <td><input type='radio' name='op' id='posicion" +
            i +
            "' value='" +
            datos.result.data[i]["id"] +
            "'></td> </tr>";
        }
        document.getElementById("contenido").innerHTML = tabla;
        $("#completo").prop("disabled", true);
        $("#formCompleto").hide();
      } else {
        if (datos.msg == "Sesión Expirada") {
          alert(datos.msg);
          window.parent.location.href = "../login.html";
        } else {
          $("#bEditar").hide();
          $("#bEliminar").hide();
          marcarAplica(18);
          $("#formCompleto").hide();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

var ip = sessionStorage.getItem("ip");
var tipoDeclaracion = sessionStorage.getItem("tipoDec");
var id_declarante = sessionStorage.getItem("declaranteId");
var token = sessionStorage.getItem("token");
