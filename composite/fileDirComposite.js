// Componente base
class FileSystemComponent {
  constructor(name) {
    this.name = name;
  }

  display() {
    console.log(this.name);
  }
}

// Elemento hoja
class File extends FileSystemComponent {
  display() {
    console.log("Archivo: " + this.name);
  }
}

// Elemento compuesto que puede contener otros elementos
class Directory extends FileSystemComponent {
  constructor(name) {
    super(name);
    this.children = [];
  }

  add(component) {
    this.children.push(component);
  }

  remove(component) {
    const index = this.children.indexOf(component);
    if (index !== -1) {
      this.children.splice(index, 1);
    }
  }

  display() {
    console.log("Directorio: " + this.name);
    for (let child of this.children) {
      child.display();
    }
  }
}

// Uso del patrón Composite
const root = new Directory("Raíz");
const folder1 = new Directory("Carpeta 1");
const folder2 = new Directory("Carpeta 2");
const file1 = new File("Archivo 1");
const file2 = new File("Archivo 2");

root.add(folder1);
root.add(folder2);
folder1.add(file1);
folder2.add(file2);

root.display();
