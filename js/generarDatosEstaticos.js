
import * as Js1 from './gestionPresupuesto.js';
import * as Js2 from './gestionPresupuestosWeb.js';
function generarDatosEstaticos() {
    Js1.actualizarPresupuesto(1000);
    Js2.mostrarDatosenId(1);
}
function actualizarPresupuesto(val) {
    Js1.actualizarPresupuesto(val);
}