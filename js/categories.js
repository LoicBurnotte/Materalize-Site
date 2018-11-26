// READ CATEGORIES and JOKES
$(document).ready(function () {
    // affiche les catégories 

    $.ajax({
        url: "json/categories.json",
        dataType: "JSON",
        method: "GET",
        success: function(data){
            for(let elem of data.Categorie){
                $("#categories").append(`
                <li class="tab col s3" data-target="${elem.Id}"><a href="#test-swipe-${elem.Id}">${elem.Nom}</a></li>
                `);				
            }
        }
    });

    // affichage des blagues de la catégorie sélectionnée
    $("#categories").on("click", "li", function (e) {
        e.preventDefault();
        targetedID = $(this).attr("data-target");
        $.ajax({
            url: "json/blagues.json",
            dataType: 'json',
            method: "GET",
            success: function (data) {
                $("#categorie").empty();
                $("#categorie").append('<div id="test-swipe-' + targetedID + '" class="col s12 red lighten-4">'); // + data.Blague[targetedID].Categorie.Nom
                for (let elem of data.Blague) {
                    if(elem.Categorie.Id == targetedID){
                        $("#test-swipe-" + targetedID).append(`
                            <h5>${elem.Titre}</h5>
                            <p>${elem.Contenu}</p>
                            <p><strong><i>${elem.Auteur.Prenom} ${elem.Auteur.Nom}</i></strong></p>
                            <p>${elem.Date.Jour} - ${elem.Date.Mois} - ${elem.Date.Annee}.</p>
                            <br><hr>
                        `);
                     }else{
                        $("#test-swipe-" + elem.Categorie.Id).hide();
                     }
                }
                $("#categorie").append(`</div>`);              
            },
            error: function (xhr) {
                console.log("ERROR" + xhr);
            }
        });
    });
});