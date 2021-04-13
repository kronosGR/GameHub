const CART_LOC = "cart";
const SELLS_LOC = "sells";
const ORDERS_LOC = "orders";
const CORS_MODE = "no-cors";
const API_URL = "https://gh.kandz.me/wp-json/";
const API_GAMES = "wc/store/products";
const API_GAME = "wc/store/products/";
const API_SEARCH = "wp/v2/search?search=";

// keys for just reading
// const KEY = "ck_b1cab60dcc09b2a5b6bc0b975940b7b849268c40";
// const SECRET = "cs_1facec39dd4ab76b7118754f5ca74f373d64cacf";

/**
 *@return {array} an array with the games
 */
async function getGames() {
  let result = await fetch(API_URL + API_GAMES);

  if (result.status == 200) {
    let json = await result.json();
    return json;
  }

  // if status different than 200 then problems mr
  throw new Error(res.status);
}

/**
 * description Search games by keyword
 * @param {string} keyword - the keyword
 * @return {array} list of games
 */
function searchGamesWithKeyword(keyword) {
  return fetch(API_URL + API_SEARCH + keyword)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error("Not Found");
    })
    .then((data) => {
      // after 2 hours of research finally i got it with promise.all and 
      // how to use it.
      // it executes an array of promises!!!
      let results = data.map((game) => {
        return getGameById(game.id).then(gam => {return gam})
      });
      return Promise.all(results)
    })
    .catch((err) => {
      return err;
    });
}

/**
 * Get a game by Id
 * @param {number} id - game Id
 * @return {object} game
 */
function getGameById(id) {
  return fetch(API_URL + API_GAME + id)
    .then((res) => {
      if (res.status === 200) {
        return res.json();
      }
      throw new Error("Not Found");
    })
    .then((data) => {
      return data;
    })
    .catch((err) => {
      return err;
    });
}

/**
 * Set the country option in select element
 * @param {Object} element - the select element to be added
 * @param {string} selected - the country to choose
 */
function setCountriesInSelect(element, selected) {
  for (let [key, value] of Object.entries(countries)) {
    let option = document.createElement("option");
    option.value = value;
    option.text = value;
    if (value == selected) option.setAttribute("selected", "true");
    element.appendChild(option);
  }
}

/**
 * hide the error message
 * @param {Object} error element
 */
function hideError(error) {
  error.classList.add("none");
  error.classList.remove("error");
}

/**
 * show the message
 * @param {Object} msg element
 */
function showMsg(msg) {
  msg.classList.add("green");
  msg.classList.remove("none");
}

/**
 * show the error message
 * @param {Object} error element
 */
function showError(error) {
  error.classList.add("error");
  error.classList.remove("none");
}

/**
 * save an order
 * @param {Object} cart - the shopping cart
 */
function addOrder(cart) {
  const orders = getOrders();
  const order = new Order(cart);
  orders.push(order);
  storage.setItem(ORDERS_LOC, JSON.stringify(orders));
}

/**
 * get orders
 * @return {array} returns the orders list
 */
function getOrders() {
  return JSON.parse(storage.getItem(ORDERS_LOC)) || [];
}

/**
 * delete an item from the shopping car
 * @param {number} id - game id
 */
function deleteItemFromCart(id) {
  const cart = getCart();
  let cId = -1;

  for (let index in cart) {
    if (cart[index]["game"]["id"] == id) {
      cId = index;
      break;
    }
  }
  cart.splice(cId, 1);
  saveCart(cart);
}

/**
 * save the shopping cart
 * @param {Object} cart - the shopping cart
 */
function saveCart(cart) {
  storage.setItem(CART_LOC, JSON.stringify(cart));
}

/**
 * Update the amount of a game
 * @param {number} id - game ID to be updated
 * @param {number} amount - the new amount
 */
function updateAmountInShoppingCart(id, amount) {
  const cart = getCart();
  if (cart.length > 0) {
    for (let i in cart) {
      let item = cart[i];

      if (item["game"]["id"] == id) {
        item["amount"] = Number(amount);
      }
    }
    saveCart(cart);
  }
}

/**
 * Add to cart
 * @param {Object} game
 */
function addToCart(game) {
  const cart = getCart();
  const shoppingCartItem = new ShoppingCartItem(game);
  console.log(shoppingCartItem);

  if (cart.length > 0) {
    for (let i in cart) {
      let item = cart[i]["game"];

      if (item.name == game.name) {
        shoppingCartItem.amount++;
        cart.splice(i, 1);
      }
    }
  }
  cart.push(shoppingCartItem);

  //cart.push(shoppingCartItem);
  storage.setItem(CART_LOC, JSON.stringify(cart));
}

/**
 * Returns the amount of total items
 * @return {number} total items
 */
