// Recommended: All functions declared here

// Funktion för att kolla om entered city finns
// funktion som kollar vilken stad som är närmast
// funktion som kollar vilken stad som är längst bort

// Recommended: constants with references to existing HTML-elements
const cityTitle = document.querySelector("h2");
const cityDetails = document.querySelector("h3");
const closestCity = document.querySelector("#closest");
const furthestCity = document.querySelector("#furthest");
const cityBox = document.querySelector("#cities");
const distanceTable = document.querySelector("#table");
const tabName = document.head.querySelector("title");

// Recommended: Ask for the city name and then the rest of the code
const enteredCity = prompt("Vilken stad?");

// Skriver ut citynamned som användaren skriver i prompt
let cityWasFound = false;

for (cityKey in cities) {
    if (enteredCity == cities[cityKey].name) {
        cityWasFound = true;
        cityTitle.innerHTML += `${enteredCity} (${cities[cityKey].country})`;
        tabName.innerHTML = enteredCity;
        break; // loopen slutar och behöver inte fortsätta
    }
} // om staden inte finns i databasen så skrivs det ut och h3 blir tömd
if (cityWasFound == false) {
    cityTitle.innerHTML += enteredCity + " finns inte i databasen";
    cityDetails.innerHTML = "";
    tabName.innerHTML = "Not Found"
}

// Skriva ut alla cityBoxes
for (let i = 0; i <= cities.length - 1; i++) {
    let cityBoxP = document.createElement("p");
    cityBoxP.classList.add("cityBox");
    cityBoxP.textContent = cities[i].name;
    cityBox.appendChild(cityBoxP);

    if (enteredCity == cities[i].name) {
        cityBoxP.classList.add("target");
    }
}

/** Grid */
distanceTable.style.gridTemplateRows = "repeat(40, 1fr);"
for (i = 0; i < 40; i++) {
    for (j = 0; j < 40; j++) {
        let cell = document.createElement("div");
        cell.textContent = i;
        distanceTable.appendChild(cell);
    }
}



// pseudokod

/* 
- closest & furthest ska allså få separata klasser med respektive klassnamn. Dessa ska också ha extra text. (inga markeringar if citywasfound false)
- 2 funktioner för att se den närmsta och längst bort liggande staden
- 
- Skapa distance table, grid (39x fr), classer = "cell", "head_row", "head_column", "even_row", "even_col" 
*/