const urlApi = "http://localhost:3000/api/products";
const items = document.querySelector("#items");

// On récupère les données de l'API qui nous permettrons d'afficher les canapés sur la page
const recupKanap = async () => {
  const checkAPI = await fetch(urlApi).catch((error) => {
    console.log("Erreur de connexion avec l'API", error);
  });
  const Kanap = await checkAPI.json().catch((error) => {
    console.log("Impossibilité de récupérer les canapés", error);
  });
  return Kanap;
};

// On affichage les canapés sur la page
const affichageKanap = (Kanaps) => {
  Kanaps.map((Kanap) => {
    items.innerHTML += `<a href="product.html?id=${Kanap._id}">
                <article>
                  <img src="${Kanap.imageUrl}" alt="${Kanap.altTxt}">
                  <h3 class="produitName">${Kanap.name}</h3>
                  <p class="produitDescription">${Kanap.description}</p>
                </article>
            </a>`;
  });
};

(async () => {
  const Kanap = await recupKanap();
  // On attend le résultat de la fonction recupKanap avant d'éxécuter la fonction affichageKanap
  affichageKanap(Kanap);
})();
