import {
    Platform
  } from 'react-native';
import { format } from "date-fns";
import dynamicLinks from "@react-native-firebase/dynamic-links";
import { showMessage } from "react-native-flash-message";
import { AQUWA_MARINE, WHITE } from "./Color";
import { SEMI_BOLD } from "./FontName";
import { normalize } from "./FontSIze";
import Toast from "react-native-toast-message";
import { translate } from "./Language";
import moment from "moment";
import * as RNLocalize from "react-native-localize";


export const commissionFee = 0.05;

export const commissionFeeLessThenTen = 0.3;

export const TicketType = {
  simpleTicket: "Simple",
  siaeTicket: "SIAE",
};

export const TagOperation = {
  NormalCalling: 1,
  PullToRefresh: 2,
  LoadMore: 3,
};

export const BankStatus = {
  NotAdded: "NotAdded",
  Valid: "Valid",
  Invalid: "Invalid",
  Pending: "Pending",
};

export const AddEventType = {
  Event: "event",
  Recurring: "recurring",
};

export function getImageEventCat(strCat) {
  switch (strCat) {
    case ("Party", "Generic"):
      return require("../images/music.png");
    case ("Live Show", "Music"):
      return require("../images/liveshow.png");
    case "Food and drink":
      return require("../images/fooddrink.png");
    default:
      return require("../images/other.png");
  }
}

export function getImageEventCatMarker(strCat, isBusinessUser) {
  switch (strCat) {
    case ("Party", "Generic"):
      if (isBusinessUser)
        return require("../images/marker/music_marker_buser.png");
      else return require("../images/marker/music_marker.png");
    case ("Live Show", "Music"):
      if (isBusinessUser)
        return require("../images/marker/liveshow_marker_buser.png");
      else return require("../images/marker/liveshow_marker.png");
    case "Food and drink":
      if (isBusinessUser)
        return require("../images/marker/fooddrink_marker_buser.png");
      else return require("../images/marker/fooddrink_marker.png");
    default:
      if (isBusinessUser)
        return require("../images/marker/other_marker_buser.png");
      else return require("../images/marker/other_marker.png");
  }
}

export function getCategoryName(strCat) {
  switch (strCat) {
    case ("Party", "Generic"):
      return translate("Generic");
    case ("Live Show", "Music"):
      return translate("Music");
    case "Food and drink":
      return translate("food_&_Drink");
    default:
      return translate("Other");
  }
}

export function getAvatarInitials(textString) {
  if (!textString) return "";

  const text = textString.trim();

  const textSplit = text.split(" ");

  if (textSplit.length <= 1) return text.charAt(0);

  const initials =
    textSplit[0].charAt(0) + textSplit[textSplit.length - 1].charAt(0);

  return initials;
}

export const trim = (values) => {
  return values.replace(/\s/g, "");
};
export function parseDateMM_DD_YYYY(dateString) {
  try {
    return format(new Date(dateString), "MM-dd-yyyy");
  } catch (error) {
    console.log("Error in Date", error);
    return "";
  }
}

export function parseTime(dateString) {
  try {
    return format(new Date(dateString), "HH:mm");
  } catch (error) {
    console.log("Error in Date", error);
    return "";
  }
}

export function showToastMessage(title) {
  showMessage({
    message: title,
    type: "info",
    icon: {
      icon: "info",
    },
    floating: true,
    duration: 3000,
    titleStyle: {
      fontFamily: SEMI_BOLD,
      fontSize: normalize(15),
      color: WHITE,
    },
    backgroundColor: AQUWA_MARINE,
  });
}

export function showSuccessMessage(title) {
  showMessage({
    message: title,
    icon: {
      icon: "success",
    },
    type: "success",
    floating: true,
    duration: 3000,
    titleStyle: {
      fontFamily: SEMI_BOLD,
      fontSize: normalize(15),
      color: WHITE,
    },
  });
}

export function showPushMessage(title, desc, imageUri, onMsgPress) {
  Toast.show({
    text1: title,
    text2: desc,
    props: {
      onPress: () => {
        console.log("some click occur");
        onMsgPress();
      },
      uri: imageUri,
    },
    visibilityTime: 10000,
  });
}

export function getOffSet() {
  let date = new Date();
  return 0 - date.getTimezoneOffset();
}

export async function buildDynamicLink(eventId) {
  try {
    let link = "https://popupapp.page.link/popup/" + eventId;

    let shortLink = await dynamicLinks().buildShortLink(
      {
        link: link,
        domainUriPrefix: "https://popupapp.page.link",
        social: {
          title: "Popup",
        },
        ios: {
          bundleId: "com.popup.application",
          appStoreId: "1559033782",
        },
        android: {
          packageName: "com.popup.application",
        },
      },
      dynamicLinks.ShortLinkType.SHORT
    );
    return shortLink;
  } catch (error) {
    console.log(error);
  }
}

