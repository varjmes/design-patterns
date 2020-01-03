// Open for extension (e.g. inheritance), closed for modification
// Classes should only be modified if there is a bug (or refactoring)
// State space explosion: as the number of state variables (in this case, filters)
// increases, the size of the system state space grows exponentially

const Colour = Object.freeze({
  red: 'red',
  green: 'green',
  blue: 'blue'
})

const Size = Object.freeze({
  small: 'small',
  medium: 'medium',
  large: 'large'
})

class Product {
  constructor(name, colour, size) {
    this.name = name
    this.colour = colour
    this.size = size
  }
}

class ProductFilter {
  filterByColour(products, colour) {
    return products.filter(p => p.colour === colour)
  }

  filterBySize(products, size) {
    return products.filter(p => p.size === size)
  }
}

// Specification pattern:
class ColourSpecification {
  constructor(colour) {
    this.colour = colour
  }

  isSatisfied(item) {
    return item.colour === this.colour
  }
}

class SizeSpecification {
  constructor(size) {
    this.size = size
  }

  isSatisfied(item) {
    return item.size === this.size
  }
}

class AndSpecification {
  constructor(...specs) {
    this.specs = specs
  }

  isSatisfied(item) {
    return this.specs.every(x => x.isSatisfied(item))
  }
}

class OrSpecification {
  constructor(...specs) {
    this.specs = specs
  }

  isSatisfied(item) {
    return this.specs.some(x => x.isSatisfied(item))
  }
}

class BetterFilter {
  filter(items, specification) {
    return items.filter(x => specification.isSatisfied(x))
  }
}

const apple = new Product('Apple', Colour.green, Size.small)
const tree = new Product('Tree', Colour.green, Size.large)
const house = new Product('House', Colour.blue, Size.large)

let products = [apple, tree, house]
let pf = new ProductFilter()
console.log(`Green products (old approach):`)
for (let p of pf.filterByColour(products, Colour.green)) {
  console.log(`* ${p.name} is green`)
}

console.log(`Large products (old approach)`)
for (let p of pf.filterBySize(products, Size.large)) {
  console.log(`* ${p.name} is large`)
}

let bf = new BetterFilter()
console.log(`Green products (new approach):`)
for (let p of bf.filter(products, new ColourSpecification(Colour.green))) {
  console.log(`* ${p.name} is green`)
}

console.log(`Large products (new approach)`)
for (let p of bf.filter(products, new SizeSpecification(Size.large))) {
  console.log(`* ${p.name} is large`)
}

console.log(`Large AND green products (new approach)`)
const andSpec = new AndSpecification(
  new ColourSpecification(Colour.green),
  new SizeSpecification(Size.large)
)
for (let p of bf.filter(products, andSpec)) {
  console.log(`* ${p.name} is large and green`)
}

console.log(`Small OR blue products (new approach)`)
const orSpec = new OrSpecification(
  new ColourSpecification(Colour.blue),
  new SizeSpecification(Size.small)
)
for (let p of bf.filter(products, orSpec)) {
  console.log(`* ${p.name} is small or blue`)
}
