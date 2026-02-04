const { integerToFrench } = require('./remplir-cheque.js');

const testCases = [
  // 0–16
  { input: 0, expected: "zéro" },
  { input: 1, expected: "un" },
  { input: 2, expected: "deux" },
  { input: 3, expected: "trois" },
  { input: 4, expected: "quatre" },
  { input: 5, expected: "cinq" },
  { input: 6, expected: "six" },
  { input: 7, expected: "sept" },
  { input: 8, expected: "huit" },
  { input: 9, expected: "neuf" },
  { input: 10, expected: "dix" },
  { input: 11, expected: "onze" },
  { input: 12, expected: "douze" },
  { input: 13, expected: "treize" },
  { input: 14, expected: "quatorze" },
  { input: 15, expected: "quinze" },
  { input: 16, expected: "seize" },

  // 17–19
  { input: 17, expected: "dix-sept" },
  { input: 18, expected: "dix-huit" },
  { input: 19, expected: "dix-neuf" },

  // 20–69
  { input: 20, expected: "vingt" },
  { input: 21, expected: "vingt-et-un" },
  { input: 22, expected: "vingt-deux" },
  { input: 29, expected: "vingt-neuf" },
  { input: 30, expected: "trente" },
  { input: 31, expected: "trente-et-un" },
  { input: 32, expected: "trente-deux" },
  { input: 40, expected: "quarante" },
  { input: 41, expected: "quarante-et-un" },
  { input: 45, expected: "quarante-cinq" },
  { input: 50, expected: "cinquante" },
  { input: 51, expected: "cinquante-et-un" },
  { input: 59, expected: "cinquante-neuf" },
  { input: 60, expected: "soixante" },
  { input: 61, expected: "soixante-et-un" },
  { input: 69, expected: "soixante-neuf" },

  // 70–79
  { input: 70, expected: "soixante-dix" },
  { input: 71, expected: "soixante-et-onze" },
  { input: 72, expected: "soixante-douze" },
  { input: 79, expected: "soixante-dix-neuf" },

  // 80–99
  { input: 80, expected: "quatre-vingts" },
  { input: 81, expected: "quatre-vingt-un" },
  { input: 85, expected: "quatre-vingt-cinq" },
  { input: 89, expected: "quatre-vingt-neuf" },
  { input: 90, expected: "quatre-vingt-dix" },
  { input: 91, expected: "quatre-vingt-onze" },
  { input: 99, expected: "quatre-vingt-dix-neuf" },

  // Hundreds
  { input: 100, expected: "cent" },
  { input: 101, expected: "cent-un" },
  { input: 111, expected: "cent-onze" },
  { input: 121, expected: "cent-vingt-et-un" },
  { input: 180, expected: "cent-quatre-vingts" },
  { input: 199, expected: "cent-quatre-vingt-dix-neuf" },
  { input: 200, expected: "deux-cents" },
  { input: 201, expected: "deux-cent-un" },
  { input: 280, expected: "deux-cent-quatre-vingts" },
  { input: 999, expected: "neuf-cent-quatre-vingt-dix-neuf" },

  // Thousands
  { input: 1000, expected: "mille" },
  { input: 1100, expected: "mille-cent" },
  { input: 1234, expected: "mille-deux-cent-trente-quatre" },
  { input: 1999, expected: "mille-neuf-cent-quatre-vingt-dix-neuf" },
  { input: 21000, expected: "vingt-et-un-mille" },
  { input: 80000, expected: "quatre-vingt-mille" },
  { input: 99999, expected: "quatre-vingt-dix-neuf-mille-neuf-cent-quatre-vingt-dix-neuf" },

  // Hundred-thousands
  { input: 100000, expected: "cent-mille" },
  { input: 100001, expected: "cent-mille-un" },
  { input: 200000, expected: "deux-cents-mille" },
  { input: 999999, expected: "neuf-cent-quatre-vingt-dix-neuf-mille-neuf-cent-quatre-vingt-dix-neuf" },

  // Millions
  { input: 1000000, expected: "un-million" },
  { input: 1000100, expected: "un-million-cent" },
  { input: 1001000, expected: "un-million-mille" },
  { input: 2000000, expected: "deux-millions" },
  { input: 80000000, expected: "quatre-vingt-millions" },
  { input: 99999999, expected: "quatre-vingt-dix-neuf-millions-neuf-cent-quatre-vingt-dix-neuf-mille-neuf-cent-quatre-vingt-dix-neuf" },

  // Milliards / billions (long scale)
  { input: 1000000000, expected: "un-milliard" },
  { input: 1000000000000, expected: "un-billion" },

  // Invalid
  { input: -1, expected: "" },
  { input: NaN, expected: "" },

  // Decimals (truncation)
  { input: 1.5, expected: "un" },
  { input: 0.5, expected: "zéro" }
];

function testIntegerToFrench() {
  let errorCount = 0;
  let totalTests = testCases.length;
  
  console.log("Running tests for integerToFrench()...");
  
  testCases.forEach(({ input, expected }) => {
    const result = integerToFrench(input);
    if (result !== expected) {
      errorCount++;
      console.log(`ERROR ${input}: "${expected}", got: "${result}"`);
    }
  });
  
  if (errorCount === 0) {
    console.log(`All ${totalTests} tests passed!`);
  } else {
    console.log(`${errorCount} out of ${totalTests} tests failed`);
    console.log(`${totalTests - errorCount} tests passed`);
  }
  
  return errorCount === 0;
}

testIntegerToFrench();
