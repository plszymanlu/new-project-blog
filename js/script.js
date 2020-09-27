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
  optArticleTagsSelector = '.post-tags .list';
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optAuthorsListSelector = '.authors.list',

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

function generateTags(){

 /* [NEW] create a new variable allTags with an empty array */
 let allTags = [];

    /* find all articles */
const articles = document.querySelectorAll(optArticleSelector);
console.log(article);
    /* START LOOP: for every article: */
for(let article of articles);
      /* find tags wrapper */

const tagsWrapper = article.querySelector(optArticleTagsSelector);
      /* make html variable with empty string */
let html = '';
      /* get tags from data-tags attribute */
const articleTags = article.getAttributes('data-tags');
      /* split tags into array */
const articleTagsArray = articleTags.split(' ');
console.log(articleTagsArray);
      /* START LOOP: for each tag */
for(let tag of articleTagsArray){
        /* generate HTML of the link */
const linkHTMLData = { id: tag, title: tag };
const linkHTML = templates.tagLink(linkHTMLData);
console.log(linkHTML);
    }
    /* add generated code to html variable */
html = html + linkHTML;
console.lof(html);

    /* [NEW] check if this link is NOT already in allTags */
if(allTags.indexOf(linkHTML) == -1){
    /* [NEW] add generated code to allTags array */
allTags.push(linkHTML);
}

      /* END LOOP: for each tag */
}
      /* insert HTML of all the links into the tags wrapper */
tagsWrapper.tagsWrapper.insertAdjacentHTML('beforeend', html);
    /* END LOOP: for every article: */

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
}
  generateTags();

  function tagClickHandler(event){
    /* prevent default action for this event */
event.preventDefault();
      /* make new constant named "clickedElement" and give it the value of "this" */
const clickedElement = this;
console.log('ClickedElement:', clickedElement);
    /* make a new constant "href" and read the attribute "href" of the clicked element */
const href = clickedElement.getAttribute('href');
    /* make a new constant "tag" and extract tag from the "href" constant */
const tag = href.replace('#tag-','');
    /* find all tag links with class active */
const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
for(let tagLink of tagLinks) {
      /* remove class active */
tagLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
    /* find all tag links with "href" attribute equal to the "href" constant */
const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"}');
    /* START LOOP: for each found tag link */
for(let hrefTagLink of hrefTagLinks) {
      /* add class active */
hrefTagLink.classList.add("active");
    /* END LOOP: for each found tag link */
}
    /* execute function "generateTitleLinks" with article selector as argument */
generateTitleLinks('[data-tags~="' + tag + '"]');
}
  
  function addClickListenersToTags(){

    /* find all links to tags */
const links = document.querySelectorAll('.post-tags .list a, .list.tags a');
    /* START LOOP: for each link */
for(let link of links) {
      /* add tagClickHandler as event listener for that link */
link.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}

Function generateAuthors() {

    let AllAuthors = {};
    const authors = document.querySelectorAll(optArticleSelector);
    for(let author of authors){
    const authorsWrapper = author.querySelector(optArticleAuthorSelector);
    let html = '';
    const articleAuthor = author.getAttribute('data-author');
    }

    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log(linkHTML);

    html = html + linkHTML;

    if (!allAuthors.hasOwnProperty(articleAuthor)) {
        allAuthors[articleAuthor] = 1;
    }else{
      allAuthors[articleAuthor]++;
    }
    authorsWrapper.insertAdjacentHTML('beforeend', html);
}

const authorList = document.querySelector('.authors');

  const authorParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams', authorParams);

  const allAuthorsData = { authors: [] };

  for (let articleAuthor in allAuthors) {

    allAuthorsData.authors.push({
        articleAuthor: articleAuthor,
        count: allAuthors[articleAuthor],
        className: calculateAuthorClass(allAuthors[articleAuthor], authorParams)
      });
    }

    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

  addClickListenersToTags();
