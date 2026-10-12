=========================================================
   CREATREEBU — script.js

   ORDEN DEL ARCHIVO
   1. CONFIGURACIÓN  → WhatsApp, email e Instagram (NO tocar el número)
   2. PORTFOLIO      → los proyectos (acá se editan / reemplazan)
   3. LÓGICA         → comportamiento de la página (no hace falta tocarla)
   4. ARTE DE DEMO   → dibujos de los proyectos conceptuales
                       (se puede borrar cuando ya no se usen)
   ========================================================= */


/* =========================================================
   1. CONFIGURACIÓN
   ========================================================= */

/* Número de WhatsApp en formato internacional, solo dígitos y sin +.
   Es el número que ya estaba configurado en el sitio: NO lo modifiques
   salvo que quieras cambiar de número. */
const WHATSAPP_NUMBER = "5491162187085";

/* Datos opcionales. Dejá "" lo que no quieras mostrar. */
const CONTACT = {
  email: "",      // ej.: "hola@tudominio.com"
  instagram: ""   // solo el usuario, sin @ ni URL. ej.: "creatreebu"
};

/* Mensajes precargados de WhatsApp según el botón (atributo data-wa del HTML). */
const WHATSAPP_MESSAGES = {
  general: "Hola! Vi la web de Creatreebu y quiero hacer una consulta sobre diseño para mi negocio.",
  pack: "Hola! Quiero pedir presupuesto del Pack Comercial Express (5 piezas para redes sociales con mi identidad visual y 2 rondas de ajustes). Mi negocio es: ",
  diseno: "Hola! Quiero consultar por diseño gráfico (piezas para redes, flyers o identidad visual) para mi negocio.",
  web: "Hola! Quiero consultar por el diseño de una landing page o página web sencilla para mi negocio.",
  "servicio-identidad": "Hola! Quiero consultar por identidad visual y sistema gráfico de marca.",
  "servicio-piezas": "Hola! Quiero consultar por piezas comerciales y promocionales (flyers, carteles, anuncios).",
  "servicio-redes": "Hola! Quiero consultar por publicaciones y campañas para redes sociales.",
  "servicio-packaging": "Hola! Quiero consultar por packaging, etiquetas o diseño editorial.",
  "servicio-digital": "Hola! Quiero consultar por gráfica para productos y comunicación digital.",
  /* {proyecto} se reemplaza por el nombre de marca desde la vista detallada */
  proyecto: "Hola! Vi el proyecto {proyecto} en la web de Creatreebu y quiero consultar por algo similar para mi marca."
};


/* =========================================================
   2. PORTFOLIO
   ---------------------------------------------------------
   Cada proyecto es un objeto con estos campos:

   id            texto único, sin espacios ni tildes (ej. "mi-cliente")
   nombre        nombre del proyecto (título de la vista detallada)
   marca         nombre de la marca
   categoria     categoría; los filtros se generan solos con estos valores
   descripcion   texto breve del proyecto
   estado        "conceptual" o "real"
   tamano        tamaño en la grilla: "l" (grande), "m" (mediano), "h" (mitad)
   paleta        [color de la ficha, color de la letra de la ficha]
   imagen        imagen principal: { src, arte, alt }
   imagenes      imágenes complementarias: [ { src, arte, alt }, ... ]
   servicios     lista de servicios realizados

   Dentro de imagen / imagenes:
   src   ruta de tu archivo, ej. "img/cliente-portada.jpg"
         Si src tiene una ruta, se muestra esa imagen.
   arte  nombre del dibujo de demostración (sección 4). Con src cargado
         se ignora; podés dejarlo en "".
   alt   texto alternativo: describí qué se ve en la imagen.
   ========================================================= */

