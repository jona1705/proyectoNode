import { createServer } from 'node:http';

const puerto = process.env.PORT ?? 3000

const server = createServer((req, res) => {
  // console.log('solicitud recibida .. saludos')
  // console.log(req);
  
  // res.setHeader('Content-Type', 'text/plain');
  // res.end('Hola Mundo') 
  
  /* console.log(req.url)
  console.log(req.method)
  console.log(req.headers) */
  //console.log(res);
  /* console.log(res.statusCode); // 200 OK
  res.statusCode = 404;
  console.log(res.statusCode); // 404 Not Found */

  // Podemos enviar respuesta en formato JSON
  //res.setHeader('Content-Type', 'application/json');
  // JSON.stringify(...) convierte el objeto a texto JSON válido
  // res.end(JSON.stringify({ "mensaje": "Hola Mundo" }));

  res.setHeader('Content-Type', 'text/html');
  res.end("<h1>Hola Mundo</h1>");
  console.log(res.getHeaders());
})

/* server.listen(3000, () => {
  console.log("Servidor escuchando en el puerto 3000")
}) */

server.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
}) 	