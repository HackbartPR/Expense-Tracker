import styled, { css } from 'styled-components'

//FORMATA A COR DO COMPONENTE DE ACORDO COM SEU VALOR
export const ValueStyled = styled.td`
  padding: 0.5rem 1rem;

  ${(props) => {
    if (props.value < 0) {
      return css`
        color: #ff0000;
      `
    } else {
      return css`
        color: #1bfa2a;
      `
    }
  }}
`

export const BalanceStyled = styled.span`
  ${(props) => {
    if (props.value < 0) {
      return css`
        color: #ff0000;
      `
    } else {
      return css`
        color: #1bfa2a;
      `
    }
  }}
`
