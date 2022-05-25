//ESTILIZAÇÃO
import '../styles/Section-Search.css'

export function SectionSearch({
  handleSetNewMessage,
  setInputDate,
  setInputCategory,
  setInputTitle,
  setInputValue,
  inputDate,
  inputCategory,
  inputTitle,
  inputValue,
  categories,
}) {
  return (
    <section className="section-search">
      <form className="section-search__form flex" onSubmit={handleSetNewMessage}>
        <label className="form__label-date flex">
          Data
          <input
            className="form__label-date__input"
            type="date"
            value={inputDate}
            onChange={(e) => {
              setInputDate(e.target.value)
            }}
          />
        </label>

        <label className="form__label-category flex">
          Categoria
          <select
            className="form__label-category__select"
            value={inputCategory}
            onChange={(e) => {
              setInputCategory(e.target.value)
            }}
          >
            <option value=""></option>
            {categories.map((obj) => {
              return (
                <option value={obj.id} key={obj.key}>
                  {obj.description}
                </option>
              )
            })}
          </select>
        </label>

        <label className="form__label-title flex">
          Descrição
          <input
            className="form__label-title__input"
            type="text"
            value={inputTitle}
            onChange={(e) => {
              setInputTitle(e.target.value)
            }}
          />
        </label>

        <label className="form__label-value flex">
          Valor
          <input
            className="form__label-value__input"
            type="number"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value)
            }}
          />
        </label>

        <button className="form__button">Adicionar</button>
      </form>
    </section>
  )
}
