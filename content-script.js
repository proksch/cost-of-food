console.log("content script loaded!");

// add image button
var btn = document.createElement("a");
btn.appendChild(document.createTextNode("$$$"));
btn.id = "cof-button";
btn.href = "#";

var section = document.getElementsByClassName("ltpMr Slqrh")[0];
section.appendChild(btn);

var article = document.getElementsByTagName("article")[0];
var image = article.querySelectorAll("img")[1].src;
console.log(article);
console.log(image);

// http://gk2009ch.gotdns.ch:1880/hackzurich/v2/?url=https://www.instagram.com/p/BnvfKLiFqy-/?utm_source=ig_web_copy_link
/*var xhttp = new XMLHttpRequest();
xhttp.open(
  "GET",
  "https://gk2009ch.gotdns.ch:1880/hackzurich/v2/?url=" + image,
  false
); // 3rd = asyc?
var res = xhttp.send();
console.log(res);

xhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    console.log(this.responseText);
  }
};*/

var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
 if (this.readyState === 4) {
   console.log(this.responseText);
 }
});

xhr.open("GET", "https://gk2009ch.gotdns.ch:1880/hackzurich/v2/?url=" + image);
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "430a9ff3-d21a-2335-9ad1-9bdf01b5761d");

xhr.send(data);












// modal

modal = document.createElement("div");
modal.id = "cof-container";

var ingredients = [
  { name: "Beef", value: 123 },
  { name: "bcd", value: 50 },
  { name: "dce", value: 23.4 }
];

console.log("Commenting on URL: " + document.URL);

modal.innerHTML += "<h2>Thanks for raising awareness about food costs!</h2>";
modal.innerHTML +=
  "<p>Please make a good guess of the ingredients that you see on the picture.</p>";
modal.innerHTML += '<ul id="cof-ingredients" />';

function createLi(idx, elem) {
  console.log(i);

  var input1 = document.createElement("input");
  input1.className = "ingredient";
  input1.value = elem["name"];
  input1.onkeyup = function(e) {
    changeName(idx, input1.value);
  };

  var input2 = document.createElement("input");
  input2.className = "amount";
  input2.value = elem["value"];
  input2.onkeyup = function(e) {
    changeValue(idx, input2.value);
  };

  var a = document.createElement("a");
  a.className = "btn-del";
  a.innerText = "🗑";
  a.onclick = function() {
    removeIngredient(idx);
  };

  var li = document.createElement("li");
  li.className = "ingredient-li";
  li.appendChild(input1);
  li.appendChild(input2);
  li.appendChild(a);

  return li;
}

function addIngredient() {
  console.log("add");
  ingredients.push({ name: "", value: "" });
  renderListIngredients();
}
function removeIngredient(idx) {
  console.log("remove: " + idx);
  ingredients.splice(idx, 1);
  renderListIngredients();
}

function changeName(idx, name) {
  console.log(idx + " (name) -> " + name);
  ingredients[idx]["name"] = name;
  generateComment()
}

function changeValue(idx, value) {
  console.log(idx + " (value) -> " + value);
  ingredients[idx]["value"] = value;
  generateComment()
}

function generateComment() {
    console.log("xxx")
    var cost = getFoodprint(ingredients)

    
    var comment = document.getElementById("cof-comment")
    comment.innerHTML = "Water: "+cost["h2o"]+", CO2: "+cost["co2"]+", Energy: "+cost["mj"]+""
    console.log(cost)
}

function renderListIngredients() {
  var x = document.getElementById("cof-ingredients");

  x.innerHTML =
    '<li><span class="header ingredient">Ingredient</span><span class="header amount">Amount (g)</span></li>';

  for (i in ingredients) {
    var idx_out = i;
    var elem_out = ingredients[idx_out];

    x.appendChild(createLi(idx_out, elem_out));
  }

  var miBtn = document.createElement("a");
  miBtn.className = "btn-add";
  miBtn.innerText = "➕";
  miBtn.onclick = addIngredient;

  var eli = document.createElement("li");
  eli.appendChild(miBtn);

  x.appendChild(eli);

  generateComment()
}

modal.innerHTML += "<p>Generated Comment</p>";
modal.innerHTML += '<textarea id="cof-comment"></textarea>';

modal.innerHTML += '<div id="cof-cnt"><a id="cof-post">Comment</a></div>';

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

renderListIngredients();
