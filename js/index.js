let products = ["Coca", "Sprite", "Fanta", "Manaos", "Pepsi"];
let bag = [];

document.write("<h3>Puede elegir entre los siguientes productos: " + products + "<h3>");

document.write("<h3>El carrito tiene los siguientes productos<h3>" + "<br>");

//onClick button for add cart
function addCart() {
    // let product = prompt("Ingrese el producto que desea agregar al carrito");
    let product = document.getElementById("drink").value;
    if (product == "") {
        alert("Debe ingresar un producto");
        return;
    }
    if (!products.includes(product)) {
        alert("El producto no existe");
        return;
    }
    bag.push(product);
    console.log(bag);
    showCart();
}

//onClick button for show cart
function showCart() {
    let outputText = "<ul>";
    bag.forEach((x, i) => outputText += "<li> Producto "+ i + ": " + x + "</li>");
    outputText += "</ul>";
    console.log(outputText);
    document.getElementById("cart-result").innerHTML = outputText;
}

document.getElementById("addDrink").addEventListener("click", addCart);
