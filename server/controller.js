const jokes = require('./db.json')
let globalId = 9

module.exports = {

    getJokes: (req, res) => res.status(200).send(jokes),
    createJoke: (req, res) => {
        let { joke, rate, imageURL } = req.body
        let newJoke = {
            id: globalId,
            joke, 
            rate,
            imageURL
        }
        jokes.push(newJoke)
        res.status(200).send(jokes)
        globalId++
    },
    updateJoke: (req, res) => {
        let { id } = req.params
        let { type } = req.body
        let index = jokes.findIndex(elem => +elem.id === +id)

        if (jokes[index].rate <= 1 && type === 'minus') {
            jokes[index].rate = 1
            res.status(200).send(jokes)
        } 
        else if (jokes[index].rate >= 5 && type === 'plus') {
            jokes[index].rate = 5
            res.status(200).send(jokes)
        }
        else if (type === 'plus') {
            jokes[index].rate += 1
            res.status(200).send(jokes)
        } else if (type === 'minus') {
            jokes[index].rate -= 1
            res.status(200).send(jokes)
        } else {
            res.sendStatus(400)
        }
    },
    deleteJoke: (req, res) => {
        let index = jokes.findIndex(elem => elem.id === +req.params.id)
        jokes.splice(index, 1)
        res.status(200).send(jokes)
    }


}