function setupMakeCake() {
    var makeCake = this;

    //Set empty array for chosen option
    this.chosenOptions = [];
    this.chosenOptionsPrices = [];
    this.step6ChosenOptions = [];
    this.totalPrice = 0;
    this.editedChosenOptions = 0;

    //Global step, keeps count on which step the user is
    this.step = 1;

    //Set section-cake as jquery object
    this.$makeCake = $("#section-cake");

    //After numverOfPersons is set it gets used by other functions too
    this.numberOfPersons = 0;

    //Set global values of all steps
    //Thema
    this.titleStep1 = "Kies een thema";
    this.valuesStep1 = [];

    //Ajax request to get all values needed

    //Get themas
    $.ajax({
    url: "../makeCakeDBValues.cshtml?table=1"
    }).done(function (response) {
        themas = response.split("|");
        themas.forEach(function (thema) {
            makeCake.valuesStep1.push(thema);
        });

        //Remove last value from array (empty value) and call function setStepInfo
        makeCake.valuesStep1.pop();
        setStepInfo();
    });


    //Number of persons
    this.titleStep2 = "Selecteer het aantal personen";

    //Cake type
    this.titleStep3 = "Kies een type cake";
    this.valuesStep3 = [];
    this.pricesStep3 = [];
    $.ajax({
        url: "../makeCakeDBValues.cshtml?table=2"
    }).done(function (response) {
        smaken = response.split("|");
        smaken.forEach(function (smaak) {
            nameAndPrice = smaak.split(",");
            makeCake.valuesStep3.push(nameAndPrice[0]);
            makeCake.pricesStep3.push(nameAndPrice[1]);
        });

        //Remove last value from array (empty value) and call function setStepInfo
        makeCake.valuesStep3.pop();
        makeCake.pricesStep3.pop();
    });

    //Number of layers (max number of layers is 15 / number of persons)
    this.titleStep4 = "Kies het aantal lagen";

    //Coating
    this.titleStep5 = "Kies een bekleding";
    this.valuesStep5 = [];
    this.pricesStep5 = [];

    $.ajax({
        url: "../makeCakeDBValues.cshtml?table=3"
    }).done(function (response) {
        bekledingen = response.split("|");
        bekledingen.forEach(function (bekleding) {
            nameAndPrice = bekleding.split(",");
            makeCake.valuesStep5.push(nameAndPrice[0]);
            makeCake.pricesStep5.push(nameAndPrice[1]);
        });

        //Remove last value from array (empty value) and call function setStepInfo
        makeCake.valuesStep5.pop();
        makeCake.pricesStep5.pop();
    });

    //Fill
    this.titleStep6 = "Kies een vulling";
    this.valuesStep6 = [];
    this.pricesStep6 = [];

    $.ajax({
        url: "../makeCakeDBValues.cshtml?table=0"
    }).done(function (response) {
        vullingen  = response.split("|");
        vullingen.forEach(function (vulling) {
            nameAndPrice = vulling.split(",");
            makeCake.valuesStep6.push(nameAndPrice[0]);
            makeCake.pricesStep6.push(nameAndPrice[1]);
        });

        //Remove last value from array (empty value) and call function setStepInfo
        makeCake.valuesStep6.pop();
        makeCake.pricesStep6.pop();
    });
    

    //Allergy
    this.titleStep7 = "Allergieën";
    this.valuesStep7 = [];
    $.ajax({
        url: "../makeCakeDBValues.cshtml?table=4"
    }).done(function (response) {
        allergieen = response.split("|");
        allergieen.forEach(function (allergie) {
            makeCake.valuesStep7.push(allergie);
        });

        //Remove last value from array (empty value) and call function setStepInfo
        makeCake.valuesStep7.pop();
    });
    
    //Decoration
    this.titleStep8 = "Kies het niveau van decoratie";
    this.valuesStep8 = [];
    this.pricesStep8 = [];
    $.ajax({
        url: "../makeCakeDBValues.cshtml?table=5"
    }).done(function (response) {
        decoraties = response.split("|");
        decoraties.forEach(function (decoratie) {
            nameAndPrice = decoratie.split(",");
            makeCake.valuesStep8.push(nameAndPrice[0]);
            makeCake.pricesStep8.push(nameAndPrice[1]);
        });

        //Remove last value from array (empty value) and call function setStepInfo
        makeCake.valuesStep8.pop();
        makeCake.pricesStep8.pop();
    });

    //Cake ready on date
    this.titleStep9 = "De taart moet klaar zijn op:";
    this.valuesStep9 = [];
    this.pricesStep9 = [];
}

