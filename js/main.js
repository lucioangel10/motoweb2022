// objetos

class Simulador {
    constructor(precio, anticipo) {
        this.precio = precio;
        this.anticipo = parseFloat(anticipo);
        this.resultado1;
        this.resultado2;
        this.resultado3;
    }
    cuotas12() {
        this.resultado1 = this.precio - this.anticipo;
        this.resultado1 = this.resultado1 * tazasInteres[0];
        this.resultado1 = this.resultado1 / 12;
    }
    cuotas18() {
        this.resultado2 = this.precio - this.anticipo;
        this.resultado2 = this.resultado2 * tazasInteres[1];
        this.resultado2 = this.resultado2 / 18;
    }
    cuotas24() {
        this.resultado3 = this.precio - this.anticipo;
        this.resultado3 = this.resultado3 * tazasInteres[2];
        this.resultado3 = this.resultado3 / 24;
    }
    mostrar() {
        

        
        this.cuotas12();
        this.cuotas18();
        this.cuotas24();
        alert(`La financiacion para el importe y anticipo elejido es:\n12 cuotas de $${this.resultado1}\n18 cuotas de $${this.resultado2}\n24 cuotas de $${this.resultado3}`);
    }
}
class Moto {
    constructor(nombre, precio, tipo, marca, img, id, dolar) {
        this.nombre = nombre.toUpperCase();
        this.precio = parseFloat(precio);
        this.tipo = tipo.toUpperCase();
        this.marca = marca.toUpperCase();
        this.img=img;
        this.id=id;
        this.dolar=dolar;
        this.conversion;
        

    }
    importada(dolar) {
       
        if (this.dolar===true){
            
            alert(`El precio de la moto elegida es el dolares. Para financiar pasamos el precio a pesos.\nLa cotizacion del dia en dolares es: $${dolar}`)
            this.conversion= this.precio*dolar;
        }
    }
}



// variables
let exito;
let exitoEnLS = parseInt(localStorage.getItem('simulaciones'));
if(exitoEnLS){
    exito=exitoEnLS
}else{
    exito=0
}
localStorage.setItem('exito', exito);
const caracterNum=contarNum(0,9)
let anticipo;
const dolar=[215,213,210,226,230,]
const tazasInteres = [1.25, 1.35, 1.45]
const motos=[];
const cantidadSimulaciones= document.querySelector('.simulaciones');
const contenedorMotos = document.querySelector('.contenedor-motos');
const contenedorTipo=document.querySelector('.contenedor-tipos');

// programa
agregarMotos(motos);

mezclarMotos(motos);


mostrarBotones();
motos.forEach((moto)=>guardarMotos(moto.id, JSON.stringify(moto)));

mostrarSimulaciones();


// funciones
function mostrarBotones(){
    const btnStreet = document.createElement('button');
    btnStreet.classList.add('btn-filtro');
    btnStreet.textContent='Street';
    btnStreet.onclick = ()=> {mostrarMotos(motos.filter((moto)=> moto.tipo.includes('STREET')))}
    const btnOnoff = document.createElement('button');
    btnOnoff.classList.add('btn-filtro');
    btnOnoff.textContent='On/Off';
    btnOnoff.onclick = ()=> {mostrarMotos(motos.filter((moto)=> moto.tipo.includes('ON/OFF')))}
    const btnTodas = document.createElement('button');
    btnTodas.classList.add('btn-filtro');
    btnTodas.textContent='Todas';
    btnTodas.onclick = ()=> {mostrarMotos(motos)}
    const btnScooter = document.createElement('button');
    btnScooter.classList.add('btn-filtro');
    btnScooter.textContent='Scooter';
    btnScooter.onclick = ()=> {mostrarMotos(motos.filter((moto)=> moto.tipo.includes('SCOOTER')))}
    const btnCub = document.createElement('button');
    btnCub.classList.add('btn-filtro');
    btnCub.textContent='Cub';
    btnCub.onclick = ()=> {mostrarMotos(motos.filter((moto)=> moto.tipo.includes('CUB')))}
    contenedorTipo.appendChild(btnStreet);
    contenedorTipo.appendChild(btnOnoff);
    contenedorTipo.appendChild(btnTodas);
    contenedorTipo.appendChild(btnScooter);
    contenedorTipo.appendChild(btnCub);

}



