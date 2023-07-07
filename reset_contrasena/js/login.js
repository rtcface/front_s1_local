function login() {
  idUser = $("#userName").val();
  password = hex_md5($("#password").val());
  $.ajax({
    url: ip + "/declaraciones/data/login",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      username: idUser,
      password: password,
    }),
  })
    .done(function (data, textStatus, xhr) {
      if (data.status) {
        token = xhr.getResponseHeader("X-AUTH-TOKEN");
        sessionStorage.setItem("sesion", true);
        idUser = data.result.id;
        sessionStorage.setItem("rol", data.result.role);
        sessionStorage.setItem("declaranteId", idUser);
        sessionStorage.setItem("token", token);
        if (sessionStorage.getItem("rol") == "entadmin") {
          $.ajax({
            url: ip + "/declaraciones/control/needChangePassword",
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
                window.location.href = "Declaraciones/index.html";
              }
            })
            .fail(function (jqXHR, textStatus, errorThrown) {
              alert(jqXHR.responseJSON.msg);
            });
        } else {
          alert("Sus credenciales no son validas.");
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
    window.location.href = "index.html";
  }
}

function salir() {
  $.ajax({
    url: ip + "/declaraciones/data/logout ",
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
      url: ip + "/declaraciones/control/updatePassword?psn=" + passwordN,
      type: "GET",
      dataType: "json",
      headers: {
        "X-Auth-Token": sessionStorage.getItem("token"),
      },
    })
      .done(function (datos) {
        if (datos.status) {
          alert("Recuerde guardar su contraseña antes de continuar.");
          window.location.href = "Declaraciones/index.html";
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

var idUser;
var password;
var token;
var ip = sessionStorage.getItem("ip");

////////////////////////// Sincronizacion //////////////////////////
function sincronizar() {
  idUser = $("#userSincronizacion").val();
  password = hex_md5($("#passSincronizacion").val());
  $.ajax({
    url: ip + "",
    type: "POST",
    contentType: "application/json",
    data: JSON.stringify({
      username: idUser,
      password: password,
    }),
  })
    .done(function (data, textStatus, xhr) {
      if (data.status) {
        var token2 = xhr.getResponseHeader("X-AUTH-TOKEN");
        $.ajax({
          url: ip + "",
          type: "GET",
          dataType: "json",
          headers: {
            "X-Auth-Token": token2,
          },
        })
          .done(function (datos) {
            alert("algo");
          })
          .fail(function (jqXHR, textStatus, errorThrown) {
            alert(jqXHR.responseJSON.msg);
          });
      } else {
        alert("Usuario o Contraseña Incorrectos");
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {});
}

function recuperarPassword() {
  if (
    $("#newPassword1").val() == $("#newPassword2").val() &&
    $("#newPassword1").val() != "" &&
    $("#newPassword2").val() != ""
  ) {
    var passwordN = hex_md5($("#newPassword1").val());
    var enlace = window.location.href;
    var tempToken = enlace.substring(enlace.indexOf("#") + 1);
    $.ajax({
      url: ip + "/declaraciones/control/updatePassword?psn=" + passwordN,
      type: "GET",
      dataType: "json",
      headers: {
        "X-Auth-Token": tempToken,
      },
    })
      .done(function (datos) {
        if (datos.status) {
          alert("Recuerde guardar su contraseña antes de continuar.");
          window.location.href = "../Funcionarios/declaraciones/index.html";
        } else {
          alert("Algo salio mal intentelo de nuevo.");
        }
      })
      .fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseJSON.msg);
      });
  } else {
    alert("La nueva contraseña no coincide");
  }
}
