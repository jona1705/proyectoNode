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
  } else if (path === '/cursos/bases_de_datos') {
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

// PUT: Reemplaza completamente un curso
const manejarSolicitudPUT = (req, res) => {
  const path = req.url
  let id

  // URL: .../cursos/programacion/1

  if (path.startsWith('/cursos/programacion/')) {
    // Extraemos id de la ruta
    id = parseInt(path.split('/')[3])
  }

  let body = ''

  req.on('data', chunk => {
    body += chunk.toString()
  })

  req.on('end', () => {
    // convertimos el json a un objeto de javascript
    const data = JSON.parse(body)
    // Accedemos al curso por medio de su indice
    const index = cursos.programacion.findIndex(curso => curso.id === id)

    if (index === -1) {
      res.statusCode = 404
      return res.end(JSON.stringify({ mensaje: 'Curso no encontrado' }))
    }

    // reemplaza completamente
    cursos.programacion[index] = {
      id,
      ...data
    }

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    return res.end(JSON.stringify(cursos.programacion[index]))
  })
}

// PATCH: Solo modifica algunos campos (actualizacion parcial)
const manejarSolicitudPATCH = (req, res) => {
  const path = req.url

  if (path.startsWith('/cursos/base_de_datos/')) {
    const id = parseInt(path.split('/')[3])

    let body = ''

    req.on('data', chunk => {
      body += chunk.toString()
    })

    req.on('end', () => {
      const data = JSON.parse(body)

      const curso = cursos.bases_de_datos.find(curso => curso.id === id)

      if (!curso) {
        res.statusCode = 404
        return res.end(JSON.stringify({ mensaje: 'Curso no encontrado' }))
      }

      // solo actualiza lo que venga
      Object.assign(curso, data)

      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      return res.end(JSON.stringify(curso))
    })
  }
}

// DELETE: Elimina un recurso
// Esta función borra un curso por id
const manejarSolicitudDELETE = (req, res) => {
  const path = req.url

  if (path.startsWith('/cursos/matematicas/')) {
    const id = parseInt(path.split('/')[3])

    const index = cursos.matematicas.findIndex(curso => curso.id === id)

    if (index === -1) {
      res.statusCode = 404
      return res.end(JSON.stringify({ mensaje: 'Curso no encontrado' }))
    }

    const eliminado = cursos.matematicas.splice(index, 1)

    // [a, b, c, d, e] --> splice(2, 2) --> [a, b, e]

    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })

    return res.end(JSON.stringify({
      mensaje: 'Curso eliminado',
      curso: eliminado[0]
    }))
  }
}