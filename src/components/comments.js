import React from 'react'

export default function Comments() {
  return (
    <section class="comments">
      <div class="comment-container">
        <div class="row">
          <div class="col-md-5 text-center">
            <div className='d-flex justify-content-end'>


              <img src="./images/bulb1.png" alt="" class="pt-4 px-3 w-90" />
            </div>
          </div>

          <div class="col-md-7 text-left">
            <h4 class="pt-5 px-5 text-light">AN INVESTMENT IN KNOWLEDGE PAYS THE BEST INTEREST.</h4>
          </div>

          {/* <div class="col-md-5">
            <img src="./images/user-comment.PNG" alt="" class="pt-5 px-3 w-100" />
          </div> */}

        </div>
      </div>
    </section>
  )
}
