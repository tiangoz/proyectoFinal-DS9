(() => {
    const App = {
        htmlElements: {
            loginForm: document.getElementById('form-login'),
        },
        init: () => {
            App.bindEvents();
        },
        bindEvents: () => {
            App.htmlElements.loginForm.addEventListener('submit', App.events.onLoginFormSubmit);
        },
        initializeData: {

        },
        events: {
            onLoginFormSubmit: async (event) => {
                event.preventDefault();
                const {
                    email,
                    password
                } = event.target.elements;

                const userEmail = email.value;
                const userPassword = password.value;

                await App.endpoints.postLogin({
                    email: userEmail,
                    password: userPassword
                })
                //Redirrecionamiento al index
                App.routes.login();
            },
        },
        endpoints: {
            postLogin: (payload) => {
                return App.utils.postUserLogin('http://localhost:3000/api/v1/users/login/', payload);
            },
        },
        utils: {
            postUserLogin: async (url = '', data = {}) => {
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