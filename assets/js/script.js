const mainMenu = document.querySelectorAll('a');
const mainMovie = document.querySelector('.main-movie');

window.addEventListener('load', () => {
    const homeMenu = document.getElementsByClassName('home')[0];

    homeMenu.classList.add('active-menu');

    home();
  });

mainMenu.forEach(menu => {
    menu.addEventListener('click', function(){
        mainMenu.forEach(a => a.classList.remove('active-menu'));

        menu.classList.add('active-menu');

        if(menu.classList.contains('home')){
            home();

        }else if(menu.classList.contains('genre')){
            genre();

        }else {
            comingSoon();
        }
    })
})


function home(){
    mainMovie.innerHTML = '<span>Loading...<span>';
    setTimeout(() => {
        movieList();
    }, 0);
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
    
    updateAllMovies(result);
}

function updateAllMovies(cards){
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

    return (
        `<div class="card">
            <img src="${img.url}" alt=${m.titleText.text}>
            <div class="info">
                <h3 class="title">${m.titleText.text}</h3>
                <p class="year">(${m.releaseYear.year})</p>
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
    mainMovie.innerHTML = '<span>Loading...<span>';

    setTimeout(() => {
        mainMovie.innerHTML = '<h2>Genre</h2>';
    }, 800);
}

function comingSoon(){
    mainMovie.innerHTML = '<span>Loading...</span>';

    setTimeout(() => {
        movieComingSoon();
    }, 0);
}


async function movieComingSoon(){
    const response = await getComingSoon();
    const movies = response.results;

    updateComingSoon(movies);
}

function updateComingSoon(movies){
    let result = '';

    movies.forEach(m => result += card(m));
    
    const upComing = (
        `<div class="coming-soon">
            <h3>Coming Soon</h3>
            <div class="cards">
                ${result}
            </div>
        </div>`
    )

    mainMovie.innerHTML = upComing;
}


function getComingSoon(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b347bc0983mshe9d646e8a29ed83p1b05b4jsn708feff2a216',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    return fetch('https://moviesdatabase.p.rapidapi.com/titles/x/upcoming?info=base_info&limit=20&page=1&titleType=movie&genre=Action', options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => err);
}
