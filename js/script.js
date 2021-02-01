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

function get_valores(atomica,atomicas){
  var resultado = []
  for(var i = 0;i<atomicas.length;i++){
    if(atomicas[i][0] == atomica){
      for(j = 1;j<atomicas[i].length-1;j++){
        resultado.push()
      }
    }
  }
}

function ejecuta_operacion(formula,atomicas){
  var operadores = ['\u00AC','\u2227','\u2228','\u2192','\u21C4']
  var pila_variables = []
  var elemento = ""
  var p = ""
  var q = ""
  var resultado = []
  while (formula.length > 0){
    elemento = formula.shift()
    if(operadores.indexOf(elemento) === -1){
      pila_variables.push(get_valores(elemento,atomicas))
    }else{
      q = pila_variables.pop()
      if(elemento != operadores[0]){
        p = pila_variables.pop()
      }
      resultado = realiza_op_logica(elemento,p,q,atomicas)
    }
  }
  console.log(pila_variables)
}

function inicializa_atomicas(atomicas){
  var limite = Math.pow(2,atomicas.length-1)
  var intervalo = 0
  var valor = false
  var cuenta = 1
  for(var i = 0;i<atomicas.length;i++){
    intervalo = limite/Math.pow(2,i)
    for(j = 1;j<=limite*2;j++){
      atomicas[i].push(valor)
      if(cuenta == intervalo){
        cuenta = 1
        valor = !valor
      }
      else{
        cuenta++
      }
    }
  }
}

function ordena_atomicas(atomicas){
  atomicas.sort(function(a,b){
    if(a<b){
      return -1
    }
    if(a>b){
      return 1
    }
    return 0
  })
}

function aniade_atomica(atomica,atomicas){
  var estructura_atomica = []
  estructura_atomica.push(atomica)
  atomicas.push(estructura_atomica)
}

function atomica_no_encontrada(atomica,atomicas){
  if(atomicas.length === 0){
    return true
  }
  for(var i = 0;i<atomicas.length;i++){
    if(atomicas[i][0] == atomica){
      return false
    }
  }

  return true
  
}

function busca_atomicas(atomicas,formula){
  formula.forEach(element => {
    if(element >= "a" && element <= "z"){
      if(atomica_no_encontrada(element,atomicas)){
        aniade_atomica(element,atomicas)
      }
    }
  })
}

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
  var atomicas = []
  formula = divide_cadena(formula)
  if(revisa_parentesis(formula)){
    formula = shunting_yard(formula)
    busca_atomicas(atomicas,formula)
    ordena_atomicas(atomicas)
    inicializa_atomicas(atomicas)
    ejecuta_operacion(formula,atomicas)
  }else{
    console.log("parentesis no correctos")
  }
}

/*---------------- FUNCIONES PARA LAS OPERACIONES LOGICAS --------------------*/

function conjuncion(p,q){
  return p === true && q === true?true:false
}

function disyuncion(){
  return p === false && q === false?false:true
}

function negacion(p){
  return p === true?false:true
}

function implicacion(p,q){
  return p === true && q === false?false:true
}

function doble_implicacion(p,q){
  return p === q?true:false
}

/*--------------------------- ZONA DE EJECUCION ------------------------------*/

//limpiar_entrada()