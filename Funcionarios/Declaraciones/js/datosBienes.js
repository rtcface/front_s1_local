//////////////////////////// Funciones Para Terceros y Transmisor ////////////////////////
function guardarTerceros() {
  var htmlTags = "";
  var fisica = false,
    moral = false;
  var tipoPersona = "";
  const tags =
    /^([A-Z\u00d1a-z\u00f1]{3})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z\u00d1a-z\u00f10-9]{3})$/;
  const tags2 =
    /^([A-Z\u00d1a-z\u00f1]{4})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z\u00d1a-z\u00f10-9]{3})$/;
  var rfc_valido = false;
  if ($("input:radio[name=tercero]:checked").val() == "moral") {
    if ($("#rfcTercero").val().match(tags)) {
      rfc_valido = true;
    }
  }
  if ($("input:radio[name=tercero]:checked").val() == "fisica") {
    if ($("#rfcTercero").val().match(tags2)) {
      rfc_valido = true;
    }
  }

  if (rfc_valido && $("#nombreTercero").val() != "") {
    if ($("input:radio[name=tercero]:checked").val() == "fisica") {
      fisica = true;
    } else {
      moral = true;
    }
    tercero = {
      nombre: $("#nombreTercero").val(),
      rfc: $("#rfcTercero").val(),
      fisica: fisica,
      moral: moral,
    };
    listaTercero.push(tercero);

    var i = listaTercero.length - 1;
    if (listaTercero[i].fisica) {
      tipoPersona = "Fisica";
    } else {
      tipoPersona = "Moral";
    }
    htmlTags =
      htmlTags +
      "<tr><td>" +
      listaTercero[i].nombre +
      "</td>" +
      "<td>" +
      listaTercero[i].rfc +
      "</td>" +
      "<td>" +
      tipoPersona +
      "</td>" +
      '<td><button class="botonMenos" onclick="borrarTerceros(' +
      i +
      ')">Borrar</button></td></tr>';

    $("#tablaprueba").append(htmlTags);

    $("#nombreTercero").val("");
    $("#rfcTercero").val("");
  } else {
    alert("Campos vacíos o RFC invalido.");
  }
}

function guardarTransmisor() {
  var htmlTags = "",
    tipoRelacion = $("#tipoRelacion").val();
  var fisica = false,
    moral = false;
  var tipoPersona = "";
  const tags =
    /^([A-Z\u00d1a-z\u00f1]{3})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z\u00d1a-z\u00f10-9]{3})$/;
  const tags2 =
    /^([A-Z\u00d1a-z\u00f1]{4})([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])([A-Z\u00d1a-z\u00f10-9]{3})$/;
  var rfc_valido = false;
  if ($("input:radio[name=transmisor]:checked").val() == "moral") {
    if ($("#rfc").val().match(tags)) {
      rfc_valido = true;
    }
  }
  if ($("input:radio[name=transmisor]:checked").val() == "fisica") {
    if ($("#rfc").val().match(tags2)) {
      rfc_valido = true;
    }
  }

  if (rfc_valido && $("#nombreRazon").val() != "") {
    if (tipoRelacion == "OTRO") {
      tipoRelacion = $("#otroFam").val();
    }
    if ($("input:radio[name=transmisor]:checked").val() == "fisica") {
      fisica = true;
    } else {
      moral = true;
    }
    transmisor = {
      nombre: $("#nombreRazon").val(),
      rfc: $("#rfc").val(),
      relacion: tipoRelacion,
      fisica: fisica,
      moral: moral,
    };
    listaTransmisor.push(transmisor);

    var i = listaTransmisor.length - 1;
    if (listaTransmisor[i].fisica) {
      tipoPersona = "Fisica";
    } else {
      tipoPersona = "Moral";
    }
    htmlTags =
      htmlTags +
      "<tr><td>" +
      listaTransmisor[i].nombre +
      "</td>" +
      "<td>" +
      listaTransmisor[i].rfc +
      "</td>" +
      "<td>" +
      listaTransmisor[i].relacion +
      "</td>" +
      "<td>" +
      tipoPersona +
      "</td>" +
      '<td><button class="botonMenos" onclick="borrarTransmisor(' +
      i +
      ')">Borrar</button></td></tr>';

    $("#tablaTransmisor").append(htmlTags);

    $("#nombreRazon").val("");
    $("#rfc").val("");
  } else {
    alert("Campos vacíos o RFC invalido.");
  }
}

/////////////////////////Borrar Terceros y Transmisor  ///////////////////////////
function borrarTransmisor(indice) {
  listaTransmisor.splice(indice, 1);
}

function borrarTerceros(indice) {
  listaTransmisor.splice(indice, 1);
}

$(document).on("click", ".botonMenos", function (event) {
  event.preventDefault();
  $(this).closest("tr").remove();
});

/////////////////////////// Verificar Terceros y Transmisor  ///////////////////////////
function verificarTerceroTransmisor(form) {
  if ($("#titular").val().includes("TERCEROS")) {
    if ($("#tablaprueba tr").length > 0) {
      if ($("#tablaTransmisor tr").length > 0) {
        insertUpdate(form);
      } else {
        alert("Complete los datos de Transmisor.");
      }
    } else {
      alert("Complete los datos de Terceros.");
    }
  } else {
    if ($("#tablaTransmisor tr").length > 0) {
      insertUpdate(form);
    } else {
      alert("Complete los datos de Transmisor.");
    }
  }
}

function verificarTercero(form) {
  if ($("#titular").val().includes("TERCEROS")) {
    if ($("#tablaprueba tr").length > 0) {
      insertUpdate(form);
    } else {
      alert("Complete los datos de Terceros.");
    }
  } else {
    insertUpdate(form);
  }
}

var listaTercero = new Array();
var tercero = new Object();
var listaTransmisor = new Array();
var transmisor = new Object();
var ip = sessionStorage.getItem("ip");
var tipoDeclaracion = sessionStorage.getItem("tipoDec");
var id_declarante = sessionStorage.getItem("declaranteId");
var token = sessionStorage.getItem("token");

