function selectIngresosNetos() {
  $.ajax({
    url:
      ip +
      "/declaraciones/public/selectDeclaranteIngresosNetos?tipo_declaracion=" +
      td +
      "&id_declarador=" +
      id,
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      if (datos.status) {
        var contenidos = "";
        document.getElementById("ingresosCargoPublico").innerHTML =
          "$" + datos.result.data[0].ing_neto_cargo_publico;
        document.getElementById("totalOtrosIngresos").innerHTML =
          "$" + datos.result.data[0].otros_ing_decl;

        if (datos.result.data[0].ing_act_indust > 0) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-8">' +
            "<label>II.1 Total de ingresos por actividad industrial, comercial y/o empresarial</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[0].ing_act_indust +
            "</h4><br>" +
            "</div>" +
            "</div>";
          for (var i = 0; i < datos.result.data[0].actividades.length; i++) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Ingresos</label><br>" +
              '<h4 style="margin: 0">$' +
              datos.result.data[0].actividades[i].valor +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-5">' +
              "<label>Nombre o razón social</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].actividades[i].razon_social +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-3">' +
              "<label>Tipo de negocio</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].actividades[i].tipo_negocio +
              "</h4><br>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + "<hr>";
        }
        if (datos.result.data[0].ing_act_finan > 0) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-8">' +
            "<label>II.2 Total de ingresos por actividad financiera</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[0].ing_act_finan +
            "</h4><br>" +
            "</div>" +
            "</div>";
          for (
            var i = 0;
            i < datos.result.data[0].actividades_financieras.length;
            i++
          ) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Ingresos</label><br>" +
              '<h4 style="margin: 0">$' +
              datos.result.data[0].actividades_financieras[i].valor +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-7">' +
              "<label>Tipo de actividad financiera</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].actividades_financieras[i]
                .instrumento_valor +
              "</h4><br>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + "<hr>";
        }
        if (datos.result.data[0].ing_serv_prof > 0) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-8">' +
            "<label>II.3 Total de ingresos por servicios profecionales</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[0].ing_serv_prof +
            "</h4><br>" +
            "</div>" +
            "</div>";
          for (
            var i = 0;
            i < datos.result.data[0].serv_profesionales.length;
            i++
          ) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Ingresos</label><br>" +
              '<h4 style="margin: 0">$' +
              datos.result.data[0].serv_profesionales[i].valor +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-7">' +
              "<label>Tipo de servicio profecional</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].serv_profesionales[i].tipo_servicio +
              "</h4><br>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + "<hr>";
        }
        if (datos.result.data[0].otros_ing_desp_imp > 0) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-8">' +
            "<label>II.4 Total de otros ingresos</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[0].otros_ing_desp_imp +
            "</h4><br>" +
            "</div>" +
            "</div>";
          for (var i = 0; i < datos.result.data[0].ingresos.length; i++) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Ingresos</label><br>" +
              '<h4 style="margin: 0">$' +
              datos.result.data[0].ingresos[i].valor +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-7">' +
              "<label>Otro ingreso</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].ingresos[i].tipo_ingreso +
              "</h4><br>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + "<hr>";
        }
        if (datos.result.data[0].ing_enajenacion > 0) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-8">' +
            "<label>II.5 Total de ingresos por enajenación de bienes</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[0].ing_enajenacion +
            "</h4><br>" +
            "</div>" +
            "</div>";
          for (var i = 0; i < datos.result.data[0].bienes.length; i++) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Ingresos</label><br>" +
              '<h4 style="margin: 0">$' +
              datos.result.data[0].bienes[i].valor +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-7">' +
              "<label>Tipo de bien enajenado</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].bienes[i].tipo_bien_enajenado +
              "</h4><br>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + "<hr>";
        }
        document.getElementById("contenido").innerHTML = contenidos;

        document.getElementById("ingresoDeclarante").innerHTML =
          "$" + datos.result.data[0].suma_ing_decl;
        document.getElementById("ingresoTotal").innerHTML =
          "$" + datos.result.data[0].suma_ingresos;
        alturaMenu($("#contentSon").height());
      } else {
        alert(datos.msg);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function selectServidorAnterior() {
  $.ajax({
    url:
      ip +
      "/declaraciones/public/selectDeclaranteServidorAnterior?tipo_declaracion=" +
      td +
      "&id_declarador=" +
      id,
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      if (datos.status) {
        var contenidos = "";
        document.getElementById("fechaInicio").innerHTML =
          datos.result.data[0].fecha_inicio;
        document.getElementById("fechaFin").innerHTML =
          datos.result.data[0].fecha_fin;
        document.getElementById("ingresosCargoPublico").innerHTML =
          "$" + datos.result.data[0].remun_servicio_pub;
        document.getElementById("totalOtrosIngresos").innerHTML =
          "$" + datos.result.data[0].otros_ing;

        if (datos.result.data[0].ing_act_indust > 0) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-8">' +
            "<label>II.1 Total de ingresos por actividad industrial, comercial y/o empresarial</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[0].ing_act_indust +
            "</h4><br>" +
            "</div>" +
            "</div>";
          for (var i = 0; i < datos.result.data[0].actividades.length; i++) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Ingresos</label><br>" +
              '<h4 style="margin: 0">$' +
              datos.result.data[0].actividades[i].valor +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-5">' +
              "<label>Nombre o razón social</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].actividades[i].razon_social +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-3">' +
              "<label>Tipo de negocio</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].actividades[i].tipo_negocio +
              "</h4><br>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + "<hr>";
        }
        if (datos.result.data[0].ing_act_finan > 0) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-8">' +
            "<label>II.2 Total de ingresos por actividad financiera</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[0].ing_act_finan +
            "</h4><br>" +
            "</div>" +
            "</div>";
          for (
            var i = 0;
            i < datos.result.data[0].actividades_financieras.length;
            i++
          ) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Ingresos</label><br>" +
              '<h4 style="margin: 0">$' +
              datos.result.data[0].actividades_financieras[i].valor +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-7">' +
              "<label>Tipo de actividad financiera</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].actividades_financieras[i]
                .instrumento_valor +
              "</h4><br>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + "<hr>";
        }
        if (datos.result.data[0].ing_serv_prof > 0) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-8">' +
            "<label>II.3 Total de ingresos por servicios profecionales</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[0].ing_serv_prof +
            "</h4><br>" +
            "</div>" +
            "</div>";
          for (
            var i = 0;
            i < datos.result.data[0].serv_profesionales.length;
            i++
          ) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Ingresos</label><br>" +
              '<h4 style="margin: 0">$' +
              datos.result.data[0].serv_profesionales[i].valor +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-7">' +
              "<label>Tipo de servicio profecional</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].serv_profesionales[i].tipo_servicio +
              "</h4><br>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + "<hr>";
        }
        if (datos.result.data[0].otros_ing_desp_imp > 0) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-8">' +
            "<label>II.4 Total de otros ingresos</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[0].otros_ing_desp_imp +
            "</h4><br>" +
            "</div>" +
            "</div>";
          for (var i = 0; i < datos.result.data[0].ingresos.length; i++) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Ingresos</label><br>" +
              '<h4 style="margin: 0">$' +
              datos.result.data[0].ingresos[i].valor +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-7">' +
              "<label>Otro ingreso</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].ingresos[i].tipo_ingreso +
              "</h4><br>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + "<hr>";
        }
        if (datos.result.data[0].ing_enajenacion > 0) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-8">' +
            "<label>II.5 Total de ingresos por enajenación de bienes</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[0].ing_enajenacion +
            "</h4><br>" +
            "</div>" +
            "</div>";
          for (var i = 0; i < datos.result.data[0].bienes.length; i++) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Ingresos</label><br>" +
              '<h4 style="margin: 0">$' +
              datos.result.data[0].bienes[i].valor +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-7">' +
              "<label>Tipo de bien enajenado</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[0].bienes[i].tipo_bien_enajenado +
              "</h4><br>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + "<hr>";
        }
        document.getElementById("contenido").innerHTML = contenidos;

        document.getElementById("ingresoDeclarante").innerHTML =
          "$" + datos.result.data[0].ingreso_neto_declarante;
        document.getElementById("ingresoTotal").innerHTML =
          "$" + datos.result.data[0].ing_total;
        alturaMenu($("#contentSon").height());
      } else {
        alert(datos.msg);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

var id = sessionStorage.getItem("id");
var ip = sessionStorage.getItem("ip");
var td = sessionStorage.getItem("tipo_declaracion");
