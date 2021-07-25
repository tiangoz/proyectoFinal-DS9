const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
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
