let himnos = [];

let color = localStorage.getItem('color')
if (!color) {
  localStorage.setItem('color', 'indigo')
  color = 'indigo'
}

let darkMode = localStorage.getItem('darkMode')

export let favoritos = localStorage.getItem('favoritos')
if (!favoritos) {
  favoritos = []
} else {
  favoritos = favoritos.split(',').sort()
}

export const cargar_home = async () => {
  const response = await fetch('./himnos.json');
  himnos = await response.json();
  body.innerHTML = ''

    localStorage.removeItem('himnoActual')

    const header = document.createElement('header')

    const navbar = `
    <div class="navbar-fixed">
  <nav>
    <div class="nav-wrapper ${color}">
      <form id="searchForm">
        <div class="input-field">
          <input id="search" type="search" required>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
  </div>
`

    header.innerHTML = navbar

    body.prepend(header)
    const main = document.createElement('main')
    main.classList.add('container')

    let btnFloating = crearElemento('div', `
    <a class="btn-floating btn-large amber waves-effect modal-trigger" href="#favoritosModal">
    <i class="large material-icons">star</i>
    </a>
    `, ['fixed-action-btn'])
    let btns = crearElemento('p', '', [])

    let listaFavoritos = crearElemento('ul', '', ['collection'])

  let favoritosOrdenados = favoritos.map((favorito)=>{
    return parseInt(favorito)
  })

    favoritosOrdenados.sort((a,b)=>a-b).forEach(favorito => {
      let himno = himnos.find(h => h && h.numero === favorito);
      if (himno) {
          let li = crearElemento('a', `${himno.numero}. ${himno.titulo}`, ['collection-item', color, 'white-text', 'modal-close'])
          li.href = `#${himno.numero}`
          listaFavoritos.appendChild(li)
      }
    })
    
    let favoritosModal = crearElemento('aside', `<div class="modal-content">
    <h4>Favoritos</h4>
    ${listaFavoritos.outerHTML}
    </div>
    <div class="modal-footer">
    <a href="#" class="modal-close waves-effect waves-${color} btn-flat">Cerrar</a>
    </div>`, ['modal',  'modal-fixed-footer'])
    favoritosModal.id = 'favoritosModal'

    body.appendChild(favoritosModal)
    
    let btnSettings = crearElemento('a', `<i class="material-icons">settings</i>`, ['btn', 'right', 'white-text', 'waves-effect', color, 'modal-trigger'])
    btnSettings.href = "#ajustes"
    
    let settingsModal = crearElemento('aside', `<div class="modal-content">
    <h4>Ajustes</h4>
    <form id="ajustesForm">
    <h5>Color de Enfasis</h5>
    <div class="input-field col s12 white">
    <select id="cColorEnfasis">
      <option value="" disabled selected>&nbspEscoge un color</option>
      <option value="red" data-icon='./assets/color-circles/red.svg'>&nbspRojo</option>
      <option value="pink" data-icon='./assets/color-circles/pink.svg'>&nbspRosado</option>
      <option value="purple" data-icon='./assets/color-circles/purple.svg'>&nbspPúrpura</option>
      <option value="deep-purple" data-icon='./assets/color-circles/deep-purple.svg'>&nbspPúrpura Intenso</option>
      <option value="indigo" data-icon='./assets/color-circles/indigo.svg'>&nbspÍndigo</option>
      <option value="blue" data-icon='./assets/color-circles/blue.svg'>&nbspAzul</option>
      <option value="light-blue" data-icon='./assets/color-circles/light-blue.svg'>&nbspAzul claro</option>
      <option value="cyan" data-icon='./assets/color-circles/cyan.svg'>&nbspCian</option>
      <option value="teal" data-icon='./assets/color-circles/teal.svg'>&nbspVerde Azulado</option>
      <option value="green" data-icon='./assets/color-circles/green.svg'>&nbspVerde</option>
      <option value="light-green" data-icon='./assets/color-circles/light-green.svg'>&nbspVerde Claro</option>
      <option value="lime" data-icon='./assets/color-circles/lime.svg'>&nbspLima</option>
      <option value="yellow" data-icon='./assets/color-circles/yellow.svg'>&nbspAmarillo</option>
      <option value="amber" data-icon='./assets/color-circles/amber.svg'>&nbspÁmbar</option>
      <option value="orange" data-icon='./assets/color-circles/orange.svg'>&nbspNaranja</option>
      <option value="deep-orange" data-icon='./assets/color-circles/deep-orange.svg'>&nbspNaranja Intenso</option>
      <option value="brown" data-icon='./assets/color-circles/brown.svg'>&nbspMarrón</option>
      <option value="grey" data-icon='./assets/color-circles/grey.svg'>&nbspGris</option>
      <option value="blue-grey" data-icon='./assets/color-circles/blue-grey.svg'>&nbspGris Azulado</option>
    </select>
  </div>
    <h5>Modo oscuro</h5>
    <div class="switch">
    <label>
      Claro
      <input type="checkbox" id="cModoOscuro">
      <span class="lever"></span>
      Oscuro
    </label>
  </div>
    <p class="range-field">
    <h5>Tamaño de letra</h5>
    <input type="range" id="cFontSize" min="0" max="4" value="${localStorage.getItem('fontSizeValue')}"/>
    <span>Chico</span>      <span class="right">Grande</span>
    </p>
    <div>
    <h5>Tipo de letra</h5>
    <p class="center">
    <a class="btn" id="btnSerif" style="font-family: serif; font-size: 1.3em; margin: .1em">Serif</a>
    <a class="btn" id="btnSans" style="font-family: sans-serif; font-size: 1.3em; margin: .1em">Sans-Serif</a>
    <a class="btn" id="btnMono" style="font-family: monospace; font-size: 1.3em; margin: .1em">Monospace</a>
    </p>
    </div>
  </form>
    </div>
    <div class="modal-footer">
    <a href="#" id="cerrarModal" class="modal-close waves-effect waves-${color} btn-flat">Cerrar</a>
    </div>`, ['modal',  'modal-fixed-footer'])
    settingsModal.id = 'ajustes'
    
    body.appendChild(settingsModal)
    let btnInfo = crearElemento('a', `<i class="material-icons">info</i>`, ['btn', 'white-text', 'waves-effect', color, 'modal-trigger'])
    btnInfo.href = "#info"

    let infoModal = crearElemento('aside', `<div class="modal-content">
        <h4>Información</h4>
          <p>App creada para uso gratuito. Este proyecto es independiente y no cuenta con ningún subsidio por parte de ninguna iglesia. Si deseas apoyar al mantenimiento del proyecto con una donación puedes ponerte en contacto con el desarrollador.</p>
          <a href="https://www.mercadopago.com.mx/subscriptions/checkout?preapproval_plan_id=2c93808480710707018077566dd00124" target="_blank" class="btn blue">Donar mensualmente</a>
          <h5>Contacto</h5>
          <p>Si tienes alguna sugerencia o algo no funciona bien, puedes ponerte en contacto conmigo y en medida de lo posible atenderé tu solicitud.</p>
          <a href="https://wa.me/529997700066" target="_blank" class="btn green">WhatsApp</a>
          <a href="https://www.facebook.com/himnariop" target="_blank" class="btn blue">Facebook</a>
          <p class="center">Desarrollada por DevZafiro <br>         
          <img class="responsive-img" src="./assets/devZafiro.png" width="128">
          </p>
      </div>
      <div class="modal-footer">
        <a href="#" class="modal-close waves-effect waves-${color} btn-flat">Cerrar</a>
      </div>`, ['modal',  'modal-fixed-footer'])
    infoModal.id = 'info'

    
    body.appendChild(infoModal)

    btns.appendChild(btnInfo)
    btns.appendChild(btnSettings)

    main.appendChild(btns)
    main.appendChild(btnFloating)

    main.appendChild(crearElemento('h2', `Sólo a Dios la Gloria`, ['titulo', 'center']))
    main.appendChild(crearElemento('h3', `Himnario Evangelico Presbiteriano`, ['subtitulo', 'center']))


    main.appendChild(crearElemento('h2', `1. Glorificar a Dios`, ['titulo']))
    main.appendChild(crearCollapsible('1.1 Glorificar a Dios', 1, 8))
    main.appendChild(crearCollapsible('1.2 La biblia... nuestra regla', 9, 21))
    main.appendChild(crearElemento('h3', `1.3 Dios, su majestad y gloria`, ['subtitulo']))
    main.appendChild(crearCollapsible('La Trinidad', 21, 32))
    main.appendChild(crearCollapsible('El Padre, sus perfecciones', 33, 59))
    main.appendChild(crearCollapsible('Sus decretos', 60, 73))
    main.appendChild(crearCollapsible('Sus obras', 74, 88))
    main.appendChild(crearCollapsible('1.4 El hombre, su condición', 89, 105))
    main.appendChild(crearElemento('h3', `1.5 Jesucristo`, ['subtitulo']))
    main.appendChild(crearCollapsible('Su venida', 106, 140))
    main.appendChild(crearElemento('h3', `Su ministerio mediatorias`, ['subtitulo']))
    main.appendChild(crearCollapsible('Profeta', 141, 152))
    main.appendChild(crearCollapsible('Sacerdote', 153, 173))
    main.appendChild(crearCollapsible('Rey', 174, 236))
    main.appendChild(crearCollapsible('Su gracia y redención', 237, 260))
    main.appendChild(crearElemento('h2', `2. Gozar de Él para siempre`, ['titulo']))
    main.appendChild(crearCollapsible('2.1 El Espíritu Santo', 261, 276))
    main.appendChild(crearElemento('h3', `2.2 La vida en Cristo`, ['subtitulo']))
    main.appendChild(crearElemento('h3', `- Nacer en Cristo`, ['subtitulo']))
    main.appendChild(crearCollapsible('Conversión y adopción', 277, 296))
    main.appendChild(crearCollapsible('Bautismo y profesión de fe', 297, 312))
    main.appendChild(crearElemento('h3', `- Crecer en Cristo`, ['subtitulo']))
    main.appendChild(crearCollapsible('En fe y en amor', 313, 332))
    main.appendChild(crearCollapsible('En santidad', 333, 345))
    main.appendChild(crearCollapsible('En sabiduría: conocimiento de Dios', 346, 362))
    main.appendChild(crearCollapsible('En poder: pruebas, vida cristiana', 363, 382))
    main.appendChild(crearCollapsible('En gozo: gratitud', 383, 398))
    main.appendChild(crearElemento('h3', `2.3 La comunión con Cristo`, ['subtitulo']))
    main.appendChild(crearElemento('h3', `- La iglesia`, ['subtitulo']))
    main.appendChild(crearCollapsible('Su unidad', 399, 407))
    main.appendChild(crearCollapsible('Su culto: apertura, bienvenida, doxologías, ofrendas y diezmos, clausura y bendición', 408, 455))
    main.appendChild(crearCollapsible('Su eucaristía: Santa Cena', 456, 465))
    main.appendChild(crearCollapsible('Su renovación: avivamiento', 466, 474))
    main.appendChild(crearCollapsible('Sus organizaciones y celebraciones: dedicación de templo y aniversario, reuniones, jóvenes, femeniles, día del pastor, año nuevo', 475, 509))
    main.appendChild(crearCollapsible('- La oración', 510, 525))
    main.appendChild(crearCollapsible('- La consagración', 526, 545))
    main.appendChild(crearElemento('h3', `2.4 El servicio para Cristo`, ['subtitulo']))
    main.appendChild(crearElemento('h3', `- En el hogar`, ['subtitulo']))
    main.appendChild(crearCollapsible('Su formación: matrimonio', 546, 552))
    main.appendChild(crearCollapsible('Sus bendiciones: día de las madres y de los padres, bautismo y presentación de niños, cumpleaños', 553, 574))
    main.appendChild(crearCollapsible('Sus actividades: culto familiar, alimentos', 575, 583))
    main.appendChild(crearElemento('h3', `- En la sociedad`, ['subtitulo']))
    main.appendChild(crearCollapsible('Evangelismo', 584, 599))
    main.appendChild(crearCollapsible('Misiones', 600, 621))
    main.appendChild(crearCollapsible('Patriotistmo y responsabilidad social', 622, 638))
    main.appendChild(crearElemento('h3', `- En gloria`, ['subtitulo']))
    main.appendChild(crearCollapsible('Patria celestial', 639, 655))
    main.appendChild(crearElemento('h2', `3. Salmos`, ['titulo']))
    main.appendChild(crearCollapsible('Salmos', 656, 706))
    main.appendChild(crearElemento('h2', `&nbsp`, ['titulo']))


    const listaHimnos = await crearListaHimnos()

    body.appendChild(listaHimnos)
    body.appendChild(main)

    cColorEnfasis.value = localStorage.getItem('color')
    darkMode = localStorage.getItem('darkMode')
    if (darkMode == "true"){
      cModoOscuro.checked = true
    }


    let fontFamily = localStorage.getItem('fontFamily')
    switch (fontFamily) {
      case 'serif': btnSerif.classList.add(color)
      break;
      case 'sans-serif': btnSans.classList.add(color)
      break;
      case 'monospace': btnMono.classList.add(color)
      break;
    }

    M.AutoInit();

    search.addEventListener('keyup', (e) => {
      if (search.value.length > 3){
        const himnos = listaHimnos.querySelectorAll('.collection-item')
        listaHimnos.classList.remove('hide')
        const busqueda = search.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        himnos.forEach((himno) => {
          const nombreHimno = himno.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          himno.classList.add('hide')
          if (nombreHimno.indexOf(busqueda) != -1){
            himno.classList.remove('hide')
          }
        })
      } else if (e.key != 'Enter'){
        listaHimnos.classList.add('hide')
      }
    })

    search.addEventListener('blur', (e) => {
      search.value = ''
      setTimeout(()=>{
        const himnos = listaHimnos.querySelectorAll('.collection-item')
        himnos.forEach((himno) => {
            himno.classList.add('hide')
        })
      }, 200)
    })

    searchForm.addEventListener('submit', (e)=>{
      e.preventDefault()
      console.log(parseInt(search.value))
      let numero = parseInt(search.value)
      if (numero > 0 && numero < 707){
        location.href = `#${numero}`
      } else {
        const himnos = listaHimnos.querySelectorAll('.collection-item')
        listaHimnos.classList.remove('hide')
        const busqueda = search.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        himnos.forEach((himno) => {
          const nombreHimno = himno.innerText.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          himno.classList.add('hide')
          if (nombreHimno.indexOf(busqueda) != -1){
            himno.classList.remove('hide')
          }
        })
      }

    })

    ajustesForm.addEventListener('change', (e)=>{
      localStorage.setItem('color', ajustesForm['cColorEnfasis'].value)
      
      let prevColor = color;

      color = ajustesForm['cColorEnfasis'].value
      
      
      localStorage.setItem('darkMode', ajustesForm['cModoOscuro'].checked)

      darkMode = ajustesForm['cModoOscuro'].checked
      
      body.removeAttribute('class')
      
      if(ajustesForm['cModoOscuro'].checked){
        body.classList.add('dark')
      } 

      let fontSize = 'medium'
      switch (ajustesForm['cFontSize'].value){
        case '0': 
          fontSize = 'small'
        break
        case '1': 
          fontSize = 'medium'
        break
        case '2': 
          fontSize = 'large'
          break
        case '3': 
          fontSize = 'x-large'
        break
        case '4': 
        fontSize = 'xx-large'
        break
      }
      
      body.classList.add(fontSize)
      
      localStorage.setItem('fontSize', fontSize)
      localStorage.setItem('fontSizeValue', ajustesForm['cFontSize'].value)
      prevColor != ajustesForm['cColorEnfasis'].value ? cerrarModal.click() : '';
      prevColor != ajustesForm['cColorEnfasis'].value ? cargar_home() : '';
    })

    btnSerif.addEventListener('click', (e) => {
      e.preventDefault()
      localStorage.setItem('fontFamily', 'serif')
      body.classList.add('serif')
      body.classList.remove('sans-serif')
      body.classList.remove('monospace')
      btnSerif.classList.add(color)
      btnSans.classList.remove(color)
      btnMono.classList.remove(color)
    })

    btnSans.addEventListener('click', (e) => {
      e.preventDefault()
      localStorage.setItem('fontFamily', 'sans-serif')
      body.classList.remove('serif')
      body.classList.add('sans-serif')
      body.classList.remove('monospace')
      btnSerif.classList.remove(color)
      btnSans.classList.add(color)
      btnMono.classList.remove(color)
    })

    btnMono.addEventListener('click', (e) => {
      e.preventDefault()
      localStorage.setItem('fontFamily', 'monospace')
      body.classList.remove('serif')
      body.classList.remove('sans-serif')
      body.classList.add('monospace')
      btnSerif.classList.remove(color)
      btnSans.classList.add(color)
      btnMono.classList.add(color)
    })
}

