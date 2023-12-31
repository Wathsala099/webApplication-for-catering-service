import axios from "../axios";
import qs from "qs";


class UploadFilesService {
    async upload(file, onUploadProgress) {
        let formData = new FormData();

        formData.append("myFile", file, file.name);

        const promise = new Promise((resolve, reject) => {
            axios.post("upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                onUploadProgress,
            })   //10s
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    console.log('error: ' + er);
                    return resolve(er)
                })
        })
        return await promise
    }

    async getFiles() {
        const promise = new Promise((resolve, reject) => {
            axios.get('upload')
                .then((res) => {
                    return resolve(res)
                })
                .catch((er) => {
                    return resolve(er)
                })
        })
        return await promise
    }
}

export default new UploadFilesService();