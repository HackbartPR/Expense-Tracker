//RETORNA O MÊS E O ANO ATUAL
export function getCurrentDate() {
  const date = new Date()

  return `${date.getFullYear()}-${date.getMonth() + 1}`
}

//FORMATA A ESCRITA DO MÊS ATUAL => 01/2022 = JANEIRO DE 2022
export function getMonthName(currentMonth) {
  const [year, month] = currentMonth.split('-')
  const arrayMonths = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']

  return `${arrayMonths[month - 1]} de ${year}`
}

//VOLTA UM MÊS DO MÊS ATUAL
export function prevCurrentMonth(currentMonth) {
  const [year, month] = currentMonth.split('-')
  let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1)

  currentDate.setMonth(currentDate.getMonth() - 1)

  return currentDate
}

//AVANÇA UM MÊS DO ATUAL
export function nextCurrentMonth(currentMonth) {
  const [year, month] = currentMonth.split('-')
  let currentDate = new Date(parseInt(year), parseInt(month) - 1, 1)

  currentDate.setMonth(currentDate.getMonth() + 1)

  return currentDate
}

//TRANSFORMA O MÊS COMPLETO (DIA, MÊS, ANO, DATA) PARA MÊS - ANO
export function formatDateToString(currentMonth) {
  const month = currentMonth.getMonth()
  const year = currentMonth.getFullYear()

  return `${year}-${month + 1}`
}

//ADICIONA O NÚMERO ZERO NO INÍCIO DOS MESES ANTERIORES AO MÊS 10
export function formatDateToInputDate(currentMonth) {
  const [year, month] = currentMonth.split('-')

  if (month < 10) {
    return `${year}-0${month}-01`
  }

  return `${year}-${month}-01`
}

//REMOVE O NÚMERO ZERO NO INÍCIO DOS MESES ANTERIORES AO MÊS 10
export function formatDateToSaveMessage(date) {
  const [year, month, day] = date.split('-')

  if (month < 10) {
    return `${year}-${month.substr(1, 1)}-${day}`
  }

  return `${year}-${month}-${day}`
}

//REALIZAR A FILTRAGEM DAS MENSAGENS PELA DATA
export function messagesFilteredByDate(messageDate, currentMonth) {
  const [year, month, day] = messageDate.split('-')
  const [newYear, newMonth] = currentMonth.split('-')

  if (newYear !== year || newMonth !== month) {
    return false
  }

  return true
}

//REALIZA A FORMATAÇÃO DAS DATAS NA TABELA NO FORMATO BRASILEIRO
export function formatDateToTable(date) {
  const [year, month, day] = date.split('-')

  //ADICIONA ZERO NO MÊS
  const prevDate = formatDateToInputDate(`${year}-${month}`)

  //ESTE VALORES CONTÉM O ZERO NO MÊS
  const [newYear, newMonth] = prevDate.split('-')

  return `${day}/${newMonth}/${newYear}`
}
