class NumberNode {
  constructor(value){console.log("NumberNode value:", value); this.value = Number(value); }
  toString() { return `${this.value}`; }
}

class BinaryOpNode {
  constructor(op, left, right) {
    this.op = op;
    this.left = left;
    this.right = right;
    console.log("BinaryOpNode:", this.toString());
  }
  toString() { return `(${this.left} ${this.op} ${this.right})`; }
}

class PrattParser {
    constructor(input) {
        this.tokens = input.match(/\d+|[+/*-]/g) || [];
        this.pos = 0;
        this.precedences = { '+': 10, '-': 10, '*': 20, '/': 20 };
    }
    peek() {console.log("op:", this.tokens[this.pos], this.pos); return this.tokens[this.pos]; }
    next() {console.log("ops:", this.tokens[this.pos] , this.pos); return this.tokens[this.pos++]; }

  parse(minPrec = 0) {
    let token = this.next();
    console.log("Parsing token:", token);
    if (!token) return null;

    let left = new NumberNode(token);
    console.log("Created NumberNode with value:", left.value);
    console.log("peek after number:", this.peek());

    while (this.peek() && minPrec < this.precedences[this.peek()]) {
      const op = this.next();
      console.log("Parsing operator:", op);
      const prec = this.precedences[op];
      console.log("Operator precedence:", prec);
      const right = this.parse(prec); 
      console.log("Creating BinaryOpNode with op:", op, "left:", left.toString(), "right:", right.toString());
      left = new BinaryOpNode(op, left, right);
    }

    return left;
  }
}

function evaluate(node) {
  if (node instanceof NumberNode) return node.value;
  
  const leftVal = evaluate(node.left);
  const rightVal = evaluate(node.right);

  switch (node.op) {
    case '+': return leftVal + rightVal;
    case '-': return leftVal - rightVal;
    case '*': return leftVal * rightVal;
    case '/': return leftVal / rightVal;
  }
}

const input = "1 + 2 * 3 / 2 - 2";
const parser = new PrattParser(input);
const ast = parser.parse();

console.log("Structure de l'arbre :");
console.log(ast.toString());

console.log("Résultat du calcul :");
console.log(evaluate(ast));
