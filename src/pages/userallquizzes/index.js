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

export default function UserAllQuizzes(props) {

  const location = useLocation();
  const history = useHistory();

  // const { courseId } = location.state;

  const [lectures, setLectures] = useState([]);
  const [generateCertificate, setgenerateCertificate] = useState(0);
  let count = 0;



  if (props.auth === null) {
    history.push('/')
  }
  if (props.userdata?.teacher != undefined) {
    if (props.userdata?.teacher != false) {
      history.push('/teachermainpage')
    }
    if (!location.state?.courseData?.id) {
      history.push('/userdashboard')
    }
  }

  const [certificateId, setcertificateId] = useState('')
  const [certificateCond, setcertificateCond] = useState(false)




  const generCertificate = async (e) => {
    e.preventDefault()

    var a = 0;

    const db = await Firestore.collection('certificate').where('user', '==', props.userdata?.udata?.email)
      .get();

    // if (db.exists) {
    //   console.log('yes')
    // }
    // else {
    //   console.log('no')
    // }
    // console.log(db.docs)
    if (db.docs.length > 0) {
      // console.log(db.docs[0].id)
      history.push({
        pathname: '/certificate',
        state: {
          userData: location.state?.courseData?.id,
          certificateId: db.docs[0].id
        }
      })
      // console.log(db.docs[0].data().id)
      // db.forEach((d) => {
      //   console.log(d.data()?.id)
      //   // history.push({
      //   //   pathname: '/certificate',
      //   //   state: {
      //   //     userData: location.state?.courseData?.id
      //   //   }
      //   // })
      // })
    }

    else {
      Firestore.collection("students").doc(props.auth?.uid).update({

        completedCourses: firebase.firestore.FieldValue.arrayUnion(location.state?.courseData?.id)

      }, { merge: true })
        .then(() => {
          // alert('this course is added to you completed courses list!!!');
          Firestore.collection('certificate').add({
            courseId: location.state?.courseData?.id,
            user: props.userdata?.udata?.email
          }).then((dd) => {
            // console.log(dd?.id)
            history.push({
              pathname: '/certificate',
              state: {
                userData: location.state?.courseData?.id,
                certificateId: dd?.id
              }
            })
          }).catch((err) => {
            alert(err)
          })
          // history.push({
          //   pathname: '/certificate',
          //   state: {
          //     userData: location.state?.courseData?.id
          //   }
          // })
        })
        .catch((error) => {
          alert(error);
        })
      // console.log('no data')
    }

    // if (db.length > 0) {
    //   console.log('yes')
    // }
    // else {
    //   console.log('no')
    // }

    // if (db) {
    //   console.log(db?.id)
    //   db.forEach((d) => {
    //     console.log(d.data())
    //   })
    // }
    // else {
    //   console.log('no data to show')
    // }


    // Firestore.collection('certificate').where('user', '==', props.userdata?.udata?.email)
    //   .get().then((data) => {
    //     if (data) {

    //       data.forEach((dd) => {
    //         setcertificateId(dd?.id)

    //         a = 1

    //       })
    //     }
    //     else {
    //       alert('no data here')
    //     }
    //   })


    // if (a == 0) {

    // Firestore.collection("students").doc(props.auth?.uid).update({

    //   completedCourses: firebase.firestore.FieldValue.arrayUnion(location.state?.courseData?.id)

    // }, { merge: true })
    //   .then(() => {
    //     // alert('this course is added to you completed courses list!!!');
    //     Firestore.collection('certificate').add({
    //       courseId: location.state?.courseData?.id,
    //       user: props.userdata?.udata?.email
    //     }).then((dd) => {
    //       // console.log(dd?.id)
    //       // history.push({
    //       //   pathname: '/certificate',
    //       //   state: {
    //       //     userData: location.state?.courseData?.id,
    //       //     certificateId: dd?.id
    //       //   }
    //       // })
    //     }).catch((err) => {
    //       alert(err)
    //     })
    //     // history.push({
    //     //   pathname: '/certificate',
    //     //   state: {
    //     //     userData: location.state?.courseData?.id
    //     //   }
    //     // })
    //   })
    //   .catch((error) => {
    //     alert(error);
    //   })
    // }
    // else {
    //   // history.push({
    //   //   pathname: '/certificate',
    //   //   state: {
    //   //     certificateId: certificateId
    //   //   }
    //   // })
    // }
  }


  // console.log(location.state?.courseData?.id)
  // console.log(props.userdata?.udata?.email)

  useEffect(() => {

    if (location.state?.courseData?.id) {
      Firestore.collection("quizzes").where('courseId', '==', location.state?.courseData?.id).get()
        .then(res => {
          res.forEach((data) => {

            // console.log(data.data()?.passStudents)
            let r = data.data().passStudents?.find(std => std === firebase.auth().currentUser.uid)
            // console.log(r)
            if (r) {
              // console.log(r)
              count = count + 1
              setgenerateCertificate(count)
              setLectures(prevData => [...prevData, { id: data.id, ...data.data(), passed: true }])
            }
            else {
              setLectures(prevData => [...prevData, { id: data.id, ...data.data() }])
            }
            // data.data()?.passStudents.forEach((abc) => {
            //   if (abc === firebase.auth().currentUser.uid) {
            //     setLectures(prevData => [...prevData, { isPass: true }])
            //   }
            // })

          })
          //   if (res.exists)
          //     setLectures(prevData => [...prevData, { id: res.id, ...res.data() }])
        })
    }

    setTimeout(() => {
      setLoad(true)
    }, 1000);

  }, [])

  // UserAllQuizzes.sort((a, b) => a.date - b.date)

  lectures.sort((a, b) => a.date - b.date)


  const [load, setLoad] = useState(false)

  // console.log(lectures)
  // console.log(location.state?.courseData?.id)
  // console.log(props.userdata?.udata?.email)
  // console.log(generateCertificate)
  // console.log(generateCertificate)
  // console.log(lectures);
  var countNew = 0;
  var NextquizCond = false;
  return (
    <>
      <Navbar />
      {/* <Searchbar /> */}

      <section class="dashboard-lesson pt-5 mt-2">
        <div class="banner text-center py-5 text-white bg-danger" styles="background-color: #dc3545;">
          <h2>ALL QUIZZES</h2>
          {/* <p>If you have any further question please feel free to contact with us 11AM to 8PM only business days.</p> */}
        </div>
      </section>



      <section class="user-panel available-courses py-4">

        <div class="courses1 py-5">

          <div class="ten text-white">

            {generateCertificate === 4 ?
              <div className='row'>
                <div className='d-flex justify-content-center'>
                  <button
                    className='p-3 border rounded bg-dark text-white'
                    onClick={(e) => { generCertificate(e) }}>
                    Generete Certificate
                  </button>
                </div>
              </div>
              :
              <></>
            }

            <div class={`row mt-5`}>

              {lectures.length > 0 ?
                lectures?.map((lecture) => {
                  countNew = countNew + 1;

                  return (
                    countNew == 1 ?

                      < UserplaycourseLectures
                        imgSrc={location.state?.courseData?.imgurl}
                        course={lecture.passed}
                        lecture={lecture}
                        // path={generateCertificate === 4 ? '' : '/userquiztaking'}
                        path={lecture?.passed ? '' : '/userquiztaking'
                        }
                      />

                      :
                      lectures[countNew - 2]?.passed ?
                        <UserplaycourseLectures
                          imgSrc={location.state?.courseData?.imgurl}
                          course={lecture.passed}
                          lecture={lecture}
                          // path={generateCertificate === 4 ? '' : '/userquiztaking'}
                          path={lecture?.passed ? '' : '/userquiztaking'}
                        />
                        :
                        <></>
                  )
                })
                :
                <></>
                // : <p className='text-dark'>no quizzes in this course</p>

              }
            </div>
            {
              load ?
                lectures.length <= 0 ?
                  <>
                    <div className='text-dark text-center p-4'>
                      <h5>"No Quizzes in this Course"</h5>
                    </div>
                  </>
                  :
                  <></>
                :
                <></>
            }

          </div>
        </div>

      </section>

      <Footer />

    </>
  )
}