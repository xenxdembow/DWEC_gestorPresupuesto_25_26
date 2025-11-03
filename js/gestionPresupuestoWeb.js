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
            etiqueta.innerHTML = gastos[j].etiquetas[i];
            etiqueta.classList.add("gasto-etiquetas-etiqueta");
            eti.appendChild(etiqueta);
        }
        eti.classList.add("gasto-etiquetas");
        let div = document.createElement("div");
        div.classList.add("gasto");
        div.appendChild(des);
        div.appendChild(fec);
        div.appendChild(val);
        div.appendChild(eti)
        contenedor.appendChild(div);
    }
}
function mostrarGastosAgrupadosWeb(id, agrup, periodo){
    let contenedor = document.createElement("div");
    contenedor.classList.add("agrupacion");
    
}
export{
    mostrarDatoenId,
    mostrarGastoWeb,
    mostrarGastosAgrupadosWeb
}