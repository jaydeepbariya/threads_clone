import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import logo from "../../assets/dark-logo.svg";
import { AiFillHome } from "react-icons/ai";
import { IoSearch, IoCreate } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../state/reducers/authSlice";
import { IoMdLogIn, IoMdLogOut } from "react-icons/io";

const Navbar = () => {
  const { username } = useParams();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutUser = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div className="w-full flex justify-between items-start py-6">
      {/* Logo */}
      <Link to={`/${username}`}>
        <img src={logo} height={50} width={50} alt="navbar logo" />
      </Link>

      {/* Navlinks */}
      <ul className="w-1/3 flex justify-between items-center">
        <li>
          <Link to={"/"}>
            <AiFillHome
              size={35}
              className="transition-all duration-200 hover:opacity-70"
            />
          </Link>
        </li>
        <li>
          <Link to={"/search"}>
            <IoSearch
              size={35}
              className="transition-all duration-200 hover:opacity-70"
            />
          </Link>
        </li>
        <li>
          <Link
            to={"/new-thread"}
            className="transition-all duration-200 hover:opacity-70"
          >
            <IoCreate size={35} />
          </Link>
        </li>
        <li>
          <Link to={"/profile"}>
            <CgProfile
              size={35}
              className="transition-all duration-200 hover:opacity-70"
            />
          </Link>
        </li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-6">
        {isAuthenticated ? (
          <button onClick={logoutUser}>
            <IoMdLogOut size={35} />
          </button>
        ) : (
          <button>
            <Link to={"/login"}>
              <IoMdLogIn size={35} />
            </Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
