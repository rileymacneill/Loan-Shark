//starts our controller function
function getValues() {
    //document.getElementById("totalList").classList.add("invisible");
    //document.getElementById("monthlyPayment").classList.add("invisible");
    let loanAmount = document.getElementById("amountValue").value;
    let termValue = document.getElementById("termValue").value;
    let interestRate = document.getElementById("interestValue").value;

    //parse into Integers
    loanAmount = parseInt(loanAmount);
    termValue = parseInt(termValue);
    interestRate = parseInt(interestRate);

    if (Number.isInteger(loanAmount) && Number.isInteger(termValue) && Number.isInteger(interestRate)) {

        //call generate numbers
        let returnObj = calculateMortgage(loanAmount,termValue,interestRate);

        //call display numbers
        displayMortgage(returnObj);

    } else {
        alert("You must enter integers");
    }
}


//logic functions
function calculateMortgage(loanAmount,termValue,interestRate) {

    let termArray = [];
    let returnObj = {};

    returnObj.payment = loanAmount * (termValue/1200)/(1-(1+interestRate/1200)**(-termValue));
    returnObj.totalCost = returnObj.payment * termValue;
    returnObj.totalInterest = returnObj.totalCost - loanAmount;

    for (let index = 0; index <= termValue; index++) {

        returnObj.month += termValue[index];
        returnObj.balance = returnObj.totalCost - termValue[index]*returnObj.payment;
        //returnObj.totalInterest
        //returnObj.principal
        returnObj.interest = returnObj.balance*termValue%1200;
    }

}

//display or view functions
function displayMortgage() {

}