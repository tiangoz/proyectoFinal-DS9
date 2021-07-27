(() => {
    const App = {
        htmlElements: {
            itemsList: document.getElementById('iteams-list'),
            cartSubtotal: document.getElementById('cart-subtotal'),
            carTax: document.getElementById('cart-tax'),
            cartShipping: document.getElementById('cart-shipping').innerHTML,
            carTotal: document.getElementById('cart-total'),
            sum: 0,
            paypalPay: document.getElementById('paypal-pay'),
        },
        init: () => {
            App.bindEvents();
            App.initializeData.showItems();
            App.htmlElements.itemsList.addEventListener('click', App.events.itemsList)
            App.htmlElements.paypalPay.addEventListener('click', App.events.paypalPay)
        },
        bindEvents: () => {
        },
        initializeData: {
            showItems: async () => {
                const { count, data } = await App.endpoints.getCart();
                for(var i=0;i<data.length;i++) {
                    App.events.idCartItems(data[i]);
                }
            },
            costToPay: async () => {
                const itbms = 0.07;
                let subtotal = Number(App.htmlElements.cartSubtotal.innerHTML);

                let tax = Number((subtotal * itbms).toFixed(2));
                App.htmlElements.carTax.innerHTML = tax

                let shipping = Number(App.htmlElements.cartShipping);
                let total = (subtotal + tax + shipping).toFixed(2)
                App.htmlElements.carTotal.innerHTML = total
                App.htmlElements.carTotal.value = total
            },
        },
        events: {
            idCartItems: async ({_id, item}) => {
                const { count, data } = await App.endpoints.getItems(item);
                App.events.renderCartItems(data, _id);
            },
            renderCartItems: ({_id, price, name, description}, idItem) => {
                const newDiv =`
                <div class="product">
                    <div class="product-details">
                        <div class="product-title">${name}</div>
                        <p class="product-description">${description}</p>
                    </div>
                    <div class="product-removal">
                        <button name="remove" class="remove-product" id="${idItem}">Remove</button>
                    </div>
                    <div class="product-line-price">${price}</div>
                </div>
                `;
                App.htmlElements.itemsList.innerHTML += newDiv
                App.htmlElements.sum = (Number(App.htmlElements.sum) + Number(price))
                App.htmlElements.cartSubtotal.innerHTML = App.htmlElements.sum
                App.initializeData.costToPay();
            },
            itemsList: async (e) => {
                e.preventDefault();
                if(e.target.classList=="remove-product"){
                    let id = e.target.parentNode.querySelector('button[name="remove"]').id
                    await App.endpoints.removeToCart(id);
                } else {
                    console.log('no es el classlist')
                }
                //alerta de agregado un articulo
                swal({
                    title: "Eliminado",
                    text: "El artículo se ha Eliminado",
                    icon: "success",
                    button: "Continuar con la Compra",
                    })
                App.htmlElements.sum = 0;
                App.htmlElements.itemsList.innerHTML="";
                App.initializeData.showItems();
            },
            paypalPay: async (e) => {
                    console.log(App.htmlElements.carTotal.value)
                    window.location.href = await App.endpoints.createPayment({
                        value: App.htmlElements.carTotal.value
                    });
            }
        },
        endpoints: {
            getCart: () => {
                return App.utils.getCartItems("http://localhost:3000/api/v1/cart/items/", "GET")
            },
            getItems: (id) => {
                return App.utils.getItem(`http://localhost:3000/api/v1/items/${id}`, "GET")
            },
            removeToCart: (id) => {
                return App.utils.removeItem(`http://localhost:3000/api/v1/cart/items/remove/${id}`)
            },
            createPayment: (payload) => {
                return App.utils.postCreatePayment(`http://localhost:3000/api/v1/create-payment`, payload)
            },
        },
        utils: {
            getCartItems: async (url, method) => {
                const requestOptions = { method };
                const response = await fetch(url, requestOptions);
                return response.json();
            },
            getItem: async (url, method) => {
                const requestOptions = { method };
                const response = await fetch(url, requestOptions);
                return response.json();
            },
            removeItem: async (url = "") => {
                const response = await fetch(url, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json",},
                });
                return response;
            },
            postCreatePayment: async (url = '', data = {}) => {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json",},
                    body: JSON.stringify(data),
                });
                return response.json();
            },
        },
        routes: {
        }
    };
    App.init();
})();