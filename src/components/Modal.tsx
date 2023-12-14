import { addHours } from 'date-fns';
import { es } from 'date-fns/locale';
import { FC, useContext, useState } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import { AvailabilityContext } from '../context';
import { formValuesFormated } from '../helpers';
import "react-datepicker/dist/react-datepicker.css";

registerLocale('es', es);

export const Modal: FC = () => {

    const [startDate, setStartDate] = useState( new Date() );

    const { updateAvailability, dispatch } = useContext(AvailabilityContext)

    const [formValues, setFormValues] = useState({
        title: 'Mi Reserva',
        notes: 'No tenemos pelota',
        start: startDate,
        end: addHours(new Date(), 2),
        name: ''
    })

    const onDateChanged = (event: any, changing: any) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onInputChanged = ({target} : any) => {
        setFormValues({
            ...formValues,
             [target.name]: target.value
        })
    }

    const handleSave = () => {
        const newReserve = formValuesFormated(formValues);
        updateAvailability(newReserve, dispatch);
        document.getElementById('closeModal')?.click();
    }

    return (
        <>
            <div className="modal fade" id="ModalCenter" tabIndex={0} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">Nueva Reserva</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="container">

                            <div className="form-group mb-2">
                                <label className='d-block'>Fecha y hora inicio</label>
                                <DatePicker 
                                    className='form-control d-block'
                                    selected={ formValues.start } 
                                    onChange={(event: any) => onDateChanged(event, 'start')} 
                                    dateFormat={'Pp'}
                                    showTimeSelect
                                    locale={'es'}
                                    timeCaption='Hora'
                                />  
                            </div>

                            <div className="form-group mb-2">
                                <label className='d-block'>Fecha y hora fin</label>
                                <DatePicker 
                                    minDate={ formValues.start }
                                    className='form-control d-block'
                                    selected={ formValues.end } 
                                    onChange={(event: any) => onDateChanged(event, 'end')} 
                                    dateFormat={'Pp'}
                                    showTimeSelect
                                    locale={'es'}
                                    timeCaption='Hora'
                                />  
                            </div>

                            <hr />
                            <div className="form-group mb-2">
                                <label>Titulo y notas</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Título del evento"
                                    name="title"
                                    autoComplete="off"
                                    value={formValues.title}
                                    onChange={onInputChanged}
                                />
                            </div>
                            <div className="form-group mb-2">
                                <label>Nombre</label>
                                <input 
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre de quién reserva"
                                    name="name"
                                    autoComplete="off"
                                    value={formValues.name}
                                    onChange={onInputChanged}
                                />
                                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                            </div>
                            <div className="form-group mb-2">
                                <textarea 
                                    className="form-control"
                                    placeholder="Notas"
                                    rows={5}
                                    name="notes"
                                    value={formValues.notes}
                                    onChange={onInputChanged}
                                ></textarea>
                                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-dismiss="modal" id='closeModal'>Cerrar</button>
                        <button className="btn btn-primary" onClick={handleSave}>Reservar</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
