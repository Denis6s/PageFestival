document.addEventListener("DOMContentLoaded", function () {
  navegacionFija();
  crearGaleria();
  resaltarEnlace();
  scrollNav();
});

function navegacionFija() {
  const header = document.querySelector(".header");
  const sobreFestival = document.querySelector(".sobre-festival");

  //Escuchamos por scroll
  document.addEventListener("scroll", function () {
    if (sobreFestival.getBoundingClientRect().bottom < 1) {
      header.classList.add("fixed");
    } else {
      header.classList.remove("fixed");
    }
  });
}

function crearGaleria() {
  const cantidadImagen = 16;
  const galeria = document.querySelector(".galeria-imagenes");

  for (let index = 1; index <= cantidadImagen; index++) {
    const imagen = document.createElement("IMG");
    imagen.src = `src/img/gallery/full/${index}.jpg`;
    imagen.alt = "Imagen Galeria";

    //Event Handler : detecta y responde lo que clickea el usuario
    imagen.onclick = function () {
      mostrarImagen(index);
    };

    //Agregamos al HTML
    galeria.appendChild(imagen);
  }
}

function mostrarImagen(index) {
  //generando la imgen el modal

  const imagen = document.createElement("IMG");
  imagen.src = `src/img/gallery/full/${index}.jpg`;
  imagen.alt = "Imagen Galeria";

  //creando la ventana modal
  const modal = document.createElement("DIV");
  modal.classList.add("modal");
  modal.onclick = cerrarModal;
  modal.appendChild(imagen);

  //Agregar al HTML
  const body = document.querySelector("body");
  body.classList.add("overflow-hidden");
  body.appendChild(modal);
}

function cerrarModal() {
  const modal = document.querySelector(".modal");
  modal.classList.add("fade-out");

  setTimeout(() => {
    modal?.remove();

    const body = document.querySelector("body");
    body.classList.remove("overflow-hidden");
  }, 500);
}
function resaltarEnlace() {
  document.addEventListener("scroll", function () {
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".navegacion-principal a");

    //Iterando sobre las secciones
    let actual = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        actual = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + actual) {
        link.classList.add("active");
      }
    });
  });
}
function scrollNav() {
  const navLinks = document.querySelectorAll(".navegacion-principal a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const sectionScroll = e.target.getAttribute("href");
      const section = document.querySelector(sectionScroll);

      section.scrollIntoView({ behavior: "smooth" });
    });
  });
}
