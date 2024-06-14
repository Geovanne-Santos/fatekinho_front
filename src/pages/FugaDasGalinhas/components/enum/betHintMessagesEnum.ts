export enum betHintMessagesEnum {
  /** Mensagem exibida quando o usuário pode fazer uma aposta. */
  userCanBet = "Faça a sua aposta abaixo",
  /** Mensagem exibida quando o usuário precisa esperar uma nova rodada para apostar novamente após realizar um saque. */
  awaitNewRoundWhenCashOut = "Espere a próxima partida começar, para apostar novamente",
  /** Mensagem exibida quando o usuário precisa esperar uma nova rodada para apostar.*/
  awaitNewRound = "Espere a próxima partida para apostar",
  /** Mensagem exibida quando a rodada acabou e o usuário precisa esperar pela próxima rodada. */
  roundIsOver = "A partida acabou, espere a próxima partida começar.",
  /** Mensagem exibida quando o usuário precisa esperar a partida acabar para fazer uma aposta. */
  awaitNewRoundWhenNotBetted = "Espere a partida acabar para fazer uma aposta",
  /** Mensagem exibida para instruir o usuário a apertar o botão para sacar o dinheiro. */
  cashOut = "Aperte o botão abaixo para sacar o dinheiro.",
  /** Mensagem exibida após o usuário fazer uma aposta e aguardar o início da partida. */
  awaitRoundStart = "Aposta feita, espere a partida começar",
}
