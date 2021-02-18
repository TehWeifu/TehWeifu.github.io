//Object Declaration
let SoundCloudAPI = {};

// 1. Search
SoundCloudAPI.userInput = function () {
    let input = document.querySelector('.js-search');
    input.addEventListener('keypress', (event) => {
        if (event.keyCode === 13) {
            let inputValue = input.value;
            SoundCloudAPI.getTrack(inputValue);
        }
    });

    let searchButton = document.querySelector('.js-submit');
    searchButton.addEventListener('click', (event) => {
        let inputValue = input.value;
        SoundCloudAPI.getTrack(inputValue);
    })
}
// 1. Search




// 2. Query Soundcloud API
SoundCloudAPI.init = function () {
    SC.initialize({
        client_id: 'cd9be64eeb32d1741c17cb39e41d254d'
    });
}

SoundCloudAPI.getTrack = function (inputValue) {
    // find all sounds of buskers licensed under 'creative commons share alike'
    SC.get('/tracks', {
        q: inputValue
    }).then(function (tracks) {
        console.log(tracks);
        SoundCloudAPI.renderTracks(tracks);
    });
}
// 2. Query Soundcloud API




// 3. Display the cards
SoundCloudAPI.renderTracks = function (tracks) {
    let searchResult = document.querySelector('.js-search-results');
    searchResult.innerHTML = "";

    tracks.forEach(function (track) {
        //card element
        let card = document.createElement('div');
        card.classList.add('card');

        //image part
        let imgDiv = document.createElement('div');
        imgDiv.classList.add('image');

        let imgDivImg = document.createElement('img');
        imgDivImg.classList.add('image_img');
        imgDivImg.src = track.artwork_url || 'https://placekitten.com/200/200';
        imgDivImg.alt = 'cardImg';

        imgDiv.appendChild(imgDivImg);
        card.appendChild(imgDiv);

        //content part
        let content = document.createElement('div');
        content.classList.add('content');

        let header = document.createElement('div');
        header.classList.add('header');
        header.innerHTML = `<a href=${track.permalink_url} target='_blank'>${track.title}</a>`
        content.appendChild(header);
        card.appendChild(content);

        //button part
        let button = document.createElement('div');
        button.classList.add('ui', 'bottom', 'attached', 'button', 'js-button');
        button.innerHTML = "<i class='add icon'></i>";
        button.innerHTML += "<span>Add to playlist</span>";
        card.appendChild(button);

        //appending the new card to the container
        let searchResult = document.querySelector('.js-search-results');
        searchResult.appendChild(card);

        button.addEventListener('click', function () {
            SoundCloudAPI.getEmbed(track.permalink_url);
        });
    });
}
// 3. Display the cards




// 4. Add to playlist
SoundCloudAPI.getEmbed = function (trackURL) {
    // console.log("click I'm in getEmbed");
    SC.oEmbed(trackURL, {
        auto_play: true
    }).then(function (embed) {
        console.log('oEmbed response: ', embed);

        let sideBar = document.querySelector('.js-playlist');

        let box = document.createElement('div');
        box.innerHTML = embed.html;

        sideBar.insertBefore(box, sideBar.firstChild);

        //save on local storage
        localStorage.setItem('key', sideBar.innerHTML);
        // alert(sideBar.innerHTML);
    });
}
// 4. Add to playlist




// 5. Clear button
SoundCloudAPI.clearPlaylist = function () {
    let clearButton = document.querySelector('.js-clearButton');
    clearButton.addEventListener('click', () => {
        localStorage.clear();
        let playlist = document.querySelector('.js-playlist');
        playlist.innerHTML = "";
    });
}
// 5. Clear button




//Diver code
SoundCloudAPI.init();
SoundCloudAPI.userInput();
SoundCloudAPI.clearPlaylist();

//loads the saved tracks
let sideBar = document.querySelector('.js-playlist');
sideBar.innerHTML = localStorage.getItem('key');

