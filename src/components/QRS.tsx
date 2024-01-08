import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";

export const QRS = () => {
    const [result, setResult] = useState<unknown>(null);
    useEffect(()=>{

        const scanner = new Html5QrcodeScanner('reader', {
            qrbox:{
                width:400,
                height:400
            },
            fps:5,
        }, true)
    
        scanner.render(success, error);
    
        function success(res:string){
            scanner.clear();
            setResult(res)
        }
        function error(err:string){
            console.error(err)
        }
        
    },[])

    return (
        <div>
            {
                result ? <p>{result+""}</p> : <div id="reader">Scanner</div>
            }
        </div>
        
    )
}
