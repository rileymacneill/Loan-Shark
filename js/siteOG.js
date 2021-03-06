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
        let returnObj = calculateMortgage(loanAmount, termValue, interestRate);

        //call display numbers
        displayMortgage(returnObj);

    } else {
        alert("You must enter integers");
    }
}


//logic functions
function calculateMortgage(loanAmount, termValue, interestRate) {

    let mortgageArray = [];
    let returnObj = {};

    returnObj.loanAmount = loanAmount;
    returnObj.monthlyPayment = loanAmount * (interestRate / 1200) / (1 - (1 + interestRate / 1200) ** (-termValue));
    returnObj.totalCost = returnObj.monthlyPayment * termValue;
    returnObj.totalInterest = returnObj.totalCost - loanAmount;
    returnObj.totalTerm = termValue;

    for (let index = 0; index <= termValue; index++) {

        mortgageArray = index + 1;
        returnObj.balance = returnObj.totalCost - returnObj.month * returnObj.monthlyPayment;
        returnObj.interestPayment = returnObj.balance * returnObj.month / 1200;
        returnObj.principalPayment = returnObj.monthlyPayment - returnObj.interestPayment;
    }
    returnObj.month = mortgageArray;
    return returnObj;
}

//display or view functions
function displayMortgage(returnObj) {

    let tableBody = document.getElementById("results");
    //Get the template
    let templateRow = document.getElementById("appResultsTemplate");
   
    document.getElementById("monthlyPayment").innerHTML = `${returnObj.monthlyPayment}`;
    document.getElementById("totalPrincipal").innerHTML = `${returnObj.loanAmount}`;
    document.getElementById("totalInterest").innerHTML = `${returnObj.totalInterest}`;
    document.getElementById("totalCost").innerHTML = `${returnObj.totalCost}`;

    for (let index = 0; index < returnObj.month; index++) {
        let tableRow = document.importNode(templateRow.content, true);
        //Grab the 'td' and put into an array
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = returnObj.month[index];
        rowCols[1].textContent = returnObj.monthlyPayment;
        rowCols[2].textContent = returnObj.principalPayment[index];
        rowCols[3].textContent = returnObj.interestPayment[index];
        rowCols[4].textContent = returnObj.totalInterest[index];
        rowCols[5].textContent = returnObj.balance[index];


        tableBody.appendChild(tableRow);
    }

}