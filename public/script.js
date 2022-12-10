const usernameInput = document.querySelector(".username-input")
const msgInput = document.querySelector(".msg-input")
const chatContainer = document.querySelector(".chat-container")
document.body.style.height = window.innerHeight + "px"

const socket = io(window.location.href)

socket.on("connection", () => {
    console.log("connected")
})

const sendMsg = () => {
    let errors = ""
    if(usernameInput.value.trim().length < 1){
        errors += "username is required\n"
    }
    if(msgInput.value.trim().length < 1){
        errors += "message is required\n"
    }
    if(errors.length > 0){
        alert(errors.slice(0, -1))
        return
    }
    const currentDate = new Date
    socket.emit("msg", {
        username: usernameInput.value.trim(),
        msg: msgInput.value.trim(),
        date: formatDate(currentDate)
    })
    usernameInput.value = ""
    msgInput.value = ""
}

socket.on("msg", data => {
    console.log(data)
    chatContainer.innerHTML += `
    <div class="msg-container">
        <p><b>user:</b> ${data.username}</p>
        <p><b>msg:</b> ${data.msg}</p>
        <p><b>date:</b> ${data.date}</p>
    </div>
    `
})

function formatDate(givenDate) {
    const yyyy = givenDate.getFullYear()
    let mm = givenDate.getMonth() + 1
    let dd = givenDate.getDate()
    if (dd < 10) dd = '0' + dd
    if (mm < 10) mm = '0' + mm
    let seconds = givenDate.getSeconds()
    if (seconds < 10) seconds = '0' + seconds
    let minutes = givenDate.getMinutes()
    if (minutes < 10) minutes = '0' + minutes
    let hours = givenDate.getHours()
    let amOrPm
    if (hours >= 12) {
        hours -= 12
        amOrPm = "PM"
    }else{
        amOrPm = "AM"
    }
    if (hours < 10) hours = '0' + hours
    const formattedDate = `${hours}:${minutes}:${seconds}${amOrPm}, ${dd}/${mm}/${yyyy}`

    return formattedDate
}