window.addEventListener("DOMContentLoaded", start);

let recipes;
let filter = "All";
const jsonData = "recipes.json";
let savedRecipes = [];
let saved = localStorage.getItem("Saved");

function start(){
    if(saved){
        savedRecipes = JSON.parse(saved);
    }
    
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
            if(savedRecipes.includes(recipe.title)){
                clone.querySelector(".like_button svg").style.fill = "#FFAE00";
                clone.querySelector(".like_button svg").style.stroke = "#FFAE00";
            }
            else {
                clone.querySelector(".like_button svg").style.fill = "transparent";
                clone.querySelector(".like_button svg").style.stroke = "#002937";
            }
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

// Inspiration from: https://stackoverflow.com/questions/20125181/storing-arrays-to-localstorage-every-click-of-a-button

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