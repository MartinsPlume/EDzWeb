/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// import dependencies
import youtube from 'react-youtube'
import {GetId} from '../../services/YoutubeUrlExtractorService'

// reactstrap components
import { Button, Container } from "reactstrap";
import YouTube from "react-youtube";

const videoUrl = 'https://www.youtube.com/watch?v=9RuNWWdhHSo'

// core components

function TeacherHome() {

    let pageHeader = React.createRef();

    React.useEffect(() => {
      if (window.innerWidth < 991) {
        const updateScroll = () => {
          let windowScrollTop = window.pageYOffset / 3;
          pageHeader.current.style.transform =
            "translate3d(0," + windowScrollTop + "px,0)";
        };
        window.addEventListener("scroll", updateScroll);
        return function cleanup() {
          window.removeEventListener("scroll", updateScroll);
        };
      }
    });
  
    return (
      <>
        <div
          style={{
            backgroundImage: "url(" + require("assets/img/daniel-olahh.jpg") + ")"
          }}
          className="page-header"
          data-parallax={true}
          ref={pageHeader}
        >
          <div className="filter" />
          <Container>
            <div className="motto text-center">
              <h1>EDz Education</h1>
                <h3>Teacher</h3>
              <br />
              
              <YouTube
              videoId={GetId(videoUrl)}
              />
              
              <Button
                href="https://www.youtube.com/watch?v=wrOM4zJcJjM&t="
                className="btn-round mr-1"
                color="neutral"
                target="_blank"
                outline
              >
                <i className="fa fa-play" />
                More info
              </Button>
            </div>
          </Container>
        </div>
      </>
    );
  }

export default TeacherHome