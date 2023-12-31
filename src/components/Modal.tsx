import { addHours } from 'date-fns';
import { es } from 'date-fns/locale';
import { FC, useContext, useEffect, useState } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import { AvailabilityContext, ShopContext } from '../context';
import { formValuesFormated, getServiceSelected } from '../helpers';
import "react-datepicker/dist/react-datepicker.css";
import { BookingContext } from '../context/BookingContext';
import { unselectBooking, updateBooking } from '../context/actions/bookingActions';

registerLocale('es', es);

const formValuesInitialState = {
    id: '',
    price: 0,
    title: '',
    start: new Date(),
    name: '',
    service: '-',
    end: addHours(new Date(), 2),
    user: {
        id: 'No Registrado',
        name: ''
    }
}

export const Modal: FC = () => {

    const {availabilityState: { selected }, updateAvailability, dispatch } = useContext(AvailabilityContext);
    const { shopState:{ services, name } } = useContext(ShopContext);
    const { bookingState, newBooking, dispatchBooking } = useContext(BookingContext)
    const [ isUpdating, setIsUpdating ] = useState(false);
    const [formValues, setFormValues] = useState<any>(formValuesInitialState)

    const onDateChanged = (event: any, changing: any) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onInputChanged = ({target} : any) => {
        const service = getServiceSelected(services, target.value) || selected?.service || bookingState.selected?.service;
        const variable = { [target.name]: (target.name === 'service') ? service : target.value }
        setFormValues({
            ...formValues,
            ...variable,
            price: service?.price
        })
    }
    const handleSave = () => {
        console.log(formValues.price)
        if(isUpdating) {
            const updateReserve = formValuesFormated(formValues, 'update');
            if(!!updateReserve.bgColor) {
                updateBooking(updateReserve, dispatchBooking)
            } else {
                updateAvailability(updateReserve, dispatch);
            }
            setIsUpdating(!isUpdating);
        } else {
            const newReserve = formValuesFormated({...formValues, title: name}, 'new' );
            newBooking(newReserve, dispatchBooking);
        }
        document.getElementById('closeModal')?.click();
        setFormValues(formValuesInitialState)
    }

    useEffect(() => {
        setFormValues({
            ...formValues,
            end: addHours(formValues.start, formValues.service.duration || 1 )
        })
    },[formValues.start, selected, bookingState.selected, formValues.service])

    useEffect( () => {
        if(selected || bookingState.selected){
            const data = {
                id: selected?.id || bookingState.selected?.id,
                title: name, // NOMBRE DEL LOCAL
                price: selected?.price || bookingState.selected?.price,
                start: selected?.start || bookingState.selected?.start || new Date(),
                name: selected?.user?.name || bookingState.selected?.user?.name || '-',
                service: selected?.service || bookingState.selected?.service ,
                end: selected?.end || bookingState.selected?.end || addHours(new Date(), 2),
                user: selected?.user || bookingState.selected?.user || {
                    id: 'No Registrado',
                    name: 'Emmaunel Test'
                }
            }
            setIsUpdating(true)
            setFormValues(data)
        } else {
            setIsUpdating(false)
            setFormValues(formValuesInitialState)
        }
    },[selected, bookingState.selected])

    //********************************************************** */
    //TODO:
    // RESOLVER PROBLEMA DE CAMBIO DE SERVICIO
    //********************************************************** */

    return (
        <>
            <div className="modal fade" id="ModalCenter" tabIndex={0} role="dialog">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{ selected ? 'Actualizar' : 'Nueva' } Reserva en {name}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="container">

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Selecciona el Servicio</label>
                                </div>
                                <select name='service' onChange={onInputChanged} className="custom-select" id="inputGroupSelect01">
                                    <option defaultValue={selected?.service?.id || ''}> {`${selected?.service?.name || '-'}`}</option>
                                    {/* <option defaultValue={''}> - </option> */}
                                    {
                                        services.map( (e,i) => <option value={e.id} key={i}>{e.name}</option> )
                                    }
                                </select>
                            </div>
                            <div className="input-group mb-3">
                                <input 
                                    id='price'
                                    type="text" 
                                    className="form-control"
                                    placeholder="Nombre de quién reserva"
                                    name="price"
                                    autoComplete="off"
                                    value={formValues.price}
                                    disabled
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
                            </div>
                            <hr />
                            <div className="form-group mb-2">
                                <label className='d-block'>Fecha y hora</label>
                                <DatePicker 
                                    className='form-control d-block'
                                    minDate={ formValues.start }
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
                                    disabled
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
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" data-dismiss="modal" id='closeModal'>Cerrar</button>
                        <button className="btn btn-primary" onClick={handleSave}>{ selected ? 'Actualizar Reserva' : 'Reservar' }</button>
                    </div>
                    </div>
                </div>
            </div>
        </>
    )
}
