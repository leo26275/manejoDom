function chekarTodasLasFilas(){
  var obTbl = document.getElementById("tbl");
  var valor = obTbl.rows[0].cells[0].childNodes[0].checked;
  var fila = obTbl.rows;

  for(var i=1; i < fila.length; i++){
      obTbl.rows[i].cells[0].childNodes[0].checked = valor;
  }
}

function onLoad(){
  var img = document.getElementById("img");
  img.hidden = true;

  var divTbl = document.getElementById("tabla");
    var obTbl = document.createElement("table");
    obTbl.id = "tbl";


    var fila = obTbl.insertRow(0);
    fila.id = "cabecera"
    obTbl.rows[0].insertCell(0);
    var ctrlCheck = document.createElement("input");
    ctrlCheck.type = "checkbox"

    ctrlCheck.onclick = function (){
        chekarTodasLasFilas();
    }
    obTbl.rows[0].cells[0].appendChild(ctrlCheck);
    obTbl.rows[0].insertCell(1);
    obTbl.rows[0].cells[1].textContent = "Código";
    obTbl.rows[0].insertCell(2);
    obTbl.rows[0].cells[2].textContent = "Título";
    obTbl.rows[0].insertCell(3);
    obTbl.rows[0].cells[3].textContent = "Descripción";
    obTbl.rows[0].insertCell(4);
    obTbl.rows[0].cells[4].textContent = "Fotografía";

    divTbl.appendChild(obTbl);
}
function mostrar(){
    var archivo = document.getElementById("file").files[0];
    var reader = new FileReader();
    if (file) {
        reader.readAsDataURL(archivo );
        reader.onloadend = function () {
        document.getElementById("img").src = reader.result;
      }
    }
  img.hidden = false;
} 

function Aceptar(){
  //Recuperando los datos capturados
  var titulo = document.frmCaptura.titulo.value;
  var codigo = document.frmCaptura.codigo.value;
  var descripcion = document.frmCaptura.descripcion.value;
  var label = document.getElementById("edit").value;
  var tbl = document.getElementById("tbl");   
  var numFilas = tbl.rows.length - 1;
  var foto = document.getElementById("file").files[0];

  if(label == 0){
  
      var numFilas = tbl.rows.length;
      tbl.insertRow(numFilas);
  
      var ctrl = document.createElement("input");
      ctrl.type = "checkbox";
  
      tbl.rows[numFilas].insertCell(0);
      tbl.rows[numFilas].cells[0].appendChild(ctrl);
      tbl.rows[numFilas].insertCell(1);
      tbl.rows[numFilas].cells[1].textContent = codigo;
      tbl.rows[numFilas].insertCell(2);
      tbl.rows[numFilas].cells[2].textContent = titulo;
      tbl.rows[numFilas].insertCell(3);
      tbl.rows[numFilas].cells[3].textContent = descripcion;
      tbl.rows[numFilas].insertCell(4);
      var image = document.createElement("img");
      image.width=75;
      image.height=75;
      var reader = new FileReader();
      if(foto != null){
        reader.readAsDataURL(foto);
        reader.onloadend = function () {
          image.src = reader.result;
        }
      }
  
      tbl.rows[numFilas].cells[4].appendChild(image);
  }else{
    while(numFilas > 0){
      if(tbl.rows[numFilas].cells[0].childNodes[0].checked){

        tbl.rows[numFilas].cells[1].textContent = codigo;
        tbl.rows[numFilas].cells[2].textContent = titulo;
        tbl.rows[numFilas].cells[3].textContent = descripcion;
      }
      numFilas--;
    }
  }
  

    Cancelar();
}

function Cancelar(){
  var img = document.getElementById("img");
  img.hidden = true;

  document.frmCaptura.codigo.value = "";
  document.frmCaptura.titulo.value = "";
  document.frmCaptura.descripcion.value = "";
  document.frmCaptura.foto.value = "";
}

function Eliminar(){
  var tbl = document.getElementById("tbl");   
  var numFilas = tbl.rows.length - 1;

  while(numFilas > 0){
      if(tbl.rows[numFilas].cells[0].childNodes[0].checked){
          tbl.deleteRow(numFilas);
      }
      numFilas--;
  }
  
  tbl.rows[0].cells[0].childNodes[0].checked = false;

}

function Editar(){
  var tbl = document.getElementById("tbl");   
  var numFilas = tbl.rows.length - 1;
  var cont = 0;

  while(numFilas > 0){
      if(tbl.rows[numFilas].cells[0].childNodes[0].checked){
        cont++;
      }
      numFilas--;
  }

  if(cont > 1){
    alert("Solo puede editar un registro a la vez");
  }else{
    numFilas = tbl.rows.length - 1;

    while(numFilas > 0){
      if(tbl.rows[numFilas].cells[0].childNodes[0].checked){
        document.frmCaptura.codigo.value = tbl.rows[numFilas].cells[1].textContent;
        document.frmCaptura.titulo.value = tbl.rows[numFilas].cells[2].textContent;
        document.frmCaptura.descripcion.value = tbl.rows[numFilas].cells[3].textContent;
      }
      numFilas--;
    }
  }

  var label = document.getElementById("edit");
  label.setAttribute("value", "1");
  
  tbl.rows[0].cells[0].childNodes[0].checked = false;

}

function genCodigo(){
  var codigoGen = "";
  var titulo = document.frmCaptura.titulo.value;
  var tbl = document.getElementById("tbl"); 
  var label = document.getElementById("edit").value;  
  var numFilas = tbl.rows.length;
  if(numFilas < 10)
    numFilas = "000" + numFilas;
  else
    numFilas = "00" + numFilas;
  
  codigoGen = titulo.charAt(0).toUpperCase() + numFilas;

  if(label == 0){
  document.frmCaptura.codigo.value = codigoGen;
  }
}

function Alerta()
    {
    var opcion = confirm("¿Desea eliminar el registro?");
    if (opcion == true) {
      Eliminar();
	  } 
}

