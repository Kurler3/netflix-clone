import {
    BsSearch
} from "react-icons/bs";
import { useRef, useCallback, useState, useEffect } from 'react';
import profilePic from "../assets/profile_pic.png";
import { useAppDispatch } from "../redux/store";
import { setSearchText } from "../redux/slices/app.slice";
import { navigateTo } from "../utils/functions/common.functions";
import { searchTvSeriesByName } from "../redux/actions/tvseries.actions";
import { searchMoviesByTitle } from "../redux/actions/movies.actions";


const Navbar = () => {

    const appDispatch = useAppDispatch();

    ////////////////////////////////////////
    // STATE ///////////////////////////////
    ////////////////////////////////////////

    const searchBoxRef = useRef<HTMLInputElement>(null);
    const searchContainerRef = useRef<HTMLDivElement>(null);

    const [isSearching, setIsSearching] = useState(false);

    ////////////////////////////////////////
    // FUNCTIONS ///////////////////////////
    ////////////////////////////////////////

    const handleClickSearchIcon = useCallback(() => {
        // IF WAS OPEN
        if (isSearching) {
            // CLEAR VALUE
            if (searchBoxRef.current) searchBoxRef.current.value = "";
        }

        setIsSearching(!isSearching);

    }, [isSearching]);

    const handleSearch = useCallback(() => {
        if(searchBoxRef.current && searchBoxRef.current?.value.length > 0) {

            // SET NEW SEARCH TEXT IN APP STATE
            appDispatch(setSearchText(searchBoxRef.current?.value))

            // SET NEW TV SERIES VALUE
            appDispatch(searchTvSeriesByName({
                name: searchBoxRef.current?.value,
                page: 1,
            }));

            // SET NEW MOVIES SERIES VALUE
            appDispatch(searchMoviesByTitle({
                title: searchBoxRef.current?.value,
                page: 1,
            }))

            // GO TO SEARCH PAGE
            navigateTo(`/search`)
        }
    }, [appDispatch]);

    const onBlurSearchContainer = useCallback((event: React.FocusEvent<HTMLDivElement>) => {
        const container = event.currentTarget;
        const relatedTarget = event.relatedTarget as HTMLElement | null;

        if (!relatedTarget || !container.contains(relatedTarget)) {
            // relatedTarget is null or not a child of container
            handleClickSearchIcon();
        }
    }, [handleClickSearchIcon]);

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLInputElement>) => {
        if(event.key === "Enter" && searchBoxRef.current && searchBoxRef.current?.value.length > 0) {
            handleSearch();
        }
    }, [handleSearch]);

    ////////////////////////////////////////
    // USE EFFECT //////////////////////////
    ////////////////////////////////////////

    useEffect(() => {
        if (isSearching && searchContainerRef.current) {
            searchContainerRef.current.focus();
        }
    }, [isSearching]);

    ////////////////////////////////////////
    // RENDER //////////////////////////////
    ////////////////////////////////////////

    return (
        <div className="navbar absolute top-0 left-0 z-10" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,.6), transparent" }}>
            <div className="navbar-start">
                <a className="btn btn-ghost text-primary normal-case text-3xl mr-3" href="/">Fake Netflix</a>

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
                    </ul>
                </div>
            </div>


            <div className="navbar-end hidden lg:flex">

                <div className="flex items-center justify-end" tabIndex={0} ref={searchContainerRef} onBlur={onBlurSearchContainer}>

                    <BsSearch
                        className="text-2xl mr-5 text-secondary cursor-pointer hover:text-neutral transition"
                        onClick={!isSearching ? handleClickSearchIcon : handleSearch}
                    />

                    {
                        isSearching && (
                            <input
                                className="transition rounded-md p-2 mr-8 focus:outline-none open-from-right"
                                type="search"
                                ref={searchBoxRef}
                                onClick={(e) => e.stopPropagation()}
                                onKeyDown={handleKeyDown}
                            />
                        )
                    }
                </div>



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