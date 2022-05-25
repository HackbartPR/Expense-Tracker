//COMPONENTES
import { CategoriesModel } from '../models/Categories'

//FILTRA O NOME DA CATEGORIA PELO ID
export function showCategoryName(id) {
  var name = ''

  CategoriesModel.forEach((category) => {
    //VERIFICA SE O ID RECEBIDO É IGUAL AO ID SALVA, SE SIM, RETORNA O NOME DA CATEGORIA
    category.id == id && (name = category.description)
  })

  return name
}
