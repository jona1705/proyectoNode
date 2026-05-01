import { createServer } from 'node:http';
// const cursos = require('./cursos.json') // En Common JS
import cursos from './cursos.json' with { type: 'json' }

const server = createServer((req, res) => {

  const metodo = req.method

  switch (metodo) {
    case 'GET':
      return manejarSolicitudGET(req, res)
    case 'POST':
      return manejarSolicitudPOST(req, res)
    case 'PUT':
      return manejarSolicitudPUT(req, res)
    case 'PATCH':
      return manejarSolicitudPATCH(req, res)
    case 'DELETE':
      return manejarSolicitudDELETE(req, res)
    default:
      res.statusCode = 501
      res.end('El metodo no puede ser manejado por el servidor')
  }

})

const puerto = process.env.PORT ?? 3000

server.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
}) 

// métodos de solicitud

// Funcion para manejar solicitudes GET
// GET nos permite obtener datos
const manejarSolicitudGET = (req, res) => {
  const path = req.url

  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (path === '/') {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    return res.end('Bienvenido al curso práctico de Desarrollo Web 2651')
  } else if (path === '/cursos') {
    return res.end(JSON.stringify(cursos))
  } else if (path === '/cursos/programacion') {
    return res.end(JSON.stringify(cursos.programacion))
  } else if (path === '/cursos/matematicas') {
    return res.end(JSON.stringify(cursos.matematicas))
  } else if (path === '/cursos/base_de_datos') {
    return res.end(JSON.stringify(cursos.bases_de_datos))
  }

  res.statusCode = 404;
  return res.end('El recurso solicitado no existe...');
}

// Funcion para manejar solicitudes POST
// POST nos permite enviar o crear datos
const manejarSolicitudPOST = (req, res) => {
  const path = req.url

  console.log(req.body)

  if (path == '/cursos/matematicas') {

    let body = '';

    // escuchar el evento data
    req.on('data', chunk => {
      body += chunk.toString()
    })

    // una vez que llegaron todos los datos
    // los procesamos
    // evento end
    req.on('end', () => {
      // convertimos el json a un objeto de javascript
      const data = JSON.parse(body)
      // Definimos el tipo de contenido y el código de estado
      // 201 Created
      res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })

      // Guardamos la data
      // Solo modificamos el objeto en memoria
      cursos.matematicas.push(data)

      //  Si queremos guardar en el archivo

      data.timestamp = Date.now()

      return res.end(JSON.stringify(data))
    })
  }
}
