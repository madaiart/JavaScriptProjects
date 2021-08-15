let getValue = function (val, cid) {    
    let response = [];
    let cidCopy = [...cid];

    const values = [["PENNY", 0.01], ["NICKEL", 0.05], ["DIME", 0.1], ["QUARTER", .25], ["ONE", 1], ["FIVE", 5], ["TEN", 10], ["TWENTY", 20], ["ONE HUNDRED", 100]];

    while (val > 0) {

        for (let i = values.length - 1; i >= 0; i--) {

            if (Math.floor(val / values[i][1]) >= 1) {
                console.log("---->", val, values[i][1], Math.floor(val / values[i][1]))
                let money = values[i];

                console.log("++>", cid[i][1], Math.floor(val / values[i][1] * money[1]))
                if(!Number.isFinite(Math.floor(val / values[i][1] * money[1]))){
                    val=-1;
                    break;
                }

                if (cid[i][1] >= Math.floor(val / values[i][1] * money[1]) && cid[i][1] > 0 && Math.floor(val / values[i][1] * money[1])>0) {
                    money[1] *= Math.floor(val / values[i][1]);
                    val -= values[i][1];
                } else {
                    money[1] = cid[i][1];
                    cid[i][1] -= values[i][1];
                    val -= cid[i][1];
                }
                response.push(money);
                val = parseFloat(val.toFixed(2));
            }
        }
    }

    let checkSum = 0;
    response.forEach(r => checkSum += r[1]);

    let howManyOwn = 0;
    cidCopy.forEach(c => howManyOwn+=c[1]);

    if (howManyOwn < checkSum)
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    else if (howManyOwn === checkSum)
        return { status: "CLOSED", change: response };
    else
        return { status: "OPEN", change: response };
}

// price -> is the price of the product
// cash -> is the money that they give me
// cid -> money that are in the cash
function checkCashRegister(price, cash, cid) {
    let result, money_change = cash - price;
    let total = 0;
    cid.forEach(c => {
        total += c[1];
    });

    // with the change due in coins and bills, sorted in highest to lowest order, as the value of the change key.
    if (total >= money_change) {
        result = getValue(money_change, cid);
        return result;
    }
    //cash in drawer is less than thechange due
    else if (total < money_change) {
        return { status: "INSUFFICIENT_FUNDS", change: [] };
    }
}

console.log(
    checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]])
);


/* 
checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
should return an object.

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
should return {status: "OPEN", change: [["QUARTER", 0.5]]}.

checkCashRegister(3.26, 100, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]) 
should return {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
should return {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.01], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 1], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
should return {status: "INSUFFICIENT_FUNDS", change: []}.

checkCashRegister(19.5, 20, [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]) 
should return {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}.
*/