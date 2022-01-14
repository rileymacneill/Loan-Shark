//get the values from the UI
//starts our controller function
function getValues() {
    //get values from page
    let startValue = document.getElementById("startValue").value;
    let endValue = document.getElementById("endValue").value;

    //parse into Integers
    startValue = parseInt(startValue);
    endValue = parseInt(endValue);

    if (Number.isInteger(startValue) && Number.isInteger(endValue)) {

        //call generate numbers
        numbers = generateNumbers(startValue, endValue);

        //call display numbers
        displayNumbers(numbers);

    } else {
        alert("You must enter integers");
    }
}

//generate numbers from the start value to the end value
//logic function(s)
function generateNumbers(sValue, eValue) {

    let numbers = [];

    //we want to get all numbers from start to end
    for (let index = sValue; index <= eValue; index++) {

        //this will execute in a loop until index = eValue
        numbers.push(index);
    }

    return numbers;

}

//display numbers and mark even numbers bold
//display or view functions
function displayNumbers(numbers) {

    let templateRows = "";

    for (let index = 0; index < numbers.length; index++) {

        let className = "even";
        let number = numbers[index];

        if (number % 2 == 0) {
            className = "even";
        } else {
            className = "odd";
        }
        
        //This does render correctly with Prism see the source
        templateRows += `<tr><td class="${className}">${number}</td></tr>`;
    }

    document.getElementById("results").innerHTML = templateRows;

}