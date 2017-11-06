const carGarage = []

const garage = {
    "retrieve": function (carId) {
        return carGarage.find( car => car.id === carId )
    },
    "park": function (car) {
        carGarage.push(car)
    }
}


module.exports = garage
