
//object destructuring

// const person = {
//     name: "Andrew",
//     age: 26,
//     location: {
//         city: "Philly",
//         temp: 92
//     }
// }

// //equals const name = person.name
// //       const age = person.age
// const { name, age } = person
// console.log(`${name} is ${age}.`)

// //renaming
// const { city, temp: temperature } = person.location

// if (city && temperature) {
//     console.log(`It is ${temperature} in ${city}.`)
// }

// //setting up defaults and renaming
// const { name: firstName = "Annonymus" } = person
// console.log(`${firstName} is ${age}.`)

// const book = {
//     title: "Some title",
//     author: "Some Author",
//     publisher: {
//         name: "Penguin"
//     }
// }

// const { name: publisherName = "Self-Published" } = book.publisher

// console.log(publisherName)

const address = ["1299 S Juniper Street", "Philly", "Ny", "19147"]

const [street, city, state, zip] = address

//if you don't want all elements and defaults
// const [, city, state = "New York", zip] = address

console.log(`You are in ${city} ${state}.`)