const PROYECTOS = [
  {
    id: "almacen-brasa",
    nombre: "Café de tostado lento",
    marca: "Almacén Brasa",
    categoria: "Identidad y packaging",
    descripcion: "Sistema de packaging para una tostadora de café: bolsa, etiqueta de lote y vaso para llevar. La brasa funciona como recurso central y el naranja sostiene toda la línea.",
    estado: "conceptual",
    tamano: "l",
    paleta: ["#E4572E", "#1C1612"],
    imagen: { src: "", arte: "brasa-bolsa", alt: "Bolsa de café negra con etiqueta crema que dice brasa, sobre un fondo naranja con círculos concéntricos." },
    imagenes: [
      { src: "", arte: "brasa-etiqueta", alt: "Etiqueta circular de lote 07 sobre papel madera, con rayos alrededor del número." },
      { src: "", arte: "brasa-vaso", alt: "Vaso de café para llevar con manga naranja y el nombre brasa, sobre fondo oscuro." }
    ],
    servicios: ["Identidad visual", "Packaging", "Etiquetas"]
  },
  {
    id: "marea-alta",
    nombre: "Posada frente al mar",
    marca: "Marea Alta",
    categoria: "Identidad y packaging",
    descripcion: "Identidad para una posada costera: logotipo construido con olas, llavero de habitación y una publicación para redes. Paleta de arena, azul profundo y un toque de coral.",
    estado: "conceptual",
    tamano: "m",
    paleta: ["#0F2B46", "#EFE3CF"],
    imagen: { src: "", arte: "marea-logo", alt: "Logotipo de Marea Alta: círculo azul con olas color arena y un sol coral, sobre fondo arena." },
    imagenes: [
      { src: "", arte: "marea-llave", alt: "Llavero de habitación número 12 color arena, sobre fondo azul con un sol coral." },
      { src: "", arte: "marea-post", alt: "Publicación para redes con el texto Abrimos en septiembre, sobre un panel arena." }
    ],
    servicios: ["Identidad visual", "Piezas para redes", "Papelería"]
  },
  {
    id: "pulpa",
    nombre: "Jugos de fruta en lata",
    marca: "Pulpa",
    categoria: "Identidad y packaging",
    descripcion: "Línea de latas de jugo con personalidad pop. Cada sabor tiene su color, un sistema de frutas geométricas y una tipografía redonda y pesada.",
    estado: "conceptual",
    tamano: "m",
    paleta: ["#FF3D81", "#FFD60A"],
    imagen: { src: "", arte: "pulpa-latas", alt: "Tres latas de jugo Pulpa rosa, verde y violeta con rodajas de fruta, sobre fondo amarillo." },
    imagenes: [
      { src: "", arte: "pulpa-etiqueta", alt: "Etiqueta amarilla de jugo de frutas con el nombre pulpa y rodajas de fruta, sobre fondo rosa." },
      { src: "", arte: "pulpa-post", alt: "Publicación verde con una rodaja rosa gigante y el texto Fría, fuerte, frutal." }
    ],
    servicios: ["Packaging", "Etiquetas", "Piezas para redes"]
  },
  {
    id: "lamina",
    nombre: "Revista de diseño y oficio",
    marca: "Lámina",
    categoria: "Editorial",
    descripcion: "Diseño editorial para una revista de diseño: tapa, doble página interior e índice. Composiciones geométricas con el rojo como único color de acento.",
    estado: "conceptual",
    tamano: "l",
    paleta: ["#D6281C", "#F3EFE6"],
    imagen: { src: "", arte: "lamina-tapa", alt: "Tapa de la revista Lámina con un círculo rojo, un bloque negro y el título Color y oficio." },
    imagenes: [
      { src: "", arte: "lamina-doble", alt: "Doble página interior con un bloque rojo, un círculo negro, texto en columnas y una letra capital roja." },
      { src: "", arte: "lamina-indice", alt: "Página de índice con el número 04 en grande y una lista de cuatro notas con sus páginas." }
    ],
    servicios: ["Diseño editorial", "Maquetación", "Dirección de arte"]
  },
  {
    id: "kine",
    nombre: "Estudio de movimiento",
    marca: "Kiné",
    categoria: "Redes y promociones",
    descripcion: "Campaña para redes de un estudio de pilates: carrusel, historia y publicación suelta. Paleta suave y formas de arco que sugieren movimiento.",
    estado: "conceptual",
    tamano: "h",
    paleta: ["#A9BFA0", "#3B2540"],
    imagen: { src: "", arte: "kine-carrusel", alt: "Carrusel de publicaciones de Kiné con el texto Respirá y arcos concéntricos, sobre fondo ciruela." },
    imagenes: [
      { src: "", arte: "kine-historia", alt: "Historia vertical que invita a una clase de prueba, con arcos de colores y un botón Reservá tu lugar." },
      { src: "", arte: "kine-post", alt: "Publicación rosada con el texto Moverse es el plan y círculos verdes." }
    ],
    servicios: ["Campaña para redes sociales", "Adaptación de formatos", "Dirección de arte"]
  },
  {
    id: "dos-ases",
    nombre: "Promociones de temporada",
    marca: "Ferretería Dos Ases",
    categoria: "Redes y promociones",
    descripcion: "Piezas promocionales para una ferretería: flyer, cartel de local y anuncio para redes. Estética de cartelería popular, con color plano, puntos de trama y mucha jerarquía.",
    estado: "conceptual",
    tamano: "h",
    paleta: ["#F7C948", "#1F4FA3"],
    imagen: { src: "", arte: "ases-flyer", alt: "Flyer amarillo con una estrella roja y el texto Ofertas de la semana, sobre fondo azul." },
    imagenes: [
      { src: "", arte: "ases-cartel", alt: "Cartel de local amarillo con el texto Todo para tu obra y dos cartas de as, sobre fondo rojo." },
      { src: "", arte: "ases-anuncio", alt: "Anuncio amarillo con un martillo y el texto Herramientas que duran." }
    ],
    servicios: ["Piezas promocionales", "Flyers y cartelería", "Anuncios"]
  }
];


/* =========================================================
   3. LÓGICA
   ========================================================= */

