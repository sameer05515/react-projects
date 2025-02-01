function calculateSipReturns(sipElementObject) {
    const { monthlyInvestment, annualRate, years } = sipElementObject;

    const P = monthlyInvestment;
    const r = annualRate / 100 / 12; // monthly interest rate
    const n = 12 * years;

    const futureValue = P * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const totalInvestment = P * n;
    const profit = futureValue - totalInvestment;

    return {
        futureValue: Math.round(futureValue),
        totalInvestment: Math.round(totalInvestment),
        profit: Math.round(profit)
    };
}

const sip = {
    monthlyInvestment: 1,
    annualRate: 12,
    years: 20
};

const result=calculateSipReturns(sip);
const res={...sip,result};

console.log(res);