function getCartItemsAmount() {
  const cart = getCart();
  let total = 0;

  if (cart.length > 0) {
    for (let i in cart) {
      total += Number(cart[i]["amount"]);
    }
  }

  return total;
}

/**
 * empty the shopping cart
 */
function emptyCart() {
  storage.removeItem(CART_LOC);
}

/**
 * Get games from the cart
 * @return {array} with game objects
 */
function getCart() {
  return JSON.parse(storage.getItem(CART_LOC)) || [];
}

/**
 * Get games by price range
 * @param {number} from - starting price
 * @param {number} to - ending price
 * @return {array} array of game objects
 */
async function getGamesByPriceRange(from, to) {
  const games = await getGames();
  return games.filter((game) => game.prices.price >= from && game.prices.price <= to);
}

/**
 * get PEGI img
 * @param {number} pegi
 * @return {string} pegi img address and filename
 */
function getPegiImg(pegi) {
  switch (pegi) {
    case "3":
      return "images/pegi3.png";
    case "16":
      return "images/pegi16.png";
    case "18":
      return "images/pegi18.png";
    default:
      return "images/pegi18.png";
  }
}

// order item
function Order(cart) {
  this.cart = cart;
  this.date = new Date().toString().substr(0, 24);
  this.id = Math.floor(Math.random() * Math.floor(100000000));
}

// shopping cart object
function ShoppingCartItem(game, amount = 1) {
  this.game = game;
  this.amount = amount;
}

// image regex
const regImage = /\.(gif|jpe?g|tiff?|png|webp|bmp)$/i;

// date regex
const regDate = /^\d{4}-\d{2}-\d{2}$/;

// html regex
const regex = /(<([^>]+)>)/gi;

// email regex
const regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// list of all categories
const categories = [
  "Action",
  "Adventure",
  "Casual",
  "Indie",
  "Multiplayer",
  "Racing",
  "RPG",
  "Simulation",
  "Sports",
  "Strategy",
];