function iniciar() {
  "use strict";

  document.documentElement.classList.add("js");

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function esc(valor) {
    return String(valor == null ? "" : valor).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function colorSeguro(valor, porDefecto) {
    return /^#[0-9a-fA-F]{3,8}$/.test(String(valor)) ? valor : porDefecto;
  }

  /* ----- WhatsApp ----- */
  function numeroConfigurado() {
    return /^\d{8,15}$/.test(WHATSAPP_NUMBER);
  }

  function urlWhatsApp(texto) {
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(texto);
  }

  function prepararEnlaceWa(enlace, texto) {
    if (!numeroConfigurado()) { return; }
    enlace.setAttribute("href", urlWhatsApp(texto));
    enlace.setAttribute("target", "_blank");
    enlace.setAttribute("rel", "noopener noreferrer");
  }

  var avisoWa = $("#wa-aviso");
  function mostrarAvisoWa() {
    if (avisoWa && typeof avisoWa.showModal === "function") {
      if (!avisoWa.open) { avisoWa.showModal(); }
    } else {
      window.alert("El contacto por WhatsApp todavía no está disponible.");
    }
  }
  var avisoCerrar = $("#wa-aviso-cerrar");
  if (avisoCerrar && avisoWa) {
    avisoCerrar.addEventListener("click", function () { avisoWa.close(); });
  }

  $$("[data-wa]").forEach(function (enlace) {
    var clave = enlace.getAttribute("data-wa");
    prepararEnlaceWa(enlace, WHATSAPP_MESSAGES[clave] || WHATSAPP_MESSAGES.general);
  });

  /* Si el número no está configurado, ningún botón de WhatsApp abre un contacto inexistente */
  document.addEventListener("click", function (evento) {
    var enlace = evento.target.closest("[data-wa], [data-wa-dinamico]");
    if (enlace && !numeroConfigurado()) {
      evento.preventDefault();
      mostrarAvisoWa();
    }
  });

  /* ----- Contacto opcional (solo si está configurado) ----- */
  var listaContacto = $("#contacto-datos");
  if (listaContacto) {
    if (/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(CONTACT.email)) {
      var liMail = document.createElement("li");
      var aMail = document.createElement("a");
      aMail.href = "mailto:" + CONTACT.email;
      aMail.textContent = CONTACT.email;
      liMail.appendChild(aMail);
      listaContacto.appendChild(liMail);
    }
    if (/^[A-Za-z0-9._]{1,30}$/.test(CONTACT.instagram)) {
      var liIg = document.createElement("li");
      var aIg = document.createElement("a");
      aIg.href = "https://www.instagram.com/" + CONTACT.instagram + "/";
      aIg.target = "_blank";
      aIg.rel = "noopener noreferrer";
      aIg.textContent = "Instagram @" + CONTACT.instagram;
      liIg.appendChild(aIg);
      listaContacto.appendChild(liIg);
    }
  }

  /* ----- Menú móvil ----- */
  var botonMenu = $(".menu-btn");
  var menu = $("#menu");
  function ponerMenu(abierto) {
    if (!botonMenu || !menu) { return; }
    menu.classList.toggle("abierto", abierto);
    botonMenu.setAttribute("aria-expanded", abierto ? "true" : "false");
    botonMenu.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
  }
  if (botonMenu && menu) {
    botonMenu.addEventListener("click", function () {
      ponerMenu(botonMenu.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) { if (e.target.closest("a")) { ponerMenu(false); } });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("abierto")) { ponerMenu(false); botonMenu.focus(); }
    });
    window.addEventListener("resize", function () { if (window.innerWidth >= 960) { ponerMenu(false); } });
  }

  /* ----- Borde del encabezado al hacer scroll ----- */
  var cabecera = $(".cab");
  function alScroll() { if (cabecera) { cabecera.classList.toggle("con-borde", window.scrollY > 8); } }
  window.addEventListener("scroll", alScroll, { passive: true });
  alScroll();

  /* ----- Año del pie ----- */
  var anio = $("#anio");
  if (anio) { anio.textContent = String(new Date().getFullYear()); }

  /* ----- Imágenes: archivo real o dibujo de demostración ----- */
  var contadorId = 0;
  function nuevoId() { contadorId += 1; return "u" + contadorId + "-"; }

  function medio(item, decorativo) {
    if (!item) { return ""; }
    if (item.src) {
      return '<img src="' + esc(item.src) + '" alt="' + (decorativo ? "" : esc(item.alt)) + '" loading="lazy" decoding="async">';
    }
    var dibujo = (typeof ARTE_DEMO !== "undefined" && ARTE_DEMO[item.arte]) ? ARTE_DEMO[item.arte] : null;
    if (!dibujo) { return ""; }
    var aria = decorativo ? 'aria-hidden="true"' : 'role="img" aria-label="' + esc(item.alt) + '"';
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 640" preserveAspectRatio="xMidYMid slice" ' + aria + ' focusable="false">' + dibujo(nuevoId()) + "</svg>";
  }

  if (!Array.isArray(PROYECTOS) || PROYECTOS.length === 0) { return; }

  /* ----- Fichas de color del hero ----- */
  var contenedorChips = $("#chips");
  var ROT = [-8, -3, 2, 6, -5, 8, -2, 4];
  var DESP = [10, 26, 4, 22, 0, 18, 8, 24];
  if (contenedorChips) {
    contenedorChips.innerHTML = PROYECTOS.slice(0, 6).map(function (p, i) {
      var paleta = p.paleta || [];
      var inicial = String(p.marca || "?").charAt(0);
      return '<button class="chip" type="button" data-i="' + i + '" aria-haspopup="dialog" aria-label="' + esc("Ver proyecto " + p.marca) + '"' +
        ' style="--i:' + i + ";--r:" + ROT[i % ROT.length] + "deg;--y:" + DESP[i % DESP.length] + "px;--c1:" + colorSeguro(paleta[0], "#1E4D34") + ";--c2:" + colorSeguro(paleta[1], "#F4F0E8") + '">' +
        '<span class="chip-color" aria-hidden="true">' + esc(inicial) + "</span>" +
        '<span class="chip-nombre">' + esc(p.marca) + "</span>" +
        (p.estado === "conceptual" ? '<span class="chip-tag">Concepto</span>' : "") +
        "</button>";
    }).join("");
  }

  /* ----- Filtros y grilla ----- */
  var grilla = $("#grilla");
  var contFiltros = $("#filtros");
  var estadoFiltro = $("#filtro-estado");
  var filtroActual = "Todos";

  function categoriasUnicas() {
    var vistas = [];
    PROYECTOS.forEach(function (p) { if (vistas.indexOf(p.categoria) === -1) { vistas.push(p.categoria); } });
    return vistas;
  }

  function htmlTile(p, indice) {
    var tam = ["l", "m", "h"].indexOf(p.tamano) !== -1 ? p.tamano : "m";
    return '<button class="tile tile--' + tam + '" type="button" data-i="' + indice + '" aria-haspopup="dialog" aria-label="' + esc("Ver proyecto: " + p.nombre + ", " + p.marca) + '">' +
      '<span class="tile-arte">' + medio(p.imagen, true) + "</span>" +
      '<span class="tile-pie"><span class="tile-marca">' + esc(p.marca) + "</span>" +
      '<span class="tile-cat">' + esc(p.categoria) + "</span>" +
      (p.estado === "conceptual" ? '<span class="tile-tag">Proyecto conceptual</span>' : "") +
      "</span></button>";
  }

  function pintarGrilla() {
    if (!grilla) { return; }
    var lista = PROYECTOS.map(function (p, i) { return { p: p, i: i }; }).filter(function (x) {
      return filtroActual === "Todos" || x.p.categoria === filtroActual;
    });
    grilla.classList.toggle("grilla--filtrado", filtroActual !== "Todos");
    grilla.innerHTML = lista.map(function (x) { return htmlTile(x.p, x.i); }).join("");
    if (estadoFiltro) {
      estadoFiltro.textContent = filtroActual === "Todos"
        ? "Mostrando los " + lista.length + " proyectos."
        : "Mostrando " + lista.length + (lista.length === 1 ? " proyecto" : " proyectos") + " de " + filtroActual + ".";
    }
  }

  if (contFiltros) {
    var nombres = ["Todos"].concat(categoriasUnicas());
    contFiltros.innerHTML = nombres.map(function (n) {
      return '<button class="filtro" type="button" data-filtro="' + esc(n) + '" aria-pressed="' + (n === filtroActual ? "true" : "false") + '">' + esc(n) + "</button>";
    }).join("");
    contFiltros.addEventListener("click", function (e) {
      var b = e.target.closest(".filtro");
      if (!b) { return; }
      filtroActual = b.getAttribute("data-filtro");
      $$(".filtro", contFiltros).forEach(function (x) {
        x.setAttribute("aria-pressed", x === b ? "true" : "false");
      });
      pintarGrilla();
    });
  }
  pintarGrilla();

  /* ----- Vista detallada (modal accesible) ----- */
  var modal = $("#modal");
  var estado = { i: 0, m: 0 };
  var refs = modal ? {
    escena: $("#modal-escena"), minis: $("#modal-miniaturas"), estado: $("#modal-estado"), marca: $("#modal-marca"),
    titulo: $("#modal-titulo"), desc: $("#modal-desc"), nota: $("#modal-nota"), cat: $("#modal-cat"), serv: $("#modal-serv"),
    wa: $("#modal-wa"), prev: $("#modal-prev"), next: $("#modal-next"), pos: $("#modal-pos"), cerrar: $("#modal-cerrar")
  } : null;

  function listaMedios(p) {
    return [p.imagen].concat(Array.isArray(p.imagenes) ? p.imagenes : []).filter(Boolean);
  }

  function pintarMedio() {
    var p = PROYECTOS[estado.i];
    var medios = listaMedios(p);
    refs.escena.innerHTML = medio(medios[estado.m], false);
    $$(".mini", refs.minis).forEach(function (b, idx) {
      b.setAttribute("aria-pressed", idx === estado.m ? "true" : "false");
    });
  }

  function pintarModal() {
    var p = PROYECTOS[estado.i];
    var medios = listaMedios(p);
    var conceptual = p.estado === "conceptual";
    refs.estado.textContent = conceptual ? "Proyecto conceptual" : "Proyecto real";
    refs.marca.textContent = p.marca;
    refs.titulo.textContent = p.nombre;
    refs.desc.textContent = p.descripcion;
    refs.nota.textContent = conceptual ? "Marca ficticia creada para mostrar el estilo de trabajo de Creatreebu. No es un cliente real." : "";
    refs.nota.hidden = !conceptual;
    refs.cat.textContent = p.categoria;
    refs.serv.textContent = (p.servicios || []).join(", ");
    refs.pos.textContent = (estado.i + 1) + " de " + PROYECTOS.length;
    refs.prev.hidden = refs.next.hidden = PROYECTOS.length < 2;
    refs.minis.hidden = medios.length < 2;
    refs.minis.innerHTML = medios.map(function (m, idx) {
      return '<button class="mini" type="button" data-m="' + idx + '" aria-pressed="false" aria-label="' + esc("Ver imagen " + (idx + 1) + " de " + medios.length + ": " + m.alt) + '">' + medio(m, true) + "</button>";
    }).join("");
    var textoWa = WHATSAPP_MESSAGES.proyecto.replace("{proyecto}", p.marca);
    refs.wa.setAttribute("href", "#contacto");
    refs.wa.removeAttribute("target");
    prepararEnlaceWa(refs.wa, textoWa);
    pintarMedio();
  }

  function abrirModal(indice) {
    if (!modal || !PROYECTOS[indice]) { return; }
    estado.i = indice;
    estado.m = 0;
    pintarModal();
    if (!modal.open) {
      if (typeof modal.showModal === "function") { modal.showModal(); } else { modal.setAttribute("open", ""); }
      document.documentElement.classList.add("modal-abierto");
      modal.scrollTop = 0;
    }
  }

  function moverModal(paso) {
    estado.i = (estado.i + paso + PROYECTOS.length) % PROYECTOS.length;
    estado.m = 0;
    pintarModal();
    modal.scrollTop = 0;
  }

  function alHacerClicEnProyecto(e) {
    var b = e.target.closest("[data-i]");
    if (b) { abrirModal(parseInt(b.getAttribute("data-i"), 10)); }
  }
  if (grilla) { grilla.addEventListener("click", alHacerClicEnProyecto); }
  if (contenedorChips) { contenedorChips.addEventListener("click", alHacerClicEnProyecto); }

  if (modal && refs) {
    refs.cerrar.addEventListener("click", function () { modal.close(); });
    refs.prev.addEventListener("click", function () { moverModal(-1); });
    refs.next.addEventListener("click", function () { moverModal(1); });
    refs.minis.addEventListener("click", function (e) {
      var b = e.target.closest(".mini");
      if (b) { estado.m = parseInt(b.getAttribute("data-m"), 10); pintarMedio(); }
    });
    /* Clic fuera del contenido cierra la vista */
    modal.addEventListener("click", function (e) { if (e.target === modal) { modal.close(); } });
    modal.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") { moverModal(-1); }
      if (e.key === "ArrowRight") { moverModal(1); }
    });
    modal.addEventListener("close", function () { document.documentElement.classList.remove("modal-abierto"); });
    /* Si se cierra el aviso de WhatsApp o el modal con Esc, se libera el scroll de la página */
  }
}


