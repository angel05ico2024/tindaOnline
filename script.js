// ==========================================================
// LÓGICA DE MODALES: Catálogo, Contacto y Carrito
// ==========================================================

    
document.addEventListener('DOMContentLoaded', () => {
    // 1. Elementos de Apertura (Enlaces)
    const openCatalogo = document.getElementById('openCatalogoModal');
    const openContacto = document.getElementById('openContactoModal');
    const openCarrito  = document.getElementById('openCarritoModal');
    
    // 2. Elementos de Modales (Contenedores)
    const catalogoModal = document.getElementById('catalogoModal');
    const contactoModal = document.getElementById('contactoModal');
    const carritoModal  = document.getElementById('carritoModal');
    
    // 3. Elementos de Cierre (Botones 'x')
    const closeCatalogo = document.querySelector('.catalogo-close');
    const closeContacto = document.querySelector('.contacto-close');
    const closeCarrito  = document.querySelector('.carrito-close');
    
    // Función genérica para abrir un modal
    const openModal = (modal) => {
        if (modal) {
            modal.style.display = 'block';
        }
    };

    // Función genérica para cerrar un modal
    const closeModal = (modal) => {
        if (modal) {
            modal.style.display = 'none';
        }
    };

    // --- ABRIR MODALES ---
    if (openCatalogo) openCatalogo.onclick = () => openModal(catalogoModal);
    if (openContacto) openContacto.onclick = () => openModal(contactoModal);
    if (openCarrito) openCarrito.onclick = () => openModal(carritoModal);

    // --- CERRAR MODALES (Botón X) ---
    if (closeCatalogo) closeCatalogo.onclick = () => closeModal(catalogoModal);
    if (closeContacto) closeContacto.onclick = () => closeModal(contactoModal);
    if (closeCarrito) closeCarrito.onclick = () => closeModal(carritoModal);

    // --- CERRAR MODALES (Click fuera) ---
    window.onclick = function(event) {
        if (event.target == catalogoModal) {
            closeModal(catalogoModal);
        }
        if (event.target == contactoModal) {
            closeModal(contactoModal);
        }
        if (event.target == carritoModal) {
            closeModal(carritoModal);
        }
    }
    
    // ==========================================================
    // Mantenemos aquí la lógica del Carrusel (código que ya tenías)
    // ==========================================================
    // ... tu código del carrusel sigue aquí ... 
    
    // (Asegúrate de que la función del carrusel SIEMPRE está dentro del DOMContentLoaded)
    const carousel = document.querySelector('.carousel');
    // ... el resto de tu lógica de carrusel ...
    const logoutLink = document.getElementById('logoutLink');

    if (logoutLink) {
        logoutLink.addEventListener('click', (event) => {
            event.preventDefault(); // Evita la navegación por defecto del <a>

            // 1. Simular la limpieza de la sesión (si usas localStorage o Cookies)
            // Ejemplo: localStorage.removeItem('authToken'); 
            
            // 2. Limpiar el carrito (para simular una sesión nueva)
            cartItems = [];
            updateCartModal(); // Actualiza la vista del carrito a vacío
            
            // 3. Redirigir al usuario a la página de inicio de sesión
            alert("Sesión cerrada correctamente. Serás redirigido al inicio de sesión.");
            window.location.href = 'login.html'; 
        });
    }

    // ... el resto de tu código JS (modales, carrusel, carrito) ...
});


// ==========================================================
// LÓGICA DEL CARRITO DE COMPRAS
// ==========================================================

// Elementos Globales del Carrito
let cartItems = [];
let cartTotal = 0;
const carritoModalContent = document.getElementById('carritoModal').querySelector('.modal-content');
const openCarritoLink = document.getElementById('openCarritoModal');

// Función para añadir un producto al carrito
function addToCart(event) {
    // 1. Obtener la tarjeta del producto (el padre del botón)
    const productCard = event.target.closest('.product-card');

    // 2. Extraer la información del producto
    const title = productCard.querySelector('h3').textContent;
    const priceText = productCard.querySelector('.price').textContent;
    const imageSrc = productCard.querySelector('img').src;

    // Limpiar y convertir el precio a número
    const price = parseFloat(priceText.replace('$', '').trim());

    // 3. Crear el objeto del artículo
    const item = {
        title: title,
        price: price,
        image: imageSrc,
        quantity: 1
    };

    // 4. Agregar al array del carrito (o actualizar cantidad si ya existe)
    const existingItem = cartItems.find(i => i.title === title);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cartItems.push(item);
    }
    
    // 5. Actualizar la visualización y el total
    updateCartModal();
    
    // Opcional: Feedback visual
    alert(`"${title}" añadido al carrito.`);
}

// Función para actualizar el contenido del modal del carrito
function updateCartModal() {
    let listHTML = '<h3>Artículos en tu Carrito:</h3>';
    cartTotal = 0;

    if (cartItems.length === 0) {
        listHTML += '<p>Tu carrito está vacío.</p>';
        carritoModalContent.querySelector('h2').textContent = '🛒 Tu Carrito de Compras (0 artículos)';
    } else {
        listHTML += '<div class="cart-list">';
        
        cartItems.forEach(item => {
            const itemSubtotal = item.price * item.quantity;
            cartTotal += itemSubtotal;
            
            // Estructura HTML para cada artículo
            listHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.title}" class="cart-img">
                    <div class="item-details">
                        <h4>${item.title}</h4>
                        <p>${item.quantity} x $${item.price.toFixed(2)} = <strong>$${itemSubtotal.toFixed(2)}</strong></p>
                    </div>
                </div>
            `;
        });

        listHTML += '</div>';
        
        // Actualizar el título y el contador del carrito en el nav
        const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
        carritoModalContent.querySelector('h2').textContent = `🛒 Tu Carrito de Compras (${totalItems} artículos)`;
        openCarritoLink.innerHTML = `🛒 Carrito (${totalItems})`; // Actualiza el enlace del nav

    }
    
    // Añadir el resumen del total
    listHTML += `<div class="cart-summary">
                    <h4>Total: <strong>$${cartTotal.toFixed(2)}</strong></h4>
                 </div>`;
                 
    // Encontrar el div donde se debe inyectar el contenido del carrito (lo crearemos en el paso 2)
    const carritoBody = carritoModalContent.querySelector('#carrito-body');
    if (carritoBody) {
        carritoBody.innerHTML = listHTML;
    }
}


// 6. Asignar el evento a todos los botones "Añadir al Carrito"
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach(button => {
    button.addEventListener('click', addToCart);
});

// Llamamos a updateCartModal al inicio para asegurar que el contador esté en 0
updateCartModal();
// ... dentro de la función updateCartModal()

        // Actualizar el título y el contador del carrito en el modal
        carritoModalContent.querySelector('h2').textContent = `🛒 Tu Carrito de Compras (${totalItems} artículos)`; 
        
        // El enlace en el nav (que también es correcto)
        openCarritoLink.innerHTML = `🛒 Carrito (${totalItems})`; 
// ...
