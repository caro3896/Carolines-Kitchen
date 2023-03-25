window.addEventListener("DOMContentLoaded", start);


function start(){
    if (window.localStorage.getItem("Saved recipes")== null){
        document.querySelector("#saved_intro").textContent = "You have no saved recipes yet!"
    }
    else {
        let saved = [];
        saved.push(window.localStorage.getItem("Saved recipes"));
        
        // container.textContent = "";
        console.log(saved);

    // saved.forEach(recipe => {
    //     if (filter == recipe.category || filter == "All"){
    //         const clone = template.cloneNode(true).content;
    //         clone.querySelector(".recipe_img").src = `./images/` + recipe.image;
    //         clone.querySelector(".category").textContent = recipe.category;
    //         clone.querySelector(".time").textContent = recipe.overall_time;
    //         clone.querySelector(".title").textContent = recipe.title;
    //         clone.querySelector(".text").textContent = recipe.short_description;
            
    //         clone.querySelector(".recipe_wrapper").addEventListener("click", () => showRecipe(recipe));
    //         clone.querySelector(".like_button").addEventListener("click", () => saveRecipe(recipe));

    //     container.appendChild(clone);
    //     }
    // });
    }
}