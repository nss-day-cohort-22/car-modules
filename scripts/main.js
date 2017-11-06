const carFactory = require("./carFactory")
const garage = require("./garage")

const lamborghini = carFactory("Lamborghini", "Countach", 100)
garage.park(lamborghini)

const accord = carFactory("Honda", "Accord", 320)
garage.park(accord)

accord.drive(20)


