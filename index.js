var esri;
var map;
var cofanLayer;

var popup;
var popup_init = null;
var popup_links = true;

var markerSQ, markerDM;

var datosCofan;

$(".content").addClass("unexpanded")

if (document.querySelector(".navbarigac")) {
    const navbarigac = document.querySelector(".navbarigac");
    navbarigac.innerHTML = `
    <div class="logos">
        <div class="navbar-brand-igac">
            <a href='https://www.igac.gov.co' target='_blank'><img alt='Logo IGAC' src='/images/logo-igac.png'/></a>
        </div>
        <div class="logoigac">
            <a href="/index.html"><img src="/images/logo.svg" alt="Expediciones Igac"></a>
        </div>
    </div>
    <button class='nav-bar-toggle-igac'>
        <div class='icon-bar'></div>
        <div class='icon-bar'></div>
        <div class='icon-bar'></div>
    </button>
    <div class='navbarnavigac'>
        <li>
            <a class='inicio' href='/index.html'>Pueblo Cofan</a>
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

        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/PictureFillSymbol",
        "esri/symbols/CartographicLineSymbol",

        "esri/graphic",
        "esri/graphicsUtils",
        "esri/geometry/Point",
        "esri/geometry/webMercatorUtils",

        "esri/dijit/Popup", 
        "esri/dijit/PopupTemplate",

        "esri/Color",

        "dojo/dom-construct",
        "dojo/dom", "dojo/on", "dojo/domReady!"
    ], function (
        __Map,
        __SimpleMarkerSymbol,
        __SimpleLineSymbol,
        __PictureFillSymbol,
        __CartographicLineSymbol,
        __Graphic,
        __graphicsUtils,
        __Point,
        __webMercatorUtils,
        __Popup, 
        __PopupTemplate,
        __Color,
        __domConstruct,
        __dom,
        __on
    ) {
        esri.Map = __Map;

        esri.SimpleMarkerSymbol = __SimpleMarkerSymbol;
        esri.SimpleLineSymbol = __SimpleLineSymbol;
        esri.PictureFillSymbol = __PictureFillSymbol;
        esri.CartographicLineSymbol = __CartographicLineSymbol;

        esri.Graphic = __Graphic;
        esri.Point = __Point;
        esri.graphicsUtils = __graphicsUtils;
        esri.webMercatorUtils = __webMercatorUtils;

        esri.Popup = __Popup;
        esri.PopupTemplate = __PopupTemplate;
        
        esri.Color = __Color;

        esri.domConstruct = __domConstruct;
        esri.dom = __dom;
        esri.on = __on;

        initMap2();
    });
}

function initMap2() {

    var line = new esri.SimpleLineSymbol();
    line.setColor(new esri.Color([0, 0, 0, 0.5]));

    markerSQ = new esri.SimpleMarkerSymbol();
    markerSQ.setColor(new esri.Color([255, 0, 0, 0.5]));
    markerSQ.setOutline(line);
    markerSQ.setStyle(esri.SimpleMarkerSymbol.STYLE_SQUARE);

    markerDM = new esri.SimpleMarkerSymbol();
    markerDM.setColor(new esri.Color([0, 0, 255, 0.5]));
    markerDM.setOutline(line);
    markerDM.setStyle(esri.SimpleMarkerSymbol.STYLE_DIAMOND);

    $.ajax({
        url: "/data/cofan.json",
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

        if (popup_links) {
            popup_links = false;
            $(".actionList").append("<a href='#' class='action vermas-link' onclick='gotoVerMas();'>&nbsp;Ver más...</a>");
        }
    });

    map = new esri.Map("viewDiv", {
        basemap: "topo-vector",
        center: [-76.83, 0.52],
        zoom: 14,
        infoWindow: popup
    });

    cofanLayer = new esri.layers.GraphicsLayer();
    map.addLayer(cofanLayer);

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
                "Nombre": dato.Nombre_COF,
                "Video": dato.Aspectos_Linguisticos.Registro_Audiovisual_URL
            },

            "symbol": {
                "color": [255, 0, 0, 128],
                "size": 12,
                "angle": 0,
                "xoffset": 0,
                "yoffset": 0,
                "type": "esriSMS",
                "style": "esriSMSSquare",
                "outline": {
                    "color": [0, 0, 0, 255],
                    "width": 1,
                    "type": "esriSLS",
                    "style": "esriSLSSolid"
                }
            },

            "infoTemplate": {
                "title": ["<div class='d-flex align-items-center'>" + "<div class='identificador'>" + dato.ID + "</div>" + dato.Nombre_ESP + "</div>"],
                "content": "Nombre:${Nombre} <div class='d-flex'> Video:<a href='${Video}' target='_blank'>${Video}<a><div>"
            }
        };

        cofanLayer.add(new esri.Graphic(datoPoint));
    }

}

function gotoVerMas(){
    popup.getSelectedFeature();
}

function listCofan() {
    const dato = datosCofan;
    let strHTML = "";

    for (var i = 0; i < datosCofan.length; i++) {
        strHTML = strHTML + "<li id='listItem_" + i + "' class='list__item' id-cofan=" + dato[i].ID + ">";
        strHTML = strHTML + "<a >";
        strHTML = strHTML + "<div class='list__item--title'>" + dato[i].Nombre_ESP + "</div>";
        strHTML = strHTML + "<div class='list__item--title-resume'>" + dato[i].Nombre_COF + "</div>";
        strHTML = strHTML + "</a>";
        strHTML = strHTML + "</li>";

    }
    $("#expeditonTermsList ol").html(strHTML);

    /*--- list button---*/
    $(".list__item").click(function () {
        let idCofan = $(this).attr('id-cofan');

        popup.hide();
        popup.clearFeatures();

        for (let idx = 0; idx < cofanLayer.graphics.length; idx++) {
            if (cofanLayer.graphics[idx].attributes.ID == idCofan) {
                const graphic = cofanLayer.graphics[idx];
                graphic.setSymbol(markerDM);
                
                popup.setFeatures([graphic]);
                popup.show(graphic.geometry);

                map.centerAndZoom(graphic.geometry, 16);

            } else {
                cofanLayer.graphics[idx].setSymbol(markerSQ);
            }
        }

        $(this).toggleClass("active").prevAll().removeClass("active").addClass("done");
        if ($(this).hasClass("active")) {
            $(this).nextAll().removeClass("active").removeClass("done");
        }
    });

};

/*--- toggle button ---*/
function functionToggle() {
    let element = document.getElementById("aside");
    element.classList.toggle("collapseAside");
    $("#contentMap").toggleClass("collapseAside");
    if ($("#aside").hasClass("collapseAside")) {
        document.querySelector("#asideToggle img").style.transform = "rotate(180deg)";
        document.querySelector(".content").style.width = "100%";
        $(".content").removeClass("unexpanded")

    } else {
        document.querySelector("#asideToggle img").style.transform = "rotate(0)";
        document.querySelector(".content").style.width = "75%";
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