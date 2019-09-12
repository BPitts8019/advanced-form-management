import React from 'react'
import { withFormik, Form, Field } from "formik"

const AnimalForm = (props) => {
   return (
      <Form>
         <Field type="text" name="species" placeholder="Species" />
         <Field type="number" name="age" min="0" placeholder="Age" />
         <Field component="select" name="diet">
            <option value="" disabled>Select Diet:</option>
            <option value="carnivore">Carnivore</option>
            <option value="herbivore">Herbivore</option>
            <option value="omnivore">Omnivore</option>
         </Field>
         <label>
            <Field type="checkbox" name="vaccinations" />
            <span>Vaccinations</span>
         </label>
         <Field component="textarea" name="notes" placeholder="Notes..." />
         <button type="submit">Submit</button>
      </Form>
   );
}

export default withFormik({
   // values come from Formik automagically
   mapPropsToValues: values => {
      // this makes these inputs 'controlled'
      return {
         // the keys map to the 'name' attribute of our Fields
         species: values.species || "",
         age: values.age || "",
         diet: values.diet || "",
         vaccinations: values.vaccinations || false,
         notes: values.notes || ""
      };
   },
   handleSubmit: values => {
      console.log(values);
   }
})(AnimalForm);
