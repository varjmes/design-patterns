// Nothing to do with dependency injection which is a consequence of dependency
// inversion.

// This principle defines the relationship between high and low level models...

const Relationship = Object.freeze({
  parent: 0,
  child: 1,
  sibling: 2
})

class Person {
  constructor(name) {
    this.name = name
  }
}

// Low level module, close to the metal. Defining the exact way relationships can
// be stored
class Relationships {
  constructor() {
    this.data = []
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child
    })
  }
}

const parent = new Person('Edward')
const child1 = new Person('James')
const child2 = new Person('Genevieve')
const rels = new Relationships()
rels.addParentAndChild(parent, child1)
rels.addParentAndChild(parent, child2)

// High level module not concerned with low level things like storage, but more with
// high level actions like working with the data provided
class Research {
  constructor(relationships) {
    // find all children of Edward
    const relations = relationships.data
    for (let rel of relations.filter(r => r.from.name === 'Edward' && r.type === Relationship.parent)) {
      console.log(`Edward has a child named ${rel.to.name}`)
    }
  }
}

new Research(rels)

// High level modules (e.g Research) should not depend on low level modules
// (e.g. Relationships) to work. Instead, they should depend on abstractions
// For example, if we decide we need to move Relationships away from an array
// data storage, we'd have to refactor both the Relationships class _and_ the
// Research class

class RelationshipsBrowser {
  constructor() {
    if (this.constructor.name === 'RelationshipBrowser') {
      throw new Error('RelationshipBrowser is abstract!')
    }
  }

  findAllChildrenOf(name) { }
}

class Relationships2 extends RelationshipsBrowser {
  constructor() {
    super()
    this.data = []
  }

  addParentAndChild(parent, child) {
    this.data.push({
      from: parent,
      type: Relationship.parent,
      to: child
    })
  }

  findAllChildrenOf(name) {
    return this.data.filter(r =>
      r.from.name === name &&
      r.type === Relationship.parent
    ).map(r => r.to)
  }
}

class Research2 {
  constructor(browser) {
    // find all children of Edward
    for (let p of browser.findAllChildrenOf('Edward')) {
      console.log(`Edward has a child named ${p.name}`)
    }
  }
}

const rels2 = new Relationships2()
rels2.addParentAndChild(parent, child1)
rels2.addParentAndChild(parent, child2)
new Research2(rels2)
