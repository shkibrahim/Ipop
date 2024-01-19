import {
  Platform
} from "react-native";
import {
  BLEPrinter,
  ColumnAliment,
  COMMANDS,
  NetPrinter,
} from "react-native-thermal-receipt-printer-image-qr";
import {
  commissionFee,
  commissionFeeLessThenTen,
  PaymentMethod,
  PrinterType,
  WithdrawTypes
} from "../helper/Helper";
import { translate } from "../helper/Language";

function asyncPrintText(printer, text, waitTime) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Platform.OS == 'ios') {
        BLEPrinter.printBill(text, { cut: false, beep: false, tailingLine: true })
      } else {
        printer.printText(text);
      }

      resolve();
    }, waitTime * 100);
  });
};

function asyncPrintBill(printer, bill, waitTime) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      printer.printBill(bill)
      resolve();
    }, waitTime * 100);
  });
};

function asyncPrintColumnsText(
  printer,
  columnHeader,
  columnWidth,
  columnAliment,
  columnStyle,
  waitTime,
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      printer.printColumnsText(
        columnHeader,
        columnWidth,
        columnAliment,
        columnStyle,
      );
      resolve();
    }, waitTime * 100);
  });
};

function getTotalAmnt(objMenu) {
  var totalPrice = parseFloat(objMenu.price)
  var price = parseFloat(objMenu.price)

  if (objMenu.hostProfessionalUser == false) {
    totalPrice = totalPrice + (price * commissionFee)
  }
  if (price < 10 && objMenu.payment_method == PaymentMethod.digital) {
    totalPrice = totalPrice + commissionFeeLessThenTen
  }
  return (totalPrice.toFixed(2))
}

