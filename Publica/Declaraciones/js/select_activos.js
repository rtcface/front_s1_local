function selectBienesInmuebles() {
  $.ajax({
    url:
      ip +
      "/declaraciones/public/selectActivosBienesInmuebles?tipo_declaracion=" +
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
            '<div class="col-md-5">' +
            "<label>Tipo de inmueble</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].tipo_bien +
            "</h4><br>" +
            "</div>" +
            '<div class="col-md-5">' +
            "<label>Valor de adquisición conforme a</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].tipo_operacion +
            "</h4><br>" +
            "</div>" +
            "</div><hr>" +
            '<div class="form-group"> ' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-3">' +
            "<label>Superficie del terreno</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].superficie_terreno +
            "m2</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Superficie de construcción</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].superficie_construccion +
            "m2</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Valor de adquisición</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[i].valor_adquisicion +
            "</h4><br>" +
            "</div>" +
            "</div><hr>" +
            '<div class="form-group"> ' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-3">' +
            "<label>Forma de adquisición</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].forma_adquisicion +
            "</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Fecha de adquisición</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].fecha_adquisicion +
            "</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Forma de pago</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].forma_pago +
            "</h4>" +
            "</div>" +
            "</div><hr>" +
            '<div class="form-group"> ' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-3">' +
            "<label>Porcentaje de la propiedad</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].porcentaje_propiedad +
            "%</h4>" +
            "</div>" +
            "</div>";
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
                "<label>Tipo de negocio</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].terceros[j].rfc +
                "</h4><br>" +
                "</div>" +
                "</div>";
            }
            contenidos = contenidos + "<hr>";
          }
          if (
            datos.result.data[i].transmisor != null &&
            datos.result.data[i].transmisor.length > 0
          ) {
            for (var j = 0; j < datos.result.data[i].transmisor.length; j++) {
              contenidos =
                contenidos +
                '<div class="form-group">' +
                '<div class="col-md-1"></div>' +
                '<div class="col-md-3">' +
                "<label>Transmisor</label><br>" +
                '<h4 style="margin: 0">Persona Moral</h4><br>' +
                "</div>" +
                '<div class="col-md-5">' +
                "<label>Nombre o razón social</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].transmisor[j].nombre +
                "</h4><br>" +
                "</div>" +
                '<div class="col-md-3">' +
                "<label>Tipo de negocio</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].transmisor[j].rfc +
                "</h4><br>" +
                "</div>" +
                "</div>";
            }
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

function selectBienesMuebles() {
  $.ajax({
    url:
      ip +
      "/declaraciones/public/selectActivosBienesMuebles?tipo_declaracion=" +
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
            '<div class="col-md-7">' +
            "<label>Tipo de vehículo</label><br>" +
            '<h4 id="tipo_bien" style="margin: 0">' +
            datos.result.data[i].tipo_mueble +
            "</h4><br>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Fecha de adquisición</label><br>" +
            '<h4 id="fecha_adquisicion" style="margin: 0">' +
            datos.result.data[i].fecha_adquisicion +
            "</h4>" +
            "</div>" +
            "</div><hr>" +
            '<div class="form-group"> ' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-3">' +
            "<label>Marca</label><br>" +
            '<h4 id="marca" style="margin: 0">' +
            datos.result.data[i].marca +
            "</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Modelo</label><br>" +
            '<h4 id="modelo" style="margin: 0">' +
            datos.result.data[i].modelo +
            "</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Año</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].anio +
            "</h4>" +
            "</div>" +
            "</div><hr>" +
            '<div class="form-group"> ' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-3">' +
            " <label>Precio de adquisición</label><br>" +
            ' <h4 id="precio_adquisicion" style="margin: 0">$' +
            datos.result.data[i].precio_adquisicion +
            "</h4><br>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Forma de adquisición</label><br>" +
            '<h4 id="forma_adquisicion" style="margin: 0">' +
            datos.result.data[i].forma_adquisicion +
            "</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            " <label>Forma de pago</label><br>" +
            '<h4 id="relacion" style="margin: 0">' +
            datos.result.data[i].forma_pago +
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
                "<label>Tipo de negocio</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].terceros[j].rfc +
                "</h4><br>" +
                "</div>" +
                "</div>";
            }
            contenidos = contenidos + "<hr>";
          }
          if (
            datos.result.data[i].transmisor != null &&
            datos.result.data[i].transmisor.length > 0
          ) {
            for (var j = 0; j < datos.result.data[i].transmisor.length; j++) {
              contenidos =
                contenidos +
                '<div class="form-group">' +
                '<div class="col-md-1"></div>' +
                '<div class="col-md-3">' +
                "<label>Transmisor</label><br>" +
                '<h4 style="margin: 0">Persona Moral</h4><br>' +
                "</div>" +
                '<div class="col-md-5">' +
                "<label>Nombre o razón social</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].transmisor[j].nombre +
                "</h4><br>" +
                "</div>" +
                '<div class="col-md-3">' +
                "<label>Tipo de negocio</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].transmisor[j].rfc +
                "</h4><br>" +
                "</div>" +
                "</div>";
            }
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

function selectBienesMueblesNR() {
  $.ajax({
    url:
      ip +
      "/declaraciones/public/selectActivosBienesMueblesNR?tipo_declaracion=" +
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
            '<div class="col-md-7">' +
            "<label>Tipo de bien</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].tipo_bien +
            "</h4><br>" +
            "</div>" +
            '<div class="col-md-4">' +
            "<label>Fecha de adquisición</label><br>" +
            '<h4 id="fecha_adquisicion" style="margin: 0">' +
            datos.result.data[i].fecha_adquisicion +
            "</h4>" +
            "</div>" +
            "</div><hr>" +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-9">' +
            "<label>Descripción del bien</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].descripcion_bien +
            "</h4><br>" +
            "</div>" +
            "</div><hr>" +
            '<div class="form-group"> ' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-3">' +
            "<label>Precio de adquisición</label><br>" +
            '<h4 style="margin: 0">$' +
            datos.result.data[i].precio_adquisicion +
            "</h4><br>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>Forma de adquisición</label><br>" +
            '<h4 id="forma_adquisicion" style="margin: 0">' +
            datos.result.data[i].forma_adquisicion +
            "</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            " <label>Forma de pago</label><br>" +
            '<h4 id="relacion" style="margin: 0">' +
            datos.result.data[i].forma_pago +
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
                "<label>Tipo de negocio</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].terceros[j].rfc +
                "</h4><br>" +
                "</div>" +
                "</div>";
            }
            contenidos = contenidos + "<hr>";
          }
          if (
            datos.result.data[i].transmisor != null &&
            datos.result.data[i].transmisor.length > 0
          ) {
            for (var j = 0; j < datos.result.data[i].transmisor.length; j++) {
              contenidos =
                contenidos +
                '<div class="form-group">' +
                '<div class="col-md-1"></div>' +
                '<div class="col-md-3">' +
                "<label>Transmisor</label><br>" +
                '<h4 style="margin: 0">Persona Moral</h4><br>' +
                "</div>" +
                '<div class="col-md-5">' +
                "<label>Nombre o razón social</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].transmisor[j].nombre +
                "</h4><br>" +
                "</div>" +
                '<div class="col-md-3">' +
                "<label>Tipo de negocio</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].transmisor[j].rfc +
                "</h4><br>" +
                "</div>" +
                "</div>";
            }
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

function selectInversionesCuentas() {
  $.ajax({
    url:
      ip +
      "/declaraciones/public/selectActivosInversionesCuentas?tipo_declaracion=" +
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
          var lugar = "MÉXICO";
          if (datos.result.data[i].pais == "146") {
            lugar = "EXTRANJERO";
          }
          contenidos =
            contenidos +
            '<div class="form-group"> ' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-4">' +
            " <label>Tipo de inversión</label><br>" +
            '<h4 id="tipo_inversion" style="margin: 0">' +
            datos.result.data[i].tipo_inversion +
            "</h4>" +
            "</div>" +
            '<div class="col-md-6">' +
            "<label>Tipo especifico de inversión</label><br>" +
            '<h4 id="tipo_especifico" style="margin: 0">' +
            datos.result.data[i].descripcion_inversion +
            "</h4>" +
            "</div>" +
            "</div><hr>" +
            '<div class="form-group">' +
            '<div class="col-md-1"></div>' +
            '<div class="col-md-3">' +
            "<label>Lugar de la inversión</label><br>" +
            '<h4 id="tipo_moneda" style="margin: 0">' +
            lugar +
            "</h4>" +
            "</div>" +
            '<div class="col-md-5">' +
            "<label>Nombre de la institución</label><br>" +
            ' <h4 id="nombre_institucion" style="margin: 0">' +
            datos.result.data[i].razon_social +
            "</h4>" +
            "</div>" +
            '<div class="col-md-3">' +
            "<label>RFC</label><br>" +
            '<h4 style="margin: 0">' +
            datos.result.data[i].rfc +
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
                "<label>Tipo de negocio</label><br>" +
                '<h4 style="margin: 0">' +
                datos.result.data[i].terceros[j].rfc +
                "</h4><br>" +
                "</div>" +
                "</div>";
            }
            contenidos = contenidos + "<hr>";
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
