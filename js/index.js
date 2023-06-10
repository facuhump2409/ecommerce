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
initializeBag();
console.log("initial bag: ", bag);
showCart();

products.forEach(a => {
    let possibleProducts = document.getElementById("possibleDrinks");
    possibleProducts.innerHTML += "<p>" + a.name + " - Precio: $" + a.price + "<p>";
});

function initializeBag() {
    let bagFromStorage = sessionStorage.getItem('bag');
    bagFromStorage = JSON.parse(sessionStorage.getItem('bag')) || [];
    bagFromStorage.forEach(a => {
        bag.push(Object.assign(new Beverage, a));
    });
}
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
    let elementInBag = bag.find(a => a.name === selectedProduct[0].name);
    if(elementInBag) {
        addQuantity(elementInBag.id);
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

//onClick button to show cart
function showCart() {
    console.log("bag: ", bag);
    sessionStorage.setItem('bag', JSON.stringify(bag));
    let outputText = "<ul>"; 
    for (let i = 0; i < bag.length; i++) {
        let {id, name, quantity} = bag[i];
        outputText += "<div id=" + id + " class='bagElement'> <li> Producto "+ i + ": " + name + ", cantidad: " + quantity +"</li>" + 
        "<button class='deleteElement' onClick='removeProduct(" + id + ")'>Eliminar</button>"
        + "<br>"
        + "<button class='addQuantity' onClick='addQuantity(" + id + ")'>+</button>"
        + "<button class='removeQuantity' onClick='removeQuantity(" + id + ")'>-</button>"
        + "</div>";
    }

    outputText += "</ul>";
    console.log(outputText);
    document.getElementById("cart-result").innerHTML = outputText;
    getTotal();
}

window.addQuantity = (id) => {
    console.log("addQuantity")
    let selectedProduct = bag.filter(a => a.id === id)[0];
    console.log("selectedProduct: ", selectedProduct);
    let {quantity} = selectedProduct;
    console.log("quantity: ", quantity)
    let product = {
        ...selectedProduct,
        quantity: quantity + 1
    };
    console.log("product: ", product);
    let objectProduct = Object.assign(new Beverage, product);
    bag = bag.map(u => u.id !== objectProduct.id ? u : objectProduct);
    showCart();
}

window.removeQuantity = (id) => {
    console.log("removeQuantity")
    let selectedProduct = bag.filter(a => a.id === id)[0];
    console.log("selectedProduct: ", selectedProduct);
    let {quantity} = selectedProduct;
    console.log("quantity: ", quantity)
    if(quantity === 1) {
        removeProduct(id);
        return;
    }
    let product = {
        ...selectedProduct,
        quantity: quantity - 1
    };
    console.log("product: ", product);
    let objectProduct = Object.assign(new Beverage, product);
    bag = bag.map(u => u.id !== objectProduct.id ? u : objectProduct);
    showCart();
}

window.removeProduct = (id) => {
    console.log("id from remove product: ", id);
    bag = bag.filter(a => a.id !== id);
    showCart();
}

document.getElementById("addDrink").addEventListener("click", addCart);
