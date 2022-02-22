function confirmationCommande() {
  let url = new URL(window.location.href);
  let search_params = url.searchParams.get("id");
  let idCommande = document.querySelector("#orderId");
  idCommande.innerHTML = search_params;
}

confirmationCommande();
