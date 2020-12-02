import React, { useState } from 'react';
import axios from "axios";
import config from '../../config/config';

axios.defaults.baseURL = config.pdf_server_url

const Uploder = () => {
    const [files, setFiles] = useState([])

    async function onFormSubmit(e) {
        e.preventDefault() // Stop form submit
        for (let i = 0 ; i < files.length; i++){
            await fileUpload(files[i]).then((response) => {
                console.log(response.data);
            })
        }
    }

    function onChange(e) {
        console.log(e.target.files[0])
        let fileList = []
        for (let i = 0; i < e.target.files.length; i++) {
            fileList.push(e.target.files[i])
        }
        console.log(fileList)
        setFiles(fileList)
    }

    function fileUpload(file) {
        const formData = new FormData();
        formData.append('file', file)
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }
        return axios.post("/api/uploader", formData, config)
    }

    return (
        <div>
            <form onSubmit={onFormSubmit}>
                <h1>העלאת קבצים למערכת</h1>
                <input type="file" onChange={onChange} multiple />
                <button type="submit" disabled={files.length === 0}>{files.length <= 1 ? "העלאת קובץ" : "העלאת קבצים"}</button>
            </form>

        </div>
    )
}

export default Uploder;