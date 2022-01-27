
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
import './main.css'
// FIREBASE IMPORTS


import Searchbar from '../../components/searchbar';
import Navbar from '../../components/navbar';
import Homedesign from '../../components/homedesign';
import Textbox from '../../components/textbox';
import Formbutton from '../../components/formbutton';
import Formstructure from '../../components/formstructure';
import PcourseImages from '../../components/PcourseImages';
import AcourseCard from '../../components/AcourseCard';
import Footer from '../../components/footer';
import Comments from '../../components/comments';
import CoursesPage from '../courses';
import { set, useForm } from 'react-hook-form';

export default function MainPage(props) {


  const [loading, setloading] = useState(false);


  //FOR GETTING USER EMAIL

  const [currentuser, setcuurentuser] = useState();

  //FOR GETTING USER EMAIL

  const auth = firebase.auth();


  var storageRef = firebase.storage().ref();


  // AUTH STATE CHECK


  const [coursData, setCourseData] = useState([]);

  const [val, setval] = useState('');


  const [poplogic, setpoplogic] = useState([])

  const [apidata, setapidata] = useState([])

  // const getdata = async () => {

  //   // let url = 'https://remotive.io/api/remote-jobs?category=software-dev'
  //   let url = 'https://pk.linkedin.com/jobs/search?keywords=react&location=Kar%C4%81chi%2C%20Sindh%2C%20Pakistan&geoId=&trk=homepage-jobseeker_jobs-search-bar_search-submit&position=1&pageNum=0'
  //   let data = await fetch(url);
  //   let pdata = await data.json();
  //   setapidata(pdata)
  //   console.log(pdata)
  // }
  const [validcreds, setvalidcreds] = useState(false)

  var cnt = 0
  var stdq = 0
  var crsq = 0
  var grd = 0

  const [teachersQuant, setteachersQuant] = useState('')
  const [stdQuant, setstdQuant] = useState('')
  const [courseQuant, setcourseQuant] = useState('')
  const [grads, setgrads] = useState('')

  useEffect(() => {
    console.log(a)

    if (props.auth) {
      setval('hello');
    }
    else {
      console.log("logged out")
    }

    let tempdata = [];

    // function to getset data
    const getsetdata = async () => {
      const data = await Firestore.collection('courses').get();

      data.forEach((alldata) => {
        tempdata.push({ id: alldata.id, ...alldata.data() })
      })
      setCourseData(tempdata);

    }
    // function to getset data
    getsetdata();


    Firestore.collection('courses').where('students', '!=', null)
      .get().then((data) => {
        data.forEach((ndata) => {
          setpoplogic(prevData => [...prevData, { id: ndata.id, ...ndata.data() }])
        })
      })

    // let url = "https://pk.indeed.com/jobs?q=.net&vjk=10af5b1b7949a5fe"
    // let data = await fetch(url);
    // let pdata = await data.json();
    // console.log(pdata)
    // fetch(url).then((ndata) => {
    //   console.log(ndata.json())
    // }).catch((err) => {
    //   console.log(err)
    // })
    // getdata()

    // Firestore.collection('quizzes').orderBy('title', 'asc')
    //   .startAt('das').endAt('das' + '\uf8ff').get()
    //   .then((data) => {
    //     data.forEach((ndata) => {
    //       console.log(ndata.data())
    //     })
    //   })
    // Firestore.collection('quizzes').get()
    //   .then((data) => {
    //     data.forEach((ndata) => {
    //       // console.log(ndata.data()?.title)
    //       if (ndata.data()?.title.includes('das')) {
    //         console.log(ndata.data()?.title)
    //       }
    //     })
    //   }).catch((e) => {
    //     console.log(e)
    //   })


    // fetch("https://job-search4.p.rapidapi.com/indeed/search?query=flutter&page=10", {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "job-search4.p.rapidapi.com",
    //     "x-rapidapi-key": "1e1bb7d233msh93b76b3f1731275p16d044jsna2c8489e07d4"
    //   }
    // })
    //   .then(response => {
    //     console.log(response.json());
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });


    // calldata();


    // fetch("https://job-search4.p.rapidapi.com/indeed/search?query=.net&page=4", {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "job-search4.p.rapidapi.com",
    //     "x-rapidapi-key": "1e1bb7d233msh93b76b3f1731275p16d044jsna2c8489e07d4"
    //   }
    // })
    //   .then(response => {
    //     console.log(response.json());
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });
    // fetch("https://job-search4.p.rapidapi.com/indeed/search?query=developer&page=2", {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "job-search4.p.rapidapi.com",
    //     "x-rapidapi-key": "1e1bb7d233msh93b76b3f1731275p16d044jsna2c8489e07d4"
    //   }
    // })
    //   .then(response => {
    //     // console.log(response.json());
    //     console.log(response.json())
    //   })
    //   .catch(err => {
    //     console.error(err);
    //   });


    Firestore.collection('teachers').get().then((data) => {
      data.forEach((ndata) => {
        cnt = cnt + 1
        // console.log(ndata.data())
      })
      setteachersQuant(cnt)
    })

    Firestore.collection('students').get().then((data) => {
      data.forEach((ndata) => {
        stdq = stdq + 1
        // console.log(ndata.data())
      })
      setstdQuant(stdq)
    })

    Firestore.collection('courses').get().then((data) => {
      data.forEach((ndata) => {
        crsq = crsq + 1
        // console.log(ndata.data())
      })
      setcourseQuant(crsq)
    })

    Firestore.collection('students').where('completedCourses', '!=', null).get().then((data) => {
      data.forEach((ndata) => {
        grd = grd + 1
        // console.log(ndata.data())
      })
      setgrads(grd)
    })

    // var stdq = 0
    // var crsq = 0
    // var grd = 0

  }, [])

  console.log(teachersQuant)
  // console.log(poplogic.reverse())


  const calldata = async () => {

    const data = await fetch("https://job-search4.p.rapidapi.com/indeed/search?query=flutter&page=10", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "job-search4.p.rapidapi.com",
        "x-rapidapi-key": "1e1bb7d233msh93b76b3f1731275p16d044jsna2c8489e07d4"
      }
    })
    const jdata = await data.json()
    console.log(jdata?.jobs)

    Firestore.collection('jobs').add({
      jobs: jdata?.jobs
    }).then(() => {
      alert('jobs added to firestore')
      return
    })
      .catch((e) => {
        alert(e)
      })
  }



  // AUTH STATE CHECK
  // console.log(poplogic.sort('students'))
  // poplogic.sort('students')


  // poplogic.forEach((dt) => {
  //   // setamt(prevData => [...prevData, { ...dt }])
  //   console.log(dt)
  // })

  const [amt, setamt] = useState([])

  // poplogic.forEach((dt) => {
  //   setamt(prevData => [...prevData, { ...dt }])
  // })

  // console.log(amt)


  // var MaxValue = Math.max.apply(Math, poplogic.map(function (o) { return o.y; }))

  // console.log(MaxValue)
  // to navigate
  const history = useHistory();
  // to navigate





  // SIGNIN FUNCTION

  const signin = async (e) => {
    e.preventDefault();

    setloading(true);

    try {

      await firebase.auth().signInWithEmailAndPassword(emailref.current.value, passwordref.current.value)

      setcuurentuser(emailref.current.value);
    } catch (err) {
      alert(err);
    }

    setloading(false);
  }

  // SIGNIN FUNCTION


  // SIGNOUT FUNCTION

  const signout = (e) => {
    e.preventDefault();

    firebase.auth().signOut().then(() => {
      console.log("logout successfull")
    }).catch((error) => {
      console.log(error)
    });
  }

  // SIGNOUT FUNCTION




  // FORGOTPASSWORD FUNCTION


  const forgotPassword = async (e) => {
    e.preventDefault();

    try {
      const actionCodeSettings = {
        url: 'https://www.example.com/?email=user@example.com',
        iOS: {
          bundleId: 'com.example.ios'
        },
        android: {
          packageName: 'com.example.android',
          installApp: true,
          minimumVersion: '12'
        },
        handleCodeInApp: true
      }
      console.log("done");
    }
    catch (error) {
      console.log(error)
      console.log("error");
    }

  }


  const emailref = useRef();
  const passwordref = useRef();


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

  let a = 0;
  let b = 0;

  // coursData.map((data) => {
  //   console.log(data.learn);
  // })

  // console.log(errors)


  // console.log(errors?.hi?.message)



  // SIGNUP FUNCTION



  const signup = async (e) => {
    e.preventDefault();

    setloading(true);

    // handleSubmit(onSubmit)

    // try {

    //   // setload(true)
    //   const userCred = await auth.createUserWithEmailAndPassword(email, password);

    //   const done = await userCred.user.sendEmailVerification();

    //   console.log(done)

    //   const role = Functions.httpsCallable('studentRole');
    //   const result = await role({ email });
    //   console.log(result);

    //   await Firestore.collection("students").doc(auth.currentUser.uid).set({

    //     name: name,
    //     email: email,
    //     phone: ''
    //   })

    //   console.log("client or user has been added");
    //   setcuurentuser(email);
    //   // alert('You have been registered, Confirmation mail is sent to ' + email)
    //   // setload(false)
    //   history.push('/userdashboard');

    // } catch (err) {
    //   alert(err);
    // }


    try {
      const done = Functions.httpsCallable('createUserwithEmailPassword');
      const result1 = await done({ email, password, verified: true })

      // const done1 = await userCred.user.sendEmailVerification();

      // console.log(done1)

      const role = Functions.httpsCallable('studentRole');
      const result = await role({ email });
      console.log(result1);

      Firestore.collection("students").doc(result1.data?.uid).set({

        name: name,
        email: email,
        phone: ''
      }).then(() => {
        setcuurentuser(email);
        setvalidcreds(true)
        setTimeout(() => {
          setvalidcreds(false)
        }, 3000);
        // alert('You have been Registered,Confirmation mail is send to ' + email)

      })
        .catch((err) => {
          alert(err)
        })
      reset()
      // console.log("client or user has been added");


    } catch (err) {
      alert(err);
    }

    setloading(false);
  }

  // SIGNUP FUNCTION



  // FORM VALIDATION

  const onSubmit = (data, e) => {
    // console.log(JSON.stringify(data))
    console.log(email)
    signup(e)

  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  // FORM VALIDATION

  // const [load, setload] = useState(false)

  // if (load) {
  //   return <img style={{ width: 50, height: 50 }} className='rotating' src="/images/loader.png" alt="" />
  // }


  // Firestore.collection('courses').where('students', '!=', null)
  //   .get().then((data) => {

  //     data.forEach((ndata) => {
  //       // console.log(ndata.data())
  //       // console.log()
  //       setpoplogic(prevData => [...prevData, { ...ndata.data() }])
  //     })
  //   })

  var down = []

  var c = 0


  const saveApiData = async (e) => {
    console.log(apidata?.jobs.length)
    apidata?.jobs?.map((data) => {
      c = c + 1
      if (c < 101) {
        down.push(data)
      }
    })

    e.preventDefault()
    Firestore.collection('apiData').add({
      apiData: down
    }).then(() => {
      alert('api data is added in firebase')
    }).catch((e) => {
      alert(e)
    })
  }
  // Firestore.collection('quizzes').orderBy('title', 'asc')
  //   .startAt('das').endAt('das' + "uf8ff").get()
  //   .then((data) => {
  //     data.forEach((ndata) => {
  //       console.log(ndata.data())
  //     })
  //   })

  // Firestore.collection('apiData').where('title', 'LIKE', '%App Team Lead - React Native%').get()
  //   .then((data) => {
  //     console.log(data)
  //   })

  return (
    <>
      <Navbar />
      {/* <Searchbar /> */}

      {/* <!--   ---  HOME PAGE FORM  ----    --> */}

      <div className="home">

        <div className="container">

          <div className="row">

            <div className="col-md-7 pt-4">
              <div className="grand_parent">
                <h2 className="text-center mb-5"> Welcome To E- Learning</h2>

                <div className="container">

                  <Homedesign one={stdQuant} two='Users' three='Users' four='Users' />
                  <Homedesign one={teachersQuant} two='Teachers' three='Users' four='Users' />

                </div>

                <div className="container">

                  <Homedesign one={courseQuant} two='Courses' three='Total' four='Course' />
                  <Homedesign one={grads} two='Grads' three='Grad' four='Users' />

                </div>

              </div>
            </div>

            <div className="col-md-5 ">

              <Formstructure>

                <h1 className='std-register'>ADMISSION</h1>

                <form onSubmit={handleSubmit(onSubmit)}>

                  {/* <input name='hi' className="form-control"
                    {...register('hi', { required: "enter value" })} />
                  <p className='text-dark'>{errors?.hi?.message}</p> */}


                  <Textbox type='text' name='name' placeholder='Name'
                    onChange={(e) => { setname(e.target.value) }}
                    register={{
                      ...register('name', {
                        required: "fill this field", maxLength: {
                          value: 45,
                          message: "Name should not exceed 45 characters"
                        }
                      })
                    }}
                  />

                  <p className='text-danger'>{errors?.name?.message}</p>


                  <Textbox name="email"
                    onChange={(e) => { setEmail(e.target.value) }}
                    type='email' placeholder='Email'
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


                  <Textbox name="password" onChange={(e) => { setPassword(e.target.value) }} type='password' placeholder='Password'
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
                  <p className='text-danger text-center'>
                    {validcreds ? 'Kindly Authenticate, Confirmation mail is send to ' + email :
                      <></>
                    }
                  </p>


                  {/* <Textbox type='text' placeholder='Captcha Code' /> */}

                  <Formbutton type='submit' className='btn btn-success w-100 mb-1' href='/signin' text='Click Here To Login' />

                  {/* <input type="submit" /> */}

                </form>
              </Formstructure>

            </div>

          </div>

        </div>
      </div>

      {/*
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="name"
          {...register('name', { required: "this is mandatory" })} />

        <input type="submit" />
      </form> */}


      {/* <!--   ---  POPULAR COURES SECTION  ----    --> */}

      <section className="popular-courses">

        <div className="pics-container">

          <h2 className="text-center my-5">POPULAR <span className="word-color">COURSES</span></h2>

          {/* <button onClick={(e) => { calldata(e) }}>
            calldata
          </button>

          <button onClick={(e) => saveApiData(e)}>
            Save Api Data
          </button> */}

          <div className="container">
            <div className="row">

              {poplogic.length > 3 ?
                poplogic.reverse().map((popdata) => {
                  b = b + 1
                  return popdata.isActive && b < 5 ?
                    (<PcourseImages href='/popularcourse' data={popdata} />)
                    :
                    <></>
                })
                :

                coursData.map((data) => {
                  // data.isActive ?
                  a = a + 1
                  return data.isActive && a < 5 ?

                    (<PcourseImages href='/popularcourse' data={data} />)

                    :
                    <></>
                })
              }

              {/*
              <PcourseImages href='/popularcourse' src='/images/p2.png' />

              <PcourseImages href='/popularcourse' src='/images/p3.jpg' />

              <PcourseImages href='/popularcourse' src='/images/p4.png' /> */}

            </div>
          </div>
        </div>
      </section>


      {/* <!--   ---  AVAILABLE COURSES SECTION  ----    --> */}

      <section className="available-courses">

        <h2 className="text-center py-5">AVAILABLE <span className="word-color">COURSES</span></h2>

        <div className="courses">

          <div className="row pb-5">

            {coursData.map((data) => (
              data.isActive ?
                <div className="col-md-6 mb-4">
                  {/* <AcourseCard img={data.imgurl} href='/popularcourse' heading={data.title} /> */}
                  <AcourseCard href='/popularcourse' data={data} />

                </div>
                :
                <></>

            ))
            }


            {/* <div className="col-md-6 mb-4">
              <AcourseCard img='/images/avail3.jpg' href='/popularcourse' heading='Web Development' />
            </div> */}

          </div>


          {/*
          <div className="row pb-5">
            <div className="col-md-6 mb-4">

              <AcourseCard img='/images/avail2.jpg' href='/popularcourse' heading='Python' />
            </div>


            <div className="col-md-6 mb-5">

              <AcourseCard img='/images/avail4.jpg' href='/popularcourse' heading='Javascript' />
            </div>

          </div> */}

        </div>

      </section >



      {/* <!--   ---  COMMENTS  ----    --> */}

      {/* < section className="comments" >
        <div className="comment-container">
          <div className="row">
            <div className="col-md-2">
              <img src="/images/bulb1.png" alt="" className="pt-5 px-3 w-90" />
            </div>

            <div className="col-md-4">
              <h4 className="pt-5 px-5">AN INVESTMENT IN KNOWLEDGE PAYS THE BEST INTEREST.</h4>
            </div>

            <div className="col-md-5">
              <img src="/images/user-comment.PNG" alt="" className="pt-5 px-3 w-100" />
            </div>

          </div>
        </div>
      </section > */}

      <Comments />


      {/* <!---  FOOTER  ---> */}


      {/* < footer className="page-footer font-small" >


        <div className="container-fluid text-md-left py-5">


          <div className="footer">

            <div className="row">
              <div className="col-md-5 mb-md-0 mb-3 px-5">

                <h5 className="text-uppercase mb-4">GET IN TOUCH </h5>
                <p>Learn at the comfort of yourn own home!</p>
                <p>Phone: +92 336 326552 </p>
                <p>Email: whs@gmail.com</p>

              </div>




              <div className="col-md-3 mb-md-0 mb-3 px-5">


                <h5 className="text-uppercase mb-4">Top Courses</h5>

                <ul className="list-unstyled footer-middle text-primary">

                  <li>
                    <a href="courses.html">All Courses</a>
                  </li>
                  <li>
                    <a href="verification.html">Online Verification</a>
                  </li>
                  <li>
                    <a href="aboutus.html">About Us</a>
                  </li>
                  <li>
                    <a href="contactus.html">Contact Us</a>
                  </li>
                </ul>

              </div>


              <div className="col-md-3 mb-md-0 mb-3 px-5">
                <h5 className="text-uppercase mb-4">SOCIAL MEDIA</h5>

                <ul className="list-unstyled footer-last">
                  <li>
                    <a href="facebook.com">
                      <ion-icon name="logo-facebook"></ion-icon>
                    </a>
                  </li>

                  <li>
                    <a href="gmail.com">
                      <ion-icon name="logo-google"></ion-icon>
                    </a>
                  </li>
                  <li>
                    <a href="twitter.com">
                      <ion-icon name="logo-twitter"></ion-icon>
                    </a>
                  </li>
                </ul>

              </div>
            </div>
          </div>

        </div>


        <div className="footer-copyright text-center py-3 text-white">2021 © Copyright:
          <a href="index.html" className="text-warning"> All rights reserved</a>
        </div>

      </footer > */}
      <Footer />





    </>
  )
}
