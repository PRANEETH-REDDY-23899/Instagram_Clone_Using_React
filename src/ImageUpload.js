import React,{useState} from 'react'
import { Button } from '@material-ui/core'
import {storage,db} from "./firebase";
import firebase from "firebase";
import "./ImageUpload.css";

function ImageUpload({username}) {
    const [caption, setCaption]=useState('');
    const [progress,setProgress]=useState(0)
    const [image,setImage]=useState(null);

    const handleChange=(e)=>{
        if(e.target.files[0]){
            setImage(e.target.files[0]);
        }
    };
    const handleUpload=()=>{
const uploadTask = storage.ref(`images/${image.name}`).put(image);
uploadTask.on(
    "state_changed",
    (snapshot)=>{
        const progress =Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100)
     setProgress(progress);
    },
    (error)=>{
console.log(error);
alert(error.message)

    },
    ()=>{
        storage
        .ref("images")
        .child(image.name)
        .getDownloadURL()
        .then(url =>{
           db.collection("posts").add({
               timestamp: firebase.firestore.FieldValue.serverTimestamp(),
               caption:caption,
               imageUrl:url,
               username:username
           }) ;
           setProgress(0);
           setCaption("");
           setImage(null);

        })
    }

)
    }
    
    return (
        <div className="imageupload">
            <strong>PLEASE CHOOSE YOUR FILE HERE TO UPLOAD</strong>
            {/* image upload */}
            <input type="file" onChange={handleChange}/>
            <progress  className="imageupload__progress" value={progress} max="100" />          
            <input className="set_caption" type="text" placeholder="enter a caption ....." onChange={event=>setCaption(event.target.value )}value ={caption}/>
            <Button className="bottoncolor"  onClick={handleUpload} >Upload
            </Button>     
              </div>
    )
}

export default ImageUpload
