window.addEventListener("load", function() {
  class Model {
    constructor() {
      this._amount = 0;
      this._date = new Date();
    }
    // setter
    set amount(number) {
      if (!isNaN(number) && number > 0 && number < 1_000_000_000)
        this._amount = Math.trunc(number*100)/100;
      else
        this._amount = 0;
    }
    // returns amount with french format 12 345,60
    get amountWithComma() {
      if (this._amount > 0)
        return this._amount.toLocaleString("fr-FR", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        });
      else return "";
    }
    // returns amount as text in french language  
    get amountAsText() {
      var text = "";
      if (this._amount > 0) {
        var euros = Math.trunc(this._amount);
        var cents = Math.trunc(this._amount * 100) % 100;
        text = integerToFrench(euros) + " euro" + (euros > 1 ? "s" : "");
        if (cents > 0) text += " et " + cents + " centime" + (cents > 1 ? "s" : "");
      }
      return text;
    }
    // returns date in french format dd/mm/yyyy
    get date() {
      return this._date.toLocaleDateString('fr-FR');
    }
  }

  class View {
    constructor() {
      this._input = document.getElementById("remplir-cheque-input");
      this._outputNumber = document.getElementById("remplir-cheque-numeric");
      this._outputText = document.getElementById("remplir-cheque-text");
      this._outputDate = document.getElementById("remplir-cheque-date");
      this._input.addEventListener('input', ()=>{
        this._updateEvent();
      })
    }
    // event binder
    bindUpdate(functionToRun) {
      this._updateEvent = functionToRun;
      functionToRun();
    }
    // interface
    get input() {
      if (this._input)
        return this._input.value;
    }
    set outputNumber(value) {
      if (this._outputNumber)
        this._outputNumber.innerText = value;
    }
    set outputText(value) {
      if (this._outputText)
        this._outputText.innerText = value;
    }
    set outputDate(value) {
      if (this._outputDate)
        this._outputDate.innerText = value;
    }
  }

  class Controller {
    constructor(model, view) {
      this.model = model;
      this.view = view;
      view.bindUpdate(() => this.update());
    }
    update() {
      this.model.amount = this.view.input;
      this.view.outputNumber = this.model.amountWithComma;
      this.view.outputText = this.model.amountAsText;
      this.view.outputDate = this.model.date;
    }
  }

  // launch app
  new Controller(new Model(), new View());
});


// UTILS
function integerToFrench(number) {
  if (number <= 16)
    return [
      "zéro",
      "un",
      "deux",
      "trois",
      "quatre",
      "cinq",
      "six",
      "sept",
      "huit",
      "neuf",
      "dix",
      "onze",
      "douze",
      "treize",
      "quatorze",
      "quince",
      "seize",
    ][number];
  if (number < 100) {
    var units = number % 10;
    var tens = Math.trunc(number / 10);
    if (tens == 7 || tens == 9) {
      tens--;
      units += 10;
    }
    var separator = units == 1 && tens < 8 ? " et " : "-";
    return (
      [
        "",
        "dix",
        "vingt",
        "trente",
        "quarente",
        "cinquante",
        "soixante",
        "soixante-dix",
        "quatre-vingts",
        "quatre-vingts-dix",
      ][tens] + (units > 0 ? separator + integerToFrench(units) : "")
    );
  }
  if (number < 1_000) {
    var hundreds = Math.trunc(number / 100);
    var rest = number % 100;
    return (
      (hundreds > 1 ? integerToFrench(hundreds) + " " : "") +
      "cent" +
      (rest == 0 ? "s" : " " + integerToFrench(rest))
    );
  }
  if (number < 1_000_000) {
    var thousands = Math.trunc(number / 1_000);
    var rest = number % 1_000;
    return (
      (thousands > 1 ? integerToFrench(thousands) + " " : "") +
      "mille" +
      (rest == 0 ? "" : " " + integerToFrench(rest))
    );
  }
  var text = "";
  var count = 0;
  while (number > 0) {
    text =
      integerToFrench(number % 1_000_000) +
      " " +
      ["", "millons", "billons", "trillons"][count] +
      " " +
      text;
    number = Math.trunc(number / 1_000_000);
    count++;
  }
  return text;
}

/* TEST
for (var i = 0; i < 10000; i++) console.log(i + ": " + integerToFrench(i));
console.log(
  Number.MAX_SAFE_INTEGER + ": " + integerToFrench(Number.MAX_SAFE_INTEGER)
);
// */
