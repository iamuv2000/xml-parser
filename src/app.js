const xml2js = require('xml2js');
const fs = require('fs');
const Book = require('./model/book');
const mongoose = require('mongoose')
const DATABASE = "mongodb://mymongo:27017/test" 

mongoose
    .connect(DATABASE, { useNewUrlParser: true , useUnifiedTopology: true})
    .then(()=>{
        console.log("Datbase connected!")
    })
    .catch((e)=>{
        console.log(e)
        console.log("Datbase connection error!")
    })

// read XML from a file
const xml = fs.readFileSync('user.xml');

// convert XML to JSON
(async () => {
    try {
        const result = await xml2js.parseStringPromise(xml, { mergeAttrs: true });
        // convert it to a JSON string

        result.catalog.book.forEach(async(book) => {
            const item = new Book({
                id: book.id[0],
                author: book.author[0],
                title:book.title[0],
                genre:book.genre[0],
                price:book.price[0],
                publish_date:book.publish_date[0],
                description: book.description[0]
        })
            await item.save()
        });

        const json = JSON.stringify(result, null, 4);
        fs.writeFileSync('user.json', json);
    } catch (err) {
        console.log(err);
    }
})();