import { himnos } from "./modules/himnos.js";
import { cargar_himno } from "./modules/cargar_himno.js";
import { cargar_home } from "./modules/cargar_home.js"


document.addEventListener('DOMContentLoaded', () => {
    let color = localStorage.getItem('color')
    if (!color) {
        localStorage.setItem('color', 'indigo')
        color = 'indigo'
    }

    let fontSize = localStorage.getItem('fontSize')
    if (!fontSize) {
        localStorage.setItem('fontSize', 'medium')
        fontSize = 'medium'
    }

    let fontFamily = localStorage.getItem('fontFamily')
    if (!fontFamily) {
        localStorage.setItem('fontFamily', 'sans-serif')
        fontFamily = 'sans-serif'
    }

    let darkMode = localStorage.getItem('darkMode')
    if (!darkMode) {
        localStorage.setItem('darkMode', 'true')
        darkMode = 'true'
    }

    body.classList.add(fontFamily)
    body.classList.add(fontSize)
    if (darkMode == 'true') {
        body.classList.add('dark')
    }


    let himnoURL = window.location.hash.replace('#', '')

    if (himnoURL != '') {
        localStorage.setItem('himnoActual', himnoURL)
    } else {
        localStorage.removeItem('himnoActual')
    }

    window.addEventListener('hashchange', (e) => {
        himnoURL = window.location.hash.replace('#', '')
        if (himnoURL) {
            cargar_himno(himnos[himnoURL])
        } else {
            cargar_home()
        }
    }, false);


    const himnoActual = localStorage.getItem('himnoActual')

    if (himnoActual) {
        cargar_himno(himnos[himnoActual])
    } else {
        cargar_home()
    }
})