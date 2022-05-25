//ESTILIZAÇÃO
import '../styles/Section-Table.css'
//STYLED COMPONENTS
import { CategoryStyled } from '../styled-components/CategoryStyled'
import { ValueStyled } from '../styled-components/ValueStyled'
//SERVIÇOS
import { formatDateToTable } from '../services/dateFilter'
import { showCategoryName } from '../services/categoryFilter'

export function SectionTable({ messages }) {
  return (
    <section className="section-table">
      <table className="table">
        <thead className="table__header">
          <tr className="table__header__row">
            <th className="table__header__column column__date">Data</th>
            <th className="table__header__column column__category">Categoria</th>
            <th className="table__header__column column__title">Descrição</th>
            <th className="table__header__column column__value">Valor</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {messages.map((msg) => {
            if (msg !== undefined) {
              return (
                <tr className="table__body__row" id={msg.id} key={msg.id}>
                  <td className="table__body__column">{formatDateToTable(msg.date)}</td>
                  <CategoryStyled name={showCategoryName(msg.category)}>{showCategoryName(msg.category)}</CategoryStyled>
                  <td className="table__body__column">{msg.title}</td>
                  <ValueStyled value={msg.value}>{msg.value}</ValueStyled>
                </tr>
              )
            }
          })}
        </tbody>
      </table>
    </section>
  )
}
