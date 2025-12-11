import * as GP from "./gestionPresupuesto.js";

function mostrarDatoenId(valor, id){ 
    document.getElementById(id).innerHTML = valor;
}
function mostrarGastoWeb(gastos, id){
    let contenedor = document.getElementById(id);
    for(let j = 0; j < gastos.length; j++)
    {
        let des = document.createElement("div");
        des.innerHTML = gastos[j].descripcion;
        des.classList.add("gasto-descripcion");
        let fec = document.createElement("div");
        fec.innerHTML = new Date(gastos[j].fecha).toLocaleString();
        fec.classList.add("gasto-fecha");
        let val = document.createElement("div");
        val.innerHTML = gastos[j].valor;
        val.classList.add("gasto-valor");
        let eti = document.createElement("div");
        for(let i = 0; i < gastos[j].etiquetas.length; i++)
        {
            let etiqueta = document.createElement("span");
            let handleDel2 = new BorrarEtiquetasHandle();
            handleDel2.gasto = gastos[j];
            handleDel2.etiqueta = gastos[j].etiquetas[i];
            etiqueta.addEventListener("click", handleDel2)
            etiqueta.innerHTML = gastos[j].etiquetas[i];
            etiqueta.classList.add("gasto-etiquetas-etiqueta");
            eti.appendChild(etiqueta);
        }
        eti.classList.add("gasto-etiquetas");
        let div = document.createElement("div");
        div.classList.add("gasto");
        let btnEdit = document.createElement("button");
        let btnDel = document.createElement("button");
        let btnFormulario = document.getElementById("anyadirgasto-formulario");
        btnEdit.classList.add("gasto-editar");
        btnDel.classList.add("gasto-borrar");
        btnEdit.innerHTML = "Editar"
        btnDel.innerHTML = "Borrar"
        let handleEdit = new EditarHandle();
        let handleDel = new BorrarHandle();
        handleEdit.gasto = gastos[j];
        handleDel.gasto = gastos[j];
        btnEdit.addEventListener("click", handleEdit);
        btnDel.addEventListener("click", handleDel);
        btnFormulario.addEventListener("click", nuevoGastoWebFormulario);
        div.appendChild(des);
        div.appendChild(fec);
        div.appendChild(val);
        div.appendChild(eti);
        div.appendChild(btnEdit);
        div.appendChild(btnDel);
        contenedor.appendChild(div);
    }
}
function mostrarGastosAgrupadosWeb(id, agrup, periodo){
    let granContenedor = document.getElementById(id);
    let contenedor = document.createElement("div");
    contenedor.classList.add("agrupacion");
    let h1 = document.createElement("h1");
    h1.innerHTML = `Gastos agrupados por ${periodo}`;
    contenedor.appendChild(h1);
    for(let values of Object.values(agrup))
    {
        let dato = document.createElement("div");
        dato.classList.add("agrupacion-dato");
        contenedor.appendChild(dato);
        let nombre = document.createElement("span")
        let valor = document.createElement("span")
        nombre.classList.add("agrupacion-dato-clave");
        valor.classList.add("agrupacion-dato-valor");
        nombre.innerHTML = values[0];
        valor.innerHTML = values[1];
        dato.appendChild(nombre);
        dato.appendChild(valor);
        contenedor.appendChild(dato)
    }
    granContenedor.appendChild(contenedor);
}
function repintar(){
    mostrarDatoenId(GP.mostrarPresupuesto(), "presupuesto");
    mostrarDatoenId(GP.calcularTotalGastos(), "gastos-totales");
    mostrarDatoenId(GP.calcularBalance(), "balance-total");
    let div = document.getElementById("listado-gastos-completo");
    div.innerHTML = "";
    mostrarGastoWeb(GP.listarGastos(), "listado-gastos-completo");
}
let btnActualizar = document.getElementById("actualizarpresupuesto")
btnActualizar.addEventListener("click", actualizarPresupuestoWeb)
function actualizarPresupuestoWeb(){
    let actualizar = prompt("Introduce el nuevo presupuesto:");
    let presupuesto = parseInt(actualizar)
    let presAct = document.getElementById("presupuesto");
    presAct.innerHTML = `Tu presupuesto actual es de ${presupuesto} €`
}
let btnAñadir = document.getElementById("anyadirgasto");
btnAñadir.addEventListener("click", nuevoGastoWeb);
function nuevoGastoWeb(){
    let des = prompt("Introduce la descripción que quieras:");
    let val = prompt("Introduce el valor que desees:");
    let fech = prompt("Introduce la fecha en formato year-month-day:");
    let eti = prompt("Introduce las etiquetas que quieras, separadas por comas:");
    val = Number(val);
    fech = Date.parse(fech);
    let etiArray = eti.split(",");
    let newGasto = new GP.CrearGasto(des, val, fech, ...etiArray);
    GP.anyadirGasto(newGasto);
    repintar();
}
function EditarHandle(){
    this.handleEvent = function(event){
        let des = prompt("Introduce la descripción que quieras:");
        let val = prompt("Introduce el valor que desees:");
        let fech = prompt("Introduce la fecha en formato year-month-day:");
        let eti = prompt("Introduce las etiquetas que quieras, separadas por comas:");
        this.gasto.descripcion = des;
        this.gasto.valor = Number(val);
        this.gasto.fecha = Date.parse(fech);
        this.gasto.etiquetas = eti.split(",");
        repintar();
    }
}
function BorrarHandle(){
    this.handleEvent = function(event){
        let id = this.gasto.id; 
        GP.borrarGasto(id);
        repintar();   
    }
}
function BorrarEtiquetasHandle(){
    this.handleEvent = function(event){
        this.gasto.borrarEtiquetas(this.etiqueta);
        repintar();
    }
}
function CancelarFormularioHandle() {
    this.handleEvent = function(event){
        this.formulario.remove();
        this.botonPrincipal.removeAttribute("disabled");
    }
}
function nuevoGastoWebFormulario(event){
    let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
    var formulario = plantillaFormulario.querySelector("form");
    formulario.addEventListener("submit", function(event){
        event.preventDefault();
        let form = event.currentTarget;
        let des = form.elements["descripcion"].value;
        let val = Number(form.elements["valor"].value);
        let fech = form.elements["fecha"].value;
        let eti = form.elements["etiquetas"].value.split(",");
        let nuevoGasto = new GP.CrearGasto(des, val, fech, ...eti);
        GP.anyadirGasto(nuevoGasto);
        repintar();
        let botonPrincipal = document.getElementById("anyadirgasto-formulario");
        if(botonPrincipal){
            botonPrincipal.removeAttribute("disabled")
        }
    });
    let btnCancelar = formulario.querySelector("button.cancelar");
    let cancelarHandler = new CancelarFormularioHandle();
    cancelarHandler.formulario = formulario;
    cancelarHandler.botonPrincipal = event.currentTarget;
    btnCancelar.addEventListener("click", cancelarHandler);
    event.currentTarget.setAttribute("disabled", true);
    document.getElementById("controlesprincipales").appendChild(plantillaFormulario);
}
function GuardarEdicionHandle(){
    this.handleEvent = function(event){
        event.preventDefault();
        let form = event.currentTarget();
        this.gasto.descripcion = form.elements["descripcion"].value;
        this.gasto.valor = Number(form.elements["valor"].value);
        this.gasto.fecha = Date.parse(form.elements["fecha"].value);
        this.gasto.etiquetas = form.elements["etiquetas"].value.split(",");
        repintar();
        form.remove();
    }
}
function EditarHandleFormulario(){
    this.handleEvent = function(event){
        let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true);
        var formulario = plantillaFormulario.querySelector("form");
        let des = form.elements["descripcion"].value = this.gasto.descripcion;
        let val = form.elements["valor"].value = this.gasto.valor;
        let fech = form.elements["fecha"].value = this.gasto.fecha;
        let eti = form.elements["etiquetas"].value = this.gasto.etiquetas.join(",");
    }
}
export{
    mostrarDatoenId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}