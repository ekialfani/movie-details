const menu = document.querySelectorAll('a');
const content = document.getElementsByTagName('content')[0];

window.addEventListener('load', () => {
    const homeMenu = document.getElementsByClassName('home')[0];
    setTimeout(() => {
        home();
        homeMenu.classList.add('active-menu');
    }, 100)
    
  });

menu.forEach(anchor => {
    anchor.addEventListener('click', function(){

        menu.forEach(a => a.classList.remove('active-menu'));
        anchor.classList.add('active-menu');

        if(anchor.classList.contains('home')){
            home();

        }else if(this.classList.contains('genre')){
            genre();
            
        }else {
            comingSoon();
        }
    })
})


function home(){
    content.innerHTML = (
        `<div>
        ${searchBar()}
        ${jumbotron()}
        ${Recomended()}
        ${newRelase()}
        <div>`
    );
}


function searchBar(){
    let searchInput = (
        `<div class="search-bar">
            <input type="text" placeholder="search movies...">
        </div>`
    );

    return searchInput;
}


function jumbotron(){
    return (
        `<div class="jumbotron">
            <img class="hero" src="https://www.nextbestpicture.com/uploads/7/1/0/2/71028997/doctor-strange-in-the-multiverse-of-madness-review_orig.jpg" alt="doctor strange">
            <h3 class="title">Doctor Strange In The Multiverse of Madness</h3>
            <p class="description">Dr Stephen Strange casts a forbidden spell that opens a portal to the multiverse. However, a threat emerges that may be too big for his team to handle.</p>
            <button>Show Detail</button>
        </div>`
    )
}

function Recomended(){
    return (
        `<div class="recomended">
            <div class="heading">
                <h3>Recently Played</h3>
                <p>See All</p>
            </div>
            ${cards()}
        </div>`
    )
}


function newRelase(){
    return (
        `<div class="new-relase">
            <div class="heading">
                <h3>New Relase</h3>
                <p>See All</p>
            </div>
            ${cards()}
        </div>`
    )
}

const items = [
    {   
        poster: 'https://upload.wikimedia.org/wikipedia/id/f/f9/TheAvengers2012Poster.jpg',
        title: 'avengers end the game',
        relase: '2011',
    },

    {   
        poster: 'https://upload.wikimedia.org/wikipedia/id/f/f9/TheAvengers2012Poster.jpg',
        title: 'avengers infinity war',
        relase: '2011',
    },

    {   
        poster: 'https://upload.wikimedia.org/wikipedia/id/f/f9/TheAvengers2012Poster.jpg',
        title: 'avengers infinity war',
        relase: '2011',
    },

    {   
        poster: 'https://upload.wikimedia.org/wikipedia/id/f/f9/TheAvengers2012Poster.jpg',
        title: 'avengers infinity war',
        relase: '2011',
    },

    {   
        poster: 'https://upload.wikimedia.org/wikipedia/id/f/f9/TheAvengers2012Poster.jpg',
        title: 'avengers infinity war',
        relase: '2011',
    },

]

function cards(){
    let cardList = '';

    items.forEach(item => {
        cardList += card(item);
    })

    return (
        `<div class="cards">
            ${cardList}
        </div>`
    );
}

function card(item){
    return (
        `<div class="card">
            <img src=${item.poster}>
            <div class="info">
                <h3 class="title">${item.title}</h3>
                <p class="year">${item.relase}</p>
            </div>
        </div>`
    )
}





function genre(){
    content.innerHTML = '<h2>Genre</h2>';
}

function comingSoon(){
    content.innerHTML = '<h2>Coming Soon</h2>';
}

