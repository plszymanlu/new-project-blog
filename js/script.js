'use strict';
function buttonClicked(buttonName){
    console.log(buttonName + ' został kliknięty');
}
function titleClickHandler(){
    buttonClicked('Test button');
}
const buttonTest = document.getElementById('button-test');
buttonTest.addEventListener('click', titleClickHandler);

'use strict';
function titleClickHandler(){
    const links = document.querySelectorAll('.titles a');
    console.log(links);
}
const buttonTest = document.getElementById('button-test');
buttonTest.addEventListener('click', titleClickHandler);

const links = document.querySelectorAll('.titles a');

for(let link of links){
  console.log(link);
}

'use strict';
function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');

/* [DONE] remove class 'active' from all article links  */

const links = document.querySelectorAll('.titles a');

for(let link of links){
    link.addEventListener('click', titleClicHandler);
}

/* remove class 'active' from all article links  */

const activeLinks = document.querySelectorAll('.titles a.active');

for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
}

/* [IN PROGRESS] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
activeLink.classList.add('active');

/* [DONE] remove class 'active' from all articles */

  /* get 'href' attribute from the clicked link */

  /* find the correct article using the selector (value of 'href' attribute) */

  /* add class 'active' to the correct article */

/* remove class 'active' from all articles */

const activeArticles = document.querySelectorAll('.titles a.active');

for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
}

}