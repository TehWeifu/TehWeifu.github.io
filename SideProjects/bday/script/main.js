async function sendApiRequest(){
    console.log("function called");
    let pie_or_cake = "pie";
    let rnd_num;

    let APP_ID = "b3ce1dc2";
    let APP_KEY = "1722d03a58253ef29dc6198ed93cf054";

    if (Math.random() < 0.5) {pie_or_cake = "cake";}
    rnd_num = parseInt(Math.floor(Math.random() * 99));

    let response = await fetch(`https://api.edamam.com/search?app_id=${APP_ID}&app_key=${APP_KEY}&q=${pie_or_cake}&from=${rnd_num}&to=${rnd_num + 1}`);
    let data = await response.json();
    console.log(data.hits[0]);

    showRecipe(data.hits[0].recipe);
}

function showRecipe(recipe) {
    let img = document.querySelector(".js-picture");
    let list = document.querySelector(".js-ingredients");
    let title = document.querySelector(".js-recipe-title");
    let details = document.querySelector(".js-details");
    let kcal = document.querySelector(".js-kcal");
    let link_recipe = document.querySelector(".js-link-recipe");
    let people_person = "people";

    if (recipe.yield === 1) {people_person = "person";}

    img.src = recipe.image;
    title.innerHTML = recipe.label;
    details.innerHTML = `This recipe takes ${recipe.totalTime} minutes to make and you can feed ${recipe.yield} ${people_person} with it.`;
    kcal.innerHTML = `It has a total of ${Math.floor(recipe.calories)} kcalories (${Math.floor(recipe.calories / recipe.yield)} per serving).`
    link_recipe.href = recipe.url;



    for (const ingredientLine of recipe.ingredientLines) {
        let point = document.createElement("li");
        point.innerHTML = ingredientLine;
        list.appendChild(point);
    }
}

sendApiRequest();

let refresh_button = document.querySelector(".js-refresh-button");
console.log(refresh_button);
refresh_button.addEventListener('click', () => {sendApiRequest();});

