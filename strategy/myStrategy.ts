enum TextProcessorType {
  Markdown,
  Html
}

abstract class ListStrategy {
  abstract start(buffer: string[]): void;
  abstract end(buffer: string[]): void;
  abstract addListItem(buffer: string[], item: string): void;
}

class MarkdownListStrategy extends ListStrategy {
  start(buffer: string[]): void {}

  end(buffer: string[]): void {}
  
  addListItem(buffer: string[], item: string): void {
    buffer.push(`* ${item}`);
  }
}

class HtmlListStrategy extends ListStrategy {
  start(buffer: string[]): void {
    buffer.push('<ul>');
  }

  end(buffer: string[]): void {
    buffer.push('</ul>');
  }

  addListItem(buffer: string[], item: string): void {
    buffer.push(`  <li>${item}</li>`);
  }
}

class TextProcessor {
  private buffer: string[] = [];
  private listStrategy: ListStrategy;

  private static strategies = {
    [TextProcessorType.Markdown]: new MarkdownListStrategy(),
    [TextProcessorType.Html]: new HtmlListStrategy(),
  };

  constructor(private type: TextProcessorType) {
    this.listStrategy = TextProcessor.strategies[type];
  }

  setListStrategy(type: TextProcessorType): void {
    this.clear();
    const strategy = TextProcessor.strategies[type];
    if (!strategy) {
      throw new Error(`Unsupported strategy type: ${type}`);
    }
    this.listStrategy = strategy;
  }

  appendList(items: string[]): void {
    this.listStrategy.start(this.buffer);
    items.forEach(item => this.listStrategy.addListItem(this.buffer, item));
    this.listStrategy.end(this.buffer);
  }

  clear(): void {
    this.buffer.length = 0; // Clear the array while keeping the original reference
  }

  toString(): string {
    return this.buffer.join('\n');
  }
}

const tp = new TextProcessor(TextProcessorType.Markdown);
tp.appendList(['foo', 'bar', 'baz']);
console.log(tp.toString());

tp.setListStrategy(TextProcessorType.Html);
tp.appendList(['foo', 'bar', 'baz']);
console.log(tp.toString());
