//ADICIONAR DUAS CASAS DECIMAIS NO VALOR
export function addDecimalNumber(value) {
  const newValue = parseFloat(value)

  return newValue.toFixed(2)
}

//TRANSFORMA O NÚMERO EM POSITIVO OU NEGATIVO DEPENDENDO DA CATEGORIA ASSIMILADO
export function formatValueByCategory(value, category) {
  const parsedCategory = parseFloat(category)

  //CASO A CATEGORIA NÃO SEJA DE ENTRADA DE CAIXA, RETORNA UMA VALOR NEGATIVO
  if (parsedCategory !== 6 && parsedCategory !== 7) {
    const number = parseFloat(value * -1).toFixed(2)

    return number
  }

  return value
}

//FILTRAR TODOS OS VALORES POSITIVOS E SOMÁ-LOS
export function addPositiveValues(messages) {
  var resultPositValues = 0

  //PERCORRER TODAS AS MENSAGENS E
  messages.map((msg) => {
    msg.value > 0 && (resultPositValues += parseFloat(msg.value))
  })

  return resultPositValues.toFixed(2)
}

//FILTRAR TODOS OS VALORES NEGATIVOS E SOMÁ-LOS
export function addNegativeValues(messages) {
  var resultNegatValues = 0

  //PERCORRER TODAS AS MENSAGENS E
  messages.map((msg) => {
    msg.value < 0 && (resultNegatValues += parseFloat(msg.value))
  })

  return resultNegatValues.toFixed(2)
}

//CALCULAR BALANÇO GERAL
export function calculateBalance(messages) {
  const income = addPositiveValues(messages)
  const expense = addNegativeValues(messages)

  return (parseFloat(income) + parseFloat(expense)).toFixed(2)
}
