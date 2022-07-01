import React, { useState } from 'react'
import Navbar from '../navbar/Navbar'
import { useNavigate } from 'react-router-dom'

export default function TakeInterview(props) {
    const navigate = useNavigate(); //created an instance

    const setLoginUser = props.setLoginUser;
    const [roomName, setRoomName] = useState("");

    const handleChange = (e) => {
        setRoomName(e.target.value);
    };

    const createInterview = () => {
        alert('creating interview');
        setRoomName('');
        
    }

    return (
        <>
            <Navbar setLoginUser={setLoginUser} />
            <div className='text-center my-2'>
                <button className="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">Create Room</button>
            </div>

            {/* <div className="card" style={{width: "18rem"}}>
                <img src="./landingPage.jpg" className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">Card title</h5>
                    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" className="btn btn-primary">Go somewhere</a>
                </div>
            </div> */}

            <div class="row" style={{margin: '2px'}}>
                <div class="col-sm-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>

                <div class="col-sm-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 my-2">
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Special title treatment</h5>
                            <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
                            <a href="#" class="btn btn-primary">Go somewhere</a>
                        </div>
                    </div>
                </div>
            </div>

                {/* modal */}
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Join Interview Room</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="recipient-name" className="col-form-label">Room Title:</label>
                                        <input type="text" className="form-control" name='id' value={roomName} id="room-id" onChange={handleChange} />
                                    </div>
                                </form>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { setRoomName(''); }}>Close</button>
                                <button type="button" id='join' className="btn btn-primary" data-bs-dismiss="modal" onClick={createInterview}>Create Interview</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
            )
}