/////////////////////////// Delete Terceros y Transmisor  ///////////////////////////
function deleteTerceros(id, tBien) {
  var borrar = "";
  switch (tBien) {
    case 1:
      borrar = "deleteTercerosInmueblesByID";
      break;
    case 2:
      borrar = "deleteTercerosVehiculosByID";
      break;
    case 3:
      borrar = "deleteTercerosMueblesNRByID";
      break;
    case 4:
      borrar = "deleteTercerosInversionesByID";
      break;
    case 5:
      borrar = "deleteTercerosPasivosAdeudosByID";
      break;
  }
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/activos/" +
      borrar +
      "?tipo_declaracion=" +
      tipoDeclaracion +
      "&id=" +
      id,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      alert(datos.msg);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function deleteTransmisor(id, tBien) {
  var borrar = "";
  switch (tBien) {
    case 1:
      borrar = "deleteTransmisorInmueblesByID";
      break;
    case 2:
      borrar = "deleteTransmisorVehiculosByID";
      break;
    case 3:
      borrar = "deleteTransmisorMueblesNRByID";
      break;
  }
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/activos/" +
      borrar +
      "?tipo_declaracion=" +
      tipoDeclaracion +
      "&id=" +
      id,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      alert(datos.msg);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

/////////////////////////// Bienes Inmuebles ////////////////////////////////
function selectBienesInmuebles() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");
  var htmlTags = "",
    htmlTags2 = "",
    tPerson = "";
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/activos/selectActivosBienesInmueblesByID?tipo_declaracion=" +
      tipoDeclaracion +
      "&id=" +
      idDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
        actualizar = true;

        if (
          datos.result.data.tipo_bien != "CASA" &&
          datos.result.data.tipo_bien != "DEPARTAMENTO" &&
          datos.result.data.tipo_bien != "EDIFICIO" &&
          datos.result.data.tipo_bien != "LOCAL COMERCIAL" &&
          datos.result.data.tipo_bien != "BODEGA" &&
          datos.result.data.tipo_bien != "PALCO" &&
          datos.result.data.tipo_bien != "RANCHO" &&
          datos.result.data.tipo_bien != "TERRENO"
        ) {
          $("#otroBien").val(datos.result.data.tipo_bien);
          $("#tipoBien").val("OTRO");
          $("#otroBien").show();
        } else {
          $("#tipoBien").val(datos.result.data.tipo_bien);
          $("#otroBien").hide();
        }
        $("#titular").val(datos.result.data.titular);
        if (!datos.result.data.titular.includes("TERCEROS")) {
          $("#tercero").hide();
          $("#terceroDatos").hide();
          $("#botonTerceros").hide();
        } else {
          $("#tercero").show();
          $("#terceroDatos").show();
          $("#botonTerceros").show();
          if (datos.result.data.terceros != null) {
            datos.result.data.terceros.forEach((element) => {
              if (element.fisica) {
                tPerson = "Fisica";
              } else {
                tPerson = "Moral";
              }
              htmlTags =
                htmlTags +
                "<tr><td>" +
                element.nombre +
                "</td>" +
                "<td>" +
                element.rfc +
                "</td>" +
                "<td>" +
                tPerson +
                "</td>" +
                '<td><button class="botonMenos" onclick="deleteTerceros(' +
                element.id +
                ',1)">Borrar</button></td></tr>';
            });
            document.getElementById("tablaprueba").innerHTML = htmlTags;
          }
        }
        document.getElementById("porcentaje").value =
          datos.result.data.porcentaje_propiedad;
        document.getElementById("terreno").value =
          datos.result.data.superficie_terreno;
        document.getElementById("construccion").value =
          datos.result.data.superficie_construccion;
        if (datos.result.data.transmisor != null) {
          datos.result.data.transmisor.forEach((element) => {
            if (element.fisica) {
              tPerson = "Fisica";
            } else {
              tPerson = "Moral";
            }
            htmlTags2 =
              htmlTags2 +
              "<tr><td>" +
              element.nombre +
              "</td>" +
              "<td>" +
              element.rfc +
              "</td>" +
              "<td>" +
              element.relacion +
              "</td>" +
              "<td>" +
              tPerson +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteTransmisor(' +
              element.id +
              ',1)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaTransmisor").innerHTML = htmlTags2;
        }

        $("#formaAdquirio").val(datos.result.data.forma_adquisicion);
        $("#formaPago").val(datos.result.data.forma_pago);
        document.getElementById("valor").value =
          datos.result.data.valor_adquisicion;
        document.getElementById("tipoMoneda").value =
          datos.result.data.tipo_moneda;
        $("#valorAdquisicion").val(datos.result.data.tipo_operacion);
        $("#fechaAdquirio").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_adquisicion.split("/").reverse().join("/")
          )
        );
        document.getElementById("datosPropiedad").value =
          datos.result.data.no_escritura_publica;
        if (datos.result.data.pais_domicilio == "146") {
          document.getElementById("lugar").checked = true;
          $("#nacional").show();
          $("#extranjero").hide();
          $("#paisE").hide();
          estado(datos.result.data.entidad_domicilio);
          domMunicipio(
            datos.result.data.municipio_domicilio,
            datos.result.data.entidad_domicilio
          );
          document.getElementById("cp").value = datos.result.data.cp_domicilio;
          domColonia(
            datos.result.data.colonia_domicilio,
            datos.result.data.cp_domicilio
          );
          $("#tipoVia").val(datos.result.data.tipo_via_domicilio);
          document.getElementById("nombreVia").value =
            datos.result.data.nombre_via_domicilio;
          document.getElementById("numExterior").value =
            datos.result.data.no_exterior_domicilio;
          document.getElementById("numInterior").value =
            datos.result.data.no_interior_domicilio;
          $("#entidadExt").prop("required", false);
          $("#municipioExt").prop("required", false);
          $("#cpExt").prop("required", false);
          $("#coloniaExt").prop("required", false);
          $("#nombreViaExt").prop("required", false);
          $("#numExteriorExt").prop("required", false);
          $("#cp").prop("required", true);
          $("#colonia").prop("required", true);
          $("#nombreVia").prop("required", true);
          $("#numExterior").prop("required", true);
        } else {
          document.getElementById("lugarE").checked = true;
          $("#nacional").hide();
          $("#extranjero").show();
          $("#paisE").show();
          pais(datos.result.data.pais_domicilio - 1);
          document.getElementById("cpExt").value =
            datos.result.data.cp_domicilio;
          document.getElementById("coloniaExt").value =
            datos.result.data.colonia_domicilio;
          $("#tipoViaExt").val(datos.result.data.tipo_via_domicilio);
          document.getElementById("nombreViaExt").value =
            datos.result.data.nombre_via_domicilio;
          document.getElementById("numExteriorExt").value =
            datos.result.data.no_exterior_domicilio;
          document.getElementById("numInteriorExt").value =
            datos.result.data.no_interior_domicilio;
          document.getElementById("entidadExt").value =
            datos.result.data.entidad_domicilio_extranjero;
          document.getElementById("municipioExt").value =
            datos.result.data.ciudad_domicilio_extranjero;
          $("#entidadExt").prop("required", true);
          $("#municipioExt").prop("required", true);
          $("#cpExt").prop("required", true);
          $("#coloniaExt").prop("required", true);
          $("#nombreViaExt").prop("required", true);
          $("#numExteriorExt").prop("required", true);
          $("#cp").prop("required", false);
          $("#colonia").prop("required", false);
          $("#nombreVia").prop("required", false);
          $("#numExterior").prop("required", false);
        }

        if (
          datos.result.data.motivo_baja != "VENTA" &&
          datos.result.data.motivo_baja != "DONACION" &&
          datos.result.data.motivo_baja != "SINIESTRO" &&
          datos.result.data.motivo_baja != "NO APLICA"
        ) {
          $("#motivoBaja").val("OTRO");
          $("#otroBaja").val(datos.result.data.motivo_baja);
          $("#otroBaja").show();
        } else {
          $("#motivoBaja").val(datos.result.data.motivo_baja);
          $("#otroBaja").hide();
        }
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        $("#formCompleto").show();
      } else {
        alert(datos.msg);
        if (datos.msg == "Sesión Expirada") {
          window.parent.location.href = "../login.html";
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function insertarBienesInmuebles() {
  var lugar = $("input:radio[name=lugar]:checked").val();
  var colonia = "",
    tipoVia = "",
    nombreVia = "",
    cp = null,
    noExt = "",
    noExt = "";
  var motivoBaja = $("#motivoBaja").val();
  var tipoBien = $("#tipoBien").val();

  if (lugar != "146") {
    lugar = $("#pais").val();
    colonia = $("#coloniaExt").val();
    tipoVia = $("#tipoViaExt").val();
    nombreVia = $("#nombreViaExt").val();
    cp = $("#cpExt").val();
    noExt = $("#numExteriorExt").val();
    noInt = $("#numInteriorExt").val();
  } else {
    colonia = $("#colonia").val();
    tipoVia = $("#tipoVia").val();
    nombreVia = $("#nombreVia").val();
    cp = $("#cp").val();
    noExt = $("#numExterior").val();
    noInt = $("#numInterior").val();
  }
  if (tipoBien == "OTRO") {
    tipoBien = $("#otroBien").val();
  }
  if (motivoBaja == "OTRO") {
    motivoBaja = $("#otroBaja").val();
  }

  $.ajax({
    url: ip + "/declaraciones-desarrollo/activos/insertActivosBienesInmuebles",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      tipo_operacion: $("#valorAdquisicion").val(),
      tipo_bien: tipoBien,
      superficie_terreno: $("#terreno").val(),
      superficie_construccion: $("#construccion").val(),
      titular: $("#titular").val(),
      porcentaje_propiedad: $("#porcentaje").val(),
      no_escritura_publica: $("#datosPropiedad").val(),
      no_registro_propiedad: "",
      folio_real: "",
      fecha_contrato: document
        .getElementById("fechaAdquirio")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      entidad_domicilio: $("#entidadFed").val(),
      municipio_domicilio: $("#municipio").val(),
      pais_domicilio: lugar,
      cp_domicilio: cp,
      colonia_domicilio: colonia,
      tipo_via_domicilio: tipoVia,
      nombre_via_domicilio: nombreVia,
      no_exterior_domicilio: noExt,
      no_interior_domicilio: noInt,
      forma_adquisicion: $("#formaAdquirio").val(),
      curp_proveedor: null,
      sector_industria: "",
      otro_sector_industria: "",
      fecha_adquisicion: document
        .getElementById("fechaAdquirio")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      precio_adquisicion: 0,
      valor_catastral: 0,
      observaciones: $("#obsComentarios").val(),
      forma_pago: $("#formaPago").val(),
      tipo_moneda: $("#tipoMoneda").val(),
      valor_adquisicion: $("#valor").val(),
      motivo_baja: motivoBaja,
      ciudad_domicilio_extranjero: $("#municipioExt").val(),
      entidad_domicilio_extranjero: $("#entidadExt").val(),
      terceros: listaTercero,
      transmisor: listaTransmisor,
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        bienInmuebleAplica(true);
        if (confirm("¿Agregar otro registro?")) {
          window.parent.document.getElementById(
            "semaforoInmuebles"
          ).style.color = "#1EE164";
          window.location.href = "#tituloD";
          location.reload();
        } else {
          window.parent.location.reload();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function actualizarBienesInmuebles() {
  var lugar = $("input:radio[name=lugar]:checked").val();
  var colonia = "",
    tipoVia = "",
    nombreVia = "",
    cp = "",
    noExt = "",
    noExt = "",
    estado = "",
    municipio = "",
    estadoExt = "",
    municipioExt = "";
  var motivoBaja = $("#motivoBaja").val();
  var tipoBien = $("#tipoBien").val();

  if (lugar != "146") {
    lugar = $("#pais").val();
    colonia = $("#coloniaExt").val();
    tipoVia = $("#tipoViaExt").val();
    nombreVia = $("#nombreViaExt").val();
    cp = $("#cpExt").val();
    noExt = $("#numExteriorExt").val();
    noInt = $("#numInteriorExt").val();
    estadoExt = $("#entidadExt").val();
    municipioExt = $("#municipioExt").val();
  } else {
    colonia = $("#colonia").val();
    tipoVia = $("#tipoVia").val();
    nombreVia = $("#nombreVia").val();
    cp = $("#cp").val();
    noExt = $("#numExterior").val();
    noInt = $("#numInterior").val();
    estado = $("#entidadFed").val();
    municipio = $("#municipio").val();
  }
  if (tipoBien == "OTRO") {
    tipoBien = $("#otroBien").val();
  }
  if (motivoBaja == "OTRO") {
    motivoBaja = $("#otroBaja").val();
  }

  $.ajax({
    url: ip + "/declaraciones-desarrollo/activos/updateActivosBienesInmuebles",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id: idDeclaracion,
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      tipo_operacion: $("#valorAdquisicion").val(),
      tipo_bien: tipoBien,
      superficie_terreno: $("#terreno").val(),
      superficie_construccion: $("#construccion").val(),
      titular: $("#titular").val(),
      porcentaje_propiedad: $("#porcentaje").val(),
      no_escritura_publica: $("#datosPropiedad").val(),
      no_registro_propiedad: "",
      folio_real: "",
      fecha_contrato: document
        .getElementById("fechaAdquirio")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      entidad_domicilio: estado,
      municipio_domicilio: municipio,
      pais_domicilio: lugar,
      cp_domicilio: cp,
      colonia_domicilio: colonia,
      tipo_via_domicilio: tipoVia,
      nombre_via_domicilio: nombreVia,
      no_exterior_domicilio: noExt,
      no_interior_domicilio: noInt,
      forma_adquisicion: $("#formaAdquirio").val(),
      curp_proveedor: null,
      sector_industria: "",
      otro_sector_industria: "",
      fecha_adquisicion: document
        .getElementById("fechaAdquirio")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      precio_adquisicion: 0,
      valor_catastral: 0,
      observaciones: $("#obsComentarios").val(),
      forma_pago: $("#formaPago").val(),
      tipo_moneda: $("#tipoMoneda").val(),
      valor_adquisicion: $("#valor").val(),
      motivo_baja: motivoBaja,
      ciudad_domicilio_extranjero: municipioExt,
      entidad_domicilio_extranjero: estadoExt,
      terceros: listaTercero,
      transmisor: listaTransmisor,
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        if (confirm("¿Desea realizar otra modificación?")) {
          window.parent.document.getElementById(
            "semaforoInmuebles"
          ).style.color = "#1EE164";
          window.location.href = "#tituloD";
          location.reload();
        } else {
          window.parent.location.reload();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

/////////////////////////// Vehiculos ////////////////////////////////
function selectVehiculos() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");
  var htmlTags = "",
    htmlTags2 = "",
    tPerson = "";
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/activos/selectActivosVehiculosByID?tipo_declaracion=" +
      tipoDeclaracion +
      "&id=" +
      idDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
        actualizar = true;

        if (
          datos.result.data.tipo_mueble != "AUTOMOVIL O MOTOCICLETA" &&
          datos.result.data.tipo_mueble != "AERONAVE" &&
          datos.result.data.tipo_mueble != "BARCO O YATE"
        ) {
          $("#otroBien").val(datos.result.data.tipo_mueble);
          $("#tipoBien").val("OTRO");
          $("#otroBien").show();
        } else {
          $("#tipoBien").val(datos.result.data.tipo_mueble);
          $("#otroBien").hide();
        }
        $("#titular").val(datos.result.data.titular);
        if (!datos.result.data.titular.includes("TERCEROS")) {
          $("#tercero").hide();
          $("#terceroDatos").hide();
          $("#botonTerceros").hide();
        } else {
          $("#tercero").show();
          $("#terceroDatos").show();
          $("#botonTerceros").show();
          if (datos.result.data.terceros != null) {
            datos.result.data.terceros.forEach((element) => {
              if (element.fisica) {
                tPerson = "Fisica";
              } else {
                tPerson = "Moral";
              }
              htmlTags =
                htmlTags +
                "<tr><td>" +
                element.nombre +
                "</td>" +
                "<td>" +
                element.rfc +
                "</td>" +
                "<td>" +
                tPerson +
                "</td>" +
                '<td><button class="botonMenos" onclick="deleteTerceros(' +
                element.id +
                ',2)">Borrar</button></td></tr>';
            });
            document.getElementById("tablaprueba").innerHTML = htmlTags;
          }
        }
        if (datos.result.data.transmisor != null) {
          datos.result.data.transmisor.forEach((element) => {
            if (element.fisica) {
              tPerson = "Fisica";
            } else {
              tPerson = "Moral";
            }
            htmlTags2 =
              htmlTags2 +
              "<tr><td>" +
              element.nombre +
              "</td>" +
              "<td>" +
              element.rfc +
              "</td>" +
              "<td>" +
              element.relacion +
              "</td>" +
              "<td>" +
              tPerson +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteTransmisor(' +
              element.id +
              ',2)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaTransmisor").innerHTML = htmlTags2;
        }

        $("#formaAdquirio").val(datos.result.data.forma_adquisicion);
        $("#formaPago").val(datos.result.data.forma_pago);
        document.getElementById("valor").value =
          datos.result.data.precio_adquisicion;
        document.getElementById("tipoMoneda").value =
          datos.result.data.tipo_moneda;
        document.getElementById("fechaAdquirio").value =
          datos.result.data.fecha_adquisicion;
        $("#fechaAdquirio").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_adquisicion.split("/").reverse().join("/")
          )
        );
        document.getElementById("marca").value = datos.result.data.marca;
        document.getElementById("modelo").value = datos.result.data.modelo;
        document.getElementById("anio").value = datos.result.data.anio;
        document.getElementById("numeroSerie").value =
          datos.result.data.numero_serie;
        if (datos.result.data.registro_extranjero == true) {
          document.getElementById("registroE").checked = true;
          pais(datos.result.data.lugar_registro - 1);
          $("#pais").show();
          $("#entidadFed").hide();
        } else {
          document.getElementById("registroM").checked = true;
          estado(datos.result.data.lugar_registro - 1);
          $("#pais").hide();
          $("#entidadFed").show();
        }
        if (
          datos.result.data.motivo_baja != "VENTA" &&
          datos.result.data.motivo_baja != "DONACION" &&
          datos.result.data.motivo_baja != "SINIESTRO" &&
          datos.result.data.motivo_baja != "NO APLICA"
        ) {
          $("#motivoBaja").val("OTRO");
          $("#otroBaja").val(datos.result.data.motivo_baja);
          $("#otroBaja").show();
        } else {
          $("#motivoBaja").val(datos.result.data.motivo_baja);
          $("#otroBaja").hide();
        }
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        $("#formCompleto").show();
      } else {
        alert(datos.msg);
        if (datos.msg == "Sesión Expirada") {
          window.parent.location.href = "../login.html";
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function insertarVehiculos() {
  var extranjero = $("input:radio[name=registro]:checked").val();
  var lugar = "";
  var motivoBaja = $("#motivoBaja").val();
  var tipoBien = $("#tipoBien").val();

  if (extranjero == "true") {
    lugar = $("#pais").val();
    extranjero = true;
  } else {
    lugar = $("#entidadFed").val();
    extranjero = false;
  }
  if (tipoBien == "OTRO") {
    tipoBien = $("#otroBien").val();
  }
  if (motivoBaja == "OTRO") {
    motivoBaja = $("#otroBaja").val();
  }

  $.ajax({
    url: ip + "/declaraciones-desarrollo/activos/insertActivosVehiculos",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      tipo_operacion: "",
      tipo_mueble: tipoBien,
      marca: $("#marca").val(),
      linea_tipo: "",
      modelo: $("#modelo").val(),
      anio: $("#anio").val(),
      numero_serie: $("#numeroSerie").val(),
      lugar_registro: lugar,
      registro_extranjero: extranjero,
      titular: $("#titular").val(),
      porcentaje_propiedad: 0,
      registro_vehicular: "",
      forma_adquisicion: $("#formaAdquirio").val(),
      id_sector_industria: "",
      fecha_adquisicion: document
        .getElementById("fechaAdquirio")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      precio_adquisicion: $("#valor").val(),
      observaciones: $("#obsComentarios").val(),
      otro_sector_industria: "",
      forma_pago: $("#formaPago").val(),
      tipo_moneda: $("#tipoMoneda").val(),
      motivo_baja: motivoBaja,
      terceros: listaTercero,
      transmisor: listaTransmisor,
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        vehiculoAplica(true);
        if (confirm("¿Agregar otro registro?")) {
          window.parent.document.getElementById(
            "semaforoVehiculo"
          ).style.color = "#1EE164";
          window.location.href = "#tituloD";
          location.reload();
        } else {
          window.parent.location.reload();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function actualizarVehiculos() {
  var extranjero = $("input:radio[name=registro]:checked").val();
  var lugar = "";
  var motivoBaja = $("#motivoBaja").val();
  var tipoBien = $("#tipoBien").val();

  if (extranjero == "true") {
    lugar = $("#pais").val();
    extranjero = true;
  } else {
    lugar = $("#entidadFed").val();
    extranjero = false;
  }
  if (tipoBien == "OTRO") {
    tipoBien = $("#otroBien").val();
  }
  if (motivoBaja == "OTRO") {
    motivoBaja = $("#otroBaja").val();
  }
  $.ajax({
    url: ip + "/declaraciones-desarrollo/activos/updateActivosVehiculos",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id: idDeclaracion,
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      tipo_operacion: "",
      tipo_mueble: tipoBien,
      marca: $("#marca").val(),
      linea_tipo: "",
      modelo: $("#modelo").val(),
      anio: $("#anio").val(),
      numero_serie: $("#numeroSerie").val(),
      lugar_registro: lugar,
      registro_extranjero: extranjero,
      titular: $("#titular").val(),
      porcentaje_propiedad: "",
      registro_vehicular: "",
      forma_adquisicion: $("#formaAdquirio").val(),
      nombre_proveedor: $("#nombreRazon").val(),
      rfc_proveedor: $("#rfc").val(),
      id_sector_industria: "",
      fecha_adquisicion: document
        .getElementById("fechaAdquirio")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      precio_adquisicion: $("#valor").val(),
      observaciones: $("#obsComentarios").val(),
      otro_sector_industria: "",
      forma_pago: $("#formaPago").val(),
      tipo_moneda: $("#tipoMoneda").val(),
      motivo_baja: motivoBaja,
      terceros: listaTercero,
      transmisor: listaTransmisor,
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        if (confirm("¿Desea realizar otra modificación?")) {
          window.parent.document.getElementById(
            "semaforoVehiculo"
          ).style.color = "#1EE164";
          window.location.href = "#tituloD";
          location.reload();
        } else {
          window.parent.location.reload();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

/////////////////////////// Bienes Muebles ////////////////////////////////
function selectBienesMuebles() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");
  var htmlTags = "",
    htmlTags2 = "",
    tPerson = "";
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/activos/selectActivosBienesMueblesNRByID?tipo_declaracion=" +
      tipoDeclaracion +
      "&id=" +
      idDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
        actualizar = true;

        if (
          datos.result.data.tipo_bien != "MENAJE DE CASA" &&
          datos.result.data.tipo_bien !=
            "APARATOS ELECTRONICOS Y ELECTRODOMSTICOS" &&
          datos.result.data.tipo_bien != "JOYAS" &&
          datos.result.data.tipo_bien != "COLECCIONABLES" &&
          datos.result.data.tipo_bien != "OBRAS DE ARTE"
        ) {
          $("#otroBien").val(datos.result.data.tipo_bien);
          $("#tipoBien").val("OTRO");
          $("#otroBien").show();
        } else {
          $("#tipoBien").val(datos.result.data.tipo_bien);
          $("#otroBien").hide();
        }
        document.getElementById("descBien").value =
          datos.result.data.descripcion_bien;
        $("#titular").val(datos.result.data.titular);
        if (!datos.result.data.titular.includes("TERCEROS")) {
          $("#tercero").hide();
          $("#terceroDatos").hide();
          $("#botonTerceros").hide();
        } else {
          $("#tercero").show();
          $("#terceroDatos").show();
          $("#botonTerceros").show();
          if (datos.result.data.terceros != null) {
            datos.result.data.terceros.forEach((element) => {
              if (element.fisica) {
                tPerson = "Fisica";
              } else {
                tPerson = "Moral";
              }
              htmlTags =
                htmlTags +
                "<tr><td>" +
                element.nombre +
                "</td>" +
                "<td>" +
                element.rfc +
                "</td>" +
                "<td>" +
                tPerson +
                "</td>" +
                '<td><button class="botonMenos" onclick="deleteTerceros(' +
                element.id +
                ',3)">Borrar</button></td></tr>';
            });
            document.getElementById("tablaprueba").innerHTML = htmlTags;
          }
        }

        if (datos.result.data.transmisor != null) {
          datos.result.data.transmisor.forEach((element) => {
            if (element.fisica) {
              tPerson = "Fisica";
            } else {
              tPerson = "Moral";
            }
            htmlTags2 =
              htmlTags2 +
              "<tr><td>" +
              element.nombre +
              "</td>" +
              "<td>" +
              element.rfc +
              "</td>" +
              "<td>" +
              element.relacion +
              "</td>" +
              "<td>" +
              tPerson +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteTransmisor(' +
              element.id +
              ',3)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaTransmisor").innerHTML = htmlTags2;
        }

        $("#formaAdquirio").val(datos.result.data.forma_adquisicion);
        $("#formaPago").val(datos.result.data.forma_pago);
        document.getElementById("valor").value =
          datos.result.data.precio_adquisicion;
        document.getElementById("tipoMoneda").value =
          datos.result.data.tipo_moneda;
        $("#fechaAdquirio").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_adquisicion.split("/").reverse().join("/")
          )
        );
        if (
          datos.result.data.motivo_baja != "VENTA" &&
          datos.result.data.motivo_baja != "DONACION" &&
          datos.result.data.motivo_baja != "SINIESTRO" &&
          datos.result.data.motivo_baja != "NO APLICA"
        ) {
          $("#motivoBaja").val("OTRO");
          $("#otroBaja").val(datos.result.data.motivo_baja);
          $("#otroBaja").show();
        } else {
          $("#motivoBaja").val(datos.result.data.motivo_baja);
          $("#otroBaja").hide();
        }
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        $("#formCompleto").show();
      } else {
        alert(datos.msg);
        if (datos.msg == "Sesión Expirada") {
          window.parent.location.href = "../login.html";
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function insertarBienesMuebles() {
  var tipoBien = $("#tipoBien").val(),
    motivoBaja = $("#motivoBaja").val();

  if (tipoBien == "OTRO") {
    tipoBien = $("#otroBien").val();
  }
  if (motivoBaja == "OTRO") {
    motivoBaja = $("#otroBaja").val();
  }
  $.ajax({
    url: ip + "/declaraciones-desarrollo/activos/insertActivosBienesMueblesNR",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      tipo_operacion: "",
      tipo_bien: tipoBien,
      descripcion_bien: $("#descBien").val(),
      titular: $("#titular").val(),
      porcentaje: 0,
      forma_adquisicion: $("#formaAdquirio").val(),
      fecha_adquisicion: document
        .getElementById("fechaAdquirio")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      precio_adquisicion: $("#valor").val(),
      observaciones: $("#obsComentarios").val(),
      forma_pago: $("#formaPago").val(),
      tipo_moneda: $("#tipoMoneda").val(),
      motivo_baja: motivoBaja,
      terceros: listaTercero,
      transmisor: listaTransmisor,
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        bienMuebleAplica(true);
        if (confirm("¿Agregar otro registro?")) {
          window.parent.document.getElementById("semaforoMuebles").style.color =
            "#1EE164";
          window.location.href = "#tituloD";
          location.reload();
        } else {
          window.parent.location.reload();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function actualizarBienesMuebles() {
  var tipoBien = $("#tipoBien").val(),
    motivoBaja = $("#motivoBaja").val();

  if (tipoBien == "OTRO") {
    tipoBien = $("#otroBien").val();
  }
  if (motivoBaja == "OTRO") {
    motivoBaja = $("#otroBaja").val();
  }

  $.ajax({
    url: ip + "/declaraciones-desarrollo/activos/updateActivosBienesMueblesNR",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id: idDeclaracion,
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      tipo_operacion: "",
      tipo_bien: tipoBien,
      descripcion_bien: $("#descBien").val(),
      titular: $("#titular").val(),
      porcentaje: 0,
      forma_adquisicion: $("#formaAdquirio").val(),
      fecha_adquisicion: document
        .getElementById("fechaAdquirio")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      precio_adquisicion: $("#valor").val(),
      observaciones: $("#obsComentarios").val(),
      forma_pago: $("#formaPago").val(),
      tipo_moneda: $("#tipoMoneda").val(),
      motivo_baja: motivoBaja,
      terceros: listaTercero,
      transmisor: listaTransmisor,
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        if (confirm("¿Desea realizar otra modificación?")) {
          window.parent.document.getElementById("semaforoMuebles").style.color =
            "#1EE164";
          window.location.href = "#tituloD";
          location.reload();
        } else {
          window.parent.location.reload();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

/////////////////////////// Inversiones ////////////////////////////////
function selectInversiones() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");
  var htmlTags = "",
    tPerson = "";
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/activos/selectActivosInversionesCuentasByID?tipo_declaracion=" +
      tipoDeclaracion +
      "&id=" +
      idDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
        actualizar = true;

        $("#tipoBien").val(datos.result.data.tipo_inversion);
        if (datos.result.data.tipo_inversion == "BANCARIA") {
          $("#selectBancaria").val(datos.result.data.descripcion_inversion);
          $("#contenedorBancaria").show();
          $("#contenedorFondos").hide();
          $("#contenedorOrganizaciones").hide();
          $("#contenedorPosesion").hide();
          $("#contenedorSeguros").hide();
          $("#contenedorValores").hide();
          $("#contenedorAfores").hide();
        } else if (datos.result.data.tipo_inversion == "FONDOS DE INVERSION") {
          $("#selectFondos").val(datos.result.data.descripcion_inversion);
          $("#contenedorFondos").show();
          $("#contenedorBancaria").hide();
          $("#contenedorOrganizaciones").hide();
          $("#contenedorPosesion").hide();
          $("#contenedorSeguros").hide();
          $("#contenedorValores").hide();
          $("#contenedorAfores").hide();
        } else if (
          datos.result.data.tipo_inversion ==
          "ORGANIZACIONES PRIVADAS Y/O MERCANTILES"
        ) {
          $("#selectOrganizaciones").val(
            datos.result.data.descripcion_inversion
          );
          $("#contenedorOrganizaciones").show();
          $("#contenedorBancaria").hide();
          $("#contenedorFondos").hide();
          $("#contenedorPosesion").hide();
          $("#contenedorSeguros").hide();
          $("#contenedorValores").hide();
          $("#contenedorAfores").hide();
        } else if (
          datos.result.data.tipo_inversion == "POSESION DE MONEDAS Y/O METALES"
        ) {
          $("#selectPosesion").val(datos.result.data.descripcion_inversion);
          $("#contenedorPosesion").show();
          $("#contenedorBancaria").hide();
          $("#contenedorFondos").hide();
          $("#contenedorOrganizaciones").hide();
          $("#contenedorSeguros").hide();
          $("#contenedorValores").hide();
          $("#contenedorAfores").hide();
        } else if (datos.result.data.tipo_inversion == "SEGUROS") {
          $("#selectSeguros").val(datos.result.data.descripcion_inversion);
          $("#contenedorSeguros").show();
          $("#contenedorBancaria").hide();
          $("#contenedorFondos").hide();
          $("#contenedorOrganizaciones").hide();
          $("#contenedorPosesion").hide();
          $("#contenedorValores").hide();
          $("#contenedorAfores").hide();
        } else if (datos.result.data.tipo_inversion == "VALORES BURSATILES") {
          $("#selectValores").val(datos.result.data.descripcion_inversion);
          $("#contenedorValores").show();
          $("#contenedorBancaria").hide();
          $("#contenedorFondos").hide();
          $("#contenedorOrganizaciones").hide();
          $("#contenedorPosesion").hide();
          $("#contenedorSeguros").hide();
          $("#contenedorAfores").hide();
        } else if (datos.result.data.tipo_inversion == "AFORES Y OTROS") {
          $("#selectAfores").val(datos.result.data.descripcion_inversion);
          $("#contenedorAfores").show();
          $("#contenedorBancaria").hide();
          $("#contenedorFondos").hide();
          $("#contenedorOrganizaciones").hide();
          $("#contenedorPosesion").hide();
          $("#contenedorSeguros").hide();
          $("#contenedorValores").hide();
        }
        document.getElementById("numeroCuenta").value =
          datos.result.data.cuenta_contrato;
        $("#titular").val(datos.result.data.titular);
        if (!datos.result.data.titular.includes("TERCEROS")) {
          $("#tercero").hide();
          $("#terceroDatos").hide();
          $("#botonTerceros").hide();
        } else {
          $("#tercero").show();
          $("#terceroDatos").show();
          $("#botonTerceros").show();
          if (datos.result.data.terceros != null) {
            datos.result.data.terceros.forEach((element) => {
              if (element.fisica) {
                tPerson = "Fisica";
              } else {
                tPerson = "Moral";
              }
              htmlTags =
                htmlTags +
                "<tr><td>" +
                element.nombre +
                "</td>" +
                "<td>" +
                element.rfc +
                "</td>" +
                "<td>" +
                tPerson +
                "</td>" +
                '<td><button class="botonMenos" onclick="deleteTerceros(' +
                element.id +
                ',4)">Borrar</button></td></tr>';
            });
            document.getElementById("tablaprueba").innerHTML = htmlTags;
          }
        }
        if (datos.result.data.ubicacion_inversion != "146") {
          document.getElementById("lugarE").checked = true;
          $("#paisE").show();
          pais(datos.result.data.ubicacion_inversion - 1);
        } else {
          document.getElementById("lugar").checked = true;
          $("#paisE").hide();
        }
        document.getElementById("institucion").value =
          datos.result.data.razon_social;
        document.getElementById("rfc").value = datos.result.data.rfc;
        document.getElementById("saldo").value =
          datos.result.data.saldo_correspondiente;
        document.getElementById("tipoMoneda").value =
          datos.result.data.tipo_moneda;
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        $("#formCompleto").show();
      } else {
        alert(datos.msg);
        if (datos.msg == "Sesión Expirada") {
          window.parent.location.href = "../login.html";
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function insertarInversiones() {
  var tipoInversion = $("#tipoBien").val();
  var descripcionInversion = "";
  var lugar = $("input:radio[name=lugar]:checked").val();

  if (lugar != "146") {
    lugar = $("#pais").val();
  }
  if (tipoInversion == "BANCARIA") {
    descripcionInversion = $("#selectBancaria").val();
  } else if (tipoInversion == "FONDOS DE INVERSION") {
    descripcionInversion = $("#selectFondos").val();
  } else if (tipoInversion == "ORGANIZACIONES PRIVADAS Y/O MERCANTILES") {
    descripcionInversion = $("#selectOrganizaciones").val();
  } else if (tipoInversion == "POSESION DE MONEDAS Y/O METALES") {
    descripcionInversion = $("#selectPosesion").val();
  } else if (tipoInversion == "SEGUROS") {
    descripcionInversion = $("#selectSeguros").val();
  } else if (tipoInversion == "VALORES BURSATILES") {
    descripcionInversion = $("#selectValores").val();
  } else if (tipoInversion == "AFORES Y OTROS") {
    descripcionInversion = $("#selectAfores").val();
  }

  $.ajax({
    url:
      ip + "/declaraciones-desarrollo/activos/insertActivosInversionesCuentas",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      tipo_inversion: tipoInversion,
      descripcion_inversion: descripcionInversion,
      cuenta_contrato: $("#numeroCuenta").val(),
      titular: $("#titular").val(),
      ubicacion_inversion: lugar,
      razon_social: $("#institucion").val(),
      rfc: $("#rfc").val(),
      pais: lugar,
      saldo_correspondiente: $("#saldo").val(),
      observaciones: $("#obsComentarios").val(),
      tipo_moneda: $("#tipoMoneda").val(),
      terceros: listaTercero,
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        invercionesAplica(true);
        if (confirm("¿Agregar otro registro?")) {
          window.parent.document.getElementById(
            "semaforoInversiones"
          ).style.color = "#1EE164";
          window.location.href = "#tituloD";
          location.reload();
        } else {
          window.parent.location.reload();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function actualizarInversiones() {
  var tipoInversion = $("#tipoBien").val();
  var descripcionInversion = "";
  var lugar = $("input:radio[name=lugar]:checked").val();

  if (lugar != "146") {
    lugar = $("#pais").val();
  }
  if (tipoInversion == "BANCARIA") {
    descripcionInversion = $("#selectBancaria").val();
  } else if (tipoInversion == "FONDOS DE INVERSION") {
    descripcionInversion = $("#selectFondos").val();
  } else if (tipoInversion == "ORGANIZACIONES PRIVADAS Y/O MERCANTILES") {
    descripcionInversion = $("#selectOrganizaciones").val();
  } else if (tipoInversion == "POSESION DE MONEDAS Y/O METALES") {
    descripcionInversion = $("#selectPosesion").val();
  } else if (tipoInversion == "SEGUROS") {
    descripcionInversion = $("#selectSeguros").val();
  } else if (tipoInversion == "VALORES BURSATILES") {
    descripcionInversion = $("#selectValores").val();
  } else if (tipoInversion == "AFORES Y OTROS") {
    descripcionInversion = $("#selectAfores").val();
  }

  $.ajax({
    url:
      ip + "/declaraciones-desarrollo/activos/updateActivosInversionesCuentas",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id: idDeclaracion,
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      tipo_inversion: tipoInversion,
      descripcion_inversion: descripcionInversion,
      cuenta_contrato: $("#numeroCuenta").val(),
      titular: $("#titular").val(),
      ubicacion_inversion: lugar,
      razon_social: $("#institucion").val(),
      rfc: $("#rfc").val(),
      pais: lugar,
      saldo_correspondiente: $("#saldo").val(),
      observaciones: $("#obsComentarios").val(),
      tipo_moneda: $("#tipoMoneda").val(),
      terceros: listaTercero,
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        if (confirm("¿Desea realizar otra modificación?")) {
          window.parent.document.getElementById(
            "semaforoInversiones"
          ).style.color = "#1EE164";
          window.location.href = "#tituloD";
          location.reload();
        } else {
          window.parent.location.reload();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

/////////////////////////// Adeudos ////////////////////////////////
function selectAdeudos() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");
  var htmlTags = "",
    tPerson = "";
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/pasivos/selectPasivosAdeudosByID?tipo_declaracion=" +
      tipoDeclaracion +
      "&id=" +
      idDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
        actualizar = true;

        $("#titular").val(datos.result.data.titular_adeudo);
        if (!datos.result.data.titular_adeudo.includes("TERCEROS")) {
          $("#tercero").hide();
          $("#terceroDatos").hide();
          $("#botonTerceros").hide();
        } else {
          $("#tercero").show();
          $("#terceroDatos").show();
          $("#botonTerceros").show();
          if (datos.result.data.terceros != null) {
            datos.result.data.terceros.forEach((element) => {
              if (element.fisica) {
                tPerson = "Fisica";
              } else {
                tPerson = "Moral";
              }
              htmlTags =
                htmlTags +
                "<tr><td>" +
                element.nombre +
                "</td>" +
                "<td>" +
                element.rfc +
                "</td>" +
                "<td>" +
                tPerson +
                "</td>" +
                '<td><button class="botonMenos" onclick="deleteTerceros(' +
                element.id +
                ',5)">Borrar</button></td></tr>';
            });
            document.getElementById("tablaprueba").innerHTML = htmlTags;
          }
        }
        if (
          datos.result.data.tipo_adeudo != "CHIP" &&
          datos.result.data.tipo_adeudo != "CAUT" &&
          datos.result.data.tipo_adeudo != "CPER" &&
          datos.result.data.tipo_adeudo != "TCRN" &&
          datos.result.data.tipo_adeudo != "TCRD" &&
          datos.result.data.tipo_adeudo != "PRPE"
        ) {
          $("#otroBien").val(datos.result.data.tipo_adeudo);
          $("#tipoBien").val("OTRO");
          $("#otroBien").show();
        } else {
          $("#tipoBien").val(datos.result.data.tipo_adeudo);
          $("#otroBien").hide();
        }
        document.getElementById("cuenta").value = datos.result.data.no_cuenta;
        $("#fechaAdquirio").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_adeudo.split("/").reverse().join("/")
          )
        );
        document.getElementById("monto").value =
          datos.result.data.monto_original;
        document.getElementById("tipoMoneda").value =
          datos.result.data.tipo_moneda;
        document.getElementById("saldo").value = datos.result.data.saldo_actual;
        if (datos.result.data.pais_adeudo != "146") {
          document.getElementById("lugarE").checked = true;
          $("#paisE").show();
          pais(datos.result.data.pais_adeudo - 1);
        } else {
          document.getElementById("lugarM").checked = true;
          $("#paisE").hide();
        }
        document.getElementById("institucion").value =
          datos.result.data.razon_social;
        document.getElementById("rfc").value = datos.result.data.rfc;
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        if (datos.result.data.otorgante_fisica) {
          document.getElementById("transmisorFisico").checked = true;
          $("#rfc").attr(
            "pattern",
            "([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})"
          );
        } else {
          document.getElementById("transmisorMoral").checked = true;
          $("#rfc").attr(
            "pattern",
            "([A-ZÑ\x26a-zñ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})"
          );
        }
        $("#formCompleto").show();
      } else {
        alert(datos.msg);
        if (datos.msg == "Sesión Expirada") {
          window.parent.location.href = "../login.html";
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function insertarAdeudos() {
  var tipoAdeudo = $("#tipoBien").val();
  var lugar = $("input:radio[name=lugar]:checked").val();
  var fisicaPro = false,
    moralPro = false;

  if ($("input:radio[name=transmisor]:checked").val() == "fisica") {
    fisicaPro = true;
  } else {
    moralPro = true;
  }

  if (lugar != "146") {
    lugar = $("#pais").val();
  }
  if (tipoAdeudo == "OTRO") {
    tipoAdeudo = $("#otroBien").val();
  }

  $.ajax({
    url: ip + "/declaraciones-desarrollo/pasivos/insertPasivosAdeudos",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      titular_adeudo: $("#titular").val(),
      tipo_adeudo: tipoAdeudo,
      no_cuenta: $("#cuenta").val(),
      fecha_adeudo: document
        .getElementById("fechaAdquirio")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      monto_original: $("#monto").val(),
      tipo_moneda: $("#tipoMoneda").val(),
      saldo_actual: $("#saldo").val(),
      ubicacion_adeudo: lugar,
      razon_social: $("#institucion").val(),
      rfc: $("#rfc").val(),
      pais_adeudo: lugar,
      observaciones: $("#obsComentarios").val(),
      otorgante_fisica: fisicaPro,
      otorgante_moral: moralPro,
      terceros: listaTercero,
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        pasivosAplica(true);
        if (confirm("¿Agregar otro registro?")) {
          window.parent.document.getElementById("semaforoPasivos").style.color =
            "#1EE164";
          window.location.href = "#tituloD";
          location.reload();
        } else {
          window.parent.location.reload();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function actualizarAdeudos() {
  var tipoAdeudo = $("#tipoBien").val();
  var lugar = $("input:radio[name=lugar]:checked").val();
  var fisicaPro = false,
    moralPro = false;

  if ($("input:radio[name=transmisor]:checked").val() == "fisica") {
    fisicaPro = true;
  } else {
    moralPro = true;
  }

  if (lugar != "146") {
    lugar = $("#pais").val();
  }
  if (tipoAdeudo == "OTRO") {
    tipoAdeudo = $("#otroBien").val();
  }

  $.ajax({
    url: ip + "/declaraciones-desarrollo/pasivos/updatePasivosAdeudos",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id: idDeclaracion,
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      titular_adeudo: $("#titular").val(),
      tipo_adeudo: tipoAdeudo,
      no_cuenta: $("#cuenta").val(),
      fecha_adeudo: document
        .getElementById("fechaAdquirio")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      monto_original: $("#monto").val(),
      tipo_moneda: $("#tipoMoneda").val(),
      saldo_actual: $("#saldo").val(),
      ubicacion_adeudo: lugar,
      razon_social: $("#institucion").val(),
      rfc: $("#rfc").val(),
      pais_adeudo: lugar,
      observaciones: $("#obsComentarios").val(),
      otorgante_fisica: fisicaPro,
      otorgante_moral: moralPro,
      terceros: listaTercero,
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        if (confirm("¿Desea realizar otra modificación?")) {
          window.parent.document.getElementById("semaforoPasivos").style.color =
            "#1EE164";
          window.location.href = "#tituloD";
          location.reload();
        } else {
          window.parent.location.reload();
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
