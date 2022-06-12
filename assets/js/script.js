const mainMenu = document.querySelectorAll('a');

window.addEventListener('load', () => {
    const homeMenu = document.getElementsByClassName('home')[0];
    const mainMovie = document.querySelector('.main-movie');

    mainMovie.innerHTML = '<span>Loading...</span>';

    setTimeout(() => {
        homeMenu.classList.add('active-menu');
        home();
    }, 800);
  });

mainMenu.forEach(menu => {
    menu.addEventListener('click', function(){
        mainMenu.forEach(a => a.classList.remove('active-menu'));

        const mainMovie = document.querySelector('.main-movie');

        menu.classList.add('active-menu');

        if(menu.classList.contains('home')){
            mainMovie.innerHTML = '<span>Loading...</span>';
            setTimeout(() => {
                home();
            }, 800)

        }else if(menu.classList.contains('genre')){

            mainMovie.innerHTML = '<span>Loading...</span>';
            setTimeout(() => {
                genre();
            }, 800)
        }else {
            mainMovie.innerHTML = '<span>Loading...</span>';

            setTimeout(() => {
                comingSoon();
            }, 800)
        }
    })
})


function home(){
    movieList();
}

async function movieList(){
    const response = await getAllMovies();

    const recomendation = [];
    const release = [];
    response.results.forEach((movies, index) => {
        (index <= 9) ? recomendation.push(movies) : release.push(movies); 
    })
    
    const result = (
        `<div>
            ${recentlyPlayed(recomendation)}
            ${newRelease(release)}
        </div>`
    )
    
    updateUI(result);
}

function updateUI(cards){
    const mainMovie = document.querySelector('.main-movie');

    mainMovie.innerHTML = cards;
}

function recentlyPlayed(movies){
    let recomendation = '';

    movies.forEach(m => recomendation += card(m));
    
    return (
        `<div class="recently-played">
            <div class="heading">
                <h3>Recently Played</h3>
                <span class="see-all">See All</span>
            </div>

            <div class="cards">
                ${recomendation}
            </div>
        </div>`
    );
}

function newRelease(movies){
    let release = '';

    movies.forEach(m => release += card(m));

    return (
        `<div class="new-release">
            <div class="heading">
                <h3>New Release</h3>
                <span class="see-all">See All</span>
            </div>

            <div class="cards">
                ${release}
            </div>
        </div>`
    )
}


function card(m){
    const img = {...m.primaryImage};
    const poster = img.url;
    return (
        `<div class="card">
            <img src=${poster} alt=${m.titleText.text}>
            <div class="info">
                <h3 class="title">${m.titleText.text}</h3>
                <p class="year">${m.releaseYear.year}</p>
            </div>
        </div>`
    )
}


function getAllMovies(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b347bc0983mshe9d646e8a29ed83p1b05b4jsn708feff2a216',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    return fetch('https://moviesdatabase.p.rapidapi.com/titles?info=base_info&limit=20&page=1&titleType=movie&genre=Action&year=2022', options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => err);
}

// const searchInput = document.querySelector('.search-input');

// searchInput.addEventListener('keydown', function(e){
//     if(e.keyCode === 13 && e.target.value !== ''){
//         const keyword = e.target.value;
//         console.log(keyword);
//     }
// })


function genre(){
    const mainMovie = document.querySelector('.main-movie');

    mainMovie.innerHTML = '<h2>Genre</h2>';
}

function comingSoon(){
    const mainMovie = document.querySelector('.main-movie');
    
    mainMovie.innerHTML = '<h2>Coming Soon</h2>';
}