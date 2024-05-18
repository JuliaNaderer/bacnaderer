import '../App.css';
export const Home = () => {

  return (
    <div className="App">
      <header className="App-header">
        <a href="./login"><img src='../puk.png' alt="puk3" href="../overview"></img></a>
        <br></br>
        <br></br>
        <a className='homeButton' href='../login' >Login</a>
        <br></br>
        {/*<a className='homeButton' href='../register' >Register</a>*/}
      </header>
    </div>
  )
} 