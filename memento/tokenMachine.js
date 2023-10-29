class Token {
  constructor(value = 0) {
    this.value = value;
  }
}

class Memento {
  constructor() {
    this.tokens = [];
  }

  addToken(token) {
    this.tokens.push(token);
  }

  revert() {
    this.tokens.pop();
  }
}

class TokenMachine {
  constructor() {
    this.changes = [new Memento()];
  }

  addTokenValue(value) {
    return this.addToken(new Token(value));
  }

  addToken(token) {
    this.memento.tokens.push(token);
    const m = this.memento.tokens;
    return;
  }

  revert(m) {
    // todo
  }
}
