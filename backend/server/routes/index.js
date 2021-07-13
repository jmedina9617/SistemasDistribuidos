
const express = require('express')
const app = express();

app.use( require('./usuario.js') )
app.use( require('./login.js') )
app.use( require('./conductor.js') )
app.use( require('./tarifa.js') )
app.use( require('./servicio.js') )
app.use( require('./productos.js'))

module.exports = app;