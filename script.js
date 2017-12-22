$(document).ready(function(){
    
                        
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

            visaUnderkategorier = function(val) {
                console.log(val);

                var visaVilkenHuvudkategori = val;

                var listOfUnderkategorier;
                
                    fetch("./underkategorier.json")
                    .then(function(response) {
                        return response.json();
                    })
                    .then(function(underkategori) {
                    listOfUnderkategorier = underkategori; // listOfCountries contains all countries from the jsonfile
                    //console.log(listOfUnderkategorier);   
                   

                    for(var i = 0; i < listOfUnderkategorier.length; i++){
                        
                    if(listOfUnderkategorier[i].huvudkategori == visaVilkenHuvudkategori) {
                        $("#underkategorierna").append("<div class='underkategorival' onClick='visaProdukter("+ listOfUnderkategorier[i].id +")'>" + listOfUnderkategorier[i].underkategori + "</div>")
                    }
                    }
                    
                    });
                
            }

            visaProdukter = function(val) {
                console.log(val);
                var visaVilkenUnderkategori = val;

                var listOfprodukter;
                fetch("./produkter.json")
                .then(function(response) {
                    return response.json();
                })
                .then(function(produkter) {
                listOfprodukter = produkter; // listOfCountries contains all countries from the jsonfile
                //console.log(listOfprodukter);

                for(var i = 0; i < listOfprodukter.length; i++) {
                    if(listOfprodukter[i].underkategori == visaVilkenUnderkategori) {
                        $("#produkterna").append("<div class='produktval'>" + "<img class='produktbild' src='"+listOfprodukter[i].image+"'/>" + listOfprodukter[i].produktNamn + "</div>");
                        //$("#produkterna").append("<img class='produktbild' src='"+listOfprodukter[i].image+"'/>")
                        //$("#produkterna").append("<div class='produktval'>" + listOfprodukter[i].produktNamn + "</div>")
                        console.log(listOfprodukter[i].image);
                    }
                }

            });

            }  
                    
 });
    