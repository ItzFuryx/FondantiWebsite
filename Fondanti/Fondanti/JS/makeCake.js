class makeCake {
    constructor() {
        //Set section-cake as jquery object
        this.$makeCake = $("#section-cake");

        //After numverOfPersons is set it gets used by other functions too
        this.numberOfPersons = 0;

        //Set global values of all steps
        this.titleStep1 = "Kies een thema";
        this.valuesStep1 = ["Verjaardag volwassene", "Bruiloft", "Verjaardag kind"];

        this.titleStep2 = "Selecteer het aantal personen";

        this.titleStep3 = "Kies een type cake";
        this.valuesStep3 = ["Chocolate", "Red velvet", "Biscuitdeeg"];

        this.titleStep4 = "Kies het aantal lagen";

        this.titleStep5 = "Kies een bekleding";

        //Voor prijzen ophalen maak een page aan, send een get request en handel die dynamisch af, .response() in een var zetten
        
        //Set cakeMaker ready for step 1
        this.setStepInfo(1);
    }

    setStepInfo(stepNumber) {
        var stepTitle = "";
        var stepArray = "";
        var optionsCount = 0;
        var boolAndersNamelijk = 0;

        //Get values according to the step
        switch (stepNumber) {
            case 1:
                stepTitle = this.titleStep1;
                stepArray = this.valuesStep1;
                boolAndersNamelijk = 1;
                break;
            case 2:
                stepTitle = this.titleStep2;
                break;
            case 3:
                stepTitle = this.titleStep3;
                stepArray = this.valuesStep3;
                break;
            case 4:
                stepTitle = this.titleStep4;
                break;
            default:
                stepTitle = this.titleStep1;
                stepArray = this.valuesStep1;
                boolAndersNamelijk = 1;
                break;
        }

        //Set step info
        this.$makeCake.find("#makeCakeStep").html("Stap " + stepNumber);
        this.$makeCake.find("#makeCakeStepInfo").html(stepTitle);

        if (stepArray !== "") {
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
                buttonOptionsHtml += '<div class="col"><input type="text" name="options" class="optionText></div>';
            }

            //Set options text
            this.$makeCake.find("#optionsMakeCake").html(optionsHtml);
            //Set options slider
            this.$makeCake.find("#chooseOption").html(buttonOptionsHtml);
        }
    }

    fadeOutCurrentStep() {

    }

    getOptionValue() {
        var radios = this.$makeCake.find(".optionRadios");
        var foundValue = 0;

        //Loop through radiobuttons
        for (var i = 0; i < radios.length; i++)
        {
            if (radios[i].checked) {
                foundValue = 1;
                console.log(radios[i].value);
                break;
            }
        }

        //Check if textbox is set
        if (foundValue === 0) {
            var text = this.$makeCake.find(".optionText").value;
            if (text.length > 0) {
                foundValue = 1;
                console.log(text);
            }
        }

        if (foundValue === 1) {
            //Save values and go next step
        } else {
            //Do nothing or give message to select an option
        }
    }
}



/*var range = "";
if (optionsCount > 2) {
    range += '<div class="col-12"><input type="range" min="1" max="' + optionsCount + '" value="1" id="optionsRange" style="width:80%; margin: 0 10%;"></div>';
} else if (optionsCount <= 2)  {
    range += '<div class="col-12"><input type="range" min="1" max="' + optionsCount + '" value="1" id="optionsRange" style="width:50%; margin: 0 25%;"></div>';
}*/