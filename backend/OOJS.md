# OOP JS

### Ways to represent a person

#### Option 1 --> Make a JS object for each person:

```js
const laura = {
    name: "Laura",
    job: "cohort lead",
    coolness: 6,
    sayHi: () => console.log("HI!!")

}

const eri = {
    name: "Eri",
    job: "cohort lead",
    coolness: 11,
    sayHi: () => console.log("HI!!")
}


laura.sayHi()
eri.sayHi()
```

Downsides:
    - This is not DRY
    - You can have people with different attributes if you mess up (e.g. forget a key-value pair)
    - Adding to the prototype adds to prototypes of ALL objects
```js

laura.__proto__.legCount = 2

laura.legCount // 2 
eri.legCount // 2

const jitta = { name: "Jitta", breed: "Mutant Chihuahua" }

jitta.legCount // 2

```

Note: you could define a prototype for each object (shown below in Option 2), but would have to set each one individually, which is not DRY

#### Option 2: Factory Method

```js

function person(name, job){
    return {
        name: name, 
        job: job,
        sayHi: () => console.log('HI!!')
    }
}

```

Positives:

- Ensures uniformity
- Can encapsulate variables:

```js
function person(name, job){
    const secret = "I have a secret"
    return {
        name: name, 
        job: job,
        sayHi: () => console.log('HI!!'),
        whisperSecret: () => console.log(`SHHHH!: ${secret}`)
    }
}

const laura = person('Laura', "cohort lead")
laura.secret //=> undefined
laura.whisperSecret() // logs `SHHHH!: I have a secret`


```

- Can easily add a custom prototype:

```js
function person(name, job){
    prototype = {
        legCount: 2
    }

    return {
        name: name, 
        job: job,
        sayHi: () => console.log('HI!!'),
        __proto__: prototype
    }
}

const laura = person('Laura', "cohort lead")
laura.name
laura.legCount

```

- `new` keyword not required

#### Constructor functions

```js

function Person(name, job){
    const secret = "I have a secret!"
    this.name = name
    this.job = job


    this.whisperSecret = function(){
        console.log(`SHHHH! ${secret}`)
    }
}


laura = new Person('Laura', "cohort lead")
eri = new Person('Eri', "cohort lead")

Person.prototype.sayHi = () => console.log('HI!')
Person.prototype.legCount = 2

laura.name
eri.name
laura.sayHi()
console.log(laura.secret)
laura.whisperSecret() 
console.log(eri.legCount)
```

Positives:

- Encapsulation possible

Downsides:

- If you forget to say `new` your code will not work properly - this is a common bug

- If you forget `new` you will be adding the attributes defined in the constructor function to the `window`

- Adding protoypes is PIA

### Positives/Negatives of class syntax

Positives:

- It is the future of JS since ES6
- It is very organized
- It is similar to other OOP languages

Negatives:

- No encapsulation (as of now, but it is being implemented soon)

### Standard class syntax

```js

class Rectangle {

    constructor(width, length){
        this.width = width
        this.length = length
    }

    sayHi(){
        if(this.width === this.length){
            console.log("Hi, I am a square")
        }else{
            console.log("Hi, I am a rectangle!")
        }
    }


    area(){
        return this.width * this.length
    }


}


const myRectangle = new Rectangle(3,4)
myRectangle.area() // => 12
myRectangle.width // => 3
myRectangle.length // => 4
myRectangle.sayHi() // => logs "Hi, I am a rectangle!"


```

### Class methods

- add the static keyword

```js

class Rectangle {

    constructor(width, length){
        this.width = width
        this.length = length
    }

    static createSquare(side){
        return new Rectangle(side, side)
    }

    sayHi(){
        if(this.width === this.length){
            console.log("Hi, I am a square")
        }else{
            console.log("Hi, I am a rectangle!")
        }
    }


    area(){
        return this.width * this.length
    }


}

const mySquare = Rectangle.createSquare(3)
mySquare.sayHi() // => logs "Hi I am a square!"
console.log(mySquare.area()) // => 9

```

### Getters and setters

- Lets you access/set computed properties as if they were instance variables

```js
class Rectangle {

    constructor(width, length){
        this.width = width
        this.length = length
    }

    static createSquare(side){
        return new Rectangle(side, side)
    }

    sayHi(){
        if(this.width === this.length){
            console.log("Hi, I am a square")
        }else{
            console.log("Hi, I am a rectange!")
        }
    }


    get area(){
        return this.width * this.length
    }

    set area(newArea){
        if( this.width === this.length){
            this.width = Math.sqrt(newArea)
            this.length = this.width
        }else{
            console.log('You can only set the area of a square!')
        }
    }


}


const mysquare = Rectangle.createSquare(5)
console.log(mysquare.area) // => 
mysquare.area = 9 // =>
console.log(mysquare.width) // => 
console.log(mysquare.length) // => 


const myRectangle = new Rectangle(5,7)
myRectangle.area = 3 // => 

```

### Context of a SPA

We want to encapsulate the object(s) we want to display on the page as classes. For example, if we wanted to display a Pokemon, we could make it into a class and provide a method which could render itself.
