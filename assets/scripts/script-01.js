const hamburger = document.querySelector('.hamburger-box');
const arrow = document.querySelector('.arrow-down a[href^="#" ]')
const target = document.querySelectorAll('[data-anime]')
const animation = 'animate'

const menu = document.querySelectorAll('.nav-bar a[href^="#" ]')
const menuBar = document.querySelector('.nav-bar')
       
const targetBar = document.querySelectorAll('[data-life]')
const containerBar = document.querySelectorAll('.container-bar')
const windowWidth = window.innerWidth;

const debounce = function(func, wait, immediate){
    let timeout;
    return function(...args){
        const context = this;
        const later = function(){
            timeout =null;
            if(!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
};

hamburger.addEventListener('click', () => {
     menuBar.classList.toggle('nav-bar-alternar')
})

arrow.addEventListener('click',() =>{
     scrollNoClick(event);
     toogleClassMenu(event);
     menu[1].classList.add('link-select')
});

menu.forEach(item => {
    item.addEventListener('click', scrollNoClick);
    item.addEventListener('click', toogleClassMenu)
})

function toogleClassMenu(e){
const href = e.target.getAttribute('href')
menu.forEach(element =>{
    if(href === element.getAttribute('href')){
        element.classList.add('link-select')
    }
    else{
        element.classList.remove('link-select')
    }
        })
}

function scrollNoClick(e){
    menuBar.classList.remove('nav-bar-alternar')
    e.preventDefault();
    getScroll(getId(e.target))
}
        
function getId(elemento){
    const id = elemento.getAttribute('href')
    return document.querySelector(id).offsetTop 
}

function mimWidth(){
    if(windowWidth <= 1024){
        return 0;
    }
    else{
        return -80;
    }
}

const width = mimWidth();
initialPositionMenu();

function getScroll(elemento){
    window.scroll({
        top: elemento + width,
        behavior:'smooth'
    });   
}

window.addEventListener('scroll', debounce(function(){
    fixedMenuScroll();
    animaScroll();
    animaBar([containerBar]);
}, 50))

function initialPositionMenu(){
    if(windowWidth < 1024){
        menuBar.classList.add('nav-bar-top')
    }
    else{
        menuBar.classList.remove('nav-bar-top')
    }
}

function fixedMenuScroll(){
    const windowTop = window.pageYOffset;
    if((windowTop) > 640){
        menuBar.classList.add('nav-bar-fixed')
    }
    else {
        menuBar.classList.remove('nav-bar-fixed')
    }
}

function animaScroll(){
    target.forEach(element =>{
        const windowTop = window.pageYOffset + ((window.innerHeight * 3)/4);
        if((windowTop) > element.offsetTop){
            return element.classList.add(animation)
        }
        else{
            return element.classList.remove(animation)
        }
    })
}

function animaBar([element]){
    for(let i = 0;i < element.length;i++){
        const windowTop = window.pageYOffset + 550;
        if((windowTop) > element[i].offsetTop){
            const valor = targetBar[i].offsetWidth;
            document.querySelectorAll('.color-bar')[i].style.width=valor+"px";
            document.querySelectorAll('.box')[i].style.transform = "translateX("+valor+"px)"
            document.querySelectorAll('.box')[i].style.opacity = "1"
        }
        else{
            document.querySelectorAll('.color-bar')[i].style.width="0";
            document.querySelectorAll('.box')[i].style.transform = "translateX(0)"
            document.querySelectorAll('.box')[i].style.opacity = "0"
        }
    } 
}