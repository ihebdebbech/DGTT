import React, { useState,useEffect,ChangeEvent,useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { IonContent,IonItem,IonLabel,IonAlert,IonImg,useIonAlert, IonHeader,useIonRouter, IonTitle,IonRouterOutlet, IonToolbar,IonPage, IonInput, IonButton , InputChangeEventDetail } from '@ionic/react';

//import '../theme/variables.css';
import QRCode from 'qrcode.react';

import { useHistory } from 'react-router-dom';
import Tab1 from './Tab1';
import { alert } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { logoIonitron } from 'ionicons/icons';
import logo from '../../assets/dgtt.png';
import { CapacitorHttp,HttpResponse } from '@capacitor/core';
import { useKeycloak } from './KeycloakProvider';


const login: React.FC = () => {
  const [showAlert, setShowAlert] = useState(false);
    const ionRouter = useIonRouter();
    const [formData, setFormData] = useState({ username: '', password: '' });
    const [isWrong, setIsWrong] = useState(false);
    const options2 = {
      url: 'http://172.16.10.19:8040/realms/DGTT/protocol/openid-connect/token',
      method: 'post',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      data: new URLSearchParams({
        grant_type: 'password',
        client_id: '1',
        username: formData.username,
        password: formData.password
      }).toString()
    };
   
    const handleInputChange = (event:ChangeEvent<HTMLIonInputElement>) => {
      setIsWrong(false);
      const { name, value } =  event.target;
            //  console.log(value);
      setFormData({ ...formData, [name]: event.target.value?.toString() || '' });
      
     
      event.preventDefault();
    };
    
     
    const login = async () =>{
    try {
       
        console.log("euuuuuuu");
        const  response: void|HttpResponse = await CapacitorHttp.request(options2).then(response => {
          if(response.status ==200){
            localStorage.setItem('keycloakaccesstoken',response.data.access_token );
        localStorage.setItem('keycloakrefreshtoken',response.data.refresh_token );
        //window.location.reload();
       // >kc.bat start-dev --http-enabled=false --https-key-store-password=secret --hostname=192.168.0.25 --https-port 8010 --http-port 8040
        ionRouter.push('/formtest');
        window.location.reload();
          }
          else{ setShowAlert(true); setIsWrong(true);}
        }).catch(err => {console.error('error updating: '+err)});
        console.log(response);
        //localStorage.setItem('keycloakaccesstoken',response.data.access_token );
        //localStorage.setItem('keycloakrefreshtoken',response.data.refresh_token );
      //  window.location.reload();
       
        //ionRouter.push('/formtest');
        console.log("euuuuuuu");
        
      
      }catch (error) {
        console.error('Error authenticating user:', error); }
    }
   
   
     // console.log('teest');
     
        // login();
       
      
   
      return (
       
    

       
             <IonPage>
             <IonHeader >
         <IonToolbar className="title" >
           <IonTitle  style={{fontSize:'1.5rem'}}>LOGIN</IonTitle>
         </IonToolbar>
       </IonHeader>
           <IonContent fullscreen>
           <img src={logo} alt="Logo"   className="logoicon" /> 
             <div className='formulaire'>
            <h1>Log into your Account</h1>
             
             <IonInput
                 name="username"
                 type="text"
                 placeholder="Username/Email"
                 value={formData.username}
             onInput={handleInputChange}
                 className='inputform'
                 style={{ ...(isWrong && { border: '2px solid red' }), }} ></IonInput>
               <div className="line"></div>
               <IonInput
               className='inputform'
                 name="password"
                 type="password"
                 placeholder="password"
                 value={formData.password}
                 onInput={handleInputChange} 
                 style={{ ...(isWrong && { border: '2px solid red' }), }}  ></IonInput>
              
          
               <IonButton className='inputbuttonlogin' type="submit" onClick={ async () => login()} >Submit</IonButton>
              </div>
           <IonAlert
             isOpen={showAlert}
             onDidDismiss={() => setShowAlert(false)}
             header="Wrong credentials"
             message="Please verify your password or username/email"
             buttons={['OK']}
             style={{['color']:'white'}}
           />
           </IonContent>
     
             </IonPage>
      );
    };
  export default login;
