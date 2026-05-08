import mysql from 'mysql2/promise'

export const pool = await mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Sin password por el momento
  database: 'cursosdb'
})

// Probar conexión al iniciar
/*try {
  const connection = await pool.getConnection()
  console.log('✅ Conexión a MySQL exitosa')
  connection.release() // 👈 importante: liberar la conexión de vuelta al pool
} catch (error) {
  console.error('❌ Error al conectar a MySQL:', error.message)
  process.exit(1) // 👈 detiene el servidor si no hay conexión
}*/