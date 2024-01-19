import { BLEPrinter, NetPrinter } from "react-native-thermal-receipt-printer-image-qr";
import { PrinterType, showToastMessage } from "../helper/Helper";

export default async function autoConnectPrinter(printerType,printerData) {
    if (printerType == PrinterType.Bluetooth) {
        try {
            await BLEPrinter.init()
            let printer = await BLEPrinter.connectPrinter(printerData?.inner_mac_address ?? "")
            console.log(printer)
            let promise = new Promise(function (resolve, reject) {
                resolve(printer)
            })
            return promise
        } catch (error) {
            return new Promise(function (resolve, reject) {
                reject(error)
            })
        }
        
    } else {

        try {
            await NetPrinter.init()
            let printer = await NetPrinter.connectPrinter(
                printerData.ipAddress,
                parseInt(printerData.port),
                60000
            )
            let promise = new Promise(function (resolve, reject) {
                resolve(printer)
            })
            return promise
        } catch (err) {
            showToastMessage(err);
            return new Promise(function (resolve, reject) {
                reject(err);
            });
        }
    }
}