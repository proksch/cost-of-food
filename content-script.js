console.log("content script loaded!")

var btn = document.createElement("a");
btn.appendChild(document.createTextNode("$$$")); 
btn.id = "cof-button"
btn.href="#"

btn.onclick = function() {
    alert("hey!")
}

var section = document.getElementsByClassName("ltpMr Slqrh")[0]
section.appendChild(btn)

modal = document.createElement("div")
modal.id = "cof-container"
modal.appendChild(document.createTextNode("asd"))

bg = document.createElement("div")
bg.id = "cof-background"
bg.appendChild(modal)

document.body.appendChild(bg)