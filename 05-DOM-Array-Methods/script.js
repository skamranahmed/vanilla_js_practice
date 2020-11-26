const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = []

getRandomUser()
getRandomUser()
getRandomUser()

// double the money
function doubleMoney(){
    data = data.map((user) => {
        return {...user, money: user.money * 2}
    })

    updateDOM()
}

// fetch random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()

    // console.log(data.results[0]['name']['first'], data.results[0]['name']['last'])

    const user = data.results[0]

    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    }

    console.log(newUser)
    addData(newUser)
}

// Add new object to the data array
function addData(obj) {
    data.push(obj)
    updateDOM()
}

// Update DOM
function updateDOM(providerData = data){
    // clear main div
    main.innerHTML = '<h2><strong>Person</strong> Wealth</h2>'

    providerData.forEach(item => {
        const element = document.createElement('div')
        element.classList.add('person')
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)
    })
}

// format number as money
function formatMoney(number){
    return '$ ' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

// Event listeners
addUserBtn.addEventListener('click', getRandomUser)
doubleBtn.addEventListener('click', doubleMoney)