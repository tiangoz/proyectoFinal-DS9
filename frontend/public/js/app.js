(() => {
    const App = {
        htmlElements: {
            pay: document.getElementById('pay'),
        },
        init: () => {
            App.bindEvents();
            App.htmlElements.pay.addEventListener('click', App.events.pay)
        },
        bindEvents: () => {
        },
        initializeData: {

        },
        events: {
            pay: async () => {
                let monto = document.getElementById('USD').innerHTML
                await App.endpoints.postPay({
                    value: monto
                });
            },
        },
        endpoints: {
            postPay: (payload) => {
                // console.log(payload)
                return App.utils.post(`http://localhost:3000/api/v1/create-payment`, payload);
            },
        },
        utils: {
            post: async (url = '', data = {}) => {
                const response = await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {'Content-Type': 'application/json'},
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify(data)
                });
                console.log("se envia el request")
                return response.json();
            },
        },
    };
    App.init();
})();