function setName(obj) {
  obj.name = 'B';
}

var person = new Object();
person.name = 'A';

setName(person);
console.log(person.name); 