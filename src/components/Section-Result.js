//ESTILIZAÇÃO
import '../styles/Section-Result.css'
//SERVIÇOS
import { getMonthName } from '../services/dateFilter'
import { addPositiveValues, addNegativeValues, calculateBalance } from '../services/valueFilter'
//STYLED COMPONENTS
import { BalanceStyled } from '../styled-components/ValueStyled'

export function SectionResult({ handlePrevMonth, handleNextMonth, currentMonth, messages }) {
  return (
    <section className="section-result flex">
      <div className="section-result__search-month">
        <i className="icon icon-arrow-left-circle" onClick={handlePrevMonth} />
        <span className="search-month__month">{getMonthName(currentMonth)}</span>
        <i className="icon icon-arrow-right-circle" onClick={handleNextMonth} />
      </div>

      <div className="section-result__income flex">
        <span className="income__title">Receita</span>
        <span className="income__value">{`R$ ${addPositiveValues(messages)}`}</span>
      </div>

      <div className="section-result__expense flex">
        <span className="expense__title">Despesa</span>
        <span className="expense__value">{`R$ ${addNegativeValues(messages)}`}</span>
      </div>

      <div className="section-result__balance flex">
        <span className="balance__title">Balanço</span>
        <BalanceStyled value={calculateBalance(messages)}>{`R$ ${calculateBalance(messages)}`}</BalanceStyled>
      </div>
    </section>
  )
}
