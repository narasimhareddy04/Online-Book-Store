let searchInputEl = document.getElementById('searchInput');
let selectDisplayCountEl = document.getElementById("selectDisplayCount");
let searchResultsEl = document.getElementById("searchResults");
let spinnerEl = document.getElementById("spinner");


let bookSearchObj = {
    title: "",
    number: "10"
}
searchInputEl.addEventListener("change", function(event) {
    bookSearchObj.title = event.target.value;
});
selectDisplayCountEl.addEventListener("change", function(event) {
    bookSearchObj.number = event.target.value;
    if (bookSearchObj.title !== "") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputEl.value + "&" + "maxResults=" + bookSearchObj.number;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                        createAndAppend(jsonData.search_results);
               
            });
    }
});

function createAndAppend(bookList) {

    spinnerEl.classList.add("d-none");
    if (bookList.length == 0) {
        let noResultContEl=document.createElement("div");
         noResultContEl.classList.add("col-12","mb-3");
        let noResultEl=document.createElement("h1");
         noResultEl.classList.add("no-result-text");
         noResultEl.textContent = "No results found";
         noResultContEl.appendChild(noResultEl);
         searchResultsEl.appendChild(noResultContEl);
     
     }
     else{
         let searchResultsHeadingContEl=document.createElement("div");
         searchResultsHeadingContEl.classList.add("col-12","mb-3");
         let searchResultsHeadingEl=document.createElement("h1");
         searchResultsHeadingEl.classList.add("search-result-heading");
         searchResultsHeadingEl.textContent="Popular books";
         searchResultsHeadingContEl.appendChild(searchResultsHeadingEl);
         searchResultsEl.appendChild(searchResultsHeadingContEl);
       
         
         
         for(let book of bookList ){
             let {
                title,
                imageLink,
                author
            } = book;
            
            let bookContainerEl = document.createElement("div");
            bookContainerEl.classList.add("col-12","col-sm-6","col-md-4","col-lg-3", "mb-3", "d-flex", "flex-column");
            searchResultsEl.appendChild(bookContainerEl);
            let imageEl = document.createElement("img");
            imageEl.src = imageLink;
            imageEl.classList.add("w-100");
            bookContainerEl.appendChild(imageEl);
        
            let authorEl = document.createElement("p");
            authorEl.classList.add("author-text");
            authorEl.textContent = author;
            bookContainerEl.appendChild(authorEl);
            
         }
     }
    
}
searchInputEl.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        spinnerEl.classList.remove("d-none");
        searchResultsEl.textContent = "";

        let searchInput = searchInputEl.value;
        let url = "https://apis.ccbp.in/book-store?title=" + searchInputEl.value + "&" + "maxResults=" + bookSearchObj.number;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                        createAndAppend(jsonData.search_results);
           


            });
    }
});