// list of countries
const countries = {
  AF: "Afghanistan",
  AX: "Aland Islands",
  AL: "Albania",
  DZ: "Algeria",
  AS: "American Samoa",
  AD: "Andorra",
  AO: "Angola",
  AI: "Anguilla",
  AQ: "Antarctica",
  AG: "Antigua And Barbuda",
  AR: "Argentina",
  AM: "Armenia",
  AW: "Aruba",
  AU: "Australia",
  AT: "Austria",
  AZ: "Azerbaijan",
  BS: "Bahamas",
  BH: "Bahrain",
  BD: "Bangladesh",
  BB: "Barbados",
  BY: "Belarus",
  BE: "Belgium",
  BZ: "Belize",
  BJ: "Benin",
  BM: "Bermuda",
  BT: "Bhutan",
  BO: "Bolivia",
  BA: "Bosnia And Herzegovina",
  BW: "Botswana",
  BV: "Bouvet Island",
  BR: "Brazil",
  IO: "British Indian Ocean Territory",
  BN: "Brunei Darussalam",
  BG: "Bulgaria",
  BF: "Burkina Faso",
  BI: "Burundi",
  KH: "Cambodia",
  CM: "Cameroon",
  CA: "Canada",
  CV: "Cape Verde",
  KY: "Cayman Islands",
  CF: "Central African Republic",
  TD: "Chad",
  CL: "Chile",
  CN: "China",
  CX: "Christmas Island",
  CC: "Cocos (Keeling) Islands",
  CO: "Colombia",
  KM: "Comoros",
  CG: "Congo",
  CD: "Congo, Democratic Republic",
  CK: "Cook Islands",
  CR: "Costa Rica",
  CI: "Cote D'Ivoire",
  HR: "Croatia",
  CU: "Cuba",
  CY: "Cyprus",
  CZ: "Czech Republic",
  DK: "Denmark",
  DJ: "Djibouti",
  DM: "Dominica",
  DO: "Dominican Republic",
  EC: "Ecuador",
  EG: "Egypt",
  SV: "El Salvador",
  GQ: "Equatorial Guinea",
  ER: "Eritrea",
  EE: "Estonia",
  ET: "Ethiopia",
  FK: "Falkland Islands (Malvinas)",
  FO: "Faroe Islands",
  FJ: "Fiji",
  FI: "Finland",
  FR: "France",
  GF: "French Guiana",
  PF: "French Polynesia",
  TF: "French Southern Territories",
  GA: "Gabon",
  GM: "Gambia",
  GE: "Georgia",
  DE: "Germany",
  GH: "Ghana",
  GI: "Gibraltar",
  GR: "Greece",
  GL: "Greenland",
  GD: "Grenada",
  GP: "Guadeloupe",
  GU: "Guam",
  GT: "Guatemala",
  GG: "Guernsey",
  GN: "Guinea",
  GW: "Guinea-Bissau",
  GY: "Guyana",
  HT: "Haiti",
  HM: "Heard Island & Mcdonald Islands",
  VA: "Holy See (Vatican City State)",
  HN: "Honduras",
  HK: "Hong Kong",
  HU: "Hungary",
  IS: "Iceland",
  IN: "India",
  ID: "Indonesia",
  IR: "Iran, Islamic Republic Of",
  IQ: "Iraq",
  IE: "Ireland",
  IM: "Isle Of Man",
  IL: "Israel",
  IT: "Italy",
  JM: "Jamaica",
  JP: "Japan",
  JE: "Jersey",
  JO: "Jordan",
  KZ: "Kazakhstan",
  KE: "Kenya",
  KI: "Kiribati",
  KR: "Korea",
  KW: "Kuwait",
  KG: "Kyrgyzstan",
  LA: "Lao People's Democratic Republic",
  LV: "Latvia",
  LB: "Lebanon",
  LS: "Lesotho",
  LR: "Liberia",
  LY: "Libyan Arab Jamahiriya",
  LI: "Liechtenstein",
  LT: "Lithuania",
  LU: "Luxembourg",
  MO: "Macao",
  MG: "Madagascar",
  MW: "Malawi",
  MY: "Malaysia",
  MV: "Maldives",
  ML: "Mali",
  MT: "Malta",
  MH: "Marshall Islands",
  MQ: "Martinique",
  MR: "Mauritania",
  MU: "Mauritius",
  YT: "Mayotte",
  MX: "Mexico",
  FM: "Micronesia, Federated States Of",
  MD: "Moldova",
  MC: "Monaco",
  MN: "Mongolia",
  ME: "Montenegro",
  MS: "Montserrat",
  MA: "Morocco",
  MZ: "Mozambique",
  MM: "Myanmar",
  NA: "Namibia",
  NR: "Nauru",
  NP: "Nepal",
  NL: "Netherlands",
  AN: "Netherlands Antilles",
  NC: "New Caledonia",
  NZ: "New Zealand",
  NI: "Nicaragua",
  NE: "Niger",
  NG: "Nigeria",
  NU: "Niue",
  NF: "Norfolk Island",
  MP: "Northern Mariana Islands",
  NO: "Norway",
  OM: "Oman",
  PK: "Pakistan",
  PW: "Palau",
  PS: "Palestinian Territory, Occupied",
  PA: "Panama",
  PG: "Papua New Guinea",
  PY: "Paraguay",
  PE: "Peru",
  PH: "Philippines",
  PN: "Pitcairn",
  PL: "Poland",
  PT: "Portugal",
  PR: "Puerto Rico",
  QA: "Qatar",
  RE: "Reunion",
  RO: "Romania",
  RU: "Russian Federation",
  RW: "Rwanda",
  BL: "Saint Barthelemy",
  SH: "Saint Helena",
  KN: "Saint Kitts And Nevis",
  LC: "Saint Lucia",
  MF: "Saint Martin",
  PM: "Saint Pierre And Miquelon",
  VC: "Saint Vincent And Grenadines",
  WS: "Samoa",
  SM: "San Marino",
  ST: "Sao Tome And Principe",
  SA: "Saudi Arabia",
  SN: "Senegal",
  RS: "Serbia",
  SC: "Seychelles",
  SL: "Sierra Leone",
  SK: "Skopje",
  SG: "Singapore",
  SK: "Slovakia",
  SI: "Slovenia",
  SB: "Solomon Islands",
  SO: "Somalia",
  ZA: "South Africa",
  GS: "South Georgia And Sandwich Isl.",
  ES: "Spain",
  LK: "Sri Lanka",
  SD: "Sudan",
  SR: "Suriname",
  SJ: "Svalbard And Jan Mayen",
  SZ: "Swaziland",
  SE: "Sweden",
  CH: "Switzerland",
  SY: "Syrian Arab Republic",
  TW: "Taiwan",
  TJ: "Tajikistan",
  TZ: "Tanzania",
  TH: "Thailand",
  TL: "Timor-Leste",
  TG: "Togo",
  TK: "Tokelau",
  TO: "Tonga",
  TT: "Trinidad And Tobago",
  TN: "Tunisia",
  TR: "Turkey",
  TM: "Turkmenistan",
  TC: "Turks And Caicos Islands",
  TV: "Tuvalu",
  UG: "Uganda",
  UA: "Ukraine",
  AE: "United Arab Emirates",
  GB: "United Kingdom",
  US: "United States",
  UM: "United States Outlying Islands",
  UY: "Uruguay",
  UZ: "Uzbekistan",
  VU: "Vanuatu",
  VE: "Venezuela",
  VN: "Viet Nam",
  VG: "Virgin Islands, British",
  VI: "Virgin Islands, U.S.",
  WF: "Wallis And Futuna",
  EH: "Western Sahara",
  YE: "Yemen",
  ZM: "Zambia",
  ZW: "Zimbabwe",
};
