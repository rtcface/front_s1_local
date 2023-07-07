/////////////// Funciones Actividades Industriales ////////////////////
function guardarActIndustrial() {
  var htmlTags = "";
  if (
    $("#ingresos_industrial").val() != 0 &&
    $("#nombre_industria").val() != "" &&
    $("#tipoNegocio").val() != ""
  ) {
    actIndust = {
      valor: $("#ingresos_industrial").val(),
      razon_social: $("#nombre_industria").val(),
      tipo_negocio: $("#tipoNegocio").val(),
    };
    listaActIndust.push(actIndust);

    var i = listaActIndust.length - 1;
    htmlTags =
      htmlTags +
      "<tr><td>" +
      listaActIndust[i].razon_social +
      "</td>" +
      "<td>" +
      listaActIndust[i].tipo_negocio +
      "</td>" +
      "<td>" +
      listaActIndust[i].valor +
      "</td>" +
      '<td><button class="botonMenos" onclick="borrarActIndustrial(' +
      i +
      ')">Borrar</button></td></tr>';

    $("#tablaActividadInsdustrial").append(htmlTags);
    sumarActIndustrial();

    $("#ingresos_industrial").val("0");
    $("#nombre_industria").val("");
    $("#tipoNegocio").val("");
  } else {
    alert(
      "Complete los datos de la actividad industrial, comercial y/o empresarial"
    );
  }
}

function borrarActIndustrial(indice) {
  listaActIndust.splice(indice, 1);
}

function sumarActIndustrial() {
  var filas = document.querySelectorAll("#tablaActividadInsdustrial tr");
  var total = 0;
  filas.forEach((element) => {
    var columnas = element.querySelectorAll("td");
    var monto = parseFloat(columnas[2].textContent);
    total = total + monto;
  });

  $("#total_ingresos_industrial").val(total);
  sumaOtrosIngresos();
  sumaIngresosDeclarante();
  sumaIngresosNetos();
}

/////////////// Funciones Actividades Financiera ////////////////////
function guardarActFinanciera() {
  var htmlTags = "";
  if (
    $("input:radio[name=tipoInstrumento]:checked") &&
    $("#ingresos_financiera").val() > 0
  ) {
    var act_finan = $("input:radio[name=tipoInstrumento]:checked").val();
    if (act_finan == "OTRO") {
      act_finan = $("#otroInst").val();
    }
    actFinanciera = {
      valor: $("#ingresos_financiera").val(),
      instrumento_clave: act_finan,
      instrumento_valor: act_finan,
    };
    listaActFinanciera.push(actFinanciera);

    var i = listaActFinanciera.length - 1;
    htmlTags =
      htmlTags +
      "<tr><td>" +
      listaActFinanciera[i].instrumento_valor +
      "</td>" +
      "<td>" +
      listaActFinanciera[i].valor +
      "</td>" +
      '<td><button class="botonMenos" onclick="borrarActFinanciera(' +
      i +
      ')">Borrar</button></td></tr>';

    $("#tablaActividadFinanciera").append(htmlTags);
    sumarActFinanciera();

    $("#ingresos_financiera").val("0");
  } else {
    alert("Complete los datos de la actividad financiera");
  }
}

function borrarActFinanciera(indice) {
  listaActFinanciera.splice(indice, 1);
}

function sumarActFinanciera() {
  var filas = document.querySelectorAll("#tablaActividadFinanciera tr");
  var total = 0;
  filas.forEach((element) => {
    var columnas = element.querySelectorAll("td");
    var monto = parseFloat(columnas[1].textContent);
    total = total + monto;
  });

  $("#total_ingresos_financiera").val(total);
  sumaOtrosIngresos();
  sumaIngresosDeclarante();
  sumaIngresosNetos();
}

