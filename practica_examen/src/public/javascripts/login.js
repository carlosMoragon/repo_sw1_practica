    // Maneja el fragmento de la URL
    function handleFragment() {
        const fragment = window.location.hash; // Obtén el fragmento después de #
        const registerDiv = document.getElementById("register");
        const loginDiv = document.getElementById("login");

        if (fragment === "#register") {
            registerDiv.style.display = "block"; // Muestra el formulario de registro
            loginDiv.style.display = "none";    // Oculta el formulario de login
        } else {
            registerDiv.style.display = "none"; // Oculta el formulario de registro
            loginDiv.style.display = "block";  // Muestra el formulario de login
        }
    }

    // Llama a la función al cargar la página
    handleFragment();

    // Escucha cambios en el fragmento de la URL
    window.addEventListener("hashchange", handleFragment);