const params = new URLSearchParams(location.search);
const imdbID = params.get('id');
const movieDetails = document.querySelector('#movie-details');
const movie = document.querySelector('#movie');
if(imdbID){
    searchMovie(imdbID.trim())
}

else{
    movie.innerHTML = 'Return Back'
}
async function searchMovie(imdbID){
    movie.innerHTML = `<div class="loader">
  <div class="inner one"></div>
  <div class="inner two"></div>
  <div class="inner three"></div>
</div>`
    const response = await fetch(`http://www.omdbapi.com/?apikey=d213a1ff&i=${imdbID}&plot=full`);
    const data = await response.json();
    console.log(data);
    if(data.Response === "True"){
        setTimeout(() => {
        displayMovie(data);
        },1000);
        
    }
    else{
        console.log(data.Error);
    }
    
}

function displayMovie(data){
    movie.innerHTML = `Movie-details`;
    movieDetails.innerHTML =`<div>
            <img src=${data.Poster} alt="">
        </div>
        <div>
            <h2>${data.Title}</h2>
        </div>
        <div>
            <section>
                <p>${data.Released}</p>
                <p>${data.Rated}</p>
                <p>${data.Runtime}</p>
                <p>${data.Genre}</p>
                <p>IMDb: ${data.imdbRating}/10</p>
            </section>
            
        </div>
        <div>
            <section>
                <p>PLOT OVERVIEW</p>
                <p>${data.Plot}</p>
            </section>
            
        </div>  
        <div>
            <section>
                <p>Director</p>
                <p>${data.Director}</p>
            </section>
            <section>
                <p>Writer</p>
                <p>${data.Writer}</p>
            </section>
            
        </div>

        <div>
            <section>
                <p>Actors</p>
                <p>${data.Actors}</p>
            </section>
            
        </div>

        <div>
            <section>
                <p>Language</p>
                <p>${data.Language}</p>
            </section>
            <section>
                <p>Country</p>
                <p>${data.Country}</p>
            </section>
            <button>
            <a href =https://www.imdb.com/title/${data.imdbID} target ="_blank">View on IMDb</a>
            </button>
        </div>`
}