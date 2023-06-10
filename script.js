const accessKey = 'xX3SdVzU58lhgZ8v6vIq4VL0WnQUqrOLTExZVK_Eq2w';

const formEl = document.querySelector('form');
const inputValueEl = document.getElementById('search-input');
const searchButtonEl = document.getElementById('search-button')

const searchResultsEl = document.querySelector('.search-results')

const showMoreBtn = document.getElementById('show-more-button')


// Basically naked varible are used to change later it will change later that why we use 'let'
let inputData = ''
let page = 1

async function searchImages(){
    inputData = inputValueEl.value
    const url = `https://api.unsplash.com/search/photos?q:page=${page}&query=${inputData}&client_id=${accessKey}`
    // console.log(url)

    const response = await fetch(url).then((response) => response.json())
    // console.log(response)

    // fetcing result from api
    const results = response.results;

    // create element its used when we don't want remove previos data from it

    results.map((result) => {
        // create html tag/element using javascript
        const imageWrapper = document.createElement('div')
        // set a class name of an element
        imageWrapper.classList.add('search-result')
        
        // create html tag/element using javascript
        const image = document.createElement('img')
        image.src = result.urls.small;
        image.alt = result.alt_description
        
        // create html tag/element using javascript
        const imageLink = document.createElement('a')
        imageLink.href = result.links.html
        imageLink.target = "_blank"
        imageLink.textContent = result.alt_description

        
        // append-after that|appendChild-as child inside it|: put some something inside it
        searchResultsEl.appendChild(imageWrapper)
        imageWrapper.appendChild(image)
        imageWrapper.appendChild(imageLink)

    })

    const endPage = document.createElement('h3')
    if(page > 0 && page <= response.total_pages){
        showMoreBtn.style.display = 'block'
        endPage.textContent = ""
    }else{
        showMoreBtn.style.display = 'none'
        endPage.textContent = "Try To Write Something Similar"
        document.body.appendChild(endPage)
    }

}

console.log(page)
formEl.addEventListener('submit', (event) => {
    event.preventDefault()
    searchImages()
    searchResultsEl.innerHTML = '';

})

showMoreBtn.addEventListener('click', () => {
    searchImages()
    page++;
})