import {
    BsSearch
} from "react-icons/bs";

import profilePic from "../assets/profile_pic.png";

const Navbar = () => {
    return (
        <div className="navbar absolute top-0 left-0 z-10" style={{background: "linear-gradient(to bottom, rgba(0,0,0,.6), transparent"}}>
            <div className="navbar-start">
                <a className="btn btn-ghost text-primary normal-case text-3xl mr-3" href="/">Netflix</a>

                <div className="navbar-center flex">
                    <ul className="menu text-white menu-horizontal px-1 ">
                        <li>
                            <a href="/tv-series">
                                Tv Series
                            </a>
                        </li>
                        <li>
                            <a href="/movies">
                                Movies
                            </a>
                        </li>
                        <li className="hidden md:flex">
                            <a href="/new-and-popular">
                                New & Popular
                            </a>
                        </li>
                        <li>
                            <a href="/my-list">
                                My List
                            </a>
                        </li>
                        <li className="hidden md:flex">
                            <a href="/by-language">
                                By Language
                            </a>
                        </li>
                    </ul>
                </div>
            </div>


            <div className="navbar-end hidden lg:flex">

                <BsSearch className="text-2xl mr-5 text-secondary"/>

                <div className="avatar">
                    <div className="w-10 rounded mr-3">
                        <img src={profilePic} alt="Tailwind-CSS-Avatar-component" />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Navbar;