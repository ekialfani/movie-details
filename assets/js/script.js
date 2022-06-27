const mainMenu = document.querySelectorAll('a');
const mainMovie = document.querySelector('.main-movie');

window.addEventListener('load', () => {
    const homeMenu = document.getElementsByClassName('home')[0];

    homeMenu.classList.add('active-menu');

    home();
    sidebar();
  });


mainMenu.forEach(menu => {
    menu.addEventListener('click', function(e){
        e.preventDefault();
        mainMenu.forEach(a => a.classList.remove('active-menu'));

        e.target.parentElement.classList.add('active-menu');
        

        if(e.target.textContent === 'Home'){
            home();

        }else if(e.target.textContent === 'Genre'){
            genre();

        }else {
            comingSoon();
        }
    })
})


const home = () => movieList();


async function movieList(){
    mainMovie.innerText = 'Loading...';

    const response = await getAllMovies();

    setTimeout(() => {
        const recomendation = [];
        const release = [];
        response.results.forEach((movies, index) => {
            (index <= 9) ? recomendation.push(movies) : release.push(movies); 
        })
        
        updateAllMovies(recomendation, release);    
    }, 0);
}


function updateAllMovies(recomendation, release){

    const result = (
        `<div>
            <div class="recently-played">
                <div class="heading">
                    <h3>Recently Played</h3>
                    <span class="see-all">See All</span>
                </div>

                <ul class="cards">
                    ${recentlyPlayed(recomendation)}
                </ul>
            </div>

            <div class="new-release">
                <div class="heading">
                    <h3>New Release</h3>
                    <span class="see-all">See All</span>
                </div>

                <ul class="cards">
                    ${newRelease(release)}
                </ul>
            </div>
        </div>`
    )

    mainMovie.innerHTML = result;
}

function recentlyPlayed(movies){
    let recomendation = '';
    movies.forEach(m => recomendation += mainCard(m));
    
    return recomendation;
}

function newRelease(movies){
    let release = '';
    movies.forEach(m => release += mainCard(m));

    return release;
}


function activeCard(){
    const span = document.createElement('span');

    return span;
}


document.body.addEventListener('click', function(e){
    if(e.target.parentElement.classList.contains('card')){
        const cards = document.querySelectorAll('.card');
        cards.forEach(card => card.classList.remove('active-card'));
        e.target.parentElement.classList.add('active-card');
        console.log(e.target.parentElement);

        const idMovie = e.target.parentElement.dataset.id;
        movieDetails(idMovie);
    }
    
    if(e.target.classList.contains('close') || e.target.classList.contains('container-fluid')){
        const fluid = document.querySelector('.container-fluid');
        const cardDetail = document.querySelector('.detail-card');

        cardDetail.classList.add('animation-hide');

        setTimeout(() => {
            cardDetail.classList.remove('animation-hide');
            fluid.style.display = 'none';
        }, 150);
    }

    if(e.target.classList.contains('search-input')){
        e.target.addEventListener('keydown', async function(e){
            if(e.keyCode == 13 && e.target.value !== ''){
                const value = e.target.value;

                let keyword = '';
                [...value].map(v => {
                    if(v === ' '){
                        keyword += '%20'
                    }else {
                        keyword += v;
                    }
                });

                mainMovie.innerText = 'Loading...';

                const response = await getMovieByKeyword(keyword);

                setTimeout(() => {
                    if(response.entries === 0){
                        mainMovie.innerText = 'Error: movie not found';
                    }else {
                        const movies = response.results;

                        movieSearch(movies);
                    }
                }, 0);
            }
        })
    }
})



function movieSearch(movies){
    let resultSearch = '';
    movies.forEach(m => resultSearch += mainCard(m));

    updateMovieSearch(resultSearch);
}


function updateMovieSearch(resultSearch){
    const cards = (
        `<div>
            <div class="heading">
                <h3>Search Result</h3>
            </div>
            <div class="cards">
                ${resultSearch}
            </div>
        </div>`
    );

    mainMovie.innerHTML = cards;
}


async function movieDetails(idMovie){
    const response = await getMovieById(idMovie);
    const movie = response.results;

    updateMovieDetails(movie);
}


function updateMovieDetails(movie){
    const details = document.querySelector('.movie-details');
    const card = detailCard(movie);
    
    details.innerHTML = card;
}


function genre(){
    genreList();
}

