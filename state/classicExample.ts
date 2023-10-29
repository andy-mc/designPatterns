abstract class State {
    public on(sw: Switch) {
      console.log('Light is already on');
    };
    public off(sw: Switch) {
      console.log('Light is already off');
    }
}

class OnState extends State {
    constructor() {
      super();
      console.log('Light enter turned on state');
    }
    public off(sw: Switch) {
      console.log('Switching off...');
      sw.state = new OffState();
    }
}

class OffState extends State {
    constructor() {
      super();
      console.log('Light enter turned off state');
    }
    public on(sw: Switch) {
      console.log('Switching on...');
      sw.state = new OnState();
    }
}

class Switch {
    constructor(
      private state: State = new OffState()
    ) {}

    public on() {
      this.state.on(this);
    }

    public off() {
      this.state.off(this);
    }
}

const sw = new Switch();
