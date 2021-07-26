(() => {
    const App = {
        htmlElements: {
            pay: document.getElementById('pay'),
            signupForm: document.getElementById('form-signup'),
            loginForm: document.getElementById('form-login'),
        },
        init: () => {
            App.bindEvents();
            // App.htmlElements.pay.addEventListener('click', App.events.pay)
        },
        bindEvents: () => {
            App.htmlElements.signupForm.addEventListener('submit', App.events.onSignUpFormSubmit);
            App.htmlElements.loginForm.addEventListener('submit', App.events.onLoginFormSubmit);
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
            onSignUpFormSubmit: async (event) =>{
                event.preventDefault();
                const {
                    name,
                    email,
                    password
                } = event.target.elements;

                const userName = name.value;
                const userEmail = email.value;
                const userPassword = password.value;

                await App.endpoints.postSignUp({
                    name: userName,
                    email: userEmail,
                    password: userPassword
                })
                //Redirrecionamiento al login
                swal({
                    title: "Usuario Registrado",
                    text: "Da clic, para iniciar sesión",
                    icon: "success",
                    button: "Iniciar Sesión",
                    })
                    .then(() => {
                        App.routes.signUp();
                    });
            },
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
            },
        },
        endpoints: {
            postPay: (payload) => {
                // console.log(payload)
                return App.utils.post(`http://localhost:3000/api/v1/create-payment`, payload);
            },
            postSignUp: (payload) => {
                return App.utils.postUserSignUp('http://localhost:3000/api/v1/users/signup/', payload);
            },
            postLogin: (payload) => {
                return App.utils.postUserLogin('http://localhost:3000/api/v1/users/login/', payload);
            },
        },
        utils: {
            post: async (url = '', data = {}) => {
                const response = await fetch(url, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
                });
                console.log("se envia el request")
                return response.json();
            },
            postUserSignUp: async (url = '', data = {}) => {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json",},
                    body: JSON.stringify(data),
                });
                return response.json();
            }
        },
        routes: {
            signUp: () => {
                window.location.href = "http://127.0.0.1:5500/proyectoFinal/frontend/views/login.html";
            },
        }
    };
    App.init();
})();