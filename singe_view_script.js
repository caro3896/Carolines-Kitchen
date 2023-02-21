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
    // const container = document.querySelector("#recipes_wrapper");
    // const template = document.querySelector("template");
    
    recipes.forEach(recipe => {
        if (recipe.title == id){
            console.log("recipe for " + id);
            document.querySelector("#recipe_title").textContent = recipe.title;
            document.querySelector("#recipe_text").textContent = recipe.long_description;
        }
        // console.log("cloning and appending data")
        // const clone = template.cloneNode(true).content;
        // clone.querySelector(".title").textContent = recipe.title;
        // clone.querySelector(".text").textContent = recipe.short_description;
        // clone.querySelector(".text2").textContent = recipe.long_description;

        // recipe.ingredients.forEach(ingredient =>{
        //     console.log("getting ingredients");
        //     clone.querySelector(".ingredients").innerHTML += "<li>" + ingredient + "</li>"
        // });

        // clone.querySelector("article").addEventListener("click", () => showRecipe(recipe));

        // container.appendChild(clone);
    });
}
