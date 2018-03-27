
function setupMakeCake() {
    //Set empty array for chosen option
    this.chosenOptions = [];

    //Global step, keeps count on which step the user is
    this.step = 1;

    //Set section-cake as jquery object
    this.$makeCake = $("#section-cake");

    //After numverOfPersons is set it gets used by other functions too
    this.numberOfPersons = 0;

    //Set global values of all steps
    this.titleStep1 = "Kies een thema";
    this.valuesStep1 = ["Verjaardag volwassene", "Bruiloft", "Verjaardag kind"];

    this.titleStep2 = "Selecteer het aantal personen";
    this.valuesStep2 = ["5", "10", "15"];

    this.titleStep3 = "Kies een type cake";
    this.valuesStep3 = ["Chocolate", "Red velvet", "Biscuitdeeg"];

    this.titleStep4 = "Kies het aantal lagen";

    this.titleStep5 = "Kies een bekleding";

    //Voor prijzen ophalen maak een page aan, send een get request en handel die dynamisch af, .response() in een var zetten
        
    //Set cakeMaker ready for step 1
    this.setStepInfo();
}

function setStepInfo() {
    var stepTitle = "";
    var stepArray = "";
    var optionsCount = 0;
    var boolAndersNamelijk = 0;

    //Get values according to the step
    switch (this.step) {
        case 1:
            stepTitle = this.titleStep1;
            stepArray = this.valuesStep1;
            boolAndersNamelijk = 1;
            break;
        case 2:
            stepTitle = this.titleStep2;
            stepArray = this.valuesStep2;
            break;
        case 3:
            stepTitle = this.titleStep3;
            stepArray = this.valuesStep3;
            break;
        case 4:
            stepTitle = this.titleStep4;
            stepArray = "";
            break;
        default:
            stepTitle = this.titleStep1;
            stepArray = this.valuesStep1;
            boolAndersNamelijk = 1;
            break;
    }

    //Set step info
    this.$makeCake.find("#makeCakeStep").html("Stap " + this.step);
    this.$makeCake.find("#makeCakeStepInfo").html(stepTitle);
    if (stepArray !== "" && stepArray != "undefined" && typeof stepArray !== "undefined") {
        var optionsHtml = "";
        var buttonOptionsHtml = "";

        stepArray.forEach(function (value) {
            optionsCount++;
            optionsHtml += '<div class="col">' + value + '</div>';
            buttonOptionsHtml += '<div class="col"><input type="radio" name="options" value="' + value + '" class="optionRadios"></div>';
        });

        if (boolAndersNamelijk === 1) {
            optionsCount++;
            optionsHtml += '<div class="col">Anders, namelijk...</div>';
            buttonOptionsHtml += '<div class="col"><input type="text" name="options" class="w-75 optionText"></div>';
        }

        //Set options text
        this.$makeCake.find("#optionsMakeCake").html(optionsHtml);
        //Set options slider
        this.$makeCake.find("#chooseOptionMakeCake").html(buttonOptionsHtml);
    }
}

function getOptionValue() {
    var radios = this.$makeCake.find(".optionRadios");
    var foundValue = 0;

    //Loop through radiobuttons
    for (var i = 0; i < radios.length; i++)
    {
        if (radios[i].checked) {
            foundValue = 1;
            this.chosenOptions.push(radios[i].value); 
            break;
        }
    }

    //Check if textbox is set
    if (foundValue === 0) {
        andersNamelijk = "";
        andersNamelijk = this.$makeCake.find(".optionText").value;

        if (typeof text !== "undefined" && text !== "") {
            foundValue = 1;
            console.log(andersNamelijk);
            this.chosenOptions.push(andersNamelijk);
        }
    }

    if (foundValue === 1) {
        //Save values and go next step
        this.clearCurrentStep();
    } else {
        //Do nothing or give message to select an option
        console.log("rip");
    }
}

function clearCurrentStep() {
    this.$makeCake.find("#optionsMakeCake").children().fadeOut(500);
    this.$makeCake.find("#chooseOptionMakeCake").children().fadeOut(500);
    this.$makeCake.find("#makeCakeStepInfo").fadeOut(500);
    this.$makeCake.find("#makeCakeStep").fadeOut(500);
    this.$makeCake.find("#optionsMakeCake").children().remove();
    this.$makeCake.find("#chooseOptionMakeCake").children().remove();
    this.step++;
    setTimeout(this.setStepInfo, 500);
    setTimeout(this.fadeInNewStep, 550);
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