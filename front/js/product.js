/* - Faire une fonction qui attend le click de la souris 
- Trouver l'ID 
- Afficher l'items 
*/
/*document.getElementById("items").addEventListener("click", function (e) {
  console.log(e.target.value);
});
*/
let url = new URL(window.location.href);
let search_params = url.searchParams.get("id");
console.log(url);
console.log(search_params);

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (search_params) {
    /*document.getElementById(
      "item__img"
    ).innerHTML = `<img src="${search_params.imageUrl}" alt="${search_params.altTxt}">`;*/
  })
  .catch(function (err) {
    console.log();
    ("Une erreur est survenue");
  });
