const accessKey = "hDXFfduRcijhvNwn9wulCfda7htMZFmYOEKBpG0hVCE";
const searchForm = document.getElementById('search');
const searchImage = document.getElementById('search-image');
const searchResult = document.getElementById('search-result');
const showButton = document.getElementById('show');

let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchImage.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    if(page === 1){
        searchResult.innerHTML = "";
    }
    
    const results = data.results;
    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";
        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    })
    showButton.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImages();
})

showButton.addEventListener("click", () => {
    page++;
    searchImages();
})