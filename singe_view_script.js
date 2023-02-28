window.addEventListener("DOMContentLoaded", start);
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

function start(){
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
            document.querySelector("#recipe_title").textContent = recipe.title;
            document.querySelector("#recipe_text").textContent = recipe.long_description;
        }
    });
}


