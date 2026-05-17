import 'dotenv/config'
import express from 'express'
import cursosRoutes from './routes/cursos.routes.js'
import viewsRoutes from './routes/cursos.views.routes.js'

const app = express()

app.set('view engine', 'ejs')
app.set('views', './views')

app.use(express.json())

/*app.get('/', (req, res) => {
  res.type('text/plain')
  res.send('Bienvenido al curso práctico de Desarrollo Web 2651')
})*/

app.use('/', viewsRoutes)
app.use('/cursos', cursosRoutes)

app.use((req, res) => {
  res.status(404).send('El recurso solicitado no existe ...')
})

const puerto = process.env.PORT ?? 3000

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})