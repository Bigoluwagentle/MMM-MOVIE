import "./SignUp.css";
import { Link } from "react-router-dom";
function SignUp(){
    function Create() { 
        const username = document.getElementById("signupUsername").value; 
        const password = document.getElementById("signupPassword").value; 
        
        if (!username || !password) { 
            alert("fill all the fields");
        } 
        let users = JSON.parse(localStorage.getItem("users")) || []; 
        if (username && password) { 
            document.querySelector("#login").click();
            users.push({ username, password }); 
            localStorage.setItem("users", JSON.stringify(users));
        }else if(users.find(user => user.username === username || user.password === password)){
            alert("Email already exists.");
        }
    }
    return(
        <>
            <section id="signup"> 
                <h1 style={{color: "#134544"}}>🎬 MMM MOVIE</h1>
                <h2 style={{color: "#134544"}}>Sign Up</h2> 
                <nav>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="signupUsername" placeholder="Username" /> 
                </nav>
                <nav>
                    <label htmlFor="username">Phone Number</label>
                    <input type="tel" id="phonenumber" placeholder="Phone Number" minLength="10" maxLength="11" /> 
                </nav>
                <nav>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="signupPassword" placeholder="Password" /> 
                </nav>
                <nav>
                    <button onClick={Create}>Sign Up</button> 
                </nav>
                <p style={{color: "black"}}>Already have an account <span onClick={() => {
                    document.querySelector("#login").click();
                }}>Login</span></p>
                <p>Copyright &copy; Money Must be Made 2025</p>
            </section>
            <Link to="/login" id="login"></Link>
        </>
    )
}

export default SignUp;