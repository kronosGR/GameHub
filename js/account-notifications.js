const newArrivals = document.querySelector("#new-arrivals");
const usedGames = document.querySelector("#used-games");
const soldGames = document.querySelector("#sold-games");
const withEmail = document.querySelector("#with-email");
const withSms = document.querySelector("#with-sms")
const form = document.querySelector("#notification-form");
const updatedMsg = document.querySelector("#updated-msg");

const user = getLoggedInUser();

newArrivals.checked = user.notNewArrivals;
usedGames.checked = user.notUsedGames;
soldGames.checked = user.notSoldGames;
withEmail.checked = user.notWithEmail;
withSms.checked = user.notWithSms;

form.addEventListener("submit", (evt) => {  
  evt.preventDefault();
  user.notNewArrivals = newArrivals.checked;
  user.notUsedGames = usedGames.checked;
  user.notSoldGames = soldGames.checked;
  user.notWithEmail = withEmail.checked;
  user.notWithSms = withSms.checked;

  updateUserKey(user.email, "notNewArrivals", newArrivals.checked);
  updateUserKey(user.email, "notUsedGames", usedGames.checked);
  updateUserKey(user.email, "notSoldGames", soldGames.checked);
  updateUserKey(user.email, "notWithEmail", withEmail.checked);
  updateUserKey(user.email, "notWithSms", withSms.checked);
  logoutUser();
  login(user);

  updatedMsg.innerHTML = "Account updated!";
  showMsg(updatedMsg);
})
