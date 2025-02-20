// Array para almacenar los productos en el carrito (con persistencia en localStorage)
let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Funcion para renderizar los productos en el carrito
function renderCartItems() {
  const cartItemsList = document.getElementById("cart-items-list");
  cartItemsList.innerHTML = "";

  if (cartItems.length === 0) {
    cartItemsList.innerHTML = "<p>El carrito está vacío</p>";
    return;
  }

  cartItems.forEach((item, index) => {
    const itemElement = document.createElement("div");
    itemElement.className = "cart-item";
    itemElement.innerHTML = `
      <p>${item.name} - $${item.price}</p>
      <button class="btn btn-sm btn-danger remove-item-btn" data-index="${index}">Eliminar</button>
    `;
    cartItemsList.appendChild(itemElement);
  });

  // Agregar evento a cada botón de eliminar
  document.querySelectorAll(".remove-item-btn").forEach(button => {
    button.addEventListener("click", (event) => {
      const index = event.target.getAttribute("data-index");
      removeFromCart(index);
    });
  });
}

// Función para agregar un producto al carrito y guardarlo en localStorage
function addToCart(productName, productPrice) {
  const product = {
    name: productName,
    price: productPrice
  };

  // Agregar producto al carrito
  cartItems.push(product);
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Guardar en localStorage
  renderCartItems();
  alert("Producto agregado al carrito!");
}

// Función para eliminar un producto del carrito y actualizar localStorage
function removeFromCart(index) {
  cartItems.splice(index, 1);
  localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Actualizar en localStorage
  renderCartItems();
}

// Asignar el evento de click a todos los botones de "Agregar al Carrito"
document.querySelectorAll('[id^="add-to-cart-btn"]').forEach(button => {
  button.addEventListener('click', function() {
    const productName = this.getAttribute('data-product-name');
    const productPrice = this.getAttribute('data-product-price');
    
    addToCart(productName, parseFloat(productPrice)); // Usamos parseFloat para asegurar que el precio sea un numero
  });
});

// Renderizar el carrito al cargar la pagina
document.addEventListener("DOMContentLoaded", renderCartItems);
