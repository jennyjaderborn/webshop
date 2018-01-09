$(document).ready(function(){
    $("#underkategorierna").hide();
    $("#produktSida").hide();
    $(".popupSkapaInlogg").hide();

    var varukorg = [];
    var sparaOrder = [];


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

    
//INLOGG indexssida
    $(".buttonLoggaUt").hide();
        
        if (sessionStorage.username!= null) {//om nån är inne
            inloggad();
        } else {

            $(".buttonLoggaIn").click(function(){
               
                for(var i = 0; i < listOfKunder.length; i++){
            
                if(listOfKunder[i].email == $(".inputEmail").val() && listOfKunder[i].password == $(".inputPassword").val()){
                    sessionStorage.username = listOfKunder[i].email;
                    inloggad();
                    console.log("rätt");
                } else {
                    console.log("fel");
                    $(".buttonLoggaUt").hide();
                    alert("Fel lösen! Försök igen");
                    }
                }
            });

        }

    function inloggad() {
        $(".buttonLoggaUt").show();
        $(".buttonLoggaIn").hide();
        $(".inputEmail, .inputPassword, .label1, .label2").hide();
        $("#bakgrund").hide();
    }

    $(".buttonLoggaUt").click(function(){ //logga ut-knapp
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


                for(var i = 0; i < listOfprodukter.length; i++) {
                    if(listOfprodukter[i].underkategori == val) {
                        $("#produkterna").append("<div class='produktval' onClick='visaProdukt("+ listOfprodukter[i].id +")'>" + "<img class='produktbild' src='"+listOfprodukter[i].image+"'/>" + listOfprodukter[i].produktNamn + "</div>");
                    }
                }

            }




            visaProdukt = function(val) {
                //console.log(val);

                $("#container").html(" ");
                
                $("#container").append("<div id='produktSida'>"+"</div>")
                

            for(var i = 0; i < listOfprodukter.length; i++){
                if(listOfprodukter[i].id == val){
                    $("#produktSida").append("<div class='helaProduktSidan'>" + "<img class='produktSidaBild' src='"+listOfprodukter[i].image+"'>" + "<p>" + listOfprodukter[i].produktNamn +"</p>" + "<p class='prodBesk'>" + listOfprodukter[i].produktBeskrivning + "</p>" + "<p>" + listOfprodukter[i].produktPris+ "</p>" + "<button class='addToCartButton' onClick='addToCart("+ listOfprodukter[i].id +")'>" + "Lägg till i varukorgen" + "</button>" + "</div>");
                }
            }


            }


            addToCart = function(val) {
                //console.log(val);

                var vara = listOfprodukter[val];


                varukorg.push(vara);

            }


            visaKundvagn = function() {

                $("#container").html(" ");

                $("#container").append("<div id='helaVarukorgen'>"+"</div>")

                $("#helaVarukorgen").append("<p class='rubrikKundvagn'>" + "Din varukorg" + "</p>");



                var json_str = JSON.stringify(varukorg);
                localStorage.shoppingCart = json_str; 
                
                var loopVarukorg = JSON.parse(localStorage.shoppingCart);

                $("#helaVarukorgen").append("<div id='minVarukorg'>"+"</div>")
                for(var i = 0; i < loopVarukorg.length; i++) {
                    //console.log(loopVarukorg);
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
                
                } else { //Annars får du skapa medlem
                    $("#container").html(" ");
                    $("#container").append("<div id='helaSkapaInlogg'>"+"</div>");
                    $("#helaSkapaInlogg").append("<div class='popupSkapaInlogg'>" +"</div>");
                    
                    $(".popupSkapaInlogg").append("<p class='skapaInlogg'>" + "För att skicka din order var god, logga in!" + "</br>" + "Ej medlem? Skapa konto nedan." + "</p>"
                    + "<input class='inputNamnSkapa' value=' Namn' type='text'>" + "</input>"
                    + "<input class='inputAdressSkapa' value=' Adress' type='text'>" + "</input>"
                    + "<input class='inputEmailSkapa' value=' Email' type='text'>" + "</input>" + 
                    "<input class='inputPasswordSkapa' value=' Password' type='text'>" + "</input>" + "<div>" +
                    "Nyhetsbrev?<input type='checkbox' name='color' value='blue'/>Ja" + "<input type='checkbox' name='color' value='blue'/>Nej" + "</div>" +
                     "<button class='skapaButton' onClick='skapaMedlem()'>" + "Skapa konto" + "</button>");                    

                }

                skapaMedlem = function() {
                    console.log("skapa");

                    //console.log($(".inputNamnSkapa").val());
                    var namnet = $(".inputNamnSkapa").val();
                    var adressen = $(".inputAdressSkapa").val();
                    var emailen = $(".inputEmailSkapa").val();
                    var passworden = $(".inputPasswordSkapa").val();


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


                $(".orderLista").click(function(){
                   $(".ulKunder").html(" ");
                   $(".ulKunder").show();
                    $("#bakgrund").hide();
                    $(".popupRuta").hide();


                    var loopVarukorg = JSON.parse(localStorage.shoppingCart);
                    
                    sparaOrder.push(loopVarukorg);

                    localStorage.setItem("sparaOrder", JSON.stringify(sparaOrder));
                    var loopOrder = localStorage.getItem("sparaOrder");

                    sparaOrder = JSON.parse(loopOrder);
                    console.log(sparaOrder);

                    document.getElementById("testArray").innerHTML = sparaOrder.id;

                    
                    
                    });

                    




            }
           

           

            
                    
 });
    