function setStepInfo() {
    this.stepTitle = "";
    this.stepArray = "";
    this.priceArray = "";
    this.optionsCount = 0;
    this.boolAndersNamelijk = 0;

    //Get values according to the step
    switch (this.step) {
        case 1:
            this.stepTitle = this.titleStep1;
            this.stepArray = this.valuesStep1;
            this.boolAndersNamelijk = 1;
            break;
        case 2:
            this.stepTitle = this.titleStep2;
            this.stepArray = this.valuesStep2;
            break;
        case 3:
            this.stepTitle = this.titleStep3;
            this.stepArray = this.valuesStep3;
            this.priceArray = this.pricesStep3;
            break;
        case 4:
            this.stepTitle = this.titleStep4;
            this.stepArray = "";
            break;
        case 5:
            this.stepTitle = this.titleStep5;
            this.stepArray = this.valuesStep5;
            this.priceArray = this.pricesStep5;
            break;
        case 6:
            this.stepTitle = this.titleStep6;
            this.stepArray = this.valuesStep6;
            this.priceArray = this.pricesStep6;
            break;
        case 7:
            this.stepTitle = this.titleStep7;
            this.stepArray = this.valuesStep7;
            this.boolAndersNamelijk = 1;
            break;
        case 8:
            this.stepTitle = this.titleStep8;
            this.stepArray = this.valuesStep8;
            this.priceArray = this.pricesStep8;
            break;
        case 9:
            this.stepTitle = this.titleStep9;
            this.stepArray = this.valuesStep9;
            this.priceArray = this.pricesStep9;
            break;
        default:
            this.stepTitle = this.titleStep1;
            this.stepArray = this.valuesStep1;
            this.boolAndersNamelijk = 1;
            break;
    }

    this.placeStepInfo();
}

function placeStepInfo() {
    //Set step info
    this.$makeCake.find("#makeCakeStep").html("Stap " + this.step);
    this.$makeCake.find("#makeCakeStepInfo").html(this.stepTitle);

    var optionsHtml = "";
    var buttonOptionsHtml = "";

    if (this.step !== 2 && this.step !== 4 && this.step !== 6 && this.step !== 9) {
        for (i = 0; i < this.stepArray.length; i++) {
            optionsCount++;
            optionsHtml += '<div class="col">' + this.stepArray[i];
            if (this.priceArray !== "") {
                optionsHtml += '<br>€' + this.priceArray[i] + ' p.p.';
            }

            optionsHtml += '</div>';
            buttonOptionsHtml += '<div class="col"><input type="radio" name="options" value="' + this.stepArray[i] + '" class="optionRadios"></div>';
        }

        if (this.boolAndersNamelijk === 1) {
            optionsCount++;
            optionsHtml += '<div class="col">Anders, namelijk...</div>';
            buttonOptionsHtml += '<div class="col"><input type="text" name="options" class="w-75 optionText"></div>';
        }

        //Set options text
        this.$makeCake.find("#optionsMakeCake").html(optionsHtml);
        //Set options slider
        this.$makeCake.find("#chooseOptionMakeCake").html(buttonOptionsHtml);

    } else if (this.step === 2) {
        //Step 2
        optionsHtml += '<div class="col"><input type="number" min="1" class="text-center mb-2 optionNumber"></div>';
        //Set options text
        this.$makeCake.find("#optionsMakeCake").html(optionsHtml);

    } else if (this.step === 4) {
        //Step 4
        this.min = Math.ceil(chosenOptions[1] / 30);
        this.max = Math.floor(chosenOptions[1] / 15);

        if (this.min === 0) {
            this.min = 1;
        } else if (this.min > 5) {
            this.min = 5;
        }

        if (this.max > 5) {
            this.max = 5;
        } else if (this.max === 0) {
            this.max = 1;
        }

        optionsHtml += '<div class="col"><input type="number" min="' + this.min + '" max="' + this.max + '" class="text-center mb-2 optionNumber"></div>';
        if (max === 1) {
            buttonOptionsHtml += '<div class="col text-center mb-2">Maximaal 1 laag (Minimaal 15 personen per laag)</div>';
        } else {
            buttonOptionsHtml += '<div class="col text-center mb-2">Minimaal ' + this.min + ', maximaal ' + this.max + ' lagen</div>';
        }

        //Set options text
        this.$makeCake.find("#optionsMakeCake").html(optionsHtml);
        //Set options slider
        this.$makeCake.find("#chooseOptionMakeCake").html(buttonOptionsHtml);

    } else if (this.step === 6) {
        //Step 6
        $("<div class='text-center' id='layers'></div>").insertAfter("#chooseOptionMakeCake");

        for (i = 0; i < chosenOptions[3]; i++) {
            optionsHtml += '<div class="row">';
            for (x = 0; x < this.stepArray.length; x++) {
                optionsCount++;
                optionsHtml += '<div class="col-12 col-sm">Laag ' + (i + 1) + '<br>' + this.stepArray[x] + '<br>€' + this.priceArray[x] + ' p.p. <br><input type="radio" name="options' + i + '" value="' + this.stepArray[x] + '" class="optionRadios' + i + '"></div>';
            }
            optionsHtml += '</div>';
        }

        //Set options text
        this.$makeCake.find("#layers").html(optionsHtml);
        //Set options slider
        //this.$makeCake.find("#chooseOptionMakeCake").html(buttonOptionsHtml);
    } else if (this.step === 9) {
        //Step 9
        optionsHtml += '<div class="col"><input type="date" name="readyOn" class="mb-2 optionDate"></div>';
        //Set options text
        this.$makeCake.find("#optionsMakeCake").html(optionsHtml);
    }
}

