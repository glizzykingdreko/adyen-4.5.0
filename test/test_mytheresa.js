const axios = require('axios');
const encryptCardData = require('../src/encrypt');


const CART_ID = process.argv[2];
if (!CART_ID) {
    console.log("Please provide a cart id");
    process.exit(1);
}

const card = '4242424242424242';
const month = '12';
const year = '2023';
const cvc = '123';

const adyenKey = "10001|BDDBC3D5D295D76130434778B66DC95CF149DDBEEA8FB8FAC22415FAE7EB02C9530DA04859786CB5D07278D3F9DFE46463A21F94B4DBBDF1C42AEC2F69BB60FC7409177ECC80ADB2117C075C408CFFB102C4DB22D6D96FC3D85ECF337A63355761B3A33B2B2AB00BC8E3BA02C498322132D1C88331FFA26CF9AF1509D1150DE3B1A4F551BF7E0E6799B23204CEE3050A4DE9FDEF3E7C1A613CD5A7A306EEA1EF77213CFEF181006D0A7D4BF2C738734FE272523DC77C288B47D16E4DC39519017199DFEDEB94FC9343864AC6A07B5F9EFBCA22D1BCA01DFC7019B3100E2D216A12A9F09FEDEB2AEAFA7D0C1E8F201D9DBF6E162160623EF502BC8151585C44BD";

const last_four_card_digits = card.slice(-4);
const card_encrypted = encryptCardData(card, month, year, cvc, adyenKey);

