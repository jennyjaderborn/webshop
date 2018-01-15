$(document).ready(function(){
    $("#underkategorierna").hide();
    $("#produktSida").hide();
    $(".popupSkapaInlogg").hide();
    $(".formulär").hide();


    //var varukorg = [];
    var medlemmar = [];

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
        
        if (sessionStorage.myUserName != null) {//om nån är inne
            inloggad();
        } else {

            $(".buttonÖppnaLoggaIn").click(function(){
                $("#container").html(" ");
                $("#bakgrund").show();
                $(".formulär").show();
                $("#helaSkapaInlogg").hide();

                
            });


            $(".buttonLoggaIn").click(function(){

                for(var i = 0; i < listOfKunder.length; i++){

                if(listOfKunder[i].email == $(".inputEmail").val()){
                    console.log("användarnamnet finns");
                    sessionStorage.setItem("myUserName", listOfKunder[i].email);
                }

            }

            for(var i = 0; i < listOfKunder.length; i++){
                
                if(listOfKunder[i].password == $(".inputPassword").val()){
                    console.log("lösenordet finns");
                    sessionStorage.setItem("myUserPassword", listOfKunder[i].password);
                    }
                
                }

                if(sessionStorage.myUserName != null && sessionStorage.myUserPassword != null){
                    console.log("rätt lösenord");
                    inloggad();
                } else {
                    alert("Fel lösenord!");
                }
            });

            $(".buttonBliMedlem").click(function(){
                //$("#bakgrund").hide();
                $("#container").html(" ");
                //$("#bakgrund").html(" ");
                $(".formulär").hide();

                $("#bakgrund").show();
                $("#bakgrund").append("<div id='helaSkapaInlogg'>"+"</div>");
                $("#helaSkapaInlogg").append("<div class='popupSkapaInlogg'>" +"</div>");
                
                $(".popupSkapaInlogg").append("<p class='skapaInlogg'>" + "Skapa ditt konto här!" + "</p>"
                + "<input class='inputNamnSkapa' value=' Namn' type='text'>" + "</input>"
                + "<input class='inputAdressSkapa' value=' Adress' type='text'>" + "</input>"
                + "<input class='inputEmailSkapa' value=' Email' type='text'>" + "</input>" + 
                "<input class='inputPasswordSkapa' value=' Password' type='text'>" + "</input>" + "<div>" +
                "Nyhetsbrev?<input type='checkbox' class='yesCheck'/>Ja" + "</div>" +
                 "<button class='skapaButton' onClick='skapaMedlem()'>" + "Skapa konto" + "</button>");                    
            });

            skapaMedlem = function() {
                console.log("skapa");

                if($(".yesCheck").is(':checked')){
                    console.log("den e check")
                    listOfKunder.push({id: 3, namn:$(".inputNamnSkapa").val(), adress: $(".inputAdressSkapa").val(), email: $(".inputEmailSkapa").val(), password: $(".inputPasswordSkapa").val(), nyhetsbrev: "JA"});
                    
                    localStorage.setItem("medlemmar", JSON.stringify(listOfKunder));
                    listOfKunder = JSON.parse(localStorage.getItem("medlemmar"))
                }
                else {
                    console.log("nejjjtack");
                    listOfKunder.push({id: 3, namn:$(".inputNamnSkapa").val(), adress: $(".inputAdressSkapa").val(), email: $(".inputEmailSkapa").val(), password: $(".inputPasswordSkapa").val(), nyhetsbrev: "NEJ"});
                    
                    localStorage.setItem("medlemmar", JSON.stringify(listOfKunder));
                    listOfKunder = JSON.parse(localStorage.getItem("medlemmar"))
                }
                $("#helaSkapaInlogg").hide();
                $(".formulär").show();



            }

        }

    function inloggad() {
        $(".buttonLoggaUt").show();
        $(".buttonLoggaIn").hide();
        $(".inputEmail, .inputPassword, .label1, .label2").hide();
        $("#bakgrund").show();
        $(".formulär").hide();
        $(".buttonÖppnaLoggaIn").hide();
        $(".buttonBliMedlem").hide();

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
    

    if (localStorage.pushProdukt == null){
        varukorg = [];
        localStorage.setItem("pushProdukt", JSON.stringify(varukorg));
        Parsevarukorg = JSON.parse(localStorage.getItem("pushProdukt"));

    }

    if (localStorage.order == null){
        sparaOrder = [];
        localStorage.setItem("order", JSON.stringify(sparaOrder));
        ParsesparaOrder = JSON.parse(localStorage.getItem("order"));

    }

    function loopaHuvudkategorier() {

                $("#meny").append("<a href='index.html' class='menyval'>" + "Start" + "</a>");
                $("#meny").append("<a href='#' class='menyval'>" + "Info" + "</a>");

                for(var i = 0; i < listOfHuvudkategorier.length; i++){
                    $("#meny").append("<a href='#' class='menyval' onClick='visaUnderkategorier("+ listOfHuvudkategorier[i].id +")'>" + listOfHuvudkategorier[i].huvudkategori + " "+ "<i class='fa fa-angle-down' aria-hidden='true'> </i>" + "</a>");
                    }
                    $("#meny").append("<a href='#' class='menyval'>" + "Kontakt" + "</a>");
                    $("#meny").append("<a href='#' class='menyval' onClick='visaKundvagn()'>" + "<i class='fa fa-shopping-cart' aria-hidden='true'>"+"</i>" + " Varukorg" + "</a>");
                                    
            }



            visaUnderkategorier = function(val) {
                $("#underkategorierna").html(" ");
                $("#container").html(" ");
                $("#bakgrund").hide();
                $(".popupSkapaInlogg").hide();
                
                
                for(var i = 0; i < listOfUnderkategorier.length; i++){
                    if(listOfUnderkategorier[i].huvudkategori == val) {
                        $("#underkategorierna").append("<div class='underkategorival' onClick='visaProdukter("+ listOfUnderkategorier[i].id +")'>" + "<a class='vitLink' href='#'>" + listOfUnderkategorier[i].underkategori + "</a>" + "</div>");
                    }
                }
                $("#underkategorierna").show();

                $("#container").append("<div id='huvudKategoriProdukter'>" + "</div>");

                for(var i = 0; i < listOfprodukter.length; i++){
                    if(listOfprodukter[i].huvudkategori == val){
                        $("#huvudKategoriProdukter").append("<div class='produktval' onClick='visaProdukt("+ listOfprodukter[i].id +")'>" + "<a href='#'>" + "<img class='produktbild' src='"+listOfprodukter[i].image+"'/>" + "</a>" + "<a id='produktLink' href='#'>" + listOfprodukter[i].produktNamn + "</a>" + "</div>");
                    }
                }
            }



            visaProdukter = function(val) {

                $("#container").html(" ");

                $("#container").append("<div id='produkterna'>"+"</div>")


                for(var i = 0; i < listOfprodukter.length; i++) {
                    if(listOfprodukter[i].underkategori == val) {
                        $("#produkterna").append("<div class='produktval' onClick='visaProdukt("+ listOfprodukter[i].id +")'>" + "<a href='#'>" + "<img class='produktbild' src='"+listOfprodukter[i].image+"'/>" + "</a>" + "<a id='produktLink' href='#'>" + listOfprodukter[i].produktNamn + "</a>" + "</div>");
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

                alert("Dina vara har lagts i kundvagnen");
                //console.log(val);

                var vara = listOfprodukter[val];
                Parsevarukorg = JSON.parse(localStorage.getItem("pushProdukt"));
                Parsevarukorg.push(vara);
                localStorage.setItem("pushProdukt", JSON.stringify(Parsevarukorg));
                
            
            }


            visaKundvagn = function() {
                $("#bakgrund").hide();

                $("#container").html(" ");

                $("#container").append("<div id='helaVarukorgen'>"+"</div>")

                $("#helaVarukorgen").append("<p class='rubrikKundvagn'>" + "Din varukorg" + "</p>");

                Parsevarukorg = JSON.parse(localStorage.getItem("pushProdukt"));


                $("#helaVarukorgen").append("<div id='minVarukorg'>"+"</div>")
                for(var i = 0; i < Parsevarukorg.length; i++) {
                    //console.log(loopVarukorg);
                    $("#minVarukorg").append("<div class='kundvagnen'>" + "<img class='varukorgBild' src='"+ Parsevarukorg[i].image+"'>" + "<p>" + Parsevarukorg[i].produktNamn +"</p>" + "<p>" + Parsevarukorg[i].produktBeskrivning + "</p>" + "<p>" + Parsevarukorg[i].produktPris + "</p>" + "<button class='raderaButton'>" + "Radera" + "</button>" + "</div>");
                }
                
                var totalPrice = 0;
                var fraktPrice = 55;
                for(var i = 0; i < Parsevarukorg.length; i++) {
                    totalPrice += Parsevarukorg[i].produktPris;
                }
                totalPrice += fraktPrice;

                $("#helaVarukorgen").append("<p class='rubrikKundvagn'>" + "Varukorgens summa(varav frakt: 55 kr): " + totalPrice + " kr" + "</p>")
                $("#helaVarukorgen").append("<button class='sendOrderButton' onClick='skickaOrder()'>" + "Skicka order" + "</button>");
            }

            skickaOrder = function() {

            if(sessionStorage.myUserName!= null){//om nån är inne
                Parsevarukorg = JSON.parse(localStorage.getItem("pushProdukt"));
                for(var i = 0; i < Parsevarukorg.length; i++){
                    ParsesparaOrder = JSON.parse(localStorage.getItem("order"));
                    ParsesparaOrder.push({Produktnamn: Parsevarukorg[i].produktNamn});
                    localStorage.setItem("order", JSON.stringify(ParsesparaOrder));
                }
                console.log(ParsesparaOrder);


                /*var skickadProdukt = Parsevarukorg;
                sparaOrder.push(skickadProdukt);
                localStorage.setItem("order", JSON.stringify(sparaOrder));
                ParsesparaOrder = JSON.parse(localStorage.getItem("order"));
                console.log(ParsesparaOrder);*/
                localStorage.setItem("pushProdukt", JSON.stringify([]));
                //varukorg = [];
                //localStorage.removeItem("pushProdukt");

                //if(sessionStorage.myUserName!= null){//om nån är inne
                    alert("Tack, din order är lagd!")
                    $("#bakgrund").show();
                
                } else { //Annars får du skapa medlem
                    $("#container").html(" ");
                    $("#container").append("<div id='helaSkapaInlogg'>"+"</div>");
                    $("#helaSkapaInlogg").append("<div class='popupSkapaInlogg'>" +"</div>");
                    
                    $(".popupSkapaInlogg").append("<p class='skapaInlogg'>" + "För att skicka din order var god, logga in!" + "</br>" + "Ej medlem? Skapa konto nedan." + "</p>"
                    + "<input class='inputNamnSkapa' value=' Namn' type='text'>" + "</input>"
                    + "<input class='inputAdressSkapa' value=' Adress' type='text'>" + "</input>"
                    + "<input class='inputEmailSkapa' value=' Email' type='text'>" + "</input>" + 
                    "<input class='inputPasswordSkapa' value=' Password' type='text'>" + "</input>" + "<div>" +
                    "Nyhetsbrev?<input type='checkbox' class='yesCheck'/>Ja" + "</div>" +
                     "<button class='skapaButton' onClick='skapaMedlem()'>" + "Skapa konto" + "</button>");                    

                }

                skapaMedlem = function() {
                    console.log("skapa");
                    //var medlemmar = [];

                    if($(".yesCheck").is(':checked')){
                        console.log("den e check")
                        listOfKunder.push({id: 3, namn:$(".inputNamnSkapa").val(), adress: $(".inputAdressSkapa").val(), email: $(".inputEmailSkapa").val(), password: $(".inputPasswordSkapa").val(), nyhetsbrev: "JA"});
                        
                        localStorage.setItem("medlemmar", JSON.stringify(listOfKunder));
                        listOfKunder = JSON.parse(localStorage.getItem("medlemmar"))
                    }
                    else {
                        console.log("nejjjtack");
                        listOfKunder.push({id: 3, namn:$(".inputNamnSkapa").val(), adress: $(".inputAdressSkapa").val(), email: $(".inputEmailSkapa").val(), password: $(".inputPasswordSkapa").val(), nyhetsbrev: "NEJ"});
                        
                        localStorage.setItem("medlemmar", JSON.stringify(listOfKunder));
                        listOfKunder = JSON.parse(localStorage.getItem("medlemmar"))
                    }

                    $("#helaSkapaInlogg").hide();
                    $("#bakgrund").show();
                    $(".formulär").show();
                    /*listOfKunder.push({id: 3, namn:$(".inputNamnSkapa").val(), adress: $(".inputAdressSkapa").val(), email: $(".inputEmailSkapa").val(), password: $(".inputPasswordSkapa").val()});

                localStorage.setItem("medlemmar", JSON.stringify(listOfKunder));
                listOfKunder = JSON.parse(localStorage.getItem("medlemmar"));*/


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

            $(".kundLista").click(function(){
                $(".ulKunder").html(" ");
                $(".ulKunder").show();
                $("#bakgrund").hide();
                $(".popupRuta").hide();
                $("#testArray").hide();
                $("#emailLista").hide();

                if (localStorage.medlemmar != null){

                medlemmar = JSON.parse(localStorage.getItem("medlemmar"));
                console.log(localStorage.medlemmar);
                
                 for(var i = 0; i < medlemmar.length; i++) {
                     $(".ulKunder").append("<li>" + "id:" + medlemmar[i].id + "</br>" + "email: " + medlemmar[i].email + "</br>"  + "lösenord: " + medlemmar[i].password + "</br>" + "</br>" + "</li>")
                 }

                }

                else {
                    for(var i = 0; i < listOfKunder.length; i++) {
                        $(".ulKunder").append("<li>" + "id:" + listOfKunder[i].id + "</br>" + "email: " + listOfKunder[i].email + "</br>"  + "lösenord: " + listOfKunder[i].password + "</br>" + "</br>" + "</li>")
                    }
                }
                 });
               


                $(".orderLista").click(function(){
                   //$(".ulKunder").html(" ");
                   $("#testArray").html(" ");
                   $(".ulKunder").hide();
                    $("#bakgrund").hide();
                    $(".popupRuta").hide();
                    $("#emailLista").hide();
                    $("#testArray").show();
                    
                    
                    ParsesparaOrder = JSON.parse(localStorage.getItem("order"));
                    console.log(ParsesparaOrder);
                    console.log(JSON.stringify(localStorage.getItem("order")));

                    for(var i = 0; i < ParsesparaOrder.length; i++) {
                        $("#testArray").append("<p>" + ParsesparaOrder[i].Produktnamn + "</p>");
                        
                    }
                    /*ha en tacksida istället. Vid skicka beställning - pushprodukt puschas till order
                    och man skickas till tacksida.tryck på ok och där tömmer vi pushprodukt i storage */
                    
                    });


                    $(".epostLista").click(function(){
                        $("#emailLista").html(" ");
                        $(".ulKunder").hide();
                         $("#bakgrund").hide();
                         $(".popupRuta").hide();
                         $("#testArray").hide();
                         $("#emailLista").show();

                        medlemmar = JSON.parse(localStorage.getItem("medlemmar"));
                        console.log(localStorage.medlemmar);
                        
                         for(var i = 0; i < medlemmar.length; i++) {
                             if(medlemmar[i].nyhetsbrev == "JA")
                             $("#emailLista").append("<p>" + medlemmar[i].email + ", " + "</p>");
                             console.log(medlemmar[i].email);
                         }
                    });


            }
           

           

            
                    
 });
    