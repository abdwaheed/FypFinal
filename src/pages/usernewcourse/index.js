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
import UserStructure from '../../components/userstructure';

export default function UserNewCourse(props) {

  const location = useLocation();
  const history = useHistory();

  if (props.auth === null) {
    history.push('/')
  }
  if (props.userdata?.teacher != undefined) {
    if (props.userdata?.teacher != false) {
      history.push('/teachermainpage')
    }
    else if (!location.state?.coursedata) {
      history.push('/userdashboard')
    }
  }

  const [jobsdata, setjobsdata] = useState()

  useEffect(() => {
    Firestore.collection('jobs').doc(location.state?.coursedata).get()
      .then((data) => {
        // data.forEach((ndata) => {
        // setjobsdata(prevData => [...prevData, { id: ndata.id, data: ndata.data().jobs }])
        setjobsdata({ id: data.id, data: data.data() })
        // console.log(ndata.data()?.jobs)
        // })
      })
  }, [])

  // jobsdata[0]?.data?.forEach((d) => {
  //   console.log(d)
  // })

  // jobsdata.map((ldata) => {
  //   console.log(ldata)
  // })
  // console.log(jobsdata?.data?.jobs?.jobs[0]?.title)
  // var aa= (jobsdata?.data?.jobs?.jobs[0]?.title).subs

  return (
    <>
      <Navbar />
      {/* <Searchbar /> */}


      <UserStructure email={props.userdata?.udata?.email} isStudent={true} value='hello'>

        <h3 class="py-3 px-4">Market-Jobs</h3>

        <div className='container text-dark sdd'>
          <div className='row'>

            {
              jobsdata ?
                jobsdata?.data?.jobs?.jobs?.map((ndata, index) => (
                  <>

                    <div key={index} className='col-md-8 mx-auto scroll jobs  p-3 pt-4 mt-3'>
                      <h4>{ndata?.title}</h4>
                      <h6>{ndata?.source}</h6>

                      <li className='pt-2'>
                        <a className='text-decoration-none' target='_blank'
                          href={ndata?.detail_url}>Apply Now</a>
                      </li>
                      <p className='pt-3 desc-job'>{ndata?.description}</p>
                    </div>
                  </>

                ))
                :
                <></>
            }
          </div>
        </div>

        {/* <div class="new-th">
          <form action="">
            <table class="w-100">
              <thead>
                <tr>
                  <th>

                  </th>
                  <th class="pt-2">
                    SELECT NEW COURSE
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><input type="checkbox" class="helll" /></td>
                  <td>Powerpoint XL</td>
                </tr>
                <tr>
                  <td><input type="checkbox" class="helll" /></td>
                  <td>COREL DRAW 9-12</td>
                </tr>
                <tr>
                  <td><input type="checkbox" class="helll" /></td>
                  <td>ABC</td>
                </tr>
                <tr>
                  <td><input type="checkbox" class="helll" /></td>
                  <td>EXCEL</td>
                </tr>
                <tr>
                  <td><input type="checkbox" class="helll" /></td>
                  <td>WORD</td>
                </tr>
                <tr>
                  <td><input type="checkbox" class="helll" /></td>
                  <td>ZOOM</td>
                </tr>
                <tr>
                  <td><input type="checkbox" class="helll" /></td>
                  <td>HAWAAI</td>
                </tr>

              </tbody>
            </table>


          </form>
        </div> */}
      </UserStructure>

      <Footer />

    </>
  )
}
