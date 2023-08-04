import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createCarReview } from 'apiSdk/car-reviews';
import { carReviewValidationSchema } from 'validationSchema/car-reviews';
import { CarReviewInterface } from 'interfaces/car-review';

function CarReviewCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CarReviewInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCarReview(values);
      resetForm();
      router.push('/car-reviews');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CarReviewInterface>({
    initialValues: {
      condition: 0,
      year: false,
      advisor: '',
    },
    validationSchema: carReviewValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Car Reviews',
              link: '/car-reviews',
            },
            {
              label: 'Create Car Review',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Car Review
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Condition"
            formControlProps={{
              id: 'condition',
              isInvalid: !!formik.errors?.condition,
            }}
            name="condition"
            error={formik.errors?.condition}
            value={formik.values?.condition}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('condition', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="year" display="flex" alignItems="center" mb="4" isInvalid={!!formik.errors?.year}>
            <FormLabel htmlFor="switch-year">Year</FormLabel>
            <Switch id="switch-year" name="year" onChange={formik.handleChange} value={formik.values?.year ? 1 : 0} />
            {formik.errors?.year && <FormErrorMessage>{formik.errors?.year}</FormErrorMessage>}
          </FormControl>

          <TextInput
            error={formik.errors.advisor}
            label={'Advisor'}
            props={{
              name: 'advisor',
              placeholder: 'Advisor',
              value: formik.values?.advisor,
              onChange: formik.handleChange,
            }}
          />

          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/car-reviews')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'car_review',
    operation: AccessOperationEnum.CREATE,
  }),
)(CarReviewCreatePage);
