# Adyen-4.5.0

The `adyen-4.5.0` npm module enables you to encrypt sensitive card data using Adyen's v4.5.0 encryption method with a Node.js implementation. This encryption is commonly used in websites like [Chelsea FC](https://chelseafc.3ddigitalvenue.com/).

Check my repo for [adyen-4.4.1](https://github.com/glizzykingdreko/adyen-4.4.1) as well

## Table of Contents
- [Adyen-4.5.0](#adyen-450)
  - [Table of Contents](#table-of-contents)
  - [What changes from the previous version?](#what-changes-from-the-previous-version)
  - [Resources](#resources)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)
  - [Credits](#credits)

## What changes from the previous version?
Not much, a new calculation based on the encoded protected header has been added and it must be passed in the hmac (tag key).
Take a look [here](https://github.com/glizzykingdreko/adyen-4.5.0/blob/fde2c034cf4bf3e7d1bcb211eabdddef8418080a/src/Adyen.js#L67) for more information.

## Resources

- Read about Adyen [here](https://docs.takionapi.tech/adyen)

## Installation

Install via npm:

```
npm install adyen-4.5.0
```

## Usage

Here's a simple example of how to use the `encryptCardData` function:

```javascript
const encryptCardData = require('../src/encrypt');

const card = '4242424242424242';
const month = '12';
const year = '2023';
const cvc = '123';

const adyenKey = '10001|E9299A45B34AE878855F3E66136B461664F519E85F36E59B505CD6590311FE96BAF50830BED460FE6EB8AD39B3E4BFCF5028A33A64C518E3BC13F23E49CE9C68B13A3ED9BB9233C166A7572755E62CB67AAF7A6AFC1070CAD7FF3F6FD8C070168FC6ED31E81F3DE10A93D6A9494F9D24900F1499D95264E66E3DC357B4628E02A6DF0ED37196539309AB0B1EA7EEB2BD67452B16289452D617C687867981C3570E0C43C51EB273154011D53F09B2B2E1AAD41B13B686A861D2C095DFEA258AD589AE482CAF9B05EFFF1C16EF182D67CA459B6EBD00E63F170307B56237A6C8AE593EFAD9E58AEC7D560B41B3412DD7D5E64B76BFEF75354DC52BD2138B77F279';

console.log(
    encryptCardData(
        card, month, year, cvc, adyenKey, 
        "live_DY4VMYQL5ZHXXE5NLG4RA5PYKYWDYAU2", // Public payment Key (optional)
        "https://chelseafc.3ddigitalvenue.com" // Domain (optional)
    )
)
```

Please note that you need to replace `adyenKey` with the actual website's Adyen key.

## Contributing

We appreciate any contributions you might make. Please feel free to submit a pull request, issue, or suggestion.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more information.

## Credits

- [GlizzyKingDreko](https://github.com/GlizzyKingDreko) - Developer