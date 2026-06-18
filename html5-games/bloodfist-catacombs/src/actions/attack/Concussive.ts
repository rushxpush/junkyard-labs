import type { AttackTypeI } from "./AttackType";

export default class Concussive implements AttackTypeI {
  constructor() {}

  execute(): string {
    return "The warrior attacks with the sword's pommel!";
  }
}
