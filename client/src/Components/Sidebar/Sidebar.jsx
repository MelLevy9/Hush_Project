import React from 'react'
import './Sidebar.css'

export default function Sidebar() {
  return (
    <div className='sidediv'>
<button className="btn SideBtn" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
  ❕
</button>

<div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title" id="offcanvasExampleLabel">
        About
    </h5>
    <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div>
      The purpose of this site is to create a safe platform for everyone. No judgement. <br/>
      We have groups for people with the same interest or want to write about the same subject. <br/> <br/>
      For any requests, reviews or information, <br/>
      Please contact us through : <br/>
      Phone Number : 054-3017408 <br/>
      Email : mellevy2000@gmail.com  <br/><br/>
      We Hope You Enjoy Our Site!
    </div>
    <img className='background-image' src='/lineDrawing.png' alt='hush line drawing'></img>
  </div>
</div>
</div>
  )
}
