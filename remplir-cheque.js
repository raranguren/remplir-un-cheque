if (typeof window !== 'undefined') window.addEventListener("load", function() {
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
  if (!isFinite(number) || isNaN(number) || number < 0) {
    return "";
  }
  number = Math.trunc(number);
  
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
      "quinze",
      "seize",
    ][number];
  if (number < 100) {
    var units = number % 10;
    var tens = Math.trunc(number / 10);
    var useEt = units == 1 && tens != 8 && tens != 9;
    if (tens == 7 || tens == 9) {
      tens--;
      units += 10;
    }
    var separator = useEt ? "-et-" : "-";
    var tensWord = [
      "",
      "dix",
      "vingt",
      "trente",
      "quarante",
      "cinquante",
      "soixante",
      "soixante-dix",
      "quatre-vingt",
      "quatre-vingt-dix",
    ][tens];
    
    if (tens == 8 && units == 0) {
      tensWord = tensWord + "s";
    }
    
    return tensWord + (units > 0 ? separator + integerToFrench(units) : "");
  }
  if (number < 1_000) {
    var hundreds = Math.trunc(number / 100);
    var rest = number % 100;
    var result = "";
    
    if (hundreds == 1) {
      result = "cent";
    } else {
      result = integerToFrench(hundreds) + " cent";
      if (rest == 0) {
        result += "s";
      }
    }
    
    if (rest > 0) {
      result += " " + integerToFrench(rest);
    }
    
    return result;
  }
  if (number < 1_000_000) {
    var thousands = Math.trunc(number / 1_000);
    var rest = number % 1_000;
    var thousandsWord = thousands > 1 ? integerToFrench(thousands) : "";

    if (thousandsWord.endsWith("quatre-vingts")) {
      thousandsWord = thousandsWord.slice(0, -1);
    }
    return (
      (thousands > 1 ? thousandsWord + " " : "") +
      "mille" +
      (rest > 0 ? " " + integerToFrench(rest) : "")
    );
  }

  if (number >= 1_000_000_000_000) {
    var billions = Math.trunc(number / 1_000_000_000_000);
    var rest = number % 1_000_000_000_000;
    var billionsWord = integerToFrench(billions);

    if (billionsWord.endsWith("quatre-vingts")) {
      billionsWord = billionsWord.slice(0, -1);
    }
    return (
      billionsWord +
      " billion" + (billions > 1 ? "s" : "") +
      (rest > 0 ? " " + integerToFrench(rest) : "")
    );
  }
  if (number >= 1_000_000_000) {
    var milliards = Math.trunc(number / 1_000_000_000);
    var rest = number % 1_000_000_000;
    var milliardsWord = integerToFrench(milliards);

    if (milliardsWord.endsWith("quatre-vingts")) {
      milliardsWord = milliardsWord.slice(0, -1);
    }
    return (
      milliardsWord +
      " milliard" + (milliards > 1 ? "s" : "") +
      (rest > 0 ? " " + integerToFrench(rest) : "")
    );
  }
  if (number >= 1_000_000) {
    var millions = Math.trunc(number / 1_000_000);
    var rest = number % 1_000_000;
    var millionsWord = integerToFrench(millions);
    
    if (millionsWord.endsWith("quatre-vingts")) {
      millionsWord = millionsWord.slice(0, -1);
    }
    return (
      millionsWord +
      " million" + (millions > 1 ? "s" : "") +
      (rest > 0 ? " " + integerToFrench(rest) : "")
    );
  }
  return "";
}

if (module) module.exports = { integerToFrench }