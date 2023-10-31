# Storage Rent Calculation System

## Developed Features

### `calculateMonthlyRent(baseMonthlyRent: number, leaseStartDate: Date, startDate: Date, endDate: Date, dayOfMonthRentDue: number, rentIncreaseFrequency: number, rentChangeRate: number): MonthlyRentRecords`
Calculates the monthly rent records for a given lease.
- **Parameters:**
  - `baseMonthlyRent`: The starting monthly rent.
  - `leaseStartDate`: The start date of the lease.
  - `startDate`: The start date for calculating the rent records.
  - `endDate`: The end date for calculating the rent records.
  - `dayOfMonthRentDue`: The day of the month when rent is due.
  - `rentIncreaseFrequency`: The frequency, in months, at which the rent increases.
  - `rentChangeRate`: The rate at which the rent increases each time.
- **Returns:** An array of `MonthlyRentRecord`. It includes pro-rated rent for the first month if the lease starts after the 1st day of the month and handles rent increases at the specified frequency.

### `getDaysInMonth(date: Date): number`
Returns the number of days in the given month.
- **Parameters:**
  - `date`: A `Date` object representing the month.
- **Returns:** The number of days in the month.

## Testing

The system includes a comprehensive suite of unit tests to validate the functionality. The tests developed should return MonthlyRentRecords when rent decreases between due dates. The tests are written using Jest and are located in `test/StorageRent/StorageRent.test.ts`.

Also, the tests cases was manually calculated using the formula below, to ensure that there was no errors in the tests:

![Formula](/src/images/formula.png)

Example using a test case:

![Formula Example](/src/images/formulaExample.png)

## How to Run

1. Ensure you have Node.js and npm installed.
2. Clone the repository.
3. Navigate to the project directory.
4. Run `npm install` to install dependencies.
5. Run `npx jest` to execute the unit tests.
