import React from 'react'
import Searchbar from '../../components/searchbar';
import Navbar from '../../components/navbar';
import Textbox from '../../components/textbox';

import Aboutus from '../aboutus';
import Onlineverification from '../onlineverification';
import CoursesPage from '../courses'


import Footer from '../../components/footer';
import Comments from '../../components/comments';
// import { BrowserRouter as Router, Route } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import MainPage from '../main';

export default function ContactUs({ title }) {
  return (
    // <Router>
    <>


      {/* <!---  CONTACT US TEXT  ---> */}



      {/* <Route path='/' exact render={(props) => ( */}
      {/* <> */}
      <Navbar title={title} />
      {/* <Searchbar /> */}

      <section class="contactus-map pt-5">
        <div class="txt-container text-center">
          <div class="row">
            <h2 class="mb-3">Contact <span class="word-color">Us</span></h2>
            {/* <p>Call us today and a representative will be in touch shortly.</p> */}
          </div>

          <div class="row my-4">
            <div class="col-md-4">
              <h4>E-Learning</h4>
              <p>Thank you for your interest in our FYP-Project</p>
            </div>

            <div class="col-md-4">
              <h4>Members</h4>
              <p>Haris Ahmed Rana</p>
              <p>Junaid Tareen</p>
              <p>Abdul Waheed</p>

            </div>

            <div class="col-md-4">
              <h4>CONTACT INFO</h4>
              <p>Phone: +92 336 3265 224</p>
              <p>Phone: +92 336 3017 073</p>
              <p>Phone: +92 344 2846 824</p>
            </div>
          </div>

        </div>


        <div class="go">
          <iframe
            src="https://maps.google.com/maps?q=Gulshan%20e%20iqbal&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"
            allowfullscreen></iframe>

          {/* <!-- <div class="haha"> --> */}
          {/* <div class="king col-md-4 bg-light">
            <form>
              <div class="form-group mt-3">
                <h2 class="text-center "><span styles="color: brown;">GET IN TOUCH</span></h2>
              </div>


              <Textbox type='text' placeholder='Name' />

              <Textbox type='email' placeholder='Email' />

              <Textbox type='password' placeholder='Password' />

              <Textbox type='text' placeholder='Captcha Code' />

              <div class="form-group mt-3">
                <input type="submit" value="Apply Now" class="btn btn-success w-100" />
              </div>

            </form>
          </div> */}
          {/* <!-- </div> --> */}
        </div>

      </section>
      <Comments />

      <Footer />
      {/* </> */}

      {/* // )} /> */}


      {/* <Route path='/courses' component={CoursesPage} />

        <Route path='/verification' component={Onlineverification} />

        <Route path='/main' component={MainPage} />

        <Route path='/about' component={Aboutus} /> */}


    </>
    // </Router>


  )
}
