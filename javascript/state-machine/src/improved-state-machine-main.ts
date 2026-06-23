const logger = (text: string, element: any): void => {
  element.innerText = text;
};

const stateInfo = document.getElementById!("state-info");
const gumballsQuantityInfo = document.getElementById!("gumballs-quantity-info");

interface StateInterface {
  insertQuarter: () => void;
  removeQuarter: () => void;
  turnCrank: () => void;
  dispense: () => void;
}

class NoQuarter implements StateInterface {
  private context: GumballMachine;
  logger: (text: string, element: HTMLElement) => void;
  stateInfo: HTMLElement;

  constructor(
    context: GumballMachine,
    logger: (text: string, element: HTMLElement) => void,
    stateInfo: HTMLElement,
  ) {
    this.context = context;
    this.logger = logger;
    this.stateInfo = stateInfo;
  }

  insertQuarter() {
    this.context.setCurrentState(
      new HasQuarter(this.context, this.logger, this.stateInfo),
    );
    this.logger("Quarter Inserted.", this.stateInfo);
  }
  removeQuarter() {
    this.logger(
      "Cannot eject quarter. None was inserted in the machine.",
      this.stateInfo,
    );
  }
  turnCrank() {
    this.logger(
      "Please, insert a quarter first before turning the crank.",
      this.stateInfo,
    );
  }
  dispense() {
    this.logger("No allowed.", this.stateInfo);
  }
}

class HasQuarter implements StateInterface {
  private context: GumballMachine;
  logger: (text: string, element: HTMLElement) => void;
  stateInfo: HTMLElement;

  constructor(
    context: GumballMachine,
    logger: (text: string, element: HTMLElement) => void,
    stateInfo: HTMLElement,
  ) {
    this.context = context;
    this.logger = logger;
    this.stateInfo = stateInfo;
  }

  insertQuarter() {
    this.logger("Quarter already inserted.", this.stateInfo);
  }
  removeQuarter() {
    this.context.setCurrentState(
      new NoQuarter(this.context, this.logger, this.stateInfo),
    );
    this.logger("Quarter removed from the machine.", this.stateInfo);
  }
  turnCrank() {
    this.logger("Processing request..", this.stateInfo);

    const didWinReward: boolean = this.tryRandomReward();

    if (didWinReward && this.context.getCount() > 1) {
      this.context.setCurrentState(
        new WinReward(this.context, this.logger, this.stateInfo),
      );
      this.context.dispense();
    } else {
      this.context.setCurrentState(
        new Sold(this.context, this.logger, this.stateInfo),
      );
      this.context.dispense();
    }
  }
  dispense() {
    this.logger("No allowed.", this.stateInfo);
  }
  tryRandomReward() {
    if (Math.random() < 0.1) return true;
    else return false;
  }
}

class Sold implements StateInterface {
  private context: GumballMachine;
  logger: (text: string, element: HTMLElement) => void;
  stateInfo: HTMLElement;

  constructor(
    context: GumballMachine,
    logger: (text: string, element: HTMLElement) => void,
    stateInfo: HTMLElement,
  ) {
    this.context = context;
    this.logger = logger;
    this.stateInfo = stateInfo;
  }

  insertQuarter() {
    this.logger("Not allowed", this.stateInfo);
  }
  removeQuarter() {
    this.logger("Not allowed", this.stateInfo);
  }
  turnCrank() {
    this.logger("Not allowed", this.stateInfo);
  }
  dispense() {
    if (this.context.getCount() > 1) {
      this.context.sellGumball();
      this.context.setCurrentState(
        new NoQuarter(this.context, this.logger, this.stateInfo),
      );
      this.logger("Gumball sold. Thanks for your purchase!", this.stateInfo);
    } else if (this.context.getCount() >= 0) {
      this.context.sellGumball();
      this.context.setCurrentState(
        new SoldOut(this.context, this.logger, this.stateInfo),
      );
      this.logger(
        "Gumball sold. Thanks for your purchase! No more gumballs left in the machine.",
        this.stateInfo,
      );
    }
  }
}

class WinReward implements StateInterface {
  private context: GumballMachine;
  logger: (text: string, element: HTMLElement) => void;
  stateInfo: HTMLElement;

