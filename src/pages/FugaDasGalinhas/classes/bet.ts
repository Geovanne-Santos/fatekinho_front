export class Bet {
  id: string;
  hasBet: boolean;
  value: number;
  status: "wait" | "lose" | "win" | "bet";

  constructor(id: string) {
    this.id = id;
    this.hasBet = false;
    this.value = 0;
    this.status = "wait";
  }

  toBet(betValue: number) {
    this.value = betValue;
    this.hasBet = true;
    this.status = "bet";
  }

  cancelBet() {
    this.status = "wait";
    this.value = 0;
    this.hasBet = false;
  }

  loseBet() {
    this.status = "lose";
    this.hasBet = false;
  }

  winBet() {
    this.status = "win";
    this.hasBet = false;
  }
}
