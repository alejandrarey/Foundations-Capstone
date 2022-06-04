const jokesContainer = document.querySelector('#jokes-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/jokes`

const jokesCallback = ({ data: jokes }) => displayJokes(jokes)
const errCallback = err => console.log(err)

const getJokes = () => axios.get(baseURL).then(jokesCallback).catch(errCallback)
const createJoke = body => axios.post(baseURL, body).then(jokesCallback).catch(errCallback)
const deleteJoke = id => axios.delete(`${baseURL}/${id}`).then(jokesCallback).catch(errCallback)
const updateJoke = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then(jokesCallback).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let joke = document.querySelector('#joke')
    let rate = document.querySelector('#rate')
    let imageURL = document.querySelector('#img')

    let bodyObj = {
        joke: joke.value,
        rate: rate.value, 
        imageURL: imageURL.value
    }

    createJoke(bodyObj)

    joke.value = ''
    rate.value = ''
    imageURL.value = ''
}

function createJokeCard(joke) {
    const jokeCard = document.createElement('div')
    jokeCard.classList.add('joke-card')

    jokeCard.innerHTML = `<img alt='joke cover image' src=${joke.imageURL} class="joke-cover-image"/>
    <p class="joke">${joke.joke}</p>
    <div class="btns-container">
        <button onclick="updateJoke(${joke.id}, 'minus')">-</button>
        <p class="joke-rate">${joke.rate}</p>
        <button onclick="updateJoke(${joke.id}, 'plus')">+</button>
    </div>
    <button onclick="deleteJoke(${joke.id})">delete</button>
    `


    jokesContainer.appendChild(jokeCard)
}

function displayJokes(arr) {
    jokesContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createJokeCard(arr[i])
    }
}

form.addEventListener('submit', submitHandler)

getJokes()