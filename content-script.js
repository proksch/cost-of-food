console.log("content script loaded!");

// add image butto
var leafImg = document.createElement("img")
leafImg.src = chrome.extension.getURL("images/leaf2.png")

var btn = document.createElement("a");
btn.appendChild(leafImg);
btn.id = "cof-button";
btn.href = "#";

var section = document.getElementsByClassName("ltpMr Slqrh")[0];
section.appendChild(btn);

var article = document.getElementsByTagName("article")[0];
var image = article.querySelectorAll("img")[1].src;

var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    console.log(this.responseText);
    ingredients = JSON.parse(this.responseText)["ingredients"];
    nameOfFood = JSON.parse(this.responseText)["name"];
    nameInput2 = document.getElementById("cof-dishName")
    nameInput2.value = nameOfFood
    nameInput2.onkeyup = function() {
        console.log("dfsfsfdsfdfsdfsdfsdsfd")
        nameOfFood = nameInput2.value
        generateComment()
        console.log(nameOfFood)
    }
    renderListIngredients();
  }
});

xhr.open("GET", "https://gk2009ch.gotdns.ch:1880/hackzurich/v2/?url=" + image);
xhr.setRequestHeader("cache-control", "no-cache");

xhr.send(data);

//
function findPostId() {
    var metas = document.getElementsByTagName('meta'); 

    for (var i=0; i<metas.length; i++) { 
        if (metas[i].getAttribute("property") == "al:ios:url") { 
            var content = metas[i].getAttribute("content")
            return content.split("=")[1]; 
        } 
    } 
    return "";
} 
var postId = findPostId()
console.log("post id:" + postId)

function getCsrfToken() {
    chrome.cookies.get("csrf_token", function(details) {
        console.log(details)
    })
}
getCsrfToken()

// modal

modal = document.createElement("div");
modal.id = "cof-container";

var nameOfFood = "";
var ingredients = [
  { name: "Beef", value: 123 },
  { name: "bcd", value: 50 },
  { name: "dce", value: 23.4 }
];

console.log("Commenting on URL: " + document.URL);

modal.innerHTML += "<h2>Thanks for raising awareness about food costs!</h2>";
modal.innerHTML +=
  "<p>Please make a good guess of the ingredients that you see on the picture.</p>";

// add dish Name
var nameLabel = document.createElement("span")
nameLabel.id = "cof-dishNameLabel"
nameLabel.innerText = "Dish:"

var nameInput2 = document.createElement("input")
nameInput2.id = "cof-dishName";
var nameCnt = document.createElement("p")
nameCnt.className = "nameCnt"
nameCnt.appendChild(nameLabel)
nameCnt.appendChild(nameInput2)
modal.appendChild(nameCnt)


modal.innerHTML += '<ul id="cof-ingredients" />';

function createLi(idx, elem) {

  var input1 = document.createElement("input");
  input1.className = "ingredient";
  input1.value = elem["name"];
  input1.onkeyup = function (e) {
    changeName(idx, input1.value);
  };

  var input2 = document.createElement("input");
  input2.className = "amount";
  input2.value = elem["value"];
  input2.onkeyup = function (e) {
    changeValue(idx, input2.value);
  };

  var a = document.createElement("a");
  a.className = "btn-del";
  a.innerText = "🗑";
  a.onclick = function () {
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
    var comment = document.getElementById("cof-comment")
    comment.innerHTML = createComment()
}

function createComment() {
    var cost = getFoodprint(ingredients)
    var h2o = Math.round(cost["h2o"] * 100) / 100
    var co2 = Math.round(cost["co2"] * 100) / 100
    var mj = Math.round(cost["mj"] * 100) / 100
    var res = "This "+nameOfFood+" looks delicious, doesn't it? "
    res += "Unfortunately, eating it frequently is quite bad for our planet. "
    res += "Growing the ingredients to make it requires " + h2o + "l water, " + co2 + "kg CO2, " + mj + "MJ energy."
    return res
}

function addComment() {
    //submitPost()
    addIGComment()
    bg.style.visibility = "hidden";
}

function submitPost() {
    var data = null;
    var text = "";
    var caption = "";

    var cost = getFoodprint(ingredients)
    var co2 = Math.round(cost["co2"] * 100) / 100
    var caption = createComment()

    var text = " Your CO2 footprint: " + co2 + "kg";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        console.log(this.responseText);
    });
    xhr.open("GET", "https://gk2009ch.gotdns.ch:5000/postImage?imageUrl=" + image + "&text="+text+"&caption="+caption);
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}



function addIGComment() {

    var cmt = createComment()
    var formData = new FormData();
    formData.append("comment_text", cmt);
    formData.append("replied_to_comment_id", "");

    var addUrl = "https://www.instagram.com/web/comments/"+postId+"/add/";

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
        console.log(this.responseText);
    });
    xhr.open("POST", addUrl);
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded")
    xhr.setRequestHeader("x-csrftoken", "yZp8CcFuLi4wBLyw9Ac1dpCn9aDciuki")

    xhr.send(formData);
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

var miSubmitBtn = document.createElement("a");
miSubmitBtn.className = "btn-submit";
miSubmitBtn.id = "cof-post"
miSubmitBtn.innerText = "Add Comment";
miSubmitBtn.onclick = addComment;

modal.appendChild(miSubmitBtn)
//modal.innerHTML += '<div id="cof-cnt"></div>';


modal.onclick = function (e) {
  var event = e || window.event;
  event.stopPropagation();
};

// add container
bg = document.createElement("div");
bg.id = "cof-background";
bg.appendChild(modal);
document.body.appendChild(bg);

btn.onclick = function () {
  bg.style.visibility = "visible";
};
bg.onclick = function () {
  bg.style.visibility = "hidden";
};

bg.style.visibility = "hidden";

// renderListIngredients();
