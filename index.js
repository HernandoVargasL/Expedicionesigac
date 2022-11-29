var esri;
var map;
var cofanLayer;

var homeBtn;
var popup;
var popup_init = null;
var popup_links = true;

var datosCofan;
var callList = false;

var extent = {
    "xmin": -8556103.703298075,
    "ymin": 55035.7288282962,
    "xmax": -8548073.038013654,
    "ymax": 59526.40424016861,
    "spatialReference": {
        "wkid": 102100,
        "latestWkid": 3857
    }
}

$(".content").addClass("unexpanded")

if (document.querySelector(".navbarigac")) {
    const navbarigac = document.querySelector(".navbarigac");
    navbarigac.innerHTML = `
    <div class="logos">
        <div class="navbar-brand-igac">
            <a href='https://www.igac.gov.co' target='_blank'><img alt='Logo IGAC' src='images/logo-igac.png'/></a>
        </div>
        <div class="logoigac">
            <a href="index.html"><img src="images/logo.svg" alt="Expediciones Igac"></a>
        </div>
    </div>
    <button class='nav-bar-toggle-igac'>
        <div class='icon-bar'></div>
        <div class='icon-bar'></div>
        <div class='icon-bar'></div>
    </button>
    <div class='navbarnavigac'>
        <li>
            <a class='inicio' href='index.html'>Pueblo Cofan</a>
        </li>
        <li>
            <a class='dropdownToggle' href='#'>Acerca de</a>
            <ul class='dropDown'>
            </ul>
        </li>
    </div>
        `
    // <li><a href='/preguntas_frecuentes/index.html'>&iquest;Por qu&eacute; tener un &uacute;nico origen?</a></li>
    // <li><a href='/preguntas_frecuentes/cual-es-la-proyeccion.html'>&iquest;Cu&aacute;l es la proyecci&oacute;n?</a></li>
    // <li><a href='/preguntas_frecuentes/cuales-son-sus-beneficios.html'>&iquest;Cu&aacute;les son sus beneficios?</a></li>
    // <li><a href='/preguntas_frecuentes/quienes-deben-adoptarlo.html'>&iquest;Qui&eacute;nes deben adoptarlo?</a></li>
    // <li><a href='/preguntas_frecuentes/otras-preguntas-frecuentes.html'>Otras preguntas frecuentes</a></li>
};

if (document.querySelector(".nav-underline")) {
    const navUnderline = document.querySelector(".nav-underline");
    navUnderline.innerHTML = `
    <a class='nav-link geodesica' href='/redes/red_geodesica.html'>Red Geod&eacute;sica GNSS</a>
    <a class='nav-link gavimetrica' href='/redes/red_gavimetrica.html'>Red Gravim&eacute;trica</a>
    <a class='nav-link geomagnetica' href='/redes/red_geomagnetica.html'>Red Geomagn&eacute;tica</a>
    <a class='nav-link d-none' href='/redes/red_gnss.html'>Red GNSS Magna Sirgas</a>
    <a class='nav-link d-none' href='/redes/red_vertices_nivelacion.html'>Red de V&eacute;rtices y Redes de Nivelaci&oacute;n</a>
    <a class='nav-link tablero' href='/redes/tablero_control.html'>Tablero de control</a>
    `
};

if (document.querySelector(".nav-underline.navHerramientas")) {
    const navUnderline = document.querySelector(".nav-underline");
    navUnderline.innerHTML = `
    <a class='servicios nav-link' href='servicios.html'>Servicios</a>
    <a class='aplicaciones nav-link' href='aplicaciones_herramientas.html'>Aplicaciones y Herramientas</a>
    <a class='modelos nav-link' href='modelos.html'>Modelos</a>
    <a class='datos nav-link' href='datos.html'>Datos</a>
    <a class='norma nav-link' href='normatividad.html'>Normatividad</a>
    <a class='guias nav-link' href='guias_manuales.html'>Gu&iacute;as y manuales</a>
    `
};

