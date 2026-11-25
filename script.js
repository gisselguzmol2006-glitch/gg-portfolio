const PROYECTOS = {
    "album": {
        tag: "Identidad Visual & Mockups",
        titulo: "Diseño de Identidad de Álbum",
        descripcion: "Desarrollo integral de la identidad visual de un álbum musical: paleta cromática, tipografía, pósters y mockups para Instagram.",
        rol: "Diseño de Identidad",
        tools: "Adobe Photoshop",
        tipo: "imagenes",
        archivos: [
            "assets/Album/1 Album.jpg",
            "assets/Album/2 Album.jpg",
            "assets/Album/3 Album.jpg",
            "assets/Album/4 Album.png"
        ],
        link: ""
    },
    "videoarte-verde": {
        tag: "Videoarte / Audiovisual",
        titulo: "Neo Got My Back",
        descripcion: "Pieza personal de videoarte centrada en el color verde. Combina mapping sobre pared con el registro de mis propias sombras.",
        rol: "Concepto, Registro, Performance & Edición",
        tools: "Adobe Premiere Pro, Mapping",
        tipo: "video",
        archivo: "assets/Neo Got My Back.mp4",
        link: ""
    },
    "cortometraje": {
        tag: "Audiovisual / Cine",
        titulo: "Vuelve a mí",
        descripcion: "Cortometraje universitario realizado en equipo. Estuve a cargo de la dirección general, edición y postproducción final.",
        rol: "Dirección y Edición",
        tools: "Adobe Premiere Pro",
        tipo: "drive",
        archivo: "https://drive.google.com/file/d/1KrxaYoYYwGAtBKC0o2X9dTYfcK3DqlG3/view?usp=sharing",
        link: ""
    },
    "editorial": {
        tag: "Diseño Editorial",
        titulo: "Revista: Artículos",
        descripcion: "Diseño y maquetación de artículos interiores estructurados con retículas.",
        rol: "Diseño Editorial & Retícula",
        tools: "Adobe Illustrator",
        tipo: "pdf",
        archivo: "assets/final tipografia reticula-19-27.pdf",
        link: ""
    },
    "posters": {
        tag: "Diseño",
        titulo: "Tapas de revista",
        descripcion: "Tapas de revista explorando jerarquía tipográfica, contraste y composición.",
        rol: "Diseño Gráfico",
        tools: "Adobe Illustrator",
        tipo: "imagenes",
        archivos: [
            "assets/Mine_Mesa de trabajo 1.png",
            "assets/MINEee_Mesa de trabajo 1.png"
        ],
        link: ""
    },
    "edicion-keyframes": {
        tag: "Edición de Video / Motion graphics",
        titulo: "Edición Dinámica con Keyframes",
        descripcion: "Pieza de montaje dinámico enfocada en el control de keyframes, ritmo y transiciones.",
        rol: "Edición & Motion Graphics",
        tools: "Adobe After Effects, Adobe Premiere Pro",
        tipo: "video",
        archivo: "assets/keyframes.mp4",
        link: ""
    }
};

