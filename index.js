const http = require('node:http')

const puerto = process.env.PORT ?? 3000

const server = http.createServer((req, res) => {
  console.log('solicitud recibida')
  res.end('Hola Mundo')
})

/* server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000")
}) */

server.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
}) 	