if (document.querySelector(".footer")) {
    const footerIgac = document.querySelector(".footer");
    footerIgac.innerHTML = `
    <div class='footer-container container'>
        <div class='row-footer'>
            <div class='content-footer'>
                <div class='title'>
                    INSTITUTO GEOGRÁFICO AGUSTÍN CODAZZI
                </div>
                <div class='sub-title'>
                    Oficinas y horarios
                </div>
                <ul>
                    <li>
                        <a class='underline-none' href='tel:+6013773214'>Conmutador (1) 3773214</a>
                    </li>
                    <li>
                        E-mail: <a class='link' href='mailto:contactenos@igac.gov.co' target='_blank'>contactenos@igac.gov.co</a>
                    </li>
                    <li>
                        <a class='link' href='https://www.igac.gov.co/es/contenido/notificaciones-judiciales' target='_blank'>Notificaciones judiciales</a>
                    </li>
                    <li>
                        Carrera 30 Nº 48-51, Bogotá
                    </li>
                </ul>
                <div class='sub-title'>
                    Contáctenos
                </div>
                <ul>
                    <li>Abierto de lunes a viernes de 7:30 a.m. a 3:45 p.m. Jornada continua.</li>
                    <li>Sede Central y territorial Cundinamarca</li>
                    <li>NIT: 8999990049</li>
                    <li><a class="link" href='https://forms.office.com/Pages/ResponsePage.aspx?id=mv5J7epu5ke_Uu6ey12oBxIGmwVNvQBMvgfd4pJEsvJUOUVXTzVQOE1ESlZZRVNZQ1RMVjYzWk8yOS4u' target='_blank'>Encuesta de satisfacción y percepción portal web</a></li>
                </ul>
            </div>
            <div class='content-footer cla-a'>
                <div class='contents'>
                    <div class='sub-title'>
                        Nuestras plataformas
                    </div>
                    <a href='https://www.colombiaot.gov.co/'>Colombia OT</a>
                    <a href='https://www.colombiaenmapas.gov.co/'>Colombia en Mapas</a>
                    <a href='https://diccionario.igac.gov.co/'>Diccionario Geogr&aacute;fico</a>                
                </div>
            </div>
            <div class='content-footer cla-a cla-b'>
                <div class='conatin'>
                    <div class='sub-title'>
                        Síguenos
                    </div>
                    <a href='https://co.linkedin.com/company/igac'><i class='fab fa-linkedin-in'></i><span>LinkedIn</span></a>
                    <a href='https://es-la.facebook.com/IgacColombia/'><i class='fab fa-facebook-f'></i><span>Facebook</span></a>
                    <a href='https://twitter.com/igacColombia?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor'><i class='fab fa-twitter'></i><span>Twitter</span></a>
                    <a href='https://www.instagram.com/igaccolombia/'><i class='fab fa-instagram'></i><span>Instagram</span></a>
                </div>

            </div>
        </div>        
    </div>
    `
};

if (document.querySelector(".nav-bar-toggle-igac")) {
    const dropDownButon = document.querySelector(".nav-bar-toggle-igac");
    const dropDownMenu = document.querySelector(".navbarnavigac");
    const dropDowntoggle = document.querySelector(".dropdownToggle");
    const dropDown = document.querySelector(".dropDown");
    dropDownButon.addEventListener('click', function handleClick(event) {
        dropDownMenu.classList.toggle('expandMenu');
    });
    dropDowntoggle.addEventListener('click', function handleClick(event) {
        dropDown.classList.toggle('expandMenuDrop');
    });
}

/*--- mapa ---*/

$(document).ready(function () {
    initMap();
});

function initMap() {
    require([
        "esri/map",

        "esri/graphic",
        "esri/graphicsUtils",
        "esri/geometry/Extent",

        "esri/dijit/HomeButton",
        "esri/dijit/Popup",
        "esri/dijit/PopupTemplate",

        "dojo/dom-construct",
        "dojo/dom", "dojo/on", "dojo/domReady!"
    ], function (
        __Map,
        __Graphic,
        __graphicsUtils,
        __Extent,
        __HomeButton,
        __Popup,
        __PopupTemplate,
        __domConstruct,
        __dom,
        __on
    ) {
        esri.Map = __Map;

        esri.Graphic = __Graphic;
        esri.graphicsUtils = __graphicsUtils;
        esri.Extent = __Extent;

        esri.HomeButton = __HomeButton;
        esri.Popup = __Popup;
        esri.PopupTemplate = __PopupTemplate;

        esri.domConstruct = __domConstruct;
        esri.dom = __dom;
        esri.on = __on;

        initMap2();
    });
}

