class Animal {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  
  get() {
    return {name: this.name, color: this.color}
  }
  set(name, color) {
    this.name = name;
    this.color = color;
  }
}

class Dog extends Animal {
  constructor(name, color, type) {
    super(name, color);
    this.type = type
  }
  
  get () {
    let dog = super.get()
    dog["type"] = this.type
    return dog;
    //return {name, color, type}
  }
  set (name, color, type) {
    super.set(name, color)
    this.type = type;
  }
  
  toString() {
    return "I am a nice a dog";
  }
}

let myDog = new Dog("chiwa", "brown", "chihuahua")

console.log(myDog.get())

myDog.set("black")

console.log(myDog.get())