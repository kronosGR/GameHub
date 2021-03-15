const section = document.querySelector(".main-content section");
const title = document.querySelector(".title");

const params = new URLSearchParams(window.location.search);
const search = params.get("searchfor") || null;
console.log(search)

if (!search){
  title.innerHTML = "Search Results";
  section.innerHTML = "<h2>Please specify a keyword to search</h2>"
  section.style.height = "100px";
  section.style.textAlign = "center";
  section.style.padding = "30px";
} else {
  title.innerHTML = `Search Results - ${search}`;
  const results = searchGamesWithKeyword(search);

  
}