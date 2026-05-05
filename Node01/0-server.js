
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.end("<h1>Hola Mundo</h1>");
})

const puerto = process.env.PORT ?? 3000

server.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
}) 	