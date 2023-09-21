import React, { useState,useEffect,ChangeEvent,useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonReactRouter } from '@ionic/react-router';
import { IonContent,IonAlert,IonImg,useIonAlert, IonHeader,useIonRouter, IonTitle,IonRouterOutlet, IonToolbar,IonPage, IonInput, IonButton , InputChangeEventDetail } from '@ionic/react';
import Modal from 'react-modal';
import '../theme/variables.css';
import QRCode from 'qrcode.react';
import './formtest.css';
import { useHistory } from 'react-router-dom';
import Tab1 from './Tab1';
import { alert } from 'ionicons/icons';
import { IonIcon } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import logo from '../../assets/dgtt.png';

import { useKeycloak } from './KeycloakProvider';
Modal.setAppElement('#root');
const formtest: React.FC = () => {
  const { keycloak, authenticated } = useKeycloak();
  const [alert1] = useIonAlert();
  const [alert2]=useIonAlert();
  const history = useHistory();
  const ionRouter = useIonRouter();
    const [formData, setFormData] = useState(false);
      const [qrCodeValue, setQRCodeValue] = useState('');
      const [isModalOpen, setIsModalOpen] = useState(false);
      const [isfalsedata, setfalsedata] = useState(false);
      const [isPasswordWrong, setIsPasswordWrong] = useState(false);
      const [isemailWrong, setIsemailWrong] = useState(false);
      //const [keycloak, setKeycloak] = useState<Keycloak | null >(null);
       const username=keycloak?.tokenParsed?.preferred_username;
console.log(keycloak?.tokenParsed?.preferred_username);
     
       
    if(!authenticated){ionRouter.push('/login'); 
    return null;
  }
    else{
      const search = () => {
        ionRouter.push('/formtest');
      };
      
     
     const logout =() =>{localStorage.removeItem('keycloakaccesstoken');
     localStorage.removeItem('keycloakrefreshtoken');
     ionRouter.push('/login');
    }
      const scan = () => {
        ionRouter.push('/QRCodeScanner');
      /* if(qrCodeValue){
      alert2({header :'valid',
      
      message:'welcome '+formData.marque,
      buttons:[{text:'hello again',handler:()=>{setFormData({...formData,marque:'',modele:''});ionRouter.push('/tab1');}}]
    });}
        
        else{
          generateQRCode();alert1({ header: 'Alert',
        subHeader: 'Important message',
        message: 'you are not iheb!',
        buttons: [{text:'OK',handler:()=>{setFormData({...formData,name:'',email:''})}},'cancel'],
      }); console.log(qrCodeValue);}*/
      };
      const closeModal = () => {
        setIsModalOpen(false);
        ionRouter.push('/QRCodeScanner');
      };
      const inputStyles = {
        /* Your regular styles for the custom class here */
      };
    
      const wrongPasswordStyles = {
        border: '2px solid red', // Apply red border when the password is wrong
      };
    
     if (!formData ) {
        setFormData(true);
        // Handle the case when keycloak is not available yet
        return <div>Loading...</div>;
      }
      else
      return (
       
        <IonPage>
          
            <IonHeader >
        <IonToolbar className="title" >
        
          <IonTitle  style={{fontSize:'1.5rem'}}>WELCOME {keycloak?.tokenParsed?.preferred_username} </IonTitle>
          <IonIcon icon={logOut} onClick={logout} slot="end" size='large' ></IonIcon>
        </IonToolbar>
      </IonHeader>
          <IonContent fullscreen>
                  
              <IonButton className='inputbutton' onClick={search}>search with matricule</IonButton> 
              <IonButton className='inputbutton' onClick={scan} >Qr code scan</IonButton>
           
           
    
            
           
          </IonContent>

        </IonPage>
        
      );
    }
    }
  
  export default formtest;