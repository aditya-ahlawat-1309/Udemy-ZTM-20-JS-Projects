const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photosArray = [];

const count = 10;
const apiKey = "y01noPKBmsSgkVs8GfevWvLMVJmgIb-sLTerMS5FAZw";
const apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`


function displayPhotos() {
    photosArray.forEach((photo) => {
        // ----- Create <a></a> link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href',photo.links.html);
        item.setAttribute('target','_blank');

        // ---- Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src',photo.urls.regular);
        img.setAttribute('alt', photo.alt_description);
        img.setAttribute('title',photo.alt_description);
        
        // ---- Put <img> inside <a></a>, then put both inside imageContainer ELement
        item.appendChild(img);
        imageContainer.appendChild(item);
    })
}


async function getPhotos(){
try{
const response = await fetch(apiURL);
photosArray = await response.json();
console.log(photosArray);
displayPhotos();
}catch(error){
console.log(error);
}
}

window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000)
    {
        getPhotos();
        console.log('load more...');
    }
})

getPhotos();