document.addEventListener('DOMContentLoaded', () => {
    const acceptButton = document.getElementById("acceptCookies");
    if (acceptButton) {
        acceptButton.addEventListener('click', (e) => {
            fetch('/savecookies', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ consent: true }),
            })
            .then((response) => response.json())
            .then((data) => {
                console.log('Consent saved:', data);
                const footer = document.getElementById('footer');
                if (footer) {
                    footer.style.display = 'none'; // Oculta el footer
                }
            })
            .catch((error) => console.error('Error al guardar cookies:', error));
        });
    }
});
