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

## Memoria

Librerias:

Husky: para ejectuar git hooks. Permite que el codigo que querramos subir al repositorio este libre de errores, impidiendo la subida/commit si los hubiese.
Se utilizara solamente el typecheck del cliente para agilizar los commits, sabiendo que el servidor no sera modificado y cumple con los requerimientos.

Prettier: para validar la escritura de codigo.

Eslint: se instalaron las dependencias necesarias y se realizo la configuracion correspondiente para trabajar con prettier, para detectar errores dentro del codigo.

Redux: Para el manejo de estados se utiliza redux y react-redux

Saga: Para aplicar middlewares se utilizara redux-saga

Axios: Para la llamada a la api. Tiene buena integracion con typescript y, a mi criteriom, una sintaxis mas limpia que el fetch nativo.

React-router-dom: Para manejar las rutas de la SPA

Jest para manejar los tests suites

axios-mock-adapter: Para poder realizar tests con mayor facilidad mockeando las respuestas

Chakra-icons: pack de iconos de la libreria de chakra

redux-saga-tester: to test sagas e2e


Custom scripts:

typecheck: para evaluar que el codigo typescript no tenga errores. Se puede ejecutar en todo el proyecto como solo en el cliente o servidor con algunas de sus variantes.

lint: para correr eslint dentro del cliente

pre-commit -> checkea prettier y eslint

pre-push -> checkea tsc, prettier, eslint y tests


Casos de redireccion:
  Siempre al iniciar la aplicacion se checkea si hay una sesion abierta, independientemente de la url pedida.
  Una vez checkeado, se procede a ir a la pantalla solicitada, en donde si se quiere ir al login y ya hay una sesion abierta, es redirigido a /clubs. Caso contrario, el componente <RequireAuth> se va a encargar de redireccionar cualquier url al /login

GitHooks:
  antes de realizar un commit se ejecutan el script pre-commit 
  antes de realizar un push se ejecutan el script pre-push 


environment variables:

template en .env.template

token:
  Cualquier solucion que pueda utilizar desde front, va a tener pros y contras.
  Tanto si la guardo en localstorage como en una cookie, hay bulnerabilidad y riesgo de tener una perdida de informacion frente a ataques. Se pueden recibir ataques XSS en el primer caso, o CSRF en el segundo.

  Otra opcion es guardarla en memoria, lo cual tendria seguridad frente a estos ataques, pero esto haria que ante cualquier refresh el token se pierda y tengamos que realizar el login de nuevo.

  La solucion que optaria en un ambiente productivo real, seria guardar un refresh token en una cookie http only y el token en memoria, pero para ello deberia haber una implementacion del lado del servidor que haga match con los endpoints que provee la api.


ClubsCatalogSlice:

  En el catalogo, decidi guardar el offset ya que se necesita saber que pagina del catalogo estoy viendo. Esta pagina solamente cambia cuando efectivamente la busqueda se realizo correctamente y podria pasar de a una o mas pagians si asi se quisiera.

  Caso distinto fueron las busquedas por nombre o favoritos, ya que las tome como un filtro mas que una opcion de busqueda, por lo que el catalogo sabe que filtros tiene aplicados, sean nombre, favoritos, o ambos, y estos pueden ser actualizados mediante sus acciones, para luego efectivamente realizar la busqueda.

  Esta division se realizo fundamentalmente para solucionar el problema de la paginacion, ya que el paginador no deberia por que saber que filtros tiene aplicado el catalogo, sino a que pagina del mismo ir.


DONT FORGET!!!
  Poner de nuevo strict mode.
  Sacar el boton de autologin
  Remover/opcional delays en requests para ver pantallas de loading
  Handle errores en una funcion externa y yields de session expired
  Explicar por que uni tests de redux y sagas
  Agregar explicacion de env.template
  Agregar handleo de bad request en clubs si tengo tiempo
  Mensaje de error - explicacion accesibilidad
  