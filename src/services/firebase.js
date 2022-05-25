//BIBLIOTECAS
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, child, get, onValue, off } from 'firebase/database'
import { useEffect, useState } from 'react'

//SERVICES
import { setRandomString } from './IDGenerator'
import { messagesFilteredByDate } from './dateFilter'
import { addDecimalNumber, formatValueByCategory } from '../services/valueFilter'
//MODELOS
import { CategoriesModel } from '../models/Categories'

//CONFIGURAÇÃO DO FIREBASE WEB
const firebaseConfig = {
  apiKey: process.env.REACT_APP_APIKEY,
  authDomain: process.env.REACT_APP_AUTHDOMAIN,
  projectId: process.env.REACT_APP_PROJECTID,
  storageBucket: process.env.REACT_APP_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
  appId: process.env.REACT_APP_APPID,
}

//INICIALIZAÇÃO DO APLICATIVO FIREBASE WEB
const app = initializeApp(firebaseConfig)
//REFERÊNCIA DO BANCO DE DADOS
const db = getDatabase(app)

//INSERIR TODAS AS CATEGORIAS NO BANCO DE DADOS
function insertCategories(arrayModel) {
  try {
    arrayModel.forEach((category) => {
      const randomID = setRandomString(16)
      set(ref(db, `categories/${randomID}`), {
        id: category.id,
        description: category.description,
      })
    })

    return { isSaved: true, error: false, message: '' }
  } catch (e) {
    return { isSaved: false, error: true, message: e.message }
  }
}

//BUSCAR TODAS AS CATEGORIAS SALVAS NO BANCO DE DADOS
export function GetCategories() {
  //HOOK PARA GUARDAR TODAS AS CATEGORIAS SALVAS NO BANCO DE DADOS
  const [categories, setCategories] = useState(new Array())
  //HOOK PARA GUARDAR O LOADING
  const [loadCategory, setLoadCategory] = useState(true)
  //REFERÊNCIA DO BANCO DADE DADOS
  const dbRef = ref(db)

  useEffect(() => {
    get(child(dbRef, 'categories')).then((snapshot) => {
      //CASO O SNAPSHOT RETORNE VAZIO, EXECUTA A FUNÇÃO DE INSERIR CATEGORIAS NO FIREBASE
      if (!snapshot.exists()) {
        const isSaved = insertCategories(CategoriesModel)
        !isSaved.isSaved && alert('Erro ao salvar as categorias no banco de dados! Erro: ' + isSaved.message)

        return
      }

      //RESPONSÁVEL POR RECOLHER TODOS AS CATEGORIAS DO BANCO DE DADOS
      let prevCategories = new Array()

      //TRANSFORMA A RESPOSTA EM UM ARRAY DE OBJETOS
      Object.entries(snapshot.val()).map(([key, val]) => {
        prevCategories.push({
          key: key,
          id: val.id,
          description: val.description,
        })
      })

      setCategories(prevCategories)
      setLoadCategory(false)
    })
  }, [])

  return { categories, loadCategory }
}

//INSERIR UMA NOVA MENSAGEM NO BANCO DE DADOS
export function insertNewMessage(date, category, title, value) {
  const randomID = setRandomString(16)

  try {
    set(ref(db, `messages/${randomID}`), {
      date: date,
      category: category,
      title: title,
      value: value,
    })

    return { isSaved: true, error: false, message: '' }
  } catch (e) {
    return { isSaved: false, error: true, message: e.message }
  }
}

//BUSCAR TODAS AS MENSAGENS SALVAS NO BANCO DE DADOS
export function GetMessages(currentMonth) {
  const [messages, setMessages] = useState(new Array())
  const [loadMessages, setLoadMessages] = useState(true)

  useEffect(() => {
    const starCountRef = ref(db, 'messages')

    onValue(starCountRef, (snapshot) => {
      const arrayMessages = new Array()

      if (!snapshot.exists()) {
        setLoadMessages(false)
        return
      }

      Object.entries(snapshot.val()).map(([key, value]) => {
        //REALIZA A FILTRAGEM DAS MENSAGENS PELA DATA ATUAL
        if (messagesFilteredByDate(value.date, currentMonth)) {
          const decimalValue = addDecimalNumber(value.value)
          const formatedValue = formatValueByCategory(decimalValue, value.category)

          arrayMessages.push({
            id: key,
            category: value.category,
            date: value.date,
            title: value.title,
            value: formatedValue,
          })
        }
      })

      setMessages(arrayMessages)
      setLoadMessages(false)
    })

    return () => {
      off(starCountRef)
    }
  }, [currentMonth])

  return { messages, loadMessages }
}
