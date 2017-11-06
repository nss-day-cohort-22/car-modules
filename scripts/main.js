const carFactory = require("./carFactory")
const garage = require("./garage")

const lamborghini = carFactory("Lamborghini", "Countach", 100)
garage.store(lamborghini)

const accord = carFactory("Honda", "Accord", 320)
garage.store(accord)

accord.drive(20)

console.log(garage.inventory);
