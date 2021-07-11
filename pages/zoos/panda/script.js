'use strict';

// Показать описание

const sidePanel = document.querySelector('.side-panel'),
      moreArrowBtn = document.querySelector('.more-arrow');


moreArrowBtn.addEventListener('click', () => {
    if (moreArrowBtn.classList.contains('opened')) {
        sidePanel.style.width = '220px';
        moreArrowBtn.classList.remove('opened');
        showItemDescriptio();
    } else {
        sidePanel.style.width = '300px'; 
        moreArrowBtn.classList.add('opened');
        showItemDescriptio();
    }
});

function showItemDescriptio() {
    document.querySelectorAll('.item__description').forEach(item => {
        item.classList.toggle('show');
    });
}

// Создание итемов для боковой панели

class SideBarItem {
    constructor(parentSelector, linkHref, linkTitle, imgSrc, imgAlt, descr, ...classes) {
        this.linkHref = linkHref;
        this.linkTitle = linkTitle;
        this.imgSrc = imgSrc;
        this.imgAlt = imgAlt;
        this.descr = descr;
        this.classes = classes;
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        const element = document.createElement('li');
        if (this.classes.length === 0) {
            this.element = 'item';
            element.classList.add(this.element);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }
        
        element.innerHTML = `
            <a class="link" href="${this.linkHref}" title="${this.linkTitle}">
                <img src="${this.imgSrc}" alt="${this.imgAlt}">
            </a>
            <div class="item__description">${this.descr}</div>
        `;
        this.parent.append(element);
    }
}

const panda = new SideBarItem(
    '.side-panel__list',
    '#',
    'Panda, China',
    '../../../assets/zoos/icons/Panda.png',
    'panda',
    "Watch live from China's Panda Center",
    'item', 'active'
);

const eagle = new SideBarItem(
    '.side-panel__list',
    '../eagles/index.html',
    'Eagle, West',
    '../../../assets/zoos/icons/Eagle.png',
    'Eagle',
    "Watch The Bald Eagles Nest from West End cam",
    'item'
);

const gorilla = new SideBarItem(
    '.side-panel__list',
    '../gorillas/index.html',
    'Gorilla, Congo',
    '../../../assets/zoos/icons/Gorilla.png',
    'Gorilla',
    "Livestream from Gorilla Forest Corridor habitat cam",
    'item'
);

const lemurs = new SideBarItem(
    '.side-panel__list',
    '../lemurs/index.html',
    'Lemur, Madagascar',
    '../../../assets/zoos/icons/Lemur.png',
    'Lemur',
    "The ring-tailed lemurs play in Madagascar, Lemuria Land",
    'item'
);

const crocodile = new SideBarItem(
    '.side-panel__list',
    '#',
    'Crocodile, West',
    '../../../assets/zoos/icons/Crocodile.png',
    'Crocodile',
    "Crocodiles are big wild animals. They live in rivers and lakes of warm countries.",
    'item'
);

const koala = new SideBarItem(
    '.side-panel__list',
    '#',
    'Koala, Australia',
    '../../../assets/zoos/icons/Koala.png',
    'Koala',
    "The koala lives in Australia and it is one of the symbols of Australia.",
    'item'
);

const lion = new SideBarItem(
    '.side-panel__list',
    '#',
    'Lion, Africa',
    '../../../assets/zoos/icons/Lion.png',
    'Lion',
    "The lion is a wild animal. It is one of the strongest animals.",
    'item'
);

const tiger = new SideBarItem(
    '.side-panel__list',
    '#',
    'Tiger, India',
    '../../../assets/zoos/icons/Tiger.png',
    'Tiger',
    "Tigers are the largest wild cats in the world.",
    'item'
);

const sideBarItemsOne = [panda, eagle, gorilla, lemurs];
const sideBarItemsTwo = [crocodile, koala, lion, tiger];

function renderSideBar(sideBarItems) {
    sideBarItems.forEach(item => {
        item.render();
    });
}

renderSideBar(sideBarItemsOne);

// Перелистывание итемов

const downBtn = document.querySelector('.btn-down');
let counter = 0;
downBtn.addEventListener('click', () => {
    document.querySelector('.side-panel__list').innerHTML = '';
    if (counter % 2 == 0) {
        renderSideBar(sideBarItemsTwo);
    } else {
        renderSideBar(sideBarItemsOne);
    }
    if (moreArrowBtn.classList.contains('opened')) {
        showItemDescriptio();
    }
    counter++;
});

//  Переключение камер

const camsList = document.querySelector('.live_cams__list');

camsList.addEventListener('click', e => {
    if (e.target.parentElement.classList.contains('cam')) {
        const newVideo = e.target.parentElement.querySelector('iframe');
        const oldVideo = document.querySelector('.live_cams__video');
        [newVideo.src, oldVideo.src] = [oldVideo.src, newVideo.src];
    }
});