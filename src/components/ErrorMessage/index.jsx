import React, { useEffect} from 'react'
import { Bounce, toast } from 'react-toastify';

const ErrorMeassage = ({errorMessage}) => {
     useEffect(() => {
         toast.error(errorMessage,{
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce
           })
    }, [errorMessage]);
  return (
    <></>
  )
}

export default ErrorMeassage