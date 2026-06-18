import type { AttackTypeI } from "./AttackType";

export default class Thrust implements AttackTypeI {
  constructor() {}

  executeAttack(): string {
    return "The warrior thrusts his sword!";
  }
}
