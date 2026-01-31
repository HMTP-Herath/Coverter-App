Singlish to Sinhala – Playwright Automation 🇱🇰
 Project Description

This project focuses on automated functional and UI testing of the Singlish to Sinhala transliteration system available at:

 https://www.swifttranslator.com/

The automation suite validates:

Correct handling of Singlish inputs

System robustness against invalid inputs

UI stability and usability under different scenarios

Real-time UI behavior during transliteration

Playwright is used to ensure reliable, fast, and modern browser automation.

🛠️ Technologies Used

Playwright

JavaScript

Node.js

Chromium Browser

Setup Instructions
1️ Install Node.js

Download and install Node.js from:
https://nodejs.org/

2️ Clone the Repository
git clone <your-repository-url>
cd <project-folder>

3️ Install Dependencies
npm install

4️ Install Playwright Browsers
npx playwright install

Running the Tests
Run All Tests
npx playwright test
 Run Tests Using Playwright UI
npx playwright test --ui

* Run Individual Test Files
npx playwright test pos_fun.spec.js
npx playwright test neg_fun.spec.js
npx playwright test pos_ui.spec.js
npx playwright test neg_ui.spec.js

* Run Tests with List Reporter
npx playwright test pos_fun.spec.js --reporter=list
npx playwright test neg_fun.spec.js --reporter=list

* Run Tests in Headed Mode (Debugging)
npx playwright test --headed

 Test Reports
* Generate HTML Report
npx playwright test --reporter=html

* Open the HTML Report
npm run report

