console.log("homepage js running...")

const form = document.querySelector("#userForm")
const displayArea = document.querySelector("#display-people")
const registeredUser = document.querySelector("#registered-people")

function displayPeople (obj){
    let entry = document.createElement('h4')
    entry.innerHTML = `${obj.name} has registered.`
    registeredUser.appendChild(entry)
}

axios.get('http://localhost:3000/display')
    .then(function(response){
        let allRegisteredUsers = response.data
        allRegisteredUsers.forEach(displayPeople)
    })

form.addEventListener("submit", function(event){
    console.log("submit hit")
    event.preventDefault()

    console.log(form)
    let formData = new FormData(form)
    console.log(formData)

    axios.post("http://localhost:3000/register", formData)
        .then(function(response){
            console.log("DONE")
            form.reset()
            let savedUser = response.data
            let confirm = document.createElement('h2')
            confirm.innerHTML = `Thank you ${savedUser.name} for registering with us!`
            displayArea.appendChild(confirm)
            displayPeople(savedUser)
        })
        .catch(function(err) {
            console.log(err)
        })
})
