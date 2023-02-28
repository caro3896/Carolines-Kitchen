window.addEventListener("DOMContentLoaded", start);

function start(){
    console.log("test")
    document.querySelector("#login_btn").addEventListener("click", () =>{
        console.log("modal")
        document.querySelector("#login_modal").classList.toggle("hidden");
    })

    document.querySelector("#close_modal").addEventListener("click", () =>{
        console.log("modal")
        document.querySelector("#login_modal").classList.toggle("hidden");
    })
}