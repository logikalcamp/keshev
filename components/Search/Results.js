import React from 'react'
import config from '../../config/config'
//import pdf_analysis from '../hatal-analytics'

function sort_object(obj) {
    var keyValues = []

    for (var key in obj) {
        keyValues.push([key, obj[key]])
    }
    keyValues.sort((a, b) => b[1] - a[1])
    return keyValues
}

function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

function generatePdf(filename) {
    let req = new XMLHttpRequest();
    filename = filename + ".pdf"
    req.open("POST", config.pdf_server_url + "/download/" + filename, true);
    req.responseType = "blob";
    req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    req.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var blob = new Blob([this.response], { type: "application/pdf" });
            var url = window.URL.createObjectURL(blob);
            var link = document.createElement('a');
            document.body.appendChild(link);
            link.style = "display: none";
            link.href = url;
            link.download = filename;
            link.click();
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                link.remove();
            }, 100);
        }
    };

    req.send();
}

function downloadPdf(e, filename, i){
    
    generatePdf(filename)
    /*pdf_analysis.clickButton({
        src_route: e.target.baseURI,
        componentName: "download button "+i,
        username: "lil",
        screen: "homepage",
    })*/
}


const Results = (props) => {
    const { results, track } = props.res
    let sorted_track = sort_object(track)
    return (
        <div>
            <h2>תוצאות: </h2>
            {Object.keys(track).length === 0 ? <p>לא נמצאו תוצאות.</p> :
                <ul>
                    {track && sorted_track.map((file, i) => {
                        let filename = file[0]
                        let num_of_occr = file[1]
                        return <li key={i}>
                            <div className="inline">
                                <p className="filename">שם הקובץ: {filename}</p>
                                {/*pdf_analysis.bindField("download button "+i, {"filename" : filename})*/}
                                <button onClick={(e) => downloadPdf(e, filename, i)}>{"להורדה"}</button>
                            </div>
                            <div className="inline"> מופיע בעמודים: {results.filter((obj) => {
                                return obj.name === filename
                            })
                                .sort((a, b) => b.page - a.page)
                                .map((obj, i) => { return obj.page })
                                .filter(onlyUnique)
                                .map((page, i) => { return <p key={i}>{page + ""}</p> })}
                            </div>
                                סה"כ: {num_of_occr === 1 ? "מופיע פעם אחת במסמך" : num_of_occr + " הופעות במסמך"}
                            <br />
                        </li>

                    })}
                </ul>
            }
        </div>
    )
}

export default Results