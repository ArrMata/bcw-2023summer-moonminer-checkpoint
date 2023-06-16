
let playerInfo = {
    currentCheeseTotal: 0,
    clickPower: 1,
    autoPower: 0,
}

let clickUpgrades = [
    {
        name: 'Spoon',
        price: 100,
        quantity: 0,
        multiplier: 1
    },
    {
        name: 'Shovel Spoon',
        price: 250,
        quantity: 0,
        multiplier: 5
    }
]

let autoUpgrades = [
    {
        name: 'Spoon Drill',
        price: 300,
        quantity: 0,
        multiplier: 3
    },
    {
        name: 'Spoon Excavator',
        price: 300,
        quantity: 0,
        multiplier: 10
    }
]

function addCheese() {
    playerInfo.currentCheeseTotal += playerInfo.clickPower
    drawScreen()
}

function drawScreen() {
    drawPlayerStats()
}

function drawPlayerStats() {
    const cheeseTotalElem = document.getElementById('currentCheeseTotal')
    const clickPowerElem = document.getElementById('currentClickPower')
    const autoPowerElem = document.getElementById('currentAutoPower')
    cheeseTotalElem.innerText = playerInfo.currentCheeseTotal
    clickPowerElem.innerText = `+${playerInfo.clickPower}`
    autoPowerElem.innerText = `+${playerInfo.autoPower}`
}

drawScreen()