const crearCollapsible = (titulo, inicio, fin) => {
    const collapsible = document.createElement('ul')
    const li = document.createElement('li')
    collapsible.classList.add('collapsible')
    collapsible.classList.add(color)
    collapsible.classList.add('darken-3')
    collapsible.classList.add('white-text')
    const collapsibleHeader = document.createElement('div')
    collapsibleHeader.classList.add('collapsible-header')
    collapsibleHeader.classList.add(color)
    collapsibleHeader.style = "justify-content: space-between;"
    collapsibleHeader.innerHTML = `
    <span>${titulo}</span><span>${inicio}&nbsp-&nbsp${fin}</span>
    `
    const collapsibleBody = document.createElement('div')
    collapsibleBody.classList.add('collapsible-body')
    let lista = ''
    for (let i = inicio; i <= fin; i++){
        let himno = himnos.find(h => h && h.numero === i);
        if (himno){
            lista += `<a href="#${himno.numero}" class="collection-item ${color} white-text darken-3">${himno.numero}. ${himno.titulo}</a>`
        }
    }
    collapsibleBody.innerHTML = `<div class="collection">${lista}</div>`
    li.appendChild(collapsibleHeader)
    li.appendChild(collapsibleBody)
    collapsible.appendChild(li)
    return collapsible
}

const crearElemento = (tipo, html, clases) => {
    const elem = document.createElement(tipo)
    elem.innerHTML = html
    if (clases){
        clases.forEach( clase => {
            elem.classList.add(clase)
        })
    }
    return elem
}

const crearListaHimnos = async () => {
  const response = await fetch('./himnos.json');
  himnos = await response.json();
  const container = crearElemento('ul', '', ['lista-himnos', 'collection'])
  let lista = ''
  for (let i = 1; i <= 706; i++){
    let himno = himnos.find(h => h && h.numero === i);
    if (himno){
        lista += `<a href="#${himno.numero}" class="collection-item ${color} white-text darken-3 hide">${himno.numero}. ${himno.titulo}</a>`
    }
  }
  container.innerHTML = lista
  return container
}