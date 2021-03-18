const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type");
const category = params.get("category");

const gameContainer = document.querySelector(".game-content");
const title = document.querySelector("#breadcrumb");
let addToCartButton;

const game = getGameById(id);

document.title = "GameHub - " + game.title;
document
  .querySelector('meta[name="description"]')
  .setAttribute("content", game.about.substring(0, 100).replace(regex, "") + "...");

showNavigation();
showBreadcrumbs();

if (game) {
  gameContainer.innerHTML = `
  <div>
    <img src="${game.image}" alt="${game.title}">
    <span class="game-mon-title">System Requirements</span>
    <div class="game-requirements">
      ${game.requirements}
    </div>    
    <div>
        <img src="${getPegiImg(game.pegi)}" alt="PEGI ${game.pegi}" class="game-pegi"/>
    </div>                    
  </div>
  <div>
    <div class="game-header">
        <h1>${game.title}</h1>                        
        <div class="price-circle">
            $${game.price}
        </div>
    </div>
    <div class="game-grid">
        <div class="game-grid-item1">
            Genre:
        </div>
        <div class="game-grid-item2">
         ${game.genre.join(", ")}
        </div>
        <div class="game-grid-item1">
            About:
        </div>                          
        <div class="game-grid-item2 bottom-margin-40">
          ${game.about}
        </div>
        <div class="game-grid-item3">
            <label for="add-to-cart--checkbox"><div class="cta">ADD TO CART</div></label>
            <input type="button" name="add-to-cart--checkbox" id="add-to-cart--checkbox">
            <div id="item-added">1</div>
        </div>
    </div>
  </div>

  </div>
  `;
  addToCartButton = document.querySelector("#add-to-cart--checkbox");
} else {
  gameContainer.innerHTML = "<h2>Something went wrong. Sorry for the inconvenience.</h2>";
  gameContainer.style.height = "100px";
  gameContainer.style.textAlign = "center";
  gameContainer.style.padding = "30px";
}

// add to cart
addToCartButton.addEventListener("click", function () {
  const itemAdded = document.querySelector("#item-added");
  itemAdded.style.display = "inline";
  itemAdded.style.animation = "item_added_animation 4s";
  addToCart(game);
  updateCart();
  setTimeout(() => {
    itemAdded.style.display = "none";
  }, 4000);
});

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

/**
 * show breadcrumbs
 */

function showBreadcrumbs() {
  if (type != null)
    title.innerHTML = `
    <a href="game-type.html?type=${type}" class="breadcrumb--link">${type.toUpperCase()}</a>`;
  if (category != null && category.length >0)
    title.innerHTML += `<span class="breadcrumb--gt"> &gt; </span> <a href="game-type.html?type=${type}&category=${category}" class="breadcrumb--link">${category.toUpperCase()}</a>`;
  if (type != null || category != null)
    title.innerHTML += `<span class="breadcrumb--gt"> &gt; </span> <span class="breadcrumb--gt"> ${game.title} </span>`
}
