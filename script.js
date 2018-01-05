$(document).ready(function(){
    $("#underkategorierna").hide();
    $("#produktSida").hide();
    $(".popupSkapaInlogg").hide();

    var varukorg = [];


    //FETCHA KUNDER
    
    var listOfKunder;
    
        fetch("./kunder.json")
        .then(function(response) {
        return response.json();
        })
        .then(function(kunder) {
        listOfKunder = kunder;
        console.log(listOfKunder);
    });

    

    $(".button2").hide();
        
        if (sessionStorage.username!= null) {//om nån är inne
            inloggad();
        } else {

            $(".button").click(function(){
                console.log("hejhej");
                for(var i = 0; i < listOfKunder.length; i++){
                    //var user = listOfKunder[i].email;
                    //var password = listOfKunder[i].password;
                
            
                if(listOfKunder[i].email == $(".inputEmail").val() && listOfKunder[i].password == $(".inputPassword").val()){
                    sessionStorage.username = listOfKunder[i].email;
                    inloggad();
                    console.log("rätt");
                } else {
                    console.log("fel");
                    $(".button2").hide();
                    alert("Fel lösen! Försök igen");
                    }
                }
            });

        }

    function inloggad() {
        $(".button2").show();
        $(".button").hide();
        $(".inputEmail, .inputPassword, .label1, .label2").hide();
        $("#bakgrund").hide();
        //$(".popupSkapaInlogg").hide();
    }

    $(".button2").click(function(){ //logga ut-knapp
        sessionStorage.clear()
        location.reload();
        
                });
             

    //FETCHA HUVUDKATEGORIER
        var listOfHuvudkategorier;
                        
        fetch("./huvudkategorier.json")
        .then(function(response) {
        return response.json();
        })
        .then(function(huvudkategorier) {
        listOfHuvudkategorier = huvudkategorier;

            loopaHuvudkategorier();

        });

        //FETCHA UNDERKATEGORIER

        var listOfUnderkategorier;
        
            fetch("./underkategorier.json")
            .then(function(response) {
                return response.json();
            })
            .then(function(underkategori) {
            listOfUnderkategorier = underkategori; 
        });

        //FETCHA PRODUKTER

        var listOfprodukter;
        fetch("./produkter.json")
        .then(function(response) {
            return response.json();
        })
        .then(function(produkter) {
        listOfprodukter = produkter; 
    });
    

    function loopaHuvudkategorier() {

                $("#meny").append("<a href='index.html' class='menyval'>" + "Start" + "</a>");
                $("#meny").append("<div class='menyval'>" + "Info" + "</div>");

                for(var i = 0; i < listOfHuvudkategorier.length; i++){
                    $("#meny").append("<div class='menyval' onClick='visaUnderkategorier("+ listOfHuvudkategorier[i].id +")'>" + listOfHuvudkategorier[i].huvudkategori + "</div>");
                    }
                    $("#meny").append("<div class='menyval'>" + "Kontakt" + "</div>");
                    $("#meny").append("<div class='menyval' onClick='visaKundvagn()'>" + "Kundvagn" + "</div>");
                                    
            }



            visaUnderkategorier = function(val) {
               console.log("klick");
                $("#underkategorierna").html(" ");
                $("#container").html(" ");
                $("#bakgrund").hide();
                $(".popupSkapaInlogg").hide();
                
                
                for(var i = 0; i < listOfUnderkategorier.length; i++){
                    if(listOfUnderkategorier[i].huvudkategori == val) {
                        $("#underkategorierna").append("<div class='underkategorival' onClick='visaProdukter("+ listOfUnderkategorier[i].id +")'>" + listOfUnderkategorier[i].underkategori + "</div>");
                    }
                }
                $("#underkategorierna").show();
            }



            visaProdukter = function(val) {

                $("#container").html(" ");

                $("#container").append("<div id='produkterna'>"+"</div>")

                //$("#produkterna").html(" ");

                for(var i = 0; i < listOfprodukter.length; i++) {
                    if(listOfprodukter[i].underkategori == val) {
                        $("#produkterna").append("<div class='produktval' onClick='visaProdukt("+ listOfprodukter[i].id +")'>" + "<img class='produktbild' src='"+listOfprodukter[i].image+"'/>" + listOfprodukter[i].produktNamn + "</div>");
                    }
                }

                //$("#produkterna").show();
            }




            visaProdukt = function(val) {

                $("#container").html(" ");
                
                $("#container").append("<div id='produktSida'>"+"</div>")
                
                //$("#produktSida").html(" ");


                //console.log(val);
           
                //$("#produkterna").hide();
            for(var i = 0; i < listOfprodukter.length; i++){
                if(listOfprodukter[i].id == val){
                    $("#produktSida").append("<div class='helaProduktSidan'>" + "<img class='produktSidaBild' src='"+listOfprodukter[i].image+"'>" + "<p>" + listOfprodukter[i].produktNamn +"</p>" + "<p class='prodBesk'>" + listOfprodukter[i].produktBeskrivning + "</p>" + "<p>" + listOfprodukter[i].produktPris+ "</p>" + "<button class='addToCartButton' onClick='addToCart("+ listOfprodukter[i].id +")'>" + "Lägg till i varukorgen" + "</button>" + "</div>");
                }
            }

            //$("#produktSida").show();

            }


            addToCart = function(val) {
                //console.log(val);

                var vara = listOfprodukter[val];


                varukorg.push(vara);
                //console.log(vara);
            
                //console.log(val);
                //varukorg.push(listOfprodukter[val]);
                //console.log(varukorg);

                //var json_str = JSON.stringify(varukorg);
                //localStorage.produktList = json_str;

                /*

                var loopVarukorg = JSON.parse(localStorage.produktList);
                loopVarukorg.push(listOfprodukter[val]);
                var json_str = JSON.stringify(loopVarukorg);
                localStorage.produktList = json_str;
                //console.log(loopVarukorg);*/
                //loopaKundvagnen();

            }


            visaKundvagn = function() {

                $("#container").html(" ");

                $("#container").append("<div id='helaVarukorgen'>"+"</div>")

                $("#helaVarukorgen").append("<p class='rubrikKundvagn'>" + "Din varukorg" + "</p>");


                //$("#container").html("<p class='rubrikKundvagn'>Din varukorg</h2>");
                //window.location.assign("kundvagn.html")

                var json_str = JSON.stringify(varukorg);
                localStorage.shoppingCart = json_str; 
                
                var loopVarukorg = JSON.parse(localStorage.shoppingCart);

                $("#helaVarukorgen").append("<div id='minVarukorg'>"+"</div>")
                for(var i = 0; i < loopVarukorg.length; i++) {
                    console.log(loopVarukorg);
                    $("#minVarukorg").append("<div class='kundvagnen'>" + "<img class='varukorgBild' src='"+loopVarukorg[i].image+"'>" + "<p>" + loopVarukorg[i].produktNamn +"</p>" + "<p>" + loopVarukorg[i].produktBeskrivning + "</p>" + "<p>" + loopVarukorg[i].produktPris + "</p>" + "<button class='raderaButton'>" + "Radera" + "</button>" + "</div>");
                }
                
                var totalPrice = 0;
                var fraktPrice = 55;
                for(var i = 0; i < loopVarukorg.length; i++) {
                    totalPrice += loopVarukorg[i].produktPris;
                }
                totalPrice += fraktPrice;

                $("#helaVarukorgen").append("<p class='rubrikKundvagn'>" + "Varukorgens summa(varav frakt: 55 kr): " + totalPrice + " kr" + "</p>")
                $("#helaVarukorgen").append("<button class='sendOrderButton' onClick='skickaOrder()'>" + "Skicka order" + "</button>");
            }

            skickaOrder = function() {

                if(sessionStorage.username!= null){//om nån är inne
                    alert("Tack, din order är lagd!")
                } else {
                    $("#container").html(" ");
                    $("#container").append("<div id='helaSkapaInlogg'>"+"</div>");
                    $("#helaSkapaInlogg").append("<div class='popupSkapaInlogg'>" +"</div>");
                    
                    $(".popupSkapaInlogg").append("<p class='skapaInlogg'>" + "För att skicka din order var god, logga in!" + "</br>" + "Ej medlem? Skapa konto nedan." + "</p>"
                    + "<input class='inputEmailSkapa' value=' email' type='text'>" + "</input>" + 
                    "<input class='inputPasswordSkapa' value=' password' type='text'>" + "</input>" +
                    "<button class='skapaButton'>" + "Skapa konto" + "</button>");

                    //$(".popupSkapaInlogg").show();
                }
            }


            //JS FÖR ADMINSIDA 

            //Logga in!

            var admin = "test";
            var adminPassword = "password";


            $(".ulKunder").hide();
            $(".logutAdmin").hide();


            if(sessionStorage.admin!= null){//om nån är inne
                inloggadAdmin();
        
            } else { 
                $(".popupRuta").show();
                $(".ulKunder").hide();
                
                $(".loginAdmin").click(function(){

                    if(admin == $(".inputEmailAdmin").val() && adminPassword == $(".inputPasswordAdmin").val()){
                        sessionStorage.admin="Admin";
                        inloggadAdmin();
                    } 
                    else {
                        alert("fel lösen");
                    }

                });


                }


            // Loopa ut kundlista 


            function inloggadAdmin(){
                $(".popupRuta").hide();

            $(".kundlista").click(function(){
                $(".ulKunder").html(" ");
                $(".ulKunder").show();
                $("#bakgrund").hide();
                $(".popupRuta").hide();
               

                for(var i = 0; i < listOfKunder.length; i++) {
                    $(".ulKunder").append("<li>" + "id:" + listOfKunder[i].id + "</br>" + "email: " + listOfKunder[i].email + "</br>"  + "lösenord: " + listOfKunder[i].password + "</br>" + "</br>" + "</li>")
                }
                });

            }
                


        

                //var loopVarukorg = JSON.parse(localStorage.produktList);

                //console.log(loopVarukorg);
            





            



/*

            $("#underkategorierna").show();

            visaUnderkategorier = function(val) {
                //console.log(val);

                var visaVilkenHuvudkategori = val;

               
                    $("#underkategorierna").html(" ");

                    for(var i = 0; i < listOfUnderkategorier.length; i++){
                        
                    if(listOfUnderkategorier[i].huvudkategori == visaVilkenHuvudkategori) {
                        $("#underkategorierna").append("<div class='underkategorival' onClick='visaProdukter("+ listOfUnderkategorier[i].id +")'>" + listOfUnderkategorier[i].underkategori + "</div>");
                    }
                    }
                    
                    $("#underkategorierna").show();
                    $("#produktSida").hide();

                    
                
            }

            visaProdukter = function(val) {
                //console.log(val);
                var visaVilkenUnderkategori = val;

                
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
                    //console.log(val);
                var visaVilkenProdukt = val;
                    $("#produkterna").hide();
                for(var i = 0; i < listOfprodukter.length; i++){
                    if(listOfprodukter[i].id == visaVilkenProdukt){
                        $("#produktSida").append("<div class='helaProduktSidan'>" + "<img class='produktSidaBild' src='"+listOfprodukter[i].image+"'>" + "<p>" + listOfprodukter[i].produktNamn +"</p>" + "<p>" + listOfprodukter[i].produktBeskrivning + "</p>" + "<p>" + listOfprodukter[i].produktPris+ "</p>" + "<button class='addToCartButton' onClick='addToCart("+ listOfprodukter[i].id +")'>" + "Lägg till i varukorgen" + "</button>" + "</div>");
                    }
                }

                $("#produktSida").show();

                }


           

            addToCart = function(val) {
                var varukorg = [];
                var visaVilkenVara = val;
                
                //console.log(val);
                varukorg.push(listOfprodukter[visaVilkenVara]);
                console.log(varukorg);

                visaKundvagn = function(varukorg) {
                    window.location.assign("kundvagn.html")
                    loopaKundvagnen();
                    
                }

                function loopaKundvagnen(varukorg, visaVilkenVara) {
                    console.log(varukorg);
                }
               

                //for(var i = 0; i < varukorg.length; i++) {
                    //$("#testVarukorg").append(varukorg[i].id + varukorg[i].produktBeskrivning);
                //}
               
                
            }

            }  */

           

           

            
                    
 });
    