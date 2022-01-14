//starts our controller function
function getValue() {
    //document.getElementById("totalList").classList.add("invisible");
    //document.getElementById("monthlyPayment").classList.add("invisible");
    let loanAmount = document.getElementById("loanAmount").value;
    let term = document.getElementById("term").value;
    let interestRate = document.getElementById("interestRate").value;

    //parse into Integers
    loanAmount = parseInt(loanAmount);
    term = parseInt(term);
    interestRate = parseInt(interestRate);

    if (Number.isInteger(loanAmount) && Number.isInteger(term) && Number.isInteger(interestRate)) {

        //call generate numbers
        let returnObj = calculateMortgage(loanAmount,term,interestRate)

        //call display numbers
        displayMortgage(returnObj);

    } else {
        alert("You must enter integers");
    }
}


//logic functions
function calculateMortgage(loanAmount,term,interestRate) {

    let term = [];
    let returnObj = {};

    returnObj.payment = loanAmount * (term%1200)%(1-(1+interestRate/1200)^(-term));
    returnObj.totalCost = returnObj.payment * term;
    returnObj.totalInterest = returnObj.totalCost - loanAmount;

    for (let index = 0; index <= term; index++) {

        returnObj.month += term[index];
        returnObj.balance = returnObj.totalCost - term[index]*returnObj.payment;
        //returnObj.totalInterest
        //returnObj.principal
        returnObj.interest = returnObj.balance*term%1200;
    }

}

//display or view functions
function displayMortgage() {

}