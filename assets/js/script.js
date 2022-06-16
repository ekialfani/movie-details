const mainMenu = document.querySelectorAll('a');
const mainMovie = document.querySelector('.main-movie');
const loading = '<span>Loading...</span>';

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
    mainMovie.innerHTML = loading;

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

            <ul class="cards">
                ${recomendation}
            </ul>
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

            <ul class="cards">
                ${release}
            </ul>
        </div>`
    );
}


function card(m){
    const img = {...m.primaryImage};

    return (
        `<li class="card" data-id=${m.id}>
            <img src="${img.url}" alt=${m.titleText.text}>
            <div class="info">
                <h3 class="title">${m.titleText.text}</h3>
                <p class="year">(${m.releaseYear.year})</p>
            </div>
        </li>`
    )
}


document.body.addEventListener('click', function(e){
    if(e.target.className === 'info'){
        const cards = document.querySelectorAll('.card');
        const id = e.target.parentElement.dataset.id;

        cards.forEach(card => card.classList.remove('active-card'));
        e.target.parentElement.classList.add('active-card');

        movieDetails(id);
        
    }else if(e.target.classList.contains('close') || e.target.classList.contains('container-fluid')){
        const fluid = document.querySelector('.container-fluid');
        const cardDetail = document.querySelector('.card-detail');

        cardDetail.classList.add('animation-hide');

        setTimeout(() => {
            cardDetail.classList.remove('animation-hide');
            fluid.style.display = 'none';
        }, 150);
    }
})

async function movieDetails(id){
    const response = await getMovieById(id);
    const movie = response.results;

    updateMovieDetails(movie);
}

function updateMovieDetails(movie){
    const details = document.querySelector('.movie-details');
    const card = cardDetails(movie);
    
    details.innerHTML = card;
}

function cardDetails(m){
    const genres = m.genres.genres;

    return (
        `<div class="container-fluid">
            <div class="card-detail">
                <h3>Movie Details</h3>
                <div class="card-detail-body">
                    <div class="detail-image">
                        <img src="${m.primaryImage.url}" alt=${m.titleText.text}>
                    </div>

                    <ul class="detail-info">
                        <li>
                            <strong>Title: </strong>${m.titleText.text}
                        </li>

                        <li>
                            <strong>Genre: </strong>
                            ${genres.map(genre => genre.text).join(', ')}
                        </li>

                        <li>
                            <strong>Ratings: </strong> 7/10
                        </li>

                        <li>
                            <strong>Release: </strong>${m.releaseYear.year}
                        </li>

                        <li>
                            <strong>Plot: </strong>
                            <br>
                            ${m.plot.plotText.plainText}
                        </li>
                    </ul>
                </div>
                <button class="close close-button">close</button>
                <button class="close close-x">×</button>
            </div>
        </div>`
    )
}


function genre(){
    mainMovie.innerHTML = loading;

    setTimeout(() => {
        mainMovie.innerHTML = '<h2>Genre</h2>';
    }, 800);
}

function comingSoon(){
    mainMovie.innerHTML = loading;

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


// fetching data from "movies database" api
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


function mostPopular(){
    const popular = document.querySelector('.most-popular');
    
    // popular.innerHTML = '<h3>Most Popular</h3>';
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

function getMovieById(id){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b347bc0983mshe9d646e8a29ed83p1b05b4jsn708feff2a216',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    return fetch(`https://moviesdatabase.p.rapidapi.com/titles/${id}?info=base_info`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => err);
}
