// campos del formulario
const nombreMascota = document.querySelector("#mascota")
const nombrePropietario = document.querySelector("#propietario")
const telefono = document.querySelector("#telefono")
const fecha = document.querySelector("#fecha")
const hora = document.querySelector("#hora")
const sintomas = document.querySelector("#sintomas")

// UI
const formulario = document.querySelector("#nueva-cita")
const contenedorCitas = document.querySelector("#citas")

class Citas{
    constructor(){
        this.citas = []
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement("div")
        divMensaje.classList.add("text-center","alert", "d-block", "col-12" )

        if(tipo === "error"){
            divMensaje.classList.add("alert-sucess")
        }else{
            divMensaje.classList.add("alert-danger")
        }

        divMensaje.textContent = mensaje

        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita") )

        setTimeout(() => {
            divMensaje.remove()
        }, 5000);
    }
}

const ui = new UI(
    
)
const administrarCitas = new Citas()

eventListeners()

//al momento de escribir algo, dispara la funcion datosCita
function eventListeners(){
    nombreMascota.addEventListener("change", datosCita)
    nombrePropietario.addEventListener("change", datosCita)
    telefono.addEventListener("change", datosCita)
    fecha.addEventListener("change", datosCita)
    hora.addEventListener("change", datosCita)
    sintomas.addEventListener("change", datosCita)
    formulario.addEventListener("submit", nuevaCita)
}

//para que funcione, en el HTML debe estar definido la etiqueta name con el mismo nombre del objeto ej. name="mascota", name="propietario"
const citaObj = {
    mascota: "",
    propietario: "",
    telefono: "",
    fecha: "",
    hora: "",
    sintomas: ""
}

//esta funcion va a rellenar el objeto citaObj con lo escrito en la funcion eventListeners
function datosCita(e){
    //empata el name en la etiqueta del HTML con el nombre del objeto dentro de citaObj ej. name="mascota" - citaObj = {mascota:""}
    //citaObj(que sea igual al valor de la etiqueta name en el HTML) es igual a lo que se escriba en el input
    citaObj[e.target.name] = e.target.value
    console.log(citaObj)
}

function nuevaCita(e){
    e.preventDefault()

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj

    if( mascota === ""||propietario ===""||telefono ===""||fecha === ""||hora === ""||sintomas ==="" ){
        ui.imprimirAlerta("todos los campos deben ser llenados")
        
    }else{
        console.log(citaObj)
    }
}