/////////////// Funciones Servicios Profesionales ////////////////////
function guardarServiciosProf() {
  var htmlTags = "";
  if ($("#ingresos_servicios").val() > 0 && $("#tipo_servicio").val() != "") {
    serviciosProf = {
      valor: $("#ingresos_servicios").val(),
      tipo_servicio: $("#tipo_servicio").val(),
    };
    listaServiciosProf.push(serviciosProf);

    var i = listaServiciosProf.length - 1;
    htmlTags =
      htmlTags +
      "<tr><td>" +
      listaServiciosProf[i].tipo_servicio +
      "</td>" +
      "<td>" +
      listaServiciosProf[i].valor +
      "</td>" +
      '<td><button class="botonMenos" onclick="borrarServiciosProf(' +
      i +
      ')">Borrar</button></td></tr>';

    $("#tablaServicioProf").append(htmlTags);
    sumarServiciosProf();

    $("#ingresos_servicios").val("0");
    $("#tipo_servicio").val("");
  } else {
    alert("Complete los datos de servicios profesionales");
  }
}

function borrarServiciosProf(indice) {
  listaServiciosProf.splice(indice, 1);
}

function sumarServiciosProf() {
  var filas = document.querySelectorAll("#tablaServicioProf tr");
  var total = 0;
  filas.forEach((element) => {
    var columnas = element.querySelectorAll("td");
    var monto = parseFloat(columnas[1].textContent);
    total = total + monto;
  });

  $("#total_ingresos_servicios").val(total);
  sumaOtrosIngresos();
  sumaIngresosDeclarante();
  sumaIngresosNetos();
}

/////////////// Funciones Otros Ingresos ////////////////////
function guardarOtrosIngresos() {
  var htmlTags = "";
  if ($("#ingresos_varios").val() > 0 && $("#especificar_varios").val() != "") {
    otrosIngresos = {
      valor: $("#ingresos_varios").val(),
      tipo_ingreso: $("#especificar_varios").val(),
    };
    listaOtrosIngresos.push(otrosIngresos);

    var i = listaOtrosIngresos.length - 1;
    htmlTags =
      htmlTags +
      "<tr><td>" +
      listaOtrosIngresos[i].tipo_ingreso +
      "</td>" +
      "<td>" +
      listaOtrosIngresos[i].valor +
      "</td>" +
      '<td><button class="botonMenos" onclick="borrarOtrosIngresos(' +
      i +
      ')">Borrar</button></td></tr>';

    $("#tablaOtrosIngresos").append(htmlTags);
    sumarOtrosIngresos();

    $("#ingresos_varios").val("0");
    $("#especificar_varios").val("");
  } else {
    alert("Complete los datos de otros ingresos");
  }
}

function borrarOtrosIngresos(indice) {
  listaOtrosIngresos.splice(indice, 1);
}

function sumarOtrosIngresos() {
  var filas = document.querySelectorAll("#tablaOtrosIngresos tr");
  var total = 0;
  filas.forEach((element) => {
    var columnas = element.querySelectorAll("td");
    var monto = parseFloat(columnas[1].textContent);
    total = total + monto;
  });

  $("#total_ingresos_varios").val(total);
  sumaOtrosIngresos();
  sumaIngresosDeclarante();
  sumaIngresosNetos();
}

/////////////// Funciones Enajenacion de Bienes ////////////////////
function guardarEnajenacion(ingresos) {
  var htmlTags = "";
  if (
    $("input:radio[name=tipoBienEnajenado]:checked") &&
    $("#ingresos_enajenacion").val() > 0
  ) {
    enajenacion = {
      valor: $("#ingresos_enajenacion").val(),
      tipo_bien_enajenado: $(
        "input:radio[name=tipoBienEnajenado]:checked"
      ).val(),
    };
    listaEnajenacion.push(enajenacion);

    var i = listaEnajenacion.length - 1;
    htmlTags =
      htmlTags +
      "<tr><td>" +
      listaEnajenacion[i].tipo_bien_enajenado +
      "</td>" +
      "<td>" +
      listaEnajenacion[i].valor +
      "</td>" +
      '<td><button class="botonMenos" onclick="borrarEnajenacion(' +
      i +
      ')">Borrar</button></td></tr>';

    $("#tablaEnajenacion").append(htmlTags);
    sumarEnajenacion(ingresos);

    $("#ingresos_enajenacion").val("0");
  } else {
    alert("Complete los datos de enajenación de bienes");
  }
}

function borrarEnajenacion(indice) {
  listaEnajenacion.splice(indice, 1);
}

