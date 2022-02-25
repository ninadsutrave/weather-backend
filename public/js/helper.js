console.log('Client side javascript file is loaded!')

const form = document.querySelector('form')
const search = document.querySelector('input')
const loading = document.getElementById('loading')
const loc = document.getElementById('location')
const time = document.getElementById('time')
const temp = document.getElementById('temp')
const descp = document.getElementById('descp')
const feelslike = document.getElementById('feelslike')
const precip = document.getElementById('precip')
const windSpeed = document.getElementById('wind-speed')

form.addEventListener('submit', (e) => {
    e.preventDefault()
    loading.innerHTML = 'Loading...'
    loc.innerHTML = ''
    time.innerHTML = ''
    temp.innerHTML = ''
    descp.innerHTML = ''
    feelslike.innerHTML = ''
    precip.innerHTML = ''
    windSpeed.innerHTML = ''
    
    const address = search.value
    const weatherUrl = '/weather?address='+address

    fetch(weatherUrl)
    .then((res) => {
        res.json().then((data) => {
            console.log(data)
            if(data.error) {
                loading.innerHTML = data.error
            }
            
            else {
                loading.innerHTML = ''
                loc.innerHTML = data.location
                time.innerHTML = data.time
                temp.innerHTML = data.temp + '°C'
                descp.innerHTML = data.descp
                feelslike.innerHTML = 'Feels Like: ' + data.feelslike + '°C'
                precip.innerHTML = 'Precipitation: ' + data.precip + ' %'
                windSpeed.innerHTML = 'Wind Speed: ' + data.windSpeed + ' kmph'
            }
        })
    })

})
