import React from 'react'
import { withFormik, Form, Field } from "formik";
import * as yup from "yup";
import axios from "axios";

const AnimalForm = ({errors, touched}) => {
   return (
      <Form>
         {touched.species && errors.species && <p className="error">{errors.species}</p>}
         <Field type="text" name="species" placeholder="Species" />
         
         {touched.age && errors.age && <p className="error">{errors.age}</p>}
         <Field type="number" name="age" min="0" placeholder="Age" />
         
         {touched.diet && errors.diet && <p className="error">{errors.diet}</p>}
         <Field component="select" name="diet">
            <option value="" disabled>Select Diet:</option>
            <option value="carnivore">Carnivore</option>
            <option value="herbivore">Herbivore</option>
            <option value="omnivore">Omnivore</option>
         </Field>
         {touched.vaccinations && errors.vaccinations && <p className="error">{errors.vaccinations}</p>}
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
      species: yup.string().required("Please enter a species for the animal."),
      age: yup.number().positive().required("Umm.. The animal is how old?"),
      diet: yup.string().required("Please select a diet for the animal."),
      vaccinations: yup.boolean().oneOf([true], "Animal must be vaccinated!")
   }),
   handleSubmit: values => {
      axios.post("https://reqres.in/api/animals", values)
         .then(response => {
            console.log(response);
         })
         .catch(error => {
            console.error(error);
         })
   }
})(AnimalForm);