function sumarEnajenacion(ingresos) {
  var filas = document.querySelectorAll("#tablaEnajenacion tr");
  var total = 0;
  filas.forEach((element) => {
    var columnas = element.querySelectorAll("td");
    var monto = parseFloat(columnas[1].textContent);
    total = total + monto;
  });

  $("#total_ingresos_enajenacion").val(total);
  if (ingresos) {
    sumaOtrosIngresos();
  } else {
    sumaOtrosIngresos2();
  }

  sumaIngresosDeclarante();
  sumaIngresosNetos();
}

//////////////////////////////////////////////// Funciones Ingresos Netos //////////////////////////////////////////////////////
function insertarIngresosNetos() {
  var tipoInstrumento = "";
  if ($("#otro").prop("checked")) {
    tipoInstrumento = $("#otroInst").val();
  }
  $.ajax({
    url:
      ip + "/declaraciones-desarrollo/declarante/insertDeclaranteIngresosNetos",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      ing_neto_cargo_publico: $("#remuneracion_neta").val(),
      otros_ing_decl: $("#otros_ingresos").val(),
      ing_act_indust: $("#total_ingresos_industrial").val(),
      actividades: listaActIndust,
      ing_act_finan: $("#total_ingresos_financiera").val(),
      actividades_financieras: listaActFinanciera,
      ing_serv_prof: $("#total_ingresos_servicios").val(),
      serv_profesionales: listaServiciosProf,
      ing_enajenacion: $("#total_ingresos_enajenacion").val(),
      bienes: listaEnajenacion,
      otros_ing_desp_imp: $("#total_ingresos_varios").val(),
      ingresos: listaOtrosIngresos,
      suma_ing_decl: $("#ingresos_declarante").val(),
      suma_ing_dep: $("#ingresos_pareja").val(),
      suma_ingresos: $("#ingresos_total").val(),
      observaciones: $("#obsComentarios").val(),
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        if (confirm("¿Agregar otro registro?")) {
          window.parent.document.getElementById(
            "semaforoIngresos"
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

function actualizarIngresosNetos() {
  var tipoInstrumento = "";
  if ($("#otro").prop("checked")) {
    tipoInstrumento = $("#otroInst").val();
  }
  $.ajax({
    url:
      ip + "/declaraciones-desarrollo/declarante/updateDeclaranteIngresosNetos",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id: sessionStorage.getItem("idIngresos"),
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      ing_neto_cargo_publico: $("#remuneracion_neta").val(),
      otros_ing_decl: $("#otros_ingresos").val(),
      ing_act_indust: $("#total_ingresos_industrial").val(),
      actividades: listaActIndust,
      ing_act_finan: $("#total_ingresos_financiera").val(),
      actividades_financieras: listaActFinanciera,
      ing_serv_prof: $("#total_ingresos_servicios").val(),
      serv_profesionales: listaServiciosProf,
      ing_enajenacion: $("#total_ingresos_enajenacion").val(),
      bienes: listaEnajenacion,
      otros_ing_desp_imp: $("#total_ingresos_varios").val(),
      ingresos: listaOtrosIngresos,
      suma_ing_decl: $("#ingresos_declarante").val(),
      suma_ing_dep: $("#ingresos_pareja").val(),
      suma_ingresos: $("#ingresos_total").val(),
      observaciones: $("#obsComentarios").val(),
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        if (confirm("¿Desea realizar otra modificación?")) {
          window.parent.document.getElementById(
            "semaforoIngresos"
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

function selectIngresosNetos() {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/declarante/selectDeclaranteIngresosNetos?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
        actualizar = true;
        var htmlTags = "",
          htmlTags2 = "",
          htmlTags3 = "",
          htmlTags4 = "",
          htmlTags5 = "";
        sessionStorage.setItem("idIngresos", datos.result.data[0].id);
        document.getElementById("remuneracion_neta").value =
          datos.result.data[0].ing_neto_cargo_publico;
        document.getElementById("otros_ingresos").value =
          datos.result.data[0].otros_ing_decl;
        document.getElementById("total_ingresos_industrial").value =
          datos.result.data[0].ing_act_indust;
        if (datos.result.data[0].actividades != null) {
          datos.result.data[0].actividades.forEach((element) => {
            htmlTags =
              htmlTags +
              "<tr><td>" +
              element.razon_social +
              "</td>" +
              "<td>" +
              element.tipo_negocio +
              "</td>" +
              "<td>" +
              element.valor +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteIngresos(' +
              element.id +
              ',1)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaActividadInsdustrial").innerHTML =
            htmlTags;
        }
        document.getElementById("total_ingresos_financiera").value =
          datos.result.data[0].ing_act_finan;
        if (datos.result.data[0].actividades_financieras != null) {
          datos.result.data[0].actividades_financieras.forEach((element) => {
            htmlTags2 =
              htmlTags2 +
              "<tr><td>" +
              element.instrumento_valor +
              "</td>" +
              "<td>" +
              element.valor +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteIngresos(' +
              element.id +
              ',2)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaActividadFinanciera").innerHTML =
            htmlTags2;
        }
        document.getElementById("total_ingresos_servicios").value =
          datos.result.data[0].ing_serv_prof;
        if (datos.result.data[0].serv_profesionales != null) {
          datos.result.data[0].serv_profesionales.forEach((element) => {
            htmlTags3 =
              htmlTags3 +
              "<tr><td>" +
              element.tipo_servicio +
              "</td>" +
              "<td>" +
              element.valor +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteIngresos(' +
              element.id +
              ',3)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaServicioProf").innerHTML = htmlTags3;
        }
        document.getElementById("total_ingresos_enajenacion").value =
          datos.result.data[0].ing_enajenacion;
        if (datos.result.data[0].bienes != null) {
          datos.result.data[0].bienes.forEach((element) => {
            htmlTags4 =
              htmlTags4 +
              "<tr><td>" +
              element.tipo_bien_enajenado +
              "</td>" +
              "<td>" +
              element.valor +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteIngresos(' +
              element.id +
              ',4)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaEnajenacion").innerHTML = htmlTags4;
        }
        document.getElementById("total_ingresos_varios").value =
          datos.result.data[0].otros_ing_desp_imp;
        if (datos.result.data[0].ingresos != null) {
          datos.result.data[0].ingresos.forEach((element) => {
            htmlTags5 =
              htmlTags5 +
              "<tr><td>" +
              element.tipo_ingreso +
              "</td>" +
              "<td>" +
              element.valor +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteIngresos(' +
              element.id +
              ',5)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaOtrosIngresos").innerHTML = htmlTags5;
        }
        document.getElementById("ingresos_declarante").value =
          datos.result.data[0].suma_ing_decl;
        document.getElementById("ingresos_pareja").value =
          datos.result.data[0].suma_ing_dep;
        document.getElementById("ingresos_total").value =
          datos.result.data[0].suma_ingresos;
        document.getElementById("obsComentarios").value =
          datos.result.data[0].observaciones;
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

//////////////////////////////////////////////// Funciones Servidor Publico //////////////////////////////////////////////////////
function insertarServidorPublico() {
  var tipoInstrumento = "";
  if ($("#otro").prop("checked")) {
    tipoInstrumento = $("#otroInst").val();
  }
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/declarante/insertDeclaranteServidorAnterior",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      fecha_inicio: document
        .getElementById("fecIngreso")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      fecha_fin: document
        .getElementById("fecSalida")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      remun_servicio_pub: $("#remuneracion_neta").val(),
      otros_ing: $("#otros_ingresos").val(),
      ing_act_indust: $("#total_ingresos_industrial").val(),
      actividades: listaActIndust,
      ing_act_finan: $("#total_ingresos_financiera").val(),
      actividades_financieras: listaActFinanciera,
      ing_serv_prof: $("#total_ingresos_servicios").val(),
      serv_profesionales: listaServiciosProf,
      ing_enajenacion: $("#total_ingresos_enajenacion").val(),
      bienes: listaEnajenacion,
      otros_ing_desp_imp: $("#total_ingresos_varios").val(),
      ingresos: listaOtrosIngresos,
      ingreso_neto_declarante: $("#ingresos_declarante").val(),
      ingreso_neto_pareja_dep: $("#ingresos_pareja").val(),
      ing_total: $("#ingresos_total").val(),
      observaciones: $("#obsComentarios").val(),
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        anteriorServidorAplica(true);
        if (confirm("¿Agregar otro registro?")) {
          window.parent.document.getElementById(
            "semaforoAnteriorServidor"
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

function actualizarServidorPublico() {
  var tipoInstrumento = "";
  if ($("#otro").prop("checked")) {
    tipoInstrumento = $("#otroInst").val();
  }
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/declarante/updateDeclaranteServidorAnterior",
    type: "POST",
    contentType: "application/json",
    headers: {
      "X-Auth-Token": token,
    },
    data: JSON.stringify({
      id: sessionStorage.getItem("idIngresos"),
      id_declarante: id_declarante,
      tipo_declaracion: tipoDeclaracion,
      fecha_inicio: document
        .getElementById("fecIngreso")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      fecha_fin: document
        .getElementById("fecSalida")
        .value.replace(/^(\d{4})-(\d{2})-(\d{2})$/g, "$3/$2/$1"),
      remun_servicio_pub: $("#remuneracion_neta").val(),
      otros_ing: $("#otros_ingresos").val(),
      ing_act_indust: $("#total_ingresos_industrial").val(),
      actividades: listaActIndust,
      ing_act_finan: $("#total_ingresos_financiera").val(),
      actividades_financieras: listaActFinanciera,
      ing_serv_prof: $("#total_ingresos_servicios").val(),
      serv_profesionales: listaServiciosProf,
      ing_enajenacion: $("#total_ingresos_enajenacion").val(),
      bienes: listaEnajenacion,
      otros_ing_desp_imp: $("#total_ingresos_varios").val(),
      ingresos: listaOtrosIngresos,
      ingreso_neto_declarante: $("#ingresos_declarante").val(),
      ingreso_neto_pareja_dep: $("#ingresos_pareja").val(),
      ing_total: $("#ingresos_total").val(),
      observaciones: $("#obsComentarios").val(),
    }),
  })
    .done(function (data) {
      alert(data.msg);
      if (data.msg == "Sesión Expirada") {
        window.parent.location.href = "../login.html";
      } else {
        if (confirm("¿Desea realizar otra modificación?")) {
          window.parent.document.getElementById(
            "semaforoAnteriorServidor"
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

function selectServidorPublico() {
  aplicaServidorAnt();
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/declarante/selectDeclaranteServidorAnterior?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status && aplica) {
        actualizar = true;
        var htmlTags = "",
          htmlTags2 = "",
          htmlTags3 = "",
          htmlTags4 = "",
          htmlTags5 = "";
        sessionStorage.setItem("idIngresos", datos.result.data[0].id);
        $("#fecIngreso").datepicker(
          "setDate",
          new Date(
            datos.result.data[0].fecha_inicio.split("/").reverse().join("/")
          )
        );
        $("#fecSalida").datepicker(
          "setDate",
          new Date(
            datos.result.data[0].fecha_fin.split("/").reverse().join("/")
          )
        );
        document.getElementById("remuneracion_neta").value =
          datos.result.data[0].remun_servicio_pub;
        document.getElementById("otros_ingresos").value =
          datos.result.data[0].otros_ing;
        document.getElementById("total_ingresos_industrial").value =
          datos.result.data[0].ing_act_indust;
        if (datos.result.data[0].actividades != null) {
          datos.result.data[0].actividades.forEach((element) => {
            htmlTags =
              htmlTags +
              "<tr><td>" +
              element.razon_social +
              "</td>" +
              "<td>" +
              element.tipo_negocio +
              "</td>" +
              "<td>" +
              element.valor +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteIngresos(' +
              element.id +
              ',6)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaActividadInsdustrial").innerHTML =
            htmlTags;
        }
        document.getElementById("total_ingresos_financiera").value =
          datos.result.data[0].ing_act_finan;
        if (datos.result.data[0].actividades_financieras != null) {
          datos.result.data[0].actividades_financieras.forEach((element) => {
            htmlTags2 =
              htmlTags2 +
              "<tr><td>" +
              element.instrumento_valor +
              "</td>" +
              "<td>" +
              element.valor +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteIngresos(' +
              element.id +
              ',7)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaActividadFinanciera").innerHTML =
            htmlTags2;
        }
        document.getElementById("total_ingresos_servicios").value =
          datos.result.data[0].ing_serv_prof;
        if (datos.result.data[0].serv_profesionales != null) {
          datos.result.data[0].serv_profesionales.forEach((element) => {
            htmlTags3 =
              htmlTags3 +
              "<tr><td>" +
              element.tipo_servicio +
              "</td>" +
              "<td>" +
              element.valor +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteIngresos(' +
              element.id +
              ',8)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaServicioProf").innerHTML = htmlTags3;
        }
        document.getElementById("total_ingresos_enajenacion").value =
          datos.result.data[0].ing_enajenacion;
        if (datos.result.data[0].bienes != null) {
          datos.result.data[0].bienes.forEach((element) => {
            htmlTags4 =
              htmlTags4 +
              "<tr><td>" +
              element.tipo_bien_enajenado +
              "</td>" +
              "<td>" +
              element.valor +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteIngresos(' +
              element.id +
              ',9)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaEnajenacion").innerHTML = htmlTags4;
        }
        document.getElementById("total_ingresos_varios").value =
          datos.result.data[0].otros_ing_desp_imp;
        if (datos.result.data[0].ingresos != null) {
          datos.result.data[0].ingresos.forEach((element) => {
            htmlTags5 =
              htmlTags5 +
              "<tr><td>" +
              element.tipo_ingreso +
              "</td>" +
              "<td>" +
              element.valor +
              "</td>" +
              '<td><button class="botonMenos" onclick="deleteIngresos(' +
              element.id +
              ',10)">Borrar</button></td></tr>';
          });
          document.getElementById("tablaOtrosIngresos").innerHTML = htmlTags5;
        }
        document.getElementById("ingresos_declarante").value =
          datos.result.data[0].ingreso_neto_declarante;
        document.getElementById("ingresos_pareja").value =
          datos.result.data[0].ingreso_neto_pareja_dep;
        document.getElementById("ingresos_total").value =
          datos.result.data[0].ing_total;
        document.getElementById("obsComentarios").value =
          datos.result.data[0].observaciones;
        $("#formCompleto").show();
      } else {
        marcarAplica(5);
        if (aplica) {
          alert(datos.msg);
        }
        if (datos.msg == "Sesión Expirada") {
          window.parent.location.href = "../login.html";
        }
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

////////////////// Funcion borrar renglon /////////////////////
$(document).on("click", ".botonMenos", function (event) {
  event.preventDefault();
  $(this).closest("tr").remove();
});

/////////////////// Deletes ////////////////
function deleteIngresos(id, tBien) {
  var borrar = "";
  switch (tBien) {
    case 1:
      borrar = "deleteIsaActIndComById";
      break;
    case 2:
      borrar = "deleteIsaActFinancieraById";
      break;
    case 3:
      borrar = "deleteIsaServProfByID";
      break;
    case 4:
      borrar = "deleteIsaEnajenacionBienesByID";
      break;
    case 5:
      borrar = "deleteIsaOtrosIngresosByID";
      break;
    case 6:
      borrar = "deleteSAntActIndComById";
      break;
    case 7:
      borrar = "deleteSAntActFinancieraById";
      break;
    case 8:
      borrar = "deleteSAntServProfByID";
      break;
    case 9:
      borrar = "deleteSAntEnajenacionBienesByID";
      break;
    case 10:
      borrar = "deleteSAntOtrosIngresosByID";
      break;
  }
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/declarante/" +
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
      sumarActIndustrial();
      sumarActFinanciera();
      sumarServiciosProf();
      sumarOtrosIngresos();
      sumarEnajenacion();
      if (tBien > 5) {
        actualizarServidorPublico();
      } else {
        actualizarIngresosNetos();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

var listaActIndust = new Array();
var actIndust = new Object();

var listaActFinanciera = new Array();
var actFinanciera = new Object();

var listaServiciosProf = new Array();
var serviciosProf = new Object();

var listaOtrosIngresos = new Array();
var otrosIngresos = new Object();

var listaEnajenacion = new Array();
var enajenacion = new Object();

var ip = sessionStorage.getItem("ip");
var tipoDeclaracion = sessionStorage.getItem("tipoDec");
var id_declarante = sessionStorage.getItem("declaranteId");
var token = sessionStorage.getItem("token");
