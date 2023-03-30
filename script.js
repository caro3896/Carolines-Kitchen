window.addEventListener("DOMContentLoaded", start);

let recipes;
let filter = "All";
const jsonData = "recipes.json";

function start(){
    document.querySelector("#login_btn").addEventListener("click", () =>{
        console.log("modal")
        document.querySelector("#login_modal").classList.toggle("hidden");
    })

    document.querySelector("#close_modal").addEventListener("click", () =>{
        console.log("modal")
        document.querySelector("#login_modal").classList.toggle("hidden");
    })

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

// Inspiration from: https://stackoverflow.com/questions/20125181/storing-arrays-to-localstorage-every-click-of-a-button
let savedRecipes = [];
function saveRecipe(recipe){
    let saved = localStorage.getItem("Saved");
    if(saved){
        savedRecipes = JSON.parse(saved);
    }
    if(savedRecipes.includes(recipe.title)){
            // TO DO: Remove from array
    }
    else {
        //TO DO: Change heart to color
        savedRecipes.push(recipe.title);
    }
    localStorage.setItem("Saved", JSON.stringify(savedRecipes));
}
