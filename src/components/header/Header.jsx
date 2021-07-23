import './Header.css';
import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Header() {
    const [value, setValue] = useState('');
    const history = useHistory();

    const handleChange = (e) => {
        setValue(e.target.value)
    }

    const handleClick = (e) => {
        e.preventDefault();
        if (value) {
            history.push(`/search/${value}`)
        }
        setValue('')
    }
    

    return (
        <nav className="navbar sticky-top justify-content-around">
            <a href="/" className=" header-brand navbar-brand ">MOVIEAPP🎬</a>
            <form className="form-inline">
                <div className="p-1 bg-light rounded rounded-pill shadow-sm form-search">
                    <div className="input-group">
                        <input
                            type="search"
                            placeholder="Search"
                            aria-describedby="button-addon1"
                            value={value}
                             onChange={handleChange}
                            className="form-control border-0 bg-light"
                        />
                        <div className="input-group-append">
                            <button
                                id="button-addon1"
                                type="submit"
                                className="btn btn-link text-warning"
                                onClick={handleClick}
                            ><i className="fa fa-search"></i></button>
                        </div>

                    </div>

                </div>
    
            </form>
        </nav>
    );
}

export default Header;