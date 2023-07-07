function deleteDatosCurriculo() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/deleteDeclaranteCurriculoById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteEmpleo() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/deleteDeclaranteOtroEncargoActual?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteExpLaboral() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/deleteDeclaranteExperienciaLaboralById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteDatosParejaDependiente(pareja) {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/deleteDeclaranteConyugeDepById?tipo_declaracion=" +
      tipoDeclaracion +
      "&id=" +
      idDeclaracion +
      "&conyuge=" +
      pareja,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteBienesInmuebles() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/activos/deleteActivosBienesInmueblesById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteVehiculos() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/activos/deleteActivosVehiculosById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteBienesMuebles() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/activos/deleteActivosBienesMueblesNRById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteInversiones() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/activos/deleteActivosInversionesCuentasById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteAdeudos() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/pasivos/deletePasivosAdeudosById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deletePrestamos() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/pasivos/deletePasivosPrestamoComodatoById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteEmpresasSociedades() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/deleteInteresesEmpSocById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteInstituciones() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/deleteInteresesInstitucionesById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteApoyosBeneficios() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/deleteInteresesBeneficiosPublicosById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteRepresentacion() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/deleteInteresesRepresentacionActivaById?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteClientesPrincipales() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/deleteInteresesClientesPrincipales?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteBeneficiosPrivados() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/deleteInteresesBeneficiosPrivados?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function deleteFideicomisos() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/deleteInteresesFideicomisos?tipo_declaracion=" +
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
      alert(datos.msg);
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

var idDeclaracion = 0;
var ip = sessionStorage.getItem("ip");
var tipoDeclaracion = sessionStorage.getItem("tipoDec");
var token = sessionStorage.getItem("token");
