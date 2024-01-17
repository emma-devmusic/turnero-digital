import { Outlet, Link, useLocation } from "react-router-dom";

export const Turnero = () => {

    const pathNoSteps = ['/turnero/profile', '/turnero/journal', '/turnero/panel'];
    const turneroPage = pathNoSteps.includes( useLocation().pathname );
    
    return (
        <>
            <div className="" id="app">
                <div className={`btn-group mb-4 d-flex justify-content-center ${turneroPage && 'none'}`}>
                    <Link to={'step-one'}className="btn btn-select step pl-5 pr-5" id="step1">Mercados</Link>
                    <Link to={'step-two'}className="btn btn-select step pl-5 pr-5" id="step2">Calendario</Link>
                    <Link to={'step-three'}className="btn btn-select step pl-5 pr-5" id="step3">Datos de Contacto</Link>
                    <Link to={'step-resume'}className="btn btn-select step pl-5 pr-5" id="step-resume">Resumen</Link>
                </div>
                <div className="stepRoot">
                    <Outlet />
                </div>
            </div>
        </>
    )
}



12 - 195 - 135

18 - 176 - 117

24 - 168 - 109

36 - 162 - 103


