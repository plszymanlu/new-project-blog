'use strict';

const templates = {
  articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
  tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
  authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
  tagCloudLink : Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  authorCloudLink : Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
};

const optArticleSelector = '.post',
  optTitleSelector = '.post-title',
  optTitleListSelector = '.titles',
  optArticleTagsSelector = '.post-tags .list',
  optArticleAuthorSelector = '.post .post-author',
  optTagsListSelector = '.tags.list',
  optCloudClassCount = '5',
  optCloudClassPrefix = 'tag-size-',
  optAuthorsListSelector = '.authors.list';

// articleSelector: '.post',
//titleSelector: '.post-title',
//titleListSelector: '.titles'
//};
//document.getElementById('#showAllLinksBtn').addEventListener('click', function() {generateTitleLinks});
document.querySelector('#showAllLinksBtn').addEventListener('click', function() { generateTitleLinks()});

/* Generating article after click!  */

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log(event,'Link was clicked!');
  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');
  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  /* add class 'active' to the clicked link */
  clickedElement.classList.add('active');
  //console.log('clickedElement', clickedElement);
  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll('.post');
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }
  /* get 'href' attribute from the clicked link */
  const articleSelector = clickedElement.getAttribute('href');
  /* find the correct article using the selector (value of 'href' attribute) */
  const targetArticle = document.querySelector(articleSelector);
  /* add class 'active' to the correct article */
  targetArticle.classList.add('active');
  /* brakuje console log? */
}

/* Generating title links! */

function generateTitleLinks(customSelector = ''){
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';
  //console.log(titleList);
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  //console.log(articles);
  //console.log(customSelector);
  let html = '';   // dlaczego ?
  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    //console.log(articleId);
    /* find the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log (articleTitle);
    /* get the title from the title element */
    /* create HTML of the link */
    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
    //console.log(linkHTML);
    const linkHTMLData = {id: articleId, title: articleTitle};
    //console.log(linkHTMLData);
    const linkHTML = templates.articleLink(linkHTMLData);
    // console.log(linkHTML); // <li><a href="#article-1"><span>Article 1</span></a></li>
    /* insert link into titleList */
    titleList.insertAdjacentHTML('beforeend', linkHTML);
    html = html + linkHTML;
    //console.log(html);
    // titleList.innerHTML = html;
    // html = html + linkHTML;
    //titleList.innerHTML = titleList.innerHTML + linkHTML;
    //console.log(html);
  }

  const links = document.querySelectorAll('.titles a');
  //console.log(links);
  for (let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}

generateTitleLinks();

function calculateTagsParams(tags){
  const params = {max: '0', min: '99999'};
  for(let tag in tags){
    //console.log(tag + ' is used ' + tags[tag] + ' times');
    if(tags[tag] > params.max){
      params.max = tags[tag];
    }
    if(tags[tag] < params.min){
      params.min = tags[tag];
    }
  }
  /* console.log(params); */
  return params
}
function calculateTagClass(count, params){
  const normalizedCount = count - params.min;
  //console.log(params.min);
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  //console.log (classNumber);
  return optCloudClassPrefix, classNumber;
}

/* Generowanie tagów */

function generateTags(){

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);
  /* START LOOP: for every article: */
  for(let article of articles){
  /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    //console.log (tagsWrapper);
  /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      //console.log(tag);
      /* generate HTML of the link */
      //const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li>';
      //console.log(linkHTML);
      const linkHTMLData = {id: tag, title: tag};
      const linkHTML = templates.tagLink(linkHTMLData);
      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log(html);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.insertAdjacentHTML('beforeend', html);
    //console.log(tagsWrapper);
  /* END LOOP: for every article: */
  }
  const tags = document.querySelectorAll('.post-tags .list li a');
  for (let tag of tags){
    tag.addEventListener('click', tagClickHandler);
  }
}

generateTags();

