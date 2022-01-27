
// FIREBASE IMPORTS

import { Link, useHistory } from 'react-router-dom';
import { Auth, Firestore, Functions, Storage } from '../../config/firebase'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "firebase/auth";

import { onAuthStateChanged } from '@firebase/auth';
import React, { useEffect, useRef, useState } from 'react'
import { connectStorageEmulator } from '@firebase/storage';
import firebase from "firebase/app";

import { useForm } from 'react-hook-form';
// FIREBASE IMPORTS



import Searchbar from '../../components/searchbar';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Comments from '../../components/comments';
import Formstructure from '../../components/formstructure';
import Textbox from '../../components/textbox';
import Formbutton from '../../components/formbutton';

export default function SignUp({ title }) {


  const [loading, setloading] = useState(false);

  const history = useHistory();

  //FOR GETTING USER EMAIL
  const [currentuser, setcuurentuser] = useState();

  //FOR GETTING USER EMAIL
  const auth = firebase.auth();




  const showFile = (e) => {
    console.log(e.target.files[0])
    setfile(e.target.files[0]);
  }

  // SIGNUP FUNCTION

  const [successmsg, setsuccessmsg] = useState(false)

  const signup = async (e) => {
    e.preventDefault();
    const currentUser = firebase.auth().currentUser;

    setloading(true);

    try {
      const done = Functions.httpsCallable('createUserwithEmailPassword');
      const result1 = await done({ email, password, verified: false })

      const role = Functions.httpsCallable('checkRole');
      const result = await role({ email });

      var storageRef = firebase.storage().ref();
      var uploadtask = storageRef.child(`/teacherimage/${result1.data?.uid}/${file.name + Math.random()}`);

      uploadtask.put(file).then((snapshot) => {
        console.log(snapshot)
        uploadtask.getDownloadURL().then((url) => {

          console.log(url);

          Firestore.collection("teachers").doc(result1.data?.uid).set({

            name: name,
            email: email,
            phone: '',
            address: '',
            imgurl: url
          })
            .then(() => {
              // alert('You have been Registered,Confirmation mail is send to ' + email)
              setsuccessmsg(true)
              setTimeout(() => {
                setsuccessmsg(false)
              }, 3000);
              // setconfirm(true);
              // setTimeout(() => {
              //   setconfirm(false)
              //   history.push('/teachermainpage')
              // }, 3000);
              // // alert("course has been added now");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        })
      }).catch(() => {
        alert('cant upload file')
      });

      setcuurentuser(email);
      reset()
    } catch (err) {
      alert(err);
    }

    setloading(false);
  }

  // SIGNUP FUNCTION



  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setname] = useState('')

  function setValues(ev) {
    const { name, value } = ev.target
    switch (name) {
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  }


  const [file, setfile] = useState([]);

  // FORM VALIDATION

  const onSubmit = (data, e) => {
    // console.log(email)
    signup(e)
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  // FORM VALIDATION



  return (
    <>
      <Navbar title={title} />
      {/* <Searchbar /> */}

      <section class="signin">
        <div class="container-fluid">
          {/* <!--error above line--> */}
          <div class="row">
            <div class="col-md-6 pt-3" styles="background-color: #1f4363;">
              <div class="left">
                <h1>REQUEST AN ADMISSION</h1>
                <h3 class="mt-5">HELP LINE <span class="mt-3">+92 434 43293423</span></h3>
              </div>
            </div>
            <div class="col-md-6" styles="background-color: #d1d3d4;">
              {/* <div class="form bg-light"> */}
              <Formstructure>
                <h1>ADMISSION</h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                  {/* <div class="form-group mt-3">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Name" />
                  </div> */}

                  <Textbox type='text' placeholder='Name'
                    onChange={(e) => { setname(e.target.value) }}
                    register={{
                      ...register('name', {
                        required: "fill this field", maxLength: {
                          value: 45,
                          message: "Name should not exceed 45 characters"
                        }
                      })
                    }} />
                  <p className='text-danger'>{errors?.name?.message}</p>


                  {/* <div class="form-group mt-3">
                    <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Email" />
                  </div> */}

                  <Textbox name='email'
                    onChange={(e) => { setEmail(e.target.value) }} type='email' placeholder='Email'
                    register={{
                      ...register('email', {
                        required: "fill this field",
                        pattern: {
                          value: '^ ([a - zA - Z0 -9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2, 5})$',
                          message: "enter valid email"
                        }
                      })
                    }} />
                  <p className='text-danger'>{errors?.email?.message}</p>


                  {/* <div class="form-group mt-3">
                    <input type="password" class="form-control" id="exampleFormControlInput1" placeholder="Password" />
                  </div> */}


                  <Textbox name='password'
                    onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Password'
                    register={{
                      ...register('password', {
                        required: "fill this field",
                        minLength: {
                          value: 6,
                          message: "minimum length password should be 6 digits"
                        }
                      })
                    }} />
                  <p className='text-danger'>{errors?.password?.message}</p>


                  <Textbox name='file'
                    className='w-100 ps-4'
                    type='file'
                    register={{
                      ...register('file', {
                        required: "fill this field",
                      })
                    }}
                    onChange={showFile} />
                  <p className='text-danger'>{errors?.file?.message}</p>

                  {successmsg ?
                    <p className='text-danger text-center'>"You have been Registered,Confirmation mail is send to "{email}</p>
                    :
                    <></>
                  }
                  <Formbutton type='submit' classname='text-white w-90 mb-1' href='/signin' value='Register Now' text='Click Here To Login' />

                </form>
              </Formstructure>
              {/* </div> */}
            </div>

          </div>
        </div>
      </section>



      <Comments />
      <Footer />


    </>
  )
}
