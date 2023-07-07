function cambiarColor(b) {
  var boton;
  var menu;
  for (var i = 1; i < 6; i++) {
    boton = "#b" + i;
    menu = "#m" + i;

    if (i == b) {
      $(boton).css("background-color", "#ad7655");
      $(boton).css("color", "white");
      $(menu).show();
    } else {
      $(boton).css("background-color", "");
      $(boton).css("color", "#969696");
      $(menu).hide();
    }
  }
}

////////////////////////////// Cambio de Formularios Declaracion Patrimonial //////////////////////////////
function formularioInfoGeneral() {
  document.getElementById("vista").src =
    "situacionPatrimonial/1-datosGenerales.html";
}
function formularioDatoCurricular() {
  document.getElementById("vista").src =
    "situacionPatrimonial/2-datosCurriculares.html";
}
function formularioDatoEncargoAct() {
  document.getElementById("vista").src =
    "situacionPatrimonial/3-datosEmpleo.html";
}
function formularioExpLaboral() {
  document.getElementById("vista").src =
    "situacionPatrimonial/4-experienciaLaboral.html";
}
function formularioDatoConyuge() {
  document.getElementById("vista").src =
    "situacionPatrimonial/5-datosPareja.html";
}
function formularioDatoDependiente() {
  document.getElementById("vista").src =
    "situacionPatrimonial/6-datosDependientes.html";
}
function formularioIngresosNetos() {
  document.getElementById("vista").src =
    "situacionPatrimonial/7-ingresosNetos.html";
}
function formularioServidorAnterior() {
  document.getElementById("vista").src =
    "situacionPatrimonial/8-servidorPubAnterior.html";
}
function formularioBienesInmuebles() {
  document.getElementById("vista").src =
    "situacionPatrimonial/9-bienesInmuebles.html";
}
function formularioBienesMuebles() {
  document.getElementById("vista").src =
    "situacionPatrimonial/10-vehiculos.html";
}
function formularioBienesMueblesNoRegistrable() {
  document.getElementById("vista").src =
    "situacionPatrimonial/11-bienesMuebles.html";
}
function formularioInversionCuentas() {
  document.getElementById("vista").src =
    "situacionPatrimonial/12-inversionesCuentasValores.html";
}
function formularioDeudas() {
  document.getElementById("vista").src = "situacionPatrimonial/13-adeudos.html";
}
function formularioUsoPropiedad() {
  document.getElementById("vista").src =
    "situacionPatrimonial/14-prestamoTerceros.html";
}

////////////////////////////// Cambio de Formularios Declaracion de Intereses //////////////////////////////
function formularioEmpresa() {
  document.getElementById("vista").src =
    "situacionIntereses/1-participacionEmpresas.html";
}
function formularioInstituciones() {
  document.getElementById("vista").src =
    "situacionIntereses/2-participacionInstituciones.html";
}
function formularioApoyoPublico() {
  document.getElementById("vista").src =
    "situacionIntereses/3-beneficiosPublicos.html";
}
function formularioReprActiva() {
  document.getElementById("vista").src =
    "situacionIntereses/4-representacion.html";
}
function formularioClientesPrincipales() {
  document.getElementById("vista").src =
    "situacionIntereses/5-clientesPrincipales.html";
}
function formularioBeneficiosGratis() {
  document.getElementById("vista").src =
    "situacionIntereses/6-beneficiosPrivados.html";
}
function formularioFideicomisos() {
  document.getElementById("vista").src =
    "situacionIntereses/7-fideicomisos.html";
}

function alturaMenu(alturax) {
  alturax = alturax + "px";
  window.parent.document.getElementById("menuList").style.height = alturax;
}

var ip = sessionStorage.getItem("ip");

function descarga() {
  var xhr = new XMLHttpRequest();
  //xhr.open('GET', ip + '/declaraciones-desarrollo/public/publicDeclaracionReport?id_declarante=' + sessionStorage.getItem("id") + '&tipo_declaracion=' +  sessionStorage.getItem("tipo_declaracion") , true);
  xhr.open(
    "GET",
    ip +
      "/declaraciones-desarrollo/public/publicViewDeclaracionReport?id_declarante=" +
      sessionStorage.getItem("id") +
      "&tipo_declaracion=" +
      sessionStorage.getItem("tipo_declaracion") +
      "&id_declarador=" +
      sessionStorage.getItem("id"),
    true
  );
  xhr.responseType = "blob";

  xhr.onload = function (e) {
    if (this.status == 200) {
      var blob = new Blob([this.response], { type: "application/pdf" });
      var link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "Declaracion Publica.pdf";
      link.click();
    }
  };
  xhr.send();
}

