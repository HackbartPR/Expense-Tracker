//BIBLIOTECAS
import { useEffect, useState } from 'react'
//ESTILIZAÇÃO
import '../styles/Home.css'
//ÍCONES
import '../assets/icons/style.css'
//SERVIÇOS
import { GetCategories, insertNewMessage, GetMessages } from '../services/firebase'
import { getCurrentDate, prevCurrentMonth, nextCurrentMonth, formatDateToString, formatDateToInputDate, formatDateToSaveMessage } from '../services/dateFilter'
//COMPONENTES REACTS
import { SectionResult } from '../components/Section-Result'
import { SectionSearch } from '../components/Section-Search'
import { SectionTable } from '../components/Section-Table'

//APLICAÇÃO
export function Home() {
  //HOOKS DAS INFORMAÇÕES PREENCHIDAS NOS FORMULÁRIOS
  const [inputDate, setInputDate] = useState(new Date())
  const [inputCategory, setInputCategory] = useState('')
  const [inputTitle, setInputTitle] = useState('')
  const [inputValue, setInputValue] = useState('')

  //HOOK PARA GUARDAR A DATA ATUAL SELECINADA NO FILTRO DE MENSAGENS
  const [currentMonth, setCurrentMonth] = useState(getCurrentDate())

  //HOOK PARA RECEBER TODAS AS CATEGORIAS SALVAS NO BANCO DE DADOS
  const { categories, loadCategory } = GetCategories()
  //HOOK PARA RECEBER TODAS AS MENSAGENS
  const { messages, loadMessages } = GetMessages(currentMonth)

  useEffect(() => {
    //INSERIR NOVA DATA NO INPUT DATE
    setInputDate(formatDateToInputDate(currentMonth))
  }, [currentMonth])

  //SALVAR UMA NOVA MENSAGEM
  function handleSetNewMessage(event) {
    event.preventDefault()

    //VERIFICAR SE TODOS OS CAMPOS FORAM PREENCHIDOS
    if (
      inputDate !== '' &&
      inputDate !== null &&
      inputCategory !== '' &&
      inputCategory !== null &&
      inputTitle !== '' &&
      inputTitle !== null &&
      inputValue !== '' &&
      inputValue !== null &&
      inputValue !== 0
    ) {
      //RECEBER O RESULTADO DOS DADOS SALVOS
      const isSaved = insertNewMessage(formatDateToSaveMessage(inputDate), inputCategory, inputTitle, inputValue)
      !isSaved.isSaved && alert(isSaved.message)

      //LIMPAR TODOS OS CAMPOS DE INSERÇÃO DE DADOS
      handleClearInputs()
    } else {
      window.alert('Campo em branco!')
    }
  }

  //LIMPAR OS CAMPOS DE BUSCA
  function handleClearInputs() {
    setInputDate(formatDateToInputDate(currentMonth))
    setInputCategory('')
    setInputTitle('')
    setInputValue('')
  }

  //REALIZAR A TROCA DE MÊS PARA O MÊS ANTERIOR
  function handlePrevMonth() {
    //PASSA PARA O MÊS ANTERIOR, MAS RETORNA COM OS DADOS EM FORMATO NEW DATE()
    const prevMonth = prevCurrentMonth(currentMonth)
    //TRANSFORMA DO FORMATO NEW DATE PARA MES - ANO
    const formatPrevMonth = formatDateToString(prevMonth)
    //SALVA COMO MÊS ATUAL
    setCurrentMonth(formatPrevMonth)
  }

  //REALIZAR A TROCA DE MÊS PARA O MÊS SEGUINTE
  function handleNextMonth() {
    //PASSA PARA O MÊS SEGUINTE, MAS RETORNA COM OS DADOS EM FORMATO NEW DATE()
    const nextMonth = nextCurrentMonth(currentMonth)
    //TRANSFORMA DO FORMATO NEW DATE PARA MES - ANO
    const formatNextMonth = formatDateToString(nextMonth)
    //SALVA COMO MÊS ATUAL
    setCurrentMonth(formatNextMonth)
  }

  //HTML COM TODAS AS INFORMAÇÕES CORREGADAS
  if (!loadCategory && !loadMessages) {
    return (
      <div className="home">
        <header className="header">
          <h1 className="header__title">Sistema Financeiro</h1>
        </header>
        <div className="body flex">
          <SectionResult currentMonth={currentMonth} handlePrevMonth={handlePrevMonth} handleNextMonth={handleNextMonth} messages={messages} />
          <SectionSearch
            handleSetNewMessage={handleSetNewMessage}
            setInputDate={setInputDate}
            setInputCategory={setInputCategory}
            setInputTitle={setInputTitle}
            setInputValue={setInputValue}
            inputDate={inputDate}
            inputCategory={inputCategory}
            inputTitle={inputTitle}
            inputValue={inputValue}
            categories={categories}
          />
          <SectionTable messages={messages} />
        </div>
      </div>
    )
  }

  //HTML DE LOADING
  return (
    <div className="container__loading">
      <div className="loader"></div>
    </div>
  )
}
