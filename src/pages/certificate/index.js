// FIREBASE IMPORTS

import { Link, useHistory, useLocation } from 'react-router-dom';
import { Auth, Firestore, Storage } from '../../config/firebase'
import {
  createUserWithEmailAndPassword, signInWithEmailAndPassword
} from "firebase/auth";

import { onAuthStateChanged } from '@firebase/auth';
import { useEffect, useRef, useState } from 'react'
import { connectStorageEmulator } from '@firebase/storage';
import firebase from "firebase/app";

// FIREBASE IMPORTS

import React from 'react'
import Searchbar from '../../components/searchbar';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import Comments from '../../components/comments';
import UserplaycourseLectures from '../../components/UserplaycourseLectures';
import Formbutton from '../../components/formbutton';
import TeacherLecturesButton from '../../components/teacherlecturesbutton';

export default function Certificate(props) {


  const location = useLocation();
  const history = useHistory();

  if (props.auth === null) {
    history.push('/')
  }
  if (props.userdata?.teacher != undefined) {
    if (props.userdata?.teacher != false) {
      history.push('/teachermainpage')
    }
    else if (!location.state?.userData) {
      history.push('/userdashboard')
    }
  }

  console.log(props.userdata)

  const [courseTitle, setcourseTitle] = useState('')

  Firestore.collection('courses').doc(location.state?.userData).get()
    .then((data) => {
      setcourseTitle(data.data().title)
    })
    .catch((err) => {
      console.log(err)
    })


  console.log(location.state?.certificateId)

  return (
    <>
      {/* <Navbar /> */}

      <section className='certificate'>
        <div className='container certificate-container my-2'>
          <div className=' mt-5 certificate-border'>
            <div className='text-center '>
              <h1 className='pt-5' >CERTIFICATE </h1>
              <h5 className='pt-3'>OF APPRECIATION</h5>
              <h5 className='pt-3'>IS PROUDLY PRESENTED TO</h5>
              <h2 className='user-name d-inline-block pt-3'>{props.userdata?.udata?.name}</h2>
              <h4 className='pt-3'>For Successfully completing free Course</h4>
              <h2 className='pt-3 d-inline-block user-name'>{courseTitle}</h2>
              <h6 className='pt-3'>CertificateID: {location.state?.certificateId}</h6>

              <div className='row pt-2 pb-4'>
                <div className=' col-6 col-xs-6 pt-5'>
                  <h4>Approved By</h4>
                  <img src="./images/sign.png" className='sign' alt="" />
                </div>
                <div className='col-6 col-xs-6 pt-5'>
                  <img src="./images/STAMPLATEST.PNG" className='stamp' alt="" />
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>
    </>
  )
}
