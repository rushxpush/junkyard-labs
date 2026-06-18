import Attack from "./actions/attack/AttackType";
import AttackType from "./actions/attack/AttackType";
import Concussive from "./actions/attack/Concussive";
import Slash from "./actions/attack/Slash";
import Thrust from "./actions/attack/Thrust";
import Unnarmed from "./actions/attack/Unnarmed";
import Player from "./Player";
import "./style.css";

// document.querySelector<HTMLDivElement>("#app")!.innerHTML = /* html */

const attack = new Attack(new Unnarmed());
const player = new Player(attack);

const attackButton = document.getElementById("attack-button");
if (attackButton)
  attackButton.addEventListener("click", () => {
    logger(player.attack.executeAttack());
  });

const setAttackTypeSelector = document.getElementById(
  "set-attack-type-selector",
);
if (setAttackTypeSelector)
  setAttackTypeSelector.addEventListener("click", (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    console.log("target: ", target?.id);
    setAttackType(target?.id);
  });

const setAttackType = (type: string) => {
  let attackType;
  if (type === "set-slash-attack-type") attackType = new Slash();
  else if (type === "set-thrust-attack-type") attackType = new Thrust();
  else if (type === "set-concussive-attack-type") attackType = new Concussive();
  else if (type === "set-unnarmed-attack-type") attackType = new Unnarmed();
  else attackType = new Unnarmed();
  player.attack.setType(attackType);
};

const logger = (message: string) => {
  const logMessage = document.getElementById("log-message");
  if (logMessage) logMessage.innerText = message;
};