function getOptionValue() {
    var price = 0;

    if (this.step !== 2 && this.step !== 4 && this.step !== 6 && this.step !== 9) {
        var radios = this.$makeCake.find(".optionRadios");
        var foundValue = 0;

        //Get value from textbox
        andersNamelijk = "";
        andersNamelijk = this.$makeCake.find(".optionText").val();

        if (typeof andersNamelijk !== "undefined" && andersNamelijk !== "") {
            foundValue = 1;
            this.chosenOptions.push(andersNamelijk);
        }

        //If value from textbox is empty
        if (foundValue === 0) {
            //Loop through radiobuttons
            for (var i = 0; i < radios.length; i++) {
                if (radios[i].checked) {
                    foundValue = 1;
                    this.chosenOptions.push(radios[i].value);

                    if (this.priceArray !== "") {
                        singlePrice = this.priceArray[this.stepArray.indexOf(radios[i].value)];
                        if (this.step === 3 || this.step === 5 || this.step === 8) {
                            price = singlePrice * chosenOptions[1];
                        }
                    }

                    break;
                }
            }
        }
    } else if (this.step === 2 || this.step === 4) {
        //Step 2 and 4 userinput is a number
        number = this.$makeCake.find(".optionNumber").val();

        if (typeof number !== "undefined" && !isNaN(parseFloat(number)) && isFinite(number)) {
            if (this.step === 4) {
                if (number >= this.min && number <= this.max) {
                    foundValue = 1;
                    this.chosenOptions.push(number);
                }
            } else {
                foundValue = 1;
                this.chosenOptions.push(number);
            }
        }
    } else if (this.step === 6) {
        //Step 6 get value for multiple layers
        var radiosCount = 0;
        for (i = 0; i < chosenOptions[3]; i++) {
            var radios2 = this.$makeCake.find(".optionRadios" + i);

            for (x = 0; x < radios2.length; x++) {
                if (radios2[x].checked) {
                    this.step6ChosenOptions.push(radios2[x].value);
                    break;
                }
            }

            if (typeof radio !== "undefined") {
                this.step6ChosenOptions.push(radio.val());
            }
        }

        if (parseInt(chosenOptions[3]) === this.step6ChosenOptions.length) {
            this.step6ChosenOptions.forEach(function (value) {
                singlePrice = this.priceArray[this.stepArray.indexOf(value)];
                price = price + (parseInt(singlePrice) * parseInt(chosenOptions[1]));
            });

            this.chosenOptions.push("Vullingen");
            foundValue = 1;
        } else {
            this.step6ChosenOptions = [];
        }
    } else if (this.step === 9) {
        date = this.$makeCake.find(".optionDate").val();

        if (typeof date !== "undefined" && date !== "") {
            foundValue = 1;
            this.chosenOptions.push(date);
        }
    }

    if (foundValue === 1) {
        //Save values and go next step
        if (price !== 0) {
            this.updateTotalPrice(price);
        }
        this.addVisualProgress();
        this.clearCurrentStep();
    }
}