function initMap2() {
    $.ajax({
        url: "data/cofan.json",
        type: 'GET',
        success: function (data) {
            datosCofan = data;
            mapCofan();
            listCofan();
        },
        timeout: 20000,
        error: function (err) {

        }
    });
}

function mapCofan() {

    popup = new esri.Popup({
        titleInBody: false
    }, esri.domConstruct.create("div"));


    popup.on("show", function () {
        popup.pagingInfo = true;
        popup.pagingControls = true;

        $(".titleButton.maximize").addClass("hidden")
        $("a.action.zoomTo > span").html("Acercar");

        if (popup_links) {
            popup_links = false;
            $(".actionList").append("<a href='#' class='action vermas-link' onclick='gotoVerMas();'>&nbsp;Ver más...</a>");
        }

        if (!callList) {
            let ID = popup.getSelectedFeature().attributes.ID;
            activateItemList(ID);
        }
        callList = false;
    });

    cofanLayer = new esri.layers.GraphicsLayer();
    cofanLayer.on("click", function(){
        popup.hide();
    })

    for (let idx = 0; idx < datosCofan.length; idx++) {
        const dato = datosCofan[idx];

        const datoPoint = {
            "geometry": {
                "x": dato.Objeto_Geografico.Longitud,
                "y": dato.Objeto_Geografico.Latitud,
                "spatialReference": {
                    "wkid": 4326
                }
            },

            "attributes": {
                "ID": dato.ID,
                "ID_Nombre_Geografico": dato.ID_Nombre_Geografico,
                "Nombre_COF": dato.Nombre_COF,
                "Nombre_ESP": dato.Nombre_ESP,
            },

            "symbol": {
                "angle": 0,
                "xoffset": 0,
                "yoffset": 0,
                "type": "esriPMS",
                "url": "images/numeros/" + (idx + 1) + ".png",
                "width": 30,
                "height": 30
            },

            "infoTemplate": {
                "title": ["<div class='d-flex align-items-center'>" + "<div class='identificador'>" + dato.ID + "</div>" + dato.Nombre_ESP + "</div>"],
                "content": "${Nombre_COF}" + "<img class='mt-2' src='./images/assets/drone2.jpg' alt=''>" 
            }
        };
        

        cofanLayer.add(new esri.Graphic(datoPoint));
    }


    map = new esri.Map("viewDiv", {
        basemap: "topo-vector",
        extent: new esri.Extent(extent),
        infoWindow: popup,
        minZoom: 12
    });
    map.addLayer(cofanLayer);

    homeBtn = new esri.HomeButton({
        map: map
    }, "HomeButton");
    homeBtn.startup();
    
}

