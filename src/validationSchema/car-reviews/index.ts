import * as yup from 'yup';

export const carReviewValidationSchema = yup.object().shape({
  condition: yup.number().nullable(),
  year: yup.boolean().nullable(),
  advisor: yup.string().nullable(),
});
