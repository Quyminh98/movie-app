import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { useRouteMatch } from 'react-router-dom';
import { fetchSearchMovie } from '../../service';
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";


function Search() {
    const [movieList, setMovieList] = useState([])
    const params = useRouteMatch().params;
    useEffect(() => {
        const fetchAPI = async () => {
            setMovieList(await fetchSearchMovie(params.id));
        }
        fetchAPI();
    }, [params.id])

    console.log(movieList)

    const movieSearch = movieList.map((item, index) => {
        return (
            <div className="col-md-3 col-sm-6 mb-3 movie-item" key={index}>
                <div className="card">
                    <Link to={`/movie/${item.id}`}>
                        <img className="img-fluid poster-item" src={item.poster} alt={item.title}></img>
                    </Link>
                </div>
                    <Link to={`/movie/${item.id}`} className="link-detail ">
                        <div className="overlay-item mt-2">
                            <p className="movie-title" >{item.title}</p>
                            <p className="movie-rating">Rated: {item.rating}</p>
                            <ReactStars count={item.rating} size={20} color={"#f4c10f"}></ReactStars>
                        </div>
                    </Link>
            </div>
        )
    })



    return (
        <div className="container">
            <div className="row mt-3">
                <p className="font-weight-bold" style={{ color: "#5a606b", fontSize: 30 }}>
                    Search results: '{params.id}'
                </p>
            </div>
            <div className="row mt-3">
                {movieSearch}
            </div>

            {/* Footer */}
            <hr className="mt-5" style={{ borderTop: "1px solid #5a606b" }}></hr>
            <div className="row">
                <div className="col-md-4 col-sm-12">
                    <p className="text-center" style={{ color: " #756666", fontSize: 20 }}>Question? Contact us now</p>
                    <ul className="text-center" style={{paddingLeft: 0}}>
                        <li className="infomation-item">
                            <a href="/" className="link-contact" >
                                <i className="fab fa-facebook"><span style={{marginLeft: 5}}>Facebook</span></i>
                            </a>
                        </li>
                        <li className="infomation-item">
                            <a href="/" className="link-contact">
                                <i className="fab fa-youtube"><span style={{marginLeft: 5}}>Youtube</span></i>
                            </a>
                        </li>
                        <li className="infomation-item">
                            <a href="/" className="link-contact">
                                <i className="fab fa-twitter"><span style={{marginLeft: 5}}>Twitter</span></i>
                            </a>
                        </li>
                        <li className="infomation-item">
                            <a href="/" className="link-contact">
                                <i className="fab fa-instagram"><span style={{marginLeft: 5}}>Instagram</span></i>
                            </a>
                        </li>  
                    </ul>
                </div>

                <div className="col-md-8 col-sm-12">
                    <p className="text-center" style={{ color: " #756666", fontSize: 20 }}>Thank you for watching!!!</p>
                    <div className="infomation text-center">
                        <ul style={{flex: 1}}>
                            <li className="infomation-item">FAQ</li>
                            <li className="infomation-item">Terms of Use</li> 
                            <li className="infomation-item">Help Center</li>
                            <li className="infomation-item">Cookie Preferences</li>
                        </ul>
                        <ul style={{flex: 1}}>
                            <li className="infomation-item">Media Center</li>
                            <li className="infomation-item">Privacy</li>
                            <li className="infomation-item">Legal Notices</li>
                            <li className="infomation-item">Corporate Information</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Search;