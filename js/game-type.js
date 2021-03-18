const title = document.querySelector(".title");
const mainContent = document.querySelector(".main-content");
const categoriesList = document.querySelector("#categories");
const priceFrom = document.querySelector("#price-from");
const priceTo = document.querySelector("#price-to");
const navigation = document.querySelector("#navigation");

const params = new URLSearchParams(window.location.search);
let type = params.get("type");
let category = params.get("category") || "";
let pFrom = priceFrom.value;
let pTo = priceTo.value;

priceFrom.addEventListener("input", () => {
  pFrom = priceFrom.value;
  showGame();
});

priceTo.addEventListener("input", () => {
  pTo = priceTo.value;
  showGame();
});

showNavigation();
showCategories();

if (type) {
  type = type.charAt(0).toUpperCase() + type.slice(1);
  title.innerHTML = type;
  document.title = type;
  let description = "List of " + type;

  if (category) {
    category = category.charAt(0).toUpperCase() + category.slice(1);
    title.innerHTML += ` > ${category}`;
    document.title += ` > ${category}`;
    description += " and category " + category;

    // show games for category
    showGame();
  } else {
    // show games for this type
    showGame();
  }

  document
    .querySelector('meta[name="description"')
    .setAttribute("content", description);
}

function showCategories() {
  for (let cat of categories) {
    let selected = "";
    if (cat.toLowerCase() == category.toLowerCase()) selected = "nav-selected";

    categoriesList.innerHTML += `
      <li><a href="game-type.html?type=${type}&category=${cat}" class="a-black ${selected}">${cat}</a></li>
    `;
  }
}

/**
 * print games to the HTML file
 */
function showGame() {
  mainContent.innerHTML = "";
  let resultGames = getGamesByPriceRange(pFrom, pTo);

  if (resultGames.length == 0) {
    mainContent.innerHTML =
      "<h2>No Games Found</h2>";
    mainContent.style.height = "100px";
    mainContent.style.textAlign = "center";
    mainContent.style.padding = "30px";
  } else {
    for (let game of resultGames) {
      mainContent.style.height = "auto";
      mainContent.innerHTML += `
      <a href="game.html?id=${game.id}&type=${type}&category=${category}" class="preview-list-item">     
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
      </a>
      `;
    }
  }
}

/**
 * show navigation
 */
function showNavigation(){
  navigation.innerHTML = `
  <li><a href="index.html">HOME</a></li>
  <li><a class="${type.toLowerCase() == 'New Games'.toLowerCase() ? 'nav-selected': ''} "
        href="game-type.html?type=New Games">NEW GAMES</a></li>
  <li><a class="${type.toLowerCase() == 'Pre-Order'.toLowerCase() ? 'nav-selected': ''}"
        href="game-type.html?type=Pre-Order">PRE-ORDER</a></li>
  <li><a class="${type.toLowerCase() == 'Used Games'.toLowerCase() ? 'nav-selected': ''}"
        href="game-type.html?type=Used Games">USED GAMES</a></li>
  <li><a href="sell-game.html">SELL GAMES</a></li>
  
  `
}