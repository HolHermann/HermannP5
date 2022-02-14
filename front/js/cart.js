const panierProduits = document.querySelector("#cart__items");
const panierQuantites = document.querySelector("#totalQuantity");
const panierPrix = document.querySelector("#totalPrice");

let panier = JSON.parse(localStorage.getItem("panier"));
console.log(`Le panier : ${panier}`);
let prixPanier = 0;
let quantiteCanape = "";

function affichePanier() {
  panier.map((product) => {
    prixPanier += product.price * product.quantity;
    quantiteCanape += product.quantity;
    panierProduits.innerHTML += `
            <article class="cart__item" data-id="${product.id}" data-color="${product.color}">
                <div class="cart__item__img">
                    <img src="${product.imageUrl}" alt="${product.altTxt}">
                </div>
                <div class="cart__item__content">
                    <div class="cart__item__content__description">
                    <h2>${product.title}</h2>
                    <p>${product.color}</p>
                    <p>${product.price},00 €</p>
                    </div>
                    <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                        <p>Qté : </p>
                        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
                    </div>
                    <div class="cart__item__content__settings__delete">
                        <p class="deleteItem" >Supprimer</input>
                    </div>
                    </div>
                </div>
            </article>            
        `;
  });
  panierQuantites.innerHTML = quantiteCanape;
  panierPrix.innerHTML = prixPanier;
}

function ajouterItems() {
  // Fonction pour ajouter un canapé dans le panier
  let quantiteCanape = document.getElementsByClassName("itemQuantity");
  for (let i = 0; i < quantiteCanape.length; i++) {
    quantiteCanape[i].addEventListener("input", (event) => {
      panier[i].quantity = event.target.value; // On insère la nouvelle valeur
      localStorage.setItem("panier", JSON.stringify(panier)); // On insère la nouvelle valeur dans le local Storage
      window.location.reload(); // Pour recharger la page
    });
  }
}

function supprimerItems() {
  // Fonction pour supprimer un canapé dans le panier
  let suppressionItem = document.getElementsByClassName("deleteItem");
  for (let i = 0; i < suppressionItem.length; i++) {
    suppressionItem[i].addEventListener("click", () => {
      if (suppressionItem.length > 1) {
        // On vérifie s'il reste seulement 1 item pour supprimer la colonne
        panier.splice(i, 1); // Sur l'emplacement n°i, on supprime 1 item
        localStorage.setItem("panier", JSON.stringify(panier)); // On met a jour la local Storage
        window.location.reload(); // On recharge la page
      } else {
        // S'il reste seulement 1 item, on supprime le panier
        localStorage.removeItem("panier");
        redirectionAcceuil();
      }
    });
  }
}
function redirectionAcceuil() {
  // On créait une alerte lorsque le panier est vide pour le rediriger sur la page d'acceuil
  if (
    window.confirm(
      "Votre panier est vide. Cliquez sur OK pour retourner sur le catalogue."
    )
  ) {
    window.location.href = "index.html";
  }
}
affichePanier();
supprimerItems();
ajouterItems();

function envoiFormulaire() {
  let boutonCommander = document.getElementById("order");
  boutonCommander.addEventListener("click", (event) => {
    event.preventDefault();

    const client = {
      prenom: document.getElementById("firstName").value,
      nom: document.getElementById("lastName").value,
      adresse: document.getElementById("address").value,
      ville: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    function prenomClient() {
      // On test la validation pour le prénom du client
      const testPrenom = client.prenom;
      let regexPrenom = /^[A-Z][A-Za-z\é\è\ê\ï\ç\-]{2,20}$/.test(testPrenom);
      if (regexPrenom) {
        document.querySelector("#firstNameErrorMsg").innerHTML = "";
        return true;
      } else {
        let erreurPrenom = document.getElementById("firstNameErrorMsg");
        erreurPrenom.innerHTML =
          "Votre prénom doit contenir entre 2 et 20 caractères. Uniquement des lettres.";
      }
    }

    function nomClient() {
      // On test la validation pour le nom de famille du client
      const testNom = client.nom;
      let regexNom = /^[A-Z][A-Za-z\é\è\ê\ï\ç\-]{2,20}$/.test(testNom);
      if (regexNom) {
        document.querySelector("#lastNameErrorMsg").innerHTML = "";
        return true;
      } else {
        let erreurNom = document.getElementById("lastNameErrorMsg");
        erreurNom.innerHTML =
          "Votre nom doit contenir entre 2 et 20 caractères. Uniquement des lettres.";
      }
    }

    function adresseClient() {
      // On test la validation pour l'adresse du client
      const testAdresse = client.adresse;
      let regexAdresse =
        /^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+/.test(
          testAdresse
        );
      if (regexAdresse) {
        document.querySelector("#addressErrorMsg").innerHTML = "";
        return true;
      } else {
        let erreurAdresse = document.getElementById("addressErrorMsg");
        erreurAdresse.innerHTML = "L'adresse postale saisie est invalide.";
      }
    }

    function villeClient() {
      // On test la validation pour la ville du client
      const testVille = client.ville;
      let regexVille =
        /^[a-zA-Zàâäéèêëïîôöùûüç]+(?:[- ][a-zA-Zàâäéèêëïîôöùûüç]+)*$/.test(
          testVille
        );
      if (regexVille) {
        document.querySelector("#cityErrorMsg").innerHTML = "";
        return true;
      } else {
        let erreurVille = document.getElementById("cityErrorMsg");
        erreurVille.innerHTML = "La ville saisie est invalide.";
      }
    }

    function emailClient() {
      // On test la validation pour l'email du client
      const testEmail = client.email;
      let regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
        testEmail
      );
      if (regexEmail) {
        document.querySelector("#emailErrorMsg").innerHTML = "";
        return true;
      } else {
        let erreurEmail = document.getElementById("emailErrorMsg");
        erreurEmail.innerHTML = "L'email saisi est invalide.";
      }
    }

    function formValidation() {
      // On vérifie la validité du formulaire
      if (
        prenomClient() === true &&
        nomClient() === true &&
        adresseClient() === true &&
        villeClient() === true &&
        emailClient() === true
      ) {
        // On créait une section client dans le formulaire
        localStorage.setItem("client", JSON.stringify(client));
        return true;
      } else {
        event.preventDefault();
        alert("Merci de remplir correctement le formulaire.");
      }
    }
    let panier2 = JSON.parse(localStorage.getItem("panier"));
    formValidation();

    if (formValidation() === true) {
      const commande = {
        client,
        panier2,
      };
      console.log(client);
      console.log(panier2);
      console.log(commande);
      console.log("test");
      fetch("http://localhost:3000/api/products/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(commande),
      })
        .then((response) => response.json())

        .then((commandeFinal) => {
          console.log(commandeFinal);
          //localStorage.clear();
          localStorage.setItem("orderId", commandeFinal.orderId);
          //document.location.href = "confirmation.html";
        })
        .catch((error) => console.log(error));
    } else {
      event.preventDefault();
    }
  });
}
envoiFormulaire();
