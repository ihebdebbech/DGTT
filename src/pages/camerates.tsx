import React, { useState } from 'react';
//import { BarcodeScanResult, BarcodeScanner } from '@ionic-native/barcode-scanner';
import { BarcodeScanner, SupportedFormat } from '@capacitor-community/barcode-scanner';
import { IonApp, IonRouterOutlet ,isPlatform} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import './camerates.css';
import axios from 'axios';
import { IonIcon } from '@ionic/react';
import { logOut } from 'ionicons/icons';
import { Http } from '@capacitor-community/http';
import { IonContent, IonHeader,useIonRouter, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import { CapacitorHttp,HttpResponse } from '@capacitor/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { useKeycloak } from './KeycloakProvider';
//import { Plugins, Capacitor } from '@capacitor/core';
//import { Plugin } from '@awesome-cordova-plugins/core';
const QRCodeScanner: React.FC = () => {
    const [qrCodeData, setQRCodeData] = useState({
      ref:'',
      numChassis:'',
      matricule:'',
      categorie:'',
      dateDelivrance:'',
      proprietaire:'',
      dateControle:'',
      dateValidation:'',
      centre:'',
      situation:'',
      ok:''
  });
  const ionRouter = useIonRouter();
  const { keycloak, authenticated } = useKeycloak();
  const logout =() =>{localStorage.removeItem('keycloakaccesstoken');
     localStorage.removeItem('keycloakrefreshtoken');
     ionRouter.push('/login');
    }
  if(!authenticated){ionRouter.push('/login'); 
  return null;
}
  else{
  const httptest = async () => {
    try {
      let response;
      if(isPlatform('hybrid')){
      const options = {
        url: 'https://dgtt.pdoct-congo.com/api/open-api/check-vehicule-by-ref?ref=CT20_18251',
        headers: { 'X-Fake-Header': 'Max was here' },
        params: { size: 'XL' },
        
      };     const  response1: HttpResponse = await CapacitorHttp.get(options);
      console.log('teesttt1'+response1.data.numChassis);
      const options2 = {
        url: 'https://dgtt.pdoct-congo.com/api/open-api/check-vehicule-by-ref?ref=CT20_18251',
        headers: { 'X-Fake-Header': 'Max was here' },
        params: { size: 'XL' },
        
      };     const  response2: HttpResponse = await CapacitorHttp.get(options2);
      console.log('teesttt2'+response2.data.numChassis);
      stopScan();
      setQRCodeData( {matricule: response1.data.matricule,numChassis: response1.data.numChassis,categorie: response1.data.categorie,dateDelivrance: response1.data.dateDelivrance,centre: response1.data.centre,dateControle: response1.data.dateControle,dateValidation: response1.data.dateValidation,proprietaire: response1.data.proprietaire,ref: response1.data.ref,ok: response1.data.ok,situation: response1.data.situation});
      }
       else{const options = {
        url: 'https://cors-anywhere.herokuapp.com/https:\/\/dgtt.pdoct-congo.com\/api\/open-api\/check-vehicule-by-ref?ref=CT20_18251',
        headers: { 'X-Fake-Header': 'Fake-Value' },
        };
        //response = await window.fetch('https://example.com/my/api');
         response = await  Http.get({...options, method: 'GET' });
      
         console.log(response.data.numChassis);
         stopScan();
         setQRCodeData( {matricule: response.data.matricule,numChassis: response.data.numChassis,categorie: response.data.categorie,dateDelivrance: response.data.dateDelivrance,centre: response.data.centre,dateControle: response.data.dateControle,dateValidation: response.data.dateValidation,proprietaire: response.data.proprietaire,ref: response.data.ref,ok: response.data.ok,situation: response.data.situation});
          }
    
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
      const startScan = async () => {
       // BarcodeScanner.hideBackground();
     
        
       try {
        
      // const status= await BarcodeScanner.checkPermission({ force: true });
      //  if(status.granted){
          BarcodeScanner.prepare();
          
          //BarcodeScanner.hideBackground();
        
           const result = (await  BarcodeScanner.startScan({  targetedFormats: [SupportedFormat.QR_CODE],}));

        if (result.hasContent) {
          stopScan();
          console.log(result.content);
        /*  axios.get('https://gobetween.oklabs.org/'+result.content)
  .then(response => {
// setQRCodeData( response.data[0]);
    stopScan();  
    console.log(response.data); // Your API response data
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });*/
  try {
    let response;
    if(isPlatform('hybrid')){
    const options = {
      url:result.content,
      headers: { 'X-Fake-Header': 'Max was here' },
      params: { size: 'XL' },
      
    };     const  response1: HttpResponse = await CapacitorHttp.get(options);
    console.log(response1.data.numChassis);
    stopScan();
    setQRCodeData( {matricule: response1.data.matricule,numChassis: response1.data.numChassis,categorie: response1.data.categorie,dateDelivrance: response1.data.dateDelivrance,centre: response1.data.centre,dateControle: response1.data.dateControle,dateValidation: response1.data.dateValidation,proprietaire: response1.data.proprietaire,ref: response1.data.ref,ok: response1.data.ok,situation: response1.data.situation});
    }
     else{const options = {
      url: 'https://cors-anywhere.herokuapp.com/'+result.content,
      headers: { 'X-Fake-Header': 'Fake-Value' },
      };
      //response = await window.fetch('https://example.com/my/api');
       response = await  Http.get({...options, method: 'GET' });
    
       console.log(response.data.numChassis);
       stopScan();
       setQRCodeData( {matricule: response.data.matricule,numChassis: response.data.numChassis,categorie: response.data.categorie,dateDelivrance: response.data.dateDelivrance,centre: response.data.centre,dateControle: response.data.dateControle,dateValidation: response.data.dateValidation,proprietaire: response.data.proprietaire,ref: response.data.ref,ok: response.data.ok,situation: response.data.situation});
        }
  
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  
            
        }}
          catch (error) {
      console.error('Error starting camera:', error);
      // Handle the error appropriately, e.g., display an error message to the user
    }
      };
      
      const stopScan = () => {
       
      //  BarcodeScanner.showBackground();
        BarcodeScanner.stopScan();
      };
      const checkPermission = async()=>{ const resultcheck = await Camera.checkPermissions();
        if (resultcheck.camera === 'denied' || resultcheck.camera ==='prompt') {
          // Request camera permission
          const permissionResult = await Camera.requestPermissions();
          if (permissionResult.camera === 'granted' ) {
            console.log('Camera permission granted.');
            startScan();
   
           
          } else {
            console.log('Camera permission denied.');
          }}
       else {
          console.log('Camera permission already granted.');
          startScan();
        }}
     
     
 //  const data= BarcodeScanner.startScan({ targetedFormats: [SupportedFormat.QR_CODE] }); 
 
 if(!qrCodeData.matricule){

 }

 const rescan= () =>{
  setQRCodeData( {matricule: '',numChassis: '',categorie: '',dateDelivrance: '',centre: '',dateControle: '',dateValidation: '',proprietaire: '',ref: '',ok: '',situation: ''});
                    checkPermission();
 }
 if(!qrCodeData.matricule  )
 checkPermission();
    return (
<IonPage className='page'>
    <IonHeader>
<IonToolbar className="title">
  <IonTitle  style={{fontSize:'1.5rem'}}>scanner qrcode</IonTitle>
  <IonIcon icon={logOut} onClick={logout} slot="end" size='large' ></IonIcon>
</IonToolbar>
</IonHeader>


    <IonContent >
        <IonButton onClick={rescan} className='scanbutton'  >Scan again</IonButton>
{qrCodeData.numChassis && 
     <div style={{position:'relative',top:'70px'}}>
      <div className='flex-container'>
        <p className='flex-item'>Proprietaire:</p><p className='flex-item1'>{qrCodeData.proprietaire}</p>
       </div> 
       <div className="line1"></div>
       <div className='flex-container'>
        <p className='flex-item'>NumChassis:</p><p className='flex-item1'>{qrCodeData.numChassis}</p>
       </div> 
       <div className="line1"></div>
       <div className='flex-container'><p className='flex-item'>Matricule:</p><p className='flex-item1'>{qrCodeData.matricule}</p>
        </div>
        <div className="line1"></div>
        <div className='flex-container'>
        <p className='flex-item'>Categorie:</p><p className='flex-item1'>{qrCodeData.categorie}</p>
       </div> 
       <div className="line1"></div>
       <div className='flex-container'>
        <p className='flex-item'>Centre:</p><p className='flex-item1'>{qrCodeData.centre}</p>
        </div>
        <div className="line1"></div>
        <div className='flex-container'>
        <p className='flex-item'>DateDelivrance:</p><p className='flex-item1'>{qrCodeData.dateDelivrance}</p>
        </div>
        <div className="line1"></div>
        <div className='flex-container'>
        <p className='flex-item'>DateValidation:</p><p className='flex-item1'>{qrCodeData.dateValidation}</p>
        </div>
        <div className="line1"></div>
        <div className='flex-container'>
        <p className='flex-item'>DateControle:</p><p className='flex-item1'>{qrCodeData.dateControle}</p>
       </div>
        <div className="line1"></div>
        <div className='flex-container'>
        <p className='flex-item'>Situation:</p><p className='flex-item1'>{qrCodeData.situation}</p>
       </div> <div className="line1"></div>
      </div>}
    </IonContent>
</IonPage>
    );
}
  };

 // askUser();
export default QRCodeScanner;