  constructor(
    context: GumballMachine,
    logger: (text: string, element: HTMLElement) => void,
    stateInfo: HTMLElement,
  ) {
    this.context = context;
    this.logger = logger;
    this.stateInfo = stateInfo;
  }

  insertQuarter() {
    this.logger("Not allowed", this.stateInfo);
  }
  removeQuarter() {
    this.logger("Not allowed", this.stateInfo);
  }
  turnCrank() {
    this.logger("Not allowed", this.stateInfo);
  }
  dispense() {
    if (this.context.getCount() > 2) {
      this.context.sellGumball(2);
      this.context.setCurrentState(
        new NoQuarter(this.context, this.logger, this.stateInfo),
      );
      this.logger(
        "You are a winner! You won an extra gumball, congratulations! Thanks for your purchase!",
        this.stateInfo,
      );
    } else if (this.context.getCount() == 2) {
      this.context.sellGumball(2);
      this.context.setCurrentState(
        new SoldOut(this.context, this.logger, this.stateInfo),
      );
      this.logger(
        "You are a winner! You won an extra gumball, congratulations! Thanks for your purchase! No more gumballs left in the machine.",
        this.stateInfo,
      );
    } else if (this.context.getCount() >= 0) {
      this.context.sellGumball();
      this.context.setCurrentState(
        new SoldOut(this.context, this.logger, this.stateInfo),
      );
      this.logger(
        "Gumball sold. Thanks for your purchase! No more gumballs left in the machine.",
        this.stateInfo,
      );
    }
  }
}

class SoldOut implements StateInterface {
  private context: GumballMachine;
  logger: (text: string, element: HTMLElement) => void;
  stateInfo: HTMLElement;

  constructor(
    context: GumballMachine,
    logger: (text: string, element: HTMLElement) => void,
    stateInfo: HTMLElement,
  ) {
    this.context = context;
    this.logger = logger;
    this.stateInfo = stateInfo;
  }

  insertQuarter() {
    this.logger(
      "Cannot insert quarter. All gumballs sold out.",
      this.stateInfo,
    );
  }
  removeQuarter() {
    this.logger(
      "Cannot remove quarter. None was inserted into the machine.",
      this.stateInfo,
    );
  }
  turnCrank() {
    this.logger(
      "Cannot turn crank. No gumballs left in the machine.",
      this.stateInfo,
    );
  }
  dispense() {
    this.logger("No allowed.", this.stateInfo);
  }
}

class GumballMachine {
  currentState!: StateInterface;
  gumballs: number;
  logger: (text: string, element: HTMLElement) => void;
  stateInfo: HTMLElement;
  gumballsQuantityInfo: HTMLElement;

  constructor(
    logger: (text: string, element: HTMLElement) => void,
    stateInfo: HTMLElement,
    gumballsQuantityInfo: HTMLElement,
  ) {
    this.gumballs = 5;
    this.logger = logger;
    this.stateInfo = stateInfo;
    this.gumballsQuantityInfo = gumballsQuantityInfo;
    this.logger(this.gumballs.toString(), this.gumballsQuantityInfo);
  }

  insertQuarter() {
    this.currentState.insertQuarter();
  }
  removeQuarter() {
    this.currentState.removeQuarter();
  }

  turnCrank() {
    this.currentState.turnCrank();
  }

  dispense() {
    this.currentState.dispense();
  }

  setCurrentState(state: StateInterface) {
    this.currentState = state;
  }

  sellGumball(quantity: number = 1) {
    this.gumballs = this.gumballs - quantity;
    this.setCount();
  }

  setCount() {
    this.gumballsQuantityInfo.innerText = this.gumballs.toString();
  }

  getCount() {
    return this.gumballs;
  }
}

const gumballMachine = new GumballMachine(
  logger,
  stateInfo,
  gumballsQuantityInfo,
);
gumballMachine.setCurrentState(
  new NoQuarter(gumballMachine, logger, stateInfo),
);

document
  .getElementById("insert-quarter-button")
  ?.addEventListener("click", () => {
    gumballMachine.insertQuarter();
  });

document
  .getElementById("remove-quarter-button")
  ?.addEventListener("click", () => {
    gumballMachine.removeQuarter();
  });

document.getElementById("turn-crank-button")?.addEventListener("click", () => {
  gumballMachine.turnCrank();
});
