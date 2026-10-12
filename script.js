/* =========================================================
   CREATREEBU — script.js
   JavaScript puro, sin dependencias.
   ========================================================= */

/* ---------------------------------------------------------
   CONFIGURACIÓN — lo único que tenés que editar
   ---------------------------------------------------------
   Reemplazá el valor de WHATSAPP_NUMBER por tu número en
   formato internacional, SOLO con dígitos y SIN el signo +.
   Ejemplo para un celular de Argentina: "5491122334455"
   (54 = país, 9 = móvil, código de área sin 0, número sin 15).
   Mientras no lo cambies, los botones de WhatsApp mostrarán
   un aviso y NO abrirán ningún contacto.
   --------------------------------------------------------- */
const WHATSAPP_NUMBER = "5491162187085";

/* Datos de contacto opcionales para el footer.
   Dejá vacío ("") lo que no quieras mostrar. */
const CONTACT = {
  email: "",      // ej.: "hola@tudominio.com"
  instagram: ""   // solo el usuario, sin @ ni URL. ej.: "creatreebu"
};

/* Mensajes precargados según el botón (atributo data-wa) */
const WHATSAPP_MESSAGES = {
  general: "Hola! Vi la web de Creatreebu y quiero hacer una consulta sobre diseño para mi negocio.",
  pack: "Hola! Quiero pedir presupuesto del Pack Comercial Express (6 piezas para redes + 4 historias). Mi negocio es: ",
  diseno: "Hola! Quiero consultar por diseño gráfico (piezas para redes, flyers o identidad visual) para mi negocio.",
  web: "Hola! Quiero consultar por el diseño de una landing page o página web sencilla para mi negocio."
};

(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ----- WhatsApp ----- */
  function numberIsConfigured() {
    return /^\d{8,15}$/.test(WHATSAPP_NUMBER);
  }

  function buildWhatsAppUrl(topic) {
    var text = WHATSAPP_MESSAGES[topic] || WHATSAPP_MESSAGES.general;
    return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(text);
  }

  var dialog = document.getElementById("wa-dialog");
  var dialogClose = document.getElementById("wa-dialog-cerrar");

  function showNotConfigured() {
    if (dialog && typeof dialog.showModal === "function") {
      if (!dialog.open) { dialog.showModal(); }
    } else {
      window.alert("El contacto por WhatsApp todavía no está disponible.");
    }
  }

  if (dialogClose && dialog) {
    dialogClose.addEventListener("click", function () { dialog.close(); });
  }

  var waLinks = document.querySelectorAll("[data-wa]");
  Array.prototype.forEach.call(waLinks, function (link) {
    var topic = link.getAttribute("data-wa");
    if (numberIsConfigured()) {
      link.setAttribute("href", buildWhatsAppUrl(topic));
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    } else {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        showNotConfigured();
      });
    }
  });

  /* ----- Footer: contacto opcional ----- */
  var contactList = document.getElementById("footer-contacto");
  if (contactList) {
    if (/^[^\s@<>"']+@[^\s@<>"']+\.[^\s@<>"']+$/.test(CONTACT.email)) {
      var liMail = document.createElement("li");
      var aMail = document.createElement("a");
      aMail.href = "mailto:" + CONTACT.email;
      aMail.textContent = CONTACT.email;
      liMail.appendChild(aMail);
      contactList.appendChild(liMail);
    }
    if (/^[A-Za-z0-9._]{1,30}$/.test(CONTACT.instagram)) {
      var liIg = document.createElement("li");
      var aIg = document.createElement("a");
      aIg.href = "https://www.instagram.com/" + CONTACT.instagram + "/";
      aIg.target = "_blank";
      aIg.rel = "noopener noreferrer";
      aIg.textContent = "Instagram @" + CONTACT.instagram;
      liIg.appendChild(aIg);
      contactList.appendChild(liIg);
    }
  }

  /* ----- Menú móvil ----- */
  var toggle = document.querySelector(".menu-toggle");
  var menu = document.getElementById("menu");

  function setMenu(open) {
    if (!toggle || !menu) { return; }
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (event) {
      if (event.target.closest("a")) { setMenu(false); }
    });
    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("is-open")) {
        setMenu(false);
        toggle.focus();
      }
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 960) { setMenu(false); }
    });
  }

  /* ----- Sombra del encabezado al hacer scroll ----- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (header) { header.classList.toggle("is-scrolled", window.scrollY > 8); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ----- Aparición suave de secciones ----- */
  var revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    Array.prototype.forEach.call(revealItems, function (el) { observer.observe(el); });
  } else {
    Array.prototype.forEach.call(revealItems, function (el) { el.classList.add("is-visible"); });
  }

  /* ----- Año del footer ----- */
  var year = document.getElementById("anio");
  if (year) { year.textContent = String(new Date().getFullYear()); }
})();