async function genreList(){
    const response = await getGenreList();
    const genres = response.results;

    updateGenreList(genres);
}


function updateGenreList(genres){
    const genre = (
        `<div>
            <ol class="genre-list">
                ${genres.map(g => (g !== null) ? `<li>${g}</li>` : '').join('')}
            </ol>
            <div class="movie-genres">
                
            </div>
        </div>`
    )
    
    mainMovie.innerHTML = genre;
}


document.body.addEventListener('click', async function(e){
    if(e.target.parentElement.classList.contains('genre-list')){
        const genres = document.querySelectorAll('.genre-list li');

        genres.forEach(g => g.classList.remove('active-genre'));

        e.target.classList.add('active-genre');
        
        const genre = e.target.textContent;
        
        const response = await getMovieByGenre(genre);
        const movies = response.results;
        
        movieGenres(movies, genre);
    }
})


function movieGenres(movies, genre){
    const genres = document.querySelector('.movie-genres');

    let card = '';
    movies.forEach(m => card += mainCard(m));

    const result = (
        `<div>
            <div class="heading">
                <h3>${genre}</h3>
            </div>
            <ul class="cards">
                ${card}
            </ul>
        </div>`
    )

    genres.innerHTML = result;
}


function getGenreList(){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b347bc0983mshe9d646e8a29ed83p1b05b4jsn708feff2a216',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    return fetch('https://moviesdatabase.p.rapidapi.com/titles/utils/genres', options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => err);
}


function getMovieByGenre(genre){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b347bc0983mshe9d646e8a29ed83p1b05b4jsn708feff2a216',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    return fetch(`https://moviesdatabase.p.rapidapi.com/titles?info=base_info&limit=20&page=1&titleType=movie&genre=${genre}&endYear=2022`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => err);
}


const comingSoon = () => movieComingSoon();


async function movieComingSoon(){
    mainMovie.innerText = 'Loading...';

    const response = await getComingSoon();

    setTimeout(() => {
        const movies = response.results;

        updateComingSoon(movies);
    }, 0);
}


function updateComingSoon(movies){
    let result = '';

    movies.forEach(m => result += mainCard(m));
    
    const comingsoon = (
        `<div class="coming-soon">
            <h3>Coming Soon</h3>
            <div class="cards">
                ${result}
            </div>
        </div>`
    )

    mainMovie.innerHTML = comingsoon;
}


const sidebar = () => movieCategory();

async function movieCategory(){
    const category = document.querySelector('.movie-category');

    const movieIdList = {
        popular: [
            "tt14174940",
            "tt13223398",
            "tt13235822",
            "tt1464335",
            "rm4109048065",
            "tt19409164",
            "tt20916492",
            "tt16225732",
            "tt10518732",
            "tt20913054"
        ],

        topRate: [
            "tt10298810",
            "tt11703710",
            "tt1745960",
            "tt9419884",
            "tt19880966",
            "tt1877830",
            "tt11291274",
            "tt11827628",
            "tt4123432",
            "tt4998632",
        ]
    };

    category.innerText = 'Loading...';

    const popularMovies = await getMovieByCategory(movieIdList.popular);
    const topRateMovies = await getMovieByCategory(movieIdList.topRate);

    setTimeout(() => {
        updateCategory(popularMovies, topRateMovies);
    }, 0);
}


function updateCategory(popularMovies, topRateMovies){
    const movieCategory = document.querySelector('.movie-category');

    const category = (
        `<div>
            <section class="most-popular">
                <h3>Most Popular</h3>
                <ul class="cards-popular">
                    ${mostPopular(popularMovies)}
                </ul>	

                <button>see all</button>
            </section>

            <section class="top-rate">
                <h3>Top Rates</h3>
                <ul class="cards-top-rate">
                    ${topRates(topRateMovies)} 
                </ul>

                <button>see all</button>
            </section>
        </div>`
    );

    movieCategory.innerHTML = category;
}


function mostPopular(popularMovies){
    const movies = popularMovies.results;

    let popular = '';
    movies.forEach(m => popular += sidebarCard(m));
    
    return popular;
}


function topRates(topRateMovies){
    const movies = topRateMovies.results;

    let topRate = '';
    movies.forEach(m => topRate += sidebarCard(m));

    return topRate;
}