const url = "https://api.mytheresa.com/api";
const payload = {
    "operationName": "ChooseCartPaymentMethodMutation",
    "variables": {
        "additionalInformation": [
            {
                "name": "brand",
                "value": "visa"
            },
            {
                "name": "browserInfo",
                "value": {
                    "acceptHeader": "*/*",
                    "colorDepth": 24,
                    "language": "en-GB",
                    "javaEnabled": False,
                    "screenHeight": 1440,
                    "screenWidth": 2560,
                    "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
                    "timeZoneOffset": -120
                }
            },
            {
                "name": "encryptedCardNumber",
                "value": card_encrypted["encryptedCardNumber"]
            },
            {
                "name": "encryptedExpiryMonth",
                "value": card_encrypted['encryptedExpiryMonth']
            },
            {
                "name": "encryptedExpiryYear",
                "value": card_encrypted['encryptedExpiryYear']
            },
            {
                "name": "encryptedSecurityCode",
                "value": card_encrypted['encryptedSecurityCode']
            },
            {
                "name": "holderName",
                "value": "Davide"
            },
            {
                "name": "lastDigits",
                "value": last_four_card_digits
            },
            {
                "name": "riskData",
                "value": {"clientData": ''}
            },
            {
                "name": "storePaymentMethod",
                "value": false
            },
            {
                "name": "type",
                "value": "visa"
            }
        ],
        "cartId": CART_ID,
        "paymentMethodCode": "scheme"
    },
    "query": "mutation ChooseCartPaymentMethodMutation($cartId: String!, $paymentMethodCode: String!, $additionalInformation: [paymentAdditionalInformationField]) {\n  xChooseCartPaymentMethod(cartId: $cartId, paymentMethodCode: $paymentMethodCode, additionalInformation: $additionalInformation) {\n    ...cartData\n    __typename\n  }\n}\n\nfragment cartData on XCart {\n  applicablePromotions {\n    actions {\n      code\n      value\n      valueType\n      __typename\n    }\n    couponCodes\n    message\n    name\n    rules {\n      code\n      value\n      valueType\n      __typename\n    }\n    __typename\n  }\n  appliedGiftCards {\n    amount\n    originCode\n    __typename\n  }\n  appliedPromotions {\n    couponCode\n    discountAmount\n    isCouponBased\n    name\n    __typename\n  }\n  availableOptions {\n    climateOffsetAvailable\n    giftOption\n    hasOversizeProduct\n    __typename\n  }\n  billingAddress {\n    ...addressData\n    __typename\n  }\n  cartPriceDescription\n  channel {\n    checkoutGloballyEnabled\n    climateFee\n    code\n    expressCheckout\n    shippingMethodImageVisible\n    __typename\n  }\n  checkoutCompletedAt\n  climateOffset\n  climateOffsetTotal\n  confirmationPriceDescription\n  currencyCode\n  currencySymbol\n  customer {\n    email\n    isTrusted\n    __typename\n  }\n  deliveryDutyUnpaidDescriptionCode\n  gift\n  giftMessage\n  id\n  insuranceTotal\n  items {\n    combinedCategoryErpID\n    combinedCategoryName\n    couponCodes\n    department\n    designerErpId\n    designerName\n    fta\n    giftCardAmount\n    giftCardType\n    id\n    imageUrl\n    isGiftCard\n    name\n    pNumber\n    quantity\n    shipmentOrigin\n    slug\n    sizesOnStock\n    totalDiscount\n    totalOriginal\n    totalPromotion\n    totalRegular\n    variantName\n    price {\n      regular\n      currencySymbol\n      discount\n      discountEur\n      extraDiscount\n      includesVAT\n      original\n      originalDuties\n      originalDutiesEur\n      originalEur\n      percentage\n      vatPercentage\n      trackedPrices {\n        ...trackedPrices\n        __typename\n      }\n      __typename\n    }\n    promotionLabels {\n      type\n      label\n      __typename\n    }\n    size\n    sizeHarmonized\n    sku\n    sizeSku\n    seasonCode\n    stock {\n      availableInStock\n      lastUnits\n      __typename\n    }\n    __typename\n  }\n  messages {\n    content\n    contentTemplate\n    type\n    __typename\n  }\n  package {\n    code\n    description\n    name\n    __typename\n  }\n  payment {\n    method {\n      code\n      name\n      __typename\n    }\n    additionalInformation {\n      name\n      value\n      __typename\n    }\n    details {\n      name\n      value\n      __typename\n    }\n    cvcRequired\n    provider\n    __typename\n  }\n  quantity\n  shipping {\n    method {\n      code\n      imageUrl\n      description\n      name\n      packStation\n      cost\n      __typename\n    }\n    vatPercentage\n    vatTotal\n    __typename\n  }\n  shippingAddress {\n    ...addressData\n    __typename\n  }\n  shippingTotal\n  subTotal\n  taxFreeShoppingAvailable\n  taxTotal\n  total\n  totalExclTax\n  orderNumber\n  vatPercentage\n  vatTotal\n  unavailableItems {\n    department\n    designerName\n    id\n    imageUrl\n    name\n    pNumber\n    price {\n      currencySymbol\n      discount\n      original\n      percentage\n      __typename\n    }\n    size\n    sizesOnStock\n    sku\n    slug\n    stock {\n      availableInStock\n      lastUnits\n      __typename\n    }\n    __typename\n  }\n  __typename\n}\n\nfragment addressData on Address {\n  academicTitle\n  additionalInfo\n  city\n  company\n  countryCode\n  firstName\n  houseNumber\n  id\n  idInformation\n  lastName\n  packStation\n  phoneNumber\n  postcode\n  salutation\n  state\n  street\n  streetAdditional\n  __typename\n}\n\nfragment trackedPrices on XSharedProductTrackedPricesType {\n  price\n  priceVatOnly\n  priceReduced\n  priceReducedVatOnly\n  priceFinalDuties\n  priceEur\n  priceEurVatOnly\n  priceEurReduced\n  priceEurReducedVatOnly\n  priceEurFinalDuties\n  priceHint\n  isOnSale\n  saleDiscount\n  __typename\n}\n"
};
const headers = {
    "authority": "api.mytheresa.com",
    "accept": "*/*",
    "accept-language": "it",
    "content-type": "application/json",
    "origin": "https://www.mytheresa.com",
    "referer": "https://www.mytheresa.com/",
    "sec-ch-ua": '"Not.A/Brand";v="8", "Chromium";v="114", "Google Chrome";v="114"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": "\"macOS\"",
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
    "x-country": "IT",
    "x-geo": "IT",
    "x-region": "ROME",
    "x-section": "default",
    "x-store": "IT",
    "x-tracking-variables": "channel_country=IT,channel_language=it,channel=it-it,cdf=000,csf=000,cdf_1=000,csf_1=0,csf_2=0,csf_3=0,deviceType=desktop,devicePlatform=web,deviceSystem=OS X,pageId=CHECKOUT_PAYMENT_PAGE,experience_topLevelBanner_trust_delay_tlb_seen=true,experience_pdpDisclaimer_pdpDisclaimer_seen=false,experience_emptySbWl_ww_emptycart_seen=false,campaign=unknown,source=unknown,browser=Chrome,countOfPageViews=7,countOfSessions=1,department=women,emailHash=unknown,environment=production,ipAddress=84.220.18.109,pageType=checkout,referral=unknown,url=https://www.mytheresa.com/it/it/checkout/payment"
};

axios.post(url, payload, { headers: headers })
.then(response => {
    console.log(response.data);
})
.catch(err => {
    console.error(err);
});