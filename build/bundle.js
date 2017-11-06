(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./displayTrip":2,"./gasStation":4}],2:[function(require,module,exports){
const updatesEl = document.getElementById("tripUpdates")

const updateComponentFactory = (mileInfo, car) => {
    /**
     *    <section>
     *      <div>Name of car</div>
     *      <div>We filled up</div>
     *          or
     *      <div>miles traveled</div>
     *      <div>miles left</div>
     *    </section>
     */
    let newElement = `
        <section>
        <div>The ${car.make} ${car.model}</div>
    `

    if (car.maxRange === car.currentRange) {
        newElement += "<div>We just filled up! Yay?</div>"
    } else {
        newElement += `<div>We have traveled ${mileInfo.traveled} miles</div>`
        newElement += `<div>We have ${mileInfo.remaining} miles left</div>`

        if (mileInfo.remaining === 0){
            newElement += "<h1>You have arrived at your destination</h1>"
        }
    }

    newElement += "</section>"

    updatesEl.innerHTML += newElement
}


module.exports = updateComponentFactory

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
const station = {
    "fillUp": function (car) {
        car.currentRange = car.maxRange
    }
}

module.exports = station

},{}],5:[function(require,module,exports){
const carFactory = require("./carFactory")
const garage = require("./garage")

const lamborghini = carFactory("Lamborghini", "Countach", 100)
garage.park(lamborghini)

const accord = carFactory("Honda", "Accord", 320)
garage.park(accord)

accord.drive(20)



},{"./carFactory":1,"./garage":3}]},{},[5]);
