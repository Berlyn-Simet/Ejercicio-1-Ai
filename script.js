/*
 * script.js
 * Este archivo maneja la lógica de la interactividad de la página.
 * Principalmente, se encarga del sistema de cambio de tema (oscuro/claro).
 */

// Esperamos a que todo el contenido del DOM esté cargado para ejecutar el script.
document.addEventListener('DOMContentLoaded', () => {

    // =========================================================================
    // =========== LÓGICA PARA EL CAMBIO DE TEMA (OSCURO/CLARO) ================
    // =========================================================================

    // 1. OBTENER ELEMENTOS DEL DOM
    // ------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const themeIcon = themeToggleBtn.querySelector('i');
    const htmlElement = document.documentElement; // La etiqueta <html>

    // 2. FUNCIÓN PARA APLICAR UN TEMA
    // ------------------------------------
    // Esta función centraliza la lógica para cambiar el tema.
    const applyTheme = (theme) => {
        // Establece el atributo 'data-theme' en el elemento <html>.
        // El CSS reacciona a este cambio para aplicar los colores correctos.
        htmlElement.setAttribute('data-theme', theme);
        
        // Guarda la preferencia del usuario en el almacenamiento local del navegador.
        // Esto permite que la elección persista entre visitas.
        localStorage.setItem('theme', theme);

        // Actualiza el icono del botón para reflejar el tema actual.
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    };

    // 3. INICIALIZACIÓN DEL TEMA
    // ------------------------------------
    // Esta función se encarga de que el icono del botón sea correcto al cargar la página,
    // ya que el tema se aplica con el script en el <head>.
    const initializeIcon = () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        if (currentTheme === 'dark') {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    };

    // 4. EVENT LISTENERS (ESCUCHADORES DE EVENTOS)
    // ------------------------------------
    
    // a) Clic en el botón de cambio de tema
    themeToggleBtn.addEventListener('click', () => {
        // Obtenemos el tema actual del atributo 'data-theme'.
        const currentTheme = htmlElement.getAttribute('data-theme');
        // Cambiamos al tema opuesto.
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });

    // b) Detección de cambios en la preferencia del sistema operativo
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        // Solo cambiamos el tema automáticamente si el usuario NO ha elegido un tema manualmente.
        // Es decir, si no hay nada guardado en localStorage.
        const savedTheme = localStorage.getItem('theme');
        if (!savedTheme) {
            const newTheme = e.matches ? 'dark' : 'light';
            applyTheme(newTheme);
        }
    });

    // 5. EJECUCIÓN INICIAL
    // ------------------------------------
    initializeIcon();
});