// Lógica para que solo uno esté abierto a la vez, pero se pueda cerrar también
    const checkboxes = document.querySelectorAll('.acordeon input[type="checkbox"]');
    checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        checkboxes.forEach((other) => {
            if (other !== checkbox) other.checked = false;
        });
    }
    });
});