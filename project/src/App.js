import './App.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import "leaflet/dist/leaflet.css";
import { Component, useState, useRef } from 'react';
import osm from './osm-provider';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import AuthService from './utils/ApiUtils/AuthService';
import DashboardUI from './Components/Dashboard/DashboardUI';
import Login from './Components/Login/Login';


// function App() {
  // const [center, setCenter] = useState([13.084622, 80.248357]);
  // const ZOOM_LEVEL= 9;
  // const mapRef = useRef();

//   return (
//     <div className="App">
//       {/* <MapContainer className="mapContainer" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={false}>
//         <TileLayer
//           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//         />
//         <Marker position={[51.505, -0.09]}>
//           <Popup>
//             A pretty CSS3 popup. <br /> Easily customizable.
//           </Popup>
//         </Marker>
//       </MapContainer> */}
//       <MapContainer
//         center={center}
//         zoom={ZOOM_LEVEL}
//         ref={mapRef}
//       >
//         <TileLayer url={osm.maptiler.url} attribution={osm.maptiler.attribution} />
//       </MapContainer>
//     </div>
//   );
// }

class App extends Component {
  constructor(props){
    super(props);
    AuthService.initializeValidUsers();
    this.state = {
      isLoggedIn: AuthService.isAuthenticated()
    }
  }

  onLogin = () => {
    this.setState({ isLoggedIn: AuthService.isAuthenticated() });
  }

  render(){
    return (
      <Router>
        <Switch>
          {this.state.isLoggedIn && <Route path="/" component={DashboardUI} />}
          <Route exact path="/" render={() => <Login onLogin={this.onLogin} />} />
          <Route path="*" render={() => <Redirect to="/" />} />
        </Switch>
      </Router>
    );
  }
}

export default App;
