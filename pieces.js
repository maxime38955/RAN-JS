import { ajoutListenersAvis } from "./avis.js";

// Récupération des pièces depuis le fichier JSON
const reponse = await fetch("pieces-autos.json");
const pieces = await fetch("pieces-autos.json").then(pieces => pieces.json());

const article = pieces[0];



// Fonction qui génère toute la page web
function genererPieces(pieces) {
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
const avisBouton = document.createElement("button");
avisBouton.dataset.id = article.id;
avisBouton.textContent = "Afficher les avis";

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

pieceElement.appendChild(avisBouton);


  }
  ajoutListenersAvis();
 
}
 
// Premier affichage de la page
genererPieces(pieces);


// Gestion des boutons
const boutonTrier = document.querySelector(".btn-trier-asc");

boutonTrier.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);

  piecesOrdonnees.sort(function (a, b) {
    return a.prix - b.prix;
  });
 // Effacement de l'écran et regénération de la page
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
  console.log(piecesOrdonnees);
});

// Gestion des boutons
const boutonTrierDesc = document.querySelector(".btn-trier-desc");

boutonTrierDesc.addEventListener("click", function () {
  const piecesOrdonnees = Array.from(pieces);

  piecesOrdonnees.sort(function (a, b) {
    return b.prix - a.prix;
  });
   // Effacement de l'écran et regénération de la page
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesOrdonnees);
  console.log(piecesOrdonnees);
});



const boutonFiltrer = document.querySelector(".btn-filtrer-non-abo");
boutonFiltrer.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= 35;
   });
    // Effacement de l'écran et regénération de la page
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
  console.log(piecesFiltrees);
});

const boutonFiltrerSan = document.querySelector(".btn-filtrer-sans-desc");

boutonFiltrerSan.addEventListener("click", function () {
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.description;
   });
     // Effacement de l'écran et regénération de la page
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
  console.log(piecesFiltrees);

});

//Liste nom des pieces
const noms = pieces.map(piece => piece.nom);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].prix > 35){
       noms.splice(i,1)
   }
}
console.log(noms)


//Création de la liste
const abordablesElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < noms.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = noms[i] ;
   abordablesElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.abordables')
   .appendChild(abordablesElements)


   //Liste nom des pieces
const nomsDisp = pieces.map(piece => piece.nom);
const prix = pieces.map(piece => piece.prix);
for(let i = pieces.length -1 ; i >= 0; i--){
   if(pieces[i].disponibilite == false){
       nomsDisp.splice(i,1)
       prix.splice(i,1)
   }
}


//Création de la liste
const disponibleElements = document.createElement('ul');
//Ajout de chaque nom à la liste
for(let i=0; i < nomsDisp.length ; i++){
   const nomElement = document.createElement('li');
   nomElement.innerText = `${nomsDisp[i]} - ${prix[i]}  € `;
   disponibleElements.appendChild(nomElement)
}
// Ajout de l'en-tête puis de la liste au bloc résultats filtres
document.querySelector('.disponible')
   .appendChild(disponibleElements)

 



const rngprixbar = document.querySelector(".rng-prix");
rngprixbar.addEventListener('input', function(){
   const piecesFiltrees = pieces.filter(function (piece) {
       return piece.prix <= rngprixbar.value;
   });
     // Effacement de l'écran et regénération de la page
  document.querySelector(".fiches").innerHTML = "";
  genererPieces(piecesFiltrees);
  console.log(piecesFiltrees);

});

