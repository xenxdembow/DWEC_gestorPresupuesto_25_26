export function mostrarDatoenId(valor, idElemento){
    document.getElementById(idElemento).innerHTML = valor
}
export function mostrarGastoWeb(gasto){
    return(`Gasto correspondiente a ${gasto.descripcion} con valor ${gasto.valor} €`)
}
export function mostrarGastosAgrupadosWeb(gastosAgrupados){
    return(`Gastos agrupados: ${gastosAgrupados}`)
}   