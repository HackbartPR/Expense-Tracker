//BIBLIOTECAS
import styled, { css } from 'styled-components'

//STYLED COMPONENT CATEGORIA
export const CategoryStyled = styled.td`
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;

  //VERIFICA QUAL O ID DA CATEGORIA
  ${(props) => {
    if (props.name === 'Casa') {
      return css`
        background-color: #ff0000;
      `
    } else if (props.name === 'Automóvel') {
      return css`
        background-color: #ff0000;
      `
    } else if (props.name === 'Alimentação') {
      return css`
        background-color: #ff0000;
      `
    } else if (props.name === 'Investimentos') {
      return css`
        background-color: #71aeff;
      `
    } else if (props.name === 'Outros') {
      return css`
        background-color: #ff0000;
      `
    } else if (props.name === 'Salário') {
      return css`
        background-color: #1bfa2a;
      `
    } else if (props.name === 'Extras') {
      return css`
        background-color: #1bfa2a;
      `
    }
  }}
`
