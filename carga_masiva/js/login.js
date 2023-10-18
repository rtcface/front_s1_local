function login() {
  idUser = $("#userName").val();
  password = hex_md5($("#password").val());
  $.ajax({
    url: ip + "/declaraciones-desarrollo/data/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      username: idUser,
      password: password,
    }),
  })
    .done(function (data, textStatus, xhr) {
      if (data.status) {
        if (data.result.role == "entadmin") {
          token = xhr.getResponseHeader("X-AUTH-TOKEN");
          sessionStorage.setItem("sesion", true);
          idUser = data.result.id;
          sessionStorage.setItem("rol", data.result.role);
          sessionStorage.setItem("declaranteId", idUser);
          sessionStorage.setItem("token", token);

          $.ajax({
            url: ip + "/declaraciones-desarrollo/control/needChangePassword",
            type: "GET",
            dataType: "json",
            headers: {
              "X-Auth-Token": sessionStorage.getItem("token"),
            },
          })
            .done(function (datos) {
              if (datos.status) {
                $("#acceso").hide();
                $("#nuevaContraseña").show();
                sessionStorage.setItem("pass", password);
              } else {
                refresh = false;
                window.location.href = "alta_declarante.html";
              }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
              alert(jqXHR.responseJSON.msg);
            });
        } else {
          alert("Usuario sin permisos de acceso.");
        }
      } else {
        alert("Usuario o Contraseña Incorrectos");
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {});
}

function sesionI() {
  var entrar = sessionStorage.getItem("sesion");
  if (entrar == false || entrar == null) {
    refresh = false;
    window.location.href = "index.html";
  }
}

function salir() {
  $.ajax({
    url: ip + "/declaraciones-desarrollo/data/logout ",
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": sessionStorage.getItem("token"),
    },
  })
    .done(function (datos, textStatus, xhr) {
      sessionStorage.removeItem("sesion");
      sessionStorage.removeItem("userId");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("rol");
      window.location.href = "../index.html";
    })
    .fail(function (jqXHR, textStatus, errorThrown) {});
}

//---------------- Cambiar Contraseña --------------------//
function passwordNew() {
  if (
    $("#newPassword1").val() == $("#newPassword2").val() &&
    $("#newPassword1").val() != "" &&
    $("#newPassword2").val() != "" &&
    hex_md5($("#oldPassword").val()) == sessionStorage.getItem("pass")
  ) {
    var passwordN = hex_md5($("#newPassword1").val());
    sessionStorage.removeItem("pass");
    $.ajax({
      url:
        ip +
        "/declaraciones-desarrollo/control/updatePassword?psn=" +
        passwordN,
      type: "GET",
      dataType: "json",
      headers: {
        "X-Auth-Token": sessionStorage.getItem("token"),
      },
    })
      .done(function (datos) {
        if (datos.status) {
          alert("Recuerde guardar su contraseña antes de continuar.");
          refresh = false;
          window.location.href = "alta_declarante.html";
        } else {
          alert("Algo salio mal intentelo de nuevo.");
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseJSON.msg);
      });
  } else {
    alert(
      "La nueva contraseña no coincide o la contraseña actual es incorrecta"
    );
  }
}

