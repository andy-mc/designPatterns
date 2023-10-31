const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const State = Object.freeze({
  offHook: "off hook",
  connecting: "connecting",
  connected: "connected",
  onHold: "on hold",
  onHook: "on hook",
});

const Trigger = Object.freeze({
  callDialed: "dial a number",
  hungUp: "hang up",
  callConnected: "call is connected",
  placedOnHold: "placed on hold",
  takenOffHold: "taken off hold",
  leftMessage: "leave a message",
});

const rules = {};
rules[State.offHook] = [
  {
    trigger: Trigger.callDialed,
    state: State.connecting,
  },
];
rules[State.connecting] = [
  {
    trigger: Trigger.hungUp,
    state: State.onHook,
  },
  {
    trigger: Trigger.callConnected,
    state: State.connected,
  },
];
rules[State.connected] = [
  {
    trigger: Trigger.leftMessage,
    state: State.onHook,
  },
  {
    trigger: Trigger.hungUp,
    state: State.onHook,
  },
  {
    trigger: Trigger.placedOnHold,
    state: State.onHold,
  },
];
rules[State.onHold] = [
  {
    trigger: Trigger.takenOffHold,
    state: State.connected,
  },
  {
    trigger: Trigger.hungUp,
    state: State.onHook,
  },
];

let state = State.offHook;
const exitState = State.onHook;

const getInput = () => {
  const prompt = [`The phone is currently ${state}`, "What's next:"];

  for (let i = 0; i < rules[state].length; ++i) {
    const t = rules[state][i].trigger;
    prompt.push(`${i}. ${t}`);
  }

  // force an extra line break
  prompt.push("");

  rl.question(prompt.join("\n"), (answer) => {
    const input = parseInt(answer, 10);
    state = rules[state][input].state;

    if (state !== exitState) {
      getInput();
    } else {
      console.log("We are done using the phone.");
      rl.close();
    }
  });
};

getInput();
