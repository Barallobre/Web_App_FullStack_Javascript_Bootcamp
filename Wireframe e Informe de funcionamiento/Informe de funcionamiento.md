## Análisis funcional de página web de gestión de espacios de coworking.
Esta web es una plataforma para la gestión de espacios de trabajo dirigida a personas que quieren disponer de un espacio de trabajo dónde dispongan de un ambiente laboral adecuado y de los materiales que necesiten para la realización de sus tareas.
### Funcionamiento de la web:
Un usuario anónimo podrá entrar en la landing de la web y navegar a través de ella. Si cubre el formulario podrá acceder a la información sobre su búsqueda. Si este usuario anónimo está interesado en acudir a un espacio de trabajo deberá logearse primero o registrarse como usuario, una vez hecho esto podrá confirmar su reserva y realizar el pago. En todo momento podrá modificar su perfil, así como cancelar sus reservas activas y dentro de las fechas que acuda también podrá dar de alta alguna incidencia si es necesario. Por otro lado, el usuario administrador tendrá la capacidad de insertar, modificar o eliminar espacios de trabajo y por otro lado inspeccionar las incidencias dadas de alta por los usuarios, así como darlas de baja una vez solucionadas.
### Procesos a tener en cuenta en la web:
* **Proceso de búsqueda de espacios**

En el índex de la web nos encontramos con un formulario al que puede acceder cualquier usuario aún sin estar registrado, en él podemos buscar un espacio de trabajo de coworking introduciendo diversos parámetros: nombre del espacio, localidad a la que pertenece el espacio que buscamos, introducción del tipo de espacio, seleccionando el material que necesitamos que el espacio disponga y seleccionando las fechas en las que nos gustaría reservar.  
Una vez introducidos los datos necesarios clicamos en el botón de búsqueda y este no redirigirá a la sección de confirmación de reserva donde veremos los espacios encontrados según la búsqueda del usuario.

* **Proceso de login**

Para logearnos en la web deberemos acceder a la parte superior y clicar en la opción correspondiente, se nos abrirá un pop-up en el que debemos introducir nuestras credenciales: email y contraseña. Una vez hecho esto aparecerá nuestro nombre en la esquina superior derecha y podremos acceder a un desplegable con las opciones de acceder a reservas, modificar sesión o cerrar sesión.

* **Proceso de registro**

La opción de registrarnos en la web es necesaria para poder reservar espacios de trabajo, podemos hacerlo clicando en la parte superior del índex en el lugar correspondiente. Una vez cliquemos nos aparecerá un pop-up en el que deberemos introducir unos datos mínimos para el registro, que serán: email y contraseña, así como la confirmación de esta.


* **Proceso de confirmación de reserva**

Si hemos escogido un espacio de trabajo una vez realizada la búsqueda en el índex y si además estamos logeados, podremos disponernos a confirmar nuestra reserva, en la lista de espacios disponibles, clicamos el botón de confirmación y nos saltará un pop-up para la realización del pago de la reserva.  
Debemos aclarar que, si clicamos el botón de confirmación y no estamos logeados en la web, nos aparecerá el pop-up de login para que así lo hagamos.

* **Proceso de elección de tipo de pago y de pago**

Una vez nos aparezca está ventana como consecuencia de confirmar la reserva, tenemos una lista de formas de pago a escoger, podremos escoger la deseada y pulsar el botón de aceptar para que nos redirija a la página de pago correspondiente, se confirme el pago en nuestra base de datos y se envíe un email al usuario en cuanto que el trámite ha sido realizado correctamente.

* **Proceso de modificación del perfil**

Si estamos logeados dentro de la web tendremos la posibilidad de acceder a un desplegable que aparecer al hacer hover sobre nuestro nombre en el header. Si somos un usuario normal podremos acceder a la modificación del perfil desde ahí.  
En la modificación del perfil se nos permite insertar una foto, cambiar el email utilizado, cambiar nuestra contraseña actual, introducir una pequeña bio sobre el usuario, introducir un nombre de usuario y/o introducir también los apellidos del usuario. 
Para aceptar los cambios realizados el usuario deberá introducir primero la contraseña que tenía hasta ese momento y clicar el botón de aceptar.

* **Proceso de cancelación de reservas**

Si estamos logeados dentro de la web tendremos la posibilidad de acceder a un desplegable que aparecer al hacer hover sobre nuestro nombre en el header. Si somos un usuario normal podremos acceder desde ahí a las reservas hechas por el usuario.  
Nos aparecerá una lista con los espacios reservados y la información siguiente correspondiente a cada uno: nombre del espacio y fechas entras las que se ha reservado. Al lado de esta información tendremos dos opciones que podremos clicar mediante dos botones, con uno cancelamos la reserva y con el otro reportamos una incidencia de ese espacio en particular.

* **Proceso de alta de incidencias**

Una vez clicamos el botón correspondiente a reportar una incidencia dentro de nuestras reservas, se nos redirigirá a la página donde podremos hacer el reporte.  
En esta sección podremos seleccionar el tipo de incidencia dentro de una lista desplegable y escribir a mayores ciertos pormenores si el usuario lo cree conveniente.

* **Proceso de administrador de alta de espacio**

Si nos hemos logeado con el usuario especial de administrador, en el menú desplegable podemos entrar en la sección de los espacios que tenemos dados de alta o donde aparecerán cuando se den de alta, ahí mismo tenemos un botón con el que acceder a la sección en la que daremos de alta un nuevo espacio.  
En la sección de altas podremos introducir ciertos datos sobre el nuevo espacio que son: una fotografía del espacio, el nombre del espacio, la localidad en la que se encuentra, el tipo de espacio del que se trata, radio buttons para escoger que equipamientos dispone y al al lado un select para escoger la cantidad de cada uno, por último, otro desplegable donde escoger las fechas en las que estará disponible el espacio para su reserva.

* **Proceso de administrador de modificación o borrado de espacio**

Si nos hemos logeado con el usuario especial de administrador, en el menú desplegable podemos entrar en la sección de los espacios que tenemos dados de alta o donde aparecerán cuando se den de alta, ahí mismo tenemos un botón con el que acceder a la sección en la que modificaremos un perfil ya dado de alta.    
En la sección de modificación podremos modificar todos los datos que hemos introducido al darlo de alta: el nombre del espacio, la fotografía, la localidad a la que pertenece, el tipo de espacio del que se trata, el equipamiento del que dispone y las fechas de disponibilidad de reserva.  
Una vez introducimos los datos nuevos podemos clicar el botón de aceptar para que se realicen las modificaciones correspondientes.
Por otro lado, tendríamos el botón de borrado, con el que daremos de baja un espacio que se encuentre en la web.

* **Proceso de administrador de baja de incidencias solucionadas**

Si nos hemos logeado con el usuario especial de administrador, en el menú desplegable podemos entrar en la sección de los espacios que tenemos dados de alta o donde aparecerán cuando se den de alta, ahí mismo tenemos un botón con el que acceder a la sección en la que accedemos a las incidencias dadas de alta por los usuarios de un espacio en particular.
Una vez en está sección podemos ver los datos relativos a las incidencias dadas de alta: el tipo de incidencia, fecha de alta, comentario sobre la incidencia y el usuario que la ha reportado.  
Adyacente a cada fila de incidencia dispondrá el administrador de un botón para dar de baja esa incidencia si considera que ha sido solucionada.  
Por otro lado, también disponemos de un botón con el que volver de nuevo a los espacios dados de alta.
