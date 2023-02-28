window.addEventListener("DOMContentLoaded", start);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

function start(){
    document.querySelector("title").textContent = id;
    const jsonData = "recipes.json";
    getRecipes(jsonData);
}

async function getRecipes(jsonData) {
    console.log("getting data");
    const result = await fetch(jsonData);
    const json = await result.json();
    showRecipes(json);
}

function showRecipes(recipes){
    console.log("showing data");
    
    recipes.forEach(recipe => {
        if (recipe.title == id){
            console.log("recipe for " + id);
            document.querySelector("#recipe_img").src = `./images/` + recipe.image;
            document.querySelector("#recipe_title").textContent = recipe.title;
            document.querySelector("#recipe_title2").textContent = recipe.title;
            document.querySelector("#recipe_text").textContent = recipe.long_description;
            document.querySelector("#servings").textContent = recipe.serves;
            document.querySelector("#prep").textContent = recipe.prep_time;
            document.querySelector("#cook").textContent = recipe.cooking_time;
    
            recipe.ingredients.forEach(ingredient =>{
            console.log("getting ingredients");
            document.querySelector("#ingredients").innerHTML += "<li>" + ingredient + "</li>"
        });

            recipe.steps.forEach(step =>{
                console.log("getting ingredients");
                document.querySelector("#instructions").innerHTML += "<li>" + step + "</li>"
        });
        }
    });
}


