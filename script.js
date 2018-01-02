$(document).ready(function(){
    $("#underkategorierna").hide();
    $("#produktSida").hide();
                        
        var listOfHuvudkategorier;
                        
        fetch("./huvudkategorier.json")
        .then(function(response) {
        return response.json();
        })
        .then(function(huvudkategorier) {
        listOfHuvudkategorier = huvudkategorier; // listOfCountries contains all countries from the jsonfile
        //console.log(listOfHuvudkategorier);   
        //console.log(listOfCountries.sort());

            loopaHuvudkategorier();
        });

             function loopaHuvudkategorier() {

                $("#meny").append("<div class='menyval'>" + "Start" + "</div>");
                $("#meny").append("<div class='menyval'>" + "Info" + "</div>");

                for(var i = 0; i < listOfHuvudkategorier.length; i++){
                    $("#meny").append("<div class='menyval' onClick='visaUnderkategorier("+ listOfHuvudkategorier[i].id +")'>" + listOfHuvudkategorier[i].huvudkategori + "</div>");
                    }
                    $("#meny").append("<div class='menyval'>" + "Kontakt" + "</div>");
                    $("#meny").append("<div class='menyval'>" + "Kundvagn" + "</div>");                
            }
            $("#underkategorierna").show();

            visaUnderkategorier = function(val) {
                //console.log(val);

                var visaVilkenHuvudkategori = val;

                var listOfUnderkategorier;
                
                    fetch("./underkategorier.json")
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(underkategori) {
                    listOfUnderkategorier = underkategori; // listOfCountries contains all countries from the jsonfile
                    //console.log(listOfUnderkategorier);   
                    $("#underkategorierna").html(" ");

                    for(var i = 0; i < listOfUnderkategorier.length; i++){
                        
                    if(listOfUnderkategorier[i].huvudkategori == visaVilkenHuvudkategori) {
                        $("#underkategorierna").append("<div class='underkategorival' onClick='visaProdukter("+ listOfUnderkategorier[i].id +")'>" + listOfUnderkategorier[i].underkategori + "</div>");
                    }
                    }
                    
                    $("#underkategorierna").show();
                    $("#produktSida").hide();

                    });
                
            }

            visaProdukter = function(val) {
                //console.log(val);
                var visaVilkenUnderkategori = val;

                var listOfprodukter;
                fetch("./produkter.json")
                .then(function(response) {
                    return response.json();
                })
                .then(function(produkter) {
                listOfprodukter = produkter; // listOfCountries contains all countries from the jsonfile
                //console.log(listOfprodukter);
                $("#produktSida").hide();

                $("#produkterna").html(" ");

                for(var i = 0; i < listOfprodukter.length; i++) {
                    if(listOfprodukter[i].underkategori == visaVilkenUnderkategori) {
                        $("#produkterna").append("<div class='produktval' onClick='visaProdukt("+ listOfprodukter[i].id +")'>" + "<img class='produktbild' src='"+listOfprodukter[i].image+"'/>" + listOfprodukter[i].produktNamn + "</div>");
                        //$("#produkterna").append("<img class='produktbild' src='"+listOfprodukter[i].image+"'/>")
                        //$("#produkterna").append("<div class='produktval'>" + listOfprodukter[i].produktNamn + "</div>")
                        //console.log(listOfprodukter[i].image);
                    }
                }
                $("#produkterna").show();

                visaProdukt = function(val) {
                    $("#produktSida").html(" ");
                    console.log(val);
                var visaVilkenProdukt = val;
                    $("#produkterna").hide();
                for(var i = 0; i < listOfprodukter.length; i++){
                    if(listOfprodukter[i].id == visaVilkenProdukt){
                        $("#produktSida").append("<div class='helaProduktSidan'>" + "<img class='produktSidaBild' src='"+listOfprodukter[i].image+"'>" + "<p>" + listOfprodukter[i].produktNamn +"</p>" + "<p>" + listOfprodukter[i].produktBeskrivning + "</p>" + "<p>" + listOfprodukter[i].produktPris+ "</p>" + "<button onClick='addToCart("+ listOfprodukter[i].id +")'>" + "Lägg till i varukorgen" + "</button>" + "</div>");
                    }
                }

                $("#produktSida").show();

                addToCart = function(val) {
                    console.log(val);
                }

                }

            });

            }  
                    
 });
    