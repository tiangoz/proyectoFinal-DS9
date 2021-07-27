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
                const { count, data } = await App.endpoints.getItems();
                for(var i=0;i<data.length;i++) {
                    App.events.renderItems(data[i]);
                }
            },
        },
        events: {
            renderItems: ({_id, price, name, description}) => {
                    const newDiv =`
                    <div class="content">
                        <img src="../public/img/headP.crdownload">
                        <h3>${name}</h3>
                        <p>${description}</p>
                        <h6>$${price}</h6>
                        <ul>
                            <li><i class="fa fa-star" aria-hidden="true"></i></li>
                            <li><i class="fa fa-star" aria-hidden="true"></i></li>
                            <li><i class="fa fa-star" aria-hidden="true"></i></li>
                            <li><i class="fa fa-star" aria-hidden="true"></i></li>
                            <li><i class="fa fa-star" aria-hidden="true"></i></li>
                        </ul>
                        <button name="cart" class="buy-1" id="${_id}">Añadir al Carrito</button>
                    </div>
                    `;
                    App.htmlElements.itemsList.innerHTML  += newDiv
            },
            itemsList: (e) => {
                e.preventDefault();
                if(e.target.classList=="buy-1"){
                    let id = e.target.parentNode.querySelector('button[name="cart"]').id
                    App.events.addToCart(id);
                }
            },
            addToCart: async (id) => {
                await App.endpoints.postAddToCart({
                    id: id
                });
                //alerta de agregado un articulo
                swal({
                    title: "Agregado",
                    text: "El articulo se ha agregado",
                    icon: "success",
                    button: "Continuar Comprando",
                    })
            },
        },
        endpoints: {
            getItems: () => {
                return App.utils.getItem("http://localhost:3000/api/v1/items/", "GET")
            },
            postAddToCart: (payload) => {
                return App.utils.postItemToCart('http://localhost:3000/api/v1/cart/items/add/', payload);
            },
        },
        utils: {
            getItem: async (url, method) => {
                const requestOptions = { method };
                const response = await fetch(url, requestOptions);
                return response.json();
            },
            postItemToCart: async (url = '', data = {}) => {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json",},
                    body: JSON.stringify(data),
                });
                return response.json();
            },
        },
        routes: {
            login: () => {
                window.location.href = "http://127.0.0.1:5500/proyectoFinal/frontend/views/index.html";
            },
        }
    };
    App.init();
})();