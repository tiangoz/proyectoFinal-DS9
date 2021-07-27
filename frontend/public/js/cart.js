(() => {
    const App = {
        htmlElements: {
            itemsList: document.getElementById('iteams-list'),
        },
        init: () => {
            App.bindEvents();
            App.initializeData.showItems();
            App.htmlElements.itemsList.addEventListener('click', App.events.itemsList)
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
            },
            itemsList: async (e) => {
                e.preventDefault();
                if(e.target.classList=="remove-product"){
                    let id = e.target.parentNode.querySelector('button[name="remove"]').id
                    await App.endpoints.removeToCart(id);
                }
                //alerta de agregado un articulo
                swal({
                    title: "Eliminado",
                    text: "El artículo se ha Eliminado",
                    icon: "success",
                    button: "Continuar con la Compra",
                    })
                App.htmlElements.itemsList.innerHTML="";
                App.initializeData.showItems();
            },
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
        },
        routes: {
        }
    };
    App.init();
})();