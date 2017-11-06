const garage = []

const garageSupervisor = Object.create(null, {
    "store": {
        value: function (car) {
            garage.push(car)
        }
    },
    "retrieve": {
        value: function (carId) {
            return garage.find(car => car.id === carId)
        }
    },
    "inventory": {
        get: () => garage
    }
})

module.exports = garageSupervisor