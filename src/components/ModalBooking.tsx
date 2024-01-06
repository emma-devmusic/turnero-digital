import Modal from "react-modal";
import { addHours } from 'date-fns';
import { es } from 'date-fns/locale';
import { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import DatePicker, {registerLocale} from "react-datepicker";
import { AvailabilityContext, ShopContext } from '../context';
import { formValuesFormated, getServiceSelected } from '../helpers';
import { BookingContext } from '../context/BookingContext';
import {  updateBooking } from '../context/actions/bookingActions';
import { DatePickerBooking } from "./DatePickerBooking";
import "react-datepicker/dist/react-datepicker.css";

type PropsModal = { 
    modalIsOpen: boolean; 
    setIsOpen: Dispatch<SetStateAction<boolean>>; 
};

registerLocale('es', es);

const formValuesInitialState = {
    id: '',
    price: 5000,
    title: '',
    start: new Date(),
    name: '',
    service: {
        id: "1234twexcvbssd",
        name: "Servicio 1",
        duration: 1,
        price: 5000
    },
    end: addHours(new Date(), 1),
    user: {
        id: 'No Registrado',
        name: ''
    }
}

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '100%',
        maxWidth: '500px',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        padding: '.5rem'
    },
};
export const ModalBooking = ({modalIsOpen, setIsOpen}: PropsModal) => {

    const {availabilityState: { selected, availabilities }, updateAvailability, dispatch } = useContext(AvailabilityContext);
    const { shopState:{ services, name } } = useContext(ShopContext);
    const { bookingState, newBooking, dispatchBooking } = useContext(BookingContext)
    const [ isUpdating, setIsUpdating ] = useState(false);
    const [formValues, setFormValues] = useState<any>(formValuesInitialState);
    const [isInvalid, setIsInvalid] = useState('');

    const onDateChanged = (event: any, changing: any) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onInputChanged = ({target} : any) => {
        let service;
        if(target.name === 'service')
        service = getServiceSelected(services, target.value) || selected?.service || bookingState.selected?.service || formValues.price;
        setFormValues({
            ...formValues,
            [target.name]: (target.name === 'service') ? service : target.value,
            price: service?.price || formValues.price
        })
    }
    
    const handleSave = () => {
        if(isUpdating) {
            const updateReserve = formValuesFormated(formValues, 'update');
            if(!!updateReserve.bgColor) {
                updateBooking(updateReserve, dispatchBooking)
            } else {
                updateAvailability(updateReserve, dispatch);
            }
            setIsUpdating(false);
        } else {
            const newReserve = formValuesFormated({...formValues, title: name}, 'new' );
            newBooking(newReserve, dispatchBooking);
        }
        setFormValues(formValuesInitialState)
        closeModal()
    }

    useEffect(() => {
        setFormValues({
            ...formValues,
            end: addHours(formValues.start, formValues.service.duration ),
            price: formValues.service.price
        })
    },[formValues.start, selected, bookingState.selected, formValues.service])

    useEffect( () => {
        if(selected || bookingState.selected){
            const data = {
                ...formValues,
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


    const closeModal = () => {
        setFormValues(formValuesInitialState)
        setIsOpen(false)
        setIsInvalid('');
    };
    Modal.setAppElement('#root')

    return (
        <>
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
            >
                
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLongTitle">{ selected ? 'Actualizar' : 'Nueva' } Reserva en {name}</h5>
                        <button type="button" className="close" data-dismiss="modal" onClick={closeModal}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form className="container">

                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <label className="input-group-text" htmlFor="inputGroupSelect01">Selecciona el Servicio</label>
                                </div>
                                <select 
                                    name='service' 
                                    onChange={onInputChanged} 
                                    className="custom-select" 
                                    id="inputGroupSelect01"
                                >
                                    <option 
                                        defaultValue={selected?.service?.id || bookingState.selected?.id || formValues.service.id}
                                    >
                                        {selected?.service?.name || bookingState.selected?.name || formValues.service.name}
                                    </option>
                                    {
                                        services.map( (e,i) => 
                                            <option 
                                                value={e.id} 
                                                key={i}
                                            >
                                                {e.name}
                                            </option>
                                        )
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
                            <DatePickerBooking 
                                durationService={formValues.service.duration }
                                formValues={ formValues } 
                                onDateChanged={ onDateChanged } 
                                isInvalid={ isInvalid }
                                setIsInvalid={ setIsInvalid }
                            />
                            <div className="form-group mb-2">
                                <label className='d-block'>Fecha y hora fin</label>
                                <DatePicker 
                                    disabled
                                    className={'form-control d-block ' + isInvalid}
                                    selected={ formValues.end } 
                                    onChange={(event: any) => onDateChanged(event, 'end')} 
                                    dateFormat={'Pp'}
                                    locale={'es'}
                                    placeholderText=" - "
                                />  
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-secondary" onClick={closeModal}>Cerrar</button>
                        <button 
                            className="btn btn-primary" 
                            onClick={handleSave}
                            disabled={!!isInvalid}
                        >
                            { selected ? 'Actualizar Reserva' : 'Reservar' }
                        </button>
                    </div>
            </Modal>
        </>
    )
}
