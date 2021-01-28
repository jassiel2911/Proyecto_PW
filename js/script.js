/*
-> obtener el contenido del input
-> separarlo en un arreglo caracter a caracter
-> verificar que la formula este bien escrita [Ver que si esten el mismo numero de parentesis de apertura y cierre]
*/ 

/*
WHILE haya tokens por leer:
  leer_token()
  IF token es un numero:
    agrega a la pila
  ELSE IF token es un operador:
    WHILE ( 
      (haya operadores en la cima de la pila) 
      AND
      ( (el operador de la cima de la pila tiene > prescedencia) OR (el operador en la cima de la pila tiene la misma prescedencia) )
      AND
      (el operador en la cima de la pila no es un parentesis izquierdo)
    ):
      extraer de la pila el operador de la cima de la pila y colocarlo en la salida
    agregar a la pila
  ELSE IF es un parentesis izquierdo:
    agregar a la pila
  ELSE IF es un parentesis derecho:
    WHILE el operador en la cima de la pila no sea un parentesis izquierdo;
      extraer el operador de la cima de la pila y agregarla en la salida
    //EN CASO DE ESTAR VACIA LA PILA Y NO HABER ENCONTRADO EL PARENTESIS IZQUIERO, SE GENERA ERROR
    IF en la cima de la pila se encuentra un parentesis izquierdo:
      extraerlo de la pila
IF No existen mas tokens por leer:
  WHILE aun existan tokens en la pila:
    extrer el operador y añadirlo a la pila
  //SI SE LLEGA A ENCONTRAR ALGUN PARENTESIS, SE GENERA ERROR
*/

function divide_cadena(cadena){
  return cadena.split("")
}

function hola(){
  var formula = document.getElementById("entradaformula").value
  formula = divide_cadena(formula)
  console.log(verifica_sintaxis(formula))
}