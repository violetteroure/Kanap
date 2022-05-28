
// Ici j'inclus dans une constante "url" l'ID du produit avec son adresse locale, en la rajoutant à la constante qui la contient, la const "id"

let params = window.location.href;
let url = new URL(params);
let idProduct = url.searchParams.get('id');
console.log(idProduct);
let article = "";
const colorChoose = document.querySelector("#colors");
const quantityChoose = document.querySelector("#quantity");

getArticle();

// Je récupère les données de l'API

function getArticle() {
    fetch("http://localhost:3000/api/products/" + idProduct)
        .then((res) => {
            return res.JSON();
        })

        // Je répartis les données de l'API dans le DOM
        .then(async function (resultatAPI) {
            article = await resultatAPI;
            console.table(article);
            if (article) {
                getPost(article);
            }
        })
        .catch((error) => {
            console.log("Erreur requête API");
        })
}

// Création de la fonction "product" et des variables nommées comme dans la page HTML pour chaque produit. La propriété innerHTML va m'aider à récupérer les valeurs qui se trouvent dans le fichier HTML.

function getPost(article) {

    let items = document.getElementById('title');
    items.innerHTML = product.name;

    let price = document.getElementById('price');
    price.innerHTML = product.price;

    let description = document.getElementById('description');
    description.innerHTML = product.description;

    let item = document.getElementById('imgId');
    let img = document.createElement('img');
    img.classList.add("productImg");
    img.src = product.imageUrl;
    img.alt = product.altTxt;
    document.querySelector(".item__img").appendChild(img);


    let colorSelection = document.getElementById('colors');
    product.colors.forEach(color => {
        const colorChoice = document.createElement('option');
        colorChoice.value = color;
        colorChoice.innerHTML = color;
        colorSelection.appendChild(colorChoice);
    });
}

let addToCart = document.getElementById('addToCart');
addToCart.addEventListener('click', function () {
    let details = {
        Id: id,
        Couleur: ("Couleur", document.getElementById('colors').value),
        Quantité: ("Quantité", document.getElementById('quantity').value),
        Nom: ("Nom", document.getElementById('title').innerHTML),
    }
    let informations = JSON.parse(localStorage.getItem(Kanap()));

    // S'il y a déjà au moins un article dans le panier : 
    if (informations) {
        const resultFind = informations.find(
            (el) => el.Id === id && el.Couleur === document.getElementById('colors').value);

        // Dans le cas où il y aurait déjà le même article dans le panier, on ajuste la quantité:

        if (resultFind) {
            let addQuantité =
                parseInt(details.Quantité) + parseInt(resultFind.Quantité);
            resultFind.Quantité = addQuantité;
            localStorage.setItem("Kanap", JSON.stringify(informations));

            // Dans le cas où le produit voulu n'est pas dans le panier:

        } else {
            informations.push(details);
            localStorage.setItem('Kanap', JSON.stringify(informations))
        }

        // Dans le cas où le panier serait vide :

    } else {
        informations = [],
            informations.push(details);
        localStorage.setItem(Kanap(), JSON.stringify(informations));
    }

    function Kanap() {
        return 'Kanap';
    }

    function Kanap() {
        return 'Kanap';
    }
})