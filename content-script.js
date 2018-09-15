console.log("content script loaded!");

// add image button
var btn = document.createElement("a");
btn.appendChild(document.createTextNode("$$$"));
btn.id = "cof-button";
btn.href = "#";

var section = document.getElementsByClassName("ltpMr Slqrh")[0];
section.appendChild(btn);

// modal

modal = document.createElement("div");
modal.id = "cof-container";


var fili =
  '<li><span class="header ingredient">Ingredient</span><span class="header amount">Amount (g)</span></li>';
var ali =
  '<li><input class="ingredient" value="asd"/><input class="amount" value="50g"/><a class="btn">-</a></li>';
var lali = '<li><a class="btn">+</a></li>';

modal.innerHTML += "<h2>Thanks for raising awareness about food costs!</h2>"
modal.innerHTML += "<p>Please make a good guess of the ingredients that you see on the picture.</p>"
modal.innerHTML +=
  '<ul id="cof-ingredients">' + fili + ali + ali + ali + lali + '</ul>'

modal.innerHTML +=
  '<p>Generated Comment</p>';
modal.innerHTML +=
  '<textarea id="comment"></textarea>';

modal.innerHTML += '<div id="cof-cnt"><a id="cof-sed">post</a></div>'

modal.onclick = function(e) {
  var event = e || window.event;
  event.stopPropagation();
};

// add container
bg = document.createElement("div");
bg.id = "cof-background";
bg.appendChild(modal);
document.body.appendChild(bg);

btn.onclick = function() {
  bg.style.visibility = "visible";
};
bg.onclick = function() {
  bg.style.visibility = "hidden";
};
