import { ApplePayButton, useApplePay } from "@stripe/stripe-react-native";

import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { BLACK_FOUR } from "../helper/Color";
import { BOLD } from "../helper/FontName";
import { normalize } from "../helper/FontSIze";
import { getCurrencyName, getCoutry, showToastMessage } from "../helper/Helper";
import { translate } from "../helper/Language";


export default function ApplePay({ purchaseItem, getPaymentMethod, validate, onPress }) {

    const { presentApplePay, isApplePaySupported } = useApplePay();
    useEffect(() => {
    })



    return isApplePaySupported && purchaseItem.length > 0 ? <View style={{ width: "100%", flex : 1 }}>

        <ApplePayButton
            onPress={async () => {
                onPress()
                setTimeout(async () => {
                    if (validate() == false) return;

                    if (!isApplePaySupported) return;

                    const { paymentMethod, error } = await presentApplePay({
                        cartItems: purchaseItem,
                        country: (getCoutry()),
                        currency: getCurrencyName(),
                        shippingMethods: [],
                        requiredShippingAddressFields: [],
                        requiredBillingContactFields: [],
                    });
                    if (error) {
                        // handle error
                        console.log(error)
                        if (error.stripeErrorCode != undefined && error.localizedMessage != undefined)
                            showToastMessage(error.stripeErrorCode + ": " + error.localizedMessage)
                        else 
                            showToastMessage(error.message)
                    } else {
                        console.log(paymentMethod)
                        getPaymentMethod(paymentMethod)
                    }
                }, 1000);


                // ...
            }}
            type="plain"
            buttonStyle="black"
            borderRadius={4}
            style={{
                width: '100%',
                height: 40,
                alignSelf: "center"
            }}
        />
        <Text
            style={[
                styles.lblPaymentModeComman,
                styles.lblPaymentModeSelected
            ]}
        >
            {translate("applePay")}
        </Text>
    </View> : <></>
}

const styles = StyleSheet.create({
    lblPaymentModeComman: {
        color: BLACK_FOUR,
        fontSize: normalize(15),
        marginTop: 10,
        alignSelf: 'center'
    },
    lblPaymentModeSelected: {
        fontFamily: BOLD
    }
})