import { Beverage } from "./class.js";

let coca = new Beverage("Coca", 100, 1, 1);
let sprite = new Beverage("Sprite", 200, 1, 2);
let fanta = new Beverage("Fanta", 300, 1, 3);
let manaos = new Beverage("Manaos", 50, 1, 4);
let pepsi = new Beverage("Pepsi", 150, 1, 5);
// By default they all have 1 quantity, but we can change it
let products = [coca, sprite, fanta, manaos, pepsi];
console.log("Products: ", products);
// The products would probably come from a database, but for this example, we will use this array
let bag = [];

document.write("<h3>Puede elegir entre los siguientes productos: " + products.map(a => a.name) + "<h3>");
products.forEach(a => {
    let possibleProducts = document.getElementById("possibleDrinks");
    possibleProducts.innerHTML += "<p>" + a.name + " - Precio: $" + a.price + "<p>";
});

//onClick button for add cart
function addCart() {
    // let product = prompt("Ingrese el producto que desea agregar al carrito");
    let product = document.getElementById("drink").value;
    if (product == "") {
        alert("Debe ingresar un producto");
        return;
    }
    let selectedProduct = products.filter(a => a.name.toUpperCase() === product.toUpperCase());
    if (!selectedProduct.length > 0) {
        alert("El producto no existe");
        return;
    }
    bag.push(selectedProduct[0]);
    console.log(bag);
    showCart();
}

function getTotal() {
    let total = 0;
    bag.forEach(a => total += a.calculateTotalAmount());
    document.getElementById("sumOfProducts").innerText = "Total:" + total;
}

function removeProduct(id) {
    console.log("id: ", id);
    bag = bag.filter(a => a.id !== id);
    showCart();
}

function addQuantity(id) {
    console.log("id: ", id);
    product = bag.filter(a => a.id === id)[0];
    product.quantity++;
    showCart();
}

//onClick button to show cart
function showCart() {
    let outputText = "<ul>";
    bag.forEach((beverage, i) => outputText += "<li id=" + beverage.id + "> Producto "+ i + ": " + beverage.name + "</li>" + 
    "<button onclick='removeProduct(" + beverage.id + ")'>Eliminar</button>"
    + "<br>"
    + "<button onclick='addQuantity(" + beverage.id + ")'>+</button>");
    // TODO ver por que no funciona la funcion remove product
    outputText += "</ul>";
    console.log(outputText);
    document.getElementById("cart-result").innerHTML = outputText;
    getTotal();
}


document.getElementById("addDrink").addEventListener("click", addCart);