function tagClickHandler(event){

  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log(clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(event);
  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log(tag);
  /* find all tag links with class active */
  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  //console.log (tagLinks);
  /* START LOOP: for each active tag link */
  for (let tagLink of tagLinks) {
    /* remove class active */
    tagLink.classList.remove('active');  // classlist ?
  /* END LOOP: for each active tag link */
  }
  /* find all tag links with "href" attribute equal to the "href" constant */
  const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log(hrefTagLinks);
  /* START LOOP: for each found tag link */
  for(let hrefTagLink of hrefTagLinks) {
    /* add class active */
    hrefTagLink.classList.add('active');
  /* END LOOP: for each found tag link */
  }
  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags .list a');
  //console.log(tagLinks);
  /* START LOOP: for each link */
  for(let tagLink of tagLinks) {
    tagLink.addEventListener('click', tagClickHandler);
    /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors(){
  let allAuthors = {};
  //console.log(allAuthors);
  // find all articles
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);
  // for every article find author
  for(let article of articles) {
    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    //console.log (authorsWrapper);
    let html = '';
    // get authors from data=authors
    const articleAuthor = article.getAttribute('data-author');
    // generate html link for author  for example <p class="post-author">by Marion Berry</p>
    //const linkHTML = '<a href="#author-' + articleAuthor + '"> by ' + articleAuthor + '</a>';
    const linkHTMLData = {author: articleAuthor, author: articleAuthor};
    //console.log(linkHTMLData);
    const linkHTML = templates.authorLink(linkHTMLData);
    //console.log(linkHTML);
    if(!allAuthors[articleAuthor]) {
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor]++;
    }
    // add generated code to html variable
    html = html + linkHTML;
    //console.log(html);
    // insert html link into wrapper
    authorsWrapper.insertAdjacentHTML('beforeend', html);
    //console.log(authorsWrapper);
  }
  const authorListSidebar = document.querySelector('.authors');
  const authorsParams = calculateTagsParams(allAuthors);
  //console.log('authorParams:', authorsParams);
  //let allTagsHTML = '';
  const allAuthorsData = {authors: []};
  for(let author in allAuthors) {
    /* generate code of a link and add it to allTagsHTML */
    const authorNumber = calculateTagClass(allAuthors[author], authorsParams);
    //console.log('authorNumber:', authorNumber);
    //allTagsHTML += '<li><a class="tag-size-'+ authorNumber +' " href ="#author-' + author + '">'+ author + '</a></li> ';
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
      className: calculateTagClass(allAuthors[author], authorsParams)
    });
    //console.log(allAuthorsData);
  }
  /* add HTML from allTagsHTML to tagList */
  //authorListSidebar.innerHTML = allTagsHTML;
  authorListSidebar.innerHTML = templates.authorCloudLink(allAuthorsData);
  //console.log(allAuthorsData);
  const authors = document.querySelectorAll('.authors a');
  for(let author of authors) {
    author.addEventListener('click' , authorClickHandler);
  }
}
generateAuthors();

function authorClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  const href = clickedElement.getAttribute('href');
  //console.log(href);
  const author = href.replace('#author-', '');
  /* make a new constant authoer and extract tag from the "href" constant */
  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  //console.log(authorLinks);
  for (let authorLink of authorLinks) {
    authorLink.classList.remove('active');
  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  //console.log(hrefAuthorLinks);
  for (let hrefAuthorLink of hrefAuthorLinks){
    hrefAuthorLink.classList.add('active');
    //console.log(hrefAuthorLink);
  }
  generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors (){
  const authorLinks = document.querySelectorAll('.post .post-author a');
  /* find all links to tags */
  //console.log(authorLinks);
  /* for each link add tagClickHandler as event listener for that link */
  for (let authorLink of authorLinks) {
    authorLink.addEventListener('click', authorClickHandler);
  }
}

addClickListenersToAuthors();

function generateTagsCloud(){

  /* create a new variable allTags with an empty array [] > zmieniamy na nowy object {} */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);
  /* START LOOP: for every article: */
  for(let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    //console.log (tagsWrapper);
    /* make html variable with empty string */
    let html = '';
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    //console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    //console.log(articleTagsArray);
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      //console.log(tag);
      /* generate HTML of the link */
      const linkHTML = '<li><a href="#tag-' + tag + '"> ' + tag + '</a></li>';
      //console.log(linkHTML);
      // <li><a href="#tag-cat">cat</a></li>
      /* add generated code to html variable */
      html = html + linkHTML;
      //console.log(html);
      /* [NEW] check if this link is NOT already in allTags */
      if(!allTags.hasOwnProperty(tag)){
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      console.log(allTags);
    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    /* tagsWrapper.insertAdjacentHTML('beforeend', html); */
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');
  //console.log(tagList);
  /* [NEW] add html from allTags to tagList */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)
  //console.log('tagParams', tagsParams);
  // new create variable for all links HTML code
  // let allTagsHTML = '';
  const allTagsData = {tags: []};
  /* start loop for each tag in allTags */
  for(let tag in allTags) {
    // GENERATE CODE of a link and add it to alltags html
    //const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag +'">'+ tag + ' (' + allTags[tag] + ')</a></li>';
    //const tagLinkHTML = '<li><a class="tag-size-' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag +'">'+ tag + '</a></li>';
    //console.log('tagLinkHTML:', tagLinkHTML);
    //allTagsHTML += tagLinkHTML; zmieniamy na obiekt pod template
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });
    // allTagsHTML += `<li class="${calculateTagClass(allTags[tag], tagsParams)}"><a href="#tag-${tag}">${tag} (${allTags[tag]})</a></li>`
  } // end loop
  // add html from alltagsHTML to tagList
  // tagList.innerHTML = allTagsHTML; zmienamy pod template
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
  const tags = document.querySelectorAll('.tags a');
  for(let tag of tags){
    tag.addEventListener('click', tagClickHandler);       // tagclickhandler ?
  }
  //console.log(allTags);
}
generateTagsCloud()