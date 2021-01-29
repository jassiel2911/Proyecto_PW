/*
-> obtener el contenido del input
-> separarlo en un arreglo caracter a caracter
-> verificar que la formula este bien escrita [Ver que si esten el mismo numero de parentesis de apertura y cierre]
*/ 

/*------------------------------ CONSTANTES ----------------------------------*/

const SINTAXIS_CORRECTA = 0
const PARENESIS_NO_ENCONTRADO = -1001
const PARENTESIS_SIN_CERRAR = -1002
const PARENTESIS_SIN_ABRIR = -1003

/*-------------------------- FUNCIONES PARA EL INPUT -------------------------*/

function limpiar_entrada(){
  var formula = document.getElementById("entradaformula")
  formula.value = ""
}

function aniadir_caracter(opcion){
  var formula = document.getElementById("entradaformula")
  switch(opcion){
    case 0:
      formula.value = formula.value + "("
      break;
    case 1:
      formula.value = formula.value + ")"
      break;
    case 2:
      formula.value = formula.value +'\u00AC'
      break;
    case 3:
      formula.value = formula.value + '\u2227'
      break;
    case 4:
      formula.value = formula.value + '\u2228'
      break;
    case 5:
      formula.value = formula.value + '\u2192'
      break;
    case 6:
      formula.value = formula.value + '\u21C4'
      break;
  }
  formula.focus()
}

/*--------------- FUNCIONES PARA ORGANIZAR LAS PROPOSICIONES -----------------*/

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

function pila_no_vacia(pila){
  return pila.length>0?true:false
}

function es_operador(token,lista_operadores){
  return lista_operadores.indexOf(token)!=-1?true:false
}

function shunting_yard(formula){
  var operadores = ['\u00AC','\u2227','\u2228','\u2192','\u21C4']
  var pila_operadores = []
  var cola_formula = []
  formula.forEach(element => {
    var token = element.toLowerCase()
    if(token >= 'a' && token <= 'z'){
      cola_formula.push(token)
    }else if(es_operador(token,operadores)){
      var ultimo_elemento = pila_operadores[pila_operadores.length-1]

      while( (pila_no_vacia(pila_operadores)) && ((ultimo_elemento < token) || (ultimo_elemento === token)) && (ultimo_elemento !== "(") ){
        ultimo_elemento = pila_operadores.pop()
        cola_formula.push(ultimo_elemento)
        ultimo_elemento = pila_operadores[pila_operadores.length-1]
      }
      pila_operadores.push(token)

    }else if(token === "("){
      pila_operadores.push(token)
    }else if(token === ")"){
      ultimo_elemento = pila_operadores[pila_operadores.length-1]
      while(ultimo_elemento !== "(" && ultimo_elemento !== undefined){
        ultimo_elemento = pila_operadores.pop()
        cola_formula.push(ultimo_elemento)
          ultimo_elemento = pila_operadores[pila_operadores.length-1]
      }
      if(ultimo_elemento === "("){
        pila_operadores.pop()
      }
    }
  })
  while(pila_operadores.length > 0){
    ultimo_elemento = pila_operadores.pop()
    cola_formula.push(ultimo_elemento)
    if(ultimo_elemento === "("){
      return PARENTESIS_SIN_CERRAR
    }
  }

  return cola_formula
}

function busca_ocurrencias(formula,caracter){
  var num_ocurrencias = 0
  var indice_caracter = 0
  indice_caracter = formula.indexOf(caracter)
  while(indice_caracter != -1){
    num_ocurrencias += 1
    indice_caracter = formula.indexOf(caracter,indice_caracter+1)
  }
  return num_ocurrencias
}

function revisa_parentesis(formula){
  num_parentesis_izq = busca_ocurrencias(formula,"(")
  num_parentesis_der = busca_ocurrencias(formula,")")
  return num_parentesis_der == num_parentesis_izq?true:false
}

function divide_cadena(cadena){
  return cadena.split("")
}

function hola(){
  var formula = document.getElementById("entradaformula").value
  formula = divide_cadena(formula)
  if(revisa_parentesis(formula)){
    formula = shunting_yard(formula)
    console.log(formula)
  }else{
    console.log("parentesis no correctos")
  }
}

/*--------------------------- ZONA DE EJECUCION ------------------------------*/

//limpiar_entrada()