export async function buildDynamicLinkForBank(userId) {
  try {
    let link = "https://popupapp.page.link/bankAccount/" + userId;
    let shortLink = await dynamicLinks().buildShortLink(
      {
        link: link,
        domainUriPrefix: "https://popupapp.page.link",
        ios: {
          bundleId: "com.popup.application",
          appStoreId: "1559033782",
        },
        android: {
          packageName: "com.popup.application",
        },
      },
      dynamicLinks.ShortLinkType.SHORT
    );
    return shortLink;
  } catch (error) {
    console.log(error);
  }
}

export function isFloat(inputString) {
  const parsed = parseFloat(inputString);

  return !isNaN(parsed) && parsed.toString() === inputString;
}

export const NotificationType = {
  friendShipReq: 1,
  acceptFrdReq: 2,
  addCollaborater: 3,
  eventCheckIn: 4,
  eventInvite: 5,
  orderCheckout: 6,
  upProfile: 7,
  secrateLike: 8,
  secrateLikeMatch: 9,
  sendGift: 10,
  bankConnect: 11,
  likeMedia: 12,
  commentMedia: 13,
  orderStatus: 14,
  inviteJoin: 15,
  orderStatusConfirmation: 16,
  orderStatusCancelled: 18,
  ticketConfirmation: 19,
  ticketRequestRejected: 20,
  ticketRequestAccepted: 21,
  inviteInTicket: 22,
  customNotificationEventDetail: 23,
  customNotificationUserDetail: 24,
  shareTicket: 25,
  thunder: 26,
  mentionedInMedia: 27,
  mentionInComment: 28,
  sendBookingReqHost: 30,
  sendBookingReqAccept: 31,
  sendBookingReqDecline: 32,
  bookingTicketNotifyHost: 33,
};

export const MediaType = {
  image: "image",
  video: "video",
};

export const WebContent = {
  termscondition: "terms-condition",
  aboutus: "about-us",
  privacy: "privacy-policy",
  FAQ: "faq",
};

export const PaymentMethod = {
  digital: "Digital",
  cash: "Cash",
};
export const PriceType = {
  free: "Free",
  chargeable: "Chargeable",
};
export const EventType = {
  upcoming: "Upcoming",
  live: "Live",
  friend: "Friend",
};

export const WithdrawTypes = {
  serveAtTable: "serveAtTable",
  counter: "counter",
  delivery: "delivery",
  takeAway : "takeAway"
};

export const arrRecurringDays = [
  {
    title: "Mo",
    isSelect: false,
    index: 1,
  },
  {
    title: "Tu",
    isSelect: false,
    index: 2,
  },
  {
    title: "We",
    isSelect: false,
    index: 3,
  },
  {
    title: "Th",
    isSelect: false,
    index: 4,
  },
  {
    title: "Fr",
    isSelect: false,
    index: 5,
  },
  {
    title: "Sa",
    isSelect: false,
    index: 6,
  },
  {
    title: "Su",
    isSelect: false,
    index: 7,
  },
];

export function getDefaultEndDate() {
  return "2099-12-31T23:59:59";
}

export function isDefaultDate(strEndDate) {
  return (
    strEndDate == undefined ||
    (strEndDate != undefined &&
      moment(strEndDate, "YYYY-MM-DDTHH:mm:ss").isSameOrAfter(
        moment(getDefaultEndDate(), "YYYY-MM-DDTHH:mm:ss")
      ))
  );
}

export function hexToRGB(hex, alpha) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return "rgba(" + r + ", " + g + ", " + b + ", " + alpha + ")";
  } else {
    return "rgb(" + r + ", " + g + ", " + b + ")";
  }
}

export const BusinessUserSubscription = {
  BusinessXL: "Business XL",
  BusinessPRO: "Business PRO",
  BusinessLITE: "Business Lite",
};

export const PrinterType = {
  Bluetooth: "1",
  Net: "2",
  None: "3",
};

export const numberFormat = (value) => {
  if (Platform.OS == 'android') {
    return value.toFixed(2)
  } else {
    return new Intl.NumberFormat(getCoutry(), {
      style: 'decimal',
      currency: getCurrencyName(),
      minimumFractionDigits: 2
  }).format(value);
  }
}

export function getCoutry() {
  return RNLocalize.getCountry();
}

export function getCurrencyName() {
  switch (RNLocalize.getCountry()) {
    case "IT":
      return "EUR";
    default:
      return "USD";
  }
}
