const percentAll = document.querySelectorAll(".percentBx");
const billAmount = document.querySelector(".bill-amount");
const customPercent = document.querySelector(".customPercent");
const totalAmountVal = document.querySelector(".total-amount-value h1");
const resetBtn = document.querySelector(".resetBtn");
let tipAmountVal = document.querySelector(".tip-amount-value h1");
let numsOfPeopleInput = document.querySelector(".num-of-peoples");

let calcVal;
let TotalVal;

for (let i = 0; i < percentAll.length; i++) {
    let percentDiv = percentAll[i];
    percentDiv.addEventListener("click", (e) => {
        // toggle the clicked percentDiv
        toggleClicked(e.target);

        let textVal = e.target.innerText;
        textVal = parseInt(textVal.replace("%", ""));
        let billAmountVal = billAmount.value;
        calcVal = calculatePercentage(textVal, billAmountVal);
        if(tipAmountVal.innerText !== ""){
            TotalVal = parseInt(billAmountVal) / parseInt(numsOfPeopleInput.value) + parseFloat(tipAmountVal.innerText);
        }
        // tipAmountVal.innerText = val;
        appendTipAmmount(calcVal, TotalVal);
    });
}

const calculatePercentage = (percent, billAmount) => {
    return Math.round(((percent / 100) * billAmount) * 100) / 100;
}

customPercent.addEventListener("input", (e) => {
    for (let i = 0; i < percentAll.length; i++) {
        let percentDiv = percentAll[i];
        if (percentDiv.classList.contains("active")) {
            percentDiv.classList.remove("active");
        }
    }
    let billAmountVal = billAmount.value;
    calcVal = calculatePercentage(parseFloat(e.target.value), billAmountVal);
    if(tipAmountVal.innerText !== ""){
        TotalVal = parseInt(billAmountVal) / parseInt(numsOfPeopleInput.value) + parseFloat(tipAmountVal.innerText);
    }
    appendTipAmmount(calcVal, TotalVal);
});

numsOfPeopleInput.addEventListener("input", (e) => {
    if (Number(parseInt(e.target.value))) {
        tipAmountVal.innerText = Math.round((calcVal / parseInt(e.target.value)) * 100) / 100;
    }
    if(tipAmountVal.innerText !== "" && e.target.value !== "0"){
        TotalVal = parseInt(billAmount.value) / parseInt(numsOfPeopleInput.value) + parseFloat(tipAmountVal.innerText);
        totalAmountVal.innerText = Math.round(TotalVal * 100) / 100;
    }else {
        totalAmountVal.innerText = Math.round((calcVal + parseFloat(billAmount.value)) * 100) / 100;
    }
});

const toggleClicked = (div) => {
    for (let i = 0; i < percentAll.length; i++) {
        let percentDiv = percentAll[i];
        if (percentDiv.classList.contains("active")) {
            percentDiv.classList.remove("active");
        }
    }
    div.classList.add("active");
}

const appendTipAmmount = (calcVal, TotalVal) => {
    if(numsOfPeopleInput.value !== "" && numsOfPeopleInput.value !== "0"){
        tipAmountVal.innerText = Math.round((calcVal / parseInt(numsOfPeopleInput.value)) * 100) / 100;
        totalAmountVal.innerText = Math.round(TotalVal * 100) / 100;
    }
}   

resetBtn.addEventListener("click", () => {
    billAmount.value = 0;
    numsOfPeopleInput.value = 0;
    tipAmountVal.innerText = "0";
    totalAmountVal.innerText = "0";
});