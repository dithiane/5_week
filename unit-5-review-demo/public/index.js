let fform = document.getElementById('fform')
let wform = document.getElementById('wform')
let fname = document.getElementById('fname')
let fpower = document.getElementById('fpower')
let fhp = document.getElementById('fhp')
let ftype = document.getElementById('ftype')
let wname = document.getElementById('wname')
let wpower = document.getElementById('wpower')
let wowner = document.getElementById('wowner')
let fwDataSection = document.getElementById('fighters-with-weapons')
let spinner = document.getElementById('spinner')
let wformHider = document.querySelector('.cover')

fform.addEventListener('submit', (event) => {
    event.preventDefault()

    if (
        fname.value === '' ||
        fpower.value === '' ||
        isNaN(+fpower.value) ||
        fhp.value === '' ||
        isNaN(+fhp.value) ||
        +fhp.value <= 0 ||
        ftype.value === ''
    ) {
        alert('Some form input(s) were not filled out correctly. Form not submitted.')
        return
    }

    fwDataSection.innerHTML = ''
    wformHider.classList.remove('hide')

    let maBod = {
        name: fname.value,
        power: fpower.value,
        hp: fhp.value,
        type: ftype.value
    }

    axios.post('http://localhost:4000/fighter', maBod)
    .then((result) => {
        getFighterList()
    })

    fname.value = ''
    fpower.value = ''
    fhp.value = ''
    ftype.value = ''
})

wform.addEventListener('submit', (event) => {
    event.preventDefault()

    if (
        wname.value === '' ||
        wpower.value === '' ||
        isNaN(+wpower.value) ||
        wowner.value === ''
    ) {
        alert('Some form input(s) were not filled out correctly. Form not submitted.')
        return
    }

    fwDataSection.innerHTML = ''
    spinner.classList.remove('hide')

    let maBod = {
        name: wname.value,
        power: wpower.value,
        owner: wowner.value
    }

    axios.post('http://localhost:4000/weapon', maBod)
    .then((result) => {
        updateData()
    })
    .catch(() => {
        spinner.classList.add('hide')
        fwDataSection.innerHTML = ''
        messageEl = document.createElement('h3')
        messageEl.innerHTML = 'Something went wrong... data not displayed.'
        fwDataSection.appendChild(messageEl)
        return
    })

    wname.value = ''
    wpower.value = ''
    // wowner.value = ''
})

function getFighterList() {
    wformHider.classList.remove('hide')

    axios.get('http://localhost:4000/fighters-list')
    .then((result) => {
        populateWformDropdown(result.data)
        if (result.data.length > 0) {
            wformHider.classList.add('hide')
        }
    })
    .catch((err) => {
        console.log(err)
    })
}

function populateWformDropdown(data) {
    wowner.innerHTML = ''

    let defaultOption = document.createElement('option')
    defaultOption.innerHTML = 'Select an Owner'
    defaultOption.value = ''
    defaultOption.disabled = true
    defaultOption.selected = true

    wowner.appendChild(defaultOption)

    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option')
        option.innerHTML = data[i].name + ' (id: ' + data[i].id + ')'
        option.value = data[i].id

        wowner.appendChild(option)
    }
    
}

function updateData() {
    fwDataSection.innerHTML = ''
    spinner.classList.remove('hide')
    let startMs = new Date().getTime()

    axios.get('http://localhost:4000/fighters-and-weapons')
    .then((result) => {
        let endMs = new Date().getTime()

        if (endMs - startMs < 2000) {
            setTimeout(() => {
                spinner.classList.add('hide')
                showDataOnPage(result.data)
            }, 2000 - (endMs - startMs))
        } else {
            spinner.classList.add('hide')
            showDataOnPage(result.data)
        }
    })
    .catch((err) => {
        spinner.classList.add('hide')
        console.log(err)
    })
}

