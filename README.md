# remplir-un-cheque
A simple library to display a French cheque calculator in any website

## Demo

Here are examples of the script integrated in a blog page:
- [English|French|Spanish guide for foreigners in France](https://raranguren.github.io/remplir-un-cheque/index-en.html)
- [Barebone test page](https://raranguren.github.io/remplir-un-cheque/test.html)

## Usage

1. Inport the script in the document:
    ```html
    <script src="remplir-cheque.js"></script>
    ```
2. Identify an input field in the document:
    ```html
    <input id="remplir-cheque-input" value="14">
    ```
3. Add elements to display the desired calculated fields:
    ```html
    <span id="remplir-cheque-date"></span>
    <span id="remplir-cheque-text"></span>
    <span id="remplir-cheque-numeric"></span>
    ```

