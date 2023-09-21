import{f as m,h as s,g as v,r as w}from"./index-c9c7d121.js";var d=globalThis&&globalThis.__awaiter||function(o,t,e,i){function r(n){return n instanceof e?n:new e(function(l){l(n)})}return new(e||(e=Promise))(function(n,l){function c(h){try{a(i.next(h))}catch(f){l(f)}}function p(h){try{a(i.throw(h))}catch(f){l(f)}}function a(h){h.done?n(h.value):r(h.value).then(c,p)}a((i=i.apply(o,t||[])).next())})},u=globalThis&&globalThis.__generator||function(o,t){var e={label:0,sent:function(){if(n[0]&1)throw n[1];return n[1]},trys:[],ops:[]},i,r,n,l;return l={next:c(0),throw:c(1),return:c(2)},typeof Symbol=="function"&&(l[Symbol.iterator]=function(){return this}),l;function c(a){return function(h){return p([a,h])}}function p(a){if(i)throw new TypeError("Generator is already executing.");for(;l&&(l=0,a[0]&&(e=0)),e;)try{if(i=1,r&&(n=a[0]&2?r.return:a[0]?r.throw||((n=r.return)&&n.call(r),0):r.next)&&!(n=n.call(r,a[1])).done)return n;switch(r=0,n&&(a=[a[0]&2,n.value]),a[0]){case 0:case 1:n=a;break;case 4:return e.label++,{value:a[1],done:!1};case 5:e.label++,r=a[1],a=[0];continue;case 7:a=e.ops.pop(),e.trys.pop();continue;default:if(n=e.trys,!(n=n.length>0&&n[n.length-1])&&(a[0]===6||a[0]===2)){e=0;continue}if(a[0]===3&&(!n||a[1]>n[0]&&a[1]<n[3])){e.label=a[1];break}if(a[0]===6&&e.label<n[1]){e.label=n[1],n=a;break}if(n&&e.label<n[2]){e.label=n[2],e.ops.push(a);break}n[2]&&e.ops.pop(),e.trys.pop();continue}a=t.call(o,e)}catch(h){a=[6,h],r=0}finally{i=n=0}if(a[0]&5)throw a[1];return{value:a[0]?a[1]:void 0,done:!0}}};/**
* MediaStream ImageCapture polyfill
*
* @license
* Copyright 2018 Google Inc.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*      http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/var g=window.ImageCapture;typeof g>"u"&&(g=function(){function o(t){var e=this;if(t.kind!=="video")throw new DOMException("NotSupportedError");this._videoStreamTrack=t,"readyState"in this._videoStreamTrack||(this._videoStreamTrack.readyState="live"),this._previewStream=new MediaStream([t]),this.videoElement=document.createElement("video"),this.videoElementPlaying=new Promise(function(i){e.videoElement.addEventListener("playing",i)}),HTMLMediaElement?this.videoElement.srcObject=this._previewStream:this.videoElement.src=URL.createObjectURL(this._previewStream),this.videoElement.muted=!0,this.videoElement.setAttribute("playsinline",""),this.videoElement.play(),this.canvasElement=document.createElement("canvas"),this.canvas2dContext=this.canvasElement.getContext("2d")}return Object.defineProperty(o.prototype,"videoStreamTrack",{get:function(){return this._videoStreamTrack},enumerable:!1,configurable:!0}),o.prototype.getPhotoCapabilities=function(){return new Promise(function(e,i){var r={current:0,min:0,max:0};e({exposureCompensation:r,exposureMode:"none",fillLightMode:["none"],focusMode:"none",imageHeight:r,imageWidth:r,iso:r,redEyeReduction:!1,whiteBalanceMode:"none",zoom:r}),i(new DOMException("OperationError"))})},o.prototype.setOptions=function(t){return new Promise(function(i,r){})},o.prototype.takePhoto=function(){var t=this;return new Promise(function(i,r){if(t._videoStreamTrack.readyState!=="live")return r(new DOMException("InvalidStateError"));t.videoElementPlaying.then(function(){try{t.canvasElement.width=t.videoElement.videoWidth,t.canvasElement.height=t.videoElement.videoHeight,t.canvas2dContext.drawImage(t.videoElement,0,0),t.canvasElement.toBlob(i)}catch(n){r(new DOMException("UnknownError"))}})})},o.prototype.grabFrame=function(){var t=this;return new Promise(function(i,r){if(t._videoStreamTrack.readyState!=="live")return r(new DOMException("InvalidStateError"));t.videoElementPlaying.then(function(){try{t.canvasElement.width=t.videoElement.videoWidth,t.canvasElement.height=t.videoElement.videoHeight,t.canvas2dContext.drawImage(t.videoElement,0,0),i(window.createImageBitmap(t.canvasElement))}catch(n){r(new DOMException("UnknownError"))}})})},o}());window.ImageCapture=g;var x=`:host{--header-height:4em;--footer-height:9em;--header-height-landscape:3em;--footer-height-landscape:6em;--shutter-size:6em;--icon-size-header:1.5em;--icon-size-footer:2.5em;--margin-size-header:1.5em;--margin-size-footer:2.0em;font-family:-apple-system, BlinkMacSystemFont,
    “Segoe UI”, “Roboto”, “Droid Sans”, “Helvetica Neue”, sans-serif;display:block;width:100%;height:100%}.items{-webkit-box-sizing:border-box;box-sizing:border-box;display:-ms-flexbox;display:flex;width:100%;height:100%;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center}.items .item{-ms-flex:1;flex:1;text-align:center}.items .item:first-child{text-align:left}.items .item:last-child{text-align:right}.camera-wrapper{position:relative;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;width:100%;height:100%}.camera-header{color:white;background-color:black;height:var(--header-height)}.camera-header .items{padding:var(--margin-size-header)}.camera-footer{position:relative;color:white;background-color:black;height:var(--footer-height)}.camera-footer .items{padding:var(--margin-size-footer)}@media (max-height: 375px){.camera-header{--header-height:var(--header-height-landscape)}.camera-footer{--footer-height:var(--footer-height-landscape)}.camera-footer .shutter{--shutter-size:4em}}.camera-video{position:relative;-ms-flex:1;flex:1;overflow:hidden;background-color:black}video{width:100%;height:100%;max-height:100%;min-height:100%;-o-object-fit:cover;object-fit:cover;background-color:black}.pick-image{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:absolute;left:var(--margin-size-footer);top:0;height:100%;width:var(--icon-size-footer);color:white}.pick-image input{visibility:hidden}.pick-image svg{cursor:pointer;fill:white;width:var(--icon-size-footer);height:var(--icon-size-footer)}.shutter{position:absolute;left:50%;top:50%;width:var(--shutter-size);height:var(--shutter-size);margin-top:calc(var(--shutter-size) / -2);margin-left:calc(var(--shutter-size) / -2);border-radius:100%;background-color:#c6cdd8;padding:12px;-webkit-box-sizing:border-box;box-sizing:border-box}.shutter:active .shutter-button{background-color:#9da9bb}.shutter-button{background-color:white;border-radius:100%;width:100%;height:100%}.rotate{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;position:absolute;right:var(--margin-size-footer);top:0;height:100%;width:var(--icon-size-footer);color:white}.rotate img{width:var(--icon-size-footer);height:var(--icon-size-footer)}.shutter-overlay{z-index:5;position:absolute;width:100%;height:100%;background-color:black}.error{width:100%;height:100%;color:white;display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;-ms-flex-align:center;align-items:center}.no-device{background-color:black;-ms-flex:1;flex:1;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;color:white}.no-device label{cursor:pointer;background:#fff;border-radius:6px;padding:6px 8px;color:black}.no-device input{visibility:hidden;height:0;margin-top:16px}.accept{background-color:black;-ms-flex:1;flex:1;overflow:hidden}.accept .accept-image{width:100%;height:100%;max-height:100%;background-position:center center;background-size:cover;background-repeat:no-repeat}.close img{cursor:pointer;width:var(--icon-size-header);height:var(--icon-size-header)}.flash img{width:var(--icon-size-header);height:var(--icon-size-header)}.accept-use img{width:var(--icon-size-footer);height:var(--icon-size-footer)}.accept-cancel img{width:var(--icon-size-footer);height:var(--icon-size-footer)}.offscreen-image-render{top:0;left:0;visibility:hidden;pointer-events:none;width:100%;height:100%}`,b=function(){function o(t){var e=this;w(this,t),this.hasMultipleCameras=!1,this.hasFlash=!1,this.flashModes=[],this.flashMode="off",this.handlePickFile=function(i){},this.handleShutterClick=function(i){console.debug("shutter click"),e.capture()},this.handleRotateClick=function(i){e.rotate()},this.handleClose=function(i){e.handlePhoto&&e.handlePhoto(null)},this.handleFlashClick=function(i){e.cycleFlash()},this.handleCancelPhoto=function(i){var r=e.stream&&e.stream.getTracks()[0],n=r&&r.getConstraints();e.photo=null,e.photoSrc=null,n?e.initCamera({video:{facingMode:n.facingMode}}):e.initCamera()},this.handleAcceptPhoto=function(i){e.handlePhoto&&e.handlePhoto(e.photo)},this.handleFileInputChange=function(i){return d(e,void 0,void 0,function(){var r,n,l;return u(this,function(c){switch(c.label){case 0:r=i.target,n=r.files[0],c.label=1;case 1:return c.trys.push([1,3,,4]),[4,this.getOrientation(n)];case 2:return l=c.sent(),console.debug("Got orientation",l),this.photoOrientation=l,[3,4];case 3:return c.sent(),[3,4];case 4:return this.handlePhoto&&this.handlePhoto(n),[2]}})})},this.handleVideoMetadata=function(i){console.debug("Video metadata",i)},this.facingMode="user",this.handlePhoto=void 0,this.handleNoDeviceError=void 0,this.noDevicesText="No camera found",this.noDevicesButtonText="Choose image",this.photo=void 0,this.photoSrc=void 0,this.showShutterOverlay=!1,this.flashIndex=0,this.hasCamera=null,this.rotation=0,this.deviceError=null}return o.prototype.componentDidLoad=function(){return d(this,void 0,void 0,function(){return u(this,function(t){switch(t.label){case 0:return this.defaultConstraints={video:{facingMode:this.facingMode}},[4,this.queryDevices()];case 1:return t.sent(),[4,this.initCamera()];case 2:return t.sent(),[2]}})})},o.prototype.disconnectedCallback=function(){this.stopStream(),this.photoSrc&&URL.revokeObjectURL(this.photoSrc)},o.prototype.hasImageCapture=function(){return"ImageCapture"in window},o.prototype.queryDevices=function(){return d(this,void 0,void 0,function(){var t,e,i;return u(this,function(r){switch(r.label){case 0:return r.trys.push([0,2,,3]),[4,navigator.mediaDevices.enumerateDevices()];case 1:return t=r.sent(),e=t.filter(function(n){return n.kind=="videoinput"}),this.hasCamera=!!e.length,this.hasMultipleCameras=e.length>1,[3,3];case 2:return i=r.sent(),this.deviceError=i,[3,3];case 3:return[2]}})})},o.prototype.initCamera=function(t){return d(this,void 0,void 0,function(){var e,i;return u(this,function(r){switch(r.label){case 0:t||(t=this.defaultConstraints),r.label=1;case 1:return r.trys.push([1,3,,4]),[4,navigator.mediaDevices.getUserMedia(Object.assign({video:!0,audio:!1},t))];case 2:return e=r.sent(),this.initStream(e),[3,4];case 3:return i=r.sent(),this.deviceError=i,this.handleNoDeviceError&&this.handleNoDeviceError(i),[3,4];case 4:return[2]}})})},o.prototype.initStream=function(t){return d(this,void 0,void 0,function(){return u(this,function(e){switch(e.label){case 0:return this.stream=t,this.videoElement.srcObject=t,this.hasImageCapture()?(this.imageCapture=new window.ImageCapture(t.getVideoTracks()[0]),[4,this.initPhotoCapabilities(this.imageCapture)]):[3,2];case 1:return e.sent(),[3,3];case 2:this.deviceError="No image capture",this.handleNoDeviceError&&this.handleNoDeviceError(),e.label=3;case 3:return m(this.el),[2]}})})},o.prototype.initPhotoCapabilities=function(t){return d(this,void 0,void 0,function(){var e;return u(this,function(i){switch(i.label){case 0:return[4,t.getPhotoCapabilities()];case 1:return e=i.sent(),e.fillLightMode&&e.fillLightMode.length>1&&(this.flashModes=e.fillLightMode.map(function(r){return r}),this.flashMode?(this.flashMode=this.flashModes[this.flashModes.indexOf(this.flashMode)]||"off",this.flashIndex=this.flashModes.indexOf(this.flashMode)||0):this.flashIndex=0),[2]}})})},o.prototype.stopStream=function(){this.videoElement&&(this.videoElement.srcObject=null),this.stream&&this.stream.getTracks().forEach(function(t){return t.stop()})},o.prototype.capture=function(){return d(this,void 0,void 0,function(){var t,e;return u(this,function(i){switch(i.label){case 0:if(!this.hasImageCapture())return[3,5];i.label=1;case 1:return i.trys.push([1,4,,5]),[4,this.imageCapture.takePhoto({fillLightMode:this.flashModes.length>1?this.flashMode:void 0})];case 2:return t=i.sent(),[4,this.flashScreen()];case 3:return i.sent(),this.promptAccept(t),[3,5];case 4:return e=i.sent(),console.error("Unable to take photo!",e),[3,5];case 5:return this.stopStream(),[2]}})})},o.prototype.promptAccept=function(t){return d(this,void 0,void 0,function(){var e;return u(this,function(i){switch(i.label){case 0:return this.photo=t,[4,this.getOrientation(t)];case 1:if(e=i.sent(),console.debug("Got orientation",e),this.photoOrientation=e,e)switch(e){case 1:case 2:this.rotation=0;break;case 3:case 4:this.rotation=180;break;case 5:case 6:this.rotation=90;break;case 7:case 8:this.rotation=270;break}return this.photoSrc=URL.createObjectURL(t),[2]}})})},o.prototype.getOrientation=function(t){return new Promise(function(e){var i=new FileReader;i.onload=function(r){var n=new DataView(r.target.result);if(n.getUint16(0,!1)!==65496)return e(-2);for(var l=n.byteLength,c=2;c<l;){var p=n.getUint16(c,!1);if(c+=2,p===65505){if(n.getUint32(c+=2,!1)!==1165519206)return e(-1);var a=n.getUint16(c+=6,!1)===18761;c+=n.getUint32(c+4,a);var h=n.getUint16(c,a);c+=2;for(var f=0;f<h;f++)if(n.getUint16(c+f*12,a)===274)return e(n.getUint16(c+f*12+8,a))}else{if((p&65280)!==65280)break;c+=n.getUint16(c,!1)}}return e(-1)},i.readAsArrayBuffer(t.slice(0,64*1024))})},o.prototype.rotate=function(){this.stopStream();var t=this.stream&&this.stream.getTracks()[0];if(t){var e=t.getConstraints(),i=e.facingMode;if(!i){var r=t.getCapabilities();r.facingMode&&(i=r.facingMode[0])}i==="environment"?this.initCamera({video:{facingMode:"user"}}):this.initCamera({video:{facingMode:"environment"}})}},o.prototype.setFlashMode=function(t){console.debug("New flash mode: ",t),this.flashMode=t},o.prototype.cycleFlash=function(){this.flashModes.length>0&&(this.flashIndex=(this.flashIndex+1)%this.flashModes.length,this.setFlashMode(this.flashModes[this.flashIndex]))},o.prototype.flashScreen=function(){return d(this,void 0,void 0,function(){var t=this;return u(this,function(e){return[2,new Promise(function(i,r){t.showShutterOverlay=!0,setTimeout(function(){t.showShutterOverlay=!1,i()},100)})]})})},o.prototype.iconExit=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Cg id='Icon_5_'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M402.2,134L378,109.8c-1.6-1.6-4.1-1.6-5.7,0L258.8,223.4c-1.6,1.6-4.1,1.6-5.7,0L139.6,109.8 c-1.6-1.6-4.1-1.6-5.7,0L109.8,134c-1.6,1.6-1.6,4.1,0,5.7l113.5,113.5c1.6,1.6,1.6,4.1,0,5.7L109.8,372.4c-1.6,1.6-1.6,4.1,0,5.7 l24.1,24.1c1.6,1.6,4.1,1.6,5.7,0l113.5-113.5c1.6-1.6,4.1-1.6,5.7,0l113.5,113.5c1.6,1.6,4.1,1.6,5.7,0l24.1-24.1 c1.6-1.6,1.6-4.1,0-5.7L288.6,258.8c-1.6-1.6-1.6-4.1,0-5.7l113.5-113.5C403.7,138.1,403.7,135.5,402.2,134z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"},o.prototype.iconPhotos=function(){return s("svg",{xmlns:"http://www.w3.org/2000/svg",width:"512",height:"512",viewBox:"0 0 512 512"},s("path",{d:"M450.29,112H142c-34,0-62,27.51-62,61.33V418.67C80,452.49,108,480,142,480H450c34,0,62-26.18,62-60V173.33C512,139.51,484.32,112,450.29,112Zm-77.15,61.34a46,46,0,1,1-46.28,46A46.19,46.19,0,0,1,373.14,173.33Zm-231.55,276c-17,0-29.86-13.75-29.86-30.66V353.85l90.46-80.79a46.54,46.54,0,0,1,63.44,1.83L328.27,337l-113,112.33ZM480,418.67a30.67,30.67,0,0,1-30.71,30.66H259L376.08,333a46.24,46.24,0,0,1,59.44-.16L480,370.59Z"}),s("path",{d:"M384,32H64A64,64,0,0,0,0,96V352a64.11,64.11,0,0,0,48,62V152a72,72,0,0,1,72-72H446A64.11,64.11,0,0,0,384,32Z"}))},o.prototype.iconConfirm=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Ccircle fill='%232CD865' cx='256' cy='256' r='256'/%3E%3Cg id='Icon_1_'%3E%3Cg%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M208,301.4l-55.4-55.5c-1.5-1.5-4-1.6-5.6-0.1l-23.4,22.3c-1.6,1.6-1.7,4.1-0.1,5.7l81.6,81.4 c3.1,3.1,8.2,3.1,11.3,0l171.8-171.7c1.6-1.6,1.6-4.2-0.1-5.7l-23.4-22.3c-1.6-1.5-4.1-1.5-5.6,0.1L213.7,301.4 C212.1,303,209.6,303,208,301.4z'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E"},o.prototype.iconReverseCamera=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M352,0H160C72,0,0,72,0,160v192c0,88,72,160,160,160h192c88,0,160-72,160-160V160C512,72,440,0,352,0z M356.7,365.8l-3.7,3.3c-27,23.2-61.4,35.9-96.8,35.9c-72.4,0-135.8-54.7-147-125.6c-0.3-1.9-2-3.3-3.9-3.3H64 c-3.3,0-5.2-3.8-3.2-6.4l61.1-81.4c1.6-2.1,4.7-2.1,6.4-0.1l63.3,81.4c2,2.6,0.2,6.5-3.2,6.5h-40.6c-2.5,0-4.5,2.4-3.9,4.8 c11.5,51.5,59.2,90.6,112.4,90.6c26.4,0,51.8-9.7,73.7-27.9l3.1-2.5c1.6-1.3,3.9-1.1,5.3,0.3l18.5,18.6 C358.5,361.6,358.4,364.3,356.7,365.8z M451.4,245.6l-61,83.5c-1.6,2.2-4.8,2.2-6.4,0.1l-63.3-83.3c-2-2.6-0.1-6.4,3.2-6.4h40.8 c2.5,0,4.4-2.3,3.9-4.8c-5.1-24.2-17.8-46.5-36.5-63.7c-21.2-19.4-48.2-30.1-76-30.1c-26.5,0-52.6,9.7-73.7,27.3l-3.1,2.5 c-1.6,1.3-3.9,1.2-5.4-0.3l-18.5-18.5c-1.6-1.6-1.5-4.3,0.2-5.9l3.5-3.1c27-23.2,61.4-35.9,96.8-35.9c38,0,73.9,13.7,101.2,38.7 c23.2,21.1,40.3,55.2,45.7,90.1c0.3,1.9,1.9,3.4,3.9,3.4h41.3C451.4,239.2,453.3,243,451.4,245.6z'/%3E%3C/g%3E%3C/svg%3E"},o.prototype.iconRetake=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' enable-background='new 0 0 512 512' xml:space='preserve'%3E%3Ccircle fill='%23727A87' cx='256' cy='256' r='256'/%3E%3Cg id='Icon_5_'%3E%3Cg%3E%3Cpath fill='%23FFFFFF' d='M394.2,142L370,117.8c-1.6-1.6-4.1-1.6-5.7,0L258.8,223.4c-1.6,1.6-4.1,1.6-5.7,0L147.6,117.8 c-1.6-1.6-4.1-1.6-5.7,0L117.8,142c-1.6,1.6-1.6,4.1,0,5.7l105.5,105.5c1.6,1.6,1.6,4.1,0,5.7L117.8,364.4c-1.6,1.6-1.6,4.1,0,5.7 l24.1,24.1c1.6,1.6,4.1,1.6,5.7,0l105.5-105.5c1.6-1.6,4.1-1.6,5.7,0l105.5,105.5c1.6,1.6,4.1,1.6,5.7,0l24.1-24.1 c1.6-1.6,1.6-4.1,0-5.7L288.6,258.8c-1.6-1.6-1.6-4.1,0-5.7l105.5-105.5C395.7,146.1,395.7,143.5,394.2,142z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E"},o.prototype.iconFlashOff=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cg%3E%3Cpath class='st0' d='M498,483.7L42.3,28L14,56.4l149.8,149.8L91,293.8c-2.5,3-0.1,7.2,3.9,7.2h143.9c1.6,0,2.7,1.3,2.4,2.7 L197.6,507c-1,4.4,5.8,6.9,8.9,3.2l118.6-142.8L469.6,512L498,483.7z'/%3E%3Cpath class='st0' d='M449,218.2c2.5-3,0.1-7.2-3.9-7.2H301.2c-1.6,0-2.7-1.3-2.4-2.7L342.4,5c1-4.4-5.8-6.9-8.9-3.2L214.9,144.6 l161.3,161.3L449,218.2z'/%3E%3C/g%3E%3C/svg%3E"},o.prototype.iconFlashOn=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cpath class='st0' d='M287.2,211c-1.6,0-2.7-1.3-2.4-2.7L328.4,5c1-4.4-5.8-6.9-8.9-3.2L77,293.8c-2.5,3-0.1,7.2,3.9,7.2h143.9 c1.6,0,2.7,1.3,2.4,2.7L183.6,507c-1,4.4,5.8,6.9,8.9,3.2l242.5-292c2.5-3,0.1-7.2-3.9-7.2L287.2,211L287.2,211z'/%3E%3C/svg%3E"},o.prototype.iconFlashAuto=function(){return"data:image/svg+xml,%3Csvg version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 512 512' style='enable-background:new 0 0 512 512;' xml:space='preserve'%3E%3Cstyle type='text/css'%3E .st0%7Bfill:%23FFFFFF;%7D%0A%3C/style%3E%3Cpath class='st0' d='M287.2,211c-1.6,0-2.7-1.3-2.4-2.7L328.4,5c1-4.4-5.8-6.9-8.9-3.2L77,293.8c-2.5,3-0.1,7.2,3.9,7.2h143.9 c1.6,0,2.7,1.3,2.4,2.7L183.6,507c-1,4.4,5.8,6.9,8.9,3.2l242.5-292c2.5-3,0.1-7.2-3.9-7.2L287.2,211L287.2,211z'/%3E%3Cg%3E%3Cpath class='st0' d='M321.3,186l74-186H438l74,186h-43.5l-11.9-32.5h-80.9l-12,32.5H321.3z M415.8,47.9l-27.2,70.7h54.9l-27.2-70.7 H415.8z'/%3E%3C/g%3E%3C/svg%3E"},o.prototype.render=function(){var t=this,e={};return s("div",{class:"camera-wrapper"},s("div",{class:"camera-header"},s("section",{class:"items"},s("div",{class:"item close",onClick:function(i){return t.handleClose(i)}},s("img",{src:this.iconExit()})),s("div",{class:"item flash",onClick:function(i){return t.handleFlashClick(i)}},this.flashModes.length>0&&s("div",null,this.flashMode=="off"?s("img",{src:this.iconFlashOff()}):"",this.flashMode=="auto"?s("img",{src:this.iconFlashAuto()}):"",this.flashMode=="flash"?s("img",{src:this.iconFlashOn()}):"")))),(this.hasCamera===!1||!!this.deviceError)&&s("div",{class:"no-device"},s("h2",null,this.noDevicesText),s("label",{htmlFor:"_pwa-elements-camera-input"},this.noDevicesButtonText),s("input",{type:"file",id:"_pwa-elements-camera-input",onChange:this.handleFileInputChange,accept:"image/*",class:"select-file-button"})),this.photoSrc?s("div",{class:"accept"},s("div",{class:"accept-image",style:Object.assign({backgroundImage:"url(".concat(this.photoSrc,")")},e)})):s("div",{class:"camera-video"},this.showShutterOverlay&&s("div",{class:"shutter-overlay"}),this.hasImageCapture()?s("video",{ref:function(i){return t.videoElement=i},onLoadedMetaData:this.handleVideoMetadata,autoplay:!0,playsinline:!0}):s("canvas",{ref:function(i){return t.canvasElement=i},width:"100%",height:"100%"}),s("canvas",{class:"offscreen-image-render",ref:function(i){return t.offscreenCanvas=i},width:"100%",height:"100%"})),this.hasCamera&&s("div",{class:"camera-footer"},this.photo?s("section",{class:"items"},s("div",{class:"item accept-cancel",onClick:function(i){return t.handleCancelPhoto(i)}},s("img",{src:this.iconRetake()})),s("div",{class:"item accept-use",onClick:function(i){return t.handleAcceptPhoto(i)}},s("img",{src:this.iconConfirm()}))):[s("div",{class:"pick-image",onClick:this.handlePickFile},s("label",{htmlFor:"_pwa-elements-file-pick"},this.iconPhotos()),s("input",{type:"file",id:"_pwa-elements-file-pick",onChange:this.handleFileInputChange,accept:"image/*",class:"pick-image-button"})),s("div",{class:"shutter",onClick:this.handleShutterClick},s("div",{class:"shutter-button"})),s("div",{class:"rotate",onClick:this.handleRotateClick},s("img",{src:this.iconReverseCamera()}))]))},Object.defineProperty(o,"assetsDirs",{get:function(){return["icons"]},enumerable:!1,configurable:!0}),Object.defineProperty(o.prototype,"el",{get:function(){return v(this)},enumerable:!1,configurable:!0}),o}();b.style=x;export{b as pwa_camera};
