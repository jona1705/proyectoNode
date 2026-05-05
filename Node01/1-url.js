// const { URL } = require('url'); // commonJS

// import { URL } from 'node:url' // ES Modules

// Desde Node.js 10+, URL está disponible globalmente sin necesidad de 
// importar nada.

// Vamos a crear un objeto URL a partir de una cadena de caracteres
const miURL = new URL('https://www.ejemplo.com:8080/cursos/programacion?orden=listar&nivel=1')

console.log(URL === globalThis.URL); // true 

// Nombre del Host
console.log(miURL.hostname)

// Path (camino)
console.log(miURL.pathname)

// Protocolo
console.log(miURL.protocol)

// Nombre del Port
console.log(miURL.port)

// Parametros Query
console.log(miURL.searchParams)
// Se retorna un objeto con los parametros
console.log(typeof miURL.searchParams)

// Obtener valor en ordenar
console.log(miURL.searchParams.get('orden'))

// Obtener valor en nivel
console.log(miURL.searchParams.get('nivel'))

// Podemos construir una URL (usando el objeto URL)
const otraURL = new URL('https://api.ejemplo.com')

otraURL.pathname = '/movie'
otraURL.searchParams.set('genre', 'movies')
otraURL.searchParams.set('year', '2024')
// obtener valores
console.log(otraURL.searchParams.get('genre'))
console.log(otraURL.searchParams.get('year'))
// Tiene title
console.log(otraURL.searchParams.has('title'))

console.log('Nueva URL Completa: ', otraURL.href)

// Borrando algun parametro
otraURL.searchParams.delete('year')

console.log('Nueva URL Completa: ', otraURL.href)
