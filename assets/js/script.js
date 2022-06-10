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
    content.innerHTML = '<h1>Home<h1>';
    
}


function genre(){
    content.innerHTML = '<h1>Genre</h1>';
}

function comingSoon(){
    content.innerHTML = '<h1>Coming Soon</h1>';
}

