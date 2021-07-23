import './Home.css'
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { fetchMovies,fetchGenre, fetchMovieByGenre, fetchPersons, fetchTopratedMovie } from '../../service';
import RBCarousel from "react-bootstrap-carousel";
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import { Link } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";


function Home() {
    const [nowPlaying, setNowPlaying] = useState([]);
    const [genres, setGenres] = useState([]);
    const [movieByGenre, setMovieByGenre] = useState([]);
    const [persons, setPersions] = useState([]);
    const [topRated, setTopRated] = useState([]);
    const [isLoaded, setIsLoaded] =useState(false)


    useEffect(() => {
        const fetchAPI = async () => {
            setNowPlaying(await fetchMovies());
            setGenres(await fetchGenre());
            setMovieByGenre(await fetchMovieByGenre());
            setPersions(await fetchPersons());
            setTopRated(await fetchTopratedMovie());
            setIsLoaded(true)
        }

        fetchAPI();
    }, [])

    const handleGenreClick = async (genre_id) => {
        setMovieByGenre(await fetchMovieByGenre(genre_id))
    }

    const movies = nowPlaying.slice(0, 5).map((item, index) => {
        return (
            <div className="slider" key={index}>
                <div className="carousel-center slider-container">
                    <img className="slider-img" src={item.backPoster} alt={item.title} />
                </div>
                <div className="carousel-center slider-icon">
                    <a href={`/movie/${item.id}/`}>
                        <i className="far fa-play-circle" style={{ fontSize: 70, color: '#fcf9c2' }}></i>
                    </a>
                </div>
                <div className="slider-overlay">
                    <div className="carousel-caption" style={{fontSize: 30}}>
                        {item.title}
                    </div>
                </div>
            </div>
        )
    })

    const genreList = genres.map((item, index) => {
        return (
            <li className="list-inline-item" key={index}>
                <button onClick={() => handleGenreClick(item.id)} type="button" className="btn btn-outline-light">
                    {item.name}
                </button>
            </li>
        )
    })

    const movieList = movieByGenre.slice(0, 8).map((item, index) => {

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
                            <p className="movie-rating" >Rated: {item.rating}</p>
                            <ReactStars count={item.rating} size={20} color={"#f4c10f"}></ReactStars>
                        </div>
                    </Link>
            </div>
        )
    })

    const trendingPersons = persons.slice(0, 4).map((item, index) => {
        return (
            <div className="col-md-3 col-sm-6 text-center" key={index}>
                <img src={item.profileImg} alt={item.name} className="img-fluid rounded-circle " />
                <p className="font-weight-bold text-center mt-3">{ item.name}</p>
            </div>
        )
    })

    const topRatedList = topRated.slice(0, 4).map((item, index) => {
        return (
            <div className="col-md-3 col-sm-6 mt-2 mb-3 movie-item" key={index}>
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

    if (isLoaded === false) {
        return <h2 className="text-center" style={{color:  "#756666", marginTop: 100}}>Please waiting...</h2>
    }

    return (
        <div className="container">

            {/* Carousel */}
            <div className="row mt-4">
                <div className="col carousel">
                    <RBCarousel
                        autoplay={true}
                        pauseOnVisibility={true}
                        slideshowSpeed={5000}
                        version={4}
                        className="carousel-fade"
                    >
                        {movies}
                    </RBCarousel>
                </div>
            </div>

            {/* Genres  */}
            <div className="row mt-4 ">
                <div className="col">
                    <ul className="list-inline">
                        {genreList}
                    </ul>
                </div>
            </div>

            {/* Movie list  */}
            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{ color: "#5a606b", fontSize: 20 }}>
                        NOW PLAYING
                    </p>
                </div>
                <div className="col icon-right">
                    <i className="far fa-arrow-alt-circle-right"></i>
                </div>
            </div>
            
            <div className="row">
                {movieList}
            </div>

            {/* Actor list  */}
            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{ color: "#5a606b", fontSize: 20 }}>
                        TRENDING PERSIONS ON THIS WEEK
                    </p>
                </div>
                <div className="col icon-right">
                    <i className="far fa-arrow-alt-circle-right"></i>
                </div>
            </div>
            <div className="row mt-3">{trendingPersons}</div>
            
            {/* Top rated list  */}
            <div className="row mt-3">
                <div className="col">
                    <p className="font-weight-bold" style={{ color: "#5a606b", fontSize: 20 }}>
                        TOP RATED MOVIE
                    </p>
                </div>
                <div className="col icon-right">
                    <i className="far fa-arrow-alt-circle-right"></i>
                </div>
            </div>
            <div className="row">{topRatedList}</div>
            
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

export default Home;