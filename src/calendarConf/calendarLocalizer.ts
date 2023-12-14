import { startOfHour, addHours, getDay, startOfWeek, parse, format } from 'date-fns';
import esES  from 'date-fns/locale/es';
import { dateFnsLocalizer } from 'react-big-calendar';

const locales = {
    'es': esES,
  }
const endOfHour = (date: Date): Date => addHours( startOfHour(date), 1 )
const now = new Date()
const start = endOfHour(now)
const end = addHours(start, 1)
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
export const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
}) 