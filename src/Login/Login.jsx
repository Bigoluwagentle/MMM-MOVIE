import "./Login.css";
import { Link } from "react-router-dom";
function Login(){
    const handle = (e) => {
        e.preventDefault();
        let userInput = document.getElementById("loginUsername").value;
        const userInputValue = userInput;
        sessionStorage.setItem("username", userInputValue);
    };
    function login() { 
        const username = document.getElementById("loginUsername").value; 
        const password = document.getElementById("loginPassword").value; 
        
        let users = JSON.parse(localStorage.getItem("users")) || []; 
        
        const validUser = users.find( 
            user => user.username === username && user.password === password 
        ); 
        
        if (validUser) { 
            document.getElementById("link").click();
            alert("login succussful");
        } else {
            alert("Invalid login details.");
        } 
    } 
    return(
        <>
            <section className="loginsection">
                <h1 style={{color: "#134544"}}>🎬 MMM MOVIE</h1>
                <form action="" onSubmit={handle} className="loginform">
                    <nav className="nav">
                        <legend>Login</legend>
                    </nav>
                    <nav>
                        <label>Username</label>
                        <input type="text" id="loginUsername" placeholder="Username" /> 
                    </nav>
                    <nav>
                        <aside className="aside">
                            <label>Password</label>
                            <li>Forgotten Password?</li>
                        </aside>
                        <input type="password" id="loginPassword" placeholder="Password" /> 
                    </nav>
                    <nav>
                        <button onClick={login}>
                            Login
                        </button>
                        <Link to="/dashboard" id="link"></Link>
                    </nav>
                </form>
                <p style={{color: "black"}}>Doesn't have an account <span onClick={() => {
                    document.querySelector("#create").click();
                }}>Create Account</span></p>
                <p>Copyright &copy; Geegstack Academy 2022</p>
            </section>
             <Link to="/Signup" id="create"></Link>
        </>
    )
}
export default Login;