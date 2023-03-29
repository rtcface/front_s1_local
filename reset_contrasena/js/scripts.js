var ip = sessionStorage.getItem("ip");
var token=sessionStorage.getItem("token");
var idDec=0;

function buscar() {
    
    $.ajax({
        url: ip + '/declaraciones/control/getUserByRfc?rfc='+$("#rfc").val(),
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : token
        }
    }).done(function (datos) {
        if(datos.status){
            var tabla = "<tr><th>Nombre </th><th>Ente Público</th><th>Cargo Actual</th><th></th></tr>";
                tabla = tabla + "<tr><td>"
                    + datos.result.data['nombres'] + " " + datos.result.data['apellido_paterno'] + " " + datos.result.data['apellido_materno'] +"</td><td>"
                    + datos.result.data['ente_publico'] + "</td><td>"
                    + datos.result.data['cargo_comision'] + "</td><td>"
                    + "<button type='button' class='botonEnviar' onclick='resetContModal("+datos.result.data['id']+")'>Resetear contraseña</button></tr>"
            
            document.getElementById('contenido').innerHTML = tabla;
        }else alert(datos.msg);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseJSON.msg);
    });
}

function resetContModal(id){
    idDec=id;
    $("#myModal").modal("show");
}

function resetearContraseña(){
    
    $("#myModal").modal("hide");

    $.ajax({
        url: ip + '/declaraciones/control/resetPassword?id=' + idDec,
        type: "GET",
        dataType: "json",
        headers: {
            'X-Auth-Token' : token
        }
    }).done(function (datos) {
        if(datos.status){
            alert(datos.msg);
            location.reload();
        }else{
            alert(datos.msg);
            if(datos.msg=='Sesión Expirada'){
                window.parent.location.href='../index.html'
            }
        }
    }).fail(function (jqXHR, textStatus, errorThrown) {
        alert(jqXHR.responseJSON.msg);
    });
}