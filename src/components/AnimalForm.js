import React from 'react'
import { withFormik, Form, Field } from "formik"

const AnimalForm = (props) => {
   return (
      <Form>
         <Field type="text" name="species" placeholder="Species" />
         <button type="submit">Submit</button>
      </Form>
   );
}

export default withFormik({
   mapPropsToValues: values => {
      return {
         species: values.species || "Human"
      };
   },
   handleSubmit: values => {
      console.log(values);
   }
})(AnimalForm);
