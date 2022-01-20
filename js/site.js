//starts our controller function
function getValues() {

    let loanAmount = document.getElementById("amountValue").value;
    let termValue = document.getElementById("termValue").value;
    let interestRate = document.getElementById("interestValue").value;

    //parse into Integers
    loanAmount = parseInt(loanAmount);
    termValue = parseInt(termValue);
    interestRate = parseInt(interestRate);

    if (Number.isInteger(loanAmount) && Number.isInteger(termValue) && Number.isInteger(interestRate)) {

        //call generate numbers
        let tableArray = calculateMortgage(loanAmount, termValue, interestRate);

        //call display numbers
        displayMortgage(tableArray);

    } else {
        alert("You must enter integers");
    }
}


//logic functions
function calculateMortgage(loanAmount, termValue, interestRate) {

    let returnArray = [];
 
    monthlyPayment = loanAmount * (interestRate / 1200) / (1 - (1 + interestRate / 1200) ** (-termValue));
    totalCost = monthlyPayment * termValue;
    totalInterest = totalCost - loanAmount;
    loanTotal = loanAmount;
    balRemaining = loanTotal;
    interestSum = 0;

    for (let index = 1; index <= termValue; index++) {

        //Month
        returnArray.push(index);
        //Monthly Payment
        returnArray.push(monthlyPayment.toFixed(2));
        //Interest Payment
        interestPayment = balRemaining * interestRate / 1200;
        returnArray.push(interestPayment.toFixed(2));
        //Principal Payment
        principalPayment = monthlyPayment - interestPayment;
        returnArray.push(principalPayment.toFixed(2));
        //Total Interest
        interestSum = interestSum + interestPayment;
        returnArray.push(interestSum.toFixed(2));
        //Remaining Balance
        balRemaining = balRemaining - principalPayment;
        returnArray.push(balRemaining.toFixed(2));
    }
    return returnArray;
}

//display or view functions
function displayMortgage(tableArray) {

    let tableBody = document.getElementById("results");
    //Get the template
    let templateRow = document.getElementById("appResultsTemplate");

    document.getElementById("monthlyPayment").innerHTML = `$${monthlyPayment.toFixed(2)}`;
    document.getElementById("totalPrincipal").innerHTML = `$${loanTotal.toFixed(2)}`;
    document.getElementById("totalInterest").innerHTML = `$${totalInterest.toFixed(2)}`;
    document.getElementById("totalCost").innerHTML = `$${totalCost.toFixed(2)}`;

    tableBody.innerHTML = "";

    for (let index = 0; index <= tableArray.length; index += 6) {
        let tableRow = document.importNode(templateRow.content, true);
        //Grab the 'td' and put into an array
        let rowCols = tableRow.querySelectorAll("td");

        rowCols[0].textContent = tableArray[index];
        rowCols[1].textContent = tableArray[index + 1];
        rowCols[2].textContent = tableArray[index + 3];
        rowCols[3].textContent = tableArray[index + 2];
        rowCols[4].textContent = tableArray[index + 4];
        rowCols[5].textContent = tableArray[index + 5];

        tableBody.appendChild(tableRow);
    }
}