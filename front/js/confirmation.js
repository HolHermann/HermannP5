function confirmationCommande() {
  // Après avoir supprimer les données du local Storage, on donne l'ID du client
  const idCommande = document.querySelector("#orderId");
  idCommande.innerHTML = localStorage.getItem("orderId");
  localStorage.clear();
}

confirmationCommande();
