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
import Navbar from '../../components/navbar'
import Searchbar from '../../components/searchbar'
import Footer from '../../components/footer'
import Comments from '../../components/comments'
// import Textbox from '../../components/textbox'

export default function Onlineverification(props) {

  const [id, setid] = useState('dsa')
  const [certificateverify, setcertificateverify] = useState(false)
  const [certificatenotVerify, setcertificatenotVerify] = useState(false)

  const verify = async (id) => {
    Firestore.collection('certificate').doc(id).get()
      .then((data) => {
        if (data.data()) {
          setcertificateverify(true)
          setTimeout(() => {
            setcertificateverify(false)
          }, 3000);
        }
        else {
          setcertificatenotVerify(true)
          setTimeout(() => {
            setcertificatenotVerify(false)
          }, 3000);
        }

        // console.log(data.data())
      }).catch((err) => {
        // setcertificatenotVerify(true)
        // setTimeout(() => {
        //   setcertificatenotVerify(false)
        // }, 3000);
      })
  }

  return (
    <>
      <Navbar />
      {/* <Searchbar /> */}

      {/* <!--   ---   VERIFICATION SECTION  ----    --> */}

      <section class="verification bg-white pt-5">
        <div class="verification-container my-5">
          <div class="ban1 p-3">
            <h3 class="text-white">VERIFICATION OF CERTIFICATE</h3>
          </div>
          <div class="card ban1">
            <h2 class="text-center mb-0 py-3 text-white">CERTIFICATE VERIFICATION</h2>
            <div class="card-body">

              <p>Please enter Roll Number to verify the Certificate.</p>
              <div class="search-box">
                <div class="row">
                  <div class="col-md-2">
                    <h5 class="pt-2">Roll-</h5>
                  </div>
                  <div class="col-md-10">
                    <input type="text"
                      onChange={(e) => { setid(e.target.value) }}
                      placeholder="Enter Roll Number" class="w-100 py-2" />
                  </div>
                </div>
              </div>

              {certificateverify ?
                <h4 className='text-success text-center'>Certificate Verified</h4>
                :
                <></>
                // <h4 className='text-danger text-center'>This Certicate does not Exist</h4>
              }

              {certificatenotVerify ?
                <h4 className='text-danger text-center'>This Certicate does not Exist</h4>
                :
                <></>

              }


              <div class="search-btn">
                <input type="submit" onClick={() => { verify(id) }} value="Search" class="btn py-2 text-white form-control" />
              </div>


            </div>
          </div>
        </div>
      </section>

      {/* <!--   ---  COMMENTS  ----    --> */}

      {/* <section class="comments">
        <div class="comment-container">
          <div class="row">
            <div class="col-md-2">
              <img src="./images/bulb1.png" alt="" class="pt-5 px-3 w-90" />
            </div>

            <div class="col-md-4">
              <h4 class="pt-5 px-5">AN INVESTMENT IN KNOWLEDGE PAYS THE BEST INTEREST.</h4>
            </div>

            <div class="col-md-5">
              <img src="./assets/images/user-comment.PNG" alt="" class="pt-5 px-3 w-100" />
            </div>

          </div>
        </div>
      </section> */}

      <Comments />


      <Footer />
    </>
  )
}
