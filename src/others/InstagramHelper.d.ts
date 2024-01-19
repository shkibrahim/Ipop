declare function shareLink(link: string, description: string): Promise<void>;
declare function shareVideo(options: {
    assetId: string;
}): Promise<any>;
declare function sharePhoto(options: {
    assetId: string;
}): Promise<any>;
declare const _default: {
    shareLink: typeof shareLink;
    shareVideo: typeof shareVideo;
    sharePhoto: typeof sharePhoto;
};
export default _default;