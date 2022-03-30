import React,{ useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { app, useAuth } from "../firebase";
import { useSelector } from "react-redux";
import { storage } from "../firebase";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";
import docIcon from "../media/document.png";
import picIcon from "../media/picture.png";
import linkIcon from "../media/link.png";

export default function Post() {
  
  const imageButton = `Images & Video`;
  const [images, setImages] = useState([])
  const [loading,setLoading] = useState(true) 
  
  const currentUser = useAuth();
  let image;

  const db = getFirestore(app);

  const state = useSelector((state) => state);

  async function pushToFirebase() {
    const title = document.querySelector(".Post-Content-Title");
    const text = document.querySelector(".Post-Content-Text");
    const picture = images;
    const url = document.querySelector(".Post-Content-Url");
    const embed = document.querySelector(".Post-Content-Embed");
    const userNameField = document.querySelector(".Nav-Menu-Logged-In-Name");
    const userName = userNameField.textContent.split("").slice(2).join("");
    const likes = "0";
    let id = uuidv4();
    let timestamp = Date.now();
    let date = getDate();
    if (title.value.length < 1) {
      return alert("Title required.");
    } else {
      try {
        const payload = {
          title: title.value,
          text: text.value,
          picture: picture,
          url: url.value,
          embed: embed.value,
          likes: likes,
          user: userName,
          date: date,
          id: id,
          timestamp: timestamp,
        };
        await setDoc(doc(db, "Posts", id), payload)
          .then(createComments(id))
          .then(createLikes(id))
          .then(returnHome());
      } catch (error) {
        console.log("Error adding to Post database");
      }
    }
  }

  async function createLikes(id) {
    const likes = [];
    const dislikes = [];
    const payload = {
      likes: likes,
      dislikes: dislikes,
      id: id,
    };
    await setDoc(doc(db, "PFeelings", id), payload);
  }

  async function createComments(id) {
    const payload = {
      id: id,
    };
    await setDoc(doc(db, "Comments", id), payload);
  }

  function returnHome() {
    let postAlert = document.querySelector(".Post-Submitted");
    let postContentHeader = document.querySelector(".Post-Header");
    let postContentSection = document.querySelector(".Post-Content-Section");

    postAlert.classList.remove("Hidden");
    postContentHeader.classList.add("Hidden");
    postContentSection.classList.add("Hidden");
  }

  //image upload

  const uploadHandler = (e) => {
    e.preventDefault();
    console.log(e);
    const file = e.target.files[0];
    image = file.name;
    uploadImages(file);
  };

  const uploadImages = (file) => {
    if (!file) return;
    const storageRef = ref(storage, `/files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
      },
      (err) => console.log(err),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          image = url.toString();
          setImages(image);
        });
      }
    );
  };

  function removeUpload() {
    const imageDiv = document.querySelector(".Upload-Image-Display");
    imageDiv.src = null;
    return setImages([]);
  }

  //ui button changer

  function getButtonName(e) {
    let name;
    if (e.target.textContent.length < 1) {
      name = e.target.nextSibling.textContent;
    } else if (e.target.textContent.length > 1) {
      name = e.target.textContent;
    }
    return name;
  }

  function getDate() {
    let currentDate = new Date();
    let cDay = currentDate.getDate();
    let cMonth = currentDate.getMonth() + 1;
    let cYear = currentDate.getFullYear();
    let dateNow = `${cMonth}/${cDay}/${cYear}`;
    return dateNow;
  }

  //function checkLoggedIn(){
  //setTimeout(()=>{
  //
  //},500)
  //}

  function changeSelected(e) {
    let name = getButtonName(e);
    const postContentButtons = document.querySelectorAll(
      ".Post-Content-Button"
    );
    const postContentIcons = document.querySelectorAll(".Post-Content-Icon");
    for (let i = 0; i < postContentButtons.length; i++) {
      if (postContentButtons[i].textContent !== name) {
        console.log(postContentButtons[i].textContent);
        postContentButtons[i].classList.remove("Post-Content-Button-Clicked");
        postContentIcons[i].classList.remove("Post-Content-Icon-Clicked");
      } else {
        console.log(postContentButtons[i].textContent);
        postContentButtons[i].classList.add("Post-Content-Button-Clicked");
        postContentIcons[i].classList.add("Post-Content-Icon-Clicked");
      }
      changeBody(name);
    }
  }
  function changeBody(name) {
    const postBody = document.querySelector(".Post-Content-Text");
    const imageBody = document.querySelector(".Post-Content-Media");
    const urlBody = document.querySelector(".Post-Content-Url");
    const embedBody = document.querySelector(".Post-Content-Embed");
    if (name == "Post") {
      postBody.classList.remove("Hidden");
      imageBody.classList.add("Hidden");
      urlBody.classList.add("Hidden");
      embedBody.classList.add("Hidden");
    } else if (name == "Link") {
      urlBody.classList.remove("Hidden");
      embedBody.classList.remove("Hidden");
      postBody.classList.add("Hidden");
      imageBody.classList.add("Hidden");
    } else {
      imageBody.classList.remove("Hidden");
      postBody.classList.add("Hidden");
      urlBody.classList.add("Hidden");
      embedBody.classList.add("Hidden");
    }
  }

  useEffect(() => {
    const loadScreen = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(loadScreen);
  }, [loading]);

  useEffect(() => {
    const button = document.querySelector(".Button-Link");
    if (state.select.length > 0) {
      return button.click();
    } else {
      return state;
    }
  }, [state]);

  useEffect(() => {
    return currentUser;
  }, [currentUser]);

  return (
    <>
      <Link to="/">
        <button className="Button-Link Hidden"></button>
      </Link>
      <div>
        {currentUser == null && loading == true && (
          <div className="Stop">
            <h1 className="Stop-Loading"></h1>
          </div>
        )}
        {currentUser == null && loading == false && (
          <div className="Stop">
            <h1>hey, you need to log in to post content!</h1>
            <Link to="/" className="Stop-Link">
              <h2>Go home</h2>
            </Link>
          </div>
        )}
        {currentUser !== null && loading == true && (
          <div className="Stop">
            <h1></h1>
          </div>
        )}

        {currentUser !== null && loading == false && (
          <div className="Post-Main-Div">
            <div className="Post-Submitted Hidden">
              <h2>Post Submitted Successfully!</h2>
              <Link to="/">
                <button className="Success-Button">Home</button>
              </Link>
            </div>

            <div className="Post-Header">
              <h3>Create a post</h3>
            </div>

            <div className="Post-Content-Section">
              <div className="Post-Content-Button-Nav">
                <button
                  className="Post-Content-Button Post-Content-Button-Clicked"
                  onClick={changeSelected}
                >
                  <img
                    src={docIcon}
                    className="Post-Content-Icon Post-Content-Icon-Clicked"
                  ></img>
                  <span>Post</span>
                </button>
                <button
                  className="Post-Content-Button"
                  onClick={changeSelected}
                >
                  <img src={picIcon} className="Post-Content-Icon"></img>
                  <span>{imageButton}</span>
                </button>
                <button
                  className="Post-Content-Button"
                  onClick={changeSelected}
                >
                  <img src={linkIcon} className="Post-Content-Icon"></img>
                  <span>Link</span>
                </button>
              </div>

              <div className="Post-Content-Body">
                <div className="Post-Content-Title-Parent">
                  <textarea
                    className="Post-Content-Title"
                    maxLength={300}
                    placeholder="Title"
                  ></textarea>
                </div>

                <div className="Post-Content-Text-Parent">
                  <textarea
                    className="Post-Content-Text"
                    placeholder="Text(Optional)"
                  ></textarea>
                  <div className="Post-Content-Media Hidden">
                    <div className="Image-Test">
                      <img className="Upload-Image-Display" src={images}></img>
                      <button className="Remove-Image" onClick={removeUpload}>
                        Remove
                      </button>
                    </div>
                    <label for = "Image-Uploader">
                      <input className = "Hidden" id = "Image-Uploader" type="file" onChange={uploadHandler} />
                      <span className="Upload-Button">
                        Upload
                      </span>
                    </label>
                  </div>
                  <textarea
                    className="Post-Content-Url Hidden"
                    placeholder="Url"
                  ></textarea>
                  <textarea
                    className="Post-Content-Embed Hidden"
                    placeholder="Embed Youtube"
                  ></textarea>
                </div>

                <div className="Post-Content-Footer-Buttons">
                  <Link to="/">
                    <button className="Footer-Button">Cancel</button>
                  </Link>
                  <button className="Footer-Button" onClick={pushToFirebase}>
                    Post
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
