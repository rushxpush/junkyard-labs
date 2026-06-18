import type { AttackTypeI } from "./AttackType";

export default class Slash implements AttackTypeI {
  constructor() {}

  execute(): string {
    return "The warrior slashes the enemy!";
  }
}
