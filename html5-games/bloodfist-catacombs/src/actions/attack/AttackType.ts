interface AttackTypeI {
  executeAttack: () => string;
}

class Attack {
  type: AttackTypeI | null;

  constructor(type: AttackTypeI | null = null) {
    this.type = type;
  }

  setType(type: AttackTypeI) {
    this.type = type;
  }

  executeAttack(): string {
    if (this.type !== null) {
      return this.type.executeAttack();
    } else {
      return "The warrior cannot attack!";
    }
  }
}

export default Attack;
export type { AttackTypeI };