function gotoVerMas() {
    const graphic = popup.getSelectedFeature();

    for (let idx = 0; idx < datosCofan.length; idx++) {
        if (graphic.attributes.ID == datosCofan[idx].ID) {
            const dato = datosCofan[idx];

            $("div#AudioCOFAN").hide();
            $('#iframeYoutubeAudio').removeClass('expand');

            $("div#VideoCOFAN").hide();
            $('#iframeYoutube').removeClass('expand');

            $("div#ID_Cofan > p").html(dato.ID);
            $("div.content__banner__title").html(dato.Nombre_ESP);

            $("#EtnoHistoria_Audio").hide();
            $("#EtnoHistoria_Video").hide();
            $('#EtnoHistoria_Video').removeClass('expand');

            if (dato.Aspectos_Linguisticos.hasOwnProperty("Registro_Audiovisual_Audio")) {
                $("p#AudioCOFAN_Nombre").html(dato.Nombre_COF);


                const audioPlayer = document.querySelector(".audio-player");
                const audio = new Audio();

                audio.src = dato.Aspectos_Linguisticos.Registro_Audiovisual_Audio;
                //credit for song: Adrian kreativaweb@gmail.com

                console.dir(audio);

                audio.addEventListener(
                "loadeddata",
                () => {
                    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
                    audio.duration
                    );
                    audio.volume = .75;
                },
                false
                );

                //click on timeline to skip around
                const timeline = audioPlayer.querySelector(".timeline");
                timeline.addEventListener("click", e => {
                const timelineWidth = window.getComputedStyle(timeline).width;
                const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
                audio.currentTime = timeToSeek;
                }, false);

                //click volume slider to change volume
                const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
                volumeSlider.addEventListener('click', e => {
                const sliderWidth = window.getComputedStyle(volumeSlider).width;
                const newVolume = e.offsetX / parseInt(sliderWidth);
                audio.volume = newVolume;
                audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
                }, false)

                //check audio percentage and update time accordingly
                setInterval(() => {
                const progressBar = audioPlayer.querySelector(".progress");
                progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
                audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
                    audio.currentTime
                );
                }, 500);

                //toggle between playing and pausing on button click
                const playBtn = audioPlayer.querySelector(".controls .toggle-play");
                playBtn.addEventListener(
                "click",
                () => {
                    if (audio.paused) {
                    playBtn.classList.remove("play");
                    playBtn.classList.add("pause");
                    audio.play();
                    } else {
                    playBtn.classList.remove("pause");
                    playBtn.classList.add("play");
                    audio.pause();
                    }
                },
                false
                );

                audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
                const volumeEl = audioPlayer.querySelector(".volume-container .volume");
                audio.muted = !audio.muted;
                if (audio.muted) {
                    volumeEl.classList.remove("icono-volumeMedium");
                    volumeEl.classList.add("icono-volumeMute");
                } else {
                    volumeEl.classList.add("icono-volumeMedium");
                    volumeEl.classList.remove("icono-volumeMute");
                }
                });

                //turn 128 seconds into 2:08
                function getTimeCodeFromNum(num) {
                let seconds = parseInt(num);
                let minutes = parseInt(seconds / 60);
                seconds -= minutes * 60;
                const hours = parseInt(minutes / 60);
                minutes -= hours * 60;

                if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
                return `${String(hours).padStart(2, 0)}:${minutes}:${String(
                    seconds % 60
                ).padStart(2, 0)}`;
                }

                $("div#AudioCOFAN").show();
            }

            if (dato.Aspectos_Linguisticos.hasOwnProperty("Registro_Audiovisual_Video")) {
                $("p#VideoCOFAN_Nombre").html(dato.Nombre_COF);

                let videoURL = dato.Aspectos_Linguisticos.Registro_Audiovisual_Video;
                if (videoURL == undefined || videoURL == null || videoURL == "") {
                    $("#iframeYoutube > iframe").hide();
                    $("#iframeYoutube > video").hide();
                    $("div#VideoCOFAN").hide();
                } else if (videoURL.startsWith("https://")) {
                    $('#iframeYoutube > iframe').prop('src', videoURL)
                    $("#iframeYoutube > iframe").show();
                    $("#iframeYoutube > video").hide();
                    $("div#VideoCOFAN").show();
                } else {
                    $("#iframeYoutube > video").prop('src', videoURL);
                    $("#iframeYoutube > iframe").hide();
                    $("#iframeYoutube > video").show();
                    $("div#VideoCOFAN").show();
                }

            }

            if (dato.Aspectos_Etnicos.hasOwnProperty("Registro_Audiovisual_Audio")) {

                


                const audioPlayer = document.querySelector(".audio-player2");
                const audio = new Audio();

                audio.src = dato.Aspectos_Etnicos.Registro_Audiovisual_Audio;
                //credit for song: Adrian kreativaweb@gmail.com

                console.dir(audio);

                audio.addEventListener(
                "loadeddata",
                () => {
                    audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
                    audio.duration
                    );
                    audio.volume = .75;
                },
                false
                );

                //click on timeline to skip around
                const timeline = audioPlayer.querySelector(".timeline");
                timeline.addEventListener("click", e => {
                const timelineWidth = window.getComputedStyle(timeline).width;
                const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
                audio.currentTime = timeToSeek;
                }, false);

                //click volume slider to change volume
                const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
                volumeSlider.addEventListener('click', e => {
                const sliderWidth = window.getComputedStyle(volumeSlider).width;
                const newVolume = e.offsetX / parseInt(sliderWidth);
                audio.volume = newVolume;
                audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
                }, false)

                //check audio percentage and update time accordingly
                setInterval(() => {
                const progressBar = audioPlayer.querySelector(".progress");
                progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
                audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
                    audio.currentTime
                );
                }, 500);

                //toggle between playing and pausing on button click
                const playBtn = audioPlayer.querySelector(".controls .toggle-play");
                playBtn.addEventListener(
                "click",
                () => {
                    if (audio.paused) {
                    playBtn.classList.remove("play");
                    playBtn.classList.add("pause");
                    audio.play();
                    } else {
                    playBtn.classList.remove("pause");
                    playBtn.classList.add("play");
                    audio.pause();
                    }
                },
                false
                );

                audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
                const volumeEl = audioPlayer.querySelector(".volume-container .volume");
                audio.muted = !audio.muted;
                if (audio.muted) {
                    volumeEl.classList.remove("icono-volumeMedium");
                    volumeEl.classList.add("icono-volumeMute");
                } else {
                    volumeEl.classList.add("icono-volumeMedium");
                    volumeEl.classList.remove("icono-volumeMute");
                }
                });

                //turn 128 seconds into 2:08
                function getTimeCodeFromNum(num) {
                let seconds = parseInt(num);
                let minutes = parseInt(seconds / 60);
                seconds -= minutes * 60;
                const hours = parseInt(minutes / 60);
                minutes -= hours * 60;

                if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
                return `${String(hours).padStart(2, 0)}:${minutes}:${String(
                    seconds % 60
                ).padStart(2, 0)}`;
                }

                $("#EtnoHistoria_Audio").show();
            }

            if (dato.Aspectos_Etnicos.hasOwnProperty("Registro_Audiovisual_Video")) {
                $('#EtnoHistoria_Video > iframe').prop('src', dato.Aspectos_Etnicos.Registro_Audiovisual_Video)
                $("#EtnoHistoria_Video").show();
                $('#EtnoHistoria_Video').addClass('expand');
            }


            $("p#VideoCOFAN_Nombre").html(dato.Nombre_COF);

            $("#EtnoHistoria").html(dato.Aspectos_Etnicos.Etnohistoria);
            $("#GrupoCofan").html(dato.Aspectos_Etnicos.Grupo_Etnohistoria);

            $("#EtnoHistoria_Credito").html(dato.Aspectos_Etnicos.Registro_Audiovisual);

            $("#Significado").html(dato.Aspectos_Linguisticos.Significado_Origen);
            $("#Motivacion").html(dato.Objeto_Geografico.Motivacion);

            $("#Linguistico_Familia").html(dato.Aspectos_Linguisticos.Familia_Linguistica);
            $("#Linguistico_Tipo").html(dato.Objeto_Geografico.Tipo_nombre);
            $("#Linguistico_Lengua").html(dato.Aspectos_Linguisticos.Lengua);
            $("#Linguistico_Categoria").html(dato.Objeto_Geografico.Categoria);
            $("#Linguistico_Subcategoria").html(dato.Objeto_Geografico.Subcategoria);
            $("#Linguistico_Elemento").html(dato.Objeto_Geografico.Elemento_generico);
                        
            $("#ContextoHistorico").html(dato.Aspectos_Etnicos.Contexto);
            $("#OcupacionHistorico").html(dato.Aspectos_Etnicos.Procesos_Ocupacion);

            if (dato.Objeto_Geografico.URL_Fotografia.length) {
                $("#imageLugar").prop("src", dato.Objeto_Geografico.URL_Fotografia[0])
            }
            
            console.log(dato);
            $("#viewDiv").hide();
            $("#includedContent").show();

            var h = $('.etnohistoria .container').height();
            $('.p-relative').height(h - 50 + 'px');
        }
    }
}

