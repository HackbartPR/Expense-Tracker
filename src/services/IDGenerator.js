//FUNÇÃO RESPONSÁVEL POR GERAR UMA STRING ALEATÓRIA, ESTA UTILIZADA PARA SER ID DOS DADOS SALVOS NO BANCO DE DADOS
export function setRandomString(length) {
  var stringAleatoria = ''
  var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (var i = 0; i < length; i++) {
    stringAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length))
  }
  return stringAleatoria
}
