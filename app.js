// #region Global Variables

let playerInfo = {
    currentCheeseTotal: 20000,
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

// #endregion

// #region Main Game Functions

function clickCheese() {
    playerInfo.currentCheeseTotal += playerInfo.clickPower
    drawScreen()
}

function autoAddCheese() {
    playerInfo.currentCheeseTotal += playerInfo.autoPower
    drawScreen()
}

function purchaseUpgrade(name) {
    let upgrade = findUpgrade(name)
    if (playerInfo.currentCheeseTotal >= upgrade.price) {
        playerInfo.currentCheeseTotal -= upgrade.price
        upgrade.quantity += 1
        upgrade.price += Math.floor(.15 * upgrade.price)
    }
    updatePlayerStats()
    drawScreen()
}

function updatePlayerStats() {
    let totalClickMods = 0
    let totalAutoMods = 0

    clickUpgrades.forEach(upgrade => {
        totalClickMods += upgrade.multiplier * upgrade.quantity
    })

    autoUpgrades.forEach(upgrade => {
        totalAutoMods += upgrade.multiplier * upgrade.quantity
    })

    playerInfo.clickPower = 1 + totalClickMods
    playerInfo.autoPower = totalAutoMods
}

// #endregion

// #region Drawing Functions 

function drawScreen() {
    drawPlayerStats()
    drawPlayerInventory()
}

function drawPlayerStats() {
    const cheeseTotalElem = document.getElementById('currentCheeseTotal')
    const clickPowerElem = document.getElementById('currentClickPower')
    const autoPowerElem = document.getElementById('currentAutoPower')
    cheeseTotalElem.innerText = playerInfo.currentCheeseTotal
    clickPowerElem.innerText = `+${playerInfo.clickPower}`
    autoPowerElem.innerText = `+${playerInfo.autoPower}`
}

function drawPlayerInventory() {
    const spoonTotalElem = document.getElementById('spoonTotal')
    const spoonShovelElem = document.getElementById('spoonShovelTotal')
    const spoonDrillElem = document.getElementById('spoonDrillTotal')
    const spoonExcavatorElem = document.getElementById('spoonExcavatorTotal')
    spoonTotalElem.innerText = findUpgrade('Spoon').quantity
    spoonShovelElem.innerText = findUpgrade('Shovel Spoon').quantity
    spoonDrillElem.innerText = findUpgrade('Spoon Drill').quantity
    spoonExcavatorElem.innerText = findUpgrade('Spoon Excavator').quantity
}

// #endregion

// #region Utility functions

function findUpgrade(name) {
    let foundUpgrade
    foundUpgrade = clickUpgrades.find(upgrade => upgrade.name == name)
    if (foundUpgrade == undefined) {
        foundUpgrade = autoUpgrades.find(upgrade => upgrade.name == name)
    }
    return foundUpgrade
}
//#endregion

//#region Function Calls / Game Start
drawScreen()
setInterval(autoAddCheese, 3000)
//#endregion