/* =========================================================
   4. ARTE DE DEMOSTRACIÓN
   Dibujos propios en SVG de los proyectos conceptuales.
   Cuando reemplaces todos los proyectos por imágenes reales
   (campo "src"), podés borrar desde acá hasta
   "FIN DEL ARTE DE DEMOSTRACIÓN".
   ========================================================= */

var SYS = "system-ui,-apple-system,'Segoe UI',Roboto,Arial,sans-serif";
var SERIF = "Georgia,'Times New Roman',serif";

function rayos(cx, cy, r1, r2, n, color, ancho) {
  var s = "";
  for (var i = 0; i < n; i++) {
    var a = (Math.PI * 2 * i) / n;
    s += '<line x1="' + (cx + Math.cos(a) * r1).toFixed(1) + '" y1="' + (cy + Math.sin(a) * r1).toFixed(1) +
      '" x2="' + (cx + Math.cos(a) * r2).toFixed(1) + '" y2="' + (cy + Math.sin(a) * r2).toFixed(1) +
      '" stroke="' + color + '" stroke-width="' + ancho + '" stroke-linecap="round"/>';
  }
  return s;
}

function ola(y, amp, color, ancho, x0) {
  var d = "M" + (x0 === undefined ? -50 : x0) + " " + y + " q50 " + (-amp) + " 100 0";
  for (var i = 0; i < 9; i++) { d += " t100 0"; }
  return '<path d="' + d + '" fill="none" stroke="' + color + '" stroke-width="' + ancho + '" stroke-linecap="round"/>';
}

function olaRelleno(y, amp, color) {
  var d = "M-50 " + y + " q50 " + (-amp) + " 100 0";
  for (var i = 0; i < 9; i++) { d += " t100 0"; }
  return '<path d="' + d + ' L950 700 L-50 700Z" fill="' + color + '"/>';
}

function lineas(x, y, ancho, n, paso, color, alto) {
  var proporciones = [1, 0.92, 0.98, 0.85, 0.95, 0.6, 0.9];
  var s = "";
  for (var i = 0; i < n; i++) {
    s += '<rect x="' + x + '" y="' + (y + i * paso) + '" width="' + Math.round(ancho * proporciones[i % proporciones.length]) +
      '" height="' + (alto || 5) + '" rx="2" fill="' + color + '"/>';
  }
  return s;
}

