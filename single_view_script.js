window.addEventListener("DOMContentLoaded", start);
// Get the URL containing the id(name) of the recipe
// Inspiration from - https://medium.com/@cyberbotmachines/how-to-pass-value-from-one-html-page-to-another-using-javascript-3c9ab62df4d
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Getting what is already in localstorage
let savedRecipes = JSON.parse(localStorage.getItem("Saved"));

// Const for the data we will be using
const jsonData = "recipes.json";

function start(){
    // Set the title to be the name of the recipe (the id)
    document.querySelector("title").textContent = id;

    // Call function to get data
    getRecipes();

    // Show the login modal
    document.querySelector("#login_btn").addEventListener("click", () =>{
        console.log("modal")
        document.querySelector("#login_modal").classList.remove("hidden");
    })
    // Close the login modal
    document.querySelector("#close_modal").addEventListener("click", () =>{
        console.log("modal")
        document.querySelector("#login_modal").classList.add("hidden");
    })
    // Go back in history when button is clicked
    document.querySelector("#back").addEventListener("click", () => {
        history.back();
    })
}

// Getting data from JSON 
async function getRecipes() {
    console.log("getting data");
    // Fetch data
    const result = await fetch(jsonData);
    // Parse as JSON
    const json = await result.json();
    // Call function to show recipe
    showRecipes(json);
}

// Looping trough the data and appending it to the page
function showRecipes(recipes){
    console.log("showing data");
    
    recipes.forEach(recipe => {
        // Find the recipe that matched the id (name)
        if (recipe.title == id){
            console.log("recipe for " + id);
            document.querySelector("#recipe_img").src = `./images/` + recipe.image;
            document.querySelector("#recipe_title").textContent = recipe.title;
            document.querySelector("#recipe_title2").textContent = recipe.title;
            // Change color of the saved button based on if it's saved or not
            if(savedRecipes.includes(recipe.title)){
                document.querySelector(".like_button svg").style.fill = "#FFAE00";
                document.querySelector(".like_button svg").style.stroke = "#FFAE00";
            }
            else {
                document.querySelector(".like_button svg").style.fill = "transparent";
                document.querySelector(".like_button svg").style.stroke = "#DDDAC0";
            }
            document.querySelector("#recipe_text").textContent = recipe.long_description;
            document.querySelector("#servings").textContent = recipe.serves;
            document.querySelector("#prep").textContent = recipe.prep_time;
            document.querySelector("#cook").textContent = recipe.cooking_time;
            
            // Loop trough the ingredient and create a list item for each
            recipe.ingredients.forEach(ingredient =>{
            console.log("getting ingredients");
            document.querySelector("#ingredients").innerHTML += "<li>" + ingredient + "</li>"
            });
            // Loop trough the steps and create a list item for each
            recipe.steps.forEach(step =>{
                console.log("getting ingredients");
                document.querySelector("#instructions").innerHTML += "<li>" + step + "</li>"
            });

            // Add eventlistener for save button
            document.querySelector(".like_button").addEventListener("click", (e) => saveRecipe(e, recipe));
        }
    });
}

// Save the chosen recipe to localstorage
// Inspiration from: https://stackoverflow.com/questions/20125181/storing-arrays-to-localstorage-every-click-of-a-button
function saveRecipe(e, recipe){
      // If the recipe is already saved, remove it and change the color of the button
    if(savedRecipes.includes(recipe.title)){
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
            // Change color of button
            e.target.style.fill = "transparent";
            e.target.style.stroke = "#DDDAC0";
    }
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
