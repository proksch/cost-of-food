console.log("content script loaded!")

// add image button
var btn = document.createElement("a");
btn.appendChild(document.createTextNode("$$$")); 
btn.id = "cof-button"
btn.href="#"

var section = document.getElementsByClassName("ltpMr Slqrh")[0]
section.appendChild(btn)


// modal

modal = document.createElement("div")
modal.id = "cof-container"

// add send button

var send_btn = document.createElement("a")
send_btn.id = "cof-send"
send_btn.appendChild(document.createTextNode("send"))

var send_cnt = document.createElement("div")
send_cnt.id = "cof-cnt"
send_cnt.appendChild(send_btn)

modal.appendChild(document.createTextNode("asd"))
modal.appendChild(send_cnt)


// add container
bg = document.createElement("div")
bg.id = "cof-background"
bg.appendChild(modal)
document.body.appendChild(bg)


btn.onclick = function() {
    bg.style.visibility = "visible"
}
bg.onclick = function() {
    bg.style.visibility = "hidden"
}
