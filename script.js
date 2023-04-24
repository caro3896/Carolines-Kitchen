window.addEventListener("DOMContentLoaded", start);

// Global variabel to store the recipes
let recipes;
// Set the filer to be all initially
let filter = "All";

// Const for the data we will be using
const jsonData = "recipes.json";

// Empty array for the saved recipes
let savedRecipes = [];
// Getting what is already in localstorage
let saved = localStorage.getItem("Saved");

function start(){
    // If theres already saved items in localstorage, put it in the array
    if(saved){
        savedRecipes = JSON.parse(saved);
    }
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

    // Creating listener for the filter buttons
    document.querySelectorAll(".filter").forEach(button => {
        button.addEventListener("click", selectFilter)
    });

    // Call function to get data
    getData();
}

// Setting the filter after the chosen filter button
function selectFilter(){
    // Set filter to be the chosen one
    filter = this.dataset.filter;
    // Remove the previous active button
    document.querySelector(".active").classList.remove("active");
    // Set the new active button
    this.classList.add('active');
    // Change the text content to show the chosen filter
    document.querySelector("#recipes_category").textContent = filter;
    // Call the function to show recipes again, so show the recipes with that filter
    showRecipes();
}

// Getting data from JSON 
async function getData() {
    console.log("getting data");
    // Fetch data
    const result = await fetch(jsonData);
    // Parse as JSON
    recipes = await result.json();
    // Call function to show recipes
    showRecipes();
}

// Creating variables to hold the container and the template for the recipes
const container = document.querySelector("#recipes_wrapper");
const template = document.querySelector("template");

// Looping trough the data and appending it to the template
function showRecipes(){
    console.log("showing data");  
    // Clearing the container  
    container.textContent = "";

    // Creating each recipe in the JSON object as a clone of the template
    recipes.forEach(recipe => {
        // Show recipes based on filter
        if (filter == recipe.category || filter == "All"){
            const clone = template.cloneNode(true).content;
            clone.querySelector(".recipe_img").src = `./images/` + recipe.image;
            clone.querySelector(".category").textContent = recipe.category;
            clone.querySelector(".time").textContent = recipe.overall_time;
            clone.querySelector(".title").textContent = recipe.title;
            clone.querySelector(".text").textContent = recipe.short_description;
            // Change color of the saved button based on if it's saved or not
            if(savedRecipes.includes(recipe.title)){
                clone.querySelector(".like_button svg").style.fill = "#FFAE00";
                clone.querySelector(".like_button svg").style.stroke = "#FFAE00";
            }
            else {
                clone.querySelector(".like_button svg").style.fill = "transparent";
                clone.querySelector(".like_button svg").style.stroke = "#002937";
            }
            // Add eventlisteners for single view and save
            clone.querySelector(".recipe_wrapper").addEventListener("click", () => showRecipe(recipe));
            clone.querySelector(".like_button").addEventListener("click", (e) => saveRecipe(e, recipe));

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

// Save the chosen recipe to localstorage
// Inspiration from: https://stackoverflow.com/questions/20125181/storing-arrays-to-localstorage-every-click-of-a-button
function saveRecipe(e, recipe){
    // If the recipe is already saved, remove it and change the color of the button
    if(savedRecipes.includes(recipe.title)){
            // TO DO: Remove from array - inspiration from: https://love2dev.com/blog/javascript-remove-from-array/#remove-from-array-splice-value
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
            
            e.target.style.fill = "transparent";
            e.target.style.stroke = "#002937";
    }
    // If the recipe is not saved
    else {
        // Change the color of the button
        e.target.style.fill = "#FFAE00";
        e.target.style.stroke = "#FFAE00";
        // Push the name of the recipe to the array
        savedRecipes.push(recipe.title);
    }
    // Save the array to localstorage
    localStorage.setItem("Saved", JSON.stringify(savedRecipes));
}