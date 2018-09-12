# Proyecto 'Editor de textos simple'

Vas a construir un programa interactivo que permita escribir hasta 10 líneas de texto con un máximo de 15 caracteres por línea. Para eso, usamos la siguiente representación:

 * La posición del cabezal va a representar al lugar donde se encuentra el cursor, es decir, la posición donde se escribirá el carácter. 
 * Las letras se representan como en la actividad _“Representando caracteres”_ del capítulo 5: con bolitas negras, 1 para la ‘A’, 2 para la ‘B’, etc.
 * El espacio en blanco se representa como una celda vacía (o sea, 0 bolitas negras…).
 
Cada vez que se presione una tecla de letra entre la ‘A’ y la ‘Z’ se debe escribir la letra en el tablero (sin olvidar de borrar la anterior, si había alguna) y avanzar el cursor hacia la derecha. Cuando no sea posible avanzar el cursor se debe continuar en la siguiente línea. Además, se debe dejar un espacio cuando se presione la barra espaciadora y se debe pasar al inicio de la siguiente línea al presionar enter. Es deseable, también, poder mover el cursor usando las flechas de dirección sin alterar el texto. Tené en cuenta que en ningún caso el programa debe fallar (hacer BOOM): en caso de no poder resolver la operación asociada a una tecla el programa debe descartarla y no hacer nada.

En este editor al escribir un carácter se sobreescribe el contenido de la celda en la que se encuentra el cursor; no es necesario mover el texto lindante al agregar o remover caracteres, ya que eso requiere un trabajo adicional más complejo.

Acordate siempre de dividir en subtareas y usar parámetros si es necesario. ¿Qué te parece hacer procedimientos para `PonerCarácter`, `AvanzarCursor`, `IrANuevaLinea` y `LimpiarCelda` y funciones `códigoDeLaLetraA`, …, `códigoDeLaLetraZ` y `códigoDeEspacio` para usar como argumentos de `PonerCarácter`? Fijate que antes de poner cada letra debe limpiarse la celda, después de poner cada letra debería avanzarse el cursor, y en `AvanzarCursor`, si no hay más lugar en la línea, debe ir a una nueva línea.

> **Consejo**
>
>Muchos de los procedimientos que vas a precisar para hacer los que te sugerimos ya los hiciste en actividades anteriores; por ejemplo, los de limpiar celda, avanzar cursor y el de poner caracteres son similares a los de la actividad _“Representando caracteres”_ del Cap.5 (¡pero ahora algunos con parámetros!) y también uno para mover si se puede. Te aconsejamos que los busques y los uses como modelo, ¡así no los tenés que pensar todos de nuevo!
          
[Enunciado en PDF][PDF]

[PDF]: https://raw.githubusercontent.com/Program-AR/proyectos-gobstones-jr/master/Proyectos/Cap.8/803.Editor%20de%20textos%20simple/assets/resources/description.pdf "Enunciado de 'Editor de textos simple' en PDF"
