import {
    BsSearch
} from "react-icons/bs";

import profilePic from "../assets/profile_pic.png";

const Navbar = () => {
    return (
        <div className="navbar bg-neutral">
            <div className="navbar-start">
                <a className="btn btn-ghost text-primary normal-case text-3xl mr-10">Netflix</a>

                <div className="navbar-center hidden md:flex lg:flex">
                    <ul className="menu text-white menu-horizontal px-1 ">
                        <li>
                            <a href="/">
                                Home
                            </a>
                        </li>
                        <li>
                            <a href="/tvseries">
                                Tv Series
                            </a>
                        </li>
                        <li>
                            <a href="/movies">
                                Movies
                            </a>
                        </li>
                        <li>
                            <a>
                                New & Popular
                            </a>
                        </li>
                        <li>
                            <a>
                                My List
                            </a>
                        </li>
                        <li>
                            <a>
                                By Language
                            </a>
                        </li>
                    </ul>
                </div>
            </div>


            <div className="navbar-end">

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