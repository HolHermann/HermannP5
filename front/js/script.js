class Kanap {
  constructor(kanapItemps) {
    Object.assign(this, kanapItemps);
  }
}

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (elementsAPI) {
    for (let elementAPI of elementsAPI) {
      let item = new Kanap(elementAPI);
      document.getElementById(
        "items"
      ).innerHTML += `<a href="./product.html?id=${item._id}">
                <article>
                  <img src="${item.imageUrl}" alt="${item.altTxt}">
                  <h3 class="productName">${item.name}</h3>
                  <p class="productDescription">${item.description}</p>
                </article>
              </a>`;
    }
  })
  .catch(function (err) {
    console.alert("Une erreur est survenue");
  });
