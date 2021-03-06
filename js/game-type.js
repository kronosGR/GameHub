const title = document.querySelector(".title");
const mainContent = document.querySelector(".main-content");
const categoriesList = document.querySelector("#categories");
const priceFrom = document.querySelector("#price-from");
const priceTo = document.querySelector("#price-to");
const navigation = document.querySelector("#navigation");

const params = new URLSearchParams(window.location.search);
let type = params.get("type");
let category = params.get("category") || "";
let catId = params.get("catid");
let pFrom = priceFrom.value;
let pTo = priceTo.value;

let ready = true;

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
  title.innerHTML = `<a href="game-type.html?type=${type}">${type}</a>`;
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

  document.querySelector('meta[name="description"').setAttribute("content", description);
}

async function showCategories() {
  const categories = await getCategories();

  for (let cat of categories) {
    let selected = "";
    if (cat.name.toLowerCase() == category.toLowerCase()) selected = "nav-selected";

    categoriesList.innerHTML += `
      <li><a href="game-type.html?type=${type}&category=${cat.name}&catid=${cat.id}" class="a-black ${selected}">${cat.name}</a></li>
    `;
  }
}

/**
 * print games to the HTML file
 */
async function showGame() {
  if (!ready) return;

  ready = false;
  mainContent.innerHTML = "";
  if (catId) {
    let resultGames = await getGamesByPriceRangeAndCategory(Number(pFrom), Number(pTo), catId);

    if (resultGames.length == 0) {
      mainContent.innerHTML = "<h2>No Games Found</h2>";
      mainContent.style.height = "100px";
      mainContent.style.textAlign = "center";
      mainContent.style.padding = "30px";
    } else {
      resultGames.forEach((game) => {

        mainContent.style.height = "auto";
        mainContent.innerHTML += `
        <a href="game.html?id=${game.id}&type=${type}&category=${category}" class="preview-list-item">     
          <img src="${game.images[0].thumbnail}" alt="${game.name}"/>
          <div class="preview-list-item--info">
            <span class="game-title">${game.name}</span>
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
  } else {
    let resultGames = await getGamesByPriceRange(Number(pFrom), Number(pTo));

    if (resultGames.length == 0) {
      mainContent.innerHTML = "<h2>No Games Found</h2>";
      mainContent.style.height = "100px";
      mainContent.style.textAlign = "center";
      mainContent.style.padding = "30px";
    } else {
      resultGames.forEach((game) => {

        mainContent.style.height = "auto";
        mainContent.innerHTML += `
        <a href="game.html?id=${game.id}&type=${type}&category=${category}" class="preview-list-item">     
          <img src="${game.images[0].thumbnail}" alt="${game.name}"/>
          <div class="preview-list-item--info">
            <span class="game-title">${game.name}</span>
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
  }
  ready = true;
}

/**
 * show navigation
 */
function showNavigation() {
  navigation.innerHTML = `
  <li><a href="index.html">HOME</a></li>
  <li><a class="${type.toLowerCase() == "New Games".toLowerCase() ? "nav-selected" : ""} "
        href="game-type.html?type=New Games">NEW GAMES</a></li>
  <li><a class="${type.toLowerCase() == "Pre-Order".toLowerCase() ? "nav-selected" : ""}"
        href="game-type.html?type=Pre-Order">PRE-ORDER</a></li>
  <li><a class="${type.toLowerCase() == "Used Games".toLowerCase() ? "nav-selected" : ""}"
        href="game-type.html?type=Used Games">USED GAMES</a></li>
  <li><a href="sell-game.html">SELL GAMES</a></li>
  
  `;
}
