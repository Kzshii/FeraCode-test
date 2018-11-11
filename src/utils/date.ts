import { format } from 'date-fns';

export const formatDate = (date: Date | string | number) =>
  format(date, 'DD MMM YYYY - hh:mm');
  