function showDataOnPage(rawDbData) {
    fwDataSection.innerHTML = ''

    let organizedFighterData = {}

    if (rawDbData.length === 0) {
        messageEl = document.createElement('h3')
        messageEl.innerHTML = 'There Are No Fighters Who Are Both Registered and Equipped with a Weapon'
        fwDataSection.appendChild(messageEl)
        return
    }

    for (let i = 0; i < rawDbData.length; i++) {
        if (organizedFighterData[rawDbData[i].fighter_id]) {
            organizedFighterData[rawDbData[i].fighter_id].weapons[rawDbData[i].weapon_id] = {
                name: rawDbData[i].weapon,
                power: rawDbData[i].weapon_power
            }
        } else {
            organizedFighterData[rawDbData[i].fighter_id] = {
                name: rawDbData[i].fighter,
                power: rawDbData[i].fighter_power,
                hp: rawDbData[i].hp,
                type: rawDbData[i].type,
                weapons: {
                    [rawDbData[i].weapon_id]: {
                        name: rawDbData[i].weapon,
                        power: rawDbData[i].weapon_power
                    }
                }
            }
        }
    }

    for (let fighterId in organizedFighterData) {
        let fighterEl = document.createElement('div')
        fighterEl.setAttribute('fighter-id', fighterId)
        fighterEl.classList.add('fighter')
        
        let fighterNameEl = document.createElement('h3')
        let fighterPowerEl = document.createElement('span')
        let fighterHpEl = document.createElement('span')
        let fighterTypeEl = document.createElement('span')
        let weaponIntroEl = document.createElement('h4')
        let weaponsConatinerEl = document.createElement('div')

        fighterNameEl.innerHTML = organizedFighterData[fighterId].name
        fighterTypeEl.innerHTML = ' the ' + organizedFighterData[fighterId].type
        fighterHpEl.innerHTML = 'HP: ' + organizedFighterData[fighterId].hp
        fighterPowerEl.innerHTML = 'Power: ' + organizedFighterData[fighterId].power
        weaponIntroEl.innerHTML = 'Equipped with:'

        weaponsConatinerEl.classList.add('weapon-container')

        fighterEl.appendChild(fighterNameEl)
        fighterNameEl.appendChild(fighterTypeEl)
        fighterEl.appendChild(fighterHpEl)
        fighterEl.appendChild(fighterPowerEl)
        fighterEl.appendChild(weaponIntroEl)
        fighterEl.appendChild(weaponsConatinerEl)

        let weapons = organizedFighterData[fighterId].weapons

        for (let weaponId in weapons) {
            let weaponConatinerEl = document.createElement('div')
            let weaponNameEl = document.createElement('h5')
            let weaponPowerEl = document.createElement('span')
            let weaponDeleteEl = document.createElement('button')

            weaponNameEl.innerHTML = weapons[weaponId].name
            weaponPowerEl.innerHTML = 'Power: ' + weapons[weaponId].power
            weaponDeleteEl.innerHTML = 'Delete Weapon'

            weaponDeleteEl.classList.add('delete-button')
            weaponDeleteEl.addEventListener('click', (event) => {

                if (
                    event.target.parentElement.previousSibling === null &&
                    event.target.parentElement.nextSibling === null
                ) {
                    let grandparent = event.target.parentElement.parentElement.parentElement
                    event.target.parentElement.remove()
                    
                    setTimeout(() => {
                        grandparent.remove()
                    }, 500)
                } else {
                    event.target.parentElement.remove()
                }

                axios.delete('http://localhost:4000/weapon/' + weaponId)
                .then(() => {
                    setTimeout(() => {
                        if (fwDataSection.innerHTML === '') {
                            updateData()
                        }
                    }, 500)
                })
                .catch((err) => {
                    console.log(err)
                    alert('Error: weapon was not deleted from database. Please refresh the page.')
                })
            })

            weaponConatinerEl.appendChild(weaponNameEl)
            weaponConatinerEl.appendChild(weaponPowerEl)
            weaponConatinerEl.appendChild(weaponDeleteEl)
            weaponsConatinerEl.appendChild(weaponConatinerEl)
        }

        fwDataSection.appendChild(fighterEl)
    }
}

getFighterList()
updateData()