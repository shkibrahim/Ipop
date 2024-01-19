"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-ignore
const react_native_1 = require("react-native");
const utils_1 = require("@react-native-social-share/utils");
const { InstagramShareAndroid } = react_native_1.NativeModules;
const appIdentifier = react_native_1.Platform.select({
    android: 'com.instagram.android',
    ios: 'instagram://',
});
async function shareLink(link, description) {
    throw new Error('Not supported');
}
async function shareVideo(options) {
   if (react_native_1.Platform.OS === 'android') {
        if (!options.assetId) {
            throw new utils_1.SocialError('MISSING_PROPERTY', 'assetId is required');
        }
        const fileUri = await utils_1.default.uriForFile(options.assetId);
        return InstagramShareAndroid.shareVideo(fileUri);
    }
}
async function sharePhoto(options) {
    if (react_native_1.Platform.OS === 'android') {
        if (!options.assetId) {
            throw new utils_1.SocialError('MISSING_PROPERTY', 'assetId is required');
        }
        const fileUri = await utils_1.default.uriForFile(options.assetId);
        return InstagramShareAndroid.sharePhoto(fileUri);
    }
}
exports.default = {
    shareLink,
    shareVideo,
    sharePhoto,
};
//# sourceMappingURL=index.js.map