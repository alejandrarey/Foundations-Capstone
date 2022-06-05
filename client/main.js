const merchContainer = document.querySelector('#merch-container')
const form = document.querySelector('form')

const baseURL = `http://localhost:4000/api/merch`

const merchCallback = ({ data: merch }) => displayMerch(merch)

const errCallback = err => console.log(err)

const getMerch = () => axios.get(baseURL).then(merchCallback).catch(errCallback)
const createItem = body => axios.post(baseURL, body).then(merchCallback).catch(errCallback)
const deleteItem = id => axios.delete(`${baseURL}/${id}`).then(merchCallback).catch(errCallback)
const updateItem = (id, type) => axios.put(`${baseURL}/${id}`, {type}).then((data) => {alert("Buyer has been notified of offer"); merchCallback(data)}).catch(errCallback)

function submitHandler(e) {
    e.preventDefault()

    let item = document.querySelector('#item')
    let price = document.querySelector('#price')
    let imageURL = document.querySelector('#img')
    let likes = 0

    let bodyObj = {
        item: item.value,
        price: price.value, 
        imageURL: imageURL.value,
        likes: likes
    }

    createItem(bodyObj)

    item.value = ''
    price.value = ''
    imageURL.value = ''
    likes = 0
}

function createItemCard(item) {
    const itemCard = document.createElement('div')
    itemCard.classList.add('item-card')

    itemCard.innerHTML = `<img alt='item cover image' src=${item.imageURL} class="item-cover-image"/>
    <p class="item">${item.item}</p>
    <div class="btns-container">       

        <p class="item-price"> Up to $${item.price}</p>

        </div>
    <div class="btns-container">
    <button onclick="updateItem(${item.id}, 'plus')">Bidders</button>
    <p class="item-likes">${item.likes}</p>
    
</div>
    <button onclick="deleteItem(${item.id})">Remove - Found it!</button>
    `


    merchContainer.appendChild(itemCard)
}

function displayMerch(arr) {
    merchContainer.innerHTML = ``
    for (let i = 0; i < arr.length; i++) {
        createItemCard(arr[i])
        
    }
}

form.addEventListener('submit', submitHandler)

getMerch()