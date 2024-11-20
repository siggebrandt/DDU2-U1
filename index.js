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

function IdToName(id) {
    let name = "";
    for (let key in cities) {
        if (id == cities[key].id) {
            name = cities[key].name;
            break;
        }
    }
    return name;
}

function FurthestCity(array) {
    let furthestCity = array[0];
    for (let i = 0; i < array.length; i++) {
        if (array[i].distance > furthestCity.distance) {
            furthestCity = array[i];
        }
    }
    return furthestCity;
}

function ClosestCity(array) {
    let closestCity = array[0];
    for (let i = 0; i < array.length; i++) {
        if (array[i].distance < closestCity.distance) {
            closestCity = array[i];
        }
    }
    return closestCity;
}

// Funktion för att kolla om entered city finns

// Recommended: constants with references to existing HTML-elements
const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const closestCityId = document.querySelector("#closest");
const furthestCityId = document.querySelector("#furthest");
const cityBox = document.querySelector("#cities");
const distanceTable = document.querySelector("#table");
const tabName = document.head.querySelector("title");

// Recommended: Ask for the city name and then the rest of the code
const promptedCity = prompt("Vilken stad?");

let distancesToPromptedCity = [];
distanceTable.style.gridTemplateRows = "repeat(40, 1fr);"
for (let row = 0; row <= 39; row++) {
    for (let col = 0; col <= 39; col++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");

        if (row == 0) {
            cell.classList.add("head_row");
            cell.textContent = col - 1;
        }

        if (row >= 1 && col >= 1) {
            for (key in distances) {
                if (distances[key].city1 == col - 1 && distances[key].city2 == row - 1) {
                    cell.textContent = distances[key].distance / 10;
                    if (distances[key].city1 == NameToId(promptedCity)) {
                        distancesToPromptedCity.push({
                            city: distances[key].city2,
                            cityName: IdToName(distances[key].city2),
                            distance: distances[key].distance,
                        });
                    }
                }
                if (distances[key].city2 == col - 1 && distances[key].city1 == row - 1) {
                    cell.textContent = distances[key].distance / 10;
                    if (distances[key].city2 == NameToId(promptedCity)) {
                        distancesToPromptedCity.push({
                            cityId: distances[key].city1,
                            cityName: IdToName(distances[key].city1),
                            distance: distances[key].distance,
                        });
                    }
                }
            }
        }
        if (row == col) {
            cell.textContent = "";
        }
        if (col == 0) {
            cell.classList.add("head_column");
        }
        if (col % 2 == 1 && row != 0) {
            cell.classList.add("even_col");
        }
        if (row % 2 == 1) {
            cell.classList.add("even_row");
        }
        if (col == 0 && row >= 1) {
            cell.textContent = `${cities[row - 1].id} - ${cities[row - 1].name}`;
        }
        distanceTable.appendChild(cell);
    }
}


const closestCity = ClosestCity(distancesToPromptedCity);
const furthestCity = FurthestCity(distancesToPromptedCity);












let cityInDatabase = false;
for (let cityKey in cities) {
    if (promptedCity == cities[cityKey].name) {
        cityInDatabase = true;
        h2.innerHTML = `${promptedCity} (${cities[cityKey].country})`;
        closestCityId.textContent = closestCity.cityName;
        console.log(closestCity.cityName);
        furthestCityId.textContent = furthestCity.cityName;
        console.log(furthestCity.cityName);
        tabName.innerHTML = promptedCity;
        break;
    }
}
if (cityInDatabase == false) {
    h2.innerHTML = `${promptedCity} finns inte i databasen`;
    h3.innerHTML = "";
    tabName.innerHTML = "Not Found";
}

for (let i = 0; i <= cities.length - 1; i++) {
    let cityBoxDiv = document.createElement("div");
    cityBoxDiv.classList.add("cityBox");
    cityBoxDiv.textContent = cities[i].name;
    cityBox.appendChild(cityBoxDiv);

    if (cityInDatabase == true) {
        if (promptedCity == cities[i].name) {
            cityBoxDiv.classList.add("target");
        }

        if (closestCity.cityName == cities[i].name) {
            cityBoxDiv.classList.add("closest");
            cityBoxDiv.innerHTML += ` ligger ${closestCity.distance / 10} mil bort`;
        }

        if (furthestCity.cityName == cities[i].name) {
            cityBoxDiv.classList.add("furthest");
            cityBoxDiv.innerHTML += ` ligger ${furthestCity.distance / 10} mil bort`;
        }
    }
}




console.log(distancesToPromptedCity); // Hela arrayen
console.log(FurthestCity(distancesToPromptedCity)); // Den staden med längst avstånd
console.log(ClosestCity(distancesToPromptedCity));


/**
 * Skräpad kod
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
}
 */