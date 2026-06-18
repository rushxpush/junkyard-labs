interface AttackTypeI {
  execute: () => string;
}

class Attack {
  type: AttackTypeI | null;

  constructor(type: AttackTypeI | null = null) {
    this.type = type;
  }

  setType(type: AttackTypeI) {
    this.type = type;
  }

  execute(): string {
    if (this.type !== null) {
      return this.type.execute();
    } else {
      return "The warrior cannot attack!";
    }
  }
}

export default Attack;
export type { AttackTypeI };
