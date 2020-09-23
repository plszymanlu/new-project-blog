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
    console.log(event, 'Link was clicked!');

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

    const articleSelector = clickedElement.getAttribute('href');

  /* find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);

  /* add class 'active' to the correct article */

  targetArticle.classList.add('active');

/* remove class 'active' from all articles */

const activeArticles = document.querySelectorAll('.post');

for (let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
}
}

/* Generating title links! */

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles';

function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */

  const titleList = document.querySelector(optTitleListSelector)
        titleList.innerHTML = '';

  /* for each article */

  const articles = document.querySelectorAll(optTitleSelector + customSelector);
    let html = '';
    for(let article of articles){

    /* get the article id */

    const articleId = article.getAttribute('id');

    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
        console.log(articleTitle);

    /* get the title from the title element */

    /* create HTML of the link */
        /* const linkHTML = '<li><a href="#"><span></span></a></li>'; */
        /* const linkHTML = '<li><a href="#' + '"><span>' + '</span></a></li>'; */
        /* const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>'; */

    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);
        console.log(html);

    /* insert link into titleList */

    titleList.insertAdjacentHTML('beforeend', linkHTML);

    html = html + linkHTML;
}
    titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}