const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const request = require('request');
const app = express();
const { connectDb } = require('./utils');
const {
    validators: ItemValidators,
    controllers: ItemControllers
} = require('./controllers/Item');
const {
    validators: CartValidators,
    controllers: CartControllers
} = require('./controllers/Cart');
const {
    validators: UserValidators,
    controllers: UserControllers
} = require('./controllers/User');

const port = 3000;

app.use(express.json());
app.use(cors());
app.use(helmet());

//Paypal Section
// paypal.configure({
//     'mode': 'sandbox', //sandbox or live
//     'client_id': '####yourclientid######',
//     'client_secret': '####yourclientsecret#####'
//   });

const CLIENT = 'AcegV4pONjTEm7zcI3Z6Odju8d-oGSupI1hhzuLm6y7wjDuFXf02WzastrsPkXyDGAmC331xt1Jev_-j';
const SECRET = 'ECeUXlF1RjJn04qS6so6o4_NKe8Pu8B9bRSzOWlNlVXcaZp1mnjyhSEHhB_dAul7FtgvTlMe3uR75U5l';
const PAYPAL_API = 'https://api-m.sandbox.paypal.com'; // Live https://api-m.paypal.com

const auth = { user: CLIENT, pass: SECRET }

const Paypal = {
    createPayment: (req, res) => {
        const { value} = req.body;
        const body = {
            intent: 'CAPTURE',
            purchase_units: [{
                amount: {
                    currency_code: 'USD', //https://developer.paypal.com/docs/api/reference/currency-codes/
                    value: value//'250.00'
                }
            }],
            application_context: {
                brand_name: `Proyecto Final - DS9`,
                landing_page: 'NO_PREFERENCE', // Default, para mas informacion https://developer.paypal.com/docs/api/orders/v2/#definition-order_application_context
                user_action: 'PAY_NOW', // Accion para que en paypal muestre el monto del pago
                return_url: `http://localhost:${port}/api/v1/execute-payment`,
                // return_url: `http://localhost:5000/`,
                cancel_url: `http://localhost:5000/` // Url despues de realizar el pago
            }
        }
        //https://api-m.sandbox.paypal.com/v2/checkout/orders [POST]

        request.post(`${PAYPAL_API}/v2/checkout/orders`, {
            auth,
            body,
            json: true
        }, (err, response) => {
            res.json({ data: response.body })
        })
    },
    executePayment: (req, res) => {
        const token = req.query.token;

        request.post(`${PAYPAL_API}/v2/checkout/orders/${token}/capture`, {
            auth,
            body: {},
            json: true
        }, (err, response) => {
            res.json({ data: response.body })
        })
    },
}

//Paypal API
app.post('/api/v1/create-payment', Paypal.createPayment);
app.get('/api/v1/execute-payment', Paypal.executePayment);

// Users API
app.post('/api/v1/users/signup/', UserValidators.signupUser, UserControllers.signupUser);
app.post('/api/v1/users/login/', UserValidators.loginUser, UserControllers.loginUser);
app.get('/api/v1/users', UserControllers.getUser);
app.get('/api/v1/users/:id', UserControllers.getAnUser);
// app.post('/api/v1/users', UserControllers.createUser);
app.put('/api/v1/users/:id', UserControllers.updateAnUser);
app.delete('/api/v1/users/:id', UserControllers.deleteAnUser);

// Items API
app.get('/api/v1/items/', ItemValidators.getItems, ItemControllers.getItems);
app.get('/api/v1/items/:id', ItemValidators.getAnItem, ItemControllers.getAnItem);
app.post('/api/v1/items/', ItemValidators.createItem, ItemControllers.createItem);
app.put('/api/v1/items/:id', ItemValidators.updateItem, ItemControllers.updateItem);
app.patch('/api/v1/items/:id', ItemValidators.changeStateItem, ItemControllers.changeStateItem);
app.delete('/api/v1/items/:id', ItemValidators.deleteItem, ItemControllers.deleteItem);

// Cart API
app.get('/api/v1/cart/items/', CartValidators.getCart, CartControllers.getCart);
app.post('/api/v1/cart/items/add/', CartValidators.addItemToCart, CartControllers.addItemToCart);
app.delete('/api/v1/cart/items/remove/:id', CartValidators.deleteItemFromCart, CartControllers.deleteItemFromCart);

connectDb().then(() => {
    app.listen(port, () => {
        console.log(`Ejemplo escuchando en: http://localhost:${port}`)
    })
})
