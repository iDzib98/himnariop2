import './reveal.js' //Para pruebas en src
//import Reveal from '/node_modules/reveal.js'; //Cambiarlo en dist

export const cargar_himno = (himno) => {
    let color = localStorage.getItem('color')
    body.innerHTML = ''

    localStorage.setItem('himnoActual', himno.numero)

    const header = document.createElement('header')

    const navbar = `
    <div class="navbar-fixed">
    <nav>
      <div class="nav-wrapper ${color}">
        <ul class="left" style="max-weight: calc(100% - 150px)">
            <li><a href="#" id="home"><i class="material-icons">home</i></a></li>
            <li><a href="#${himno.numero}" id="refresh" class="hide"><i class="material-icons">close</i></a></li>
        </ul>
        <ul class="right">
          <li ${himno.numero-1 == 0 ? 'class="hide"': ''}><a href="#${himno.numero-1}"><i class="material-icons">chevron_left</i></a></li>
          <li><strong>${himno.numero}</strong></li>
          <li ${himno.numero+1 > 706 ? 'class="hide"': ''}><a href="#${himno.numero+1}"><i class="material-icons">chevron_right</i></a></li>
        </ul>
      </div>
    </nav>
  </div>`

  
  header.innerHTML = navbar
  
  body.appendChild(header)

    let main = document.createElement('main')

    main.classList.add('container')

    let titulo = document.createElement('h2')

    titulo.classList.add('titulo_himno')

    let botones = document.createElement('div')

    botones.classList.add('center')

    botones.innerHTML = `
    <a class="btn-floating deep-orange waves-effect" id="btnTv"><i class="material-icons">tv</i></a>
    &nbsp
    <a class="btn-floating green waves-effect" id="btnPartitura"><i class="material-icons">queue_music</i></a>
    &nbsp
    <a class="btn-floating blue waves-effect" onclick="window.print()"><i class="material-icons">print</i></a>
    `

    let intro = document.createElement('p')

    let referencias = document.createElement('ul')

    referencias.classList.add('referencias')

    let btnFav = document.createElement('span')

    btnFav.innerHTML = `<a class="btn-floating grey waves-effect right"><i class="material-icons">star</i></a>`

    titulo.innerText = `Himno ${himno.numero}. ${himno.titulo}`



    intro.innerText = `${himno.intro}`

    himno.referencias.forEach(referencia => {
        let li = document.createElement('li')
        li.innerText = `${referencia}`
        referencias.appendChild(li)
    });
    main.appendChild(btnFav)
    main.appendChild(titulo)
    main.appendChild(botones)
    main.appendChild(intro)
    main.appendChild(referencias)

    himno.versos.forEach(verso => {
        let nombre = document.createElement('h3')
        nombre.classList.add(`${color}-text`)
        nombre.classList.add('center')
        nombre.classList.add('titulo_verso')
        nombre.innerText = `${verso.nombre}`
        main.appendChild(nombre)
        let ul = document.createElement('ul')
        ul.classList.add('center')
        verso.lineas.forEach(linea => {
            let li = document.createElement('li')
            li.classList.add('linea-verso')
            li.innerText = linea
            ul.appendChild(li)
        })
        main.appendChild(ul)
    })

    let listaAutores = document.createElement('ul')

    himno.autores.forEach(autor => {
        let li = document.createElement('li')
        li.innerText = autor
        listaAutores.appendChild(li)
    })

    main.appendChild(listaAutores)

    let reproductor = document.createElement('div')

    reproductor.innerHTML = `
    <audio id="player" src="https://a16016344.github.io/himnariop/himno/mp3/${himno.numero.toString().padStart(3, '0')}.mp3" type="audio/mp3"></audio>
    <div class="fixed-action-btn">
  <button onclick="player.play(); btnPlay.classList.add('pulse')" class="btn-floating btn-large green" id="btnPlay">
    <i class="large material-icons">play_arrow</i>
  </button>
  <ul>
  <li><button class="btn-floating red darken-1 waves-effect" onclick="document.getElementById('player').pause(); player.currentTime = 0; btnPlay.classList.remove('pulse')"><i class="material-icons">stop</i></button></li>
    <li><button class="btn-floating blue waves-effect" onclick="player.pause(); btnPlay.classList.remove('pulse')"><i class="material-icons">pause</i></button></li>
  </ul>
</div>`

    main.appendChild(reproductor)

    body.appendChild(main)

    window.scrollTo(0, 0);

    btnPartitura.addEventListener('click', () => {
        refresh.classList.remove('hide')
        home.classList.add('hide')
        main.classList.remove('container')
        main.style = `height: calc(100vh - 64px); margin: 0; padding: 0; overflow: hidden;`
        main.innerHTML = `
        <iframe style="margin: 0; padding: 0;" src="https://docs.google.com/viewer?url=https://ipuertadesalvacion.com/HimnarioNotasPDF/${himno.numero}.pdf&amp;embedded=true" width="100%" height="100%"></iframe>
        `
    })

    btnTv.addEventListener('click', () => {
        refresh.classList.remove('hide')
        home.classList.add('hide')
        let theme
        if (localStorage.getItem('darkMode') == 'true'){
            theme = 'black'
        } else {
            theme = 'white'
        }
        main.classList.remove('container')
        main.style = `height: calc(100vh - 64px);`
        main.innerHTML = `
          <link rel="stylesheet" href="./styles/revealjs/${theme}.css">

          <div class="reveal deck1">
            <div class="slides" id="slides">
            </div>
          </div>
        `
        let firstSlide = document.createElement('section')
        firstSlide.innerHTML = `<div>
        <h1>Himno ${himno.numero}. ${himno.titulo}</h1>
        <p style="width: 100%; text-align: left !important;">${himno.intro}</p>
        <ul style="width: 100%; text-align: right !important; list-style-type: none;">${referencias.innerHTML}</ul>
        </div>
        `
        slides.appendChild(firstSlide)

        himno.versos.forEach(verso => {
          let slide = document.createElement('section')
          let nombre = document.createElement('h3')
          nombre.classList.add(`${color}-text`)
          nombre.classList.add('center')
          nombre.classList.add('titulo_verso')
          nombre.innerText = `${verso.nombre}`
          slide.appendChild(nombre)
          let ul = document.createElement('ul')
          ul.classList.add('center')
          verso.lineas.forEach(linea => {
              let li = document.createElement('li')
              li.classList.add('linea-verso')
              li.innerText = linea
              li.classList.add('center')
              ul.appendChild(li)
          })
          slide.appendChild(ul)
          slides.appendChild(slide)
      })

        let lastSlide = document.createElement('section')
        lastSlide.innerHTML = `<div>
        <ul>${listaAutores.innerHTML}</ul>
        <br><br>
        <small>Presiones [Esc] dos veces para salir.</small>
        </div>
        `

        slides.appendChild(lastSlide)

        let deck1 = new Reveal( document.querySelector( '.deck1' ), {
          embedded: true,
        } );
        deck1.initialize();

        setTimeout(()=>{
            deck1.slide(1);
            setTimeout(()=>{
                deck1.slide(0);
                launchFullScreen(main)
            }, 0)
        }, 0)

        function launchFullScreen(element) {
            if(element.requestFullScreen) {
              element.requestFullScreen();
            } else if(element.mozRequestFullScreen) {
              element.mozRequestFullScreen();
            } else if(element.webkitRequestFullScreen) {
              element.webkitRequestFullScreen();
            }
          }
    })

    refresh.addEventListener('click', () => {cargar_himno(himno)})
    M.AutoInit();

}