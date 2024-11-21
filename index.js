function cityNameToID(name) {
    let returnValue = null;
    for (let key in cities) {
        if (name == cities[key].name) {
            returnValue = cities[key].id;
            break;
        }
    }
    return returnValue;
}

function cityIDToName(id) {
    let returnValue = "";
    for (let key in cities) {
        if (id == cities[key].id) {
            returnValue = cities[key].name;
            break;
        }
    }
    return returnValue;
}

function getFurthestCity(array) {
    let furthestCityInArray = array[0];
    for (let i = 0; i < array.length; i++) {
        if (array[i].distance > furthestCityInArray.distance) {
            furthestCityInArray = array[i];
        }
    }
    return furthestCityInArray;
}

function getClosestCity(array) {
    let closestCityInArray = array[0];
    for (let i = 0; i < array.length; i++) {
        if (array[i].distance < closestCityInArray.distance) {
            closestCityInArray = array[i];
        }
    }
    return closestCityInArray;
}

const h2 = document.querySelector("h2");
const h3 = document.querySelector("h3");
const h3ClosestCity = document.querySelector("#closest");
const h3FurthestCity = document.querySelector("#furthest");
const boxOfCities = document.querySelector("#cities");
const tableofDistances = document.querySelector("#table");
const tabName = document.head.querySelector("title");

const promptedCity = prompt("Vilken stad?");

let arrayOfDistancesToPromptedCity = [];

tableofDistances.style.gridTemplateRows = "repeat(40, 1fr);"
for (let row = 0; row <= 39; row++) {
    for (let col = 0; col <= 39; col++) {
        let tableCell = document.createElement("div");
        tableCell.classList.add("cell");

        if (row == 0) {
            tableCell.classList.add("head_row");
            if (col != 0) {
                tableCell.textContent = col - 1;
            }
        }

        if (row >= 1 && col >= 1) {
            for (key in distances) {
                if (distances[key].city1 == col - 1 && distances[key].city2 == row - 1) {
                    tableCell.textContent = distances[key].distance / 10;
                    if (distances[key].city1 == cityNameToID(promptedCity)) {
                        arrayOfDistancesToPromptedCity.push({
                            city: distances[key].city2,
                            cityName: cityIDToName(distances[key].city2),
                            distance: distances[key].distance,
                        });
                    }
                }
                if (distances[key].city2 == col - 1 && distances[key].city1 == row - 1) {
                    tableCell.textContent = distances[key].distance / 10;
                    if (distances[key].city2 == cityNameToID(promptedCity)) {
                        arrayOfDistancesToPromptedCity.push({
                            cityId: distances[key].city1,
                            cityName: cityIDToName(distances[key].city1),
                            distance: distances[key].distance,
                        });
                    }
                }
            }
        }
        if (col == 0) {
            tableCell.classList.add("head_column");
        }
        if (col % 2 == 1 && row != 0) {
            tableCell.classList.add("even_col");
        }
        if (row % 2 == 1) {
            tableCell.classList.add("even_row");
        }
        if (col == 0 && row >= 1) {
            tableCell.textContent = `${cities[row - 1].id}-${cities[row - 1].name}`;
        }
        tableofDistances.appendChild(tableCell);
    }
}

const closestCity = getClosestCity(arrayOfDistancesToPromptedCity);
const furthestCity = getFurthestCity(arrayOfDistancesToPromptedCity);

let cityInDatabase = false;
for (let cityKey in cities) {
    if (promptedCity == cities[cityKey].name) {
        cityInDatabase = true;
        h2.innerHTML = `${promptedCity} (${cities[cityKey].country})`;
        h3ClosestCity.textContent = closestCity.cityName;
        h3FurthestCity.textContent = furthestCity.cityName;
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
    boxOfCities.appendChild(cityBoxDiv);
}