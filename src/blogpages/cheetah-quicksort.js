// CheetahQuicksort.js
import React from 'react';
import cheetahpic from '../assets/cheetah-quicksort.jpg';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'; // Import the Dracula theme

const codeExample = `
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)
`;


const CheetahQuicksort = () => {
  return (
    <div className="App">
      

      <div className="article-bg">

            <div className="article-body">
            {/* <header className="problem-header"> */}
            
            <div className='article-title'>

              <h1>Cheetah Quicksort Page</h1>
            </div>
            
          
              <img
                src={cheetahpic}
                alt="cheetah-quicksort"
                className='image-article'
              />

            <br/> 
            <p>
              Quicksort is a sorting algorithm that efficiently sorts an array by dividing it into smaller subarrays,
              recursively sorting the subarrays, and then combining them. Let's explore how quicksort is as fast as a cheetah!
            </p>
            <br/>
            <h2>Algorithm Overview</h2>
            <p>
              Quicksort follows the divide-and-conquer strategy. It selects a 'pivot' element from the array and partitions
              the other elements into two subarrays according to whether they are less than or greater than the pivot.
              The subarrays are then recursively sorted.
            </p>
            <br/> 

            <h2>Why Cheetah?</h2>
            <p>
              Quicksort is known for its speed, and comparing it to a cheetah emphasizes its agility and efficiency.
              The algorithm's average and best-case time complexity is O(n log n), making it one of the fastest sorting algorithms.
            </p>

            <br/> 
            <h2>Implementation</h2>
            <p>
              The implementation of quicksort involves choosing a pivot, partitioning the array, and recursively sorting
              the subarrays. The efficiency of quicksort lies in its ability to minimize the number of comparisons and swaps.
            </p>
            
            
            <SyntaxHighlighter language="python" style={dracula}>
                {codeExample}
            </SyntaxHighlighter>
      
      
            <br/> 

            </div>

      </div>
     
    </div>
  );
};

CheetahQuicksort.slug = 'cheetah-quicksort'; // Unique slug for the route

export default CheetahQuicksort;
