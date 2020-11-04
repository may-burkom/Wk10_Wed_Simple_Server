console.log("homepage js running...")

const form = document.querySelector("#userForm")

form.addEventListener("submit", function(event){
    console.log("submit hit")
    event.preventDefault()

    console.log(form)
    let formData = new FormData(form)
    console.log(formData)

    axios.post("http://localhost:3000/register", formData)
        .then(function(response){
            console.log("DONE")
        })
        .catch(function(err) {
            console.log(err)
        })
})

// axios.post("http://localhost:3000/register", form)
//     .then(function(response){
//         console.log("DONE")
//     })