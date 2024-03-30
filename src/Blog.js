import React from "react";
import cheetahQuicksort from './assets/cheetah-quicksort.jpg';
import unionFindBlocks from './assets/blocks-symmetry.jpg';

import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const Blog = () => {
  return (
    <div className="blog-layout">


      <div className="leftContainer"> 
        <h1 className="article-section-header"> By Topic </h1>
        <p> Sorting </p>
        <p> Trees </p>
      </div>

      <div className="rightContainer" >
      <h1 className="article-section-header"> Algorithms </h1>
            <div className="article-containers">
                <Card className="blogs">
                  <img
                    src={cheetahQuicksort}
                    alt="cheetah-quicksort"
                    className='image'
                  />
                  <Card.Body >

                    <Card.Title className="title">Quicksort faster than a cheetah</Card.Title>
                    <Card.Text>
                    Quicksort is one of the fastest algorithms for arrays. However it has its 
                    drawbacks with other data structures ...
                    </Card.Text>

                    <br/>
                    <div className="read-more">
                      <Link to="/blog/cheetah-quicksort">Read More</Link>
                    </div>
                  </Card.Body>
                </Card>

                {/* Other blog */}
                <Card className="blogs">
                  <img
                    src={unionFindBlocks}
                    alt="blocks-union-find"
                    className='image'
                  />
                  <Card.Body >

                    <Card.Title className="title">Union Find the pixels</Card.Title>
                    <Card.Text>
                    Union find is fundamental to many applications like video graphics processing...
                    </Card.Text>

                    <br/>
                    <div className="read-more">
                      <Link to="/blog/cheetah-quicksort">Read More</Link>
                    </div>
                  </Card.Body>
                </Card>

            </div>     
      </div>
     
     


      {/* </div> */}
    </div>
  );
};

export default Blog;
