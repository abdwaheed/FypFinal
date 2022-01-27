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
import Comments from '../../c\omponents/comments';
import UserplaycourseLectures from '../../components/UserplaycourseLectures';
import Formbutton from '../../components/formbutton';
import TeacherLecturesButton from '../../components/teacherlecturesbutton';
import TeacherStructure from '../../components/TeacherStructure'


export default function TeacherLectures(props) {


  const location = useLocation();
  const history = useHistory();

  const [coursedetails, setCoursedetails] = useState(null)
  const [lecturedata, setLecturedata] = useState([]);



  if (props.auth === null) {
    history.push('/')
  }
  if (props.userdata?.teacher != undefined) {
    if (props.userdata?.teacher === false) {
      history.push('/userdashboard')
    }

    else if (!location.state?.coursedetails) {
      history.push('teachermainpage')
    }
  }


  useEffect(() => {

    // if (location.state) {

    //   let { coursedetails: cd } = location.state;
    //   setCoursedetails(cd)
    //   console.log("COURSE DATA IN TEACHER LECTURE: ", coursedetails)

    let data = [];
    if (location.state?.coursedetails?.lectures) {
      location.state?.coursedetails?.lectures.map((lectures) => {

        data.push(lectures);

      })
    }
    // console.log(data);
    setLecturedata(data);
    setTimeout(() => {
      setload(true)
    }, 2000);
    // }
    //   else {
    //     history.push('/teachermainpage');
    //   }

  }, [])
  // console.log(location.state?.coursedetails?.id)
  // console.log(location.state?.coursedetails)
  // console.log(lecturedata);

  // console.log(coursedetails);

  const [load, setload] = useState(false)
  var a = 0;

  return (
    <>
      <Navbar />
      {/* <Searchbar /> */}

      <TeacherStructure>

        <section class="dashboard-lesson pt-5">
          <div class="banner text-center py-5 text-white bg-danger" styles="background-color: #dc3545;">
            <h2>{location.state?.coursedetails?.title}</h2>

          </div>
        </section>


        <section class="user-panel available-courses py-3">

          <div class="courses1 py-5 ">

            <div class="ten text-white">



              {/* <TeacherLecturesButton text='ADD QUIZ' href='/teaaccherquiz' /> */}
              {console.log('COURSE DETAILS IN JSX: ', coursedetails)}
              <TeacherLecturesButton data={location.state?.coursedetails} text='QUIZZES' href='/quizzes' />

              <TeacherLecturesButton text='ADD LECTURE' data={location.state?.coursedetails}
                href='/teacheruploadlecture' />

              <TeacherLecturesButton data={location.state?.coursedetails?.id} text='DISCUSSION' href='/userdiscussion2' />

              <div className="row text-dark px-4 text-center mt-5">
                <h3>ALL LECTURES</h3>
              </div>

              <div class={`row mt-5`}>
                {

                  lecturedata.length > 0 ? lecturedata.map((data) => {
                    a = a + 1
                    // return
                    return (<UserplaycourseLectures
                      lectNo={a}
                      lecture={data}
                      path='/teachereditlecture'
                      style='mt-5'
                      cTitle={location.state?.coursedetails?.title}
                      imgSrc={location.state?.coursedetails?.imgurl} />
                    )
                    // <div className='col-md-5 mx-auto mt-2'>
                    //   <div className="card text-align-center "
                    //     style={{ width: "auto" }}>
                    //     <img className="card-img-top" src={location.state?.coursedetails?.imgurl} alt="Card image cap" style={{ height: "8rem" }} />
                    //     <div className="card-body">
                    //       <h4 className="card-title text-dark">{location.state?.coursedetails?.title}</h4>
                    //       <h6 className='text-dark'>Lecture 1</h6>
                    //     </div>
                    //   </div>
                    // </div>

                  })
                    :
                    <></>


                }

                {/* <div className='text-dark text-center'>
                  <h3>"No Lectures For This Course"</h3>
                </div> */}
                {
                  load ?
                    lecturedata.length <= 0 ?
                      // <div className='container pt-3'>
                      //   <div className='d-flex'>
                      //     <h4 className='justify-center'>"You are not enrolled in any course"</h4>
                      //   </div>
                      // </div>
                      <div className='text-dark text-center'>
                        <h3>"No Lectures For This Course"</h3>
                      </div>
                      :
                      <></>
                    :
                    <></>
                }


                {/*
              <UserplaycourseLectures path='/teachereditlecture' />

              <UserplaycourseLectures path='/teachereditlecture' />

              <UserplaycourseLectures path='/teachereditlecture' /> */}
              </div>

            </div>
          </div>

        </section>
      </TeacherStructure>


      <Footer />

    </>
  )
}
