// Verificar Conexión
console.log("Conexión establecida");

// Función para verificar si todos los campos del formulario están completos
function verificarFormulario(event) {
    const formulario = document.getElementById('contactForm');
    const campos = formulario.querySelectorAll('input, textarea');
    const todosCompletos = [...campos].every(campo => campo.value.trim() !== '');

    console.log(todosCompletos ? 'Todos los campos están completos.' : 'Faltan campos por completar.');

    // Si no todos los campos están completos, evitar el envío del formulario
    if (!todosCompletos) {
        event.preventDefault();
        alert("Por favor, completa todos los campos.");
    }
}

// Asegurarse de que el DOM esté completamente cargado antes de agregar el evento
document.addEventListener("DOMContentLoaded", function() {
    const formulario = document.getElementById('contactForm');
    if (formulario) {
        formulario.addEventListener('submit', verificarFormulario);
    }
});

// Lista de productos
let productos = [];

// Función para mostrar productos por categoría
function showProducts(category, containerId) {
    const container = document.getElementById(containerId);

    if (container.classList.contains("active")) {
        container.classList.remove("active");
        container.innerHTML = ""; // Limpiar el contenido
        return;
    }

    container.innerHTML = ""; // Limpiar contenido al mostrar
    container.classList.add("active");

    const filteredProducts = productos.filter(producto => producto.name.toLowerCase().includes(category.toLowerCase()));

    filteredProducts.forEach(producto => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const productName = document.createElement('h5');
        productName.classList.add('card-title');
        productName.textContent = producto.name;

        const productPrice = document.createElement('h5');
        productPrice.classList.add('card-title');
        productPrice.textContent = `${producto.price} $`;

        const button = document.createElement('button');
        button.classList.add('btn', 'btn-secondary');
        button.textContent = 'Comprar';
        button.onclick = function () { buyProduct(producto); };

        cardBody.appendChild(productName);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(button);
        card.appendChild(cardBody);

        container.appendChild(card);
    });
}

// Función para guardar producto en el carrito y mostrarlo
function buyProduct(producto) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === producto.id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id: producto.id, name: producto.name, price: producto.price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showCart();
}

// Función para eliminar producto del carrito
function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Filtrar productos, excluyendo el que queremos eliminar
    const updatedCart = cart.filter(item => item.id !== productId);

    // Actualizar el localStorage y volver a mostrar el carrito
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    showCart();
}

// Función para mostrar productos en el carrito
function showCart() {
    const cartContainer = document.getElementById('cart-container');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cartContainer.innerHTML = ""; // Limpiar contenido

    if (cart.length === 0) {
        cartContainer.innerHTML = "<p>El carrito está vacío.</p>";
        return;
    }

    cart.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const productName = document.createElement('h5');
        productName.classList.add('card-title');
        productName.textContent = `${item.name} (x${item.quantity})`;

        const productPrice = document.createElement('p');
        productPrice.classList.add('card-text');
        productPrice.textContent = `Precio: ${item.price} $`;

        const totalPrice = document.createElement('p');
        totalPrice.classList.add('card-text');
        totalPrice.textContent = `Total: ${item.price * item.quantity} $`;

        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.textContent = 'Borrar';
        deleteButton.onclick = function () { removeFromCart(item.id); };

        cardBody.appendChild(productName);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(totalPrice);
        cardBody.appendChild(deleteButton);
        card.appendChild(cardBody);

        cartContainer.appendChild(card);
    });
}

// Función para cerrar el popup
function closePopup() {
    const popup = document.getElementById("description-popup");
    const overlay = document.getElementById("overlay");

    if (popup && overlay) {
        popup.classList.remove("active");
        overlay.classList.remove("active");
    }
}

// Cargar datos de un archivo JSON
fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        productos = data; // Usar "=" para asignar el arreglo completo
        console.log("Productos cargados:", productos);
    })
    .catch(error => {
        console.error("Error al cargar el archivo JSON:", error);
    });

// Mostrar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', showCart);

// Función para abrir el popup del carrito
function openCartPopup() {
    const popup = document.getElementById("cart-popup");
    const overlay = document.getElementById("cart-overlay");

    if (popup && overlay) {
        popup.classList.add("active");
        overlay.classList.add("active");
    }

    showCart(); // Mostrar productos en el popup
}

// Función para cerrar el popup del carrito
function closeCartPopup() {
    const popup = document.getElementById("cart-popup");
    const overlay = document.getElementById("cart-overlay");

    if (popup && overlay) {
        popup.classList.remove("active");
        overlay.classList.remove("active");
    }
}

// Mostrar productos al cargar
document.getElementById("show-cart-btn").addEventListener("click", openCartPopup);

// Función para mostrar el popup de agradecimiento
function showThankYouPopup() {
    // Crear el overlay
    const overlay = document.createElement('div');
    overlay.id = 'thank-you-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    overlay.style.zIndex = '999';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';

    // Crear el popup
    const popup = document.createElement('div');
    popup.id = 'thank-you-popup';
    popup.style.backgroundColor = '#fff';
    popup.style.padding = '20px';
    popup.style.borderRadius = '10px';
    popup.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
    popup.style.textAlign = 'center';

    // Mensaje de agradecimiento
    const message = document.createElement('p');
    message.textContent = 'Gracias por cuidar a tu Galgo';
    message.style.marginBottom = '20px';
    message.style.fontSize = '18px';
    message.style.fontWeight = 'bold';

    // Botón para cerrar el popup
    const closeButton = document.createElement('button');
    closeButton.textContent = 'X';
    closeButton.style.backgroundColor = '#28a745';
    closeButton.style.color = '#fff';
    closeButton.style.border = 'none';
    closeButton.style.padding = '5px 10px';
    closeButton.style.cursor = 'pointer';
    closeButton.style.borderRadius = '5px';

    closeButton.onclick = function () {
        document.body.removeChild(overlay);
    };

    // Añadir elementos al popup
    popup.appendChild(message);
    popup.appendChild(closeButton);
    overlay.appendChild(popup);

    // Añadir el overlay al body
    document.body.appendChild(overlay);
}

// Asignar la función al botón de "Finalizar compra"
document.getElementById('finalizar-compra-btn').addEventListener('click', function() {
    showThankYouPopup();
    closeCartPopup();
});
