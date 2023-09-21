import React, { useState,useEffect, useRef } from 'react';
import { IonButton,IonTitle,IonLabel, IonContent,IonHeader,IonToolbar,IonPage, IonImg } from '@ionic/react';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { isPlatform } from '@ionic/react'
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ExploreContainer from '../components/ExploreContainer';
import jsQR from 'jsqr';
import Modal from 'react-modal';
import { image } from 'ionicons/icons';
import { Style } from '@capacitor/status-bar';

Modal.setAppElement('#root');
const QRCodeScanner1:React.FC = () => {
  
  const [qrCodeData, setQRCodeData] = useState('');
  
  const [isStreamActive,setisStreamActive] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [Datalist, setDatalist] = useState({
    marque: '',
    modele: '',
    puissance_fiscale:'',
    vitesse_maximum:'',
    acceleration0_100km:'',
    transmission:'',
    boite:'',
    nbVitesse:'',


  });
 /* const takePicture = async () => {
    try {
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
    
    
      //
     // console.log();
    if (isPlatform('hybrid')) {
      console.log('hybrid');
      const imgebase=image.base64String;
     // processQRCode(image.webPath);
    
     const file = await Filesystem.readFile({
      path: image.path!,
      directory: Directory.Data, // Use the appropriate directory based on your requirements
    });

    const base64String = 'data:image/jpeg;base64,' + file.data;

    // Convert the base64 image to Uint8Array
    const decodedData = Uint8Array.from(atob(base64String.split(',')[1]), (char) => char.charCodeAt(0));
    const uint8ClampedArray = Uint8ClampedArray.from(decodedData);


        const code = jsQR(uint8ClampedArray as any, 640, 480);
        if (code) {
          
          console.log(code.data);
          setQRCodeData(code.data);
          
            try {
              const parsedArray = JSON.parse(code.data);
              console.log(parsedArray);
              setDatalist({... Datalist,marque:parsedArray['marque'],modele:parsedArray['modele'],puissance_fiscale:parsedArray['puissance_fiscale'],vitesse_maximum:parsedArray['vitesse_maximum'],acceleration0_100km:parsedArray['acceleration0_100km'],transmission:parsedArray['transmission'],boite:parsedArray['boite'],nbVitesse:parsedArray['nbVitesse']});
            } catch (error) {
              console.error('Error parsing JSON data:', error);
            }
        
        } else {
          setQRCodeData('QR code not found in the image.');
        }
      }else{
      processQRCode(image.webPath);}
    } catch (error) {
      console.error('Error taking picture:', error);
    }
    
  };

  const processQRCode = (imgebase: string | undefined) => {
    if (imgebase) {
      const img = new Image();
  console.log("innnn");
      
      img.onload = () => {
        
        const canvas = document.createElement('canvas');
        const canvasContext = canvas.getContext('2d');
        canvas.width = img.width;
        canvas.height = img.height;
        canvasContext?.drawImage(img, 0, 0, img.width, img.height);
        const imageData = canvasContext?.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData?.data as any, img.width, img.height);
        if (code) {
          
          console.log(code.data);
          setQRCodeData(code.data);
          
            try {
              const parsedArray = JSON.parse(code.data);
              console.log(parsedArray);
              setDatalist({... Datalist,marque:parsedArray['marque'],modele:parsedArray['modele'],puissance_fiscale:parsedArray['puissance_fiscale'],vitesse_maximum:parsedArray['vitesse_maximum'],acceleration0_100km:parsedArray['acceleration0_100km'],transmission:parsedArray['transmission'],boite:parsedArray['boite'],nbVitesse:parsedArray['nbVitesse']});
            } catch (error) {
              console.error('Error parsing JSON data:', error);
            }
        
        } else {
          setQRCodeData('QR code not found in the image.');
        }
   //  };
      }
      img.src = imgebase;
      }
  };*/
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const startCamera = async () => {
    try {
      const stream = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
   return stream;
    } catch (error) {
      console.error('Error starting the camera:', error);
      return error;
    }
  };
  useEffect(() => {
   

    const handleStream = (stream: any) => {
      const video = videoRef.current;
      if (video) {
        video.srcObject = stream;
        video.addEventListener('loadedmetadata', () => {
          // Video metadata is loaded, start scanning
          video.play()
            .then(() => {
             
              setScanning(true); // Start scanning
              scanQRCode(video);
            })
            .catch((error) => {
              console.error('Error playing video:', error);
            });
        });
      }
    };

    const handleError = (error: Error) => {
      console.error('Error accessing the camera:', error);
    };

    const scanQRCode = (video: HTMLVideoElement) => {
      if (scanning || isStreamActive) {

      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      if (!context) {
        console.error('Canvas context is null.');
        setScanning(false);
        return;
      }
      if (video.readyState >= video.HAVE_CURRENT_DATA) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);

        if (code) {
          const parsedArray = JSON.parse(code.data);
          setDatalist({... Datalist,marque:parsedArray['marque'],modele:parsedArray['modele'],puissance_fiscale:parsedArray['puissance_fiscale'],vitesse_maximum:parsedArray['vitesse_maximum'],acceleration0_100km:parsedArray['acceleration0_100km'],transmission:parsedArray['transmission'],boite:parsedArray['boite'],nbVitesse:parsedArray['nbVitesse']});

          setScanning(false);
          setisStreamActive(false);
          const video = videoRef.current;
          if (video) {
            video.srcObject = null;
          }
          return; // Stop scanning after successful detection
        }
        else{ requestAnimationFrame(() => scanQRCode(video));// Continue scanning
      }
      }
    }
      
    };
    if (isStreamActive ) {
   /* navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
      .then(handleStream)
      .catch(handleError);*/
      handleStream(startCamera);
    }
   
  }, [isStreamActive]);
 

  return (
    <IonPage>
    <IonHeader>
<IonToolbar>
  <IonTitle>scanner qrcode</IonTitle>
</IonToolbar>
</IonHeader>
    <IonContent style={{left:'80px',top:'100px'}}>
    <Modal isOpen={isModalOpen} style={{content: {width:'250px',height:'150px'}}}>
     <IonButton onClick={()=>{setisStreamActive(true);setIsModalOpen(false);}}>search with matricule</IonButton>
     <IonButton onClick={()=>{setisStreamActive(true);setIsModalOpen(false);}}>search with QR</IonButton>
    
    
      </Modal>
    
       {isStreamActive ? ( 
         <video ref={videoRef} style={{ width: '50%', height: 'auto' }} />
      ): (
        <>
           <p>marque:{Datalist.marque}</p>
           <p>modele:{Datalist.modele}</p>
         <p> puissance_fiscale: {Datalist.puissance_fiscale}</p>
         <p> vitesse_maximum: {Datalist.vitesse_maximum}</p>
         <p> vitesse_maximum: {Datalist.vitesse_maximum}</p>
         <p> acceleration0_100km: {Datalist.acceleration0_100km}</p>
         <p> transmission: {Datalist.transmission}</p>
         <p> boite: {Datalist.boite}</p>
         <p> nbVitesse: {Datalist.nbVitesse}</p>
         </>
      ) }


 
    
     
   
     
    </IonContent>
    </IonPage>
  );
};

export default QRCodeScanner1;
