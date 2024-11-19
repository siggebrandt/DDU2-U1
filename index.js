// Recommended: All functions declared here
function NameToId(name) {
    let index = null;
    for (let key in cities) {
        if (name == cities[key].name) {
            index = cities[key].id;
            break;
        }
    }
    return index;
}

function FurthestCity(city) {
    let furtherCount = 0;
    let furtherArray = [];
    for (let i = 0; i < distances.length; i++) {
        if (NameToId(city) == distances[i].city2) {
            furtherArray.push({
                distance: distances[++furtherCount].distance, // det är här det blir fel, index värdet är ej rätt
                cityId: distances[furtherCount].city1
            });
        }
    }
    console.log(furtherArray);
}

function ClosestCity(city) {

}

// Funktion för att kolla om entered city finns
// funktion som kollar vilken stad som är närmast
// funktion som kollar vilken stad som är längst bort

/*
function cityInDatabase(isCityInDatabase) {
    let cityInDatabase = false;
    for (let i = 0; i <= cities.length; i++) {
        if (isCityInDatabase == cities[i].name) {
            cityInDatabase = true;
            return true;
        }
    }
    if (cityInDatabase == false) {
        return false;
    }
}
if (cityInDatabase(promptedCity) == true) {
    h2.innerHTML += `${promptedCity} (${cities[cityKey].country})`;
    tabName.innerHTML = promptedCity;
}
else if (cityInDatabase(promptedCity) == false) {
    h2.innerHTML += promptedCity + " finns inte i databasen";
    h3.innerHTML = "";
    tabName.innerHTML = "Not Found"
}*/


// Recommended: constants with references to existing HTML-elements
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const closestCity = document.querySelector("#closest");
const furthestCity = document.querySelector("#furthest");
const cityBox = document.querySelector("#cities");
const distanceTable = document.querySelector("#table");
const tabName = document.head.querySelector("title");

// Recommended: Ask for the city name and then the rest of the code
const promptedCity = prompt("Vilken stad?");
FurthestCity(promptedCity);

let cityInDatabase = false;
for (let cityKey in cities) {
    if (promptedCity == cities[cityKey].name) {
        cityInDatabase = true;
        h2.innerHTML = `${promptedCity} (${cities[cityKey].country})`;
        tabName.innerHTML = promptedCity;
        break; // loopen slutar och behöver inte fortsätta
    }
} // om staden inte finns i databasen så skrivs det ut och h3 blir tömd
if (cityInDatabase == false) {
    h2.innerHTML = `${promptedCity} finns inte i databasen`;
    h3.innerHTML = "";
    tabName.innerHTML = "Not Found"
}

// CityBoxes
for (let i = 0; i <= cities.length - 1; i++) {
    let cityBoxDiv = document.createElement("div");
    cityBoxDiv.classList.add("cityBox");
    cityBoxDiv.textContent = cities[i].name;
    cityBox.appendChild(cityBoxDiv);

    if (promptedCity == cities[i].name) {
        cityBoxDiv.classList.add("target");
    }
}
/** Grid */
distanceTable.style.gridTemplateRows = "repeat(40, 1fr);"
for (i = 0; i <= 39; i++) {
    for (j = 0; j <= 39; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        if (i == 0) {
            cell.classList.add("head_row");
            cell.textContent = j - 1;
        }

        if (i >= 1 && j >= 1) {
            for (key in distances) {
                if (distances[key].city1 == j - 1 && distances[key].city2 == i - 1) {
                    cell.textContent = distances[key].distance / 10;
                }
                if (distances[key].city2 == j - 1 && distances[key].city1 == i - 1) {
                    cell.textContent = distances[key].distance / 10;
                }
            }
        }
        if (i == j) {
            cell.textContent = "";
        }
        if (j == 0) {
            cell.classList.add("head_column");
        }
        if (j % 2 == 1) {
            cell.classList.add("even_col");
        }
        if (i % 2 == 1) {
            cell.classList.add("even_row");
        }
        if (j == 0 && i >= 1) {
            cell.textContent = cities[i - 1].id + " - " + cities[i - 1].name;
        }
        distanceTable.appendChild(cell);
    }
}



// pseudokod

/* 
- closest & furthest ska allså få separata klasser med respektive klassnamn. Dessa ska också ha extra text. (inga markeringar if cityInDatabase false)
- 2 funktioner för att se den närmsta och längst bort liggande staden
*/