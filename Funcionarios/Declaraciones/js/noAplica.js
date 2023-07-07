function curriculoAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_curriculo_declarante?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function expLabAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_exp_laboral?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function parejaAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_conyuge?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function dependienteAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_dependiente?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function anteriorServidorAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_anterior_servidor?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function bienInmuebleAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_bienes_inmuebles?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function vehiculoAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_bienes_muebles?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function bienMuebleAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_bienes_muebles_nr?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function invercionesAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_inversiones_cuentas?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function pasivosAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_adeudos?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function prestamosAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_prestamo_comodato?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function empresasAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_emp_soc?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function institucionesAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_part_instituciones?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function beneficiosPublicosAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_beneficios_publicos?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function representacionAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_representacion?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function clientesAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_clientes_principales?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function beneficiosPrivadosAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_beneficios_privados?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function fideicomisosAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_fideicomisos?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (!estatus) {
        window.parent.location.reload();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function constFiscalAplica(estatus) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/aplica_dec_fiscal?tipo_declaracion=" +
      tipoDeclaracion +
      "&value=" +
      estatus,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      window.parent.location.reload();
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

var ip = sessionStorage.getItem("ip");
var tipoDeclaracion = sessionStorage.getItem("tipoDec");
var token = sessionStorage.getItem("token");

/////////// Marcar Check Box //////////////////
function marcarAplica(index) {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/aplicaControl/selectControlAplica?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": sessionStorage.getItem("token"),
    },
  })
    .done(function (datos) {
      if (!datos.result.data.aplica_dec_fiscal && index == 0) {
        $("#completo").prop("checked", true);
        $("#form_constancia").hide();
      }
      if (!datos.result.data.aplica_fideicomisos && index == 18) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_beneficios_privados && index == 17) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_clientes_principales && index == 16) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_representacion && index == 15) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_beneficios_publicos && index == 14) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_part_instituciones && index == 13) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_emp_soc && index == 12) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_prestamo_comodato && index == 11) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_adeudos && index == 10) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_inversiones_cuentas && index == 9) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_bienes_muebles_nr && index == 8) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_bienes_muebles && index == 7) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_bienes_inmuebles && index == 6) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_anterior_servidor && index == 5) {
        $("#completo").prop("checked", true);
        $("#formCompleto").hide();
      }
      if (!datos.result.data.aplica_dependiente && index == 4) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_conyuge && index == 3) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_exp_laboral && index == 2) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
      if (!datos.result.data.aplica_curriculo_declarante && index == 1) {
        $("#completo").prop("checked", true);
        $("#agregar_nuevo").hide();
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
