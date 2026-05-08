import { z } from 'zod'

export const cursoMatematicasSchema = z.object({
  id: z.number({
    error: (issue) => issue.input === undefined 
      ? 'El ID es obligatorio'
      : 'El ID debe ser un numero'
  }),
  titulo: z.string({
    error: (issue) => issue.input === undefined 
      ? 'El titulo es obligatorio'
      : 'El titulo debe ser un texto'
  }).min(1, { error: 'El titulo no puede estar vacío'})
  .min(5, { error: 'El titulo debe tener al menos 5 caracteres'}),
  tema: z.string({
    error: (issue) => issue.input === undefined 
      ? 'El tema es obligatorio'
      : 'El tema debe ser un texto'
  })
  .min(1, { error: 'El titulo no puede estar vacío'})
  .min(5, { error: 'El titulo debe tener al menos 5 caracteres'}),
  vistas: z.number({
    error: (issue) => issue.input === undefined 
      ? 'El campo vistas es obligatorio'
      : 'El campo vistas debe ser un número'
  }).int({ error: 'El campo vistas debe ser entero'})
  .nonnegative({ error: 'El campo vistas no puede ser negativo'}),
  nivel: z.enum(['basico', 'intermedio', 'avanzado'], {
    error: (issue) => issue.input === undefined 
      ? 'El nivel es obligatorio'
      : 'El nivel debe ser: básico, intermedio, avanzado'
  })
})

export const cursoMatematicasPatchSchema = cursoMatematicasSchema.partial()

export const cursoProgramacionSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  tecnologia: z.string(),
  vistas: z.number().int().nonnegative(),
  nivel: z.enum(['basico', 'intermedio', 'avanzado'])
})

export const cursoProgramacionPatchSchema = cursoProgramacionSchema.partial()

export const cursoBDSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  tecnologia: z.string(),
  vistas: z.number().int().nonnegative(),
  nivel: z.enum(['basico', 'intermedio', 'avanzado'])
})

export const cursoBDPatchSchema = cursoBDSchema.partial()