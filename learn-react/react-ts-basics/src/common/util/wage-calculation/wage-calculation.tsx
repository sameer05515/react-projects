// Constants
const DEFAULT_WORKING_DAYS_IN_MONTH = 20;
const DEFAULT_WORKING_HOURS_PER_DAY = 8;
const DEFAULT_EXCHANGE_RATE = 80;

// Calculate wage details (yearly, monthly, daily, hourly)
const calculateWage = (
  ctcPerAnnum:number,
  workingDaysInMonth = DEFAULT_WORKING_DAYS_IN_MONTH,
  workingHoursPerDay = DEFAULT_WORKING_HOURS_PER_DAY
) => {
  const monthlyWage = ctcPerAnnum / 12;
  const dailyWage = monthlyWage / workingDaysInMonth;
  const hourlyWage = dailyWage / workingHoursPerDay;

  return { yearly: ctcPerAnnum, monthly: monthlyWage, daily: dailyWage, hourly: hourlyWage };
};

// Convert INR to Dollars based on exchange rate
const convertInrToDollars = (amount:number, exchangeRate = DEFAULT_EXCHANGE_RATE) => amount / exchangeRate;

// Convert Dollars to INR based on exchange rate
const convertDollarsToInr = (amount:number, exchangeRate = DEFAULT_EXCHANGE_RATE) => amount * exchangeRate;

// Calculate CTC from hourly wage
const calculateCTC = (
  hourlyWage:number,
  workingDaysInMonth = DEFAULT_WORKING_DAYS_IN_MONTH,
  workingHoursPerDay = DEFAULT_WORKING_HOURS_PER_DAY
) => {
  const yearlyCTC = hourlyWage * workingDaysInMonth * workingHoursPerDay * 12;
  return { hourlyWage, ctc: yearlyCTC };
};

// ==================== Usage =====================

// Define CTC (Cost to Company) in INR
const ctcInRupees = 3220000;

// Calculate wage details in INR and USD
const wageDetails = {
  inrWage: calculateWage(ctcInRupees),
  dollarWage: calculateWage(convertInrToDollars(ctcInRupees)),
  inrWagePostTax: calculateWage(ctcInRupees * 0.65),
  dollarWagePostTax: calculateWage(convertInrToDollars(ctcInRupees * 0.65)),
};
// console.log(wageDetails);

// Calculate CTC details in INR and USD
const ctcDetails = {
  dollarCTC: calculateCTC(50), // Assuming hourly wage is in dollars
  inrCTC: calculateCTC(convertDollarsToInr(50)), // Convert to INR hourly wage
  reverseCTC: calculateCTC(wageDetails.inrWage.hourly), // Reverse calculation from hourly wage in INR
  dollarMinCTC: calculateCTC(25), // Assuming hourly wage is in dollars
  inrMinCTC: calculateCTC(convertDollarsToInr(25)), // Convert to INR hourly wage
};

// console.log("CTC Details:\n", ctcDetails, "\n");

export {wageDetails, ctcDetails};
