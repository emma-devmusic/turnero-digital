import { Event } from "react-big-calendar"

export const eventStyleGetter = (event: Event, start: Date, end: Date, isSelected: boolean) => {
    

  const style = {
    backgroundColor: event.bgColor,
    borderRadius: '4px',
    opacity: 0.9,
    color: 'white'
  }    
  return {
    style
  }
}