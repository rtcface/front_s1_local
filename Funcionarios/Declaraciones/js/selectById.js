function selectDatosGenerales() {
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclarante?id_declarante=" +
      id_declarante +
      "&tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
        document.getElementById("nombre").value = datos.result.data.nombres;
        document.getElementById("primerApellido").value =
          datos.result.data.apellido_paterno;
        document.getElementById("segundoApellido").value =
          datos.result.data.apellido_materno;
        document.getElementById("curp").value = datos.result.data.curp;
        document.getElementById("rfc").value = datos.result.data.rfc;
        document.getElementById("homoclave").value =
          datos.result.data.rfc_homoclave;
        document.getElementById("emailInstituto").value =
          datos.result.data.correo_electronico_lab;
        document.getElementById("emailPersonal").value =
          datos.result.data.correo_electronico_per;
        document.getElementById("telParticular").value =
          datos.result.data.tel_per;
        document.getElementById("telCelular").value = datos.result.data.tel_cel;
        $("#nacionalidad").val(datos.result.data.nacionalidad);
        paisNac(datos.result.data.pais_nacimimiento);

        $("#estadoCivil").val(datos.result.data.estado_civil);
        if (datos.result.data.estado_civil == "CASADO (A)") {
          $("#regimen").show();
          if (
            datos.result.data.regimen_matrimonial != "SOCIEDAD CONYUGAL" &&
            datos.result.data.regimen_matrimonial != "SEPARACION DE BIENES"
          ) {
            $("#otroRegimen").show();
            document.getElementById("regimenM").value = "OTRO";
            document.getElementById("otroRegimen").value =
              datos.result.data.regimen_matrimonial;
          } else {
            document.getElementById("regimenM").value =
              datos.result.data.regimen_matrimonial;
            $("#otroRegimen").hide();
          }
        } else {
          $("#regimen").hide();
        }
        if (datos.result.data.serv_publico_anterior) {
          document.getElementById("desempeñoS").checked = true;
        } else {
          document.getElementById("desempeñoN").checked = true;
        }
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;

        actualizar = true;
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
function selectDomicilio() {
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteDomicilioByID?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
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
          $("#extranjero").show();
          $("#paisE").show();
          $("#nacional").hide();
          pais(datos.result.data.pais_domicilio);
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
            datos.result.data.estado_domicilio_extranjero;
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
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        sessionStorage.setItem("idDomicilio", datos.result.data.id);
        actualizar = true;
      } else {
        if (datos.msg == "Not Ok") {
          alert("No hay Información del Domicilio.");
        } else {
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

function selectDomicilioDependiente() {
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteDomicilioByID?tipo_declaracion=" +
      tipoDeclaracion,
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
        if (datos.result.data.pais_domicilio == "146") {
          document.getElementById("lugar").checked = true;
          $("#nacional").show();
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
          $("#extranjero").show();
          $("#paisE").show();
          pais(datos.result.data.pais_domicilio);
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
            datos.result.data.estado_domicilio_extranjero;
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
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
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

function selectDatosCurriculo() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteCurriculoByID?tipo_declaracion=" +
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
        $("#nivelCurriculo").val(datos.result.data.nivel_curricular);
        document.getElementById("institucionEducativa").value =
          datos.result.data.institucion_educativa;
        document.getElementById("carrera").value =
          datos.result.data.especialidad;
        if (
          datos.result.data.nivel_curricular != "PRIMARIA" &&
          datos.result.data.nivel_curricular != "SECUNDARIA" &&
          datos.result.data.nivel_curricular != "BACHILLERATO"
        ) {
          $("#contCarrera").show();
          $("#carrera").prop("required", true);
        } else {
          $("#contCarrera").hide();
          $("#carrera").prop("required", false);
        }
        if (datos.result.data.ubicacion_institucion != "146") {
          document.getElementById("lugarE").checked = true;
          $("#paisE").show();
          pais(datos.result.data.ubicacion_institucion);
        } else {
          document.getElementById("lugar").checked = true;
          $("#paisE").hide();
        }
        if (datos.result.data.ultimo_grado) {
          document.getElementById("ultimoGrado").checked = true;
        } else {
          document.getElementById("ultimoGrado").checked = false;
        }
        $("#estatus").val(datos.result.data.estatus);
        if (datos.result.data.estatus == "FINALIZADO") {
          $("#estatus").attr("disabled", "disabled");
        } else {
          $("#estatus").attr("disabled", false);
        }
        $("#docObtenido").val(datos.result.data.documento_avala);
        $("#finalizado").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_obtencion_doc.split("/").reverse().join("/")
          )
        );
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

function selectEmpleo() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteEncargoActualByID?tipo_declaracion=" +
      tipoDeclaracion +
      "&id_declarador=&id=",
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      if (datos.status) {
        actualizar = true;

        $("#nivelGob").val(datos.result.data.nivel);
        $("#poder").val(datos.result.data.poder);
        if (datos.result.data.nivel == "ESTATAL") {
          $("#ambitoPublico").show();
        } else {
          $("#ambitoPublico").hide();
        }
        document.getElementById("entePublico").value =
          datos.result.data.ente_publico;
        document.getElementById("nombreEmpleo").value =
          datos.result.data.cargo_comision;
        if (datos.result.data.contrato_honorarios) {
          document.getElementById("contratoS").checked = true;
        } else {
          document.getElementById("contratoN").checked = true;
        }
        document.getElementById("nivelEncargo").value =
          datos.result.data.nivel_encargo;
        document.getElementById("areaAds").value =
          datos.result.data.area_adscripcion;
        $("#fecPos").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_posesion.split("/").reverse().join("/")
          )
        );
        document.getElementById("telOficina").value =
          datos.result.data.tel_oficina;
        document.getElementById("extencion").value =
          datos.result.data.ext_tel_oficina;
        document.getElementById("funciones").value =
          datos.result.data.funciones_principales;

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
          $("#tipoVia").val(datos.result.data.tipo_via);
          document.getElementById("nombreVia").value =
            datos.result.data.nombre_via;
          document.getElementById("numExterior").value =
            datos.result.data.no_exterior_domicilio;
          document.getElementById("numInterior").value =
            datos.result.data.no_interior_domicilio;
        } else {
          document.getElementById("lugarE").checked = true;
          $("#extranjero").show();
          $("#paisE").show();
          $("#nacional").hide();
          pais(datos.result.data.pais_domicilio);
          document.getElementById("cpExt").value =
            datos.result.data.cp_domicilio;
          document.getElementById("coloniaExt").value =
            datos.result.data.colonia_domicilio;
          $("#tipoViaExt").val(datos.result.data.tipo_via);
          document.getElementById("nombreViaExt").value =
            datos.result.data.nombre_via;
          document.getElementById("numExteriorExt").value =
            datos.result.data.no_exterior_domicilio;
          document.getElementById("numInteriorExt").value =
            datos.result.data.no_interior_domicilio;
          document.getElementById("entidadExt").value =
            datos.result.data.entidad_domicilio_extranjero;
          document.getElementById("municipioExt").value =
            datos.result.data.ciudad_domicilio_extranjero;
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
function selectEmpleoOtro() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteEncargoActualByID?tipo_declaracion=" +
      tipoDeclaracion +
      "&id_declarador=" +
      id_declarante +
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
        if (datos.result.data.otro_empleo) {
          $("#formCompleto")
            .find("input, button, select")
            .prop("disabled", false);
        } else {
          $("#formCompleto")
            .find("input, button, select")
            .prop("disabled", true);
        }
        $("#bCancel").prop("disabled", false);
        $("#nivelGob").val(datos.result.data.nivel);
        $("#poder").val(datos.result.data.poder);
        if (datos.result.data.nivel == "ESTATAL") {
          $("#ambitoPublico").show();
        } else {
          $("#ambitoPublico").hide();
        }
        document.getElementById("entePublico").value =
          datos.result.data.ente_publico;
        document.getElementById("nombreEmpleo").value =
          datos.result.data.cargo_comision;
        if (datos.result.data.contrato_honorarios) {
          document.getElementById("contratoS").checked = true;
        } else {
          document.getElementById("contratoN").checked = true;
        }
        document.getElementById("nivelEncargo").value =
          datos.result.data.nivel_encargo;
        document.getElementById("areaAds").value =
          datos.result.data.area_adscripcion;
        $("#fecPos").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_posesion.split("/").reverse().join("/")
          )
        );
        document.getElementById("telOficina").value =
          datos.result.data.tel_oficina;
        document.getElementById("extencion").value =
          datos.result.data.ext_tel_oficina;
        document.getElementById("funciones").value =
          datos.result.data.funciones_principales;

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
          $("#tipoVia").val(datos.result.data.tipo_via);
          document.getElementById("nombreVia").value =
            datos.result.data.nombre_via;
          document.getElementById("numExterior").value =
            datos.result.data.no_exterior_domicilio;
          document.getElementById("numInterior").value =
            datos.result.data.no_interior_domicilio;
          $("#entidadFed").prop("disabled", true);
          $("#municipio").prop("disabled", true);
        } else {
          document.getElementById("lugarE").checked = true;
          $("#extranjero").show();
          $("#paisE").show();
          $("#nacional").hide();
          pais(datos.result.data.pais_domicilio);
          document.getElementById("cpExt").value =
            datos.result.data.cp_domicilio;
          document.getElementById("coloniaExt").value =
            datos.result.data.colonia_domicilio;
          $("#tipoViaExt").val(datos.result.data.tipo_via);
          document.getElementById("nombreViaExt").value =
            datos.result.data.nombre_via;
          document.getElementById("numExteriorExt").value =
            datos.result.data.no_exterior_domicilio;
          document.getElementById("numInteriorExt").value =
            datos.result.data.no_interior_domicilio;
          document.getElementById("entidadExt").value =
            datos.result.data.entidad_domicilio_extranjero;
          document.getElementById("municipioExt").value =
            datos.result.data.ciudad_domicilio_extranjero;
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

function selectExpLaboral() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");
  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteExperienciaLaboralByID?tipo_declaracion=" +
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
          datos.result.data.ambito != "PRIVADO" &&
          datos.result.data.ambito != "PUBLICO"
        ) {
          $("#ambitoEsp").val(datos.result.data.ambito);
          $("#ambito").val("OTRO");
          $("#ambitoEsp").show();
          $("#campoPrivadoRfc").show();
          $("#campoPrivadoSector").show();
          $("#campoPublico").hide();
          $("#campoPublicoFunciones").hide();
          $("#rfc").prop("required", true);
          $("#funciones").prop("required", false);
        } else {
          $("#ambito").val(datos.result.data.ambito);
          $("#ambitoEsp").hide();
          if (datos.result.data.ambito == "PRIVADO") {
            $("#campoPrivadoRfc").show();
            $("#campoPrivadoSector").show();
            $("#campoPublico").hide();
            $("#campoPublicoFunciones").hide();
            $("#rfc").prop("required", true);
            $("#funciones").prop("required", false);
          } else if (datos.result.data.ambito == "PUBLICO") {
            $("#campoPrivadoRfc").hide();
            $("#campoPrivadoSector").hide();
            $("#campoPublico").show();
            $("#campoPublicoFunciones").show();
            $("#funciones").prop("required", true);
            $("#rfc").prop("required", false);
          }
        }
        $("#nivelGob").val(datos.result.data.nivel);
        $("#poder").val(datos.result.data.poder);
        if (datos.result.data.nivel == "ESTATAL") {
          $("#ambitoPublico").show();
        } else {
          $("#ambitoPublico").hide();
        }
        document.getElementById("nombreEnte").value =
          datos.result.data.nombre_institucion;
        document.getElementById("area").value =
          datos.result.data.unidad_administrativa;
        document.getElementById("rfc").value = datos.result.data.rfc;
        document.getElementById("cargo").value = datos.result.data.cargo_puesto;
        document.getElementById("funciones").value =
          datos.result.data.funciones_principales;
        $("#fecIngreso").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_ingreso.split("/").reverse().join("/")
          )
        );
        if (datos.result.data.empleo_actual) {
          $("#trabajo_actual").attr("checked", true);
          $("#fecSalida").attr("disabled", "disabled");
        } else {
          $("#fecSalida").datepicker(
            "setDate",
            new Date(
              datos.result.data.fecha_salida.split("/").reverse().join("/")
            )
          );
          $("#trabajo_actual").attr("checked", false);
          $("#fecSalida").attr("disabled", false);
        }

        if (datos.result.data.pais_domicilio != "146") {
          document.getElementById("lugarE").checked = true;
          $("#paisE").show();
          pais(datos.result.data.pais_domicilio);
        } else {
          document.getElementById("lugar").checked = true;
          $("#paisE").hide();
        }
        if (
          datos.result.data.sector_industria == "sector_17" &&
          datos.result.data.ambito != "PUBLICO"
        ) {
          $("#" + datos.result.data.sector_industria).prop("checked", true);
          $("#otroSector").show();
          $("#otroSector").val(datos.result.data.otro_sector_industria);
        } else if (
          datos.result.data.sector_industria != "sector_17" &&
          datos.result.data.ambito != "PUBLICO"
        ) {
          $("#" + datos.result.data.sector_industria).prop("checked", true);
          $("#otroSector").hide();
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
function selectDatosParejaDependiente(pareja) {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/declarante/selectDeclaranteConyugeDepByID?tipo_declaracion=" +
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
      if (datos.status) {
        actualizar = true;

        if (
          datos.result.data.tipo_relacion != "CONYUGE" &&
          datos.result.data.tipo_relacion !=
            "CONCUBINA / CONCUBINARIO / UNION LIBRE" &&
          datos.result.data.tipo_relacion != "SOCIEDAD DE CONVIVENCIA" &&
          datos.result.data.tipo_relacion != "ABUELO (A)" &&
          datos.result.data.tipo_relacion != "AHIJADO (A)" &&
          datos.result.data.tipo_relacion != "Cuñado (A)" &&
          datos.result.data.tipo_relacion != "HERMANO (A)" &&
          datos.result.data.tipo_relacion != "HIJO (A)" &&
          datos.result.data.tipo_relacion != "MADRE" &&
          datos.result.data.tipo_relacion != "Nieto (A)" &&
          datos.result.data.tipo_relacion != "PADRE" &&
          datos.result.data.tipo_relacion != "PRIMO (A)" &&
          datos.result.data.tipo_relacion != "SOBRINO (A)" &&
          datos.result.data.tipo_relacion != "Suegro (A)" &&
          datos.result.data.tipo_relacion != "TIO (A)"
        ) {
          $("#otroFam").val(datos.result.data.tipo_relacion);
          $("#tipoRelacion").val("OTRO");
          $("#otroFam").show();
        } else {
          $("#tipoRelacion").val(datos.result.data.tipo_relacion);
          $("#otroFam").hide();
        }
        document.getElementById("nombre").value = datos.result.data.nombres;
        document.getElementById("primerApellido").value =
          datos.result.data.apellido_paterno;
        document.getElementById("segundoApellido").value =
          datos.result.data.apellido_materno;
        document.getElementById("rfc").value = datos.result.data.rfc;
        $("#fecNac").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_nacimiento.split("/").reverse().join("/")
          )
        );
        if (datos.result.data.ciudadano_extranjero) {
          document.getElementById("extranjeroS").checked = true;
          $("#curp").hide();
        } else {
          document.getElementById("extranjeroN").checked = true;
          $("#curp").val(datos.result.data.curp);
          $("#curp").show();
        }
        if (pareja) {
          if (datos.result.data.dependiente_economico) {
            document.getElementById("dependienteS").checked = true;
          } else {
            document.getElementById("dependienteN").checked = true;
          }
        } else {
          if (datos.result.data.dependiente_economico) {
            document.getElementById("dependienteS").checked = true;
          } else {
            document.getElementById("dependienteN").checked = true;
          }
        }
        if (datos.result.data.vive_con_declarante) {
          document.getElementById("habitaS").checked = true;
          $("input:radio[name=lugar]").attr("disabled", "disabled");
          $("#entidadFed").attr("disabled", "disabled");
          $("#municipio").attr("disabled", "disabled");
          $("#cp").attr("disabled", "disabled");
          $("#colonia").attr("disabled", "disabled");
          $("#tipoVia").attr("disabled", "disabled");
          $("#nombreVia").attr("disabled", "disabled");
          $("#numExterior").attr("disabled", "disabled");
          $("#numInterior").attr("disabled", "disabled");
          $("#entidadExt").attr("disabled", "disabled");
          $("#municipioExt").attr("disabled", "disabled");
          $("#cpExt").attr("disabled", "disabled");
          $("#coloniaExt").attr("disabled", "disabled");
          $("#tipoViaExt").attr("disabled", "disabled");
          $("#nombreViaExt").attr("disabled", "disabled");
          $("#numExteriorExt").attr("disabled", "disabled");
          $("#numInteriorExt").attr("disabled", "disabled");
          $("#pais").attr("disabled", "disabled");
        } else {
          document.getElementById("habitaN").checked = true;
          $("input:radio[name=lugar]").attr("disabled", false);
          $("#cp").attr("disabled", false);
          $("#colonia").attr("disabled", false);
          $("#tipoVia").attr("disabled", false);
          $("#nombreVia").attr("disabled", false);
          $("#numExterior").attr("disabled", false);
          $("#numInterior").attr("disabled", false);
          $("#entidadExt").attr("disabled", false);
          $("#municipioExt").attr("disabled", false);
          $("#cpExt").attr("disabled", false);
          $("#coloniaExt").attr("disabled", false);
          $("#tipoViaExt").attr("disabled", false);
          $("#nombreViaExt").attr("disabled", false);
          $("#numExteriorExt").attr("disabled", false);
          $("#numInteriorExt").attr("disabled", false);
          $("#pais").attr("disabled", false);
          document.getElementById("lugar").checked = true;
          $("#cp").val("");
          var selector2 = document.getElementById("colonia");
          var selTam2 = selector2.options.length;
          for (var j = selTam2 - 1; j > -1; j--) {
            selector2.options[j] = null;
          }
          $("#nombreVia").val("");
          $("#numExterior").val("");
          $("#numInterior").val("");
          $("#entidadExt").val("");
          $("#municipioExt").val("");
          $("#cpExt").val("");
          $("#coloniaExt").val("");
          $("#nombreViaExt").val("");
          $("#numExteriorExt").val("");
          $("#numInteriorExt").val("");
        }
        if (datos.result.data.pais_domicilio == "146") {
          document.getElementById("lugar").checked = true;
          $("#nacional").show();
          $("#extranjero").hide();
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
        } else if (
          datos.result.data.pais_domicilio > "0" &&
          datos.result.data.pais_domicilio != "146"
        ) {
          document.getElementById("lugarE").checked = true;
          $("#nacional").hide();
          $("#extranjero").show();
          $("#paisE").show();
          pais(datos.result.data.pais_domicilio);
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
        } else if (datos.result.data.pais_domicilio == "0") {
          document.getElementById("lugarN").checked = true;
          $("#nacional").hide();
          $("#extranjero").hide();
        }
        $("#ambito").val(datos.result.data.actividad_laboral);
        $("#nivelGob").val(datos.result.data.nivel);
        $("#poder").val(datos.result.data.poder);
        if (datos.result.data.nivel == "ESTATAL") {
          $("#ambitoPublico").show();
        } else {
          $("#ambitoPublico").hide();
        }
        document.getElementById("nombreEnte").value =
          datos.result.data.nombre_institucion;
        document.getElementById("area").value =
          datos.result.data.area_adscripcion;
        document.getElementById("rfcEmpresa").value =
          datos.result.data.rfc_empresa;
        document.getElementById("cargo").value = datos.result.data.cargo_puesto;
        document.getElementById("funciones").value =
          datos.result.data.funciones_principales;
        if (datos.result.data.fecha_ingreso != "") {
          $("#fecIngreso").datepicker(
            "setDate",
            new Date(
              datos.result.data.fecha_ingreso.split("/").reverse().join("/")
            )
          );
        }
        document.getElementById("salario").value =
          datos.result.data.salario_mensual_neto;
        if (datos.result.data.proveedor_gobierno) {
          document.getElementById("proveedorS").checked = true;
        } else {
          document.getElementById("proveedorN").checked = true;
        }

        if (
          datos.result.data.sector_industria == "sector_17" &&
          datos.result.data.actividad_laboral != "PUBLICO"
        ) {
          $("#" + datos.result.data.sector_industria).prop("checked", true);
          $("#otroSector").show();
          $("#otroSector").val(datos.result.data.otro_sector_industria);
        } else if (
          datos.result.data.sector_industria != "sector_17" &&
          datos.result.data.actividad_laboral != "PUBLICO"
        ) {
          $("#" + datos.result.data.sector_industria).prop("checked", true);
          $("#otroSector").hide();
        }
        if (datos.result.data.actividad_laboral == "PRIVADO") {
          $("#contPublico").hide();
          $("#ambitoEsp").hide();
          $("#cont1").show();
          $("#cont2").show();
          $("#cont3").show();
          $("#contProveedor").show();
          $("#contSector").show();
          $("#rfcPrivado").show();
          $("#areaPublico").hide();
          $("#funcionesPublico").hide();
          $("#nombreEnte").prop("required", true);
          $("#area").prop("required", false);
          $("#rfcEmpresa").prop("required", true);
          $("#cargo").prop("required", true);
          $("#funciones").prop("required", false);
          $("#fecIngreso").prop("required", true);
          $("#salario").prop("required", true);
        } else if (datos.result.data.actividad_laboral == "PUBLICO") {
          $("#contPublico").show();
          $("#ambitoEsp").hide();
          $("#cont1").show();
          $("#cont2").show();
          $("#cont3").show();
          $("#contProveedor").hide();
          $("#contSector").hide();
          $("#rfcPrivado").hide();
          $("#areaPublico").show();
          $("#funcionesPublico").show();
          $("#nombreEnte").prop("required", true);
          $("#area").prop("required", true);
          $("#rfcEmpresa").prop("required", false);
          $("#cargo").prop("required", true);
          $("#funciones").prop("required", true);
          $("#fecIngreso").prop("required", true);
          $("#salario").prop("required", true);
        } else if (datos.result.data.actividad_laboral == "OTRO") {
          $("#contPublico").hide();
          $("#cont1").show();
          $("#cont2").show();
          $("#cont3").show();
          $("#contProveedor").show();
          $("#contSector").show();
          $("#ambitoEsp").show();
          $("#rfcPrivado").show();
          $("#areaPublico").hide();
          $("#funcionesPublico").hide();
          $("#nombreEnte").prop("required", true);
          $("#area").prop("required", false);
          $("#rfcEmpresa").prop("required", true);
          $("#cargo").prop("required", true);
          $("#funciones").prop("required", false);
          $("#fecIngreso").prop("required", true);
          $("#salario").prop("required", true);
        } else if (datos.result.data.actividad_laboral == "NINGUNO") {
          $("#contPublico").hide();
          $("#cont1").hide();
          $("#cont2").hide();
          $("#cont3").hide();
          $("#contProveedor").hide();
          $("#contSector").hide();
          $("#ambitoEsp").hide();
          $("#areaPublico").hide();
          $("#funcionesPublico").hide();
          $("#rfcPrivado").hide();
          $("#nombreEnte").prop("required", false);
          $("#area").prop("required", false);
          $("#rfcEmpresa").prop("required", false);
          $("#cargo").prop("required", false);
          $("#funciones").prop("required", false);
          $("#fecIngreso").prop("required", false);
          $("#salario").prop("required", false);
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

function selectPrestamos() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/pasivos/selectPasivosPrestamoComodatoByID?tipo_declaracion=" +
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

        if (datos.result.data.inmueble) {
          document.getElementById("inmueble").checked = true;
          $("#contenedorInmueble").show();
          $("#contenedorvehiculo").hide();
          if (
            datos.result.data.tipo_inmueble != "CASA" &&
            datos.result.data.tipo_inmueble != "DEPARTAMENTO" &&
            datos.result.data.tipo_inmueble != "EDIFICIO" &&
            datos.result.data.tipo_inmueble != "LOCAL COMERCIAL" &&
            datos.result.data.tipo_inmueble != "BODEGA" &&
            datos.result.data.tipo_inmueble != "PALCO" &&
            datos.result.data.tipo_inmueble != "RANCHO" &&
            datos.result.data.tipo_inmueble != "TERRENO"
          ) {
            $("#otroInmueble").val(datos.result.data.tipo_inmueble);
            $("#tipoInmueble").val("OTRO");
            $("#otroInmueble").show();
          } else {
            $("#tipoInmueble").val(datos.result.data.tipo_inmueble);
            $("#otroInmueble").hide();
          }
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
            document.getElementById("cp").value =
              datos.result.data.cp_domicilio;
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
            pais(datos.result.data.pais_domicilio);
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
          $("#marca").prop("required", false);
          $("#modelo").prop("required", false);
          $("#anio").prop("required", false);
          $("#numeroSerie").prop("required", false);
        } else {
          $("#marca").prop("required", true);
          $("#modelo").prop("required", true);
          $("#anio").prop("required", true);
          $("#numeroSerie").prop("required", true);
          $("#entidadExt").prop("required", false);
          $("#municipioExt").prop("required", false);
          $("#cpExt").prop("required", false);
          $("#coloniaExt").prop("required", false);
          $("#nombreViaExt").prop("required", false);
          $("#numExteriorExt").prop("required", false);
          $("#cp").prop("required", false);
          $("#colonia").prop("required", false);
          $("#nombreVia").prop("required", false);
          $("#numExterior").prop("required", false);

          document.getElementById("vehiculo").checked = true;
          $("#contenedorvehiculo").show();
          $("#contenedorInmueble").hide();
          if (
            datos.result.data.tipo_vehiculo != "AUTOMOVIL O MOTOCICLETA" &&
            datos.result.data.tipo_vehiculo != "AERONAVE" &&
            datos.result.data.tipo_vehiculo != "BARCO O YATE"
          ) {
            $("#otroVehiculo").val(datos.result.data.tipo_vehiculo);
            $("#tipoVehiculo").val("OTRO");
            $("#otroVehiculo").show();
          } else {
            $("#tipoVehiculo").val(datos.result.data.tipo_vehiculo);
            $("#otroVehiculo").hide();
          }
          document.getElementById("marca").value =
            datos.result.data.marca_vehiculo;
          document.getElementById("modelo").value =
            datos.result.data.modelo_vehiculo;
          document.getElementById("anio").value =
            datos.result.data.anio_vehiculo;
          document.getElementById("numeroSerie").value =
            datos.result.data.no_serie_vehiculo;
          if (datos.result.data.pais_registro_vehiculo != "146") {
            document.getElementById("registroE").checked = true;
            pais2(datos.result.data.pais_registro_vehiculo);
            $("#pais2").show();
            $("#entidadFed2").hide();
          } else {
            document.getElementById("registroM").checked = true;
            estado2(datos.result.data.entidad_registro_vehiculo);
            $("#pais2").hide();
            $("#entidadFed2").show();
          }
        }

        if (
          datos.result.data.relacion_titular != "Conyuge" &&
          datos.result.data.relacion_titular != "Concubina o Concubinario" &&
          datos.result.data.relacion_titular != "ABUELO (A)" &&
          datos.result.data.relacion_titular != "AHIJADO (A)" &&
          datos.result.data.relacion_titular != "CUÑADO (A)" &&
          datos.result.data.relacion_titular != "HERMANO (A)" &&
          datos.result.data.relacion_titular != "HIJO (A)" &&
          datos.result.data.relacion_titular != "MADRE" &&
          datos.result.data.relacion_titular != "NIETO (A)" &&
          datos.result.data.relacion_titular != "PADRE" &&
          datos.result.data.relacion_titular != "PRIMO (A)" &&
          datos.result.data.relacion_titular != "SOBRINO (A)" &&
          datos.result.data.relacion_titular != "SUEGRO (A)" &&
          datos.result.data.relacion_titular != "TIO (A)"
        ) {
          $("#otroFam").val(datos.result.data.relacion_titular);
          $("#tipoRelacion").val("OTRO");
          $("#otroFam").show();
        } else {
          $("#tipoRelacion").val(datos.result.data.relacion_titular);
          $("#otroFam").hide();
        }
        document.getElementById("nombreTitular").value =
          datos.result.data.titular_vehiculo;
        document.getElementById("rfc").value =
          datos.result.data.rfc_titular_vehiculo;
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        if (datos.result.data.titular_fisica) {
          document.getElementById("transmisorFisico").checked = true;
        } else {
          document.getElementById("transmisorMoral").checked = true;
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
function selectEmpresasSociedades() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesEmpSocByID?tipo_declaracion=" +
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

        if (datos.result.data.declarante) {
          document.getElementById("declarador").checked = true;
        } else if (datos.result.data.pareja) {
          document.getElementById("parejaDeclarador").checked = true;
        } else if (datos.result.data.dependiente_economico) {
          document.getElementById("dependienteDeclarador").checked = true;
        }
        document.getElementById("nombreEmpresa").value =
          datos.result.data.nombre;
        document.getElementById("rfc").value = datos.result.data.rfc;
        document.getElementById("porcentaje").value =
          datos.result.data.porcentaje_participacion;
        if (
          datos.result.data.tipo_participacion != "SOCIO" &&
          datos.result.data.tipo_participacion != "ACCIONISTA" &&
          datos.result.data.tipo_participacion != "COMISARIO" &&
          datos.result.data.tipo_participacion != "REPRESENTANTE" &&
          datos.result.data.tipo_participacion != "APODERADO" &&
          datos.result.data.tipo_participacion != "COLABORADOR" &&
          datos.result.data.tipo_participacion != "BENEFICIARIO"
        ) {
          $("#tipoParticipacion").val("OTRO");
          document.getElementById("otraPart").value =
            datos.result.data.otro_tipo_participacion;
          $("#otraPart").show();
        } else {
          $("#tipoParticipacion").val(datos.result.data.tipo_participacion);
          $("#otraPart").hide();
        }
        if (datos.result.data.recibe_remuneracion) {
          document.getElementById("remuneracionS").checked = true;
          $("#montoRemuneracion").show();
        } else {
          document.getElementById("remuneracionN").checked = true;
          $("#montoRemuneracion").hide();
        }
        if (datos.result.data.pais_domicilio != "146") {
          document.getElementById("registroE").checked = true;
          pais(datos.result.data.pais_domicilio);
          $("#pais").show();
          $("#entidadFed").hide();
        } else {
          document.getElementById("registroM").checked = true;
          estado(datos.result.data.entidad_domicilio);
          $("#pais").hide();
          $("#entidadFed").show();
        }
        if (datos.result.data.id_sector_industria == "sector_17") {
          $("#" + datos.result.data.id_sector_industria).prop("checked", true);
          $("#otroSector").show();
          $("#otroSector").val(datos.result.data.otro_sector_industria);
        } else {
          $("#" + datos.result.data.id_sector_industria).prop("checked", true);
          $("#otroSector").hide();
        }
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        document.getElementById("monto").value =
          datos.result.data.monto_remuneracion;
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
function selectInstituciones() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesInstitucionesByID?tipo_declaracion=" +
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

        if (datos.result.data.declarante) {
          document.getElementById("declarador").checked = true;
        } else if (datos.result.data.pareja) {
          document.getElementById("parejaDeclarador").checked = true;
        } else if (datos.result.data.dependiente_economico) {
          document.getElementById("dependienteDeclarador").checked = true;
        }
        if (
          datos.result.data.tipo_institucion != "OSC" &&
          datos.result.data.tipo_institucion != "OB" &&
          datos.result.data.tipo_institucion != "PP" &&
          datos.result.data.tipo_institucion != "GS"
        ) {
          $("#tipoInstitucion").val("OTRO");
          document.getElementById("otraInst").value =
            datos.result.data.tipo_institucion;
          $("#otraInst").show();
        } else {
          $("#tipoInstitucion").val(datos.result.data.tipo_institucion);
          $("#otraInst").hide();
        }
        document.getElementById("nombreInstitucion").value =
          datos.result.data.nombre_institucion;
        document.getElementById("rfc").value = datos.result.data.rfc;
        document.getElementById("puesto").value = datos.result.data.puesto_rol;
        $("#fechaInicio").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_inicio_part.split("/").reverse().join("/")
          )
        );
        if (datos.result.data.recibe_remuneracion) {
          document.getElementById("remuneracionS").checked = true;
          $("#montoRemuneracion").show();
        } else {
          document.getElementById("remuneracionN").checked = true;
          $("#montoRemuneracion").hide();
        }
        if (datos.result.data.pais_ubicacion != "146") {
          document.getElementById("registroE").checked = true;
          pais(datos.result.data.pais_ubicacion);
          $("#pais").show();
          $("#entidadFed").hide();
        } else {
          document.getElementById("registroM").checked = true;
          estado(datos.result.data.entidad_ubicacion);
          $("#pais").hide();
          $("#entidadFed").show();
        }
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        document.getElementById("monto").value =
          datos.result.data.monto_remuneracion;
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
function selectApoyosBeneficios() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesBeneficiosPublicosByID?tipo_declaracion=" +
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
          datos.result.data.beneficiario != "DECLARANTE" &&
          datos.result.data.beneficiario != "CONYUGE" &&
          datos.result.data.beneficiario != "CONCUBINA O CONCUBINARIO" &&
          datos.result.data.beneficiario != "ABUELO (A)" &&
          datos.result.data.beneficiario != "AHIJADO (A)" &&
          datos.result.data.beneficiario != "CUÑADO (A)" &&
          datos.result.data.beneficiario != "HERMANO (A)" &&
          datos.result.data.beneficiario != "HIJO (A)" &&
          datos.result.data.beneficiario != "MADRE" &&
          datos.result.data.beneficiario != "NIETO (A)" &&
          datos.result.data.beneficiario != "PADRE" &&
          datos.result.data.beneficiario != "PRIMO (A)" &&
          datos.result.data.beneficiario != "SOBRINO (A)" &&
          datos.result.data.beneficiario != "SUEGRO (A)" &&
          datos.result.data.beneficiario != "TIO (A)"
        ) {
          $("#otroFam").val(datos.result.data.beneficiario);
          $("#beneficiario").val("OTRO");
          $("#otroFam").show();
        } else {
          $("#beneficiario").val(datos.result.data.beneficiario);
          $("#otroFam").hide();
        }
        document.getElementById("nombrePrograma").value =
          datos.result.data.nombre_programa;
        document.getElementById("institucion").value =
          datos.result.data.nombre_otorgante;
        $("#nivelGob").val(datos.result.data.nivel);
        if (
          datos.result.data.tipo_beneficio != "SUBSIDIO" &&
          datos.result.data.tipo_beneficio != "SERVICIO" &&
          datos.result.data.tipo_beneficio != "OBRA"
        ) {
          $("#otroApoyo").val(datos.result.data.tipo_beneficio);
          $("#tipo_beneficio").val("OTRO");
          $("#otroApoyo").show();
        } else {
          $("#tipo_beneficio").val(datos.result.data.tipo_beneficio);
          $("#otroApoyo").hide();
        }
        if (datos.result.data.forma_beneficio == "MONETARIO") {
          document.getElementById("recepcionM").checked = true;
          $("#apoyoEspecifico").hide();
        } else {
          document.getElementById("recepcionE").checked = true;
          $("#apoyoEspecifico").show();
          document.getElementById("espApoyo").value =
            datos.result.data.especifica_beneficio;
        }
        document.getElementById("monto").value =
          datos.result.data.monto_beneficio;
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
function selectRepresentacion() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesRepresentacionActivaByID?tipo_declaracion=" +
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

        if (datos.result.data.declarante) {
          document.getElementById("declarador").checked = true;
        } else if (datos.result.data.pareja) {
          document.getElementById("parejaDeclarador").checked = true;
        } else if (datos.result.data.dependiente_economico) {
          document.getElementById("dependienteDeclarador").checked = true;
        }
        if (datos.result.data.tipo_repreentacion == "REPRESENTANTE") {
          document.getElementById("representante").checked = true;
        } else {
          document.getElementById("representado").checked = true;
        }
        document.getElementById("nombreRazon").value =
          datos.result.data.nombre_representado;
        document.getElementById("rfc").value =
          datos.result.data.rfc_representado;
        $("#fechaInicio").datepicker(
          "setDate",
          new Date(
            datos.result.data.fecha_inicio.split("/").reverse().join("/")
          )
        );
        if (datos.result.data.recibe_remuneracion) {
          document.getElementById("remuneracionS").checked = true;
          $("#montoRemuneracion").show();
        } else if (datos.result.data.pareja) {
          document.getElementById("remuneracionN").checked = true;
          $("#montoRemuneracion").hide();
        }
        document.getElementById("monto").value =
          datos.result.data.monto_representacion;
        if (datos.result.data.pais_rep != "146") {
          document.getElementById("registroE").checked = true;
          pais(datos.result.data.pais_rep);
          $("#pais").show();
          $("#entidadFed").hide();
        } else {
          document.getElementById("registroM").checked = true;
          estado(datos.result.data.entidad_rep);
          $("#pais").hide();
          $("#entidadFed").show();
        }
        if (datos.result.data.id_sector_industria == "sector_17") {
          $("#" + datos.result.data.id_sector_industria).prop("checked", true);
          $("#otroSector").show();
          $("#otroSector").val(datos.result.data.otro_sector_industria);
        } else {
          $("#" + datos.result.data.id_sector_industria).prop("checked", true);
          $("#otroSector").hide();
        }
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        if (datos.result.data.representado_fisica) {
          document.getElementById("reprFisico").checked = true;
          $("#rfc").attr(
            "pattern",
            "([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})"
          );
        } else {
          document.getElementById("reprMoral").checked = true;
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
function selectClientesPrincipales() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesClientesPrincipalesByID?tipo_declaracion=" +
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

        if (datos.result.data.declarante) {
          document.getElementById("declarador").checked = true;
        } else if (datos.result.data.pareja) {
          document.getElementById("parejaDeclarador").checked = true;
        } else if (datos.result.data.dependiente_economico) {
          document.getElementById("dependienteDeclarador").checked = true;
        }
        if (datos.result.data.actividad_lucrativa) {
          document.getElementById("actividadLucrativaS").checked = true;
        } else {
          document.getElementById("actividadLucrativaN").checked = true;
        }
        document.getElementById("nombreEmpresa").value =
          datos.result.data.nombre_empresa;
        document.getElementById("rfc").value = datos.result.data.rfc_empresa;
        document.getElementById("nombreCliente").value =
          datos.result.data.nombre_cte_principal;
        document.getElementById("rfcCliente").value =
          datos.result.data.rfc_cte_principal;
        if (datos.result.data.id_sector_industria == "sector_17") {
          $("#" + datos.result.data.id_sector_industria).prop("checked", true);
          $("#otroSector").show();
          $("#otroSector").val(datos.result.data.otro_sector_industria);
        } else {
          $("#" + datos.result.data.id_sector_industria).prop("checked", true);
          $("#otroSector").hide();
        }
        document.getElementById("monto").value =
          datos.result.data.ganancia_por_cte_principal;
        if (datos.result.data.pais_domicilio_extranjero != "146") {
          document.getElementById("registroE").checked = true;
          pais(datos.result.data.pais_domicilio_extranjero);
          $("#pais").show();
          $("#entidadFed").hide();
        } else {
          document.getElementById("registroM").checked = true;
          estado(datos.result.data.ciudad_domicilio_extranjero);
          $("#pais").hide();
          $("#entidadFed").show();
        }
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        if (datos.result.data.cliente_fisica) {
          document.getElementById("clientFisico").checked = true;
        } else {
          document.getElementById("clientMoral").checked = true;
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
function selectBeneficiosPrivados() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesBeneficiosPrivadosByID?tipo_declaracion=" +
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
          datos.result.data.tipo_beneficio != "SORTEO" &&
          datos.result.data.tipo_beneficio != "CONCURSO" &&
          datos.result.data.tipo_beneficio != "DONACION"
        ) {
          $("#otroApoyo").val(datos.result.data.tipo_beneficio);
          $("#tipoApoyo").val("OTRO");
          $("#otroApoyo").show();
        } else {
          $("#tipoApoyo").val(datos.result.data.tipo_beneficio);
          $("#otroApoyo").hide();
        }
        if (
          datos.result.data.beneficiario != "DECLARANTE" &&
          datos.result.data.beneficiario != "CONYUGE" &&
          datos.result.data.beneficiario != "CONCUBINA O CONCUBINARIO" &&
          datos.result.data.beneficiario != "ABUELO (A)" &&
          datos.result.data.beneficiario != "AHIJADO (A)" &&
          datos.result.data.beneficiario != "CUÑADO (A)" &&
          datos.result.data.beneficiario != "HERMANO (A)" &&
          datos.result.data.beneficiario != "HIJO (A)" &&
          datos.result.data.beneficiario != "MADRE" &&
          datos.result.data.beneficiario != "NIETO (A)" &&
          datos.result.data.beneficiario != "PADRE" &&
          datos.result.data.beneficiario != "PRIMO (A)" &&
          datos.result.data.beneficiario != "SOBRINO (A)" &&
          datos.result.data.beneficiario != "SUEGRO (A)" &&
          datos.result.data.beneficiario != "TIO (A)"
        ) {
          $("#otroFam").val(datos.result.data.beneficiario);
          $("#beneficiario").val("OTRO");
          $("#otroFam").show();
        } else {
          $("#beneficiario").val(datos.result.data.beneficiario);
          $("#otroFam").hide();
        }
        document.getElementById("nombreOtorgante").value =
          datos.result.data.nombre_otorgante;
        document.getElementById("rfc").value = datos.result.data.rfc_otorgante;
        if (datos.result.data.forma_beneficio == "MONETARIO") {
          document.getElementById("recepcionM").checked = true;
          $("#apoyoEspecifico").hide();
        } else {
          document.getElementById("recepcionE").checked = true;
          $("#apoyoEspecifico").show();
          document.getElementById("espApoyo").value =
            datos.result.data.especifica_beneficio;
        }
        document.getElementById("monto").value = datos.result.data.monto;
        document.getElementById("tipoMoneda").value = datos.result.data.moneda;
        if (datos.result.data.sector_industria == "sector_17") {
          $("#" + datos.result.data.sector_industria).prop("checked", true);
          $("#otroSector").show();
          $("#otroSector").val(datos.result.data.otro_sector_industria);
        } else {
          $("#" + datos.result.data.sector_industria).prop("checked", true);
          $("#otroSector").hide();
        }
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        if (datos.result.data.otorgante_fisica) {
          document.getElementById("otorganteFisico").checked = true;
          $("#rfc").attr(
            "pattern",
            "([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})"
          );
        } else {
          document.getElementById("otorganteMoral").checked = true;
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
function selectFideicomisos() {
  var nFilas = $("#tablaCurriculares tr").length;
  for (var i = 0; i < nFilas; i++) {
    var id = "#posicion" + i;
    if ($(id).is(":checked")) {
      idDeclaracion = $(id).val();
    }
  }
  $("#agregar_nuevo").attr("disabled", "disabled");

  $.ajax({
    url:
      ip +
      "/declaraciones/intereses/selectInteresesFideicomisosByID?tipo_declaracion=" +
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

        if (datos.result.data.declarante) {
          document.getElementById("declarador").checked = true;
        } else if (datos.result.data.pareja) {
          document.getElementById("parejaDeclarador").checked = true;
        } else if (datos.result.data.dependiente_economico) {
          document.getElementById("dependienteDeclarador").checked = true;
        }

        document.getElementById("tipoFideicomiso").value =
          datos.result.data.tipo_fideicomiso;
        document.getElementById("tipoParticipacion").value =
          datos.result.data.tipo_participacion;
        document.getElementById("rfcFideicomiso").value =
          datos.result.data.rfc_fideicomiso;
        document.getElementById("nombreFideicomitente").value =
          datos.result.data.nombre_fideicomitente;
        document.getElementById("rfcFideicomitente").value =
          datos.result.data.rfc_fideicomitente;
        document.getElementById("nombreFiduciario").value =
          datos.result.data.nombre_fidiuciario;
        document.getElementById("rfcFiduciario").value =
          datos.result.data.rfc_fidiuciario;
        document.getElementById("nombreFideicomisario").value =
          datos.result.data.nombre_fideicomisario;
        document.getElementById("rfcFideicomisario").value =
          datos.result.data.rfc_fideicomisario;

        if (datos.result.data.id_sector_industria == "sector_17") {
          $("#" + datos.result.data.id_sector_industria).prop("checked", true);
          $("#otroSector").show();
          $("#otroSector").val(datos.result.data.otro_sector_industria);
        } else {
          $("#" + datos.result.data.id_sector_industria).prop("checked", true);
          $("#otroSector").hide();
        }
        if (datos.result.data.pais_fideicomiso != "146") {
          document.getElementById("registroE").checked = true;
          pais(datos.result.data.pais_fideicomiso);
          $("#pais").show();
          $("#entidadFed").hide();
        } else {
          document.getElementById("registroM").checked = true;
          estado(datos.result.data.estado_fideicomiso);
          $("#pais").hide();
          $("#entidadFed").show();
        }
        document.getElementById("obsComentarios").value =
          datos.result.data.observaciones;
        if (datos.result.data.fideicomitente_fisica) {
          document.getElementById("fideicomitenteFisico").checked = true;
          $("#rfcFideicomitente").attr(
            "pattern",
            "([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})"
          );
        } else {
          document.getElementById("fideicomitenteMoral").checked = true;
          $("#rfcFideicomitente").attr(
            "pattern",
            "([A-ZÑ\x26a-zñ\x26]{3}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})"
          );
        }
        if (datos.result.data.fideicomisario_fisica) {
          document.getElementById("fideicomisarioFisico").checked = true;
          $("#rfcFideicomisario").attr(
            "pattern",
            "([A-ZÑ\x26a-zñ\x26]{4}([0-9]{2})(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1]))([A-Za-z0-9]{3})"
          );
        } else {
          document.getElementById("fideicomisarioMoral").checked = true;
          $("#rfcFideicomisario").attr(
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

var ip = sessionStorage.getItem("ip");
var tipoDeclaracion = sessionStorage.getItem("tipoDec");
var actualizar = false;
var idDeclaracion = 0;
var token = sessionStorage.getItem("token");
var id_declarante = sessionStorage.getItem("declaranteId");

//////////////////// Funciones para completar datos ////////////////////

function paisNac(indice) {
  var selector = document.getElementById("paisNacimiento");
  selector.options[0] = null;
  $.ajax({
    url: ip + "/declaraciones/geoInfo/allPaises",
    type: "GET",
    dataType: "json",
  })
    .done(function (data) {
      var x = document.getElementById("paisNacimiento");
      var option;
      for (var i = 1; i <= Object.keys(data).length; i++) {
        option = document.createElement("option");
        option.text = data[i]["nombre"];
        option.value = data[i]["id_pais"];
        if (data[i]["id_pais"] == indice) {
          option.selected = true;
        }
        x.add(option);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function pais(indice) {
  var selector = document.getElementById("pais");
  selector.options[0] = null;
  $.ajax({
    url: ip + "/declaraciones/geoInfo/allPaises",
    type: "GET",
    dataType: "json",
  })
    .done(function (data) {
      var x = document.getElementById("pais");
      var option;
      for (var i = 0; i < Object.keys(data).length; i++) {
        option = document.createElement("option");
        option.text = data[i]["nombre"];
        option.value = data[i]["id_pais"];
        if (data[i]["id_pais"] == indice) {
          option.selected = true;
        }
        x.add(option);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function estado(indice) {
  $.ajax({
    url: ip + "/declaraciones/geoInfo/allEdos",
    type: "GET",
    dataType: "json",
  })
    .done(function (data) {
      var x = document.getElementById("entidadFed");
      var option;
      for (var i = 0; i < Object.keys(data["data"]).length; i++) {
        option = document.createElement("option");
        option.text = data["data"][i]["nombre"];
        option.value = data["data"][i]["clave"];
        if (indice == option.value) {
          option.selected = true;
        }
        x.add(option);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function pais2(indice) {
  var selector = document.getElementById("pais2");
  selector.options[0] = null;
  $.ajax({
    url: ip + "/declaraciones/geoInfo/allPaises",
    type: "GET",
    dataType: "json",
  })
    .done(function (data) {
      var x = document.getElementById("pais2");
      var option;
      for (var i = 0; i < Object.keys(data).length; i++) {
        option = document.createElement("option");
        option.text = data[i]["nombre"];
        option.value = data[i]["id_pais"];
        if (option.value == indice) {
          option.selected = true;
        }
        x.add(option);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function estado2(indice) {
  $.ajax({
    url: ip + "/declaraciones/geoInfo/allEdos",
    type: "GET",
    dataType: "json",
  })
    .done(function (data) {
      var x = document.getElementById("entidadFed2");
      var option;
      for (var i = 0; i < Object.keys(data["data"]).length; i++) {
        option = document.createElement("option");
        option.text = data["data"][i]["nombre"];
        option.value = data["data"][i]["clave"];
        if (indice == option.value) {
          option.selected = true;
        }
        x.add(option);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function domMunicipio(indice, estado) {
  $.ajax({
    url: ip + "/declaraciones/geoInfo/munByCveEdo?id_estado=" + estado,
    type: "GET",
    dataType: "json",
  })
    .done(function (data) {
      var x = document.getElementById("municipio");
      var option;
      for (var i = 0; i < Object.keys(data).length; i++) {
        option = document.createElement("option");
        option.text = data[i]["nombre"];
        option.value = data[i]["clave"];
        if (indice == option.value) {
          option.selected = true;
        }
        x.add(option);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function domColonia(indice, cp) {
  $.ajax({
    url: ip + "/declaraciones/geoInfo/infoByCP?cp=" + cp,
    type: "GET",
    dataType: "json",
  })
    .done(function (data) {
      var x = document.getElementById("colonia");
      var option;
      for (var i = 0; i < Object.keys(data).length; i++) {
        option = document.createElement("option");
        option.text = data[i]["fraccionamiento"];
        option.value = data[i]["fraccionamiento"];
        if (indice == option.value) {
          option.selected = true;
        }
        x.add(option);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function getEnte() {
  $.ajax({
    url: ip + "/declaraciones/ente/getEntePublicoUserLogged",
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (datos) {
      document.getElementById("entePublico").value =
        datos.result.data.nombre_ente;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function aplicaServidorAnt() {
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
      aplica = datos.result.data.aplica_anterior_servidor;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
var aplica = false;