function puntos(x, y, cols, filas, paso, r, color) {
  var s = "";
  for (var j = 0; j < filas; j++) {
    for (var i = 0; i < cols; i++) {
      s += '<circle cx="' + (x + i * paso + (j % 2 ? paso / 2 : 0)) + '" cy="' + (y + j * paso) + '" r="' + r + '" fill="' + color + '"/>';
    }
  }
  return s;
}

function estrella(cx, cy, r1, r2, n, color) {
  var pts = [];
  for (var i = 0; i < n * 2; i++) {
    var r = i % 2 ? r1 : r2;
    var a = (Math.PI * i) / n - Math.PI / 2;
    pts.push((cx + Math.cos(a) * r).toFixed(1) + "," + (cy + Math.sin(a) * r).toFixed(1));
  }
  return '<polygon points="' + pts.join(" ") + '" fill="' + color + '"/>';
}

function rodaja(cx, cy, r, corteza, pulpa, gajos) {
  return '<circle cx="' + cx + '" cy="' + cy + '" r="' + r + '" fill="' + corteza + '"/>' +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.86).toFixed(1) + '" fill="' + pulpa + '"/>' +
    rayos(cx, cy, r * 0.12, r * 0.78, 8, gajos, Math.max(2, r * 0.05).toFixed(1)) +
    '<circle cx="' + cx + '" cy="' + cy + '" r="' + (r * 0.1).toFixed(1) + '" fill="' + gajos + '"/>';
}

