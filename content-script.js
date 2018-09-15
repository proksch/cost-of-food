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

var ingredients = [
    {"name": "abc", "value": 123},
    {"name": "bcd", "value": 50},
    {"name": "dce", "value": 23.4}
]

modal.innerHTML += "<h2>Thanks for raising awareness about food costs!</h2>"
modal.innerHTML += "<p>Please make a good guess of the ingredients that you see on the picture.</p>"
modal.innerHTML += '<ul id="cof-ingredients" />'

function createLi(idx, elem) {
    console.log(i)

    var input1 = document.createElement("input");
    input1.className = "ingredient"
    input1.value = elem['name']

    var input2 = document.createElement("input");
    input2.className = "amount"
    input2.value = elem['value']

    var a = document.createElement("a");
    a.className = "btn"
    a.innerText = "-"
    a.onclick = function() {
        removeIngredient(idx);
    }

    var li = document.createElement("li");
    li.className = "ingredient-li"
    li.appendChild(input1)
    li.appendChild(input2)
    li.appendChild(a)

    return li;
}

function addIngredient() {
    console.log("add")
}
function removeIngredient(idx) {
    console.log("remove: "+ idx)
}

function renderListIngredients() {

    var x = document.getElementById("cof-ingredients")

    x.innerHTML = '<li><span class="header ingredient">Ingredient</span><span class="header amount">Amount (g)</span></li>';

   for(i in ingredients) {
        var idx_out = i;
        var elem_out = ingredients[idx_out]

        x.appendChild(createLi(idx_out, elem_out))
    }

    var miBtn = document.createElement("a");
    miBtn.className = "btn"
    miBtn.innerText = "+"
    miBtn.onclick = addIngredient

    var eli = document.createElement("li");
    eli.appendChild(miBtn)

    x.appendChild(eli)
}

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




renderListIngredients();
