
import React, { useRef } from "react";
import Calander from "react-calendar";

export const Navigation: React.ComponentType = () => {

    const dropdownReference = useRef<HTMLDivElement>(null);

    return (
        <React.Fragment>
            <nav className="navbar bg-base-100 fixed z-10 px-16">
                <div className="navbar-start">
                    { "Astronomy Picture of the Day" }
                </div>
                <div className="navbar-center">
                    <div className="btn-group flex">
                        <label className="btn btn-square" tabIndex={ 0 }>
                            { "<" }
                        </label>
                        <label className="btn modal-button" htmlFor="my-modal-3" tabIndex={ 0 }>
                            { new Date().toDateString() }
                        </label>
                        <label className="btn btn-square" tabIndex={ 0 }>
                            { ">" }
                        </label>
                    </div>
                </div>
                <div className="navbar-end">
                    <label className="btn btn-square btn-ghost" tabIndex={ 0 }>
                        { "<" }
                    </label>
                </div>
            </nav>
            <input className="modal-toggle" id="my-modal-3" type="checkbox" />
            <div className="modal">
                <div className="modal-box relative">
                    <label className="btn btn-sm btn-circle absolute right-2 top-2" htmlFor="my-modal-3">
                        {"✕"}
                    </label>
                    <Calander className="card card-normal bg-base-100" maxDate={ new Date() } tileClassName="btn btn-square" value={ new Date() } />
                </div>
            </div>
            <div className="dropdown" ref={ dropdownReference }>
                <div className="dropdown-content">
                    <Calander className="card card-normal bg-base-100" maxDate={ new Date() } tileClassName="btn btn-square" value={ new Date() } />
                </div>
            </div>
        </React.Fragment>
    );

};

