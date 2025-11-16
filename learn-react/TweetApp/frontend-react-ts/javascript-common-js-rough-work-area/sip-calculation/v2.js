function roundToTwo(num) {
    return Math.round(num * 10000) / 10000;
}

function calculateSipReturns(sipElementObject) {
    const { monthlyInvestment, annualRate, years } = sipElementObject;

    const P = monthlyInvestment;
    const r = annualRate / 100 / 12;
    const n = 12 * years;

    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = P * n;
    const profit = futureValue - totalInvestment;

    // const round = num => Math.round(num * 100) / 100;

    return {
        futureValue: roundToTwo(futureValue),
        totalInvestment: roundToTwo(totalInvestment),
        profit: roundToTwo(profit)
    };
}

const sip = {
    monthlyInvestment: 0.01,
    annualRate: 12,
    years: 20
};

const result=calculateSipReturns(sip);
const res={...sip,result};

console.log(res);