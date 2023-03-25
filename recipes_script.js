window.addEventListener("DOMContentLoaded", start);

let recipes;
let filter = "All";
const jsonData = "recipes.json";

// First function to call after the DOM has loaded
function start(){
    console.log("DOM has loaded");
   
    // Creating listener for the filter buttons
    document.querySelectorAll(".filter").forEach(button => {
        button.addEventListener("click", selectFilter)
    });
    getData();
}

// Setting the filter after the chosen filter button
function selectFilter(){
    filter = this.dataset.filter;
    document.querySelector(".active").classList.remove("active");
    this.classList.add('active');
    console.log(filter);
    showRecipes();
    document.querySelector("#recipes_category").textContent = filter;
}

// Getting data from JSON 
async function getData() {
    console.log("getting data");
    const result = await fetch(jsonData);
    recipes = await result.json();
    showRecipes();
}

const container = document.querySelector("#recipes_wrapper");
const template = document.querySelector("template");

// Looping trough the data and appending it to the template
function showRecipes(){
    console.log("showing data");   
    container.textContent = "";

    recipes.forEach(recipe => {
        if (filter == recipe.category || filter == "All"){
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

function showRecipe(recipe) {
    console.log(recipe.title + " was clicked")
    location.href = `recipe.html?id=${recipe.title}`;
}

let savedRecipes = []
// function to add object to localstorage
function saveRecipe(recipe){
    savedRecipes.push(recipe)
    window.localStorage.setItem("Saved recipes", JSON.stringify(savedRecipes));
}