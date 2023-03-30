window.addEventListener("DOMContentLoaded", start);

const jsonData = "recipes.json";
let savedRecipes = JSON.parse(localStorage.getItem("Saved"));

function start(){
    console.log(savedRecipes);
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
        if (savedRecipes.includes(recipe.title)){
            console.log(recipe);
            const clone = template.cloneNode(true).content;
            clone.querySelector(".recipe_img").src = `./images/` + recipe.image;
            clone.querySelector(".category").textContent = recipe.category;
            clone.querySelector(".time").textContent = recipe.overall_time;
            clone.querySelector(".title").textContent = recipe.title;
            clone.querySelector(".text").textContent = recipe.short_description;
            clone.querySelector(".like_button svg").style.fill = "#FFAE00";
            clone.querySelector(".like_button svg").style.stroke = "#FFAE00";
            clone.querySelector(".recipe_wrapper").addEventListener("click", () => showRecipe(recipe));
            clone.querySelector(".like_button").addEventListener("click", (e) => saveRecipe(e, recipe));

        container.appendChild(clone);
        }
    });
}

function showRecipe(recipe) {
    console.log(recipe.title + " was clicked")
    location.href = `recipe.html?id=${recipe.title}`;
}

function saveRecipe(e, recipe){
    if(savedRecipes.includes(recipe.title)){
            // TO DO: Remove from array and localstorage - found: https://love2dev.com/blog/javascript-remove-from-array/#remove-from-array-splice-value
            for (let i = 0; i <savedRecipes.length; i++){
                if (savedRecipes[i] === recipe.title){
                    console.log("Remove: " + recipe.title);
                    savedRecipes.splice(i,1);
                    i--;
                }
            }
    }
    else {
        e.target.style.fill = "#FFAE00";
        savedRecipes.push(recipe.title);
    }
    localStorage.setItem("Saved", JSON.stringify(savedRecipes));
    showRecipes();
}