export default async function PrintBill(objMenu, printerType) {
  let waitTime = 1
  const BOLD_ON = COMMANDS.TEXT_FORMAT.TXT_BOLD_ON;
  const BOLD_OFF = COMMANDS.TEXT_FORMAT.TXT_BOLD_OFF;
  const CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_CT;
  const OFF_CENTER = COMMANDS.TEXT_FORMAT.TXT_ALIGN_LT;
  let orderNumber = objMenu.type == 'Gifted' ? (translate('Gift_hash') + " " + objMenu.order_no ?? objMenu.id) : translate('Order_hash') + " " + objMenu.order_no ?? objMenu.id
  let method = objMenu.payment_method
  let deliveryMode = (objMenu.withdrawal_mode == WithdrawTypes.serveAtTable ? translate("servedAtTable") : translate("counter"))
  let orderUserName = translate('Nickname') + ":" + (objMenu.type == 'Gifted' ? objMenu.gift_sender_user_name : objMenu.user_name)
  let orderList = objMenu.orders?.map((item) => {
    return [item.title, item.quantity.toString(), item.price.toString()]
  }) ?? []

  let columnAliment = [ColumnAliment.LEFT, ColumnAliment.CENTER, ColumnAliment.RIGHT];
  let columnWidth = [44 - (7 + 12), 7, 12]
  const header = [translate('Item'), translate('QTY'), translate('Value')]
  let totalWidth = [((44 - 4) / 2), 4, ((44 - 4) / 2)]
  let tableName = objMenu.table_name ?? ""
  
  if (printerType == PrinterType.Bluetooth) {
    Promise.all([
      await asyncPrintText(BLEPrinter, `${CENTER}${orderNumber}`, waitTime++),
      await asyncPrintText(BLEPrinter, `${OFF_CENTER}${orderUserName}`, waitTime++),
      objMenu.table_name != undefined && await asyncPrintText(BLEPrinter, `${translate('tableName')} : ${tableName}`, waitTime++),
      await asyncPrintText(BLEPrinter, `${translate('Payment_Mode')} : ${method}`, waitTime++),
      await asyncPrintText(BLEPrinter, `${translate('withdrawalType')} : ${deliveryMode}`, waitTime++),
      await asyncPrintText(BLEPrinter, `${CENTER}${COMMANDS.HORIZONTAL_LINE.HR_80MM}${CENTER}`, waitTime++),
      await asyncPrintColumnsText(BLEPrinter, header, columnWidth, columnAliment, [``, '', ''], waitTime++),
      await asyncPrintText(BLEPrinter, `${CENTER}${COMMANDS.HORIZONTAL_LINE.HR3_80MM}${CENTER}`, waitTime++),
      orderList.map(async (item) => {
        return await asyncPrintColumnsText(BLEPrinter, item, columnWidth, columnAliment, [``, '', ''], waitTime++)
      }),
      await asyncPrintText(BLEPrinter, `\n`, waitTime++),
      await asyncPrintText(BLEPrinter, `${CENTER}${COMMANDS.HORIZONTAL_LINE.HR3_80MM}${CENTER}`, waitTime++),
      await asyncPrintColumnsText(BLEPrinter, [translate("Total"), ``, getTotalAmnt(objMenu).toString()], totalWidth, columnAliment, [``, ``, ``], waitTime++),
      objMenu.instructions != undefined ? await asyncPrintText(BLEPrinter, `\n`, waitTime++) : await asyncPrintBill(BLEPrinter, `\n`, waitTime++),
      objMenu.instructions != undefined && await asyncPrintText(BLEPrinter, `${translate('Order_instructions')}`, waitTime++),
      objMenu.instructions != undefined && await asyncPrintBill(BLEPrinter, `${objMenu.instructions}`, waitTime++)
    ]).then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 100);
        
      });
    }).catch((error) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 100);
        
      });
    })

  } else {
    Promise.all([
      await asyncPrintText(NetPrinter, `${CENTER}${orderNumber}`, waitTime++),
      await asyncPrintText(NetPrinter, `${orderUserName}`, waitTime++),
      objMenu.table_name != undefined && await asyncPrintText(NetPrinter, `${translate('tableName')} : ${tableName}`, waitTime++),
      await asyncPrintText(NetPrinter, `${translate('Payment_Mode')} : ${method}`, waitTime++),
      await asyncPrintText(NetPrinter, `${translate('withdrawalType')} : ${deliveryMode}`, waitTime++),
      await asyncPrintText(NetPrinter, `${CENTER}${COMMANDS.HORIZONTAL_LINE.HR_80MM}${CENTER}`, waitTime++),
      await asyncPrintColumnsText(NetPrinter, header, columnWidth, columnAliment, [``, '', ''], waitTime++),
      await asyncPrintText(NetPrinter, `${CENTER}${COMMANDS.HORIZONTAL_LINE.HR3_80MM}${CENTER}`, waitTime++),
      orderList.map(async (item) => {
        return await asyncPrintColumnsText(NetPrinter, item, columnWidth, columnAliment, [``, '', ''], waitTime++)
      }),
      await asyncPrintText(NetPrinter, `\n`, waitTime++),
      await asyncPrintText(NetPrinter, `${CENTER}${COMMANDS.HORIZONTAL_LINE.HR3_80MM}${CENTER}`, waitTime++),
      await asyncPrintColumnsText(NetPrinter, [translate("Total"), ``, getTotalAmnt(objMenu).toString()], totalWidth, columnAliment, [``, ``, ``], waitTime++),
      objMenu.instructions != undefined ? await asyncPrintText(NetPrinter, `\n`, waitTime++) : await asyncPrintBill(NetPrinter, `\n`, waitTime++),
      objMenu.instructions != undefined && await asyncPrintText(NetPrinter, `${translate('Order_instructions')}`, waitTime++),
      objMenu.instructions != undefined && await asyncPrintBill(NetPrinter, `${objMenu.instructions}`, waitTime++)
    ]).then(() => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 100);
        
      });
    }).catch((error) => {
      return new Promise((resolve, reject) => {
        setTimeout(resolve, 100);
        
      });
    })
  }
}
