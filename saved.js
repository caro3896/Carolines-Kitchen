window.addEventListener("DOMContentLoaded", start);

const jsonData = "recipes.json";

function start(){
    getData();
}

async function getData() {
    console.log("getting data");
    const result = await fetch(jsonData);
    recipes = await result.json();
    showRecipes();
}

const container = document.querySelector("#recipes_wrapper");
const template = document.querySelector("template");

function showRecipes(){
    console.log("showing data");   
    container.textContent = "";

    recipes.forEach(recipe => {
        console.log(recipe);
        if (recipe.saved === true){
            console.log(recipe);
            const clone = template.cloneNode(true).content;
            clone.querySelector(".recipe_img").src = `./images/` + recipe.image;
            clone.querySelector(".category").textContent = recipe.category;
            clone.querySelector(".time").textContent = recipe.overall_time;
            clone.querySelector(".title").textContent = recipe.title;
            clone.querySelector(".text").textContent = recipe.short_description;
            
            clone.querySelector(".recipe_wrapper").addEventListener("click", () => showRecipe(recipe));
            clone.querySelector(".like_button").addEventListener("click", () => saveRecipe(recipe));

        container.appendChild(clone);
        }
    });
}
