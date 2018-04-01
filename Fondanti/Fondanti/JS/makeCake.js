
function setupMakeCake() {
    //Set empty array for chosen option
    this.chosenOptions = [];
    this.step6ChosenOptions = [];
    this.totalPrice = 0;

    //Global step, keeps count on which step the user is
    this.step = 1;

    //Set section-cake as jquery object
    this.$makeCake = $("#section-cake");

    //After numverOfPersons is set it gets used by other functions too
    this.numberOfPersons = 0;

    //Set global values of all steps
    //Thema
    this.titleStep1 = "Kies een thema";
    this.valuesStep1 = ["Verjaardag volwassene", "Bruiloft", "Verjaardag kind"];

    //Number of persons
    this.titleStep2 = "Selecteer het aantal personen";

    //Cake type
    this.titleStep3 = "Kies een type cake";
    this.valuesStep3 = ["Chocolate", "Red velvet", "Biscuitdeeg"];
    this.pricesStep3 = [2, 3, 1];

    //Number of layers (max number of layers is 15 / number of persons)
    this.titleStep4 = "Kies het aantal lagen";

    //Coating
    this.titleStep5 = "Kies een bekleding";
    this.valuesStep5 = ["Fondant", "Marsepein", "Beide"];
    this.pricesStep5 = [1, 3, 4];

    //Fill
    this.titleStep6 = "Kies een vulling";
    this.valuesStep6 = ["Champagneroom met verse frambozen", "Gele room met Oreo vulling", "Kindervulling (vruchten compote en room)"];
    this.pricesStep6 = [3, 2, 1];

    //Allergy
    this.titleStep7 = "Allergieën";
    this.valuesStep7 = ["Glutenvrij", "Geen"];

    //Decoration
    this.titleStep8 = "Kies het niveau van decoratie";
    this.valuesStep8 = ["Eenvoudig", "Gemiddeld", "Uitgebreid"];
    this.pricesStep8 = [1, 2, 3];



    //Voor prijzen ophalen maak een page aan, send een get request en handel die dynamisch af, .response() in een var zetten
        
    //Set cakeMaker ready for first step
    this.setStepInfo();
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

    if (this.step !== 2 && this.step !== 4 && this.step !== 6) {
        for (i = 0; i < this.stepArray.length; i++) {
            optionsCount++;
            optionsHtml += '<div class="col">' + this.stepArray[i];
            if (this.priceArray !== "") {
                optionsHtml += '<br>€' + this.priceArray[i] + ' p.p.';
            }
            
            optionsHtml += '</div>';
            buttonOptionsHtml += '<div class="col"><input type="radio" name="options" value="' + this.stepArray[i] + '" class="optionRadios"></div>';
        }

        /*this.stepArray.forEach(function (value) {
            optionsCount++;
            optionsHtml += '<div class="col">' + value + '</div>';
            buttonOptionsHtml += '<div class="col"><input type="radio" name="options" value="' + value + '" class="optionRadios"></div>';
        });*/

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
        this.min = Math.floor(chosenOptions[1] / 20);
        this.max = Math.floor(chosenOptions[1] / 15);

        //Edit minimum and maximum values if needed
        if (this.min === 0) {
            this.min = 1;
        }

        if (this.max > 15) {
            this.max = 15;
        } else if (this.max === 0) {
            this.max = 1;
        }

        optionsHtml += '<div class="col"><input type="number" min="' + this.min + '" max="' + this.max + '" class="text-center mb-2 optionNumber"></div>';
        if (max === 1) {
            buttonOptionsHtml += '<div class="col text-center mb-2">Maximaal 1 laag (Minimaal 15 personen per laag)</div>';
        } else {
            buttonOptionsHtml += '<div class="col text-center mb-2">Minimaal 1, maximaal ' + this.max + ' lagen</div>';
        }
        //Set options text
        this.$makeCake.find("#optionsMakeCake").html(optionsHtml);
        //Set options slider
        this.$makeCake.find("#chooseOptionMakeCake").html(buttonOptionsHtml);

    } else if (this.step === 6) {
        //Step 6
        for (i = 0; i < chosenOptions[3]; i++) {
            stepArray.forEach(function (value) {
                optionsCount++;
                optionsHtml += '<div class="col-12 col-sm-4">Laag ' + (i + 1) + '<br>' + value + '<br> <input type="radio" name="options' + i + '" value="' + value + '" class="optionRadios' + i + '"></div>';
            });
        }

        //Set options text
        this.$makeCake.find("#optionsMakeCake").html(optionsHtml);
        //Set options slider
        //this.$makeCake.find("#chooseOptionMakeCake").html(buttonOptionsHtml);
    }
}

function getOptionValue() {
    if (this.step !== 2 && this.step !== 4 && this.step !== 6) {
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
                    break;
                }
            }
        }
    } else if (this.step === 2 || this.step === 4) {
        //Step 2 and 4 userinput is a number
        number = this.$makeCake.find(".optionNumber").val();

        if (typeof number !== "undefined" && !isNaN(parseFloat(number)) && isFinite(number)) {
            if (this.step === 4) {
                if (number <= this.max) {
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
        }

        if (parseInt(chosenOptions[3]) === this.step6ChosenOptions.length) {
            foundValue = 1;
        } else {
            this.step6ChosenOptions = [];
        }
    }

    if (foundValue === 1) {
        //Save values and go next step
        //this.addPrice();
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
    this.step++;
    setTimeout(this.setStepInfo, 250);
    setTimeout(this.fadeInNewStep, 250);
}

function fadeInNewStep() {
    this.$makeCake.find("#optionsMakeCake").children().fadeIn("slow");
    this.$makeCake.find("#chooseOptionMakeCake").children().fadeIn("slow");
    this.$makeCake.find("#makeCakeStepInfo").fadeIn("slow");
    this.$makeCake.find("#makeCakeStep").fadeIn("slow");
}



/*var range = "";
if (optionsCount > 2) {
    range += '<div class="col-12"><input type="range" min="1" max="' + optionsCount + '" value="1" id="optionsRange" style="width:80%; margin: 0 10%;"></div>';
} else if (optionsCount <= 2)  {
    range += '<div class="col-12"><input type="range" min="1" max="' + optionsCount + '" value="1" id="optionsRange" style="width:50%; margin: 0 25%;"></div>';
}*/
