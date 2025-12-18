document.addEventListener('DOMContentLoaded', () => {
    
    // 1. MÚSICA DE FONDO (Corrección para Autoplay)
    const musica = document.getElementById('musica-fondo');
    if(musica) musica.volume = 0.4;
    
    // El navegador bloquea el audio hasta que haya interacción.
    // Esto asegura que la música suene al primer clic en cualquier lugar.
    document.body.addEventListener('click', function() {
        if (musica.paused) {
            musica.play().catch(error => console.log("Esperando interacción para reproducir música..."));
        }
    }, { once: true }); // Se ejecuta una sola vez

    // 2. GENERADOR DE ESTRELLAS (FONDO)
    const starContainer = document.getElementById('stars');
    for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.position = 'fixed';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.width = Math.random() * 2 + 'px';
        star.style.height = star.style.width;
        star.style.backgroundColor = '#fff';
        star.style.borderRadius = '50%';
        star.style.opacity = Math.random() * 0.5 + 0.2;
        star.style.zIndex = '-2';
        starContainer.appendChild(star);
    }

    // 3. GENERADOR DE LUCES CAYENDO
    const lightsContainer = document.getElementById('falling-lights-container');
    const cantidadLuces = 30;

    for (let i = 0; i < cantidadLuces; i++) {
        const light = document.createElement('div');
        light.className = 'falling-light';
        light.style.left = Math.random() * 100 + 'vw';
        light.style.animationDuration = Math.random() * 4 + 3 + 's';
        light.style.animationDelay = -Math.random() * 7 + 's'; 
        lightsContainer.appendChild(light);
    }

    // 4. PACTO DE ORACIÓN (DOBLE CLIC)
    const zonaPacto = document.getElementById('zona-pacto');
    const versiculos = document.getElementById('versiculos-ocultos');
    const instruccion = document.querySelector('.pacto-instruccion');

    zonaPacto.addEventListener('dblclick', () => {
        // Efecto visual al desbloquear
        zonaPacto.style.animation = "none"; // Detener latido
        zonaPacto.style.transform = "scale(1.2)";
        setTimeout(() => zonaPacto.style.transform = "scale(1)", 200);
        
        versiculos.classList.remove('hidden');
        versiculos.classList.add('show-versiculo');
        
        // Cambiar iconos
        zonaPacto.innerHTML = '<span style="font-size:6rem; filter: drop-shadow(0 0 20px var(--neon-main));">🕊️🤍</span>';
        instruccion.innerText = "PACTO SELLADO";
        instruccion.style.color = "#fff";
        instruccion.style.letterSpacing = "6px";
    });

    // 5. MODO DÍA MALO (SWITCH)
    const toggleBadDay = document.getElementById('bad-day-toggle');
    const body = document.body;
    
    toggleBadDay.addEventListener('change', () => {
        if(toggleBadDay.checked) {
            body.classList.add('modo-lavanda');
            if(musica) musica.volume = 0.1; 
        } else {
            body.classList.remove('modo-lavanda');
            if(musica) musica.volume = 0.4;
        }
    });

    // 6. SISTEMA DE BENDICIONES
    const bendicionesDiaMalo = [
        "Respira. Dios es el Juez Supremo y Él tiene el control. 💜",
        "En el mundo tendréis aflicción; pero confiad, yo he vencido al mundo.",
        "No se turbe vuestro corazón. Mi paz os dejo. 🕊️",
        "Esto es solo un mal capítulo, no el final del libro.",
        "Llora si quieres, pero luego levanta la cabeza, hija de Rey."
    ];
    const bendicionesNormales = [
        "Eres el mayor orgullo de mi corazón y del cielo. 📖",
        "Hoy tus leyes son difíciles, pero mañana tu justicia será luz. ⚖️",
        "Tu sonrisa es la prueba de que Dios es un gran artista. ✨",
        "¡Ánimo futura abogada! El Juez del universo está de tu lado.",
        "Eres una mujer conforme al corazón de Dios."
    ];

    const btn = document.getElementById('btn-bendicion');
    const modal = document.getElementById('modal-bendicion');
    const texto = document.getElementById('texto-bendicion');
    const span = document.getElementsByClassName('close')[0];

    btn.onclick = () => {
        const usarMensajesTristes = body.classList.contains('modo-lavanda');
        const lista = usarMensajesTristes ? bendicionesDiaMalo : bendicionesNormales;
        const random = Math.floor(Math.random() * lista.length);
        texto.innerText = lista[random];
        modal.style.display = "block";
    }

    // 7. CIFRADO / TERMINAL
    const btnCifrado = document.getElementById('btn-desencriptar');
    const inputCifrado = document.getElementById('input-llave');
    const modalCarta = document.getElementById('modal-carta');
    const closeCarta = document.getElementsByClassName('close-carta')[0];
    
    // CLAVES
    const LLAVE_SECRETA = "010925"; 
    const PALABRA_CLAVE_ALT = "SOLOENLAPELOTA"; 

    function ejecutarDesencriptacion() {
        const valor = inputCifrado.value.trim().toUpperCase();
        if (valor === LLAVE_SECRETA || valor === PALABRA_CLAVE_ALT) {
            crearLluviaCorazones();
            modalCarta.style.display = "block";
            inputCifrado.value = ""; 
            inputCifrado.style.borderColor = "#33ff33";
        } else {
            inputCifrado.style.borderColor = "red";
            inputCifrado.style.animation = "shake 0.3s";
            setTimeout(() => inputCifrado.style.animation = "", 300);
        }
    }

    btnCifrado.addEventListener('click', ejecutarDesencriptacion);
    inputCifrado.addEventListener('keypress', (e) => { if(e.key === 'Enter') ejecutarDesencriptacion(); });

    // CERRAR MODALES
    span.onclick = () => modal.style.display = "none";
    closeCarta.onclick = () => modalCarta.style.display = "none";
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = "none";
        if (event.target == modalCarta) modalCarta.style.display = "none";
    }

    
    // EFECTO LLUVIA CORAZONES
    function crearLluviaCorazones() {
        const rainContainer = document.getElementById('rain-container');
        for(let i=0; i<50; i++) {
            setTimeout(() => {
                const heart = document.createElement('div');
                heart.classList.add('heart');
                heart.innerHTML = "💜";
                heart.style.left = Math.random() * 95 + "vw";
                heart.style.animationDuration = (Math.random() * 2 + 3) + "s"; 
                rainContainer.appendChild(heart);
                setTimeout(() => { heart.remove() }, 5000);
            }, i * 150); 
        }
    }

    // PARALLAX SUAVE (MOUSE)
    document.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.015;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.02;
        document.querySelectorAll('.card-glass').forEach(card => {
            card.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });
});