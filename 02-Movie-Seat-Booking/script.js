const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

let ticketPrice = +movieSelect.value

populateUI()

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

const updateSelectedCount = () => {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')

    // Copy selectedSeats into the array
    const seatsIndex = [...selectedSeats].map((seat) => {
        return [...seats].indexOf(seat)
    })

    // console.log(seatsIndex)

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    // console.log(selectedSeats.length)
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    movieSelect.selectedIndex = selectedMovieIndex
    ticketPrice = +movieSelect.value
    const selectedSeatsCount = selectedSeats.length
    count.innerText = selectedSeatsCount
    total.innerText = selectedSeatsCount * ticketPrice
}

// Movie selection event
movieSelect.addEventListener('change', (e) => {
    // console.log(e.target.value)
    setMovieData(e.target.selectedIndex, e.target.value)
    ticketPrice = e.target.value
    updateSelectedCount()
})

// Seat click event
container.addEventListener('click', (e) => {
    // console.log(e.target)

    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected')

        updateSelectedCount()
    }

})


// Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))
    console.log(selectedSeats)

    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')

    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex
    }

}

// Intitial Count and total 
updateSelectedCount()
