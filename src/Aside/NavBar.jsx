import "./NavBar.css";
import { Link } from "react-router-dom";
function NavBar(){
    function imga(){
        document.querySelectorAll("#bar").forEach(img => {
            img.addEventListener('click', (e) => {
                e.preventDefault();
                document.querySelectorAll("#bar").forEach(i => i.classList.remove('active'));
                img.classList.add('active');
            });
        });
    }
    imga();
    return(
        <>
            <div id="navbar">
                <div className="navbar">
                    <nav id="bar" className="active" onClick={() => {
                        document.querySelector("#dashboard").click();
                    }}>
                        <i class="fa-solid fa-house"></i>
                        <p id="home">Home</p>
                    </nav>
                    <nav id="bar" onClick={() => {
                        document.querySelector("#short").click();
                    }}>
                        <i class="fa-solid fa-medal"></i>
                        <p id="home">Shorts</p>
                        
                    </nav>
                    <nav id="bar" onClick={() => {
                        alert("Working on it")
                    }}>
                        <i class="fa-solid fa-download"></i>
                        <p>Saved</p>
                    </nav>
                    <nav id="bar" onClick={() => {
                        alert("Working on it");
                    }}>
                        <i class="fa-solid fa-user"></i>
                        <p>You</p>
                    </nav>
                </div>
                <Link to="/dashboard" id="dashboard"></Link>
                <Link to="/short" id="short"></Link>
            </div>
        </>
    )
}

export default NavBar;