////////////////////////////// Get entes publicos //////////////////////////////
function entes() {
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/getEntePublico",
    type: "GET",
    dataType: "json",
  })
    .done(function (data) {
      var x = document.getElementById("ente_publico");
      var option;
      for (var i = 0; i < Object.keys(data["result"]["data"]).length; i++) {
        option = document.createElement("option");
        option.text = data["result"]["data"][i]["nombre_ente"];
        option.value = data["result"]["data"][i]["id"];
        if (
          "SECRETARIA EJECUTIVA DEL SISTEMA ESTATAL ANTICORRUPCION" ==
          option.text
        ) {
          option.selected = true;
        }
        x.add(option);
      }
      $("#tipo_declaracion").val(1);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

////////////////////////////// Buscar por servidor publico //////////////////////////////
function buscar() {
  var nombre = document.getElementById("nombre").value;
  var apellido = document.getElementById("apellido").value;
  var tipo_declaracion = document.getElementById("tipo_declaracion").value;
  var ente_publico = document.getElementById("ente_publico").value;
  if (nombre == "") {
    nombre = null;
  }
  if (apellido == "") {
    apellido = null;
  }
  if (ente_publico == "todos") {
    ente_publico = null;
  }
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/findPublicDeclarant",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      sort: "asc",
      page: null,
      page_size: null,
      nombres: nombre,
      apellido1: apellido,
      ente_publico: ente_publico,
      tipo_declaracion: tipo_declaracion,
      actualizacion: null,
    }),
  })
    .done(function (datos) {
      // var tabla="<tr><th>Nombre </th><th>Ente Público</th><th>Cargo Actual</th></tr>";
      var tabla =
        "<tr><th>#</th><th>Nombre </th><th>Ente Público</th><th>Cargo Actual</th></tr>";

      for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
        // tabla=tabla + "<tr onclick='selectDeclarante("+tipo_declaracion+","+datos.result.data[i]['id']+")'><td>"
        //                             + datos.result.data[i]['nombre'] + "</td> <td>"
        //                             + datos.result.data[i]['ente_publico'] + "</td> <td>"
        //                             + datos.result.data[i]['cargo_comision'] + "</td> </tr>"
        tabla =
          tabla +
          "<tr onclick='selectDeclarante(" +
          tipo_declaracion +
          "," +
          datos.result.data[i]["id"] +
          ")'><td>" +
          (i + 1) +
          "</td> <td>" +
          datos.result.data[i]["nombre"] +
          "</td> <td>" +
          datos.result.data[i]["ente_publico"] +
          "</td> <td>" +
          datos.result.data[i]["cargo_comision"] +
          "</td> </tr>";
      }
      document.getElementById("contenido").innerHTML = tabla;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function cargarSesea() {
  var nombre = null;
  var apellido = null;
  var tipo_declaracion = 1;
  // var ente_publico="SECRETARIA EJECUTIVA DEL SISTEMA ESTATAL ANTICORRUPCION";
  var ente_publico = "";

  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/findPublicDeclarant",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      sort: "asc",
      page: null,
      page_size: null,
      nombres: nombre,
      apellido1: apellido,
      ente_publico: ente_publico,
      tipo_declaracion: tipo_declaracion,
      actualizacion: null,
    }),
  })
    .done(function (datos) {
      // var tabla="<tr><th>Nombre </th><th>Ente Público</th><th>Cargo Actual</th></tr>";
      var tabla =
        "<tr><th>#</th><th>Nombre </th><th>Ente Público</th><th>Cargo Actual</th></tr>";
      for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
        // tabla=tabla + "<tr onclick='selectDeclarante("+tipo_declaracion+","+datos.result.data[i]['id']+")'><td>"
        //                             + datos.result.data[i]['nombre'] + "</td><td>"
        //                             + datos.result.data[i]['ente_publico'] + "</td><td>"
        //                             + datos.result.data[i]['cargo_comision'] + "</td>  </tr>"
        tabla =
          tabla +
          "<tr onclick='selectDeclarante(" +
          tipo_declaracion +
          "," +
          datos.result.data[i]["id"] +
          ")'><td>" +
          (i + 1) +
          "</td> <td>" +
          datos.result.data[i]["nombre"] +
          "</td> <td>" +
          datos.result.data[i]["ente_publico"] +
          "</td> <td>" +
          datos.result.data[i]["cargo_comision"] +
          "</td> </tr>";
      }
      document.getElementById("contenido").innerHTML = tabla;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
////////////////////////////// Seleccionar servidor publico //////////////////////////////
function selectDeclarante(td, id) {
  sessionStorage.setItem("id", id);
  sessionStorage.setItem("ente", document.getElementById("ente_publico").value);
  sessionStorage.setItem("tipo_declaracion", td);
  getFuncionario();
}

function getFuncionario() {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/public/selectPublicJsonSNA?id_ente=" +
      sessionStorage.getItem("ente") +
      "&id_busqueda=" +
      sessionStorage.getItem("id") +
      "&tipo_declaracion=" +
      sessionStorage.getItem("tipo_declaracion"),
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      sessionStorage.setItem("json", JSON.stringify(datos.result.data));
      window.location.href = "servidor_publico.html";
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function servidorPublico() {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/public/selectPublicHeaderData?tipo_declaracion=" +
      sessionStorage.getItem("tipo_declaracion") +
      "&id_declarador=" +
      sessionStorage.getItem("id"),
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      document.getElementById("nombre_completo").innerHTML =
        datos.result.data.nombre_completo;
      document.getElementById("correo").innerHTML = datos.result.data.correo;
      document.getElementById("encargo").innerHTML =
        datos.result.data.encargo_actual;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
