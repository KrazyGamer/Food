function search(that) {
  fetch(
    "https://hackingtonsapiproxy.herokuapp.com/" +
      `https://api.edamam.com/api/recipes/v2?type=public&q=/${that.value}&app_id=89e05b77&app_key=403e35a6365584b400b84f8c1f536188`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      if (data.hits.length > 0) {
        showResults(data);
      } else {
        notFound();
      }
    });
}
function showResults(data) {
  document.getElementById("recipeContainer").innerHTML = "";
  for (let i = 0; i < data.hits.length; i++) {
    console.log(data.hits[i].recipe.label);
    console.log(data.hits[i].recipe.image);
    console.log(data.hits[i].recipe.ingredientLines);
    console.log(data.hits[i].recipe.shareAs);
    buildRecipe(data.hits[i].recipe);
  }
}

function buildRecipe(recipe) {
  let newTitle = makeElement("h1", "title", recipe.label);
  let newImage = makeElement("img", "foodImg");
  let newUL = makeElement("ul", "ingList");
  let newA = makeElement(
    "a",
    "link",
    "Here's some nutritional value and more info on " +
      recipe.label.toLowerCase() +
      " ."
  );
  let newDesc = makeElement(
    "p",
    "desc",
    "This delicious dish is meant for " +
      recipe.mealType +
      ". <br><br><br><br><br><br><br><br><br>"
  );

  newImage.src = recipe.image;
  newA.href = recipe.shareAs;

  for (let i = 0; i < recipe.ingredientLines.length; i++) {
    let newLI = makeElement("li", "ingItem", recipe.ingredientLines[i]);
    newUL.append(newLI);
  }

  let newRecipe = makeElement("div", "recipe");
  newRecipe.append(newTitle);
  newRecipe.append(newImage);
  newRecipe.append(newUL);
  newRecipe.append(newA);
  newRecipe.append(newDesc);
  document.getElementById("recipeContainer").append(newRecipe);
}

function makeElement(type = "div", newClass, inner = "") {
  let newEl = document.createElement(type);
  if (newClass) {
    newEl.classList.add(newClass);
  }
  newEl.innerHTML = inner;
  return newEl;
}

function notFound() {
  document.getElementById("recipeContainer").innerHTML = "No Recipe Found";
}
