/* 1. Grab the input value */


// document.querySelector(".js-go").addEventListener('click',function(e){
//
//     const input = document.querySelector("input").value;
//     apiCall(input);
//
// });
//
// document.querySelector(".js-userinput").addEventListener('keyup',function(event){
//
//     const input = document.querySelector("input").value;
//     if (event.keyCode === 13) {
//         apiCall(input);
//     }
// });

apiCall();




/* 2. do the data stuff with the API */

function apiCall() {
    // let searchWords = input.split(" ");
    // searchWords = searchWords.join("+");

    // let url = `http://api.giphy.com/v1/gifs/search?q=${searchWords}&api_key=dc6zaTOxFJmzC`;
    let url = "http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC";
    console.log(url);

    let GiphyAJAXCall = new XMLHttpRequest();
    GiphyAJAXCall.open( 'GET', url );
    GiphyAJAXCall.send();

    GiphyAJAXCall.addEventListener('load', (e) => {
        let data = e.target.response;
        pushToDOM(data);
    });
}



/* 3. Show me the GIFs */

function pushToDOM(input) {
    let i = 0
    let response = JSON.parse(input);
    let imageUrls = response.data;
    let src;

    const container = document.querySelector(".js-container");
    container.innerHTML = "";

    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            src = response.data[i].images.fixed_height.url;
            container.innerHTML = "<img src=\"" + src + "\" alt='gif' class='container-image'>";
        }, 5000 * i);
    }

    // imageUrls.forEach((image) => {
    //     let src = image.images.fixed_height.url;
    //     // console.log(src);
    //     const container = document.querySelector(".js-container");
    //     container.innerHTML += "<img src=\"" + src + "\" alt='gif' class='container-image'>";
    // });

}