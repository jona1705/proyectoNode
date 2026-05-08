import cursos from '../data/cursos.json' with { type: 'json' }

export class CursosModel {

  // Obtener todos los cursos
  static getAll = () => {
    return cursos
  }

  // Obtener todos los cursos de Programacion
  static getAllProgramacion = () => {
    return cursos.programacion
  }

  // Obtener todos los cursos de Matematicas
  static getAllMatematicas = () => {
    return cursos.matematicas
  }

  // Obtener todos los cursos de Bases de datos
  static getAllBD = () => {
    return cursos.bases_de_datos
  }

  // Crear un curso de programación
  static createProgramacion({ input }) {
    const nuevoCurso = {
      id: cursos.programacion.at(-1)?.id + 1 || 1,
      ...input,
      timestamp: Date.now()
    }

    cursos.programacion.push(nuevoCurso)
    return nuevoCurso
  }

  // Crear un curso de matemáticas
  static createMatematicas({ input }) {
    const nuevoCurso = {
      id: cursos.matematicas.at(-1)?.id + 1 || 1,
      ...input,
      timestamp: Date.now()
    }

    cursos.matematicas.push(nuevoCurso)
    return nuevoCurso
  }

  // Crear un curso de bases de datos
  static createBD({ input }) {
    const nuevoCurso = {
      id: cursos.bases_de_datos.at(-1)?.id + 1 || 1,
      ...input,
      timestamp: Date.now()
    }

    cursos.bases_de_datos.push(nuevoCurso)
    return nuevoCurso
  }

  // Actualizar un curso de programacion
  static updateProgramacion({ id, input }) {
    const index = cursos.programacion.findIndex(c => c.id === id)
    if (index === -1) return false

    cursos.programacion[index] = {
      id,
      ...input
    }

    return cursos.programacion[index]
  }

  // Actualizar un curso de matemáticas
  static updateMatematicas({ id, input }) {
    const index = cursos.matematicas.findIndex(c => c.id === id)
    if (index === -1) return false

    cursos.matematicas[index] = {
      id,
      ...input
    }

    return cursos.matematicas[index]
  }

  // Actualizar un curso de bases de datos
  static updateBD({ id, input }) {
    const index = cursos.bases_de_datos.findIndex(c => c.id === id)
    if (index === -1) return false

    cursos.bases_de_datos[index] = {
      id,
      ...input
    }

    return cursos.bases_de_datos[index]
  }
  
   // Actualización parcial de un curso de programacion
  static patchProgramacion({ id, input }) {
    const curso = cursos.programacion.find(c => c.id === id)
    if (!curso) return false
    Object.assign(curso, input)
    return curso
  }

   // Actualización parcial de un curso de matematicas
  static patchMatematicas({ id, input }) {
    const curso = cursos.matematicas.find(c => c.id === id)
    if (!curso) return false
    Object.assign(curso, input)
    return curso
  }

   // Actualización parcial de un curso de bases de datos
  static patchBD({ id, input }) {
    const curso = cursos.bases_de_datos.find(c => c.id === id)
    if (!curso) return false
    Object.assign(curso, input)
    return curso
  }

  // Borrar un curso de programacion
  static deleteProgramacion({ id }) {
    const index = cursos.programacion.findIndex(c => c.id === id)
    if (index === -1) return false
    const eliminado = cursos.programacion.splice(index, 1)
    return eliminado[0]
  }

  // Borrar un curso de matemáticas
  static deleteMatematicas({ id }) {
    const index = cursos.matematicas.findIndex(c => c.id === id)
    if (index === -1) return false
    const eliminado = cursos.matematicas.splice(index, 1)
    return eliminado[0]
  }

  // Borrar un curso de bases de datos
  static deleteBD({ id }) {
    const index = cursos.bases_de_datos.findIndex(c => c.id === id)
    if (index === -1) return false
    const eliminado = cursos.bases_de_datos.splice(index, 1)
    return eliminado[0]
  }
}
