const merch = require('./db.json')
let globalId = 9
let likes = 0

module.exports = {

    getMerch: (req, res) => res.status(200).send(merch),
    createItem: (req, res) => {
        let { item, price, imageURL, likes } = req.body
        let newItem = {
            id: globalId,
            item, 
            price,
            imageURL,
            likes
        }
        merch.push(newItem)
        res.status(200).send(merch)
        globalId++
    },
    updateItem: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = merch.findIndex(elem => +elem.id === +id)

        if (type === 'plus') {
            merch[index].likes += 1
            res.status(200).send(merch)

            

           



        } else {
            res.sendStatus(400)
        }
    },
    deleteItem: (req, res) => {
        let index = merch.findIndex(elem => elem.id === +req.params.id)
        merch.splice(index, 1)
        res.status(200).send(merch)
    }


}