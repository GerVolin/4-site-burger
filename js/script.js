"use strict";

/* Вариант, ПК или мобилка определяются от размера экрана. Но пропадает
стрелка на большом экране */
/*
const dlinaHeader = document.querySelector('.header__container').offsetWidth;
console.log(dlinaHeader);
if (dlinaHeader > 767) {
    document.body.classList.add('_pc');
} else {
    document.body.classList.add('_touch');

    let menuArrows = document.querySelectorAll('.menu__arrow'); //выбрать все .menu__arrow
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++){
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener('click', function(e) {
                menuArrow.parentElement.classList.toggle('_active'); //при клике на стрелу присваивается класс _active
            });
        }
    }
} 
*/



// ----- Определение устройства ------
const isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

if (!isMobile.any()) {
    document.body.classList.add('_pc');

    //костыль, чтобы стрелка отображалась и на маленьком экране, но ПК
    let menuArrows = document.querySelectorAll('.menu__arrow'); //выбрать все .menu__arrow
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++){
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener('click', function(e) {
                menuArrow.parentElement.classList.toggle('_active'); //при клике на стрелу присваивается класс _active
            });
        }
    }



} else {
    document.body.classList.add('_touch');

    //----стрелка нажата или нет
    let menuArrows = document.querySelectorAll('.menu__arrow'); //выбрать все .menu__arrow
    if (menuArrows.length > 0) {
        for (let index = 0; index < menuArrows.length; index++){
            const menuArrow = menuArrows[index];
            menuArrow.addEventListener('click', function(e) {
                menuArrow.parentElement.classList.toggle('_active'); //при клике на стрелу присваивается класс _active
            });
        }
    }
} //else {
  //  document.body.classList.add('_pc')
//};


    


//-------------------


//------меню бургер
const iconMenu = document.querySelector('.menu__icon');
const menuBody = document.querySelector('.menu__body');
if (iconMenu) {
    iconMenu.addEventListener('click', function(e) {
        document.body.classList.toggle('_look'); //при клике на бургер body присваивается класс _look
        iconMenu.classList.toggle('_active'); //при клике на бургер .menu__icon присваивается класс _active
        menuBody.classList.toggle('_active');
    });
}


//-----прокрутка до нужного места на странице
const menuLinks = document.querySelectorAll('.menu__link[data-goto]'); //пробегаюсь по всем data-goto
if (menuLinks.length > 0) {
    menuLinks.forEach(menuLink => {
        menuLink.addEventListener("click", onMenuLinkClick);
    });
    
    function onMenuLinkClick(e) {
        const menuLink = e.target;
        if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) { //проверка что page__section_1 2 3 существуют
            const gotoBlock = document.querySelector(menuLink.dataset.goto);
            const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight; //определение положения на странице в px + добавляю высоту прокрученных px - высота шапки
            
            if (iconMenu.classList.contains('_active')) {
                document.body.classList.remove('_look');
                iconMenu.classList.remove('_active'); //при клике на бургер присваивается класс _active
                menuBody.classList.remove('_active');
            } 

            window.scrollTo({ //обращаюсь к окну браузера, говорю что будем скролить, скрол будет от gotoBlockValue который выше, прокрутка плавная
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
    }
}

