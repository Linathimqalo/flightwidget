const tableBody = document.getElementById('table-body');

let flights = [
    {
        time: "07:32",
        destination: "NAGASAKI",
        flight: "MV 36",
        gate: "A 61",
        remarks: "DELAYED"
    },
    {
        time: "09:31",
        destination: "FRANCE",
        flight: "AK 05",
        gate: "S 16",
        remarks: "DELAYED"
    },
    {
        time: "19:43",
        destination: "CAPE TOWN",
        flight: "CP 62",
        gate: "H 84",
        remarks: "ON TIME"
    },
    {
        time: "02:17",
        destination: "MEXICO",
        flight: "OQ 72",
        gate: "P 68",
        remarks: "CANCELLED"
    },
    {
        time: "22:05",
        destination: "SEOUL",
        flight: "BI 41",
        gate: "K 94",
        remarks: "ON TIME"
    },
]

const destinations = ["TOKYO", "SWITZERLAND", "OSAKA", "NEW YORK", "ROME", "MAUI", "HONOLULU", "LONDON", "JOHANNESBURG"]
const remarks = ["ON TIME", "DELAYED", "CANCELLED"]
let hours = 23

function populateTable(){
    for (const flight of flights){
        const tableRow = document.createElement("tr")

        for (const flightDetail in flight){
         const tableCell = document.createElement("td")
         const word =Array.from(flight[flightDetail])

         for (const [index, letter] of word.entries()) {
           const letterElement = document.createElement('div')

           setTimeout(() => {
            letterElement.classList.add('flip')
           letterElement.textContent = letter
           tableCell.appendChild(letterElement)
           }, 100 * index)

         }

         tableRow.appendChild(tableCell) 
        }
        
        tableBody.append(tableRow)
    }
}

populateTable();

/*The function for the letters generated in the widget */
function generateRandomLetter(){
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return alphabet.charAt(Math.floor(Math.random() * alphabet.length))
}

/*Generating the numbers */
function generateRandomNumber(maxNumber){
    const numbers = "0123456789"
    if (maxNumber){
        const newNumbers = numbers.slice(0, maxNumber + 1)
        return newNumbers.charAt(Math.floor(Math.random() * newNumbers.length))
    }
    return numbers.charAt(Math.floor(Math.random() * numbers.length))
}

/*Keeping the time from going above the 24hr format but still able to make it into a 24hr format using "displayHour" */
function generateTime(){
    let displayHour = hours

    if (hours < 24){
        hours++
    }

    if (hours >= 24){
        hours = 1
        displayHour = hours
    }

    if (hours < 10){
        displayHour = "0" + hours
    }

    return displayHour + ":" + generateRandomNumber(5) + generateRandomNumber()
}

/*The function that displays everything and updates the widget with each shuffle.*/
function shuffleUp(){
    flights.shift()
    flights.push({
        time: generateTime(),
        destination: destinations[Math.floor(Math.random() * destinations.length)],
        flight: generateRandomLetter() + generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber(),
        gate: generateRandomLetter() + " " + generateRandomNumber() + generateRandomNumber(),
        remarks: remarks[Math.floor(Math.random() * remarks.length)],
    })

    tableBody.textContent = ""
    populateTable()
}

setInterval(shuffleUp, 4000)