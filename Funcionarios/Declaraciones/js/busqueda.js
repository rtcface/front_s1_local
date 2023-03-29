$(document).ready(function(){
   
    $("#busqueda2").keyup(function(){
        var _this = this;
        // Show only matching TR, hide rest of them
        $.each($("#contenido tr"), function() {
           
            if($(this).text().toLowerCase().indexOf($(_this).val().toLowerCase()) === -1){
                $(this).hide();
            }else{
                $(this).show();
            }
        });
    });
});
var listaRow=new Array();
var table;

$(document).ready(function(){
   
    $("#busqueda").keyup(function(){
        var _this = this;
        var i=0;
        var listaRow=new Array();
        // Show only matching TR, hide rest of them
        $.each($("#contenido tr"), function() {
           
            if($(this).text().toLowerCase().substring(0,115).indexOf($(_this).val().toLowerCase()) === -1){
                $(this).hide();
                listaRow.push(i);
                table.update({
                    ignoreRows: listaRow // pass in a new set of properties
                  });
            }else{
                $(this).show();
            }
            i++;
        });
    });
});

function reporteExcel(){
    table = $("table").tableExport({
        formats: ["xlsx"], //Tipo de archivos a exportar ("xlsx","txt", "csv", "xls")
        position: 'button',  // Posicion que se muestran los botones puedes ser: (top, bottom)
        bootstrap: true,//Usar lo estilos de css de bootstrap para los botones (true, false)
        fileName: "Reporte",    //Nombre del archivo 
        ignoreCols: [7]
    });
}

function resetReportExcel(){
    table.reset();
}
