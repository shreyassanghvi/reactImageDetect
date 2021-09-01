import './App.css';
import {Component} from "react";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import Rank from "./Components/Rank/Rank";
import Particles from 'react-particles-js';

class App extends Component {
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
                    <Navigation/>
                    <Logo/>
                    <Rank/>
                    <ImageLinkForm/>
                    {/*  <FaceRecognition />*/}
                </div>
            </div>
        );
    }
}

export default App;
