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

export default function QuizQuestions(props) {

  const history = useHistory();

  const location = useLocation();

  // const { coursedetails } = location.state;


  const [lecturedata, setLecturedata] = useState([]);

  const [allQuestions, setAllQuestions] = useState([]);
  const [quizId, setQuizId] = useState('');

  if (props.auth === null) {
    history.push('/')
  }
  if (props.userdata?.teacher != undefined) {
    // if (props.auth === null) {
    //   history.push('/')
    // }
    if (props.userdata?.teacher === false) {
      history.push('/userdashboard')
    }
    else if (!location.state?.courseId) {
      history.push('/teachermainpage')
    }
  }

  const [load, setload] = useState(false)

  useEffect(() => {


    if (location.state?.courseId) {
      setQuizId(location.state?.courseId)
      Firestore.collection('questions_test').where('id', '==', location.state?.courseId).get()
        .then((doc) => {
          doc.forEach((data) => {
            setAllQuestions(prevData => [...prevData, { questId: data.id, ...data.data() }])
            setload(true)
          })
        })
    }

    setTimeout(() => {
      setload(true)
    }, 1000);

    // if (location.state?.courseId) {
    //   setQuizId(location.state?.courseId)
    //   Firestore.collection('questions_test').where('id', '==', location.state?.courseId).get()
    //     .then((doc) => {
    //       doc.forEach((data) => {
    //         setAllQuestions(prevData => [...prevData, { questId: data.id, ...data.data() }])
    //       })
    //     })
    // }


  }, [])


  const addQuestion = (e) => {
    e.preventDefault();

    history.push({
      pathname: '/teacherquiz',
      state: {
        quizId: quizId
      }
    })


  }

  var newcount = 0;

  console.log(allQuestions);
  // console.log(location.state?.imgSrc)
  return (
    <>
      <Navbar />
      {/* <Searchbar /> */}

      <section class="dashboard-lesson pt-5 mt-2">
        <div class="banner text-center py-5 text-white bg-danger" styles="background-color: #dc3545;">
          <h2>ALL QUESTIONS</h2>

        </div>
      </section>


      <section class="user-panel available-courses py-4">

        <div class="courses1 py-5">

          <div class="ten text-white">

            {/* <TeacherLecturesButton text='ADD QUIZ' href='/actualquiz' /> */}



            <div class={`row mt-2`}>
              {

                allQuestions.length > 0 ? allQuestions.map((data) => {
                  newcount = newcount + 1;
                  // <UserplaycourseLectures
                  //   lecture={data} //here data is for all 'data' of a single question
                  //   path='/teacherquiz'
                  //   style='mt-5'
                  //   imgSrc={location.state?.imgSrc} />
                  return (
                    <div className='col-md-5 mx-auto mt-5'>
                      <div class=" rounded" style={{ width: "auto" }}>
                        <div class="card-body">
                          <h4 className='text-center text-secondary'>Question {newcount}</h4>
                          <h5 class="text-dark mt-4">{data?.question}</h5>
                          <ul className='text-secondary mt-4'>
                            <li className='p-1'>{data?.option1}</li>
                            <li className='p-1'>{data?.option2}</li>
                            <li className='p-1'>{data?.option3}</li>
                            <li className='p-1'>{data?.option4}</li>
                          </ul>
                          <Link className='text-decoration-none'
                            to={{
                              pathname: '/teacherquiz',
                              state: {
                                lecture: data
                              }
                            }}>
                            <h4 className='pt-3 text-center'>Edit Question</h4>
                          </Link>
                        </div>
                      </div>
                    </div>
                  )
                })
                  :
                  <>
                    {
                      load ?
                        allQuestions.length <= 0 ?
                          <>
                            <div class="text-center mb-5 py-3">
                              <button
                                onClick={addQuestion}
                                class="btn btn-dark w-50 p-2" type="button">
                                ADD QUESTIONS
                              </button>
                            </div>

                            <div className='text-dark text-center'>
                              <h3>"NO QUESTIONS ADDED TO THIS QUIZ"</h3>
                            </div>
                          </>
                          :
                          <></>
                        :
                        <></>
                    }
                  </>

              }

              {/* {
                load ?
                  allQuestions.length <= 0 ?
                    <div className='text-dark text-center'>
                      <h3>"NO QUESTIONS ADDED TO THIS Quiz"</h3>
                    </div>
                    :
                    <></>
                  :
                  <></>
              } */}

            </div>

          </div>
        </div>

      </section>

      <Footer />

    </>
  )
}
