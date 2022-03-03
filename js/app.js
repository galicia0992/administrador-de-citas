// campos del formulario
const nombreMascota = document.querySelector("#mascota")
const nombrePropietario = document.querySelector("#propietario")
const telefonoInput = document.querySelector("#telefono")
const fechaInput = document.querySelector("#fecha")
const horaInput = document.querySelector("#hora")
const sintomasInput = document.querySelector("#sintomas")

// UI
const formulario = document.querySelector("#nueva-cita")
const contenedorCitas = document.querySelector("#citas")

let editando 

class Citas{
    constructor(){
        this.citas = []
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita]
        console.log(this.citas)
    }

    //eliminar citas
    eliminarCita(id){
        this.citas = this.citas.filter(cita => cita.id !== id)
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map( cita => cita.id === citaActualizada.id ? citaActualizada : cita)
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        const divMensaje = document.createElement("div")
        divMensaje.classList.add("text-center","alert", "d-block", "col-12" )

        if(tipo === "error"){
            divMensaje.classList.add("alert-danger")
        }else{
            divMensaje.classList.add("alert-success")
        }

        divMensaje.textContent = mensaje

        document.querySelector("#contenido").insertBefore(divMensaje, document.querySelector(".agregar-cita") )

        setTimeout(() => {
            divMensaje.remove()
        }, 5000);
    }
    //
    imprimirCitas({citas}){
        this.limpiaHTML()
        citas.forEach(cita =>{
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita
            const divCita = document.createElement("div")
            divCita.classList.add(".cita", "p-3")
            divCita.dataset.id = id

            //scripting de los elemtntos de la cita
            //muestra la info de las citas en el HTML
            const mascotaParrafo = document.createElement("h2")
            mascotaParrafo.classList.add("card-title", "font-weight-bolder")
            mascotaParrafo.textContent = mascota

            const propietarioParrafo = document.createElement("p")
            propietarioParrafo.innerHTML = `<span class="font-weight-bolder">Propietario: </span> ${propietario}`

            const telefonoPropietario = document.createElement("p")
            telefonoPropietario.innerHTML = `<span class="font-weight-bolder">Telefono: </span> ${telefono}`

            const fechaCita = document.createElement("p")
            fechaCita.innerHTML = `<span class="font-weight-bolder">Fecha: </span> ${fecha}`

            const horaCita = document.createElement("p")
            horaCita.innerHTML = `<span class="font-weight-bolder">Hora: </span> ${hora}`

            const sintomasMascota = document.createElement("p")
            sintomasMascota.innerHTML = `<span class="font-weight-bolder">Sintomas: </span> ${sintomas}`

            //boton para eliminar cita
            const btnEliminar = document.createElement("button")
            btnEliminar.classList.add("btn", "btn-danger", "mr-2")
            btnEliminar.innerHTML = 'Eliminar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>'
            
            //añade un boton para editar
            const btnEditar = document.createElement("button")
            btnEditar.classList.add("btn", "btn-info")
            btnEditar.innerHTML = 'Editar <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>'
            btnEditar.onclick = () => cargarEdicion(cita)

            //elimina la cita por id
            btnEliminar.onclick = () => eliminarCita(id)
            


            //agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo)
            divCita.appendChild(propietarioParrafo)
            divCita.appendChild(telefonoPropietario)
            divCita.appendChild(fechaCita)
            divCita.appendChild(horaCita)
            divCita.appendChild(sintomasMascota)
            divCita.appendChild(btnEliminar)
            divCita.appendChild(btnEditar)

            //agregar las citas al HTML
            contenedorCitas.appendChild(divCita)
        })
    }
    limpiaHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild)
        }
    }
     
}


const ui = new UI(
    
)
const administrarCitas = new Citas()

eventListeners()

//al momento de escribir algo, dispara la funcion datosCita
function eventListeners(){
    nombreMascota.addEventListener("input", datosCita)
    nombrePropietario.addEventListener("input", datosCita)
    telefonoInput.addEventListener("input", datosCita)
    fechaInput.addEventListener("input", datosCita)
    horaInput.addEventListener("input", datosCita)
    sintomasInput.addEventListener("input", datosCita)

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
}

function nuevaCita(e){
    e.preventDefault()

    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj

    if( mascota === ''||propietario ===''||telefono ===''||fecha === ''||hora === ''||sintomas ==='' ){
        ui.imprimirAlerta("todos los campos deben ser llenados", "error")
        return
    }

    if(editando){
        ui.imprimirAlerta("Editado Correctamente")
        administrarCitas.editarCita({...citaObj})

        //regresar el boton a su estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear cita'
        console.log("modo edicion")
        //quitar modo edicion
        editando = false
    }else{
        //generar ID unico
    citaObj.id = Date.now()
    console.log("modo normal")
    //creando una nueva cita
    // con el {...citaObj} creamos una copia de la cita anterior, de lo contrario si modificamos la cita todas
    //las anteriores seran iguales
    administrarCitas.agregarCita({...citaObj})

    ui.imprimirAlerta("Se agrego correctamente")
    }

    reiniciarObjeto()
    //reiniciar formulario
    formulario.reset()

    ui.imprimirCitas(administrarCitas)

    function reiniciarObjeto(){
        citaObj.mascota = ''
        citaObj.propietario = ''
        citaObj.telefono = ''
        citaObj.fecha = ''
        citaObj.hora = ''
        citaObj.sintomas = ''
    }
}

function eliminarCita(id){
    administrarCitas.eliminarCita(id)

    ui.imprimirAlerta("La cita se elimino")

    ui.imprimirCitas(administrarCitas)
}

function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita

    //llenar los inputs
    nombreMascota.value = mascota
    nombrePropietario.value = propietario
    telefonoInput.value = telefono
    fechaInput.value = fecha
    horaInput.value = hora
    sintomasInput.value = sintomas

    //llenar el objeto
    citaObj.mascota = mascota
    citaObj.propietario = propietario
    citaObj.telefono = telefono
    citaObj.fecha = fecha
    citaObj.hora = hora
    citaObj.sintomas = sintomas
    citaObj.id = id

    //cambiar el texto del boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios'

    editando = true
}