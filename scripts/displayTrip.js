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