function mainCard(m){
    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJOkLYvG0gHAJPTKSN7dXJ2TriBPCn5TRQ_yYu8_9vE-qZlLu-wTh5xeS56JfW2mskRg&usqp=CAU';
    const imgUrl = (m.primaryImage !== null) ? m.primaryImage.url : defaultImage;
    const title = m.titleText.text;
    const idMovie = m.id;
    const release = (m.releaseYear !== null) ? `(${m.releaseYear.year})` : '';

    return (
        `<li class="card main-card" data-id=${idMovie}>
            <img src="${imgUrl}" alt=${title}>
            <div class="info main-card-info">
                <h3 class="title">${title}</h3>
                <p class="year">${release}</p>
            </div>
        </li>`
    )
}


function detailCard(m){
    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJOkLYvG0gHAJPTKSN7dXJ2TriBPCn5TRQ_yYu8_9vE-qZlLu-wTh5xeS56JfW2mskRg&usqp=CAU';
    const imgUrl = (m.primaryImage !== null) ? m.primaryImage.url : defaultImage;
    const title = m.titleText.text;
    const genres = m.genres.genres;
    const voteCount = m.ratingsSummary.voteCount;
    const ratings = (voteCount !== 0) ?  m.ratingsSummary.aggregateRating : '-';
    const release = (m.releaseYear !== null) ? `(${m.releaseYear.year})` : '-';
    const plot = m.plot.plotText.plainText;

    return (
        `<div class="container-fluid">
            <div class="detail-card">
                <h3>Movie Details</h3>
                <div class="detail-card-body">
                    <div class="detail-card-image">
                        <img src="${imgUrl}" alt=${title}>
                    </div>

                    <ul class="detail-card-info">
                        <li>
                            <strong>Title: </strong>${title}
                        </li>

                        <li>
                            <strong>Genre: </strong>
                            ${genres.map(genre => genre.text).join(', ')}
                        </li>

                        <li>
                            <strong>Ratings: </strong>${ratings}
                        </li>

                        <li>
                            <strong>Release: </strong>${release}
                        </li>

                        <li>
                            <strong>Plot: </strong>
                            <br>
                            ${plot}
                        </li>
                    </ul>
                </div>
                <button class="close close-button">close</button>
                <button class="close close-x">×</button>
            </div>
        </div>`
    )
}


function sidebarCard(m){
    const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOJOkLYvG0gHAJPTKSN7dXJ2TriBPCn5TRQ_yYu8_9vE-qZlLu-wTh5xeS56JfW2mskRg&usqp=CAU';
    const imgUrl = (m.primaryImage !== null) ? m.primaryImage.url : defaultImage;
    const title = m.titleText.text;
    const genres = m.genres.genres;
    const voteCount = m.ratingsSummary.voteCount;
    const ratings = (voteCount !== 0) ?  m.ratingsSummary.aggregateRating : '5.0';
    const idMovie = m.id;

    return (
        `<li class="card sidebar-card" data-id=${idMovie}>
            <img src="${imgUrl}" alt=${title}>
            <div class="info sidebar-card-info">
                <h4 class="title">${title}</h4>
                <p class="genre">${genres.map(genre => genre.text).join(', ')}</p>
                <div class="rating">
                    <span>Ratings:</span> 
                    <div class="rating-value">
                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                        <span>${ratings}</span>
                    </div>
                </div>
            </div>
        </li>`
    )
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


function getMovieByKeyword(keyword){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b347bc0983mshe9d646e8a29ed83p1b05b4jsn708feff2a216',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    return fetch(`https://moviesdatabase.p.rapidapi.com/titles/search/title/${keyword}?info=base_info&limit=50&page=1&titleType=movie`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => err);
}


function getMovieByCategory(idMovie){
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'b347bc0983mshe9d646e8a29ed83p1b05b4jsn708feff2a216',
            'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
        }
    };
    
    return fetch(`https://moviesdatabase.p.rapidapi.com/titles/x/titles-by-ids?info=base_info&idsList%5B0%5D=${idMovie[0]}&idsList%5B1%5D=${idMovie[1]}&idsList%5B2%5D=${idMovie[2]}&idsList%5B3%5D=${idMovie[3]}&idsList%5B4%5D=${idMovie[4]}&idsList%5B5%5D=${idMovie[5]}&idsList%5B6%5D=${idMovie[6]}&idsList%5B7%5D=${idMovie[7]}&idsList%5B8%5D=${idMovie[8]}&idsList%5B9%5D=${idMovie[9]}`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => err);
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