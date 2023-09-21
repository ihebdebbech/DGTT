import React, { createContext, useContext, useEffect, useState } from 'react';
import Keycloak from 'keycloak-js';
import { IonContent,IonAlert,IonImg,useIonAlert, IonHeader,useIonRouter, IonTitle,IonRouterOutlet, IonToolbar,IonPage, IonInput, IonButton , InputChangeEventDetail } from '@ionic/react';

import { App as CapacitorApp, URLOpenListenerEvent } from '@capacitor/app';
import axios from 'axios';
import { CapacitorHttp,HttpResponse } from '@capacitor/core';
import { CapacitorCookies } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { refresh } from 'ionicons/icons';
const KeycloakContext = createContext<{
  keycloak:any;
  authenticated: boolean;
} | null>(null);
export const useKeycloak = () => {
  const context = useContext(KeycloakContext);
  if (context === null) {
    throw new Error('useKeycloak must be used within a KeycloakProvider');
  }
  
  return context;
};

interface KeycloakProviderProps {
  children: React.ReactNode;
}

const KeycloakProvider: React.FC<KeycloakProviderProps> = ({ children }) => {
  const ionRouter = useIonRouter();
  const [keycloak, setKeycloak] = useState<any>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [logout,setloggedout] =useState<boolean>(false);
  useEffect(() => {

const authenticateUser = async () => {
  const keycloakinstance = new Keycloak({url:'http://172.16.10.19:8040/',realm:'DGTT',clientId:'1'});

  await keycloakinstance.init({checkLoginIframe:false,adapter:'default',flow:'standard'});
  console.log(keycloakinstance);
if(!localStorage.getItem('keycloakrefreshtoken')){
  setKeycloak(keycloakinstance);
 /*try {
    const options2 = {
      url: 'http://172.16.10.19:8040/realms/DGTT/protocol/openid-connect/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({
        grant_type: 'password',
        client_id: '1',
        username: 'ihebdebbech1',
        password: '123456789'
      }).toString()
    };
    const  response: HttpResponse = await CapacitorHttp.request(options2);
    console.log(response);
    localStorage.setItem('keycloakaccesstoken',response.data.access_token );
    localStorage.setItem('keycloakrefreshtoken',response.data.refresh_token );
    keycloakinstance.token=response.data.access_token;
    keycloakinstance.refreshToken=response.data.refresh_token;
    await keycloakinstance.updateToken(500);
   
    setAuthenticated(true);
    setKeycloak(keycloakinstance);
  
  }
  
   catch (error) {
    console.error('Error authenticating user:', error); }*/
    
} else{
  
 const reftoken=localStorage.getItem('keycloakrefreshtoken');
 const acctoken=localStorage.getItem('keycloakaccesstoken');
 
 if(reftoken && acctoken){
  
 keycloakinstance.refreshToken=reftoken;
keycloakinstance.token=acctoken;


//const lol= keycloakinstance.isTokenExpired(300);

  

 // keycloakinstance.onTokenExpired = () =>{
  
    
await keycloakinstance.updateToken(500).then(refresh =>{ if(refresh) console.log("token was refreshed");else console.log("token is still valid");}
).catch(err => {console.error('error updating: '+err); localStorage.removeItem('keycloakaccesstoken');
localStorage.removeItem('keycloakrefreshtoken');console.log(authenticated); setloggedout(true); ionRouter.push('/login');
});
if(keycloakinstance.authenticated){
  console.log('test');
  
    localStorage.setItem('keycloakaccesstoken',keycloakinstance.token );
    localStorage.setItem('keycloakrefreshtoken',keycloakinstance.refreshToken);
setAuthenticated(true);
    setKeycloak(keycloakinstance);
    console.log(keycloakinstance);
}

   
 }
  }

};(async () => {
  authenticateUser();
})();
/*const openCapacitorSite = async () => {
              console.error("innnn browser open")
  await Browser.open({ url: 'http://192.168.1.102:8040/realms/DGTT/protocol/openid-connect/auth?client_id=1&redirect_uri=http%3A%2F%2Flocalhost%3A8100&state=1964e83e-c371-4334-b623-0030fd56ecbc&response_mode=fragment&response_type=id_token%20token&scope=openid&nonce=ec301a11-f54a-485f-b195-4b1155ee9fc1' });
  //Browser.addListener('browserFinished',() => console.error("3donee")) ;

};
console.log(window.location.origin);
//openCapacitorSite();
//keycloakinstance.idToken='eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICIwUUpJdFc0NWN4U0FsdWd0SGMybC1MVDJZaTdYT3dEeUZzY0lGd0MwMmtjIn0.eyJleHAiOjE2OTMxNjA4NzMsImlhdCI6MTY5MzE1OTk3MywiYXV0aF90aW1lIjoxNjkzMTU5NjQ5LCJqdGkiOiIwNDUwYzNiMi00MDcyLTRmYzYtYWZkYy0xNmUxODNiODNjNWIiLCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjgwNDAvcmVhbG1zL0RHVFQiLCJhdWQiOiIxIiwic3ViIjoiZDVhYTVmZmYtY2MxMC00NDZkLWI4OTctMmVlMGEwOGE5NWMzIiwidHlwIjoiSUQiLCJhenAiOiIxIiwibm9uY2UiOiIzYmQ0YWQ5NS01NzBhLTRlODItODU5Zi1kMGMxYWQzNmQ5MDkiLCJzZXNzaW9uX3N0YXRlIjoiNWYzZTE5MmUtMzQxZi00NzRlLWFkMzEtNzhlMzkxZDg4OTY4IiwiYXRfaGFzaCI6IjA3Z2FXbnRHbXEtVU5GSHVZcXhNaVEiLCJhY3IiOiIwIiwic19oYXNoIjoiUU9pQWdPamtqNFhjcXRtZEtqNERKdyIsInNpZCI6IjVmM2UxOTJlLTM0MWYtNDc0ZS1hZDMxLTc4ZTM5MWQ4ODk2OCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJuYW1lIjoiaWhlYiBkZWJiZWNoIiwicHJlZmVycmVkX3VzZXJuYW1lIjoiaWhlYmRlYmJlY2gxIiwiZ2l2ZW5fbmFtZSI6ImloZWIiLCJmYW1pbHlfbmFtZSI6ImRlYmJlY2giLCJlbWFpbCI6ImloZWIuZGViYmVjaEBlc3ByaXQudG4ifQ.elbD0RR0Py-TjzmQKMkiqc_S6quCQiiul5FyI6_TllkKlMz9K302_l5BMEMEfDcqkxZD8VKutERkYKw4i2b5_3zXMpHdOJUOz2lPLmoyZVqrxjQwH9qhIE54qCRk1dWHNIwHR1eWSgaC4pxwBpcss6xKWUjQLBqo1QJCuOeTp8ewRQBuwQ5GwOR4gGWuLmPeaKGdBpR2yaJjRtJi3bYMNYA3HkljR44azKeRtAPKBKUZcy0V1aS6KabtpQOQo2pcEczio5PMoVw8RhUIrn053wUNV8eDCsqvKFW_AlbqA99iOhztIbMuTlmYlyoI4TUHT-BhW618O5d7Prvpv9y7jQ';
    keycloakinstance.init({
      adapter:'default',
              onLoad: 'check-sso', // Perform a silent check for existing SSO session
             silentCheckSsoRedirectUri: 'http://localhost:8100/silentcheck.html',
              flow:'implicit',
           redirectUri: 'http://localhost:8100'
            }).then( auth => {
              if (auth) {
                console.log('User authenticated with Keycloak');
                console.log(keycloakinstance);
                setAuthenticated(true);

        setKeycloak(keycloakinstance);
        
                // Now you can proceed to navigate or interact with your app
                } else {
                
                //openCapacitorSite();
               keycloakinstance.login();
               console.error(auth);
            //console.log(keycloakinstance);
              }
            })
            .catch((error) => {
              console.error('Error authenticating:', error);
            });*/
          

     /*const appUrlOpenListener = CapacitorApp.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
        const domain = '2282-197-17-4-143.ngrok-free.app';
        const deepLinkUrl = new URL( event.url);
        // Parse the URL to extract authentication data
       
       token = deepLinkUrl.searchParams.get('token');
      
        const pathArray = event.url.split(domain);
        console.log("teest");
        console.log(token);
      });
        if (token ) {
          console.error("in appppppppp");
          // Authenticate with Keycloak using the extracted token
          keycloakinstance
            .init({
              token: token,
              refreshToken: token, // Keycloak expects both token and refreshToken fields
              idToken: token
              
            }).then( auth => {
              if (auth) {
                console.log('User authenticated with Keycloak');
                setAuthenticated(true);
        setKeycloak(keycloakinstance);
                // Now you can proceed to navigate or interact with your app
              } else {
                console.log('Authentication failed');
              }
            })
            .catch((error) => {
              console.error('Error authenticating:', error);
            });
          }
        // The pathArray is now like ['https://devdactic.com', '/details/42']
        
        // Get the last element with pop()
       
      else{
  
      
   
    
    keycloakinstance.init({ adapter:'capacitor-native',
    responseMode: 'query',
    redirectUri: 'https://2282-197-17-4-143.ngrok-free.app/',}).then(auth => {
      if (!auth) {
        console.error(auth);
        console.error(keycloakinstance);
        console.error('innnn ifff');
        console.error(keycloakinstance.createLoginUrl());
       keycloakinstance.login();
    
      
      } else {
        console.error('inn elsee');
        setAuthenticated(true);
        setKeycloak(keycloakinstance);
          //console.log(keycloakinstance.tokenParsed);
      }
      
  }).catch((auth1) => {
      console.error("Authenticated Failed");
      console.error('hellooo'+auth1);
  });
}*/

}, []);


if (!keycloak) {
  return null;
}
else
return (
  <KeycloakContext.Provider value={{ keycloak, authenticated }}>
    {children}
  </KeycloakContext.Provider>
);
};

export default KeycloakProvider;