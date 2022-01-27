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

import { useForm } from 'react-hook-form';


// Modal Imports
import { Modal, Button } from 'react-bootstrap';


// FIREBASE IMPORTS

import React from 'react'
import Navbar from '../../components/navbar'
import Searchbar from '../../components/searchbar'
import Footer from '../../components/footer'
import TeacherStructure from '../../components/TeacherStructure'
export default function TeacherIntendedLearners(props) {


  const [title, setTitle] = useState('');
  const [learn, setLearn] = useState('');
  const [requirements, setRequirements] = useState('');
  const [videourl, setVideourl] = useState('');
  const [img, setImg] = useState('');
  const [totalLectures, settotalLectures] = useState('')
  const [languageMedium, setlanguageMedium] = useState('')
  const [description, setdescription] = useState('')

  const location = useLocation();
  const history = useHistory();

  const [file, setfile] = useState([]);
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
    // if (!location.state?.coursedetails) {
    //   history.push('/teachermainpage')
    // }
  }


  console.log(location.state?.coursedetails)


  const showFile = (e) => {
    console.log(e.target.files[0])
    setfile(e.target.files[0]);
    // setImg(file.url);
  }



  // FOR ADDING JOBS

  const calldata = async (jobname, courseId) => {

    // const data = await fetch("https://job-search4.p.rapidapi.com/linkedin/search?query=Software%20Engineer&page=5", {
    //   "method": "GET",
    //   "headers": {
    //     "x-rapidapi-host": "job-search4.p.rapidapi.com",
    //     "x-rapidapi-key": "f7682ba772msh3e1750b4d507b96p100a05jsn7466f0f333d3"
    //   }
    // })

    const data = await fetch("https://job-search4.p.rapidapi.com/linkedin/search?query=" + { jobname } + "&page=5", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "job-search4.p.rapidapi.com",
        "x-rapidapi-key": "f7682ba772msh3e1750b4d507b96p100a05jsn7466f0f333d3"
      }
    })

    const jdata = await data.json()
    console.log(jdata?.jobs)

    Firestore.collection('jobs').doc(courseId).set({
      jobs: jdata
    }).then(() => {
      // alert('jobs added to firestore')
      // return
    })
      .catch((e) => {
        alert(e)
      })
  }

  // FOR ADDING JOBS



  const [modal, setmodal] = useState(false)

  // uploadind data to firestore and storage

  const uploadfiles = async (e) => {
    const currentUser = firebase.auth().currentUser;

    console.log(file);

    // if (file.length <= 0) {
    if (!file) {
      console.log("cant upload file");
      alert("please select image firse");
      return;
    }

    var storageRef = firebase.storage().ref();
    if (currentUser) {
      var uploadtask = storageRef.child(`/courseimage/${currentUser.uid}/${file.name + Math.random()}`);

      uploadtask.put(file).then((snapshot) => {

        uploadtask.getDownloadURL().then((url) => {

          console.log(url);

          Firestore.collection("courses").add({
            imgurl: url,
            title: title,
            learn: learn,
            requirement: requirements,
            description: description,
            totalLectures: totalLectures,
            languageMedium: languageMedium,
            teacheruid: currentUser.uid,
            videourl: videourl,
            isActive: true,
            teacherimg: props.userdata.udata?.imgurl
          })
            .then((d) => {
              // console.log(d?.id);
              setShow(true)
              calldata(title, d?.id).then(() => {
                setShow(false)
                reset()
                setconfirm(true);
                setTimeout(() => {
                  setconfirm(false)
                  history.push('/teachermainpage')
                }, 3000);
              }).catch((e) => {
                alert(e)
              })
              // console.log(d.id)


              // reset()
              // setconfirm(true);
              // setTimeout(() => {
              //   setconfirm(false)
              //   history.push('/teachermainpage')
              // }, 3000);
              // alert("course has been added now");
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        })
      }).catch(() => {
        console.log("cant upload file");
      });

    }
    else {
      alert("log-in first")
    }
    // ADDING DOWNLOADURL TO DATABASE

  };



  const editfiles = (e) => {
    const currentUser = firebase.auth().currentUser;

    // if (file) {
    //   console.log('file is selected waheed');
    // }
    // else {
    //   console.log('no file selected')
    // }


    if (file) {
      var storageRef = firebase.storage().ref();
      console.log('user exists');

      if (currentUser) {
        var uploadtask = storageRef.child(`/courseimage/${currentUser.uid}/${file.name + Math.random()}`);


        uploadtask.put(file).then((snapshot) => {
          // console.log(snapshot);

          uploadtask.getDownloadURL().then((url) => {

            console.log(url);

            Firestore.collection("courses").doc(location.state?.coursedetails?.id).set({
              imgurl: url,
              title: title,
              learn: learn,
              requirement: requirements,
              description: description,
              totalLectures: totalLectures,
              languageMedium: languageMedium,
              teacheruid: currentUser.uid,
              videourl: videourl,
              isActive: true,
              teacherimg: props.userdata.udata?.imgurl
            }, { merge: true })
              .then(() => {
                // alert("course has been added");
                setconfirm(true);
                setTimeout(() => {
                  setconfirm(false)
                  history.push('/teachermainpage')
                }, 3000);
              })
              .catch((error) => {
                console.error("Error writing document: ", error);
              });
          })
        }).catch(() => {
          console.log("cant upload file");
        });

      }
      else {
        alert("log-in first")
      }
    }

    //if file is not selected
    else {
      if (currentUser) {
        console.log('file is not selected')
        // Firestore.collection('course').doc(coursedetails.id).collection(coursedetails.id)
        Firestore.collection("courses").doc(location.state?.coursedetails?.id).set({
          imgurl: location.state?.coursedetails?.imgurl,
          title: title,
          learn: learn,
          requirement: requirements,
          description: description,
          totalLectures,
          languageMedium,
          teacheruid: currentUser.uid,
          videourl: videourl,
          isActive: true,
          teacherimg: props.userdata.udata?.imgurl
        }, { merge: true })
          .then(() => {
            // alert("course has been updated");
            setconfirm(true);
            setTimeout(() => {
              setconfirm(false)
              history.push('/teachermainpage')
            }, 3000);
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      }
      else {
        alert("log-in first")
      }
    }
  };
  // ADDING DOWNLOADURL TO DATABASE




  // const [coursedetails, setCoursedetails] = useState();


  // const [title, setTitle] = useState('');
  // const [learn, setLearn] = useState('');
  // const [requirements, setRequirements] = useState('');
  // const [videourl, setVideourl] = useState('');


  useEffect(() => {
    console.log("teacher intended learners page")

    if (location.state?.coursedetails) {
      setfile(null)
      setTitle(location.state?.coursedetails?.title);
      setLearn(location.state?.coursedetails?.learn);
      setRequirements(location.state?.coursedetails?.requirement);
      setVideourl(location.state?.coursedetails?.videourl);
      setImg(location.state?.coursedetails?.imgurl);
      settotalLectures(location.state?.coursedetails?.totalLectures);
      setlanguageMedium(location.state?.coursedetails?.languageMedium);
      setdescription(location.state?.coursedetails?.description);

    }
    // console.log(location.state?.coursedetails);
    // }
  }, [])

  // console.log(location.state?.requirement)


  // FOR CONFIRMATION MESSAGE
  const [confirm, setconfirm] = useState(false)

  // FORM VALIDATION

  const onSubmit = (data, e) => {
    if (location.state?.coursedetails) {
      editfiles(e)
    }
    else {
      uploadfiles(e)
    }
  }

  const { register, handleSubmit, formState: { errors }, reset } = useForm()

  // FORM VALIDATION


  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const come = async (e) => {
    setShow(true)
    // setTimeout(() => {
    //   setShow(false)
    // }, 2000);
  }

  return (
    <>
      <Navbar />
      {/* <Searchbar /> */}
      <button onClick={(e) => come(e)}>done</button>
      <TeacherStructure>

        <div class="container intended-learners my-5">

          <div class="dog row">
            <div className='col-md-6'>
              <h3 class="py-4 px-5">Add New Course</h3>
            </div>
            {location.state?.coursedetails ?
              <div class="col-md-6">
                <button class="p-3 text-white bg-dark border rounded ">
                  <Link to={{
                    pathname: "./teacherlectures",
                    state: {
                      coursedetails: location.state?.coursedetails
                    }
                  }}
                    class="text-white text-decoration-none">
                    GOTO LECTURES</Link>
                </button>
              </div>
              : <></>
            }
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <p class="pt-4 pb-0 px-5 bold">What about a Course title?
            </p>
            <div class="intend-lrn-search mb-3">
              <input name='title'
                class="form-control py-3 ps-3"
                placeholder="Example: C#, Java etc"

                defaultValue={location.state?.coursedetails?.title}

                {...register('title', {
                  required: "fill this field"
                })
                }
                onChange={(e) => { setTitle(e.target.value) }}
              />

              <p className='text-danger'>{errors?.title?.message}</p>
            </div>


            <p class="pt-4 pb-0 px-5 bold">What will students learn in this course?
            </p>
            <p class="px-5">Please enter the learning objectives or outcomes that learners can expect to achieve after
              completing
              your course.</p>

            <div class="intend-lrn-search mb-3">
              <input
                name='learn'
                class="form-control py-3 ps-3"
                placeholder="Example: Define the roles and reponsibilities of a project manager"
                defaultValue={location.state?.coursedetails?.learn}
                {...register('learn', {
                  required: "fill this field"
                })
                }

                onChange={(e) => { setLearn(e.target.value) }}
              />
              <p className='text-danger'>{errors?.learn?.message}</p>

            </div>


            <p class="pt-4 pb-0 px-5 bold">What are the requirements or prerequisites for taking your course?
            </p>
            <p class="px-5">List the required skills, experience, tools or equipment learners should have prior to taking your
              course.
              If there are no requirements, use this space as an opportunity to lower the barrier for beginners.</p>

            <div class="intend-lrn-search mb-3">
              <input name='requirements'
                class="form-control py-3 ps-3" type="search"
                placeholder="Example: No Programming experience needed. You will learn everythin you need."
                aria-label="Search"
                defaultValue={location.state?.coursedetails?.requirement}
                {...register('req', {
                  required: "fill this field"
                })
                }

                onChange={(e) => { setRequirements(e.target.value) }}
              />
              <p className='text-danger'>{errors?.req?.message}</p>

            </div>


            <p class="pt-4 pb-0 px-5 bold">Enter some description for the course!
            </p>

            <div class="intend-lrn-search mb-3">
              <input name='description'
                defaultValue={location.state?.coursedetails?.description}
                {...register('desc', {
                  required: "fill this field"
                })
                }
                onChange={(e) => { setdescription(e.target.value) }}
                class="form-control py-3 ps-3" type="search"
                placeholder="Example: js is market top level language etc"
                aria-label="Search" />
              <p className='text-danger'>{errors?.desc?.message}</p>

            </div>

            {/* for uploading image  */}

            <p class="pt-4 pb-0 px-5 bold">Enter Total Number of Lectures !
            </p>
            <div class="intend-lrn-search mb-3">
              <input name='totallectures'
                defaultValue={location.state?.coursedetails?.totalLectures}
                {...register('totalLect', {
                  required: "fill this field",
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "Enter valid Number"
                  }
                })
                }
                onChange={(e) => { settotalLectures(e.target.value) }}
                class="form-control py-3 ps-3" type="search"
                placeholder="Example: 10 , 30"
                aria-label="Search" />
              <p className='text-danger'>{errors?.totalLect?.message}</p>

            </div>

            <p class="pt-4 pb-0 px-5 bold">Enter Medium of Communication !
            </p>
            <div class="intend-lrn-search mb-3">
              <input name='mediumcommunication'
                defaultValue={location.state?.coursedetails?.languageMedium}
                {...register('medCommunication', {
                  required: "fill this field"
                })
                }
                onChange={(e) => { setlanguageMedium(e.target.value) }}
                class="form-control py-3 ps-3" type="search"
                placeholder="Example: English, Urdu etc"
                aria-label="Search" />
              <p className='text-danger'>{errors?.medCommunication?.message}</p>

            </div>


            <p class="pt-4 pb-0 px-5 bold">What about Course Preview Image ?
            </p>
            {location.state?.coursedetails ?
              <div class="intend-lrn-search mb-3">
                <img src={location?.state?.coursedetails?.imgurl} alt="no image found" />
              </div>
              : <></>
            }

            <div class="intend-lrn-search mb-3">
              <input type='file'
                name='fileimage'
                {...!img ?
                  {
                    ...register('file', {
                      required: "fill this field"
                    })
                  }
                  :
                  null
                }
                onChange={showFile}
                class="bg-dark text-white form-control py-3 ps-3"
                aria-label="Search" />
              {!img ?
                <p className='text-danger'>{errors?.file?.message}</p>
                :
                <></>
              }

            </div>

            {/* for uploading image  */}


            {/* for course promo video  */}

            <p class="pt-4 pb-0 px-5 bold">Provide link for promo video.
            </p>
            <div class="intend-lrn-search mb-3">
              <input type='text'
                name='promovideo'
                placeholder='Enter promo video'
                defaultValue={location.state?.coursedetails?.videourl}
                {...register('videourl', {
                  required: "fill this field"
                })
                }
                onChange={(e) => { setVideourl(e.target.value) }}
                class="form-control py-3 ps-3"
                aria-label="Search" />
              <p className='text-danger'>{errors?.videourl?.message}</p>

            </div>

            {/* for course promo video  */}

            <div class="intend-lrn-search mb-5 py-3">
              <button class="btn btn-dark w-50 p-2" type="submit">
                <a class="text-decoration-none text-white">{location.state?.coursedetails ? 'Edit Course' : 'Add Course'}</a>
              </button>
              {
                confirm ? <h4 className='text-danger mt-4'>Course {location.state?.coursedetails ? 'Edited' : 'Added'}  Successfully</h4>
                  : <></>
              }
            </div>
          </form>

        </div>


      </TeacherStructure>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header >
          <Modal.Title className='text-center'>Kindly Wait</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Your Course will be Added shortly!
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer> */}
      </Modal>

      <Footer />

    </>
  )
}
