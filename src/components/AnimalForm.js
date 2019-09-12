import React from 'react'
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";

const AnimalForm = ({errors}) => {
   return (
      <Form>
         {errors.species && <p className="error">{errors.species}</p>}
         <Field type="text" name="species" placeholder="Species" />
         
         {errors.age && <p className="error">{errors.age}</p>}
         <Field type="number" name="age" min="0" placeholder="Age" />
         
         {errors.diet && <p className="error">{errors.diet}</p>}
         <Field component="select" name="diet">
            <option value="" disabled>Select Diet:</option>
            <option value="carnivore">Carnivore</option>
            <option value="herbivore">Herbivore</option>
            <option value="omnivore">Omnivore</option>
         </Field>
         {errors.vaccinations && <p className="error">{errors.vaccinations}</p>}
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
   validationSchema: yup.object().shape({
      species: yup.string().required(),
      age: yup.number().positive().required(),
      diet: yup.string().required(),
      vaccinations: yup.boolean().oneOf([true])
   }),
   handleSubmit: values => {
      console.log(values);
   }
})(AnimalForm);
