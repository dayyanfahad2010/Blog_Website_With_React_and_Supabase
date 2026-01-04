import React, { useEffect, useRef, useState } from 'react'

const ErrorMeassage = ({errorMessage}) => {
    const timeoutIdRef=useRef()
    const [err,setError]=useState(errorMessage)
     useEffect(() => {
        if (errorMessage) {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }

            timeoutIdRef.current = setTimeout((errorMessage) => {
                errorMessage=null;
            }, 5000);
        }

        return () => {
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, [errorMessage]);
  return (
    <div>
        {errorMessage && (
            <div style={{ color: 'red', padding: '10px', border: '1px solid red', marginBottom: '10px',marginTop:'50px' ,fontWeight:'600' ,fontSize:'13px'}}>
            {errorMessage}
            </div>
        )}
    </div>
  )
}

export default ErrorMeassage