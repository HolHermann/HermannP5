// Obtenir l'URL du produit sélectionné
let url = new URL(window.location.href);
let search_params = url.searchParams.get("id");
console.log(search_params);

const idProduit = search_params;
const apiProduit = `http://localhost:3000/api/products/${idProduit}`;
console.log(apiProduit);
const produitCouleurs = document.querySelector("#colors");
const produitTitre = document.querySelector("#title");
const produitPrix = document.querySelector("#price");
const produitImage = document.querySelector(".item__img");
const produitDescription = document.querySelector("#description");
const produitButton = document.querySelector("#addToCart");

const recupProduit = async () => {
  const reponse = await fetch(apiProduit).catch((error) => {
    console.log("Erreur de connexion avec l'API", error);
  });
  const produit = await reponse.json().catch((error) => {
    console.log("Erreur : Impossibilité de récupérer les produits", error);
  });
  return produit;
};

const afficherProduit = (produit) => {
  produitImage.innerHTML = `<img src="${produit.imageUrl}" alt="${produit.altTxt}">`;
  produitTitre.innerHTML = produit.name;
  produitPrix.innerHTML = produit.price;
  produitDescription.innerHTML = produit.description;
  produit.colors.map((color) => {
    produitCouleurs.innerHTML += `<option value="${color}">${color}</option>`;
  });
};
const ajoutPanier = (produit) => {
  // On attend le click de l'utilisateur pour ajouter le canapé dans le panier
  produitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const quantite = parseInt(document.getElementById("quantity").value);
    const couleur = document.getElementById("colors").value;
    if (quantite == 0 || couleur == "") {
      alert("Merci de saisir une quantité et de choisir une couleur");
    } else {
      const canapeChoisi = {
        id: produit._id,
        title: produit.name,
        price: produit.price,
        imageUrl: produit.imageUrl,
        quantity: quantite,
        color: couleur,
      };
      console.log(canapeChoisi);
      // On récupère le panier dans le localStorage. S'il n'y a pas de panier ou l'initialise
      let panier = JSON.parse(localStorage.getItem("panier"));
      if (panier === null) {
        panier = [];
      }

      // On parcour l'ensemble de panier pour vérifier si le canapé choisi est présent
      let articleExiste = 0;
      panier.forEach((canapePanier) => {
        // Si on trouve le canapé, on augmente le prix et la quantité de celui-ci
        if (
          canapePanier.id === canapeChoisi.id &&
          canapePanier.color === canapeChoisi.color
        ) {
          canapePanier.quantity += quantite;
          canapePanier.price += canapeChoisi.price;
          articleExiste = 1;
        }
      });

      // Si on ne trouve pas le canapé, on l'insère dans le panier
      if (articleExiste === 0) {
        panier.push(canapeChoisi);
      }

      // On enregistre la mise à jour du panier dans le localStorage
      localStorage.setItem("panier", JSON.stringify(panier));
      alert("Panier mis à jour ! ");
      redirectionAuPanier();
    }
  });
};
function redirectionAuPanier() {
  // On créait une alerte lorsque l'utilisateur ajoute un canapé dans le panier
  if (
    window.confirm(
      "Votre canapé été ajouté au panier. Pour le consulter, cliquez sur OK."
    )
  ) {
    window.location.href = "cart.html";
  }
}

(async () => {
  const produit = await recupProduit();
  afficherProduit(produit);
  ajoutPanier(produit);
})();
