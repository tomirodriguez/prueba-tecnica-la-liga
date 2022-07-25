# Prueba técnica React de LaLiga

- Versión de Node >= 14.18.0
- Versión de Yarn >= 1.22.18
- Compatibilidad: ES6 Navegadores evergreen (Chrome, Firefox, Edge, Safari)

## Instrucciones

- [Instrucciones](client/src/docs/laliga-prueba-tecnica-instrucciones.md)

## Entorno de desarrollo local

### Estructura del proyecto

```text
|--carpeta-raiz
    |
    |--client
    |
    |--server
```

- En **client** es donde realizarás la prueba técnica solicitada.
- En **server** está incluida la API que debes consumir para tu desarrollo.
- <u>En server **no debes hacer ninguna modificación**</u>.
  <br />
  <br />

## Instalación y ejecución de `server`

```bash
cd server
yarn && yarn start

```

> Por defecto el servidor local de back se despliega en http://localhost:4000

> Puedes consultar la API en http://localhost:4000/api-docs/

<br />
<br />

## Instalación y ejecución de `client`

```bash
cd client
yarn && yarn start
```

> Por defecto el servidor local de front se despliega en http://localhost:3000

  <br />
  <br />

## Instalación de dependencias en raiz

```bash
yarn
```

  <br />
  <br />

# Memoria

## Variables de entorno

Se debe crear un archivo `.env.development` a partir de `.env.template`. 

```javascript
// Representa la URL de la API
REACT_APP_API_URL=

// Valor opcional
// Si se pone en true va a simular un delay en la conexion
// Sirve si se quiere ver mas en detalle los "loadings"
REACT_APP_MOCK_DELAY=
```

## Librerias

### Husky

---
Permite facilitar la creacion de Git Hooks.
La he utilizado para verificar que el codigo que se sube al repositorio este lo mas libre de errores posible.

Se realizan dos verificaciones distintas para agilizar tiempos: una antes de realizar un commit y la otra antes de realizar un push. En el primer caso solo se verifica typechecks, eslint y prettier, mientras que al segundo se le agregan los tests.

</br>

### Pretier y Eslint

---  
Para validar la escritura de codigo. Se instalaron librerias secundarias para que no interfieran entre ellas.

</br>

### Redux

---  
Para tener un estado global dentro de la aplicacion

</br>

### Redux-Saga

---  
Se aplican middlewares a Redux con Redux-Saga para soportar llamadas asincronas a la api.

</br>

### Redux-saga-tester
  
---
Facilitar el testing de redux-saga, pudiendo aplicarlos sobre la totalidad del flujo de la saga y verificar el correcto flujo de los mismos. Recomendada por la documentacion de Redux-Saga

</br>

### Axios

---
Para realizar llamadas a la api. La utilizo principalmente porque tiene buena integracion con typescript y, a mi criteriom, una sintaxis mas limpia que el fetch nativo. Tambien me permite con mayor facilidad realizar mocks de las llamadas para poder hacer testing.

</br>

### Axios Mock Adaptar

---
Siguiendo con Axios, esta libreria es la que me permite realizar mocks de las respuestas de la api con muchisima facilidad y simpleza.

</br>

### React-router-dom

---  
Para manejar las distintas rutas de la aplicacion y las redirecciones en la misma.

</br>

### Jest

---  
Para organizar los tests que se realizaron.

</br>

### Chakra-icons

---
Se agrego ademas de Chakra UI para poder contar con iconos dentro de la aplicacion.


</br>

## Custom scripts

```bash
typecheck
typecheck:client
typecheck:server
```

>Para evaluar que el codigo typescript no tenga errores. Se puede ejecutar tanto en todo el proyecto como solo en el cliente o servidor con algunas de sus variantes.

</br>

```bash
lint
```

>Para correr eslint dentro del cliente

</br>

```bash
pre-commit
```

>checkea prettier, eslint y typecheck

</br>

```bash
pre-push
```

>Corre pre-commit y tests del cliente

</br>

## Redirecciones

Siempre al iniciar la aplicacion se checkea si hay una sesion abierta, independientemente de la url pedida.

Una vez checkeado, se procede a ir a la pantalla solicitada teniendo en cuenta los siguientes casos:

