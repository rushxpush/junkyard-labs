import type { AttackTypeI } from "./AttackType";

export default class Unnarmed implements AttackTypeI {
  constructor() {}

  executeAttack(): string {
    return "The warrior attacks with his bare hands!";
  }
}
