import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router';
import Webcam from "react-webcam";


export default class Home extends Component {
    constructor(props) {
        super(props);

        this.deco = this.deco.bind(this);
        this.duree = this.duree.bind(this);
        this.state = {
            data: [],
            image: '',
            duration: 5,
            to: 'Bloupi@mail.com',
        }
    }
    async deco() {
      await localStorage.removeItem("userid")
      window.location = "/login";
    }
    async snap() {
        window.location = "/snap";
    }
    
    setRef = webcam => {
        this.webcam = webcam;
    };

    envoi = (email) => {
        this.setState({to: email})
    }
    duree = (duration) => {
      this.setState({duration: duration})
    }
    capture = () => {
        const imageSrc = this.webcam.getScreenshot();
        this.setState({image: imageSrc})
        const base64 = this.state.image
        fetch(base64)
            .then(res => res.blob())
            .then(blob => {
                const fd = new FormData();
                const file = new File([blob], "screen.jpeg");
                fd.append('image', file);
                fd.append('to', this.state.to);
                fd.append('duration', this.state.duration);
                var token = localStorage.getItem("userid")
                axios.post('http://snapi.epitech.eu/snap', fd, {headers: {"Content-Type": "multipart/form-data", token: token}})
                    .then((response) => {
                        console.log('ok')
                        console.log(this.state.to)
                    })
                    .catch((error) => {
                        console.log(error)
                        console.log(fd)
                    })
            })
    };



componentDidMount() {
    axios.get('http://snapi.epitech.eu/all', {headers: {token: token}})
            .then((response) => {
                this.setState({data: response.data.data})
            })
            .catch((error) => {
                console.log(error)
            })
    }


    render () {
        return (
  <div>
            <h1>
            NARQUELION
            </h1>

 <div className="form-deco" >
          <input onClick={this.deco} value="Se déconnecter" className="deco" />
        </div>
        <div className="form-snap">
          <input onClick={this.snap} value='Snap' className="snap" />
        </div>
<div className="title">Envoyer un snap</div>
<div className="cam">
      <Webcam audio={false}
              height={450}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={450}
      />
      <br/>
      <label>Durée </label>
    <br/>
        <input type="number" onChange={(e) => this.duree(e.target.value)} value={5}/>
<br/>
      <button onClick={this.capture}>Capture photo</button>
</div>
      <div className="bloc">
      { this.state.data.map((item)=>
          <div className="ligne" onClick={() => this.envoi(item.email)}>{item.email}</div>
      )}
        </div>

  </div>
        )
    }
}