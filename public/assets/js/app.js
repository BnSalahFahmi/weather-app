const weatherForm = document.querySelector('form')
const searchInput = document.getElementById('search-input')
const forecastData = document.getElementById('forecast-data')
const loader = document.getElementById('loader')
const error = document.getElementById('error')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchInput.value
    loader.textContent = 'Loading ...'
    error.textContent = ''
    forecastData.innerHTML = ''
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((res) => {
            if (res.error) {
                loader.textContent = ''
                error.innerHTML = `<div id="error" class="alert alert-danger" role="alert">` + res.error + `</div>`
                forecastData.textContent = ''
            } else {
                loader.textContent = ''
                error.textContent = ''
                if (res.data.length != 0)
                    forecastData.innerHTML = renderForeCastHTML(res.data)
                else
                    forecastData.innerHTML = `<div class='empty-data'>No Data Found</div>`
            }
        })
    })
})

const renderForeCastHTML = (locations) => {
    var innerHTML = ''
    locations.forEach(function (location) {
        innerHTML +=
            `<div class="list-group">
            <a href="#" class="list-group-item list-group-item-action flex-column align-items-start">
                <div class="d-flex w-100 justify-content-between">
                    <h5 class="mb-1 location-name">` + location.location + ' <i class="summary">' + location.summary + `</i></h5>
                    <small><img class="weather-icon" src='` + getSrcImg(location) + `'></img></small>
                </div>
                <p class="mb-1">
                    It is currently <span class="badge badge-pill badge-dark">` + location.temperature + `°С</span> out.
                    There is ` + location.precipProbability + `% chance of rain
                </p>
            <small>Geo coords <span class="geo-coords">[` + location.latitude + ',' + location.longitude + `]</span></small>
        </a>
        </div>`
    })
    return innerHTML
}

const getSrcImg = (location) => {
    switch (location.icon) {
        case 'clear-day':
            return './assets/images/clear-day.png'
        case 'clear-night':
            return './assets/images/clear-night.png'
        case 'partly-cloudy-day':
            return './assets/images/partly-cloudy-day.png'
        case 'partly-cloudy-night':
            return './assets/images/partly-cloudy-night.png'
        case 'cloudy':
            return './assets/images/cloudy.png'
        case 'rain':
            return './assets/images/rain.png'
        case 'sleet':
            return './assets/images/sleet.png'
        case 'snow':
            return './assets/images/snow.png'
        case 'wind':
            return './assets/images/wind.png'
        case 'fog':
            return './assets/images/fog.png'
        default:
            return './assets/images/clear-day.png'
    }
}