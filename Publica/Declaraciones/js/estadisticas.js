////////////////////////////// Select informacion para las graficas //////////////////////////////
function graficaEdad() {
  $("#leyenda").hide();
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/graphics/selectRangoEdades",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      graficaBarraSimpleEdades(datos, "Edades");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaEdadNivel() {
  $("#leyenda").hide();
  $.ajax({
    url:
      ip + "/declaraciones-desarrollo/public/graphics/selectRangoEdadesNivel",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      var edades = ["18-27", "28-37", "38-47", "48-57", "58-67", "68 o más"];
      graficaMultipleEdadNivel(datos, edades);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaEdadEstudio() {
  $("#leyenda").hide();
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/graphics/selectRangoEdadesEduc",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      var edades = ["18-27", "28-37", "38-47", "48-57", "58-67", "68 o más"];
      graficaMultipleEdadEstudios(datos, edades);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaNivelGob() {
  $("#leyenda").hide();
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/graphics/selectNivelGob",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      graficaBarraSimple(datos, "Nivel de Gobierno");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaNivelEdad() {
  $("#leyenda").hide();
  $.ajax({
    url:
      ip + "/declaraciones-desarrollo/public/graphics/selectRangoEdadesNivel",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      var nivel = ["Estatal", "Municipal"];
      graficaMultipleNivelEdad(datos, nivel);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaNivelEstudios() {
  $("#leyenda").hide();
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/graphics/selectNivelGobEduc",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      var nivel = ["Estatal", "Municipal"];
      graficaMultipleNivelEstudios(datos, nivel);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaEntidades() {
  $("#leyenda").hide();
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/graphics/selectFuncEntidad",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      graficaBarraSimple(datos, "Municipios");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaEntidadesEdad() {
  $("#leyenda").hide();
  $.ajax({
    url:
      ip +
      "/declaraciones-desarrollo/public/graphics/selectFuncEntidadRangoEdad",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      graficaEntidadEdad(datos);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaEntidadesEstudio() {
  $("#leyenda").hide();
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/graphics/selectFuncEntidadEduc",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      graficaEntidadEstudios(datos);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaEstudio() {
  $("#leyenda").hide();
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/graphics/selectNivelEduc",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      graficaBarraSimple(ordenarEducacion(datos), "Nivel de Estudios");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaEstudioEdad() {
  $("#leyenda").hide();
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/graphics/selectRangoEdadesEduc",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      var educacion = [
        "Primaria",
        "Secundaria",
        "Bachillerato",
        "Carrera técnica",
        "Licenciatura",
        "Especialidad",
        "Maestria",
        "Doctorado",
      ];
      graficaMultipleEstudiosEdad(datos, educacion);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaEstudioNivel() {
  $("#leyenda").hide();
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/graphics/selectNivelGobEduc",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      var educacion = [
        "Primaria",
        "Secundaria",
        "Bachillerato",
        "Carrera técnica",
        "Licenciatura",
        "Especialidad",
        "Maestria",
        "Doctorado",
      ];
      graficaMultipleEstudiosNivelGob(datos, educacion);
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}
function graficaIngresos() {
  $("#leyenda").show();
  $.ajax({
    url: ip + "/declaraciones-desarrollo/public/graphics/selectIngresoBruto",
    type: "GET",
    dataType: "json",
  })
    .done(function (datos) {
      graficaBarraSimple2(datos, "Ingresos Netos Anuales");
    })
    .fail(function (jqXHR, textStatus, errorThrown) {
      alert(jqXHR.responseJSON.msg);
    });
}

////////////////////////////// Plantillas para las graficas //////////////////////////////
function graficaBarraSimpleEdades(objeto, label) {
  var edades = [0, 0, 0, 0, 0, 0];
  var porcentaje = new Array();
  var total = 0;
  var i;
  var titulos = ["18-27", "28-37", "38-47", "48-57", "58-67", "68 o más"];
  var color = objeto.result.data.map(function (e) {
    return e.rgba;
  });

  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    total = total + objeto.result.data[i].data_result;
    if (
      objeto.result.data[i].column_title >= 18 &&
      objeto.result.data[i].column_title <= 27
    ) {
      edades[0] = edades[0] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 28 &&
      objeto.result.data[i].column_title <= 37
    ) {
      edades[1] = edades[1] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 38 &&
      objeto.result.data[i].column_title <= 47
    ) {
      edades[2] = edades[2] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 48 &&
      objeto.result.data[i].column_title <= 57
    ) {
      edades[3] = edades[3] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 58 &&
      objeto.result.data[i].column_title <= 67
    ) {
      edades[4] = edades[4] + objeto.result.data[i].data_result;
    } else if (objeto.result.data[i].column_title > 67) {
      edades[5] = edades[5] + objeto.result.data[i].data_result;
    }
  }
  for (i = 0; i < edades.length; i++) {
    var x = (edades[i] / total) * 100;
    porcentaje.push(x.toFixed(1));
  }

  myChart.clear();
  myChart.destroy();

  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulos,
      datasets: [
        {
          label: label,
          data: edades,
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Rango de edad",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  myChart.update();

  myChart2.clear();
  myChart2.destroy();
  $("#grafica2").show();

  ctx2 = document.getElementById("grafica2").getContext("2d");
  myChart2 = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: titulos,
      datasets: [
        {
          data: porcentaje,
          backgroundColor: color,
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        text: label + " Las Cantidades Representan Porcentajes %",
        display: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  myChart2.update();
}

function graficaBarraSimple(objeto, label) {
  var porcentaje = new Array();
  var total = 0;
  var i;

  var titulo = objeto.result.data.map(function (e) {
    return e.column_title;
  });
  var catidad = objeto.result.data.map(function (e) {
    return e.data_result;
  });
  var color = objeto.result.data.map(function (e) {
    return e.rgba;
  });

  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    total = total + objeto.result.data[i].data_result;
  }
  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    var x = (objeto.result.data[i].data_result / total) * 100;
    porcentaje.push(x.toFixed(1));
  }

  myChart.clear();
  myChart.destroy();

  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulo,
      datasets: [
        {
          label: label,
          data: catidad,
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: label,
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  myChart.update();

  myChart2.clear();
  myChart2.destroy();
  $("#grafica2").show();

  ctx2 = document.getElementById("grafica2").getContext("2d");
  myChart2 = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: titulo,
      datasets: [
        {
          data: porcentaje,
          backgroundColor: color,
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        text: label + " Las Cantidades Representan Porcentajes %",
        display: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  myChart2.update();
}

function graficaBarraSimple2(objeto, label) {
  var porcentaje = new Array();
  var totales = [0, 0, 0, 0];
  var total = 0;
  var i;
  var titulo = [
    "0-$100,000",
    "$100,000-$300,000",
    "$300,000-$500,000",
    "$500,000 o más",
  ];

  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    if (
      objeto.result.data[i].ingreso_total >= 0 &&
      objeto.result.data[i].ingreso_total < 100000
    ) {
      totales[0] = totales[0] + 1;
    } else if (
      objeto.result.data[i].ingreso_total >= 100000 &&
      objeto.result.data[i].ingreso_total < 300000
    ) {
      totales[1] = totales[1] + 1;
    } else if (
      objeto.result.data[i].ingreso_total >= 300000 &&
      objeto.result.data[i].ingreso_total < 500000
    ) {
      totales[2] = totales[2] + 1;
    } else if (objeto.result.data[i].ingreso_total >= 500000) {
      totales[3] = totales[3] + 1;
    }
  }

  var color = objeto.result.data.map(function (e) {
    return e.rgba;
  });

  for (i = 0; i < totales.length; i++) {
    total = total + totales[i];
  }
  for (i = 0; i < totales.length; i++) {
    var x = (totales[i] / total) * 100;
    porcentaje.push(x.toFixed(1));
  }

  myChart.clear();
  myChart.destroy();

  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulo,
      datasets: [
        {
          label: label,
          data: totales,
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Rango de ingresos anuales",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  myChart.update();

  myChart2.clear();
  myChart2.destroy();
  $("#grafica2").show();

  ctx2 = document.getElementById("grafica2").getContext("2d");
  myChart2 = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: titulo,
      datasets: [
        {
          data: porcentaje,
          backgroundColor: color,
          borderWidth: 1,
        },
      ],
    },
    options: {
      title: {
        text: label + " Las Cantidades Representan Porcentajes %",
        display: true,
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  myChart2.update();
}

function graficaMultipleEdadNivel(objeto, titulos) {
  var cantEstatal = [0, 0, 0, 0, 0, 0];
  var cantMunicipal = [0, 0, 0, 0, 0, 0];
  var index = 0;
  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    switch (objeto.result.data[i].level) {
      case "ESTATAL":
        index = verificarEdad(objeto.result.data[i].column_title);
        cantEstatal[index] =
          cantEstatal[index] + objeto.result.data[i].data_result;
        break;
      case "MUNICIPAL_ALCALDIA":
        index = verificarEdad(objeto.result.data[i].column_title);
        cantMunicipal[index] =
          cantMunicipal[index] + objeto.result.data[i].data_result;
        break;
    }
  }
  myChart.clear();
  myChart.destroy();
  $("#grafica2").hide();
  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulos,
      datasets: [
        {
          label: "Estatal",
          data: cantEstatal,
          backgroundColor: "rgba(255, 159, 64,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Municipal",
          data: cantMunicipal,
          backgroundColor: "rgba(55, 159, 64,0.4)",
          borderColor: "rgba(55, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Rango de edad",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function graficaMultipleEdadEstudios(objeto, titulos) {
  var prim = [0, 0, 0, 0, 0, 0];
  var secu = [0, 0, 0, 0, 0, 0];
  var bach = [0, 0, 0, 0, 0, 0];
  var carTec = [0, 0, 0, 0, 0, 0];
  var lic = [0, 0, 0, 0, 0, 0];
  var esp = [0, 0, 0, 0, 0, 0];
  var maest = [0, 0, 0, 0, 0, 0];
  var doc = [0, 0, 0, 0, 0, 0];
  var index = 0;
  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    switch (objeto.result.data[i].level) {
      case "PRIMARIA":
        index = verificarEdad(objeto.result.data[i].column_title);
        prim[index] = prim[index] + objeto.result.data[i].data_result;
        break;
      case "SECUNDARIA":
        index = verificarEdad(objeto.result.data[i].column_title);
        secu[index] = secu[index] + objeto.result.data[i].data_result;
        break;
      case "BACHILLERATO":
        index = verificarEdad(objeto.result.data[i].column_title);
        bach[index] = bach[index] + objeto.result.data[i].data_result;
        break;
      case "CARRERA TECNICA O COMERCIAL":
        index = verificarEdad(objeto.result.data[i].column_title);
        carTec[index] = carTec[index] + objeto.result.data[i].data_result;
        break;
      case "LICENCIATURA":
        index = verificarEdad(objeto.result.data[i].column_title);
        lic[index] = lic[index] + objeto.result.data[i].data_result;
        break;
      case "ESPECIALIDAD":
        index = verificarEdad(objeto.result.data[i].column_title);
        esp[index] = esp[index] + objeto.result.data[i].data_result;
        break;
      case "MAESTRIA":
        index = verificarEdad(objeto.result.data[i].column_title);
        maest[index] = maest[index] + objeto.result.data[i].data_result;
        break;
      case "DOCTORADO":
        index = verificarEdad(objeto.result.data[i].column_title);
        doc[index] = doc[index] + objeto.result.data[i].data_result;
        break;
    }
  }

  myChart.clear();
  myChart.destroy();
  $("#grafica2").hide();
  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulos,
      datasets: [
        {
          label: "Primaria",
          data: prim,
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Secundaria",
          data: secu,
          backgroundColor: "rgba(255, 159, 64,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Bachillerato",
          data: bach,
          backgroundColor: "rgba(55, 159, 64,0.4)",
          borderColor: "rgba(55, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Carrera técnica o comercial",
          data: carTec,
          backgroundColor: "rgba(154, 162, 235,0.4)",
          borderColor: "rgba(154, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Licenciatura",
          data: lic,
          backgroundColor: "rgba(5, 19, 64,0.4)",
          borderColor: "rgba(5, 19, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Especialidad",
          data: esp,
          backgroundColor: "rgba(255, 159, 164,0.4)",
          borderColor: "rgba(255, 159, 164, 1)",
          borderWidth: 1,
        },
        {
          label: "Maestría",
          data: maest,
          backgroundColor: "rgba(55, 19, 4,0.4)",
          borderColor: "rgba(55, 19, 4, 1)",
          borderWidth: 1,
        },
        {
          label: "Doctorado",
          data: doc,
          backgroundColor: "rgba(51, 251, 164,0.4)",
          borderColor: "rgba(255, 251, 164, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Rango de edad",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function graficaMultipleNivelEdad(objeto, titulos) {
  var edad1 = [0, 0, 0];
  var edad2 = [0, 0, 0];
  var edad3 = [0, 0, 0];
  var edad4 = [0, 0, 0];
  var edad5 = [0, 0, 0];
  var edad6 = [0, 0, 0];
  var index = 0;

  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    if (
      objeto.result.data[i].column_title >= 18 &&
      objeto.result.data[i].column_title <= 27
    ) {
      index = verificarNivelGob(objeto.result.data[i].level);
      edad1[index] = edad1[index] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 28 &&
      objeto.result.data[i].column_title <= 37
    ) {
      index = verificarNivelGob(objeto.result.data[i].level);
      edad2[index] = edad2[index] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 38 &&
      objeto.result.data[i].column_title <= 47
    ) {
      index = verificarNivelGob(objeto.result.data[i].level);
      edad3[index] = edad3[index] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 48 &&
      objeto.result.data[i].column_title <= 57
    ) {
      index = verificarNivelGob(objeto.result.data[i].level);
      edad4[index] = edad4[index] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 58 &&
      objeto.result.data[i].column_title <= 67
    ) {
      index = verificarNivelGob(objeto.result.data[i].level);
      edad5[index] = edad5[index] + objeto.result.data[i].data_result;
    } else if (objeto.result.data[i].column_title > 67) {
      index = verificarNivelGob(objeto.result.data[i].level);
      edad6[index] = edad6[index] + objeto.result.data[i].data_result;
    }
  }

  myChart.clear();
  myChart.destroy();
  $("#grafica2").hide();
  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulos,
      datasets: [
        {
          label: "18-27",
          data: edad1,
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "28-37",
          data: edad2,
          backgroundColor: "rgba(255, 159, 64,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "38-47",
          data: edad3,
          backgroundColor: "rgba(55, 159, 64,0.4)",
          borderColor: "rgba(55, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "48-57",
          data: edad4,
          backgroundColor: "rgba(154, 162, 235,0.4)",
          borderColor: "rgba(154, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "58-67",
          data: edad5,
          backgroundColor: "rgba(5, 19, 64,0.4)",
          borderColor: "rgba(5, 19, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "67 o más",
          data: edad6,
          backgroundColor: "rgba(255, 159, 164,0.4)",
          borderColor: "rgba(255, 159, 164, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Nivel de gobierno",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function graficaMultipleNivelEstudios(objeto, titulos) {
  var prim = [0, 0, 0];
  var secu = [0, 0, 0];
  var bach = [0, 0, 0];
  var carTec = [0, 0, 0];
  var lic = [0, 0, 0];
  var esp = [0, 0, 0];
  var maest = [0, 0, 0];
  var doc = [0, 0, 0];
  var index = 0;
  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    switch (objeto.result.data[i].nivel_curricular) {
      case "PRIMARIA":
        index = verificarNivelGob(objeto.result.data[i].column_title);
        prim[index] = prim[index] + objeto.result.data[i].data_result;
        break;
      case "SECUNDARIA":
        index = verificarNivelGob(objeto.result.data[i].column_title);
        secu[index] = secu[index] + objeto.result.data[i].data_result;
        break;
      case "BACHILLERATO":
        index = verificarNivelGob(objeto.result.data[i].column_title);
        bach[index] = bach[index] + objeto.result.data[i].data_result;
        break;
      case "CARRERA TECNICA O COMERCIAL":
        index = verificarNivelGob(objeto.result.data[i].column_title);
        carTec[index] = carTec[index] + objeto.result.data[i].data_result;
        break;
      case "LICENCIATURA":
        index = verificarNivelGob(objeto.result.data[i].column_title);
        lic[index] = lic[index] + objeto.result.data[i].data_result;
        break;
      case "ESPECIALIDAD":
        index = verificarNivelGob(objeto.result.data[i].column_title);
        esp[index] = esp[index] + objeto.result.data[i].data_result;
        break;
      case "MAESTRIA":
        index = verificarNivelGob(objeto.result.data[i].column_title);
        maest[index] = maest[index] + objeto.result.data[i].data_result;
        break;
      case "DOCTORADO":
        index = verificarNivelGob(objeto.result.data[i].column_title);
        doc[index] = doc[index] + objeto.result.data[i].data_result;
        break;
    }
  }

  myChart.clear();
  myChart.destroy();
  $("#grafica2").hide();
  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulos,
      datasets: [
        {
          label: "Primaria",
          data: prim,
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Secundaria",
          data: secu,
          backgroundColor: "rgba(255, 159, 64,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Bachillerato",
          data: bach,
          backgroundColor: "rgba(55, 159, 64,0.4)",
          borderColor: "rgba(55, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Carrera técnica o comercial",
          data: carTec,
          backgroundColor: "rgba(154, 162, 235,0.4)",
          borderColor: "rgba(154, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Licenciatura",
          data: lic,
          backgroundColor: "rgba(5, 19, 64,0.4)",
          borderColor: "rgba(5, 19, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Especialidad",
          data: esp,
          backgroundColor: "rgba(255, 159, 164,0.4)",
          borderColor: "rgba(255, 159, 164, 1)",
          borderWidth: 1,
        },
        {
          label: "Maestría",
          data: maest,
          backgroundColor: "rgba(55, 19, 4,0.4)",
          borderColor: "rgba(55, 19, 4, 1)",
          borderWidth: 1,
        },
        {
          label: "Doctorado",
          data: doc,
          backgroundColor: "rgba(51, 251, 164,0.4)",
          borderColor: "rgba(255, 251, 164, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Nivel de gobierno",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function graficaMultipleEstudiosEdad(objeto, titulos) {
  var edad1 = [0, 0, 0, 0, 0, 0, 0, 0];
  var edad2 = [0, 0, 0, 0, 0, 0, 0, 0];
  var edad3 = [0, 0, 0, 0, 0, 0, 0, 0];
  var edad4 = [0, 0, 0, 0, 0, 0, 0, 0];
  var edad5 = [0, 0, 0, 0, 0, 0, 0, 0];
  var edad6 = [0, 0, 0, 0, 0, 0, 0, 0];
  var index = 0;
  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    if (
      objeto.result.data[i].column_title >= 18 &&
      objeto.result.data[i].column_title <= 27
    ) {
      index = verificarNivelEducacion(objeto.result.data[i].level);
      edad1[index] = edad1[index] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 28 &&
      objeto.result.data[i].column_title <= 37
    ) {
      index = verificarNivelEducacion(objeto.result.data[i].level);
      edad2[index] = edad2[index] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 38 &&
      objeto.result.data[i].column_title <= 47
    ) {
      index = verificarNivelEducacion(objeto.result.data[i].level);
      edad3[index] = edad3[index] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 48 &&
      objeto.result.data[i].column_title <= 57
    ) {
      index = verificarNivelEducacion(objeto.result.data[i].level);
      edad4[index] = edad4[index] + objeto.result.data[i].data_result;
    } else if (
      objeto.result.data[i].column_title >= 58 &&
      objeto.result.data[i].column_title <= 67
    ) {
      index = verificarNivelEducacion(objeto.result.data[i].level);
      edad5[index] = edad5[index] + objeto.result.data[i].data_result;
    } else if (objeto.result.data[i].column_title > 67) {
      index = verificarNivelEducacion(objeto.result.data[i].level);
      edad6[index] = edad6[index] + objeto.result.data[i].data_result;
    }
  }

  myChart.clear();
  myChart.destroy();
  $("#grafica2").hide();
  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulos,
      datasets: [
        {
          label: "18-27",
          data: edad1,
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "28-37",
          data: edad2,
          backgroundColor: "rgba(255, 159, 64,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "38-47",
          data: edad3,
          backgroundColor: "rgba(55, 159, 64,0.4)",
          borderColor: "rgba(55, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "48-57",
          data: edad4,
          backgroundColor: "rgba(154, 162, 235,0.4)",
          borderColor: "rgba(154, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "58-67",
          data: edad5,
          backgroundColor: "rgba(5, 19, 64,0.4)",
          borderColor: "rgba(5, 19, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "67 o más",
          data: edad6,
          backgroundColor: "rgba(255, 159, 164,0.4)",
          borderColor: "rgba(255, 159, 164, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Nivel educativo",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function graficaMultipleEstudiosNivelGob(objeto, titulos) {
  var cantEstatal = [0, 0, 0, 0, 0, 0, 0, 0];
  var cantMunicipal = [0, 0, 0, 0, 0, 0, 0, 0];
  var index = 0;
  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    switch (objeto.result.data[i].column_title) {
      case "ESTATAL":
        index = verificarNivelEducacion(objeto.result.data[i].nivel_curricular);
        cantEstatal[index] =
          cantEstatal[index] + objeto.result.data[i].data_result;
        break;
      case "MUNICIPAL_ALCALDIA":
        index = verificarNivelEducacion(objeto.result.data[i].nivel_curricular);
        cantMunicipal[index] =
          cantMunicipal[index] + objeto.result.data[i].data_result;
        break;
    }
  }

  myChart.clear();
  myChart.destroy();
  $("#grafica2").hide();
  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulos,
      datasets: [
        {
          label: "Estatal",
          data: cantEstatal,
          backgroundColor: "rgba(255, 159, 64,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Municipal",
          data: cantMunicipal,
          backgroundColor: "rgba(55, 159, 64,0.4)",
          borderColor: "rgba(55, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Nivel educativo",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function graficaEntidadEdad(objeto) {
  Array.prototype.unique = (function (a) {
    return function () {
      return this.filter(a);
    };
  })(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0;
  });
  var titulo = objeto.result.data.map(function (e) {
    return e.entidad;
  });
  var cantidad = objeto.result.data.map(function (e) {
    return e.data_result;
  });

  titulos = titulo.unique();

  var edad1 = [];
  var edad2 = [];
  var edad3 = [];
  var edad4 = [];
  var edad5 = [];
  var edad6 = [];
  var index = 0;

  for (var i = 0; i < titulos.length; i++) {
    edad1[i] = 0;
    edad2[i] = 0;
    edad3[i] = 0;
    edad4[i] = 0;
    edad5[i] = 0;
    edad6[i] = 0;
  }

  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    if (
      objeto.result.data[i].column_title >= 18 &&
      objeto.result.data[i].column_title <= 27
    ) {
      index = verificarEntidad(objeto.result.data[i].entidad, titulos);
      edad1[index] = edad1[index] + cantidad[i];
    } else if (
      objeto.result.data[i].column_title >= 28 &&
      objeto.result.data[i].column_title <= 37
    ) {
      index = verificarEntidad(objeto.result.data[i].entidad, titulos);
      edad2[index] = edad2[index] + cantidad[i];
    } else if (
      objeto.result.data[i].column_title >= 38 &&
      objeto.result.data[i].column_title <= 47
    ) {
      index = verificarEntidad(objeto.result.data[i].entidad, titulos);
      edad3[index] = edad3[index] + cantidad[i];
    } else if (
      objeto.result.data[i].column_title >= 48 &&
      objeto.result.data[i].column_title <= 57
    ) {
      index = verificarEntidad(objeto.result.data[i].entidad, titulos);
      edad4[index] = edad4[index] + cantidad[i];
    } else if (
      objeto.result.data[i].column_title >= 58 &&
      objeto.result.data[i].column_title <= 67
    ) {
      index = verificarEntidad(objeto.result.data[i].entidad, titulos);
      edad5[index] = edad5[index] + cantidad[i];
    } else if (objeto.result.data[i].column_title > 67) {
      index = verificarEntidad(objeto.result.data[i].entidad, titulos);
      edad6[index] = edad6[index] + cantidad[i];
    }
  }

  myChart.clear();
  myChart.destroy();
  $("#grafica2").hide();
  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulos,
      datasets: [
        {
          label: "18-27",
          data: edad1,
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "28-37",
          data: edad2,
          backgroundColor: "rgba(255, 159, 64,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "38-47",
          data: edad3,
          backgroundColor: "rgba(55, 159, 64,0.4)",
          borderColor: "rgba(55, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "48-57",
          data: edad4,
          backgroundColor: "rgba(154, 162, 235,0.4)",
          borderColor: "rgba(154, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "58-67",
          data: edad5,
          backgroundColor: "rgba(5, 19, 64,0.4)",
          borderColor: "rgba(5, 19, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "67 o más",
          data: edad6,
          backgroundColor: "rgba(255, 159, 164,0.4)",
          borderColor: "rgba(255, 159, 164, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Municipios",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

function graficaEntidadEstudios(objeto) {
  Array.prototype.unique = (function (a) {
    return function () {
      return this.filter(a);
    };
  })(function (a, b, c) {
    return c.indexOf(a, b + 1) < 0;
  });
  var titulo = objeto.result.data.map(function (e) {
    return e.column_title;
  });
  var cantidad = objeto.result.data.map(function (e) {
    return e.data_result;
  });

  titulos = titulo.unique();
  var prim = [];
  var secu = [];
  var bach = [];
  var carTec = [];
  var lic = [];
  var esp = [];
  var maest = [];
  var doc = [];
  var index = 0;

  for (var i = 0; i < titulos.length; i++) {
    prim[i] = 0;
    secu[i] = 0;
    bach[i] = 0;
    carTec[i] = 0;
    lic[i] = 0;
    esp[i] = 0;
    maest[i] = 0;
    doc[i] = 0;
  }

  for (i = 0; i < Object.keys(objeto.result.data).length; i++) {
    switch (objeto.result.data[i].nivel_curricular) {
      case "PRIMARIA":
        index = verificarEntidad(objeto.result.data[i].column_title, titulos);
        prim[index] = prim[index] + cantidad[i];
        break;
      case "SECUNDARIA":
        index = verificarEntidad(objeto.result.data[i].column_title, titulos);
        secu[index] = secu[index] + cantidad[i];
        break;
      case "BACHILLERATO":
        index = verificarEntidad(objeto.result.data[i].column_title, titulos);
        bach[index] = bach[index] + cantidad[i];
        break;
      case "CARRERA TECNICA O COMERCIAL":
        index = verificarEntidad(objeto.result.data[i].column_title, titulos);
        carTec[index] = carTec[index] + cantidad[i];
        break;
      case "LICENCIATURA":
        index = verificarEntidad(objeto.result.data[i].column_title, titulos);
        lic[index] = lic[index] + cantidad[i];
        break;
      case "ESPECIALIDAD":
        index = verificarEntidad(objeto.result.data[i].column_title, titulos);
        esp[index] = esp[index] + cantidad[i];
        break;
      case "MAESTRIA":
        index = verificarEntidad(objeto.result.data[i].column_title, titulos);
        maest[index] = maest[index] + cantidad[i];
        break;
      case "DOCTORADO":
        index = verificarEntidad(objeto.result.data[i].column_title, titulos);
        doc[index] = doc[index] + cantidad[i];
        break;
    }
  }

  myChart.clear();
  myChart.destroy();
  $("#grafica2").hide();
  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: titulos,
      datasets: [
        {
          label: "Primaria",
          data: prim,
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Secundaria",
          data: secu,
          backgroundColor: "rgba(255, 159, 64,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Bachillerato",
          data: bach,
          backgroundColor: "rgba(55, 159, 64,0.4)",
          borderColor: "rgba(55, 159, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Carrera técnica o comercial",
          data: carTec,
          backgroundColor: "rgba(154, 162, 235,0.4)",
          borderColor: "rgba(154, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Licenciatura",
          data: lic,
          backgroundColor: "rgba(5, 19, 64,0.4)",
          borderColor: "rgba(5, 19, 64, 1)",
          borderWidth: 1,
        },
        {
          label: "Especialidad",
          data: esp,
          backgroundColor: "rgba(255, 159, 164,0.4)",
          borderColor: "rgba(255, 159, 164, 1)",
          borderWidth: 1,
        },
        {
          label: "Maestría",
          data: maest,
          backgroundColor: "rgba(55, 19, 4,0.4)",
          borderColor: "rgba(55, 19, 4, 1)",
          borderWidth: 1,
        },
        {
          label: "Doctorado",
          data: doc,
          backgroundColor: "rgba(51, 251, 164,0.4)",
          borderColor: "rgba(255, 251, 164, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Municipios",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Número de funcionarios",
            },
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
}

////////////////////////////// Funciones Extras //////////////////////////////
function verificarEdad(edad) {
  var rango;
  if (edad >= 18 && edad <= 27) {
    rango = 0;
  } else if (edad >= 28 && edad <= 37) {
    rango = 1;
  } else if (edad >= 38 && edad <= 47) {
    rango = 2;
  } else if (edad >= 48 && edad <= 57) {
    rango = 3;
  } else if (edad >= 58 && edad <= 67) {
    rango = 4;
  } else if (edad > 67) {
    rango = 5;
  }
  return rango;
}
function verificarNivelGob(nivel) {
  var rango;
  switch (nivel) {
    case "ESTATAL":
      rango = 0;
      break;
    case "MUNICIPAL_ALCALDIA":
      rango = 1;
      break;
  }
  return rango;
}
function verificarNivelEducacion(nivel) {
  var rango;
  switch (nivel) {
    case "PRIMARIA":
      rango = 0;
      break;
    case "SECUNDARIA":
      rango = 1;
      break;
    case "BACHILLERATO":
      rango = 2;
      break;
    case "CARRERA TECNICA O COMERCIAL":
      rango = 3;
      break;
    case "LICENCIATURA":
      rango = 4;
      break;
    case "ESPECIALIDAD":
      rango = 5;
      break;
    case "MAESTRIA":
      rango = 6;
      break;
    case "DOCTORADO":
      rango = 7;
      break;
  }
  return rango;
}
function verificarEntidad(nivel, array) {
  var rango;
  for (var i = 0; i < array.length; i++) {
    if (nivel == array[i]) {
      rango = i;
    }
  }
  return rango;
}

////////////////////////////// Otras cosas //////////////////////////////
var ip = sessionStorage.getItem("ip");

var ctx = document.getElementById("grafica").getContext("2d");
var myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: [],
    datasets: [
      {
        label: "",
        data: [],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

var ctx2 = document.getElementById("grafica2").getContext("2d");
var myChart2 = new Chart(ctx2, {
  type: "pie",
  data: {
    labels: "",
    datasets: [
      {
        data: [],
        backgroundColor: "rgba(54, 162, 235,0.4)",
        borderWidth: 1,
      },
    ],
  },
  options: {
    title: {
      text: label + " Porcentaje",
      display: true,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
});

function pruebaGrafica() {
  myChart.clear();
  myChart.destroy();
  myChart2.clear();
  myChart2.destroy();

  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: ["18-25", "26-30"],
      datasets: [
        {
          label: "Estatal",
          data: [12, 19],
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
        },
        {
          label: "Municipal",
          data: [25, 40],
          backgroundColor: "rgba(255, 159, 64,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  myChart.update();

  /* var ctx2 = document.getElementById('grafica2').getContext('2d');
    var myChart = new Chart(ctx2, {
        type: 'pie',
        data: {
            labels: ['18-25', '26-30'],
            datasets: [{
                data: [37, 59],
                backgroundColor: ['rgba(54, 162, 235,0.4)','rgba(255, 159, 64,0.4)'],
                borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 159, 64, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            title:{
                text:'Estatal',
                display: true,
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });*/
}
function cargarNew() {
  ctx = document.getElementById("grafica").getContext("2d");
  myChart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Estadísticas"],
      datasets: [
        {
          data: [1],
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  ctx2 = document.getElementById("grafica2").getContext("2d");
  myChart2 = new Chart(ctx2, {
    type: "pie",
    data: {
      labels: ["Estadísticas"],
      datasets: [
        {
          data: [],
          backgroundColor: "rgba(54, 162, 235,0.4)",
          borderColor: "rgba(255, 159, 64, 1)",
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  });
  graficaEdad();
}

function ordenarEducacion(objeto) {
  var cant = objeto.result.data.length;
  var orden = new Array();
  var json = new Array();

  for (var i = 0; i < cant; i++) {
    switch (objeto.result.data[i].column_title) {
      case "PRIMARIA":
        orden[i] = { pos: 1, data: objeto.result.data[i] };
        break;
      case "SECUNDARIA":
        orden[i] = { pos: 2, data: objeto.result.data[i] };
        break;
      case "BACHILLERATO":
        orden[i] = { pos: 3, data: objeto.result.data[i] };
        break;
      case "CARRERA TECNICA O COMERCIAL":
        orden[i] = { pos: 4, data: objeto.result.data[i] };
        break;
      case "LICENCIATURA":
        orden[i] = { pos: 5, data: objeto.result.data[i] };
        break;
      case "ESPECIALIDAD":
        orden[i] = { pos: 6, data: objeto.result.data[i] };
        break;
      case "MAESTRIA":
        orden[i] = { pos: 7, data: objeto.result.data[i] };
        break;
      case "DOCTORADO":
        orden[i] = { pos: 8, data: objeto.result.data[i] };
        break;
    }
  }
  orden.sort(sortByProperty("pos"));
  for (var j = 0; j < cant; j++) {
    json[j] = orden[j].data;
  }
  objeto.result.data = json;
  return objeto;
}
function sortByProperty(property) {
  return function (a, b) {
    if (a[property] > b[property]) return 1;
    else if (a[property] < b[property]) return -1;
    return 0;
  };
}
