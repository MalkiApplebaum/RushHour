
const CheckUser = async () => {
    let nameU = document.getElementById("name").value;
    let pas = document.getElementById("password").value;
    let lower = false
    let users = await fetch('UserLowe.json');
    let usersData = await users.json();
    usersData.filter(element => {
        if (element.name == nameU && element.password == pas) {
            lower = true
        }
    })
    if (lower === false)
        alert("is't not alowed user, try again")
    else {
        alert("welcome to a amazing game")
        window.location.href = "Board.html"
    }
}








