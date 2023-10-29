class Mementon {
  constructor(content) {
    this.content = content;
  }
  getContent() {
    return this.content;
  }

  setContent(content) {
    this.content = content;
  }
}

const m1 = new Mementon("hello");
const m2 = new Mementon("hello");

console.log(m1 === m1);
console.log(m1 === m2);
console.log(m1.content === m2.content);
console.log(m1);
console.log(m2);
m2.setContent("world");
console.log(m1);
console.log(m2);
