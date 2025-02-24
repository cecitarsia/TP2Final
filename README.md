# TP2-ProyectoFinal
## PICADAS & BIRRAS

### Stack:
- NodeJS
- Express
- MongoDB

### Descripción

Picadas & Birras es una aplicación para que los usuarios puedan acceder a la compra de picadas y cervezas/bebidas de productores locales.
La aplicación ofrece la posibilidad de realizar compras por:
- unidad (un tipo de cerveza, una sola picada)
- combos (combos de distintos tipos de cerveza o cerveza + picada)
 
Los usuarios podrán navegar por el listado de productos, agregar los productos con su cantidad a un nuevo carrito y acceder a su historial de compras.

### Funcionalidades:

- Login/Registro
- ABM usuarios
- ABM productos
- Comprar productos
- Obtener el historial de compra


### Listado de endpoints:
#### Home Productos/ Historial de Compras

- Get All Productos
[http://localhost:3000/api/productos]

- Get producto por Id
[http://localhost:3000/api/productos/:id]

- Agregar un producto (con token de admin)
[http://localhost:3000/api/productos]
```
En body:
{
       "titulo": "[titulo]”,
       "descripcion": “[descripcion]”,
       "precio": [precio],
       "imagen": "[imagen]",
       "tipo": "[tipo]",
       "stock": [stock]
   }
```
- Modificar un producto (con token de admin)
​​[http://localhost:3000/api/productos/:id]
```
En body:
{
       "titulo": "[titulo]",
       "descripcion": "[descripcion]",
       "precio": [precio],
       "imagen": "[imagen]",
       "tipo": "[tipo]",
       "stock": [stock]
   }
```
- Eliminar un producto (con token de admin)
[http://localhost:3000/api/productos/:id]

- Comprar productos (con token de usuario)
[http://localhost:3000/api/historial]  
```
{"productos": [{
        "_id": "[id]",
        "cantidad": [cantidad]
    },
    {
         "_id": "[id]",
        "cantidad": [cantidad]
}]
}
```
- Get historial de usuario
[http://localhost:3000/api/historial]



#### Users
- Agregar usuario
[http://localhost:3000/api/users]
```
En body:
{
   "email":"[email]",
   "password":"[password]"
}
```
- Login
[http://localhost:3000/users/login]
```
En body:
{
   "email":"[email]",
   "password":"[password]"
}
```
- Agregar admin (con token de admin)
[http://localhost:3000/api/users/admin]
```
En body:
{
   "email":"[email]",
   "password":"[password]"
}
```
- Get All Users (con token de admin)
[http://localhost:3000/api/users]

- Borrar User (Desactivar/Baja Lógica)
[http://localhost:3000/api/users/:id]

