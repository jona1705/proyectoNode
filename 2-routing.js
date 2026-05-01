import { createServer } from 'node:http';
// const cursos = require('./cursos.json') // En Common JS
import cursos from './cursos.json' with { type: 'json' }

const server = createServer((req, res) => {

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

})

const puerto = process.env.PORT ?? 3000

server.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
}) 	