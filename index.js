// Recommended: All functions declared here
// funktion som kollar vilken stad som är närmast
// funktion som kollar vilken stad som är längst bort

// Recommended: constants with references to existing HTML-elements
const cityTitle = document.querySelector("h2");
const cityDetails = document.querySelector("h3");
const closestCity = document.querySelector("#closest");
const furthestCity = document.querySelector("#furthest");
const cityBoxes = document.querySelector("#cities");
const distanceTable = document.querySelector("#table");

// Recommended: Ask for the city name and then the rest of the code
const enteredCity = prompt("Vilken stad?");

// Skriver ut citynamned som användaren skriver i prompt
let cityWasFound = false;
for (cityKey in cities) {
    if (enteredCity == cities[cityKey].name) {
        cityWasFound = true;
        cityTitle.innerHTML += `${enteredCity} (${cities[cityKey].country})`;
        break; // loopen slutar och behöver inte fortsätta
    }
} // om staden inte finns i databasen så skrivs det ut och h3 blir tömd
if (cityWasFound == false) {
    cityTitle.innerHTML += enteredCity + " finns inte i databasen";
    cityDetails.innerHTML = "";
}

// pseudokod

/* 
- nästa steg är att skriva ut alla city boxes, dom ska ha klassen ".cityBox". 
- target, closest & furthest ska allså få separata klasser med respektive klassnamn. Dessa ska också ha extra text. (inga markeringar if citywasfound false)
- Använd en loop som går igenom hela cities objektet, ock skriver ut alla namnen i id baserad ordning.
- 2 funktioner för att se den närmsta och längst bort liggande staden
- 
- Skapa distance table, grid (39x fr), classer = "cell", "head_row", "head_column", "even_row", "even_col"
*/