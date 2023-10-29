abstract class State {
  abstract on(sw: Switch): void;
  abstract off(sw: Switch): void;
}

class OnState extends State {
  on(sw: Switch): void {
    console.log('Light is already on');
  }

  off(sw: Switch): void {
    console.log('Switching off...');
    sw.changeState(new OffState());
  }
}

class OffState extends State {
  on(sw: Switch): void {
    console.log('Switching on...');
    sw.changeState(new OnState());
  }

  off(sw: Switch): void {
    console.log('Light is already off');
  }
}

class Switch {
  private state: State;

  constructor() {
      this.state = new OffState();
  }

  changeState(state: State): void {
      this.state = state;
  }

  on(): void {
    this.state.on(this);
  }

  off(): void {
    this.state.off(this);
  }
}

const sw = new Switch();
sw.on();
sw.on();
sw.off();
sw.off();