function listCofan() {
    const dato = datosCofan;
    let strHTML = "";

    for (var i = 0; i < datosCofan.length; i++) {
        strHTML = strHTML + "<li id='listItem_" + i + "' class='list__item' id-cofan=" + dato[i].ID + ">";
        strHTML = strHTML + "<a>";
        strHTML = strHTML + "<div class='list__item--title'>" + dato[i].Nombre_ESP + "</div>";
        strHTML = strHTML + "<div class='list__item--title-resume'>" + dato[i].Nombre_COF + "</div>";
        strHTML = strHTML + "</a>";
        strHTML = strHTML + "</li>";

    }
    $("#expeditonTermsList ol").html(strHTML);

    /*--- list button---*/
    $(".list__item").css('cursor', 'pointer')
    $(".list__item").click(function () {
        activateItemList(this.attributes["id-cofan"].value);
        $(window).scrollTop(0);
    });
    
    if (window.matchMedia("(max-width: 768px)").matches) {
        $('.list__item').click( function() {
            $("#aside").addClass("collapseAside")
            $(".content").removeClass("unexpanded")
            document.querySelector("#asideToggle img").style.transform = "rotate(180deg)";
        })
    }   

    window.addEventListener('resize', function() {
        if (window.matchMedia("(max-width: 768px)").matches) {
            $('.list__item').click( function() {
                $("#aside").addClass("collapseAside")
                $(".content").removeClass("unexpanded")
                document.querySelector("#asideToggle img").style.transform = "rotate(180deg)";
            })
        } 
    })
    

};

