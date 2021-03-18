const CART_LOC = "cart";
const SELLS_LOC = "sells";
const ORDERS_LOC = "orders";

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

  if (cart.length > 0) {
    for (let i in cart) {
      let item = cart[i]["game"];

      if (item.title == game.title) {
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
function getGamesByPriceRange(from, to) {
  const result = [];
  for (let game of games) {
    if (game.price >= from && game.price <= to) result.push(game);
  }
  return result;
}

/**
 * Get a game by Id
 * @param {number} id - game Id
 * @return {object} game
 */
function getGameById(id) {
  for (let game of games) {
    if (game.id == id) {
      return game;
    }
  }
  return;
}

/**
 * description Search games by keyword
 * @param {string} keyword - the keyword
 * @return {array} list of games
 */
function searchGamesWithKeyword(keyword) {
  const result = [];
  for (let game of games) {
    if (
      game.title.toLowerCase().includes(keyword.toLowerCase()) ||
      game.genre.join(",").toLowerCase().includes(keyword.toLowerCase()) ||
      game.about.toLowerCase().includes(keyword.toLowerCase())
    ) {
      result.push(game);
    }
  }
  return result;
}

/**
 * get PEGI img
 * @param {number} pegi
 * @return {string} pegi img address and filename
 */
function getPegiImg(pegi) {
  switch (pegi) {
    case 3:
      return "images/pegi3.png";
    case 16:
      return "images/pegi16.png";
    case 18:
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

// list of all the games
const games = [
  {
    id: 0,
    title: "DEATH STRANDING",
    genre: ["Action", "Adventure", "Simulation", "Sports", "Strategy"],
    about: `<p>
      <b>Will you make the right decisions?</b>
      Take on the peloton in over 230 races and 650 stages, from the Tour de France to La Vuelta to the classic events of the World Tour calendar.
      Become the manager of a cycling team and take them to the top! To get there, you will need to manage finances and recruitment, plan your training and implement your strategy. And for the first time in the Pro Cycling Manager series, you must look after your riders and their morale! One decision can change everything...
      </p>
      <br>
      <p>
      You must listen to the requests of your cyclists (inclusion in races, personal goals, etc.) and either agree to them or decline. You are the manager, only you can make the decisions that will maintain balance in your team and motivate your cyclists in crucial moments while trying to achieve the best results for your team.
      You can also play as your own cyclist and pursue a career to the highest summits in the Pro Cyclist mode. Proved yourself in Career mode? Play online mode with up to 15 other players from all over the world.
      </p>
      <br>
      <p>
      <b>NEW IN THE 2020 EDITION</b><br>
      The 21 official stages of the Tour de France 2020
      </p>
      <br>
      <p>
      <b>Career mode:</b>
      <br>Manage the morale of your cyclists: they will make requests (inclusion in races, recruitment of cyclists, etc.), and your decision will affect their morale and performance. The transfer window is also crucial for maintaining balance within your team
      <br> Motivation during races: in each race, the motivation of your cyclists is linked to morale and key events, such as wearing a jersey, winning in the previous stage, etc. A fully motivated cyclist can excel in pivotal moments in the race, including an accelerating peloton and preparation for the final sprint
      <br>A new assistant to help you plan your races
      <br>A redesigned dashboard
      <br>Improved AI, more aggressive and adventurous                            
      </p>`,
    price: 20,
    image: "images/games/deathStrandingFull.jpg",
    thumb: "images/games/deathStranding.png",
    requirements: `System Requirements
      Requires a 64-bit processor and operating system
      OS: 64-bit Windows 7, Windows 8, Windows 10
      Processor: Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz
      Memory: 4 GB RAM
      Graphics: Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)
      Network: Broadband Internet connection
      Storage: 20 GB available space
      Additional Notes: INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME`,
    pegi: 18,
    productNumber: 23434624643,
  },
  {
    id: 1,
    title: "Farming Simulation 2019",
    genre: ["simulation"],
    about: ` <p>
          The best-selling franchise returns this year with a complete overhaul of the graphics engine, offering the most striking and immersive visuals and effects, along with the deepest and most complete farming experience ever.
      </p>
      <br>
      <p>
          Farming Simulator 19 takes the biggest step forward yet with the franchise’s most extensive vehicle roster ever! You’ll take control of vehicles and machines faithfully recreated from all the leading brands in the industry, including for the first time John Deere, the largest agriculture machinery company in the world, Case IH, New Holland, Challenger, Fendt, Massey Ferguson, Valtra, Krone, Deutz-Fahr and many more.
      </p>
      <br>
      <p>
          Farming Simulator 19 will feature new American and European environments in which to develop and expand your farm and will introduce many exciting new farming activities, including new machinery and crops with cotton and oat! Tend to your livestock of pigs, cows, sheep, and chickens - or ride your horses for the first time, letting you explore in a brand-new way the vast land around your farm.
      </p>
      <br>
      <p>
          Farming Simulator 19 is the richest and most complete farming experience ever made!
      </p>
      <br>
      <p>
          <b>MAIN FEATURES</b>
          The biggest step forward for the Farming Simulator franchise, offering the most striking and immersive graphics ever
          Use and drive hundreds of faithfully reproduced farming vehicles and tools, including for the first time John Deere
          Tend to your livestock including pigs, cows, sheep, chicken, and for the first time horses
          Ride your own horses and explore the vast areas offered in huge open worlds loaded with farming activities
          Develop your farm online with up to 16 players and enrich your Farming experience with community-created mods                            
      </p>`,
    price: 11,
    image: "images/games/farmingSimulatorFull.jpg",
    thumb: "images/games/farmingSimulator.png",
    requirements: `<p>
        Requires a 64-bit processor and operating system<br>
        <b>OS:</b> 64-bit Windows 7, Windows 8, Windows 10<br/>
        <b>Processor:</b> Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz<br>
        <b>Memory:</b> 4 GB RAM<br/>
        <b>Graphics:</b> Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)<br/>
        <b>Network:</b> Broadband Internet connection<br/>
        <b>Storage:</b> 20 GB available space<br/>
        <b>Additional Notes:</b> INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME<br/>
    </p>`,
    pegi: 3,
    productNumber: 3465346242,
  },
  {
    id: 2,
    title: "Football Manager 2020",
    genre: ["Simulation", "Sports"],
    about: ` <p>
          Run your football club, your way. Every decision counts in Football Manager 2020 with new features and polished game mechanics rewarding planning and progression like never before, empowering managers to develop and refine both your club’s and your own unique identity.
      </p>
      <br>
      <p>
          Walk down the tunnel to a living, breathing football world with you at the very heart of it. Around here, your opinion matters!
      </p>
      <br>
      <p>   
          This is a world that rewards planning and knowledge but, unlike other games, there’s no pre-defined ending or script to follow – just endless possibilities and opportunities. Every club has a story to tell and it’s down to you to create it.
      </p>
      <br>
      <p>
          They say football is a game of dreams. Well, managers are a special breed of dreamers.
      </p>
      <br>
      <p>
          They don’t see problems, only opportunities: the chance to prove themselves against the best in the world, to develop and instil a new footballing philosophy, to nurture talent through the ranks, to lift the club to greater heights and end the wait for silverware.
      </p>
      <br>
      <p>
          How you get to the top is up to you… you’ll own your decisions, and the consequences they bring…
      </p>
      <br>
      <p>
          Base yourself in 50 of the biggest footballing countries worldwide
          Oversee a new era of success at one of 2,500 clubs at every level
          Sign the best and mould the future – scout more than 500,000 real players and staff
          Create your tactical vision and bring it to life on the training pitch
          Kick every ball with our most immersive and smartest match engine to date
      </p> `,
    price: 20,
    image: "images/games/footballManagerFull.jpg",
    thumb: "images/games/footballManager.png",
    requirements: `<p>
        Requires a 64-bit processor and operating system<br>
        <b>OS:</b> 64-bit Windows 7, Windows 8, Windows 10<br/>
        <b>Processor:</b> Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz<br>
        <b>Memory:</b> 4 GB RAM<br/>
        <b>Graphics:</b> Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)<br/>
        <b>Network:</b> Broadband Internet connection<br/>
        <b>Storage:</b> 20 GB available space<br/>
        <b>Additional Notes:</b> INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME<br/>
    </p>`,
    pegi: 3,
    productNumber: 483736373547,
  },
  {
    id: 3,
    title: "Hunting Simulator 2",
    genre: ["Action", "Adventure", "Simulation", "Sports", "Strategy"],
    about: ` <p>
          It's open season!
      </p>
      <br>
      <p>
          In stunning natural environments, choose your gear from the best official weapons and accessories and set off with your dog in search of a variety of animal species in this hunting simulation.
      </p>
      <br>
      <p>
          Hunting in an open world
      </p>
      <br>
      <p>
          Explore the plains of Colorado, the Texan desert and the forests of Eastern Europe in vast open worlds of over 6 square miles.
      </p>
      <br>
      <p>
          A wide variety of animals
      </p>
      <br>
      <p>
          Track down 33 animal species in their natural environment by using the best hunting techniques. Locate animal tracks and follow them to reveal your prey.
      </p>
      <br>
      <p>
          Realism at the heart of the game experience
      </p>
      <br>
      <p>
          Hunt animals with realistic behaviours and advanced artificial intelligence. Aim accurately to ensure you don't ruin your trophy.
      </p>
      <br>
      <p>
          A faithful companion
      </p>
      <br>
      <p>
          Use your hunting dog to track your prey. Labrador Retriever, German Shorthaired Pointer and Beagle, each dog has its specific hunting attributes.
      </p>
      <br>
      <p>
          Lots of equipment to choose from
      </p>
      <br>
      <p>
          Kit yourself out with over 160 weapons, accessories and clothing items from the best brands: Browning, Winchester, Bushnell, Kryptek, Verney-Carron...
      </p> `,
    price: 19,
    image: "images/games/huntingSimulator2Full.jpg",
    thumb: "images/games/huntingSimulator2.png",
    requirements: ` <p>
        Requires a 64-bit processor and operating system<br>
        <b>OS:</b> 64-bit Windows 7, Windows 8, Windows 10<br/>
        <b>Processor:</b> Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz<br>
        <b>Memory:</b> 4 GB RAM<br/>
        <b>Graphics:</b> Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)<br/>
        <b>Network:</b> Broadband Internet connection<br/>
        <b>Storage:</b> 20 GB available space<br/>
        <b>Additional Notes:</b> INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME<br/>
    </p>`,
    pegi: 18,
    productNumber: 4624737357357,
  },
  {
    id: 4,
    title: "Microsoft flight simulator",
    genre: ["Simulation"],
    about: ` <p>
          From light planes to wide-body jets, fly highly detailed and accurate aircraft in the next generation of Microsoft Flight Simulator. Test your piloting skills against the challenges of night flying, real-time atmospheric simulation and live weather in a dynamic and living world. Create your flight plan to anywhere on the planet. Microsoft Flight Simulator includes 20 highly detailed planes with unique flight models and 30 hand-crafted airports.
      </p>
      <br>
      <p>
          <b>The World is at your Fingertips.</b>
      </p>
      <br>
      <p>
          • Vivid and Detailed Landscapes – Immerse yourself in the vast and beautiful world that is our planet with over 37 thousand airports, 1.5 billion buildings, 2 trillion trees, mountains, roads, rivers and more.
      </p>
      <br>
      <p>
          • Living World – Earth is vibrant and ever-changing and so is the world of Microsoft Flight Simulator which includes live traffic, real-time weather and animals.
      </p>
      <br>
      <p>
          <b>Earn Your Wings.</b>
      </p>
      <br>
      <p>
          • Aircraft – Hone your pilot skills in a variety of aircraft from light planes to commercial jets with comprehensive flight models. Every aircraft includes highly detailed and accurate cockpits with realistic instrumentation.
      </p>
      <br>
      <p>
              • New Checklist System - From pro to beginner, scale your level from full manual to full assist with interactive and highlighted instrument guidance and checklist.                      
      </p>`,
    price: 25,
    image: "images/games/flightSimulatorFull.jpg",
    thumb: "images/games/flightSimulator.png",
    requirements: ` <p>
        Requires a 64-bit processor and operating system<br>
        <b>OS:</b> 64-bit Windows 7, Windows 8, Windows 10<br/>
        <b>Processor:</b> Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz<br>
        <b>Memory:</b> 4 GB RAM<br/>
        <b>Graphics:</b> Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)<br/>
        <b>Network:</b> Broadband Internet connection<br/>
        <b>Storage:</b> 20 GB available space<br/>
        <b>Additional Notes:</b> INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME<br/>
    </p>`,
    pegi: 3,
    productNumber: 86573523636,
  },
  {
    id: 5,
    title: "Pro cycling manager 2020",
    genre: ["Action", "Adventure", "Simulation", "Sports", "Strategy"],
    about: ` <p>
            Will you make the right decisions?
        </p>
        <br>
        <p>
            Take on the peloton in over 230 races and 650 stages, from the Tour de France to La Vuelta to the classic events of the World Tour calendar.
        </p>
        <br>
        <p>
            Become the manager of a cycling team and take them to the top! To get there, you will need to manage finances and recruitment, plan your training and implement your strategy. And for the first time in the Pro Cycling Manager series, you must look after your riders and their morale! One decision can change everything...
        </p>
        <br>
        <p>
            You must listen to the requests of your cyclists (inclusion in races, personal goals, etc.) and either agree to them or decline. You are the manager, only you can make the decisions that will maintain balance in your team and motivate your cyclists in crucial moments while trying to achieve the best results for your team.
        </p>
        <br>
        <p>
            You can also play as your own cyclist and pursue a career to the highest summits in the Pro Cyclist mode. Proved yourself in Career mode? Play online mode with up to 15 other players from all over the world.
        </p>
        <br>
        <p>   
            <b>NEW IN THE 2020 EDITION</b>
        </p>
        <br>
        <p>The 21 official stages of the Tour de France 2020
        </p>
        <br>
        <p>
            <b>Career mode:</b>
        </p>
        <br>
        <p>Manage the morale of your cyclists: they will make requests (inclusion in races, recruitment of cyclists, etc.), and your decision will affect their morale and performance. The transfer window is also crucial for maintaining balance within your team
        </p>
        <br>
        <p>Motivation during races: in each race, the motivation of your cyclists is linked to morale and key events, such as wearing a jersey, winning in the previous stage, etc. A fully motivated cyclist can excel in pivotal moments in the race, including an accelerating peloton and preparation for the final sprint
        </p>
        <br>
        <p>A new assistant to help you plan your races
        </p>
        <br>
        <p>A redesigned dashboard
        </p>
        <br>
        <p>Improved AI, more aggressive and adventurous
        </p> `,
    price: 19,
    image: "images/games/proCyclingManagerFull.jpg",
    thumb: "images/games/proCyclingManager.png",
    requirements: ` <p>
        Requires a 64-bit processor and operating system<br>
        <b>OS:</b> 64-bit Windows 7, Windows 8, Windows 10<br/>
        <b>Processor:</b> Intel Core i3-2100T @ 2.5GHz or AMD FX-4100 @3.6 GHz<br>
        <b>Memory:</b> 4 GB RAM<br/>
        <b>Graphics:</b> Nvidia Geforce GTX 650, AMD Radeon HD 7770 graphics card or better (min. 2 GB VRAM, DX11 support)<br/>
        <b>Network:</b> Broadband Internet connection<br/>
            <b>Storage:</b> 20 GB available space<br/>
        <b>Additional Notes:</b> INTERNET CONNECTION REQUIRED FOR THE ONLINE GAME<br/>
    </p>`,
    pegi: 3,
    productNumber: 23152545634,
  },
];
