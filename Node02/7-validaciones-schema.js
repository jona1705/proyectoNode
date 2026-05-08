import express, { json } from 'express'
import cursos from './cursos.json' with { type: 'json' }
import {
  cursoMatematicasSchema,
  cursoMatematicasPatchSchema,
  cursoProgramacionSchema,
  cursoProgramacionPatchSchema,
  cursoBDSchema,
  cursoBDPatchSchema,
} from './schemas/cursos.schema.js'

import { validate } from './middlewares/validate.js'

const app = express()

app.use(express.json())

// métodos de solicitud

// Funcion para manejar solicitudes GET
// GET nos permite obtener datos

app.get('/', (req, res) => {
  res.type('text/plain')
  res.send('Bienvenido al curso práctico de Desarrollo Web 2651')
})

app.get('/cursos', (req, res) => {
  res.json(cursos)
})

app.get('/cursos/programacion', (req, res) => {
  res.json(cursos.programacion)
})

app.get('/cursos/matematicas', (req, res) => {
  res.json(cursos.matematicas)
})

app.get('/cursos/bases_de_datos', (req, res) => {
  res.json(cursos.bases_de_datos)
})


// Funcion para manejar solicitudes POST
// POST nos permite enviar o crear datos
app.post('/cursos/matematicas',
  validate(cursoMatematicasSchema),
  (req, res) => {

    const nuevoCurso = {
      id,
      titulo,
      tema,
      vistas,
      nivel,
      timestamp: Date.now()
    }

    cursos.matematicas.push(nuevoCurso)

    // Si quieres persistir:
    // await writeFile('./cursos.json', JSON.stringify(cursos, null, 2))

    res.status(201).json(nuevoCurso)
  })


app.put('/cursos/programacion/:id',
  validate(cursoProgramacionSchema),
  (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body

    const index = cursos.programacion.findIndex(curso => curso.id === id)

    if (index === -1) {
      return res.status(404).json({ mensaje: 'Curso no encontrado ' })
    }

    // reemplaza completamente
    cursos.programacion[index] = {
      id,
      ...data
    }

    res.json(cursos.programacion[index])
  })

app.patch('/cursos/base_de_datos/:id',
  validate(cursoBDPatchSchema),
  (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body

    const curso = cursos.bases_de_datos.find(curso => curso.id === id)

    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado ' })
    }

    // solo actualiza lo que venga
    Object.assign(curso, data)

    res.json(curso)
  })

app.delete('/cursos/matematicas/:id', (req, res) => {
  const id = parseInt(req.params.id)
  const index = cursos.matematicas.findIndex(curso => curso.id === id)
  if (index === -1) {
    return res.status(404).json({ mensaje: 'Curso no encontrado ' })
  }
  const eliminado = cursos.matematicas.splice(index, 1)
  return res.json({
    mensaje: 'Curso eliminado',
    curso: eliminado[0]
  })
})

app.use((req, res) => {
  res.status(404).send('El recurso solicitado no existe ...')
})

const puerto = process.env.PORT ?? 3000

app.listen(puerto, () => {
  console.log(`Servidor escuchando en http://localhost:${puerto}`)
})