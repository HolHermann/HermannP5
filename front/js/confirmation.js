function confirmationCommande() {
  // Après avoir supprimer les données du local Storage, on donne l'ID du client
  const idCommande = document.querySelector("#orderId");
  idCommande.innerHTML = localStorage.getItem("orderId");
  localStorage.clear();
}

confirmationCommande();

/*
let url = new URL(window.location.href);
let search_params = url.searchParams.get("id");
console.log(search_params);

const idCommande = search_params;
const commande = `http://localhost:3000/api/products/order/${idCommande}`;
console.log(commande);
*/
