'use strict';
console.log('We have signal!');
//++++++++++++++++++++++++++++++
// GLOBAL DATA
//++++++++++++++++++++++++++++++
Product.names = ['bag', 'banana', 'bathroom', 'boots', 'breakfast', 'bubblegum', 'chair', 'cthulhu', 'dog-duck', 'dragon', 'pen', 'pet-sweep', 'scissors', 'shark', 'sweep', 'tauntaun', 'unicorn', 'usb', 'water-can', 'wine-glass'];
Product.allProducts = []; // Array of all Product instances
Product.address = []; // Store user address

// Global vars for DOM access
Product.cart = document.getElementById('cart');
var addressForm = document.getElementById('address-form');
var addItemBtn = document.getElementById('add-item');

//++++++++++++++++++++++++++++++
// CONSTRUCTORS
//++++++++++++++++++++++++++++++
function Product(name) {
  this.name = name;
  this.path = 'img/' + name + '.jpg';
  this.buying = false;
  this.qty = 0;
  Product.allProducts.push(this);
}
//++++++++++++++++++++++++++++++
// INSTANCES
//++++++++++++++++++++++++++++++
function getInstances() {
  for (var i = 0; i < Product.names.length; i++) {
    new Product(Product.names[i]);
  }
}

//++++++++++++++++++++++++++++++
// FUNCTION DECLARATIONS
//++++++++++++++++++++++++++++++
function listProducts() {
  var products = document.getElementById('products');

  for (var i = 0; i < Product.names.length; i++) { //populate product list
    var optionEl = document.createElement('option');
    optionEl.textContent = Product.names[i];
    products.appendChild(optionEl);
  }
}

function addItem(event) {
  console.log('log of the event target: ', event.target); 
  event.preventDefault();

  // take input from dropdown and qty
  if (!event.target.qty.value) {
    return alert('Please enter your information!');
  }
  // for loop with a conditional to store in Products array
  for (var i = 0; i < Product.allProducts.length; i++) {
    if (event.target.product.value === Product.allProducts[i].name) {
      Product.allProducts[i].buying = true;
      Product.allProducts[i].qty = event.target.qty.value;
      console.log('Condition has been updated to ' + Product.allProducts[i].buying);
      console.log('Quantity has been updated to ' + Product.allProducts[i].qty);
      // store in LS
      localStorage.setItem('allProductsToLS', JSON.stringify(Product.allProducts)); // store current state
    }
  }
}

function sendToCheckout(event) {
  console.log('log of the event object: ', event);
  console.log('log of the event.target: ', event.target);

  event.preventDefault();// prevents page reload on a 'submit' event

  if (!event.target.name.value || !event.target.street.value || !event.target.city.value || !event.target.state.value || !event.target.zip.value) {
    return alert('Please enter your information!');
  }
  var subName = event.target.name.value;
  var subStreet = event.target.street.value;
  var subCity = event.target.city.value;
  var subState = event.target.state.value;
  var subZip = event.target.zip.value;
  
  Product.address.push(subName, subStreet, subCity, subState, subZip);
  console.table(Product.address);
}

//++++++++++++++++++++++++++++++
// CODE THAT EXECUTES ON PAGE LOAD
//++++++++++++++++++++++++++++++
if (localStorage.allProductsToLS) {
  Product.allProducts = JSON.parse(localStorage.allProductsToLS); //   retrieve L.S. & assign to [{},{},{}]
} else {
  getInstances(); //  create instances from scratch
}
listProducts();

// console.table(Product.allProducts);

addItemBtn.addEventListener('submit', addItem);
addressForm.addEventListener('submit', sendToCheckout);