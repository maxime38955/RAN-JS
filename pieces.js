// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await reponse.json();

const article = pieces[0];



for (let i = 0; i < pieces.length; i++) {
 
// Récupération de l'élément du DOM qui accueillera les fiches
const sectionFiches = document.querySelector(".fiches");
// Création d’une balise dédiée à une pièce automobile
const pieceElement = document.createElement("article");
// On crée l’élément img.
const imageElement = document.createElement("img");
const nomElement = document.createElement("h2");
const prixElement = document.createElement("p");
const categorieElement = document.createElement("p");
const descriptionElement = document.createElement("p");
const disponibiliteElement = document.createElement("p");
// On accède à l’indice i de la liste pieces pour configurer la source de l’image.
imageElement.src = pieces[i].image;
nomElement.innerText = pieces[i].nom;
prixElement.innerText = `Prix: ${pieces[i].prix} € (${pieces[i].prix < 35 ? "€" : "€€€"})`;
categorieElement.innerText = pieces[i].categorie;
descriptionElement.innerText = pieces[i].description;
disponibiliteElement.innerText = `${pieces[i].disponibilite == true ? "En stock" : "En rupture de stock"}`;

// On rattache la balise article à la section Fiches
sectionFiches.appendChild(pieceElement);

pieceElement.appendChild(imageElement);
pieceElement.appendChild(nomElement);
pieceElement.appendChild(prixElement);
pieceElement.appendChild(categorieElement);
pieceElement.appendChild(descriptionElement);
pieceElement.appendChild(disponibiliteElement);






 
}


// Gestion des boutons
const boutonTrier = document.querySelector(".btn-trier-asc");

boutonTrier.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);

  piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });

  console.log(piecesOrdonnees);
});

// Gestion des boutons
const boutonTrierDesc = document.querySelector(".btn-trier-desc");

boutonTrierDesc.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);

  piecesOrdonnees.sort(function (a, b) {
    return b.prix - a.prix;
  });

  console.log(piecesOrdonnees);
});



const boutonFiltrer = document.querySelector(".btn-filtrer-non-abo");
boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
  console.log(piecesFiltrees);
});

const boutonFiltrerSan = document.querySelector(".btn-filtrer-sans-desc");

boutonFiltrerSan.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.description;
   });
  console.log(piecesFiltrees);

});



