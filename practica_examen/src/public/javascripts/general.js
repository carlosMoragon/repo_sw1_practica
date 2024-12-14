function savecookie(){
    console.log("ENTER");
    fetch('/savecookie', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consent: true }),
    }).then((response) => response.json())
    .then((data) => {
        console.log('Consent saved:', data);
        const footer = document.getElementById('cookie-footer');
        if (footer) {
            footer.style.display = 'none'; // Oculta el footer
        }
    })
    .catch((error) => console.error('Error al guardar cookies:', error));
}