import type { AttackTypeI } from "./AttackType";

export default class Concussive implements AttackTypeI {
  constructor() {}

  executeAttack(): string {
    return "The warrior attacks with the sword's pommel!";
  }
}
