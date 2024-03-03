import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

const navbar = {
    backgroundColor: "#282c34",
    padding: "20px 70px",
    textAlign: "right",
    color: "#fff",
}

const para = {
    margin: 0,
    fontSize: "17px",
    cursor: "pointer"
}

function Layout() {
    const navigate = useNavigate()
    return (
        <>
            <div style={navbar}>
                <p style={para} onClick={() => {
                    localStorage.removeItem("loggedUser");
                    document.location.reload(navigate("/"));
                }}>Logout</p>
            </div>
            <div style={{ width: "60%", margin: "20px auto" }}>
                <Outlet />
            </div>
        </>
    )
}

export default Layout