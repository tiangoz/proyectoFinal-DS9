const express = require('express')
const engine = require('consolidate');
const app = express()
const port = 5000

app.set('views', __dirname + '/views');
app.engine('html', engine.mustache); //mustache usa el puerto 4000
app.set('view engine', 'html');

// Configuration for static files
app.use('/static', express.static('public'));

app.get('/', (req, res) => {
  res.render('index.html', { nombre: 'Proyecto Final' });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}/`)
})