//---------------- Cargar Archivo --------------------//
function cargarArchivo() {
  var paqueteDeDatos = new FormData();
  paqueteDeDatos.append("file", $("#cargaFile")[0].files[0]);

  if (
    $("#cargaFile")[0].files.length != null &&
    $("#cargaFile")[0].files.length > 0
  ) {
    $("#modalCargando").modal("show");
    $.ajax({
      url: ip + "/declaraciones-desarrollo/masiveUpload/readExcelData",
      type: "POST",
      data: paqueteDeDatos,
      cache: false,
      contentType: false,
      processData: false,
      headers: {
        "X-Auth-Token": token,
      },
    })
      .done(function (data, textStatus, xhr) {
        $("#modalCargando").modal("hide");
        if ($("#modalCargando").hasClass("in")) {
          $("#modalCargando").modal("hide");
        } else {
          if (data.status) {
            alert(data.result.msg);
            refresh = false;
            location.reload();
          } else {
            alert(data.result.msg);
            refresh = false;
            location.reload();
          }
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        alert("Error al subir el archivo.");
        refresh = false;
        location.reload();
      });
  } else {
    alert("No se ha seleccionado ningun archivo excel.");
  }
}

//---------------- Aprobar Usuarios --------------------//
function aprobarUsers() {
  $("#modalCargando").modal("show");
  $.ajax({
    url: ip + "/declaraciones-desarrollo/masiveUpload/aprobarUserMU",
    type: "POST",
    headers: {
      "X-Auth-Token": token,
    },
  })
    .done(function (data, textStatus, xhr) {
      $("#modalCargando").modal("hide");
      if (data.status) {
        alert(data.msg);
        refresh = false;
        location.reload();
      } else {
        $("#myModal").modal("show");
        $("#listaFallas").append(data.msg);
        refresh = false;
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert("Error del servicio.");
    });
}

//---------------- Cargar Ente Publico Al Que Pertenece --------------------//
function entes() {
  $.ajax({
    url: ip + "/declaraciones-desarrollo/ente/getEntePublicoUserLogged",
    type: "GET",
    dataType: "json",
    headers: {
      "X-Auth-Token": sessionStorage.getItem("token"),
    },
  })
    .done(function (datos) {
      var x = document.getElementById("entePublico");
      var option;

      option = document.createElement("option");
      option.text = datos.result.data.nombre_ente;
      option.value = datos.result.data.id;
      x.add(option);
      ente = datos.result.data.id;
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

var idUser;
var password;
var token;
var actualizar = false;
var actualizarEnte = false;
var actualizarEmail = false;
refresh = true;
var ip = sessionStorage.getItem("ip");
var ente = null;
var idEmpleo = 0;
var idUpdate = null,
  rfcUpdate = null;

//---------------- Desplegar Form Domicilio --------------------//
function mostrarPais() {
  $("body").on("click", ".ext", function () {
    var valor = $(this).val();
    if (valor == "extranjero") {
      $("#paisE").show();
      $("#extranjero").show();
      $("#nacional").hide();
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
    } else {
      $("#paisE").hide();
      $("#extranjero").hide();
      $("#nacional").show();
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
    }
  });
  pedirPaises("pais");
}

//---------------- Desplegar Colonia --------------------//
function desColonia() {
  var selector = document.getElementById("colonia");
  var selTam = selector.options.length;
  for (var j = selTam - 1; j > -1; j--) {
    selector.options[j] = null;
  }
  var cp = document.getElementById("cp").value;
  $.ajax({
    url: ip + "/declaraciones-desarrollo/geoInfo/infoByCP?cp=" + cp,
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
        x.add(option);
      }
      $("#entidadFed").val(data[0]["clave_estado"]);
      domMunicipio(data[0]["clave_municipio"], data[0]["clave_estado"]);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

//---------------- Peticion de Lista de Paises --------------------//
function pedirPaises(id) {
  $.ajax({
    url: ip + "/declaraciones-desarrollo/geoInfo/allPaises",
    type: "GET",
    dataType: "json",
  })
    .done(function (data) {
      var x = document.getElementById(id);
      var option;
      for (var i = 0; i < Object.keys(data).length; i++) {
        option = document.createElement("option");
        option.text = data[i]["nombre"];
        option.value = data[i]["id_pais"];
        x.add(option);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

//---------------- Desplegar Estados --------------------//
function desEstados() {
  $.ajax({
    url: ip + "/declaraciones-desarrollo/geoInfo/allEdos",
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
        x.add(option);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

//---------------- Desplegar Municipio --------------------//
function domMunicipio(indice, estado) {
  $.ajax({
    url:
      ip + "/declaraciones-desarrollo/geoInfo/munByCveEdo?id_estado=" + estado,
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

//---------------- Funciones Extras --------------------//
function mostrarAmbito() {
  var estado = $("#nivelGob").val();
  if (estado == "ESTATAL") {
    $("#ambitoPublico").show();
  } else {
    $("#ambitoPublico").hide();
  }
}

///////////////// Funciones Generales Para Todos Los Formularios /////////////////
$(document).ready(function () {
  var d = new Date(),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  var fecha = year + "-" + month + "-" + day;
  $("input[type='number']").attr("pattern", "[0-9]{0,12}");
  $("input[type='tel']").attr("pattern", "[0-9]{10}");
  $("input[type='tel']").attr("maxlength", "10");
  $("input:radio[name=tipoBien]").prop("required", true);
  $("input:radio[name=declarado]").prop("required", true);
  $("#anio").attr("max", year);
  $(".datepicker").datepicker({
    format: "dd/mm/yyyy",
    startDate: new Date("1940-01-01"),
    endDate: new Date(),
    autoclose: true,
  });
  $(".datepicker").keydown(function (e) {
    e.preventDefault();
  });
  $("input:radio[name=extencion]").attr("pattern", "[0-9]{0,5}");
  $('[data-toggle="popover"]').popover();
});

window.addEventListener("beforeunload", function (event) {
  if (refresh) {
    event.returnValue = "TEXT";
  }
});
