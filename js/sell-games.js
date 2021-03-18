const form = document.querySelector("#sell-form");
const gameTitle = document.querySelector("#game-title");
const purchaseDate = document.querySelector("#purchase-date");
const uploadPhoto = document.querySelector("#upload-photo");
const updatedMsg = document.querySelector("#updated-msg");

gameTitle.addEventListener("blur", () => {
  const error = document.querySelector("#error-title");
  if (gameTitle.value.length > 3) hideError(error);
  else showError(error);
});

purchaseDate.addEventListener("blur", () => {
  const error = document.querySelector("#error-date");
  if (regDate.test(purchaseDate.value)) hideError(error);
  else showError(error);
});

uploadPhoto.addEventListener("blur", () => {
  const error = document.querySelector("#error-photo");
  if (regImage.test(uploadPhoto.value)) hideError(error);
  else showError(error);
});

form.addEventListener("submit", (evt) => {
  evt.preventDefault();

  showMsg(updatedMsg);
  gameTitle.value = "";
  purchaseDate.value = "";
  uploadPhoto.value = "";
  document.querySelector("#imp-info").value = "";
});
