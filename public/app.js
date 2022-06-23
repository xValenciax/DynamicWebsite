/*
*   @param {HTMLElement} node - the element that is checked 
*   @description checks if an element is currently in view
*   @returns {true} if the element is indeed in viewport else {false}
*/
const isInView = (element) =>{
    const rect = element.getBoundingClientRect();
    return  ( rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom <= (window.innerWidth || document.documentElement.clientWidth));
}






/*
*   @param {HTMLElement} node - the parent element that the sectio gets appended to
*   @description creates a new section with all its data and attributes and append it to the main element
*/
const createSection = (mainParent,para) => {
    const noOfSections = document.querySelectorAll('section').length;
    const sectionToAdd = document.createElement('section');
    sectionToAdd.setAttribute('id', `section${noOfSections+1}`);
    sectionToAdd.setAttribute('data-nav', `Section ${noOfSections+1}`);
    const divToAddToSection = document.createElement('div');
    divToAddToSection.setAttribute('class', 'landing__container');
    sectionToAdd.appendChild(divToAddToSection);
    const heading = document.createElement('h2');
    heading.textContent = `Section ${noOfSections+1}`;
    divToAddToSection.appendChild(heading);
    const p1 = document.createElement('p');
    p1.innerHTML = para;
    divToAddToSection.appendChild(p1);
    mainParent.appendChild(sectionToAdd);
}






/*
*   @param {HTML Element} document fragment - the element that is add to the dom after appending the nav bar to it  
*   @param {number} i - the counter which counts the number of sections
*   @description fills the nav bar with li elements
*/
const fillList = (fragment, i) => {
    const li = document.createElement('li');
    fragment.appendChild(li);
    const anchor = document.createElement('a');
    anchor.textContent = `Section ${i+ 1}`;
    anchor.setAttribute('class', 'menu__link');
    // anchor.setAttribute('href',  `#section${i+ 1}`);
    li.appendChild(anchor);
    fragment.appendChild(li);   
}







/**************Add Section***********************/

//get main element which is the parent for all sections
const main = document.querySelector('main');

let p = 'Python is a computer programming language often used to build websites and software,'+
'automate tasks, and conduct data analysis. Python is a general-purpose language,'+
'meaning it can be used to create a variety of different programs and isn’t specialized for any specific problems.'+
'This versatility, along with its beginner-friendliness, has made it one of the most-used programming languages today.'+
'A survey conducted by industry analyst firm RedMonk found that it was the second-most popular programming language among developers in 2021.';;
//create new section into the main element
createSection(main, p);

//store all sections in an array
let sectionList = [...document.querySelectorAll('section')];

p = 'C# is a general-purpose, modern and object-oriented programming language pronounced as “C sharp”.'+
'It was developed by Microsoft led by Anders Hejlsberg and his team within the .Net initiative'+
 'and was approved by the European Computer Manufacturers Association (ECMA) and International Standards Organization (ISO).'+
'C# is among the languages for Common Language Infrastructure and the current version of C# is version 7.2.'+
 'C# is a lot similar to Java syntactically and is easy for the users who have knowledge of C, C++ or Java';

createSection(main, p);

sectionList = [...document.querySelectorAll('section')];

/**************Add Section***********************/






/**************Build Nav bar***********************/

const navBar = document.getElementById('navbar__list');

//create a document fragment
const frag = document.createDocumentFragment();

//loop through the sections and add an li that has a  menu link class to each section
for(let i = 0; i < sectionList.length; i++) {
    fillList(frag, i);
}

//append fragment to navBar
navBar.appendChild(frag);

//add the on-click-scroll event listener to the fragment
navBar.addEventListener('click', (e)=> {
    e.preventDefault();
    const id = e.target.textContent.slice(8);
    for(const section of sectionList){
        if(section.getAttribute('id').slice(7) == id){     
            document.querySelector('.your-active-class').classList.remove('your-active-class');
            section.classList.add('your-active-class');
            // const sectionToScrollTo
            section.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }
});
/**************Build Nav bar*****************/






/**************Detect element in view port Implemntation*****************/

document.addEventListener('scroll', (e)=> {
    const header = document.getElementsByClassName('page__header');
    header[0].style.cssText = "visibility: visible;"
    for(section of sectionList){
        if(isInView(section.querySelector('.landing__container'))){
            document.querySelector('.your-active-class').classList.remove('your-active-class');
            const lists = document.querySelectorAll('li >a');
            for(const list of lists){
                if(list.textContent.includes(section.getAttribute('data-nav')))
                    list.style.cssText = "background-color: black ; color:#fff;";
                else
                    list.style.cssText = "background-color: #fff ; color:black;";
            }
            section.classList.add('your-active-class');
        }
    }
});

/**************Detect element in view port Implemntation*****************/






/**************Hide navBar when not scrolling*****************/
let timer = null;
document.addEventListener('scroll', (e)=> {
    if(timer != null) {
        clearTimeout(timer);
    }
    timer = setTimeout(function() {
        const header = document.getElementsByClassName('page__header');
        if(isInView(document.querySelector('h1')) == true){
            header[0].style.cssText = "visibility: hidden;";
        }
    }, 800);
});
/**************Hide navBar when not scrolling*****************/






/**************Create a scroll-to-top-button*****************/
const btnParent = document.createElement('div');
btnParent.classList.add('btnParent');
const btn = document.createElement('button');
btn.innerHTML = 'Scroll Back Top';
btn.setAttribute('id', 'ToTop');
btnParent.appendChild(btn);
document.querySelector('main').insertAdjacentElement('afterend', btnParent);

btn.addEventListener('click', (e)=> {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

/**************Create a scroll-to-top-button*****************/  