function activateItemList(idCofan) {

    let element = $('*[id-cofan="'+idCofan+'"]');

    popup.hide();
    popup.clearFeatures();

    if ($("#includedContent").is(":visible")) {
        $("#includedContent").hide();
        $("#viewDiv").show();
    }

    for (let idx = 0; idx < cofanLayer.graphics.length; idx++) {
        if (cofanLayer.graphics[idx].attributes.ID == idCofan) {
            const graphic = cofanLayer.graphics[idx];
            callList = true;

            popup.setFeatures([graphic]);
            popup.show(graphic.geometry);

            map.centerAndZoom(graphic.geometry, 16);
        }
    }

    element.toggleClass("active").prevAll().removeClass("active").addClass("done");
    if (element.hasClass("active")) {
        element.nextAll().removeClass("active").removeClass("done");
    }

    
}

/*--- toggle button ---*/
function functionToggle() {
    let element = document.getElementById("aside");
    element.classList.toggle("collapseAside");
    $("#contentMap").toggleClass("collapseAside");
    if ($("#aside").hasClass("collapseAside")) {
        document.querySelector("#asideToggle img").style.transform = "rotate(180deg)";
        $(".content").removeClass("unexpanded")

    } else {
        document.querySelector("#asideToggle img").style.transform = "rotate(0)";
        $(".content").addClass("unexpanded")
    }
}


/*--- youtube apear ---*/

function youtubeApear() {
    $('#iframeYoutube').toggleClass('expand')
    if ($('#iframeYoutubeAudio').hasClass('expand')) {
        $('#iframeYoutubeAudio').removeClass('expand');
    }
}

function youtubeApearAudio() {
    $('#iframeYoutubeAudio').toggleClass('expand')
    if ($('#iframeYoutube').hasClass('expand')) {
        $('#iframeYoutube').removeClass('expand');
    }
}

/*--- bootstrap tour ---*/






