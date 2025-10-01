// TODO: Crear las funciones, objetos y variables indicadas en el enunciado

// TODO: Variable global
let presupuesto = 0;
let gastos = [];
let idGasto = 0;

function actualizarPresupuesto(val) {
    if(val >= 0)
    {
        presupuesto = val
        return presupuesto
    }
    else
    {
        console.log("Valor introducido erroneo")
        return -1
    }
}

function mostrarPresupuesto() {
    return(`Tu presupuesto actual es de ${presupuesto} €`)
}

function CrearGasto(descripcion, valor, fecha, ...etiquetas) {
    
        this.descripcion = descripcion;
        this.valor = (valor > 0) ? valor:0;
        this.fecha = (fecha == null) ? new Date() : Date.parse(fecha);
        this.etiquetas = etiquetas;
        this.mostrarGasto = function(){
            return(`Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €`)
        }
        this.actualizarDescripcion = function(descripcion2){
            this.descripcion = descripcion2
        }
        this.actualizarValor = function(value){
            if(value > 0)
                this.valor = value
        }
        this.mostrarGastoCompleto = function(){
            let fechaFinal = new Date(this.fecha)
            let text = `Gasto correspondiente a ${this.descripcion} con valor ${this.valor} €.
Fecha: ${fechaFinal.toLocaleString()}
Etiquetas:
`
            for(let i = 0; i < etiquetas.length; i++)
            {
                text += `- ${etiquetas[i]}
`
            }
            return text
        }
        this.actualizarFecha = function(fecha){
            let fechaParseada = Date.parse(fecha)
            if(!isNaN(fechaParseada))
            {
                this.fecha = fechaParseada
            }  
        }
}

function listarGastos(){
    return gastos;
}
function anyadirGasto(gasto){
    gasto.id = idGasto;
    idGasto ++;
    gastos.push(gasto)
}
function borrarGasto(id){
    for(let i = 0; i < gastos.length; i++)
    {
        if(id === gastos[i].id)
        {
            gastos.splice(i,1)
        }
    }
}
function calcularTotalGastos(){
    let suma = 0;
    gastos.forEach(gasto => {
        suma += gasto.valor
    });
    return suma
}
function calcularBalance(){
    return presupuesto - calcularTotalGastos();
}
// NO MODIFICAR A PARTIR DE AQUÍ: exportación de funciones y objetos creados para poder ejecutar los tests.
// Las funciones y objetos deben tener los nombres que se indican en el enunciado
// Si al obtener el código de una práctica se genera un conflicto, por favor incluye todo el código que aparece aquí debajo
export   {
    mostrarPresupuesto,
    actualizarPresupuesto,
    CrearGasto,
    listarGastos,
    anyadirGasto,
    borrarGasto,
    calcularTotalGastos,
    calcularBalance
}
