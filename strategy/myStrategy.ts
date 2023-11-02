const enum TextProcessorType {
  Markdown,
  Html
}

class ListStrategy {
  start(buffer: Array<String>) {}
  end(buffer: Array<String>) {}
  addListItem(buffer: Array<String>, item: String) {}
}

class MarkdownListStrategy extends ListStrategy {
  addListItem(buffer: Array<String>, item: String) {
    buffer.push(`* ${item}`);
  }
}

class HtmlListStrategy extends ListStrategy {
  start(buffer: Array<String>) {
    buffer.push('<ul>');
  }

  end(buffer: Array<String>) {
    buffer.push('</ul>');
  }

  addListItem(buffer: Array<String>, item: String) {
    buffer.push(`  <li>${item}</li>`);
  }
}

class TextProcessor {
  private buffer: Array<String>
  private listStrategy: ListStrategy

  constructor (
    private type: TextProcessorType
  ) {
    this.buffer = [];
    this.listStrategy = this.getListStrategy(type);
  }

  getListStrategy(type: TextProcessorType): ListStrategy {
    return {
      [TextProcessorType.Markdown]: new MarkdownListStrategy(),
      [TextProcessorType.Html]: new HtmlListStrategy()
    }[type];
  }

  setListStrategy(type: TextProcessorType) {
    this.clear();
    this.listStrategy = this.getListStrategy(type);
  }

  appendList(items: Array<String>) {
    this.listStrategy.start(this.buffer);
    for (let item of items) {
      this.listStrategy.addListItem(this.buffer, item);
    }
    this.listStrategy.end(this.buffer);
  }

  clear() {
    this.buffer = [];
  }

  toString() {
    return this.buffer.join('\n');
  }
}

const tp = new TextProcessor(TextProcessorType.Markdown);
tp.appendList(['foo', 'bar', 'baz']);
console.log(tp.toString());

tp.clear();

tp.setListStrategy(TextProcessorType.Html);
tp.appendList(['foo', 'bar', 'baz']);
console.log(tp.toString());
