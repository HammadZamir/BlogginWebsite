import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
    cloud_name: 'dftnms4h8',
    api_key: '358232982493939',
    api_secret: '-Jjqq-qGZszJgGf1z_VgPB5KVKE',  
});



const upLoadOnCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) return null

        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath , {  resource_type:"auto" })
        // file has been uploaded
        // console.log("file has been uploaded successfully : " , response.url);
        return response;

    } catch (error) {
        fs.unlinkSync(localFilePath)  // will remove the file that is stored in local storage and also from server
        return null;
    }
}

 

export {upLoadOnCloudinary};