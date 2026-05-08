import express from 'express'
import cursosRoutes from './routes/cursos.routes.js'

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
  res.type('text/plain')
  res.send('Bienvenido al curso práctico de Desarrollo Web 2651')
})

app.use('/cursos', cursosRoutes)

app.use((req, res) => {
  res.status(404).send('El recurso solicitado no existe ...')
})

const puerto = process.env.PORT ?? 3000

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})