var ARTE_DEMO = {

  /* ---------- Almacén Brasa: packaging, café ---------- */
  "brasa-bolsa": function () {
    return '<rect width="800" height="640" fill="#E4572E"/>' +
      '<circle cx="400" cy="340" r="290" fill="#D9461F"/><circle cx="400" cy="340" r="200" fill="#CC3B17"/>' +
      '<ellipse cx="400" cy="598" rx="170" ry="16" fill="#9E2A0E" opacity=".5"/>' +
      '<rect x="250" y="130" width="300" height="460" rx="18" fill="#1C1612"/>' +
      '<rect x="250" y="104" width="300" height="48" rx="8" fill="#2B2119"/>' +
      '<line x1="262" y1="118" x2="538" y2="118" stroke="#3B2E24" stroke-width="3"/>' +
      '<line x1="262" y1="132" x2="538" y2="132" stroke="#3B2E24" stroke-width="3"/>' +
      '<circle cx="400" cy="190" r="11" fill="#3B2E24"/>' +
      '<rect x="282" y="226" width="236" height="290" rx="8" fill="#F6E9D4"/>' +
      '<text x="400" y="312" text-anchor="middle" font-family="' + SYS + '" font-size="68" font-weight="900" letter-spacing="-3" fill="#1C1612">brasa</text>' +
      '<line x1="318" y1="338" x2="482" y2="338" stroke="#1C1612" stroke-width="3"/>' +
      '<text x="400" y="368" text-anchor="middle" font-family="' + SYS + '" font-size="18" font-weight="600" fill="#1C1612">Café de tostado lento</text>' +
      '<circle cx="400" cy="442" r="40" fill="#E4572E"/><circle cx="400" cy="442" r="24" fill="#F6E9D4"/><circle cx="400" cy="442" r="10" fill="#1C1612"/>' +
      '<text x="400" y="504" text-anchor="middle" font-family="' + SYS + '" font-size="15" font-weight="700" fill="#1C1612">250 g</text>';
  },

  "brasa-etiqueta": function () {
    return '<rect width="800" height="640" fill="#D9B88F"/>' +
      '<circle cx="400" cy="320" r="236" fill="#F6E9D4"/>' +
      '<circle cx="400" cy="320" r="216" fill="none" stroke="#1C1612" stroke-width="3"/>' +
      rayos(400, 320, 156, 196, 40, "#1C1612", 3) +
      '<text x="400" y="262" text-anchor="middle" font-family="' + SYS + '" font-size="22" font-weight="700" fill="#1C1612">Lote</text>' +
      '<text x="400" y="384" text-anchor="middle" font-family="' + SYS + '" font-size="140" font-weight="900" letter-spacing="-6" fill="#E4572E">07</text>' +
      '<text x="400" y="426" text-anchor="middle" font-family="' + SYS + '" font-size="22" font-weight="700" fill="#1C1612">Etiopía, Guji</text>' +
      '<text x="400" y="456" text-anchor="middle" font-family="' + SYS + '" font-size="16" fill="#1C1612">Notas de durazno y miel</text>';
  },

  "brasa-vaso": function () {
    return '<rect width="800" height="640" fill="#1C1612"/>' +
      '<circle cx="640" cy="130" r="70" fill="#E4572E"/>' +
      '<path d="M372 110 q-22 -32 0 -64 M404 110 q-22 -32 0 -64 M436 110 q-22 -32 0 -64" fill="none" stroke="#E4572E" stroke-width="6" stroke-linecap="round"/>' +
      '<polygon points="300,170 500,170 470,550 330,550" fill="#F6E9D4"/>' +
      '<rect x="284" y="130" width="232" height="44" rx="10" fill="#E4572E"/>' +
      '<polygon points="310.5,296 489.5,296 479.7,424 320.3,424" fill="#E4572E"/>' +
      '<text x="400" y="372" text-anchor="middle" font-family="' + SYS + '" font-size="46" font-weight="900" letter-spacing="-2" fill="#F6E9D4">brasa</text>' +
      '<circle cx="400" cy="520" r="0" fill="none"/>' +
      '<ellipse cx="400" cy="574" rx="130" ry="12" fill="#000" opacity=".35"/>';
  },

  /* ---------- Marea Alta: identidad, posada costera ---------- */
  "marea-logo": function (u) {
    return '<rect width="800" height="640" fill="#EFE3CF"/>' +
      '<clipPath id="' + u + 'c"><circle cx="400" cy="236" r="132"/></clipPath>' +
      '<circle cx="400" cy="236" r="132" fill="#0F2B46"/>' +
      '<circle cx="400" cy="190" r="42" fill="#F26B5B"/>' +
      '<g clip-path="url(#' + u + 'c)">' + ola(226, 34, "#EFE3CF", 10) + ola(264, 34, "#EFE3CF", 10) + ola(302, 34, "#EFE3CF", 10) + "</g>" +
      '<text x="400" y="454" text-anchor="middle" font-family="' + SERIF + '" font-size="70" font-weight="700" font-style="italic" fill="#0F2B46">Marea Alta</text>' +
      '<text x="400" y="494" text-anchor="middle" font-family="' + SYS + '" font-size="22" letter-spacing="3" fill="#0F2B46">Posada costera</text>' +
      olaRelleno(556, 22, "#3E8FA6") + olaRelleno(596, 22, "#0F2B46");
  },

  "marea-llave": function (u) {
    return '<rect width="800" height="640" fill="#0F2B46"/>' +
      '<circle cx="620" cy="140" r="64" fill="#F26B5B"/>' +
      ola(566, 18, "#3E8FA6", 6) + ola(596, 18, "#3E8FA6", 6) + ola(626, 18, "#3E8FA6", 6) +
      '<clipPath id="' + u + 't"><rect x="296" y="90" width="208" height="450" rx="30"/></clipPath>' +
      '<g transform="rotate(-10 400 330)">' +
      '<rect x="296" y="90" width="208" height="450" rx="30" fill="#EFE3CF"/>' +
      '<circle cx="400" cy="146" r="20" fill="#0F2B46"/>' +
      '<text x="400" y="322" text-anchor="middle" font-family="' + SERIF + '" font-size="150" font-weight="700" fill="#0F2B46">12</text>' +
      '<text x="400" y="374" text-anchor="middle" font-family="' + SERIF + '" font-size="28" font-style="italic" fill="#0F2B46">Marea Alta</text>' +
      '<g clip-path="url(#' + u + 't)">' + ola(440, 14, "#3E8FA6", 5, 250) + ola(466, 14, "#3E8FA6", 5, 250) + ola(492, 14, "#3E8FA6", 5, 250) + "</g>" +
      "</g>";
  },

  "marea-post": function (u) {
    return '<rect width="800" height="640" fill="#3E8FA6"/>' +
      '<rect x="190" y="70" width="440" height="500" fill="#0F2B46"/>' +
      '<rect x="176" y="56" width="440" height="500" fill="#EFE3CF"/>' +
      '<clipPath id="' + u + 'p"><rect x="176" y="56" width="440" height="500"/></clipPath>' +
      '<circle cx="530" cy="148" r="46" fill="#F26B5B"/>' +
      '<text x="212" y="296" font-family="' + SERIF + '" font-size="58" font-weight="700" fill="#0F2B46">Abrimos</text>' +
      '<text x="212" y="360" font-family="' + SERIF + '" font-size="50" font-style="italic" fill="#0F2B46">en septiembre.</text>' +
      '<text x="212" y="414" font-family="' + SYS + '" font-size="20" fill="#0F2B46">Reservas abiertas</text>' +
      '<g clip-path="url(#' + u + 'p)">' + ola(470, 16, "#3E8FA6", 6) + ola(496, 16, "#3E8FA6", 6) + ola(522, 16, "#3E8FA6", 6) + "</g>";
  },

  /* ---------- Pulpa: packaging pop, jugos ---------- */
  "pulpa-latas": function () {
    function lata(x, giro, c1, fruta, nombre) {
      var cx = x + 75;
      return '<g transform="rotate(' + giro + " " + cx + ' 570)">' +
        '<rect x="' + x + '" y="186" width="150" height="384" rx="10" fill="' + c1 + '"/>' +
        '<ellipse cx="' + cx + '" cy="570" rx="75" ry="14" fill="' + c1 + '"/>' +
        '<ellipse cx="' + cx + '" cy="186" rx="75" ry="14" fill="#E8E8EC"/>' +
        '<rect x="' + (x + 14) + '" y="204" width="9" height="340" rx="4" fill="#fff" opacity=".28"/>' +
        '<text x="' + cx + '" y="262" text-anchor="middle" font-family="' + SYS + '" font-size="42" font-weight="900" letter-spacing="-2" fill="#fff">pulpa</text>' +
        rodaja(cx, 390, 52, fruta[0], fruta[1], fruta[2]) +
        '<text x="' + cx + '" y="502" text-anchor="middle" font-family="' + SYS + '" font-size="22" font-weight="800" fill="#fff">' + nombre + "</text></g>";
    }
    return '<rect width="800" height="640" fill="#FFD60A"/>' +
      '<circle cx="110" cy="90" r="150" fill="#FFC400"/><circle cx="720" cy="560" r="170" fill="#FFC400"/>' +
      '<ellipse cx="400" cy="590" rx="300" ry="16" fill="#B58F00" opacity=".4"/>' +
      lata(135, -6, "#FF3D81", ["#FFD60A", "#FFF0A0", "#FF3D81"], "frutilla") +
      lata(325, 0, "#00B386", ["#C8F560", "#F1FFC4", "#00B386"], "lima") +
      lata(515, 6, "#3A1C71", ["#FF3D81", "#FFB3CF", "#3A1C71"], "uva");
  },

  "pulpa-etiqueta": function () {
    return '<rect width="800" height="640" fill="#FF3D81"/>' +
      '<rect x="50" y="120" width="700" height="400" rx="22" fill="#FFD60A"/>' +
      rodaja(645, 300, 125, "#00B386", "#9BF0D2", "#00B386") +
      rodaja(560, 440, 68, "#FF3D81", "#FFB3CF", "#FF3D81") +
      '<text x="92" y="194" font-family="' + SYS + '" font-size="24" font-weight="800" fill="#3A1C71">330 ml</text>' +
      '<text x="88" y="338" font-family="' + SYS + '" font-size="150" font-weight="900" letter-spacing="-8" fill="#3A1C71">pulpa</text>' +
      '<text x="94" y="394" font-family="' + SYS + '" font-size="32" font-weight="700" fill="#3A1C71">jugo de frutas</text>' +
      '<text x="94" y="466" font-family="' + SYS + '" font-size="21" font-weight="600" fill="#3A1C71">Frutilla, lima y uva</text>';
  },

  "pulpa-post": function () {
    return '<rect width="800" height="640" fill="#00B386"/>' +
      rodaja(560, 330, 215, "#FF3D81", "#FFB3CF", "#FF3D81") +
      '<text x="50" y="206" font-family="' + SYS + '" font-size="92" font-weight="900" letter-spacing="-4" fill="#3A1C71">Fría.</text>' +
      '<text x="50" y="304" font-family="' + SYS + '" font-size="92" font-weight="900" letter-spacing="-4" fill="#3A1C71">Fuerte.</text>' +
      '<text x="50" y="402" font-family="' + SYS + '" font-size="92" font-weight="900" letter-spacing="-4" fill="#3A1C71">Frutal.</text>' +
      '<text x="52" y="570" font-family="' + SYS + '" font-size="44" font-weight="900" letter-spacing="-2" fill="#fff">pulpa</text>';
  },

  /* ---------- Lámina: editorial, revista ---------- */
  "lamina-tapa": function () {
    return '<rect width="800" height="640" fill="#BDB8AD"/>' +
      '<rect x="252" y="64" width="330" height="540" fill="#8F8A7E"/>' +
      '<rect x="235" y="50" width="330" height="540" fill="#F3EFE6"/>' +
      '<text x="400" y="140" text-anchor="middle" font-family="' + SERIF + '" font-size="80" font-weight="700" letter-spacing="-3" fill="#111">Lámina</text>' +
      '<line x1="257" y1="162" x2="543" y2="162" stroke="#111" stroke-width="3"/>' +
      '<circle cx="360" cy="338" r="104" fill="#D6281C"/>' +
      '<rect x="382" y="338" width="130" height="130" fill="#111"/>' +
      '<path d="M382 468 A65 65 0 0 1 512 468 Z" fill="#F3EFE6"/>' +
      '<text x="257" y="520" font-family="' + SYS + '" font-size="20" font-weight="800" fill="#111">Nº 04</text>' +
      '<text x="257" y="560" font-family="' + SERIF + '" font-size="28" font-style="italic" fill="#111">Color y oficio</text>';
  },

  "lamina-doble": function () {
    return '<rect width="800" height="640" fill="#111"/>' +
      '<rect x="100" y="110" width="300" height="420" fill="#F3EFE6"/>' +
      '<rect x="400" y="110" width="300" height="420" fill="#EAE5D9"/>' +
      '<line x1="400" y1="110" x2="400" y2="530" stroke="#BDB8AD" stroke-width="2"/>' +
      '<rect x="128" y="138" width="244" height="170" fill="#D6281C"/>' +
      '<circle cx="250" cy="223" r="62" fill="#111"/>' +
      '<text x="128" y="354" font-family="' + SERIF + '" font-size="25" font-style="italic" fill="#111">El color también</text>' +
      '<text x="128" y="386" font-family="' + SERIF + '" font-size="25" font-style="italic" fill="#111">compone la página.</text>' +
      lineas(128, 416, 244, 5, 16, "#BDB8AD", 5) +
      '<text x="428" y="172" font-family="' + SERIF + '" font-size="44" font-weight="700" fill="#111">Oficio</text>' +
      '<text x="428" y="218" font-family="' + SERIF + '" font-size="44" font-weight="700" fill="#111">y color</text>' +
      '<text x="428" y="318" font-family="' + SERIF + '" font-size="76" font-weight="700" fill="#D6281C">E</text>' +
      lineas(488, 266, 184, 4, 16, "#BDB8AD", 5) +
      lineas(428, 346, 244, 7, 16, "#BDB8AD", 5);
  },

  "lamina-indice": function () {
    var items = [["Color y oficio", "06"], ["Tipografía en la calle", "14"], ["Taller abierto", "22"], ["Papel y tinta", "30"]];
    var filas = "";
    for (var i = 0; i < items.length; i++) {
      var y = 300 + i * 62;
      filas += '<line x1="222" y1="' + y + '" x2="578" y2="' + y + '" stroke="#111" stroke-width="2"/>' +
        '<text x="222" y="' + (y + 38) + '" font-family="' + SERIF + '" font-size="24" fill="#111">' + items[i][0] + "</text>" +
        '<text x="578" y="' + (y + 38) + '" text-anchor="end" font-family="' + SYS + '" font-size="18" font-weight="800" fill="#111">' + items[i][1] + "</text>";
    }
    return '<rect width="800" height="640" fill="#D6281C"/>' +
      '<rect x="190" y="50" width="420" height="540" fill="#F3EFE6"/>' +
      '<text x="218" y="206" font-family="' + SERIF + '" font-size="170" font-weight="700" letter-spacing="-8" fill="#111">04</text>' +
      '<text x="222" y="256" font-family="' + SYS + '" font-size="18" font-weight="800" fill="#111">En este número</text>' +
      filas + '<line x1="222" y1="548" x2="578" y2="548" stroke="#111" stroke-width="2"/>';
  },

  /* ---------- Kiné: campaña para redes, pilates ---------- */
  "kine-carrusel": function () {
    return '<rect width="800" height="640" fill="#3B2540"/>' +
      '<rect x="560" y="110" width="420" height="420" fill="#F3D5C9"/>' +
      '<circle cx="700" cy="400" r="130" fill="#3B2540"/>' +
      '<rect x="90" y="110" width="420" height="420" fill="#A9BFA0"/>' +
      '<text x="124" y="202" font-family="' + SYS + '" font-size="66" font-weight="800" letter-spacing="-3" fill="#3B2540">Respirá.</text>' +
      '<path d="M130 530 a170 170 0 0 1 340 0z" fill="#F3D5C9"/>' +
      '<path d="M170 530 a130 130 0 0 1 260 0z" fill="#FBF6F1"/>' +
      '<path d="M210 530 a90 90 0 0 1 180 0z" fill="#3B2540"/>' +
      '<circle cx="360" cy="590" r="6" fill="#FBF6F1"/><circle cx="384" cy="590" r="6" fill="#FBF6F1" opacity=".4"/><circle cx="408" cy="590" r="6" fill="#FBF6F1" opacity=".4"/>';
  },

  "kine-historia": function () {
    return '<rect width="800" height="640" fill="#A9BFA0"/>' +
      '<rect x="250" y="26" width="300" height="588" rx="30" fill="#FBF6F1"/>' +
      '<text x="282" y="82" font-family="' + SYS + '" font-size="24" font-weight="800" fill="#3B2540">kiné</text>' +
      '<text x="282" y="160" font-family="' + SYS + '" font-size="42" font-weight="800" letter-spacing="-2" fill="#3B2540">Clase de</text>' +
      '<text x="282" y="206" font-family="' + SYS + '" font-size="42" font-weight="800" letter-spacing="-2" fill="#3B2540">prueba.</text>' +
      '<path d="M282 420 a118 118 0 0 1 236 0z" fill="#F3D5C9"/>' +
      '<path d="M312 420 a88 88 0 0 1 176 0z" fill="#A9BFA0"/>' +
      '<path d="M352 420 a48 48 0 0 1 96 0z" fill="#3B2540"/>' +
      '<text x="400" y="472" text-anchor="middle" font-family="' + SYS + '" font-size="24" font-weight="700" fill="#3B2540">Jueves, 19 h</text>' +
      '<rect x="282" y="524" width="236" height="54" rx="27" fill="#3B2540"/>' +
      '<text x="400" y="558" text-anchor="middle" font-family="' + SYS + '" font-size="19" font-weight="700" fill="#FBF6F1">Reservá tu lugar</text>';
  },

  "kine-post": function () {
    return '<rect width="800" height="640" fill="#F3D5C9"/>' +
      '<circle cx="610" cy="450" r="150" fill="#A9BFA0"/><circle cx="610" cy="450" r="92" fill="#FBF6F1"/><circle cx="610" cy="450" r="40" fill="#3B2540"/>' +
      '<text x="64" y="204" font-family="' + SYS + '" font-size="112" font-weight="800" letter-spacing="-5" fill="#3B2540">Moverse</text>' +
      '<text x="64" y="312" font-family="' + SYS + '" font-size="112" font-weight="800" letter-spacing="-5" fill="#3B2540">es el</text>' +
      '<text x="64" y="420" font-family="' + SYS + '" font-size="112" font-weight="800" letter-spacing="-5" fill="#3B2540">plan.</text>' +
      '<text x="68" y="574" font-family="' + SYS + '" font-size="30" font-weight="800" fill="#3B2540">kiné</text>';
  },

  /* ---------- Ferretería Dos Ases: promociones ---------- */
  "ases-flyer": function () {
    return '<rect width="800" height="640" fill="#1F4FA3"/>' +
      puntos(24, 36, 8, 4, 30, 5, "#2F63C4") + puntos(560, 560, 8, 3, 30, 5, "#2F63C4") +
      '<g transform="rotate(-3 400 320)">' +
      '<rect x="210" y="40" width="380" height="560" fill="#F7C948"/>' +
      estrella(400, 150, 72, 106, 14, "#E63B2E") +
      '<text x="400" y="146" text-anchor="middle" font-family="' + SYS + '" font-size="21" font-weight="900" fill="#fff">Solo</text>' +
      '<text x="400" y="172" text-anchor="middle" font-family="' + SYS + '" font-size="21" font-weight="900" fill="#fff">esta semana</text>' +
      '<text x="400" y="334" text-anchor="middle" font-family="' + SYS + '" font-size="84" font-weight="900" letter-spacing="-4" fill="#1F4FA3">Ofertas</text>' +
      '<text x="400" y="404" text-anchor="middle" font-family="' + SYS + '" font-size="46" font-weight="900" letter-spacing="-1" fill="#E63B2E">de la semana</text>' +
      '<rect x="210" y="488" width="380" height="112" fill="#1F4FA3"/>' +
      '<text x="400" y="540" text-anchor="middle" font-family="' + SYS + '" font-size="28" font-weight="900" fill="#F7C948">Ferretería Dos Ases</text>' +
      '<text x="400" y="572" text-anchor="middle" font-family="' + SYS + '" font-size="18" font-weight="600" fill="#fff">Todo para tu obra</text>' +
      "</g>";
  },

  "ases-cartel": function () {
    return '<rect width="800" height="640" fill="#E63B2E"/>' +
      puntos(20, 24, 16, 13, 50, 10, "#D0332A") +
      '<g transform="rotate(-12 325 135)"><rect x="270" y="60" width="110" height="150" rx="10" fill="#fff"/>' +
      '<text x="286" y="116" font-family="' + SERIF + '" font-size="54" font-weight="700" fill="#E63B2E">A</text><circle cx="325" cy="150" r="16" fill="#E63B2E"/></g>' +
      '<g transform="rotate(10 475 135)"><rect x="420" y="60" width="110" height="150" rx="10" fill="#fff"/>' +
      '<text x="436" y="116" font-family="' + SERIF + '" font-size="54" font-weight="700" fill="#1F4FA3">A</text><circle cx="475" cy="150" r="16" fill="#1F4FA3"/></g>' +
      '<rect x="50" y="200" width="700" height="240" rx="6" fill="#F7C948" stroke="#1F4FA3" stroke-width="12"/>' +
      '<text x="400" y="318" text-anchor="middle" font-family="' + SYS + '" font-size="82" font-weight="900" letter-spacing="-3" fill="#1F4FA3">Todo para</text>' +
      '<text x="400" y="400" text-anchor="middle" font-family="' + SYS + '" font-size="82" font-weight="900" letter-spacing="-3" fill="#1F4FA3">tu obra</text>' +
      '<circle cx="74" cy="224" r="7" fill="#1F4FA3"/><circle cx="726" cy="224" r="7" fill="#1F4FA3"/><circle cx="74" cy="416" r="7" fill="#1F4FA3"/><circle cx="726" cy="416" r="7" fill="#1F4FA3"/>' +
      '<text x="400" y="534" text-anchor="middle" font-family="' + SYS + '" font-size="44" font-weight="900" fill="#fff">Ferretería Dos Ases</text>' +
      '<rect x="290" y="552" width="220" height="6" fill="#F7C948"/>';
  },

  "ases-anuncio": function () {
    return '<rect width="800" height="640" fill="#F7C948"/>' +
      puntos(430, 40, 10, 8, 36, 8, "#1F4FA3") +
      '<g transform="rotate(32 560 270)">' +
      '<rect x="543" y="140" width="34" height="320" rx="8" fill="#E63B2E"/>' +
      '<rect x="470" y="104" width="180" height="76" rx="8" fill="#1F4FA3"/>' +
      '<path d="M650 112 q52 10 66 58 q-36 -16 -66 -8z" fill="#1F4FA3"/></g>' +
      '<rect x="60" y="70" width="190" height="48" rx="24" fill="#E63B2E"/>' +
      '<text x="155" y="102" text-anchor="middle" font-family="' + SYS + '" font-size="22" font-weight="900" fill="#fff">Dos Ases</text>' +
      '<text x="60" y="478" font-family="' + SYS + '" font-size="76" font-weight="900" letter-spacing="-3" fill="#1F4FA3">Herramientas</text>' +
      '<text x="60" y="556" font-family="' + SYS + '" font-size="76" font-weight="900" letter-spacing="-3" fill="#E63B2E">que duran.</text>';
  }
};

/* ========== FIN DEL ARTE DE DEMOSTRACIÓN ========== */

iniciar();
