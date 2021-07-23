import React, { useEffect, useState } from 'react';
import { fetchCasts, fetchMovieDetail, fetchMovieVideos, fetchSimilarMovie } from '../../service';
import "react-bootstrap-carousel/dist/react-bootstrap-carousel.css";
import './MovieDetail.css'
import { Modal } from 'react-bootstrap';
import ReactPlayer from 'react-player';
import ReactStars from "react-rating-stars-component";

function MovieDetail({ match }) {
    
    const [detail, setDetail] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [video, setVideo] = useState([]);
    const [casts, setCasts] = useState([]);
    const [similarMovie, setSimilarMovie] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false)
    const params = match.params;
    let genresList;
    let genres;
    let releaseDate;
    let releaseYear;

    useEffect(() => {
        const fetchAPI = async () => {
            setDetail(await fetchMovieDetail(params.id));
            setVideo(await fetchMovieVideos(params.id));
            setCasts(await fetchCasts(params.id));
            setSimilarMovie(await fetchSimilarMovie(params.id));
            setIsLoaded(true);
        }

        fetchAPI();
    }, [params.id])

    genres = detail.genres;
    releaseDate = detail.release_date;

    const MoviePlayerModal = (props) => {
        const youtubeUrl = 'https://www.youtube.com/watch?v=';
        return (
            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title
                        id="contained-modal-title-vcenter"
                        style={{color: "#000000", fontWeight: "bolder"}}
                    >
                        {detail.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body style={{backgroundColor: "#000000"}}>
                    <ReactPlayer
                        className="container-fluid"
                        url={youtubeUrl + video.key}
                        playing
                        width="100%"
                        controls={true}
                    >

                    </ReactPlayer>
                </Modal.Body>
            </Modal>
        )
    }
    if (genres) {
        genresList = genres.map((item, index) => {
            return (
                <li className="list-inline-item" key={index}>
                    <button type="button" className="btn btn-outline-info">
                        {item.name}
                    </button>
                </li>
            )
        })
    }

    if (releaseDate) {
        releaseYear = releaseDate.slice(0, 4)
    }

    const castList = casts.slice(0, 4).map((item, index) => {
        return (
             <div className="col-md-3 col-sm-6 text-center" key={index}>
                <img src={item.img} alt={item.name} className="img-fluid rounded-circle " />
                <p className="font-weight-bold text-center mt-3">{ item.name}</p>
            </div>
        )
    })
    const similarMovielist = similarMovie.slice(0, 4).map((item, index) => {
        return (
            <div className="col-md-3 col-sm-6 mt-2 mb-3 movie-item" key={index}>
                <div className="card">
                    <a href={`/movie/${item.id}/`}   >
                        <img className="img-fluid poster-item" src={item.poster} alt={item.title}></img>
                    </a>
                </div>
                <a href={`/movie/${item.id}/`} className="link-detail " >
                    <div className="overlay-item mt-2">
                        <p className="movie-title" >{item.title}</p>
                        <p className="movie-rating" >Rated: {item.rating}</p>
                        <ReactStars count={item.rating} size={20} color={"#f4c10f"}></ReactStars>
                    </div>
                </a>
            </div>
        )
    })

    if (isLoaded === false) {
        return <h2 className="text-center" style={{color:  "#756666", marginTop: 100}}>Please waiting...</h2>
    }

    return (
        <div className="container">
            <div className="row mt-2 poster">
                <MoviePlayerModal
                    show={isOpen}
                    onHide={() => {
                        setIsOpen(false);
                    }}
                >
                </MoviePlayerModal>
                <div className="col text-center poster-container">
                    <div className="poster-main " >
                        <img src={`https://image.tmdb.org/t/p/original/${detail.backdrop_path}`} alt={detail.title} className="img-fluid img-poster" />
                        <div className="carousel-center icon-poster">
                            <i
                                onClick={() => setIsOpen(true)}
                                className="far fa-play-circle"
                                style={{ fontSize: 70, color: "#e2e0eb", cursor: "pointer" }}
                            ></i>
                        </div>
                        <div className="overlay-poster"></div>
                    </div>
                </div>
            </div>

            <div className="row mt-3 ">
                <div className="col">
                    <p style={{ color: "#5a606b", fontWeight: "bolder", margin: 0}}>TITLE</p>
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <p style={{ color: "#ffffff", fontWeight: "bolder", fontSize: 25 }}>{detail.title} ({releaseYear})</p>
                </div>
            </div>
            
            <div className="row mt-2">
                <div className="col">
                    <p style={{ color: "#5a606b", fontWeight: "bolder", margin: 0}}>GENRE</p>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <ul className="list-inline">{ genresList}</ul>
                </div>
            </div>

            <div className="row mt-2">
                <div className="col">
                    <div>
                        <p style={{ color: "#5a606b", fontWeight: "bolder", margin: 0 }}>RATING</p>
                        <ReactStars
                        count={detail.vote_average}
                        size={20}
                        color={"#f4c10f"}
                        ></ReactStars>
                    </div>
                    <div className="mt-4">
                        <p style={{ color: "#5a606b", fontWeight: "bolder", margin: 0 }}>OVERVIEW</p>
                        <div className="mt-2">{ detail.overview}</div>
                    </div>
                </div>
            </div>

            <div className=" row mt-4">
                <div className="col">
                    <p style={{ color: "#5a606b", fontWeight: "bolder", margin: 0 }}>CASTS</p>
                </div>
            </div>

            <div className=" row mt-4">
                    {castList}
            </div>

            <div className=" row mt-3">
                <div className="col">
                    <p style={{ color: "#5a606b", fontWeight: "bolder", margin: 0 }}>SIMILAR MOVIES</p>
                </div>
            </div>

            <div className="row mt-3">
                {similarMovielist}
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

export default MovieDetail;