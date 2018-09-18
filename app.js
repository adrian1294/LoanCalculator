//
//
//

document.getElementById("results").style.display = "none";
document.getElementById("loader").style.display = "none";
//listen for submit button
submitBtn = document.getElementById("loan-form");
//listen for reset button
resetBtn = document.getElementById("btn-reset");

submitBtn.addEventListener("submit", function(e){
    document.getElementById("results").style.display = "none";
    document.getElementById("loader").style.display = "block";
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

resetBtn.addEventListener("click", function(e){
    // alert("Si Llega");
    const clearLoanAmount = document.getElementById("amount");
    const clearInterestRateUI = document.getElementById("interest");
    const clearYearsUI = document.getElementById("years");

    document.getElementById("results").style.display = "none";
    document.getElementById("loader").style.display = "none";
    clearLoanAmount.value="";
    clearInterestRateUI.value="";
    clearYearsUI.value="";
});



function calculateResults(e){
    //Retrieve UI Values
    const loanAmount = document.getElementById("amount");
    const interestRateUI = document.getElementById("interest");
    const yearsUI = document.getElementById("years");

    const monthlyPayment = document.getElementById("monthly-payment");
    const totalPayment = document.getElementById("total-payment");
    const totalIterest = document.getElementById("total-interest");

    console.log(loanAmount.value, interestRateUI.value, yearsUI.value);
    //console.log(e.type);

    //Calulates Values
    const principal = parseFloat(loanAmount.value);
    const calculateInterest = parseFloat(interestRateUI.value)/ 100 / 12;
    const calculatePayment = parseFloat(yearsUI.value)*12;

    //Compute Monthly Payments
    const x = Math.pow( 1+ calculateInterest, calculatePayment);
    const monthly = (principal * x * calculateInterest) / (x - 1);
    //validate that the value is not Infinite
    if(!isFinite(monthly)){
        document.getElementById("results").style.display = "none";
        document.getElementById("loader").style.display = "none";
       manageError('Please, review your numbers');
    }else{
    //console.log(monthly);
    monthlyPayment.value = monthly.toFixed(2);
    totalPayment.value = (monthly * calculatePayment).toFixed(2);
    totalIterest.value = (monthly * calculatePayment - principal).toFixed(2);
    document.getElementById("results").style.display = "block";
    document.getElementById("loader").style.display = "none";

    }
    // loanAmount.value="";
    // interestRateUI.value="";
    // yearsUI.value="";
    //e.preventDefault();
}
function manageError(errorMsg){
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //Create div to show error
    const errorDiv = document.createElement("div");
    errorDiv.className = "alert alert-danger";
    errorDiv.id="customAlert";
    
    //Create Text Node and append child
    const errorTextNode = document.createTextNode(errorMsg);
    errorDiv.appendChild(errorTextNode);
    //Insert ErrorMSG
    card.insertBefore(errorDiv, heading);
    
    window.setTimeout(clearError, 3000);
}
//Clear MSG
function clearError(){
    document.getElementById("customAlert").remove();
}