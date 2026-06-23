const State = {
  NoQuarter: "no-quarter",
  HasQuarter: "has-quarter",
  GumballSold: "gumball-sold",
  OutOfGumballs: "out-of-gumballs",
};

const logger = (text: string, element: any): void => {
  element.innerText = text;
};

const stateInfo = document.getElementById!("state-info");
const gumballsQuantityInfo = document.getElementById!("gumballs-quantity-info");

class GumballMachine {
  state: string;
  gumballs: number;
  logger: (text: string, element: HTMLElement) => void;
  stateInfo: HTMLElement;
  gumballsQuantityInfo: HTMLElement;

  constructor(
    state: string,
    logger: (text: string, element: HTMLElement) => void,
    stateInfo: HTMLElement,
    gumballsQuantityInfo: HTMLElement,
  ) {
    this.state = state;
    this.gumballs = 5;
    this.logger = logger;
    this.stateInfo = stateInfo;
    this.gumballsQuantityInfo = gumballsQuantityInfo;
    this.logger(this.gumballs.toString(), this.gumballsQuantityInfo);
  }

  insertQuarter() {
    if (this.state === State.NoQuarter) {
      this.setState(State.HasQuarter);
      this.logger("Quarter Inserted.", this.stateInfo);
    } else if (this.state === State.HasQuarter) {
      this.logger("Machine already has a quarter inserted.", this.stateInfo);
    } else if (this.state === State.GumballSold) {
      this.setState(State.HasQuarter);
      this.logger("Another quarter inserted in the machine.", this.stateInfo);
    } else if (this.state === State.OutOfGumballs) {
      this.logger("Machine doesn't have any gumballs left.", this.stateInfo);
    }
  }
  removeQuarter() {
    if (this.state === State.NoQuarter) {
      this.logger(
        "Machine has no quarter inserted to be removed.",
        this.stateInfo,
      );
    } else if (this.state === State.HasQuarter) {
      this.setState(State.NoQuarter);
      this.logger("Quarter removed from machine.", this.stateInfo);
    } else if (this.state === State.GumballSold) {
      this.logger(
        "Gumball was sold and the quarter was already charged.",
        this.stateInfo,
      );
    } else if (this.state === State.OutOfGumballs) {
      this.logger(
        "The last gumball was sold out and the quarter was already charged.",
        this.stateInfo,
      );
    }
  }

  turnCrank() {
    if (this.state === State.NoQuarter) {
      this.logger("No quarter was inserted yet.", this.stateInfo);
    } else if (this.state === State.HasQuarter) {
      if (this.gumballs > 0) {
        this.sellGumball();

        if (this.gumballs === 0) {
          this.setState(State.OutOfGumballs);
          this.logger(
            "The gumball was sold and the quarter was charged. No more gumballs left to sell.",
            this.stateInfo,
          );
        } else {
          this.setState(State.NoQuarter);
          this.logger(
            "The gumball was sold and the quarter was charged.",
            this.stateInfo,
          );
        }
        this.logger(this.gumballs.toString(), this.gumballsQuantityInfo);
      } else {
        this.setState(State.OutOfGumballs);
        this.logger(
          "Machine doesn't have any gumballs left. Please, remove your quarter",
          this.stateInfo,
        );
      }
    } else if (this.state === State.GumballSold) {
      this.logger("To buy a gumball, insert a quarter first.", this.stateInfo);
    } else if (this.state === State.OutOfGumballs) {
      this.logger(
        "To buy a gumball, insert a quarter first. But the machine doesn't have any gumballs left though.",
        this.stateInfo,
      );
    }
  }

  setState(state: string) {
    this.state = state;
  }

  sellGumball() {
    this.gumballs--;
  }
}

const gumballMachine = new GumballMachine(
  State.NoQuarter,
  logger,
  stateInfo,
  gumballsQuantityInfo,
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
