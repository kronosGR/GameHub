// using the games[] the site creates the lists in the frontpage.

const previewLists = document.querySelectorAll(".preview-list");
for (let i = 0; i < previewLists.length; i++) {
  
  for (let game of games){
    previewLists[i].innerHTML += `
    <a href="game.html?id=${game.id}" class="preview-list-item">     
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

/**
 * get PEGI img
 * @param {number} pegi
 * @return {string} pegi img address and filename
 */
function getPegiImg(pegi){
  switch(pegi){
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

