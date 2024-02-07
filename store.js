if (document.readyState == 'loading'){
    document.addEventListener('DOMContentLoaded' , ready)
}else {
    ready()
}

function ready(){
    var removeItemButtons = document.getElementsByClassName('btn-danger')
    console.log(removeItemButtons)
    for (var i =0 ; i < removeItemButtons.length ;i++){
        var button = removeItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }

    var quantityInput = document.getElementsByClassName('cart-quantity-input')
    for (var i=0 ; i<quantityInput.length ;i++){
        var input = quantityInput[i]
        input.addEventListener('change',quantityChanged)
    }

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i=0 ; i < addToCartButtons.length ; i++){
        var button = addToCartButtons[i]
        button.addEventListener('click' , addToCartClicked)
    }

    document.getElementsByClassName('btn-purchase')[0].addEventListener('click',purchaseClicked)

}

function purchaseClicked(){
    var cartItems = document.getElementsByClassName('cart-items')[0]
    alert('thank You For Your purchase')
    while (cartItems.hasChildNodes()) {
        cartItems.removeChild(cartItems.firstChild) 
    }
    

    updateCartTotal()
}

function removeCartItem(event) {
    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
    updateCartTotal()
}

function quantityChanged(event) {
    var input = event.target
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    updateCartTotal()
}

function addToCartClicked(event){
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('shop-item-title')[0].innerText
    var price = shopItem.getElementsByClassName('shop-item-price')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('shop-item-image')[0].src
    console.log(title , price , imageSrc)
    addItemToCart(title , price , imageSrc)
    updateCartTotal()
}

function addItemToCart(title , price , imageSrc){
    var cartRow = document.createElement('div')
    var cartItems = document.getElementsByClassName('cart-items')[0]
    var cartItemNames = cartItems.getElementsByClassName('cart-item-title')
    for (var i = 0 ;i< cartItemNames.length ; i++){
        if (cartItemNames[i].innerText == title){
            alert('This Item Is Already Added')
            return //will stop you from continuing the execution od additemtocart
        }
    }
    var cartRowContents = `
    <div class="cart-item cart-column">
        <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
        <span class="cart-item-title">${title}</span>
    </div>
    <span class="cart-price cart-column">${price}</span>
    <div class="cart-quantity cart-column">
        <input class="cart-quantity-input" type="number" value="1">
        <button class="btn btn-danger" type="button">REMOVE</button>
    </div>`
    cartRow.innerHTML = cartRowContents
    cartRow.classList.add('cart-row')
    cartItems.append(cartRow)
    cartRow.getElementsByClassName('btn-danger')[0].addEventListener('click',removeCartItem)
    cartRow.getElementsByClassName('cart-quantity-input')[0].addEventListener('change',quantityChanged)
}

function updateCartTotal() {
    var cartItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cartItemContainer.getElementsByClassName('cart-row')
    var total = 0
    for (var i = 0 ; i < cartRows.length ; i++){
        var cartRow = cartRows [i] 
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity-input')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    total = Math.round (total * 100)/100
    document.getElementsByClassName('cart-total-price')[0].innerText= '$' + total
}
