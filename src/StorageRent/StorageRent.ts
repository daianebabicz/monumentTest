export type MonthlyRentRecord = {
    vacancy: boolean,
    rentAmount: number,
    rentDueDate: Date
};

export type MonthlyRentRecords = Array<MonthlyRentRecord>;

export function calculateMonthlyRent(
    baseMonthlyRent: number,
    leaseStartDate: Date,
    startDate: Date,
    endDate: Date,
    dayOfMonthRentDue: number,
    rentIncreaseFrequency: number,
    rentChangeRate: number
): MonthlyRentRecords {
    const monthlyRentRecords: MonthlyRentRecords = [];
    let currentRent = baseMonthlyRent;
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (currentDate <= leaseStartDate && leaseStartDate.getDate() < dayOfMonthRentDue) {
            const remainingDays = dayOfMonthRentDue - leaseStartDate.getDate();
            const rentAmount = +(baseMonthlyRent * (remainingDays / getDaysInMonth(leaseStartDate))).toFixed(2);

            monthlyRentRecords.push({
                vacancy: false,
                rentAmount: rentAmount,
                rentDueDate: new Date(currentDate)
            });

            currentDate = new Date(leaseStartDate.getFullYear(), leaseStartDate.getMonth(), dayOfMonthRentDue);
        } else {
            monthlyRentRecords.push({
                vacancy: false,
                rentAmount: currentRent,
                rentDueDate: new Date(currentDate.getFullYear(), currentDate.getMonth(), dayOfMonthRentDue)
            });

            if (rentIncreaseFrequency > 0 && ((currentDate.getMonth() - startDate.getMonth() + 12 * (currentDate.getFullYear() - startDate.getFullYear())) % rentIncreaseFrequency === 0)) {
                currentRent = calculateNewMonthlyRent(currentRent, rentChangeRate);
                currentRent = +currentRent.toFixed(2);
            }

            currentDate.setMonth(currentDate.getMonth() + 1);
        }
    }

    return monthlyRentRecords;
}

function calculateNewMonthlyRent(baseMonthlyRent: number, rentChangeRate: number) {
    return baseMonthlyRent * (1 + rentChangeRate);
}

function getDaysInMonth(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    if (month === 1) {
        return isLeapYear(year) ? 29 : 28;
    } else if (month === 3 || month === 5 || month === 8 || month === 10) {
        return 30;
    } else {
        return 30;
    }
}

function isLeapYear(year: number) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}
