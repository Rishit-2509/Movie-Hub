//  http://www.omdbapi.com/?apikey=d213a1ff&
const movieForm = document.querySelector('#movieForm');
const input = document.querySelector('#movieInput');
const moviehub = document.querySelector('#movie-hub');
movieForm.addEventListener("submit",(e)=>{
    e.preventDefault();
    const query = input.value.trim();
    if(!query){
        return;
    }
    console.log(query);
    searchMovies(query);
})

async function searchMovies(movie){
    moviehub.innerHTML = `<div class="loader"></div> `
    const response = await fetch(`https://www.omdbapi.com/?apikey=d213a1ff&s=${movie}`);
    const data = await response.json();
    console.log(data);
    if(data.Response === "True"){
        displayMovie(data.Search);
    }
    else{
        console.log(data.Error);
        moviehub.innerHTML = `<p>${data.Error}</p>`
    }
    
}

// Poster
// : 
// "https://m.media-amazon.com/images/M/MV5BNGE0YTVjNzUtNzJjOS00NGNlLTgxMzctZTY4YTE1Y2Y1ZTU4XkEyXkFqcGc@._V1_QL75_UX380_CR0,0,380,562_.jpg"
// Title
// : 
// "The Avengers"
// Type
// : 
// "movie"
// Year
// : 
// "2012"
// imdbID
// : 
// "tt0848228"

function displayMovie(movies){
    moviehub.innerHTML ="";
    movies.forEach(movie => {
        const div = document.createElement('div');
        div.dataset.imd = movie.imdbID;
        div.setAttribute("class","movie-card");  
        div.innerHTML =`
        <div><img src="${movie.Poster}" alt=""></div>
        <div>
        
            <p>${movie.Title}</p>
            <p>${movie.Year}</p>
        </div>
        `
        moviehub.append(div);
    });
    
}

moviehub.addEventListener("click",(e)=>{
    e.stopPropagation();
    const movieCard = e.target.closest('.movie-card');
    const imdbID =  movieCard.dataset.imd;
    location.href =`movie-details.html?id=${imdbID}`;
})
