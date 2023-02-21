window.addEventListener("DOMContentLoaded", start);

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
    const container = document.querySelector("#recipes_wrapper");
    const template = document.querySelector("template");
    
    recipes.forEach(recipe => {
        console.log("cloning and appending data")
        const clone = template.cloneNode(true).content;
        clone.querySelector(".title").textContent = recipe.title;
        clone.querySelector(".text").textContent = recipe.short_description;
        clone.querySelector(".text2").textContent = recipe.long_description;

        recipe.ingredients.forEach(ingredient =>{
            console.log("getting ingredients");
            clone.querySelector(".ingredients").innerHTML += "<li>" + ingredient + "</li>"
        });

        clone.querySelector("article").addEventListener("click", () => showRecipe(recipe));

        container.appendChild(clone);
    });

    function showRecipe(recipe) {
        console.log(recipe.title + " was clicked")
        location.href = `recipe.html?id=${recipe.title}`;
    }
}