const bolsaDeDulces = {
  dulces: ["chocolate", "caramelo", "gomita"],
  [Symbol.iterator]() {
    let indiceActual = 0;
    return {
      next: () => {
        if (indiceActual < this.dulces.length) {
          return { value: this.dulces[indiceActual++], done: false };
        } else {
          return { done: true };
        }
      },
    };
  },
};

for (let dulce of bolsaDeDulces) {
  console.log(dulce); // Esto imprimirá cada dulce, uno a la vez.
}
