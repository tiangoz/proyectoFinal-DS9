(() => {
    const App = {
        htmlElements: {
            signupForm: document.getElementById('form-signup'),
        },
        init: () => {
            App.bindEvents();
            // App.htmlElements.pay.addEventListener('click', App.events.pay)
        },
        bindEvents: () => {
            App.htmlElements.signupForm.addEventListener('submit', App.events.onSignUpFormSubmit);
        },
        initializeData: {

        },
        events: {
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
                // swal({
                //     title: "Usuario Registrado",
                //     text: "Da clic, para iniciar sesión",
                //     icon: "success",
                //     button: "Iniciar Sesión",
                //     })
                //     .then(() => {
                //     });
                    App.routes.signUp();
            },
        },
        endpoints: {
            postSignUp: (payload) => {
                return App.utils.postUserSignUp('http://localhost:3000/api/v1/users/signup/', payload);
            },
        },
        utils: {
            postUserSignUp: async (url = '', data = {}) => {
                const response = await fetch(url, {
                    method: "POST",
                    headers: { "Content-Type": "application/json",},
                    body: JSON.stringify(data),
                });
                return response.json();
            },
        },
        routes: {
            signUp: () => {
                window.location.href = "http://127.0.0.1:5500/proyectoFinal/frontend/views/login.html";
            },
        }
    };
    App.init();
})();