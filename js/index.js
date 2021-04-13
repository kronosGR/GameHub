// using the games[] the site creates the lists in the frontpage.

const previewLists = document.querySelectorAll(".preview-list");

const showGames = async (list) => {
  let games = await getGames();
  games.forEach((game) => {
    let categories = [];

    game.categories.forEach((cat) => {
      categories.push(cat.name);
    });

    list.innerHTML += `
      <a href="game.html?id=${game.id}" class="preview-list-item">
        <img src="${game.images[0].thumbnail}" alt="${game.name}"/>
        <div class="preview-list-item--info">
          <span class="game-title">${game.name}</span>
          <p>
            ${categories.join(", ")}
          </p>
          <div class="preview-list-item--bottom">
              
              <div class="price-circle">
                  $${game.prices.price}
              </div>
            <span>Read More...</span>
          </div>
        </div>
      </a>
      `;
  });
}

async function showInPage(){
  for (let i = 0; i < previewLists.length; i++) {
    await showGames(previewLists[i]);
  }
}


showInPage();