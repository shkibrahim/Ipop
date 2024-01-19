import { RNS3 } from 'react-native-aws3';

// export const BASE_URL = 'https://openxcell-development-public.s3.ap-south-1.amazonaws.com/'

export default async function UploadFileOnAWS(filePath, keyPath, fileName, type = "image/png" ) {

    console.log('File path', filePath);
    console.log('key Path', keyPath);
    console.log('file Name', fileName);

    

    file = {
        // `uri` can also be a file system path (i.e. file://)
        uri: filePath,
        name: fileName,
        type: type
    }
    options = {
        keyPrefix: keyPath,
        bucket: "popup-live-asset",
        region: "eu-central-1",
        accessKey: "AKIAWK7IDDVDLIJX74HI",
        secretKey: "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",
        successActionStatus: 201,
        awsUrl:"s3-accelerate.amazonaws.com"
    }
    return await RNS3.put(file, options)
}
