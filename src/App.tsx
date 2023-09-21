import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,useIonRouter
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import React, { useContext,useState,useEffect,ChangeEvent,createContext } from 'react';
import { ellipse, key, square, thumbsUp, triangle } from 'ionicons/icons';
import Tab1 from './pages/Tab1';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';
import login from './pages/login';
import Formtest from './pages/formtest';
import QRCodeScanner from './pages/camerates'
/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import { Browser } from '@capacitor/browser';
/* Theme variables */
import './theme/variables.css';
import  Keycloak from 'keycloak-js';
import { App as CapacitorApp, URLOpenListenerEvent } from '@capacitor/app';
setupIonicReact();

const App: React.FC = () => {
  
  const [authenticated1, setAuthenticated] = useState(false);
  //const ionRouter = useIonRouter();
 

 
let initOptions = {
    url: 'https://sso.pdoct-congo.com/auth/',
    "ssl-required": "external",
    realm: 'DGTT',
    clientId: 'web_app',
  onLoad: 'login-required',
}
/*
const keycloak = new Keycloak("/keycloak.json");
if(keycloak)
{ 
  console.log(keycloak);
  
keycloak.init({ onLoad: 'check-sso' ,silentCheckSsoRedirectUri:window.location.origin + '/silentcheck.html'}).then(auth => {
    if (!auth) {
     keycloak.login();
    
    } else {
      
      setAuthenticated(true);
        console.info("Authenticated");
    }
    
}).catch((auth) => {
    console.error("Authenticated Failed");
    console.log(auth);
});
}
*/
 
  



/*
.then((authenticated) => {
  if (authenticated) {
    console.log('User is authenticated');
    console.log('Access Token:', keycloakInstance.token);
    setAuthenticated(authenticated);
   
    // You might want to handle further logic for authenticated users here
  } else {
  //  keycloakInstance.login();

    console.log('User is not authenticated');
  }
})
.catch((error) => {
  console.error('Error initializing Keycloak:', error);
  // Handle the error gracefully, for example, display a message to the user
});
 */
  
 

return(
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
        <Route exact path="/formtest"  >
            <Formtest />
          </Route>
        <Route exact path="/QrcodeScanner" component={QRCodeScanner} >
           
          </Route>
          <Route exact path="/tab1" component={Tab1}>
            <Tab1 />
          </Route>
         
          <Route exact path="/tab2">
            <Tab2 />
          </Route>
          <Route path="/tab3">
            <Tab3 />
          </Route>
          <Route exact path="/login" component={login}>
          
         
              
          </Route>
          <Redirect exact from="/" to="/login" />
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
        
         
          
          
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>);
};

export default App;
