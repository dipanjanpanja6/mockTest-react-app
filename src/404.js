import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
// import j from './404/script'
// import './404/script'
import './style.css'

const Fo=()=> {
    var  [data,setD] =React.useState("")
    useEffect(() => {
        const script = document.createElement("script");

        script.src = 'https://firebasestorage.googleapis.com/v0/b/abcd-games-22869977.appspot.com/o/Website%20Host%2Fscript.js?alt=media&token=2af0564e-31b1-40ac-907a-ecae3c736db9';
        script.async = true;
    
        document.body.appendChild(script);    
    }, [])
    

    
    return (
        <body className="body">

            <p>ERROR <span>404</span></p>
            <code>
            <span>this_page</span>.<em>not_found</em> = true;
                </code>
            <code id="code">
                <span>if</span> (<b>you_spelt_it_wrong</b>{") {"}<span>try_again()</span>
                {";}"}
                </code>
            <code id="code">
                <span>else if (<b>we_screwed_up</b>)</span>
               {" {"}<em>alert</em>
                {"("}
                <i>We're really sorry about that.</i>);
                  <span>window</span>
                  .<em>location</em>{' = home;}'}</code>
            <center><a href="/">HOME</a></center>

           

        </body>
    )
}
export default  Fo;