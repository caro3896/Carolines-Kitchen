window.addEventListener("DOMContentLoaded", start);

// Global variabel to store the recipes
let recipes;
// Const for the data we will be using
const jsonData = "recipes.json";
// Getting what is already in localstorage
let savedRecipes = JSON.parse(localStorage.getItem("Saved"));

function start(){
    console.log(savedRecipes);
    // Call function to get data
    getData();

    // Show the Login modal
    document.querySelector("#login_btn").addEventListener("click", () =>{
        console.log("modal")
        document.querySelector("#login_modal").classList.remove("hidden");
    })
    // Close the login modal
    document.querySelector("#close_modal").addEventListener("click", () =>{
        console.log("modal")
        document.querySelector("#login_modal").classList.add("hidden");
    })
}

// Getting data from JSON 
async function getData() {
    console.log("getting data");
    // Fetch data
    const result = await fetch(jsonData);
    // Parse as JSON
    recipes = await result.json();
    // Call function to show recipe
    showRecipes();
}

// Creating variables to hold the container and the template for the recipes
const container = document.querySelector("#recipes_wrapper");
const template = document.querySelector("template");

// Looping trough the data and appending it to the template
function showRecipes(){
    console.log("showing data", recipes); 
    // Clearing the container    
    container.textContent = "";
    // Creating each recipe in the JSON object as a clone of the template
    recipes.forEach(recipe => {
        // Show recipes if they are saved in localstorage
        if (savedRecipes.includes(recipe.title)){
            const clone = template.cloneNode(true).content;
            clone.querySelector(".recipe_img").src = `./images/` + recipe.image;
            clone.querySelector(".category").textContent = recipe.category;
            clone.querySelector(".time").textContent = recipe.overall_time;
            clone.querySelector(".title").textContent = recipe.title;
            clone.querySelector(".text").textContent = recipe.short_description;
            clone.querySelector(".like_button svg").style.fill = "#FFAE00";
            clone.querySelector(".like_button svg").style.stroke = "#FFAE00";
            // Add eventlisteners for single view and save
            clone.querySelector(".recipe_wrapper").addEventListener("click", () => showRecipe(recipe));
            clone.querySelector(".like_button").addEventListener("click", (e) => removeRecipe(e, recipe));
            // Append each clone to the container
            container.appendChild(clone);
        }
    });
}

// Send the user to the specific recipe's page
function showRecipe(recipe) {
    console.log(recipe.title + " was clicked");
    // Redirect user - sending the title of the recipe as an id
    location.href = `recipe.html?id=${recipe.title}`;
}

// Remove the chosen recipe from localstorage
// Inspiration from: https://stackoverflow.com/questions/20125181/storing-arrays-to-localstorage-every-click-of-a-button
function removeRecipe(e, recipe){
    if(savedRecipes.includes(recipe.title)){
        console.log(recipe.title)," was in the array";
        // TO DO: Remove from array and localstorage - inspiration from: https://love2dev.com/blog/javascript-remove-from-array/#remove-from-array-splice-value
        for (let i = 0; i <savedRecipes.length; i++){
            // Loop trough the saved recipes and find the one that matches the name clicked
            if (savedRecipes[i] === recipe.title){
                console.log("Remove: " + recipe.title);
                // Remove the name from the array
                savedRecipes.splice(i,1);
                // Shorten the array
                i--;
            }
        }
    }

    // Save the array to localstorage
    localStorage.setItem("Saved", JSON.stringify(savedRecipes));
    // Load the recipes again, so the recipe is removed from the interface
    showRecipes();
}
