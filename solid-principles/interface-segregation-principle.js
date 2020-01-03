// Split up interfaces into different parts so folk don't implement what they
// don't need

class Document {

}

class Machine {
  constructor() {
    if (this.constructor.name === 'Machine') {
      throw new Error('no')
    }
  }

  print(doc) { }
  fax(doc) { }
  scan(doc) { }
}

class MultiFunctionPrinter extends Machine {
  print(doc) {
  }

  fax(doc) {

  }

  scan(doc) {

  }
}

class OldFashionedPrinter extends Machine {
  print(doc) {
    // Can do this
  }

  fax(doc) {
    // Shouldn't have this functionality
    // Violates "principle of least surprise", shouldn't see a lack of behaviour
    // We want predictable results
  }

  scan(doc) {
    // Shouldn't have this functionality
    // Could throw an error...
    // throw new NotImplementedError('OldFashionedPrinter.scan')
  }
}

class NotImplementedError extends Error {
  constructor(name) {
    const msg = `${name} is not implemented!`
    super(msg)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NotImplementedError)
    }
  }
}

const printer = new OldFashionedPrinter()
printer.scan()

// But really, we don't want to have to leave blank functions about or write
// errors for functions that exist due to extension but aren't actually implemented!
// Thus, let's do some interface segregation...!

class Printer {
  constructor() {
    if (this.constructor.name === 'Printer') {
      throw new Error('Printer is abstract!')
    }
  }

  print() { }
}

class Scanner {
  constructor() {
    if (this.constructor.name === 'Scanner') {
      throw new Error('Scanner is abstract!')
    }
  }

  scan() { }
}

class PhotoCopier {
  print() { }
  scan() { }
}

// Principle kinda moot in JavaScript apparently...
