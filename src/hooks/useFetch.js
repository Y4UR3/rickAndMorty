import axios from "axios"
import {useState} from "react"

const useFetch = (url) => {
     
    let suma=15+13
    console.log(suma);
    
    const [response, setResponse] = useState()
    const [hasError, setHasError] = useState(false)
    const getApi = () => {
        axios.get(url)
        .then( res => {
            setResponse(res.data)
            setHasError(false)
        })
        .catch(err => {
            console.log(err)
            setHasError(true)
        })
    }
    
    return [ response, getApi, hasError ]
}

export default useFetch