import { Bet } from "./bet.js";

export class Player {
  private money: number;
  private bets: Bet[] = [];
  private updatePlayerMoney: (newMoney: number) => void;

  constructor(
    moneyState: number,
    updatePlayerMoney: (newMoney: number) => void
  ) {
    this.money = moneyState;
    this.updatePlayerMoney = updatePlayerMoney;
  }

  createBet(id: string) {
    this.bets.push(new Bet(id));
  }

  get playersBets() {
    return this.bets.filter((bet) => {
      return bet.hasBet == true;
    });
  }

  winMoney(winnedMoney: number) {
    this.updatePlayerMoney(this.money + winnedMoney);
  }

  loseMoney(lostMoney: number) {
    this.updatePlayerMoney(this.money - lostMoney);
  }

  setBetValue(betId: string, betValue: number) {
    const bet = this.getBet(betId);
    if (bet) {
      bet.toBet(betValue);
    }
  }

  getBetValue(betId: string) {
    const bet = this.getBet(betId);
    if (bet) {
      return bet.value;
    }
    return 0;
  }

  cancelBet(betId: string) {
    const bet = this.getBet(betId);
    if (bet) {
      bet.cancelBet();
    }
  }

  loseBetsDone() {
    this.bets.forEach((bet) => {
      if (bet.status == "bet") {
        bet.loseBet();
      }
    });
  }

  /**
   * Obtém as apostas perdidas pelo jogador.
   * @returns {Bet[]} As apostas perdidas pelo jogador.
   */
  getLostBets() {
    return this.bets.filter((bet) => bet.status == "lose");
  }

  private getBet(betId: string) {
    return this.bets.find((bet) => bet.id == betId);
  }

  winBet(betId: string) {
    const betToUpdate = this.getBet(betId);
    if (betToUpdate) {
      betToUpdate.winBet();
    }
  }

  hasEnoughMoney(moneyToCompare: number) {
    return moneyToCompare < this.money;
  }
}
