import * as yup from 'yup';

export const carParkValidationSchema = yup.object().shape({
  parking: yup.string().nullable(),
  note: yup.string().nullable(),
  feedback: yup.string().nullable(),
  amount: yup.number().integer().nullable(),
});