function mezclarMotos(array){   
    array.sort(()=> Math.random()-0.5);
}

function mostrarMotos(arrayMoto){
    contenedorMotos.innerHTML = '';
    arrayMoto.forEach((moto)=>{
        // scripting
        
        const divProducto = document.createElement('div');
        divProducto.classList.add('artChino');
        const tipoProducto = document.createElement('h4');
        tipoProducto.classList.add('h4Chino');
        tipoProducto.textContent = moto.tipo;
        const imgProducto = document.createElement('img');
        imgProducto.classList.add('imgproducto');
        imgProducto.src = moto.img;
        const marcaProducto = document.createElement('h2');
        marcaProducto.classList.add('h2Chino');
        marcaProducto.textContent = `${moto.marca}`;
        const nombreProducto = document.createElement('h2');
        nombreProducto.classList.add('h2Chino');
        nombreProducto.textContent = `${moto.nombre}`;
        const precioProducto = document.createElement('h2');
        precioProducto.classList.add('h2Chino');
        if(moto.dolar===true){
            precioProducto.textContent = `US$${moto.precio}`;
        }else{
            precioProducto.textContent = `$${moto.precio}`;
        }
        const btnSimu= document.createElement('button')
        btnSimu.classList.add('btn-simulador');
        btnSimu.textContent='Simular cuotas';
        btnSimu.onclick = ()=>{simularCuotas(moto)};
        
        divProducto.appendChild(tipoProducto);
        divProducto.appendChild(imgProducto);
        divProducto.appendChild(marcaProducto);
        divProducto.appendChild(nombreProducto);
        divProducto.appendChild(precioProducto);
        divProducto.appendChild(btnSimu);


        contenedorMotos.appendChild(divProducto);




    })
}