function clearCurrentStep() {
    this.$makeCake.find("#optionsMakeCake").children().fadeOut(250);
    this.$makeCake.find("#chooseOptionMakeCake").children().fadeOut(250);
    this.$makeCake.find("#makeCakeStepInfo").fadeOut(250);
    this.$makeCake.find("#makeCakeStep").fadeOut(250);
    this.$makeCake.find("#optionsMakeCake").children().remove();
    this.$makeCake.find("#chooseOptionMakeCake").children().remove();
    if (this.step === 6) {
        this.$makeCake.find("#layers").remove();
    }

    this.step++;

    if (this.step < 10) {
        setTimeout(this.setStepInfo, 250);
        setTimeout(this.fadeInNewStep, 250);
    } else {
        //this.$makeCake.children().remove();
        this.$makeCake.find("#makeCakeNextStep").fadeOut(250);
        this.$makeCake.append("<div class='col-12 text-center'><button class ='mt-3' id='downloadPdf'>Download prijs indicatie</button>");
        $("#downloadPdf").click(function () {
            downloadPdf();
        }); 

    }
}

function fadeInNewStep() {
    this.$makeCake.find("#optionsMakeCake").children().fadeIn("slow");
    this.$makeCake.find("#chooseOptionMakeCake").children().fadeIn("slow");
    this.$makeCake.find("#makeCakeStepInfo").fadeIn("slow");
    this.$makeCake.find("#makeCakeStep").fadeIn("slow");
}

function updateTotalPrice(number) {
    if (this.step === 8) {
        this.chosenOptionsPrices[7] = number;
    } else {
        this.chosenOptionsPrices[this.step - 1] = number;
    }

    this.totalPrice = this.totalPrice + number;
    this.$makeCake.find("#totalPrice").html(this.totalPrice);
}

function addVisualProgress() {
    img = "";
    text = "";
    console.log(this.step);
    switch (this.step) {
        case 1:
            img = "Thema";
            text = chosenOptions[0] + " cake";
            break;
        case 2:
            img = "Personen";
            text = chosenOptions[1] + " personen";
            break;
        case 3:
            img = "Type";
            text = chosenOptions[2] + " cake";
            break;
        case 4:
            img = "Lagen";
            text = chosenOptions[3] + " lagen";
            break;
        case 5:
            img = "Bekleding";
            text = chosenOptions[4] + " bekleding";
            break;
        case 6:
            img = "Vulling";
            text = "Uw gekozen vullingen.";
            break;
        case 8:
            img = "Decoratie";
            text = chosenOptions[7] + " decoratie";
            break;
        default:

            break;
    }

    if (img === "") {
        return;
    }
    appendDiv = "<div class='col-3'><img class='img-fluid' src='/Imgs/BouwTaart/" + img + ".jpg' /><br><div class='text-center'>" + text + "</div ></div >";
    this.$makeCake.find("#visualFeedback").append(appendDiv);
}

function downloadPdf() {
    console.log(this.chosenOptions);
    console.log(this.step6ChosenOptions);
    console.log(this.chosenOptionsPrices);

    if (this.editedChosenOptions === 0) {
        chosenOptions[0] = "Thema " + chosenOptions[0];
        chosenOptions[1] += " personen";
        chosenOptions[2] += " cake";
        chosenOptions[3] += " lagen";
        chosenOptions[4] += " bekleding";
        chosenOptions[7] = "Decoratie " + chosenOptions[7];
        chosenOptions[8] = "Lever datum : " + chosenOptions[8];
        for (i = 0; i < chosenOptions.length; i++) {
            if (chosenOptionsPrices.hasOwnProperty(i)) {
                chosenOptions[i] = chosenOptions[i] + " | " + chosenOptionsPrices[i];
            } else {
                chosenOptions[i] = chosenOptions[i] + " | 0";
            }
        }
        this.editedChosenOptions = 1;
    }

    chosenOptionsString = "chosenOptions=";
    chosenOptions.forEach(function (value) {
        chosenOptionsString += value + ",";
    });

    url = "../downloadPdf.cshtml?" + chosenOptionsString;
    url = url.substring(0, url.length - 1);
    url += "&price=" + this.totalPrice;

    window.open(url); 

   /*$.ajax({
        url: "../downloadPdf.cshtml?" + chosenOptionsString
    }).done(function (response) {
        console.log(response);
    });*/
}

$("#makeCakeNextStep").click(function () {
    getOptionValue();
});


/*var range = "";
if (optionsCount > 2) {
    range += '<div class="col-12"><input type="range" min="1" max="' + optionsCount + '" value="1" id="optionsRange" style="width:80%; margin: 0 10%;"></div>';
} else if (optionsCount <= 2)  {
    range += '<div class="col-12"><input type="range" min="1" max="' + optionsCount + '" value="1" id="optionsRange" style="width:50%; margin: 0 25%;"></div>';
}*/
