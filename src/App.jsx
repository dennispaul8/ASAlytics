import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import pic from "./img/HeaderL.png";
import Loading from './component/Loading';


function App() {

  const ASALIST_QUERY = `
  query MyQuery {
    asalist {
      results {
        available
        name
        assetId
        logo
      }
    }
  }
  `

  const [isLoading, setIsLoading] = useState(false);
  const [dS, setdS] = useState([])
  const [errorMessage, setErrorMessage] = useState("");
  
    const handleFetch = () => {
      setIsLoading(true);
      fetch("https://analytics-api.herokuapp.com/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: ASALIST_QUERY })
    })
      .then((response) => response.json())
      .then((data) => { setdS(data.data.asalist.results)
           setIsLoading(false)
          
        })
        .catch(() => {
           setErrorMessage("Unable to fetch user list");
           setIsLoading(false);
        });
    };
 



    const renderUser = (
      <main>
        <h1>
          List of Algorand Standard Assets <br /> on ASAlytics
        </h1>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: '32px', paddingTop:'80px' }}>

          {dS.map((asa) => (

            <div key={asa.assetId} className='box'>
              <img src={asa.logo} style={{ width: "13%" }} alt="" />
              <p>{asa.name}</p>
              <button className='btnn' style={{ backgroundColor: asa.available == true ? '#6FD791' : asa.available == false ? '#BC3131' : 'white' }} >
                {asa.available === true ? "Available" : "Unavailable"}
              </button>
            </div>

          ))}
        </div>
      </main>
    )

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light nav">
      <div className="container-fluid">
        <li className="nav-item">
        <img className="imgg" src={pic} alt="" />
        </li>
        <button onClick={handleFetch}  className="btn1">ANALYZE ASAs</button>
      </div>
    </nav>
    {isLoading ? <Loading /> : renderUser}
    {errorMessage && <div className="error">{errorMessage}</div>}
    </>
  )
}

export default App;
