import { CursosModel } from '../models/cursos.model.js'

export class CursosController {

  static getAll = (req, res) => {
    res.json(CursosModel.getAll())
  }

  static getAllProgramacion = (req, res) => {
    res.json(CursosModel.getAllProgramacion())
  }

  static getAllMatematicas = (req, res) => {
    res.json(CursosModel.getAllMatematicas())
  }

  static getAllBD = (req, res) => {
    res.json(CursosModel.getAllBD())
  }

  static createProgramacion(req, res) {
    const nuevoCurso = CursosModel.createProgramacion({
      input: req.body
    })
    res.status(201).json(nuevoCurso)
  }

  static createMatematicas(req, res) {
    const nuevoCurso = CursosModel.createMatematicas({
      input: req.body
    })
    res.status(201).json(nuevoCurso)
  }

  static createBD(req, res) {
    const nuevoCurso = CursosModel.createBD({
      input: req.body
    })
    res.status(201).json(nuevoCurso)
  }

  static updateProgramacion(req, res) {
    const { id } = req.params

    const cursoActualizado = CursosModel.updateProgramacion({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static updateMatematicas(req, res) {
    const { id } = req.params

    const cursoActualizado = CursosModel.updateMatematicas({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static updateBD(req, res) {
    const { id } = req.params

    const cursoActualizado = CursosModel.updateBD({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static patchProgramacion(req, res) {
    const { id } = req.params

    const cursoActualizado = CursosModel.patchProgramacion({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static patchMatematicas(req, res) {
    const { id } = req.params

    const cursoActualizado = CursosModel.patchMatematicas({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static patchBD(req, res) {
    const { id } = req.params

    const cursoActualizado = CursosModel.patchBD({
      id,
      input: req.body
    })

    if (!cursoActualizado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json(cursoActualizado)
  }

  static deleteProgramacion(req, res) {
    const { id } = req.params
    const eliminado = CursosModel.deleteProgramacion({ id })

    if (!eliminado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json({
      mensaje: 'Curso eliminado',
      curso: eliminado
    })
  }

  static deleteMatematicas(req, res) {
    const { id } = req.params
    const eliminado = CursosModel.deleteMatematicas({ id })

    if (!eliminado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json({
      mensaje: 'Curso eliminado',
      curso: eliminado
    })
  }

  static deleteBD(req, res) {
    const { id } = req.params
    const eliminado = CursosModel.deleteBD({ id })

    if (!eliminado) {
      return res.status(404).json({
        mensaje: 'Curso no encontrado'
      })
    }

    res.json({
      mensaje: 'Curso eliminado',
      curso: eliminado
    })
  }
}
