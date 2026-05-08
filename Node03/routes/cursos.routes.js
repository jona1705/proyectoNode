import { Router } from 'express'
import { CursosController } from '../controllers/cursos.controller.js'
import {
  cursoMatematicasSchema,
  cursoMatematicasPatchSchema,
  cursoProgramacionSchema,
  cursoProgramacionPatchSchema,
  cursoBDSchema,
  cursoBDPatchSchema,
  idParamSchema
} from '../schemas/cursos.schema.js'

import {
  validateBody,
  validateParams
} from '../middlewares/validate.js'

const router = Router()

// GET
router.get('/', CursosController.getAll)
router.get('/programacion', CursosController.getAllProgramacion)
router.get('/matematicas', CursosController.getAllMatematicas)
router.get('/bases_de_datos', CursosController.getAllBD)

// POST
router.post('/programacion',
  validateBody(cursoProgramacionSchema),
  CursosController.createProgramacion)

router.post('/matematicas',
  validateBody(cursoMatematicasSchema),
  CursosController.createMatematicas)

router.post('/bases_de_datos',
  validateBody(cursoBDSchema),
  CursosController.createBD)

// PUT
router.put(
  '/programacion/:id',
  validateParams(idParamSchema),
  validateBody(cursoProgramacionSchema),
  CursosController.updateProgramacion
)

router.put(
  '/matematicas/:id',
  validateParams(idParamSchema),
  validateBody(cursoMatematicasSchema),
  CursosController.updateMatematicas
)

router.put(
  '/bases_de_datos/:id',
  validateParams(idParamSchema),
  validateBody(cursoBDSchema),
  CursosController.updateBD
)

// PATCH
router.patch(
  '/programacion/:id',
  validateParams(idParamSchema),
  validateBody(cursoProgramacionPatchSchema),
  CursosController.patchProgramacion
)

router.patch(
  '/matematicas/:id',
  validateParams(idParamSchema),
  validateBody(cursoMatematicasPatchSchema),
  CursosController.patchMatematicas
)

router.patch(
  '/bases_de_datos/:id',
  validateParams(idParamSchema),
  validateBody(cursoBDPatchSchema),
  CursosController.patchBD
)

// DELETE
router.delete('/programacion/:id',
  validateParams(idParamSchema),
  CursosController.deleteProgramacion
)

router.delete('/matematicas/:id',
  validateParams(idParamSchema),
  CursosController.deleteMatematicas
)

router.delete('/bases_de_datos/:id',
  validateParams(idParamSchema),
  CursosController.deleteBD
)

export default router
