const menu = document.querySelectorAll('a');
const main = document.getElementsByTagName('main')[0];

window.addEventListener('load', () => {
    const homeMenu = document.getElementsByClassName('home')[0];
    setTimeout(() => {
        home();
        homeMenu.classList.add('menu-active');
    }, 100)
    
  });

menu.forEach(anchor => {
    anchor.addEventListener('click', function(){

        menu.forEach(a => a.classList.remove('menu-active'));
        anchor.classList.add('menu-active');

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
    main.innerHTML = '<h1>Home<h1>';
    
}


function genre(){
    main.innerHTML = '<h1>Genre</h1>';
}

function comingSoon(){
    main.innerHTML = '<h1>Coming Soon</h1>';
}

