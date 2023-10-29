class Node {
  constructor(value, left = null, right = null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }

  *preorder() {
    // Yield the current node's value
    yield this.value;

    // If there's a left child, traverse its subtree
    if (this.left) {
      yield* this.left.preorder();
    }

    // If there's a right child, traverse its subtree
    if (this.right) {
      yield* this.right.preorder();
    }
  }
}

// Testing the implementation:
let root = new Node(1);
root.left = new Node(2);
root.right = new Node(3);
root.left.left = new Node(4);
root.left.right = new Node(5);

for (let val of root.preorder()) {
  console.log(val); // Output should be: 1, 2, 4, 5, 3
}