function pedirAnticipo(precio, marca, nombre) {

    anticipo = parseFloat(prompt(`Seleccionaste ${marca} ${nombre}\nEl precio es de $${precio}.\nSi desea entregar un anticipo ingreseló, sino ingrese "0"`));
}
function malAnticipo(anticipo, precio) {
    if (anticipo >= precio || isNaN(anticipo) || anticipo < 0) {

        return true;

    }
    return false;
}
function contarNum(inicio, fin) {
    const arrAux = [];
    for (i = inicio; i <= fin; i++) {
        arrAux.push(i)
    }
    return arrAux;
}
function simularCuotas(moto) {
    moto.importada(dolar[Math.floor(Math.random()*5)]);

    for (let i = 1; i > 0; i++) {
        if(moto.dolar===true){
            pedirAnticipo(moto.conversion, moto.marca, moto.nombre);

        }else{
            pedirAnticipo(moto.precio, moto.marca, moto.nombre);

        }
        if(moto.dolar===true){
            if(malAnticipo(anticipo, moto.conversion)) {
                alert('Su anticípo no es válido.\nLos carácteres disponibles para esta opcion son:\n' + caracterNum.join(", "));
                continue;
            }
        }else if(malAnticipo(anticipo, moto.precio)) {
            alert('Su anticípo no es válido.\nLos carácteres disponibles para esta opcion son:\n' + caracterNum.join(", "));
            continue;
        }
        break;
    }
    let simulador;
    if(moto.dolar===true){
        simulador = new Simulador(moto.conversion, anticipo);

    }else{
        simulador = new Simulador(moto.precio, anticipo);

    }
    simulador.mostrar();
    
    exito++;
    contarSimulaciones(exito);
    mostrarSimulaciones();
}
function agregarMotos(array){
array.push(new Moto('Titan', '460000', 'street', 'honda', 'multimedia/productos/street/ym20.png',1, false),
new Moto('cb 250', '690000', 'street', 'honda','multimedia/productos/street/cb250-street_ccexpress.png', 2,false),
new Moto('glh 150', '315000', 'street', 'honda', 'multimedia/productos/street/glh-street_ccexpress.png',3,false),
new Moto('mt-03', '1500000', 'street', 'yamaha','multimedia/productos/street/mt03-street_ccexpress.png',4,true),
new Moto('fzfi d', '542000', 'street', 'yamaha','multimedia/productos/street/fz-street_ccexpress.png',5,false),
new Moto('ybr 125', '412000', 'street', 'yamaha','multimedia/productos/street/ybr-calle_ccexpress.png',6,false),
new Moto('crypton 110', '334600', 'cub', 'yamaha','multimedia/productos/cub/t110-cub_ccexpress.png',7,false),
new Moto('zb 110', '132000', 'cub', 'zanella','multimedia/productos/cub/zb-cub_ccexpress.png',8,false),
new Moto('milano 150', '291000', 'scooter', 'corven','multimedia/productos/scooter/milano_ccexpress.png',13,false),
new Moto('nm-x 155', '865000', 'scooter', 'yamaha','multimedia/productos/scooter/nmx_ccexpress.png',14,false),
new Moto('fascino 125', '472600', 'scooter', 'yamaha','multimedia/productos/scooter/fascino_ccexpress.png',15,false),
new Moto('pcx 150', '770000', 'scooter', 'honda','multimedia/productos/scooter/pcx_ccexpress.png',16,true),
new Moto('exclusive 150', '320000', 'scooter', 'zanella','multimedia/productos/scooter/styler_ccexpress.png',17,false),
new Moto('zr 115', '404000', 'scooter', 'yamaha','multimedia/productos/scooter/zr115_ccexpress.png',18,false),
new Moto('xtz 125', '586000', 'on/off', 'yamaha','multimedia/productos/onOff/xtz125-onOff_ccexpress.png',19,false),
new Moto('klx 300', '13000', 'on/off', 'kawasaki','multimedia/productos/onOff/klx300-onOff_ccexpress.png',20,true),
new Moto('tornado', '880000', 'on/off', 'honda','multimedia/productos/onOff/tornado-onOff_ccexpress.png',21,false),
new Moto('klx 150', '7000', 'on/off', 'kawasaki','multimedia/productos/onOff/klx150-onOff_ccexpress.png',22,true),
new Moto('xr 150', '460000', 'on/off', 'honda','multimedia/productos/onOff/xr-onOff_ccexpress.png',23,false),
new Moto('xtz 250 abs', '997000', 'on/off', 'yamaha','multimedia/productos/onOff/xtz250-onOff_ccexpress.png',24,false),
new Moto('blitz 110', '130000', 'cub', 'Motomel','multimedia/productos/cub/blitz-cub_ccexpress.png',12,false),
new Moto('energy 110', '130000', 'cub', 'corven','multimedia/productos/cub/energy-cub_ccexpress.png',9,false),
new Moto('mirage 110', '128600', 'cub', 'corven','multimedia/productos/cub/mirage-cub_ccexpress.png',10,false),
new Moto('wave 110', '220000', 'cub', 'honda','multimedia/productos/cub/wave-cub_ccexpress.png',11,false))

}


// STORAJE Y JSON

function mostrarSimulaciones(){
    const simulacionesAlmacenadas=localStorage.getItem('simulaciones')
    cantidadSimulaciones.textContent= `Ya se han realizaron ${simulacionesAlmacenadas} simulaciones exitozas`;
}
function guardarMotos(clave, valor){
    localStorage.setItem(clave,valor);
}


function contarSimulaciones(cantidad){
    localStorage.setItem('simulaciones', cantidad)
}
