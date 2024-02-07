// login function
function validateForm(e) {
    e.preventDefault()
    var name = document.Form.name.value
    var password = document.Form.password.value
   if (name.length==0)
    return alert(`name is required`)
   if (password.length<5)
    return alert(`password length should more than 5`)
}