- Si se quiere ir al login y ya hay una sesion abierta, es redirigido a /clubs.
- Si no hay sesion abierta y se quiere acceder a cualquier parte del sitio, el componente `<RequireAuth>` se va a encargar de redireccionar cualquier url al /login

</br>

## GitHooks:

- antes de realizar un commit se ejecuta el script pre-commit.
  
- antes de realizar un push se ejecutan el script pre-push.
  
## Consideraciones y decisiones tomadas

### Token

---
Cualquier solucion que pueda utilizar desde front, va a tener pros y contras.
Tanto si la guardo en localStorage como en una Cookie, hay bulnerabilidad y riesgo de tener una perdida de informacion frente a ataques. Se pueden recibir ataques XSS en el primer caso, o CSRF en el segundo.

Otra opcion es guardarla en memoria, lo cual tendria seguridad frente a estos ataques, pero esto haria que ante cualquier refresh el token se pierda y tengamos que realizar el login de nuevo.

La solucion que optaría en un ambiente productivo real, seria guardar un `refreshToken` en una cookie `http only` y el `token` en memoria, pero para ello deberia haber una implementacion del lado del servidor para que esto funcione correctamente.

</br>

### ClubsCatalogSlice

---
Este Slice va a representar el catalogo entero de clubes, como si fuera una revista. Siguiendo esta logica, debe conocer que pagina esta viendo y poder hacer separar informacion de acuerdo a la necesidad del usuario, provista por filtros: `nombre` y `favorito`.

- El `offset` solo sera actualizado si efectivamente puede "pasar de página".

- Al catalogo se le pueden aplicar criterios de busqueda (filtros), pero este no se va a actualizar hasta que se haga efectiva una busqueda con estos criterios solicitados. Esto permite poder filtrar no solo por favoritismo o nombre, sino por ambos dos a la vez.

</br>

### Testing: Redux & Sagas

---
Los testeos del store de Redux y las Sagas las realice en conjunto ya que van a vivir comunicandose durante toda la aplicacion. Me parecio mas interesante hacer algo integral que realizar testeos por separados de cada uno.

A la vez, al utilizar `SagaTester` de `redux-saga-tester`, me permite realizar esto de una manera super sencilla y limpia.

### Login Form - aria-errormessage

---
Al ver que la libreria de ChakraUI no tiene implementado el aria-errormessage en su Input dentro de un FormGroup, agrega la propiedad fuera de al libreria para mejorar la accesibilidad de la misma.

Se puede ver que no existe en el test the `<Authentication />` en donde a pesar de haber un error, no lo detecta con  el `expect(...).toHaveErrorMessage()`.

</br>

### Check User - Doble llamada

---
Para verificar si hay una sesion abierta, cree un metodo `checkUser` que valida esto. Lo que hace por detras es un request a la api para obtener clubes mediante `api/clubs`.

No obstante, si esta solicitud es completada y efectivamente hay un usuario, estos datos no se van a guardar en ningun lado. La razon detras de esto es que en una aplicacion real, deberia haber algun metodo para traer la informacion del usuario (nombre, email, profile, etc.). Teniendo este método, sí guardaria esta informacion dentro del perfil de usuario, que actualmente esta vacio en todo momento.

Actualmente, a pesar de hacer esa llamada para checkear al usuario, el catalogo vuelve hacer una llamada para obtener el listado de clubes, ya que es quien realmente deberia obtener esa informacion, y no un metodo para checkear si hay un usuario.

Si bien en la practica podria funcionar, no me gustaria depender de obtener los datos a traves de este metodo, ya que si el dia de manana hay un usuario y necesito obtener su datos para ver si hay una sesion abierta, tendria que delegar la busqueda del catalogo a otro lado ya que quien me brindaba la informacion anteriormente no lo estaria haciendo mas.

</br>

### Pendientes

---

- Migrar todo tipo de texto fuera de los coponentes, y llevarlo a un archivo i18n aparte. Permite a la vez soportar distintos idiomas.

- Vista mas en detalle de los clubes, con mas informacion acerca de las temporadas y los jugadores.

- Mejorar el paginador. El diseño quedó pobre en comparacion a lo que tenía planeado.
