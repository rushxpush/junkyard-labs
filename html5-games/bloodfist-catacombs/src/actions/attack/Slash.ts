import type { AttackTypeI } from "./AttackType";

export default class Slash implements AttackTypeI {
  constructor() {}

  executeAttack(): string {
    return "The warrior slashes the enemy!";
  }
}
