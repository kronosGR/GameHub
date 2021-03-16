const LOGGED_IN_USER_LOC = "loggedInUser";
const USERS_LOC = "users";

const accountAnchor = document.querySelector("#a-account");
const loginAnchor = document.querySelector("#a-login");
const cartCircle = document.querySelector("#cart-circle");

const storage = window.localStorage;
let loggedInUser;

// run with every page
window.onload = function () {
  const url = window.location.href;
  const params = new URLSearchParams(window.location.search);
  const logout = params.get("logout") || "false";

  if (logout == "true") {
    logoutUser();
  }

  loggedInUser = getLoggedInUser();

  if (!url.includes("login") && !url.includes("create-account")) {
    if (loggedInUser == null) {
      accountAnchor.innerHTML = "CREATE ACCOUNT";
      accountAnchor.href = "create-account.html";
      loginAnchor.innerHTML = "LOG IN";
      loginAnchor.href = "login.html";
    } else {
      accountAnchor.innerHTML = loggedInUser.firstName || "Account";
      accountAnchor.href = "account.html";
      loginAnchor.innerHTML = "LOG OUT";
      loginAnchor.href = "index.html?logout=true";
    }
    // get the cart items and update the circle
    updateCart();
  }

};

/**
 * update the cart circle with the cart items
 */
function updateCart(){
  let cartItemsLength = getCartItemsAmount();
  cartCircle.innerHTML = cartItemsLength;
}

/**
 * stores to local storage the logged in user
 * @param {Object} user
 */
function login(user) {
  storage.setItem(LOGGED_IN_USER_LOC, JSON.stringify(user));
  loggedInUser = user;
}

/**
 * get the logged in user
 * @return {object} user
 */
function getLoggedInUser() {
  return JSON.parse(storage.getItem(LOGGED_IN_USER_LOC)) || null;
}

/**
 * user logout
 */
function logoutUser() {
  storage.setItem(LOGGED_IN_USER_LOC, JSON.stringify(null));
}

/**
 * get the user
 * @param {string} email
 * @param {string} password
 * @return {object} user
 */
function getUser(email, password) {
  const users = JSON.parse(storage.getItem(USERS_LOC)) || null;
  if (users == null) return null;

  for (let us of users) {
    if (us.email === email && us.password === password) {
      return us;
    }
  }

  return null;
}

// shopping cart object

function ShoppingCartItem(game, amount=1){
  this.game = game;
  this.amount = amount;
}

// User object
function User(
  firstName,
  lastName,
  email,
  password,
  address = "",
  telephone = "",
  city = "",
  postalCode = "",
  country = "",
  notNewArrivals = true,
  notUsedGames = true,
  notSoldGames = true,
  notWithEmail = true,
  notWithSms = true
) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.password = password;
  this.address = address;
  this.telephone = telephone;
  this.city = city;
  this.postalCode = postalCode;
  this.country = country;
  this.notNewArrivals = notNewArrivals; // notifications all the above
  this.notUsedGames = notUsedGames;
  this.notSoldGames = notSoldGames;
  this.notWithEmail = notWithEmail;
  this.notWithSms = notWithSms;
}

// Game object
function Game(
  id,
  title,
  genre,
  price,
  image,
  about = "",
  requirements = "",
  pegi = 18
) {
  this.id = id;
  this.title = title;
  this.genre = genre;
  this.price = price;
  this.image = image;
  this.about = about;
  this.requirements = requirements;
  this.pegi = pegi;
}
