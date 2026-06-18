import type Attack from "./actions/attack/AttackType";

export default class Player {
  attack: Attack;

  constructor(attack: Attack) {
    this.attack = attack;
  }

  executeAttack() {
    this.attack.executeAttack();
  }
}
