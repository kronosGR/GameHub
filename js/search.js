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
  searchGamesWithKeyword(search).then((results) => {
    console.log(results);
    if (results.length === 0) {
      title.innerHTML = `Search Results - ${search}`;
      section.innerHTML = "<h2>No games found!</h2>";
      section.style.height = "100px";
      section.style.textAlign = "center";
      section.style.padding = "30px";
    } else {
      for (let game of results) {
        let categories = [];

        game.categories.forEach((cat) => {
          categories.push(cat.name);
        });

        section.innerHTML += `
        <a href="game.html?id=${game.id}" class="preview-list-item ">     
          <img src="${game.images[0].thumbnail}" alt="${game.name}"/>
          <div class="preview-list-item--info">
            <span class="game-title">${game.name}</span>
            <p>
              ${game.categories.join(", ")}
            </p>
            <div class="preview-list-item--bottom">                
                <div class="price-circle">
                    $${game.prices.price}
                </div>
              <span>Read More...</span>
            </div>
          </div>      
        </a>`;
      }
    }
  });
}