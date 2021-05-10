import { useEffect, useState } from 'react';
import axios from 'axios';

import Loading from './Loading';

// remember https
// API key = j11zhdGT1mZ4W4x6l2XFeg2Ygg2vy6qB
// GIF url = api.giphy.com/v1/gifs/trending

const GifCall = () => {

  const [data, setData] = useState([]);
  //need a new state for loading screen/icon - boolean default false
  const [loading, setLoading] = useState(false);

  const [glitch, setGlitch] = useState(false);

  const [find, setFind] = useState('');


  useEffect(() => {
    const fetchAPI = async () => {
      // set glitch to false before API call - use 
      //try/fetch for call
      setGlitch(false);
      // loading screen/icon
      setLoading(true)

      try {

        const result = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: "j11zhdGT1mZ4W4x6l2XFeg2Ygg2vy6qB",
            // limit:10000
          }
        });

        console.log(result)
        // there are two data params in the API 
        setData(result.data.data);

      } catch (err) {

        setGlitch(true)
        // console.log(err);
        //timeout for glitch error message
        setTimeout( () => setGlitch(false) , 6000)

      }




      // state change and re-render once data acquired
      setLoading(false)
    }

    fetchAPI()
    //dont forget your dependency array 
  }, [])


  const renderGiphy = () => {
    //loading screen 
    if(loading) {
      return  <Loading/> 
    }
    return data.map(el => {
      return (
        <div key={el.id} className="gifbox">
          <img alt="pic" 
          src={el.images.fixed_height.url} />
        </div>
      )
    })
  }

  const renderGlitch = () => {
    if(glitch) {
      return (
        <div className="alert alert-info alert-dismissible fade show" role="alert">
        Unable to access your sweet ass GIFs, please try again in a little bit!     
        </div>
      )
    }
  };



  const searchChange = (e) => {
    setFind(e.target.value)
  };


// handle API call on button click - similar to call above
const handleSubmit = async event => {
  event.preventDefault();
  setGlitch(false);
  setLoading(true);

  try {
    const result = await axios("https://api.giphy.com/v1/gifs/search", {
      params: {
        api_key: "j11zhdGT1mZ4W4x6l2XFeg2Ygg2vy6qB",
        q: find,
        limit: 100
      }
    });
    setData(result.data.data);
  } catch (err) {
    setGlitch(true);
    setTimeout(() => setGlitch(false), 6000);
  }

  setLoading(false);
};




  return (
    <div className= "m-2">
    {renderGlitch()}
    <form 
    className="form-inline justify content-center m-2">
      <input 
      type="text" 
      placeholder="Find that GIF" 
      className="form-control" 
      onChange={searchChange}
      value={find} />
      <button 
      onClick ={handleSubmit}
      type ='submit' 
      className='btn btn-primary mx-2'>Show Me The GIFs
      </button> 
    </form>
    <div className="container gifs">
    {renderGiphy()}
    </div>
    </div>
  )
}

export default GifCall;