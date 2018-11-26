// CRUD à faire 

$(document).ready(function () {
    //DATATABLE
    let table = $('#myTable').DataTable();
    let targetedID;

    $.ajax({
        url: "json/blagues.json",
        dataType: 'JSON',
        method: "GET",
        success: function (data) {
            for (let elem of data.Blague) {
                let id = elem.Id;
                let titre = elem.Titre;
                let contenu = elem.Contenu;
                let categorie = elem.Categorie.Nom;
                let auteur = elem.Auteur.Prenom + " " + elem.Auteur.Nom;
                let date = elem.Date.Jour + "/" + elem.Date.Mois + "/" + elem.Date.Annee;
                $("tbody").append("<tr class='odd tr" + id + "' role='row'>");
                $(".tr" + id).append("<td class='sorting_1'>" + titre + "</td>");
                $(".tr" + id).append('<td><div class="bio"><p class="resume">' + contenu + '</p><p class="content cache">' + contenu + '</p></div></td>');
                $(".tr" + id).append("<td>" + categorie + "</td>");
                $(".tr" + id).append("<td>" + auteur + "</td>");
                $(".tr" + id).append("<td>" + date + "</td>");
                $(".tr" + id).append('<td><a href="' + "/edit/" + id + '"><i class="material-icons icon-blue">edit</i></a></td>');
                $(".tr" + id).append('<td><a href="' + "/delete/" + id + '"><i class="material-icons red-text">delete</i></a></td>');
                $("tbody").append("</tr>");
                let row = $(".tr" + id);
                table.row.add(row).draw();
                // console.log(id + " - " + titre + " - " + contenu + " - " + categorie + " - " + auteur + " - " + date);
            }
        },
        error: xhr => { console.log(xhr); }
    });
    $("body").on("click", ".bio", null, function(){
        $(this).find(".resume").toggleClass("cache");
        $(this).find(".content").toggleClass("cache");
    });

    // SELECT - Options - CATEGORIES BLAGUES
    $.ajax({
        url: "json/categories.json",
        method: "GET",
        dataType: "JSON",
        success: function (data) {
            for (let elem of data.Categorie) {
                $("#selectCategory").append(`
                        <option value="${elem.Id}">${elem.Nom}</options>
                    `);
            }
        },
        error: xhr => { console.log(xhr); }
    });

    // TODO => terminer CRUD vers DB (aucun accès à une DB actuellement -> car il s'agit ici d'une simulation avec comme donnée : 2 fichiers JSON)
    // $("#selectCategory").change(function(event){
    //     $.ajax({
    //         url: "json/blagues.json" + $(this).val(),
    //         dataType: "JSON",
    //         method: "GET",
    //         success: data => {
    //             $("#brasserie").empty();
    //             for(let elem of data){
    //                 console.log(elem);
    //                 $("#brasserie").append(`
    //                     <li data-target="${elem.id}">${elem.nomBrasserie}</li>
    //                 `);
    //             }
    //         }
    //     });
    // });

    // REMPLISSAGE DU MODAL pour l'Editer
    // $(".edit").on("click", "li", function(e){
    //     e.preventDefault();
    //     targetedID = $(this).attr("data-target");
    //     $.ajax({
    //         url: "http://localhost/tbws/web/app_dev.php/api/brasserie/" + targetedID,
    //         method: "GET",
    //         success: function(data){
    //             $("select[name=pays] option").attr("selected", false);
    //             $("input[name=nomBrasserie]").val(data.nomBrasserie);
    //             $("input[name=adresse]").val(data.adresse);
    //             $("select[name=pays] option[value=" + data.pays.id + "]").attr("selected", true);
    //         },
    //         error: function(xhr){
    //             console.log("error" + xhr);
    //         }
    //     });
    // });

    // $.ajax({
    //     url: "admin/read",
    //     datatype: 'json',
    //     success: function(data) {
    //         console.log(data);
    // // ------------------------------------------------------- TABLE BLAGUES --------------------------------------------------------
    //         let events = data.event;
    //         for(i=0; i < events.length; i++){
    //             $("tbody").append('<tr class="odd tr"' + i + '" role="row">');
    //             $(".tr"+ i).append("<td>" + events[i].title + "</td>");
    //             $(".tr"+ i).append("<td>" + events[i].date + "</td>");
    //             $(".tr"+ i).append("<td>" + events[i].description + "</td>");
    //             $(".tr"+ i).append("<td>" + events[i].user.username + "</td>");
    //             $(".tr"+ i).append("<td>" + events[i].dateCreation + "</td>");
    //             $(".tr"+ i).append('<td><a href="' + "/edit/event/" + targetedID  + '"><i class="material-icons icon-blue">edit</i></a></td>');
    //             $(".tr"+ i).append('<td><a href="' + "/delete/event/" + targetedID  + '"><i class="material-icons icon-red">delete</i></a></td>');
    //             $("tbody").append("</tr>");
    //             let row = $(".tr" + i);
    //         }
    //         tableEvents.row.add(row).draw();
    //     },error: xhr => {console.log("error" + xhr);}
    // });
    // });


    // let targetedID;
    // $.get("http://localhost/tbws/web/app_dev.php/api/categorie", function (data) {
    //     for (let item of data) {
    //         $("select[name=categorie]").append(`
    //             <option value="${item.id}">${item.nomCategorie}</option>
    //         `);
    //     }
    // });

    // $.get("http://localhost/tbws/web/app_dev.php/api/brasserie", function (data) {
    //     for (let item of data) {
    //         $("select[name=brasserie]").append(`
    //             <option value="${item.id}">${item.nomBrasserie}</option>
    //         `);
    //     }
    // });
    // $("#send").click(function (e) {
    //     e.preventDefault();
    //     if (targetedID !== undefined) {
    //         // $(this).prev('#selectCategory').val();
    //         let form = $("#biere").serialize();
    //         console.log($("#biere").serialize());
    //         $.ajax({
    //             url: "http://localhost/tbws/web/app_dev.php/api/biere/" + targetedID,
    //             method: "PUT",
    //             data: form,
    //             dataType: "JSON",
    //             success: function (data) {
    //                 console.log(data);
    //                 alert("success");
    //                 $("li[data-target=" + targetedID + "]").html(data.nom);
    //             }, error: xhr => { console.log("error" + xhr); }
    //         });
    //     } else {
    //         let form = new FormData($("#biere")[0]);
    //         $.ajax({
    //             url: "http://localhost/tbws/web/app_dev.php/api/biere",
    //             method: "POST",
    //             data: form,
    //             dataType: "JSON",
    //             cache: false,
    //             contentType: false,
    //             processData: false,
    //             success: data => {
    //                 console.log(data);
    //             }, error: xhr => { console.log("error" + xhr); }
    //         });
    //     }
    // });
    // $("#new").click(function (e) {
    //     e.preventDefault();
    //     targetedID = undefined;
    //     $("input").val('');
    // });
    // $("#delete").click(function (e) {
    //     e.preventDefault();
    //     console.log(targetedID);
    //     $.ajax({
    //         url: "http://localhost/tbws/web/app_dev.php/api/biere/" + targetedID,
    //         dataType: "JSON",
    //         method: "DELETE",
    //         success: (data) => {
    //             console.log(data);
    //             if (data) {
    //                 alert("success");
    //                 $("li[data-target=" + targetedID + "]").remove();
    //                 targetedID = undefined;
    //             } else {
    //                 alert("error");
    //             }
    //         },
    //         error: xhr => { console.log("error" + xhr); }
    //     });
    // });

    // $.ajax({
    //     url: "http://localhost/tbws/web/app_dev.php/api/brasserie",
    //     dataType: "JSON",
    //     method: "GET",
    //     success: function (data) {
    //         for (let elem of data) {
    //             $("#listeBrasseries").append(`
    //                 <li data-target="${elem.id}">${elem.nomBrasserie}</li>
    //             `);
    //         }
    //     }
    // });
});
