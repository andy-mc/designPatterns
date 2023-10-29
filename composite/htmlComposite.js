// Componente base
class HtmlElement {
  constructor(tagName) {
    this.tagName = tagName;
    this.children = [];
  }

  addChild(child) {
    this.children.push(child);
  }

  removeChild(child) {
    const index = this.children.indexOf(child);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  render() {
    let html = `<${this.tagName}>`;

    for (let child of this.children) {
      html += child.render();
    }

    html += `</${this.tagName}>`;

    return html;
  }
}

// Elemento hoja
class HtmlText {
  constructor(content) {
    this.content = content;
  }

  render() {
    return this.content;
  }
}

// Uso del patrón Composite
const div = new HtmlElement("div");
const p1 = new HtmlElement("p");
const p2 = new HtmlElement("p");
const span = new HtmlElement("span");
const text = new HtmlText("¡Hola, mundo!");

div.addChild(p1);
div.addChild(p2);
p1.addChild(span);
span.addChild(text);

console.log(div.render());