document.addEventListener("DOMContentLoaded", () => {
    const splash = document.getElementById("splash");
    const contenido = document.getElementById("contenido-principal");

    const entrarWeb = () => {
        if (splash) splash.classList.add("esconder");
        if (contenido) contenido.classList.remove("oculto");
        document.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
    };

    if (splash) splash.addEventListener("click", entrarWeb);
    setTimeout(entrarWeb, 2200);

    // Brillo reactivo al cursor en tarjetas
    const tarjetas = document.querySelectorAll(".proyecto-card");
    tarjetas.forEach((card) => {
        card.addEventListener("mousemove", (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty("--x", `${e.clientX - rect.left}px`);
            card.style.setProperty("--y", `${e.clientY - rect.top}px`);
        });
    });

    // Filtros
    const botonesFiltro = document.querySelectorAll(".filtro-btn");
    botonesFiltro.forEach((btn) => {
        btn.addEventListener("click", () => {
            botonesFiltro.forEach((b) => b.classList.remove("activo"));
            btn.classList.add("activo");
            const filtro = btn.dataset.filter;
            tarjetas.forEach((card) => {
                card.classList.toggle("oculta-filtro", filtro !== "todos" && card.dataset.category !== filtro);
            });
        });
    });

    // Modal
    const modal = document.getElementById("proyecto-modal");
    const btnCerrar = document.getElementById("cerrar-modal");
    const modalMedia = document.getElementById("modal-media");
    const modalLink = document.getElementById("modal-link");

    let fotosActuales = [];
    let indiceFoto = 0;

    const mostrarGaleria = () => {
        const ruta = encodeURI(fotosActuales[indiceFoto]);
        const total = fotosActuales.length;

        const flechas = total > 1
            ? `<button class="galeria-btn galeria-prev" id="btn-prev" aria-label="Anterior">‹</button>
               <button class="galeria-btn galeria-next" id="btn-next" aria-label="Siguiente">›</button>
               <span class="galeria-contador">${indiceFoto + 1} / ${total}</span>`
            : "";

        const miniaturas = total > 1
            ? `<div class="galeria-thumbs">
                ${fotosActuales.map((f, i) => `
                    <img class="galeria-thumb ${i === indiceFoto ? "activa" : ""}"
                         src="${encodeURI(f)}"
                         data-index="${i}"
                         alt="Vista ${i + 1}">
                `).join("")}
               </div>`
            : "";

        modalMedia.innerHTML = `
            <div class="visor-box">
                <img src="${ruta}" alt="Imagen del proyecto"
                     onerror="this.outerHTML='<div class=\\'media-error\\'>No se encontró la imagen:<br><b>${fotosActuales[indiceFoto]}</b></div>'">
                ${flechas}
            </div>
            ${miniaturas}
        `;

        if (total > 1) {
            document.getElementById("btn-prev").addEventListener("click", () => {
                indiceFoto = (indiceFoto - 1 + total) % total;
                mostrarGaleria();
            });
            document.getElementById("btn-next").addEventListener("click", () => {
                indiceFoto = (indiceFoto + 1) % total;
                mostrarGaleria();
            });
            modalMedia.querySelectorAll(".galeria-thumb").forEach((thumb) => {
                thumb.addEventListener("click", () => {
                    indiceFoto = Number(thumb.dataset.index);
                    mostrarGaleria();
                });
            });
        }
    };

    tarjetas.forEach((card) => {
        card.addEventListener("click", () => {
            const p = PROYECTOS[card.dataset.project];
            if (!p) return;

            document.getElementById("modal-tag").textContent = p.tag;
            document.getElementById("modal-titulo").textContent = p.titulo;
            document.getElementById("modal-descripcion").textContent = p.descripcion;
            document.getElementById("modal-rol").textContent = p.rol;
            document.getElementById("modal-tools").textContent = p.tools;

            fotosActuales = [];
            indiceFoto = 0;

            if (p.tipo === "video") {
                const ruta = encodeURI(p.archivo);
                modalMedia.innerHTML = `
                    <div class="visor-box">
                        <video src="${ruta}" controls playsinline preload="metadata"></video>
                    </div>
                `;
            } else if (p.tipo === "drive") {
                const match = p.archivo.match(/\/d\/([^/]+)/);
                const id = match ? match[1] : "";
                modalMedia.innerHTML = `
                    <div class="visor-box">
                        <iframe style="width:100%; aspect-ratio:16/9; border:none; display:block;"
                                src="https://drive.google.com/file/d/${id}/preview"
                                allow="autoplay"
                                allowfullscreen></iframe>
                    </div>
                `;
            } else if (p.tipo === "pdf") {
                const ruta = encodeURI(p.archivo);
                modalMedia.innerHTML = `
                    <div class="visor-box">
                        <iframe class="visor-pdf" src="${ruta}#view=FitH" title="${p.titulo}"></iframe>
                    </div>
                `;
                modalLink.href = ruta;
                modalLink.textContent = "Abrir PDF completo ↗";
                modalLink.classList.remove("oculto-link");
            } else if (p.tipo === "imagenes" && p.archivos && p.archivos.length > 0) {
                fotosActuales = p.archivos;
                mostrarGaleria();
            } else {
                modalMedia.innerHTML = `<div class="media-error">Todavía no cargaste archivos para este proyecto.</div>`;
            }

            if (p.tipo !== "pdf") {
                if (p.link) {
                    modalLink.href = p.link;
                    modalLink.textContent = "Ver proyecto ↗";
                    modalLink.classList.remove("oculto-link");
                } else {
                    modalLink.classList.add("oculto-link");
                }
            }

            modal.classList.remove("oculto-modal");
            modal.setAttribute("aria-hidden", "false");
        });
    });

    const cerrarModal = () => {
        modal.classList.add("oculto-modal");
        modal.setAttribute("aria-hidden", "true");
        modalMedia.innerHTML = "";
    };

    if (btnCerrar) btnCerrar.addEventListener("click", cerrarModal);
    if (modal) modal.addEventListener("click", (e) => { if (e.target === modal) cerrarModal(); });

    document.addEventListener("keydown", (e) => {
        if (!modal || modal.classList.contains("oculto-modal")) return;
        if (e.key === "Escape") cerrarModal();
        if (e.key === "ArrowRight" && fotosActuales.length > 1) {
            indiceFoto = (indiceFoto + 1) % fotosActuales.length;
            mostrarGaleria();
        }
        if (e.key === "ArrowLeft" && fotosActuales.length > 1) {
            indiceFoto = (indiceFoto - 1 + fotosActuales.length) % fotosActuales.length;
            mostrarGaleria();
        }
    });
});