var tour1 = new Tour({

    steps: [
      {        
        orphan: true,
        title: "Bienvenido a Colombia Expediciones IGAC",
        content: `<h2 clas='titleIntro'>Bienvenido a Expediciones IGAC</h2>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Unde eveniet quaerat perferendis omnis, dignissimos soluta repellat quo numquam possimus atque esse. Ullam perspiciatis repellendus quod officia unde pariatur debitis harum?`,
        smartPlacement: true,
        animation: true,
        backdrop: true,
        template: `<div class='popover tour main'>
        <div class='modal-header'><div data-role="end">×</div></div>
        <div class='d-flex contentP'>
            <img src="images/Walkthrough_01.png" alt=""> 
            <div class='popover-content'></div>
        </div>
            <div class='d-flex navigation justify-content-between'> 
                <div class='popover-navigation p-0'>            
                    <button class='btn' data-role='prev'>Anterior <span data-role='separator'>|</span></button>
                    
                    <button class='btn' data-role='next'>Siguiente</button>
                </div>

                <button class='btn' data-role='end'>Finalizar Tour</button>
                </div>
            </div>
            `,
    },
    {
      element: "#tabTable",
      title: "Title of first para",
      content: "E1 :- Content of my step",
      smartPlacement: true,
      backdrop: true,
      template: `
        <div class='popover tour secondary'>
        <div class='arrow'></div>
        <div class='modal-header d-flex justify-content-between'>            
            <h3 class='popover-title p-0'></h3>
            <div data-role="end">×</div>
        </div>        
        <div class='popover-content'></div>
        <div class='popover-navigation d-flex'>
            <button class='btn btn-default' data-role='prev'>Anterior</button>
            <button class='btn btn-default' data-role='next'>Siguiente</button>
            <button class='btn btn-default' data-role='end'>Finalizar Tour</button>
            </div>
        </div>
        
            `
    },
    {
        element: "#listItem_0",
        title: "Title of Second Para",
        content: "Click here to contact US...",
        onEnd: function (tour) {
            if (window.matchMedia("(max-width: 425px)").matches) {
                $("#aside").removeClass("collapseAside")
                document.querySelector("#asideToggle img").style.transform = "rotate(180deg)";
            }
        },
        template: `
            <div class='popover tour secondary'>
            <div class='arrow'></div>
            <div class='modal-header d-flex justify-content-between'>            
                <h3 class='popover-title p-0'></h3>
                <div data-role="end">×</div>
            </div>        
            <div class='popover-content'></div>
            <div class='popover-navigation d-flex'>
                <button class='btn btn-default' data-role='prev'>Anterior</button>
                <button class='btn btn-default' data-role='next'>Siguiente</button>
                <button class='btn btn-default' data-role='end'>Finalizar Tour</button>
                </div>
            </div>        
        `
    },

    {
        element: "#graphicsLayer0_layer",
        title: "Title of Second Para",
        content: "Click here to contact US...",
        onShow: function (tour) {
            if (window.matchMedia("(max-width: 425px)").matches) {
                $("#aside").addClass("collapseAside")
                document.querySelector("#asideToggle img").style.transform = "rotate(180deg)";
            }
        },
        onHide: function (tour) {
            if (window.matchMedia("(max-width: 425px)").matches) {
                $("#aside").removeClass("collapseAside")
                document.querySelector("#asideToggle img").style.transform = "rotate(180deg)";
            }
        },
        template: `
        <div class='popover tour secondary'>
        <div class='arrow'></div>
        <div class='modal-header d-flex justify-content-between'>            
            <h3 class='popover-title p-0'></h3>
            <div data-role="end">×</div>
        </div>        
        <div class='popover-content'></div>
        <div class='popover-navigation d-flex'>
            <button id='pointsTour' class='btn btn-default' data-role='prev'>Anterior</button>
            <button class='btn btn-default' data-role='end'>Finalizar Tour</button>
            </div>
        </div>        
        `
      }
    
]});

  
  
// Initialize the tour
tour1.init();

// Start the tour
tour1.start();


// Slider

const swiper = new Swiper('.swiper', {
    speed: 600,
    breakpoints: {
    // when window width is >= 320px
        320: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        // when window width is >= 480px
        425: {
            slidesPerView: 1,
            spaceBetween: 10
        },
        // when window width is >= 640px
        728: {
            slidesPerView: 1,
            spaceBetween: 20
        }
    },
    parallax: true,
    // Optional parameters
    direction: 'horizontal',
    loop: true,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    // And if we need scrollbar
});















