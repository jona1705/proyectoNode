import express, { json } from 'express'
import cursos from './cursos.json' with { type: 'json' }
import {
  cursoMatematicasSchema,
  cursoMatematicasPatchSchema,
  cursoProgramacionSchema,
  cursoProgramacionPatchSchema,
  cursoBDSchema,
  cursoBDPatchSchema,
  idParamSchema
} from './schemas/cursos.schema.js'

import {
  validateBody,
  validateParams
} from './middlewares/validate.js'

const app = express()

app.use(express.json())

// Métodos de solicitud

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
  validateBody(cursoMatematicasSchema),
  (req, res) => {

    const { id, titulo, tema, vistas, nivel } = req.body

    const nuevoCurso = {
      id: cursos.matematicas.at(-1)?.id + 1 || 1,
      titulo,
      tema,
      vistas,
      nivel,
      timestamp: Date.now()
    }

    cursos.matematicas.push(nuevoCurso)

    res.status(201).json(nuevoCurso)
  })

app.post('/cursos/programacion',
  validateBody(cursoProgramacionSchema),
  (req, res) => {

    const { titulo, lenguaje, vistas, nivel } = req.body

    const nuevoCurso = {
      id: cursos.programacion.at(-1)?.id + 1 || 1,
      titulo,
      lenguaje,
      vistas,
      nivel,
      timestamp: Date.now()
    }

    cursos.programacion.push(nuevoCurso)

    res.status(201).json(nuevoCurso)
  })

app.post('/cursos/bases_de_datos',
  validateBody(cursoBDSchema),
  (req, res) => {

    const { titulo, tecnologia, vistas, nivel } = req.body

    const nuevoCurso = {
      id: cursos.bases_de_datos.at(-1)?.id + 1 || 1,
      titulo,
      tecnologia,
      vistas,
      nivel,
      timestamp: Date.now()
    }

    cursos.bases_de_datos.push(nuevoCurso)

    res.status(201).json(nuevoCurso)
  })

app.put('/cursos/programacion/:id',
  validateParams(idParamSchema),
  validateBody(cursoProgramacionSchema),
  (req, res) => {

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

app.put('/cursos/matematicas/:id',
  validateParams(idParamSchema),
  validateBody(cursoMatematicasSchema),
  (req, res) => {

    const id = parseInt(req.params.id)
    const data = req.body

    const index = cursos.matematicas.findIndex(curso => curso.id === id)

    if (index === -1) {
      return res.status(404).json({ mensaje: 'Curso no encontrado ' })
    }

    // reemplaza completamente
    cursos.matematicas[index] = {
      id,
      ...data
    }

    res.json(cursos.matematicas[index])
  })

app.put('/cursos/bases_de_datos/:id',
  validateParams(idParamSchema),
  validateBody(cursoBDSchema),
  (req, res) => {

    const id = parseInt(req.params.id)
    const data = req.body

    const index = cursos.bases_de_datos.findIndex(curso => curso.id === id)

    if (index === -1) {
      return res.status(404).json({ mensaje: 'Curso no encontrado ' })
    }

    // reemplaza completamente
    cursos.bases_de_datos[index] = {
      id,
      ...data
    }

    res.json(cursos.bases_de_datos[index])
  })

app.patch('/cursos/bases_de_datos/:id',
  validateParams(idParamSchema),
  validateBody(cursoBDPatchSchema),
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

app.patch('/cursos/programacion/:id',
  validateParams(idParamSchema),
  validateBody(cursoProgramacionPatchSchema),
  (req, res) => {

    const id = parseInt(req.params.id)
    const data = req.body

    const curso = cursos.programacion.find(curso => curso.id === id)

    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado ' })
    }

    // solo actualiza lo que venga
    Object.assign(curso, data)

    res.json(curso)
  })

app.patch('/cursos/matematicas/:id',
  validateParams(idParamSchema),
  validateBody(cursoMatematicasPatchSchema),
  (req, res) => {
    const id = parseInt(req.params.id)
    const data = req.body

    const curso = cursos.matematicas.find(curso => curso.id === id)

    if (!curso) {
      return res.status(404).json({ mensaje: 'Curso no encontrado ' })
    }

    // solo actualiza lo que venga
    Object.assign(curso, data)

    res.json(curso)
  })


app.delete('/cursos/matematicas/:id',
  validateParams(idParamSchema),
  (req, res) => {
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

app.delete('/cursos/programacion/:id',
  validateParams(idParamSchema),
  (req, res) => {
    const id = parseInt(req.params.id)
    const index = cursos.programacion.findIndex(curso => curso.id === id)
    if (index === -1) {
      return res.status(404).json({ mensaje: 'Curso no encontrado ' })
    }
    const eliminado = cursos.programacion.splice(index, 1)
    return res.json({
      mensaje: 'Curso eliminado',
      curso: eliminado[0]
    })
  })

app.delete('/cursos/bases_de_datos/:id',
  validateParams(idParamSchema),
  (req, res) => {
    const id = parseInt(req.params.id)
    const index = cursos.bases_de_datos.findIndex(curso => curso.id === id)
    if (index === -1) {
      return res.status(404).json({ mensaje: 'Curso no encontrado ' })
    }
    const eliminado = cursos.bases_de_datos.splice(index, 1)
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