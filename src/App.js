import './App.css';
import {Component} from "react";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import SignIn from "./Components/SignIn/SignIn";
import Rank from "./Components/Rank/Rank";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";
import Register from "./Components/Register/Register";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'


const app = new Clarifai.App({
    apiKey: '96637bcd836e48379f22a03915c4b9b7'
});

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            input: "",
            imageURL: "",
            box: {},
            route: 'signin'
        }
    }


    onInputChange = (event) => {

        this.setState({input: event.target.value})

    }
    calculateFace = (data) => {
        const clarifyFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById("inputImage");
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifyFace.left_col * width,
            topRow: clarifyFace.top_row * height,
            rightCol: width - clarifyFace.right_col * width,
            bottomRow: height - clarifyFace.bottom_row * height
        }
    }
    displayFace = (box) => {
        this.setState({box: box})
    }
    onSubmit = () => {
        this.setState({imageURL: this.state.input})
        console.log(this.state.imageURL)

        app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then((response) => this.displayFace(this.calculateFace(response))).catch(err => console.log(err))

    }
    onRouteChange = (route) => {
        this.setState({route: route})
    }

    render() {
        const particlesOption = {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800,
                    }
                }
            }
        };

        return (
            <div>
                <Particles className={"particles"}
                           params={particlesOption}
                />
                <div className={"App"}>
                    <Navigation onRouteChange={this.onRouteChange}/>
                    {this.state.route === 'home' ?

                        <div>
                            <Logo/>
                            <Rank/>
                            <ImageLinkForm onInputChange={this.onInputChange} onSubmitButton={this.onSubmit}/>
                            <FaceRecognition box={this.state.box} imageURL={this.state.imageURL}/>
                        </div>
                        : (
                            this.state.route === 'signin' ?
                                <SignIn onRouteChange={this.onRouteChange}/>
                                :
                                <Register onRouteChange={this.onRouteChange}/>

                        )
                    }
                </div>
            </div>
        );
    }
}

export default App;
