
// VALIDACIÓN FORMULARIO

const form = document.getElementById('form')
const inputs = document.querySelectorAll('#form input')

const expresiones = {
    nombre: /^[a-z-A-ZÀ-ÿ\s]{1,40}$/,
    apellido: /^[a-z-A-ZÀ-ÿ\s]{1,40}$/,
    ciudad: /^[a-z-A-ZÀ-ÿ\s]{1,40}$/,
    provincia: /^[a-z-A-ZÀ-ÿ\s]{1,40}$/,
    url:  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#()?&//=]*)/,
    email: /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
}

const campos = {
    nombre: false,
    apellido: false,
    ciudad: false,
    provincia: false,
    url: false,
    email: false
}

const validarForm = (e) => {
     switch (e.target.name) {

         case 'nombre':
            validarCampo(expresiones.nombre, e.target, 'nombre')
         break
         case 'apellido':
            validarCampo(expresiones.apellido, e.target, 'apellido')
         break
         case 'ciudad':
            validarCampo(expresiones.ciudad, e.target, 'ciudad')
         break
         case 'provincia':
            validarCampo(expresiones.provincia, e.target, 'provincia')
         break
         case 'url':
            validarCampo(expresiones.url, e.target, 'url')
         break
         case 'email':
            validarCampo(expresiones.email, e.target, 'email') 
         break
     }
}

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`grupo-${campo}`).classList.remove('form-group-incorrecto') 
        document.getElementById(`grupo-${campo}`).classList.add('form-group-correcto')
        document.querySelector(`#grupo-${campo} svg`).classList.add('fa-check-circle')
        document.querySelector(`#grupo-${campo} svg`).classList.remove('fa-times-circle')
        document.querySelector(`#grupo-${campo} .form-input__error`).classList.remove('form-input__error-activo') 
        campos[campo] = true
    } else {
        document.getElementById(`grupo-${campo}`).classList.add('form-group-incorrecto')
        document.getElementById(`grupo-${campo}`).classList.remove('form-group-correcto')
        document.querySelector(`#grupo-${campo} svg`).classList.add('fa-times-circle')
        document.querySelector(`#grupo-${campo} svg`).classList.remove('fa-check-circle') 
        document.querySelector(`#grupo-${campo} .form-input__error`).classList.add('form-input__error-activo')
        campos[campo] = false
    }
}

inputs.forEach((input) => {
    input.addEventListener('keyup', validarForm)
    input.addEventListener('blur', validarForm)
})

form.addEventListener('submit', (e) =>{
    e.preventDefault()

    if(campos.nombre && campos.apellido && campos.ciudad && campos.provincia && campos.url && campos.email){
        form.reset()
        document.querySelector('.form-input__exit').classList.add('form-input__exit-activo')
        setTimeout(()=>{
            document.querySelector('.form-input__exit').classList.remove('form-input__exit-activo')
        }, 3000)
        document.querySelectorAll('.form-group-correcto').forEach((icono)=>{
            icono.classList.remove('form-group-correcto')
        })
    } else {
        document.querySelector('.form-input__mensaje').classList.add('form-input__mensaje-activo')
        setTimeout(()=>{
            document.querySelector('.form-input__mensaje').classList.remove('form-input__mensaje-activo')
        }, 3000)
    }
})

