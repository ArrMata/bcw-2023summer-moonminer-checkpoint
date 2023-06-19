// #region Global Variables

let playerInfo = {
    currentCheeseTotal: 0,
    clickPower: 1,
    autoPower: 0,
}

let clickUpgrades = [
    {
        name: 'Spoon',
        price: 10,
        quantity: 0,
        multiplier: 1
    },
    {
        name: 'Shovel Spoon',
        price: 50,
        quantity: 0,
        multiplier: 5
    },
    {
        name: 'Spoon Jackhammer',
        price: 200,
        quantity: 0,
        multiplier: 20
    }
]

let autoUpgrades = [
    {
        name: 'Spoon Drill',
        price: 200,
        quantity: 0,
        multiplier: 3
    },
    {
        name: 'Spoon Excavator',
        price: 400,
        quantity: 0,
        multiplier: 10
    },
    {
        name: 'Spoon Laser',
        price: 1000,
        quantity: 0,
        multiplier: 150
    }
]

let boostInfo = {
    price: 2000,
}

let moonRotation = 0
let spaceRotation = 0
let boostActive = false

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
        upgrade.price += Math.ceil(.20 * upgrade.price)
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

function boostGame() {
    if (playerInfo.currentCheeseTotal >= boostInfo.price) {
        playerInfo.currentCheeseTotal -= boostInfo.price
        boostInfo.price += Math.ceil(.5 * boostInfo.price)
    }
    clearInterval(standardAddInterval)
    clearInterval(standardMoonInterval)
    let boostedAddInterval = setInterval(autoAddCheese, 1000)
    let boostedMoonInterval = setInterval(rotateMoon, 10)
    document.querySelector('.moon-container').style.setProperty('filter', 'invert()')
    boostActive = true
    drawScreen()
    setTimeout(stopBoost, 20000, boostedAddInterval, boostedMoonInterval)
}

function stopBoost(boostedCheese, boostedMoon) {
    document.querySelector('.moon-container').style.setProperty('filter', '')
    clearInterval(boostedCheese)
    clearInterval(boostedMoon)
    standardAddInterval = setInterval(autoAddCheese, 3000)
    standardMoonInterval = setInterval(rotateMoon, 150)
    boostActive = false
    drawScreen()
}

// #endregion

// #region Drawing Functions 

function drawScreen() {
    drawBoost()
    drawPurchaseBlock()
    drawPlayerStats()
    drawInventoryBlock()
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

function drawPurchaseBlock() {
    clearPurchaseBlock()
    const purchaseBlockElem = document.getElementById('purchaseBlock')
    let stringToAdd = `<div class="d-flex me-2 flex-column">`
    clickUpgrades.forEach(upgrade => {
        stringToAdd += formatPurchaseButton(upgrade)
    })
    stringToAdd += `
    </div>
    <div class="d-flex ms-2 flex-column">
    `
    autoUpgrades.forEach(upgrade => {
        stringToAdd += formatPurchaseButton(upgrade)
    })
    stringToAdd += `</div>`
    purchaseBlockElem.innerHTML = stringToAdd
}

function clearPurchaseBlock() {
    const purchaseBlockElem = document.getElementById('purchaseBlock')
    purchaseBlockElem.innerHTML = ''
}

function drawBoost() {
    clearBoost()
    const boostDiv = document.getElementById('boost-div')

    if (playerInfo.currentCheeseTotal < boostInfo.price || boostActive) {
        boostDiv.innerHTML = `
        <button class="boost-btn-disabled">Boost <span id="boost-span"></span> 🔥</button>
        `
    }
    else {
        boostDiv.innerHTML = `
        <button onclick='boostGame()' class="boost-btn">Boost <span id="boost-span"></span> 🔥</button>
        `
    }
    const boostSpan = document.getElementById('boost-span')
    boostSpan.innerText = boostInfo.price
}

function clearBoost() {
    const boostDiv = document.getElementById('boost-div')
    boostDiv.innerHTML = ''
}

function drawInventoryBlock() {
    clearInventoryBlock()
    clickNameStrings = `<div>`
    clickQuantityStrings = `<div>`
    autoNameStrings = `<div>`
    autoQuantityStrings = `<div>`

    clickUpgrades.forEach(upgrade => {
        clickNameStrings += `<h2>${upgrade.name}</h2>`
        clickQuantityStrings += `<h2>${upgrade.quantity}</h2>`
    })
    clickNameStrings += `</div>`
    clickQuantityStrings += `</div>`

    autoUpgrades.forEach(upgrade => {
        autoNameStrings += `<h2>${upgrade.name}</h2>`
        autoQuantityStrings += `<h2>${upgrade.quantity}</h2>`
    })
    autoNameStrings += `</div>`
    autoQuantityStrings += `</div>`

    document.getElementById('clickInventory').innerHTML = clickNameStrings + clickQuantityStrings
    document.getElementById('autoInventory').innerHTML = autoNameStrings + autoQuantityStrings

}

function clearInventoryBlock() {
    document.getElementById('clickInventory').innerHTML = ""
    document.getElementById('autoInventory').innerHTML = ""
}

function rotateMoon() {
    moonRotation += 10
    document.querySelector('.moon-img').style.setProperty('transform', `rotate(${moonRotation}deg)`)
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

function formatPurchaseButton(upgrade) {
    let priceAsString = String(upgrade.price)
    let buttonType = "purchase-btn"
    if (upgrade.price >= 1000) {
        priceAsString = `${(upgrade.price / 1000).toFixed(1)}K`
    }

    if (playerInfo.currentCheeseTotal < upgrade.price) {
        buttonType += "-disabled"
    }

    return `<div class="${buttonType}">
    <button class="custom-fw-semibold" onclick="purchaseUpgrade('${upgrade.name}')">🛒 ${priceAsString}</button> 
    <span class="custom-fw-semibold">${upgrade.name}</span>
    </div>
    `
}

//#endregion

//#region Function Calls / Game Start
drawScreen()
let standardAddInterval = setInterval(autoAddCheese, 3000)
let standardMoonInterval = setInterval(rotateMoon, 150)
//#endregion