import React from 'react';
import './transcript.css';

class Transcript extends React.Component {

    state = {
        message: "",
        file: null,
        response: null,
        generating: false,
    };


    onFileUpload = event => {
        this.setState({
            message: "",
            file: event.target.files[0],
        })
    };

    generateTranscript = async () => {
        if (this.state.file == null) {
            this.setState({ message: "File not uploaded" });
        }
        else {
            this.setState({
                generating: true,
                message: "Generating transcript.."
            });
            // Create an object of formData
            const formData = new FormData();
            // Update the formData object
            formData.append(
                "myFile",
                this.state.file,
            );

            let type = this.state.file.type;
            let ind = type.lastIndexOf("/");
            type = type.substr(0, ind);

            console.log(this.state.file);

            const backendUri = "http://localhost:3000/transcript";

            if (type === "audio" || type === "video") {
                // Send the request to the backend
                const response = await fetch(backendUri, {
                    method: 'POST',
                    body: formData,
                });

                const body = await response.json();
                this.setState({
                    response: body.response,
                    message: "Transcript is ready. Click download.",
                });
            }
            else {
                this.setState({
                    message: "Please upload audio/video file only"
                });
            }
        }
    };

    downloadTxtFile = () => {
        if (this.state.file == null) {
            this.setState({ message: "File not uploaded" });
        }
        else if (!this.state.generating) {
            this.setState({ message: 'Click "Generate Transcript" to download' })
        }
        else if (this.state.response == null) {
            this.setState({ message: "Transcript not completed. Please wait..." });
        }
        else {
            const element = document.createElement("a");
            const file = new Blob([this.state.response],
                { type: 'text/plain;charset=utf-8' });
            element.href = URL.createObjectURL(file);
            element.download = "transcript.txt";
            document.body.appendChild(element);
            element.click();
            this.setState({ generating: false });
        }
    }

    render() {
        let label;
        label = <p className="msg">{this.state.message}</p>
        return (
            <div className="Transcript">
                <div>
                    <h1 className="h1">Transcript Generator</h1>
                    <p className="p">Converts the given audio/video file into transcript,</p>
                    <p className="p">which can be downloaded as a text file.</p>
                    <input className="transcriptButton" type="file" onChange={this.onFileUpload} />
                </div>
                <div>
                    <button className="dense-btn" onClick={this.generateTranscript}>
                        Generate Transcript
                    </button>
                    <button className="dense-btn" onClick={this.downloadTxtFile}>
                        Download
                    </button>
                </div>
                {label}
            </div>
        );
    }
}

export default Transcript;