// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
var products = [{
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]
// Array with products (objects) added directly with push(). Products in this array are repeated.
var cartList = [];

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
var cart = [];

var total = 0;

// Exercise 1
function buy(id) {
    // 1. Loop for to the array products to get the item to add to cart
    for (let index = 0; index < products.length; index++) {
        // 2. Add found product to the cartList array
        if (products[index].id == id) {
            cartList.push(products[index]);
        }
    }

    printCountProduct();
}

function printCountProduct() {
    let countProduct = document.getElementById('count_product');
    countProduct.innerHTML = cartList.length;
}

// Exercise 2
function cleanCart() {
    cartList = [];
    cart = [];
    open_modal();
    printCountProduct();
}

// Exercise 3
function calculateTotal() {
    // Calculate total price of the cart using the "cartList" array
    total = 0;
    for (let index = 0; index < cart.length; index++) {
        total += cart[index].subtotalWithDiscount;
    }

    return total;
}

// Exercise 4
function countRepeatedElements(array, element) {
    let counter = 0;
    for (let index = 0; index < array.length; index++) {
        for (item of array) {
            if (item === element) {
                counter++;
            }
        }
        return counter;
    }
}

function generateCart() {
    // Using the "cartlist" array that contains all the items in the shopping cart, 
    // generate the "cart" array that does not contain repeated items, instead each item of this array "cart" shows the quantity of product.

    //Restauramos el array CART para prevenir errores
    cart = [];

    //Guardamos los valores únicos, sin repeticiones, de la CARTLIST
    let uniqueCartList = [...new Set(cartList)];

    for (let index = 0; index < uniqueCartList.length; index++) {
        //Por cada elemento del array UNIQUECARTLIST contaremos la cantidad de veces que se repite en la CARLIST 
        let quantity = 0;
        quantity = countRepeatedElements(cartList, uniqueCartList[index]);

        //y la añadiremos como atributo en CART
        const product = {
            name: uniqueCartList[index].name,
            price: uniqueCartList[index].price,
            type: uniqueCartList[index].type,
            quantity: quantity,
            subtotal: uniqueCartList[index].price * quantity,
            subtotalWithDiscount: uniqueCartList[index].price * quantity,
        };
        cart.push(product);
    }
}

// Exercise 5
function applyPromotionsCart() {
    // Apply promotions to each item in the array "cart"

    for (let index = 0; index < cart.length; index++) {
        for (item of cart) {
            if (item.name == "cooking oil" && item.quantity > 2) {
                let price = 10;
                item.subtotalWithDiscount = price * item.quantity;
            }

            if (item.name == "Instant cupcake mixture" && item.quantity >= 10) {
                let price = item.price * 2 / 3;
                item.subtotalWithDiscount = price * item.quantity;
            }
        }
    }
}

// Exercise 6
function printCart() {
    // Fill the shopping cart modal manipulating the shopping cart dom
    let tbody = document.getElementById('cart_list');;
    tbody.innerHTML = '';
    // Crea las celdas
    for (let i = 0; i < cart.length; i++) {

        // Crea las hileras de la tabla
        const tr = document.createElement('tr');

        // Crea un elemento <td> y un nodo de texto, haz que el nodo de
        // texto sea el contenido de <td>, ubica el elemento <td> al final
        // de la hilera de la tabla
        const th = document.createElement('th');
        const textoTh = document.createTextNode(cart[i].name);
        th.appendChild(textoTh);
        tr.appendChild(th);

        const tdPrice = document.createElement('td');
        const textoTdPrice = document.createTextNode("$" + cart[i].price);
        tdPrice.appendChild(textoTdPrice);
        tr.appendChild(tdPrice);

        const tdQty = document.createElement('td');
        const textoTdQty = document.createTextNode(cart[i].quantity);
        tdQty.appendChild(textoTdQty);
        tr.appendChild(tdQty);

        const tdTotal = document.createElement('td');
        const textoTdTotal = document.createTextNode("$" + cart[i].subtotalWithDiscount);
        tdTotal.appendChild(textoTdTotal);
        tr.appendChild(tdTotal);

        // agrega la hilera al final de la tabla (al final del elemento tbody)
        tbody.appendChild(tr);
    }

    let totalPrice = calculateTotal();
    let totalPricePrinted = document.getElementById('total_price');

    totalPricePrinted.innerHTML = totalPrice;
}


// ** Nivell II **

// Exercise 7
function addToCart(id) {
    // Refactor previous code in order to simplify it 
    buy(id);
    generateCart();
    applyPromotionsCart();
}

// Exercise 8
function removeFromCart(id) {
    // 1. Loop for to the array products to get the item to add to cart
    for (let index = 0; index < cartList.length; index++) {
        if (cartList[index].id == id) {
            // 2. Remove found product to the cartList array
            cartList.splice(index, 1);
            generateCart();
            return applyPromotionsCart();
        }
    }
}

function open_modal() {
    printCart();
}