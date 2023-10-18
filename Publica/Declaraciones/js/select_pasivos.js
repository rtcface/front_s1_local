function selectDeudas() {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/public/selectPasivosAdeudos?tipo_declaracion=" +
      td +
      "&id_declarador=" +
      id,
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      if (datos.status) {
        var contenidos = " ";
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          contenidos =
            contenidos +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-6">' +
            "<label>Tipo de adeudo</label><br>" +
            '<h4 id="tipo_acreedor" style="margin: 0">' +
            datos.result.data[i].tipo_adeudo +
            "</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Fecha de adquisición</label><br>" +
            '<h4 id="tasa_interes" style="margin: 0">' +
            datos.result.data[i].fecha_adeudo +
            "</h4>" +
            "</div>" +
            "</div><hr>" +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-3">' +
            "<label>Monto original</label><br>" +
            '<h4 id="pais" style="margin: 0">$' +
            datos.result.data[i].monto_original +
            "</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Pais</label><br>" +
            ' <h4 id="fecha_adeudo" style="margin: 0">' +
            datos.result.data[i].pais_adeudo +
            "</h4>" +
            "</div>" +
            "</div><hr>";
          if (
            datos.result.data[i].terceros != null &&
            datos.result.data[i].terceros.length > 0
          ) {
            for (var j = 0; j < datos.result.data[i].terceros.length; j++) {
              contenidos =
                contenidos +
                '<div class="form-group">' +
                '<div class="col-md-1"></div>' +
                '<div class="col-md-3">' +
                "<label>Tercero</label><br>" +
                '<h4 style="margin: 0">Persona Moral</h4><br>' +
                "</div>" +
                '<div class="col-md-5">' +
                "<label>Nombre o razón social</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].terceros[j].nombre +
                "</h4><br>" +
                "</div>" +
                '<div class="col-md-3">' +
                "<label>RFC</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].terceros[j].rfc +
                "</h4><br>" +
                "</div>" +
                "</div>";
            }
            contenidos = contenidos + "<hr>";
          }
          if (datos.result.data[i].otorgante_moral) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Otorgante del crédito</label><br>" +
              '<h4 style="margin: 0">Persona Moral</h4><br>' +
              "</div>" +
              '<div class="col-md-5">' +
              "<label>Institución o razón social</label><br>" +
              '<h4 id="pais" style="margin: 0">' +
              datos.result.data[i].razon_social +
              "</h4>" +
              "</div>" +
              '<div class="col-md-3">' +
              "<label>RFC</label><br>" +
              '<h4 id="fecha_adeudo" style="margin: 0">' +
              datos.result.data[i].rfc +
              "</h4>" +
              "</div>" +
              "</div>";
          }
          contenidos = contenidos + '</div><br><hr class="separador"><br>';
        }
        document.getElementById("contenido").innerHTML = contenidos;
        alturaMenu($("#contentSon").height());
      } else {
        alert(datos.msg);
      }
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

function selectPrestamos() {
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/public/selectPasivosPrestamoComodato?tipo_declaracion=" +
      td +
      "&id_declarador=" +
      id,
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      if (datos.status) {
        var contenidos = " ";
        for (var i = 0; i < Object.keys(datos.result.data).length; i++) {
          var tipoBien = "No";
          if (datos.result.data[i].inmueble) {
            tipoBien = "Inmueble";
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-4">' +
              "<label>Tipo de bien</label><br>" +
              '<h4 id="tipo_bien" style="margin: 0">' +
              tipoBien +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-6">' +
              "<label>Tipo de inmueble</label><br>" +
              '<h4 id="tipo_bien" style="margin: 0">' +
              datos.result.data[i].tipo_inmueble +
              "</h4><br>" +
              "</div>" +
              "</div><hr>";
          } else {
            tipoBien = "Vehículo";
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-4">' +
              "<label>Tipo de bien</label><br>" +
              '<h4 id="tipo_bien" style="margin: 0">' +
              tipoBien +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-6">' +
              "<label>Tipo de vehiculo</label><br>" +
              '<h4 id="tipo_bien" style="margin: 0">' +
              datos.result.data[i].tipo_vehiculo +
              "</h4><br>" +
              "</div>" +
              "</div><hr>" +
              '<div class="form-group"> ' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-3">' +
              "<label>Marca</label><br>" +
              '<h4 id="marca" style="margin: 0">' +
              datos.result.data[i].marca_vehiculo +
              "</h4>" +
              "</div>" +
              '<div class="col-md-3">' +
              "<label>Modelo</label><br>" +
              '<h4 id="modelo" style="margin: 0">' +
              datos.result.data[i].modelo_vehiculo +
              "</h4>" +
              "</div>" +
              '<div class="col-md-3">' +
              "<label>Año</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[i].anio_vehiculo +
              "</h4>" +
              "</div>" +
              "</div><hr>";
          }
          if (datos.result.data[i].titular_moral) {
            contenidos =
              contenidos +
              '<div class="form-group">' +
              '<div class="col-md-1"></div>' +
              '<div class="col-md-5">' +
              "<label>Dueño o titular</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[i].titular_vehiculo +
              "</h4><br>" +
              "</div>" +
              '<div class="col-md-5">' +
              "<label>RFC</label><br>" +
              '<h4 style="margin: 0">' +
              datos.result.data[i].rfc_titular_vehiculo +
              "</h4><br>" +
              "</div>" +
              "</div><hr>";
          }
          contenidos = contenidos + '</div><br><hr class="separador"><br>';
        }
        document.getElementById("contenido").innerHTML = contenidos;
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
