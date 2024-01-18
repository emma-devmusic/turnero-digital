import { Outlet, Link, useLocation } from "react-router-dom";
import { ModalBooking } from "../components/ModalBooking";

export const Turnero = () => {

    const pathNoSteps = ['/turnero/profile', '/turnero/journal', '/turnero/panel'];
    const turneroPage = pathNoSteps.includes( useLocation().pathname );
    let path = useLocation().pathname;
    
    let classBtnSelector = 'btn btn-select pl-5 pr-5 ';
    let classShops = classBtnSelector + ((path === '/turnero/step-one') && 'step-selected');
    let classCalendar = classBtnSelector + ((path === '/turnero/step-two') && 'step-selected');
    let classContact = classBtnSelector + ((path === '/turnero/step-three') && 'step-selected');
    let classResume = classBtnSelector + ((path === '/turnero/step-resume') && 'step-selected');

    return (
        <>
            <div className="" id="app">
                <div className={`btn-group mb-4 d-flex justify-content-center ${turneroPage && 'none'}`}>
                    <Link to={'step-one'} className={classShops} id="step1">Locales</Link>
                    <Link to={'step-two'} className={classCalendar} id="step2">Calendario</Link>
                    <Link to={'step-three'} className={classContact} id="step3">Datos de Contacto</Link>
                    <Link to={'step-resume'} className={classResume} id="step-resume">Resumen</Link>
                </div>
                <div className="stepRoot">
                    <ModalBooking />
                    <Outlet />
                </div>
            </div>
        </>
    )
}
