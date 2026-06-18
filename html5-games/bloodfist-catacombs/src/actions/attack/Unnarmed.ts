import type { AttackTypeI } from "./AttackType";

export default class Unnarmed implements AttackTypeI {
  constructor() {}

  execute(): string {
    return "The warrior attacks with his bare hands!";
  }
}
