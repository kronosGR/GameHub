const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const type = params.get("type") || "";
const category = params.get("category");

const gameContainer = document.querySelector(".game-content");
const title = document.querySelector("#breadcrumb");
let addToCartButton;

getGameById(id)
  .then((game) => {
    document.title = "GameHub - " + game.name;
    document
      .querySelector('meta[name="description"]')
      .setAttribute("content", game.description.substring(0, 100).replace(regex, "") + "...");

    showNavigation();

    if (game) {
      showBreadcrumbs(game.name);
      let categories = [];

      game.categories.forEach((cat) => {
        categories.push(cat.name);
      });

      gameContainer.innerHTML = `
    <div>
      <img src="${game.images[0].src}" alt="${game.name}">
      <span class="game-mon-title">System Requirements</span>
      <div class="game-requirements">
        ${game.short_description}
      </div>    
      <div>
          <img src="${getPegiImg(game.tags[0].name)}" alt="PEGI ${game.tags[0].name}" class="game-pegi"/>
      </div>                    
    </div>
    <div>
      <div class="game-header">
          <h1>${game.name}</h1>                        
          <div class="price-circle">
              $${game.prices.price}
          </div>
      </div>
      <div class="game-grid">
          <div class="game-grid-item1">
              Genre:
          </div>
          <div class="game-grid-item2">
           ${categories.join(", ")}
          </div>
          <div class="game-grid-item1">
              About:
          </div>                          
          <div class="game-grid-item2 bottom-margin-40">
            ${game.description}
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
    } else {
      gameContainer.innerHTML = "<h2>Something went wrong. Sorry for the inconvenience.</h2>";
      gameContainer.style.height = "100px";
      gameContainer.style.textAlign = "center";
      gameContainer.style.padding = "30px";
    }
  })
  .catch((err) => {
    showNavigation();
    gameContainer.innerHTML = "<h2>Something went wrong. Sorry for the inconvenience.</h2>";
    gameContainer.style.height = "100px";
    gameContainer.style.textAlign = "center";
    gameContainer.style.padding = "30px";
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

function showBreadcrumbs(name) {
  if (type != null)
    title.innerHTML = `
    <a href="game-type.html?type=${type}" class="breadcrumb--link">${type.toUpperCase()}</a>`;
  if (category != null && category.length > 0)
    title.innerHTML += `<span class="breadcrumb--gt"> &gt; </span> <a href="game-type.html?type=${type}&category=${category}" class="breadcrumb--link">${category.toUpperCase()}</a>`;
  if ((type != null && type != "") || category != null)
    title.innerHTML += `<span class="breadcrumb--gt"> &gt; </span> <span class="breadcrumb--gt"> ${name} </span>`;
}
