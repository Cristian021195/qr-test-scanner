import { CameraDevice, Html5Qrcode } from "html5-qrcode";
import { useEffect, useState } from "react";
import { Corners } from "./Corners";
import { isJson } from "../helper/isJson";

interface IScanner {
    fn: (v:string|unknown)=>void
}

export const Scanner = ({fn}:IScanner) => {
    //let html5QrCode = null; let cameraId = null;
    const [cameraId, setCameraId] = useState<string | null>(null);
    const [html5QrCode, setHtml5QrCode] = useState<Html5Qrcode | null>(null);
    const [result, setResult] = useState<string>("");
    const [reader, setReader] = useState<number>(0);

    useEffect(()=>{

        Html5Qrcode.getCameras().then(devices => {// This method will trigger user permissions
            console.log("camaras: ", devices)
            if (devices && devices.length) {
                setCameraId(devices[0].id);
                setHtml5QrCode(new Html5Qrcode("reader"));          
            }else{
              console.log('permiso ok, pero no encontró camara')
            }
          }).catch(err => {
            console.log("err: ",err)
          });

    },[])

    function start(){
        if(html5QrCode !== null && cameraId !== null){
            html5QrCode.start(
                cameraId,
                {
                fps: 5,    // Optional, frame per seconds for qr code scanning
                qrbox: { width: 250, height: 250 },  // Optional, if you want bounded box UI
                },
                (decodedText, decodedResult) => {
                console.log({decodedText,decodedResult})
                html5QrCode.stop().then((ignore) => {
                    setReader(0);
                    if(isJson(decodedText)){                        
                        setResult(decodedText);
                    }else{
                        setResult("No es formato valido");
                    }
                    
                }).catch((err) => {
                    setResult(err.toString())
                    console.log("stop err: ",err)
                });
                },
                (errorMessage) => {
                    console.log({errorMessage})
                    setResult(errorMessage)
                })
            .catch((err) => {
                setResult(err.toString())
                console.log({err})
            });
        }
    }

    function stop(){
        if(html5QrCode !== null && cameraId !== null){
            html5QrCode.stop().then((ignore) => {
                setReader(0);
                
            }).catch((err) => {
                setResult(err.toString())
                console.log("stop err: ",err)
            });
            console.log(reader)
        }
    }

    function pause(){
        if(html5QrCode !== null && cameraId !== null){
            html5QrCode.pause();
        }
    }

    function resume(){
        if(html5QrCode !== null && cameraId !== null){
            html5QrCode.resume();
        }
    }


    return (//<div style={{position:'absolute', top:'100', backgroundColor:'blue'}}><Corners width={170} height={170}/></div>
        <div>
            <div style={{position:'relative'}}>
                <div id="reader" style={{width:200, height:200}}>
                </div>
                <div style={{position:'absolute', top:15, left:15}}>{reader === 0 && <Corners width={160} height={160}/>}</div>
            </div>
            
            <div>
                <button id="start-qr" onClick={start}>start</button>
                <button id="stop-qr" onClick={stop}>stop</button>
                <button id="scan-qr" onClick={resume}>scan / resume</button>
                <button id="pause-qr" onClick={pause}>pause</button>
            </div>
            <fieldset>
                <legend>Resultado / Mensajes</legend>
                <div>{result}</div>
            </fieldset>            
        </div>
        
    )
}
