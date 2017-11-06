const gasStation = require("./gasStation")
const update = require("./displayTrip")

const idMaker = function* (startFrom = 0) {
    let id = 1

    while (true) {
        yield id + startFrom
        id++
    }
}

const idGenerator = idMaker()

const carFactory = (make, model, range) => {
    return Object.create(null, {
        "id": {
            value: idGenerator.next().value,
            enumerable: true
        },
        "make": {
            value: make,
            enumerable: true
        },
        "model": {
            value: model,
            enumerable: true
        },
        "maxRange": {
            value: range,
            enumerable: true
        },
        "currentRange": {
            value: 0,
            enumerable: true,
            writable: true
        },
        "drive": {
            value: function (milesToDestination) {
                const check = 5
                let milesTraveled = 0

                // Keep driving until range is hit, then refuel
                do {
                    if (this.currentRange > 0) {
                        this.currentRange -= check
                        milesTraveled += check
                    } else {
                        gasStation.fillUp(this)
                    }
                    update({
                        "traveled": milesTraveled,
                        "remaining": milesToDestination - milesTraveled
                    }, this)

                } while (milesTraveled < milesToDestination)
            }
        }
    })
}

module.exports = carFactory
