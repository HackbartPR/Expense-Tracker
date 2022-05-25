//RECEBE TODAS AS CATEGORIAS DO BANCO DE DADOS E RETORNA APENAS OS ID'S
export function selectCategoryIDs(array) {
  const arrayNames = new Array()

  array.forEach((category) => {
    arrayNames.push(category.description)
  })

  return arrayNames
}
