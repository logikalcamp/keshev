import React, { useState } from 'react';
import axios from "axios";
import Results from '../components/Search/Results';
import Uploder from '../components/Search/Uploader';
import config from '../config/config';
//import pdf_analysis from "../components/hatal-analytics";
console.log(config.pdf_server_url)
axios.defaults.baseURL = config.pdf_server_url
const HomeScreen = (props) => {
    const [phrase, setPhrase] = useState('')
    const [res, setRes] = useState()
    // pdf_analysis.bindField("search button", {"search field": phrase})
    // console.log(pdf_analysis.fields_connections)

    const searchPhrase = async (e) => {
        console.log(phrase)
        // await pdf_analysis.clickButton({
        //     src_route: e.target.baseURI,
        //     componentName: "search button",
        //     username: "lil",
        //     screen: "homepage",
        // })
        const { data } = await axios.get("/api/search/" + phrase)
        console.log(data)
        setRes(data)
    }



    return (
        <div>
            <input
                type="text"
                name="phrase"
                value={phrase}
                id="phrase"
                onChange={(e) => {

                    setPhrase(e.target.value)
                }}
            ></input>
            <button type="button" onClick={searchPhrase} disabled={!phrase}>חפש</button>
            <Uploder />
            {res &&
                <div>
                    <Results res={res} />
                </div>
            }

        </div>
    )
}

export default HomeScreen

