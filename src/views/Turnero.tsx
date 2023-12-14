import { Outlet, Link, useLocation } from "react-router-dom";

export const Turnero = () => {

    const pathNoSteps = ['/turnero/profile', '/turnero/journal', '/turnero/panel'];
    const turneroPage = pathNoSteps.includes( useLocation().pathname );
    
    return (
        <>
            <div className="container" id="app">
                <div className={`btn-group mb-5 d-flex justify-content-center ${turneroPage && 'none'}`}>
                    <Link to={'step-one'}className="btn btn-primary step" id="step1">1</Link>
                    <Link to={'step-two'}className="btn btn-primary step" id="step2">2</Link>
                    <Link to={'step-three'}className="btn btn-primary step" id="step3">3</Link>
                    <Link to={'step-resume'}className="btn btn-primary step" id="step-resume">&#128203;</Link>
                </div>
                <div className="stepRoot">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
