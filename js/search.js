const section = document.querySelector(".main-content section");
const title = document.querySelector(".title");

const params = new URLSearchParams(window.location.search);
const search = params.get("searchfor") || null;

if (!search) {
  title.innerHTML = "Search Results";
  section.innerHTML = "<h2>Please specify a keyword to search</h2>";
  section.style.height = "100px";
  section.style.textAlign = "center";
  section.style.padding = "30px";
} else {
  title.innerHTML = `Search Results - ${search}`;
  const results = searchGamesWithKeyword(search);

  if (results.length == 0) {
    title.innerHTML = `Search Results - ${search}`;
    section.innerHTML = "<h2>No games found!</h2>";
    section.style.height = "100px";
    section.style.textAlign = "center";
    section.style.padding = "30px";
  } else {
    for (let game of results) {
      section.innerHTML += `
      <a href="game.html?id=${game.id}" class="preview-list-item ">     
        <img src="${game.thumb}" alt="${game.title}"/>
        <div class="preview-list-item--info">
          <span class="game-title">${game.title}</span>
          <p>
            ${game.genre.join(", ")}
          </p>
          <div class="preview-list-item--bottom">
              <img src='${getPegiImg(game.pegi)}' alt='pegi ${game.pegi}'>
              <div class="price-circle">
                  $${game.price}
              </div>
            <span>Read More...</span>
          </div>
        </div>      
      </a>`;
    }
  }
}
