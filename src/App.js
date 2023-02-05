import React, { useState,useEffect } from 'react';
import { TextField, Autocomplete, FormControl, Alert,Snackbar} from '@mui/material';
import {isTaxIdValid} from './helpers/validations'
import './App.css';

const emptyForm = {
  username: '',
  country: {name: '', code:'' },
  taxIdentifier: ''
}

const Form = () => {
  const [errors, setErrors] = useState({})
  const [form, setForm] = useState(emptyForm)
  const [message, setMessage] = useState("")
  const [open, setOpen] = useState(false);
  const [countries, setCountries] = useState([])

  const handleClose = () => {
    setOpen(!open);
  };

  const fetchCountries = () => {
    fetch("./data/countries.json")
      .then(res => res.json())
      .then(data => setCountries(data.countries))
      .catch(error => console.error(error));
  }

  const validation = (field, value) => {
    if(field === 'username') {
      if (!value || value.length < 3) {
        setErrors({...errors, ...{[field]: "Not empty, min 3 chars"}})
      } else {
        delete errors[field]
        setErrors(errors)
      }
    }
    if(field === 'taxIdentifier') {
      if(!form.country.name) {
        setErrors({...errors, ...{[field]: "Please choose country first"}})
      } else if(!isTaxIdValid(form.country.code, value)) {
        setErrors({...errors, ...{[field]: "Please provide correct tax identifier"}})
      } else {
        delete errors[field]
        setErrors(errors)
      }
    }
  }

  useEffect(() => {
    fetchCountries()
  },[])

  const postForm = () => {
    const {username, country, taxIdentifier} = form
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          username,
          country: country.name,
          taxIdentifier
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      })
        .then((response) => {
          if (response.status !== 200) {
            throw new Error('Failed to submit form');
          }
          return response.json();
        })
        .then((data) => {
          setMessage('Form submitted successfully');
          setOpen(true);
          setForm(emptyForm)
        })
        .catch((error) => {
          setMessage(error.message);
          setOpen(true);
        });
  }

  useEffect(() => {
    setForm({...form, ...{taxIdentifier: ''}})
  }, [form.country.name])

  const handleOnChange = (field, value) => {
    setForm({...form, ...{[field]: value}})
    validation(field, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    postForm()
  };


  return (
    <form className="form" onSubmit={handleSubmit}>
      {message && <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}>
          <Alert sx={{ width: '100%' }} severity={!!form.username ? "error" : "success"}>{message}</Alert>
        </Snackbar>
      }
      <FormControl className="formControl">
        <TextField
          placeholder="Please enter user name"
          className="formInput"
          label="User Name"
          variant="outlined"
          name="username"
          value={form.username}
          required
          inputProps={{ minLength: 3 }}
          onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          error={!!errors.username}
          helperText={errors.username}
        />
      </FormControl>
      <FormControl className="formControl">
        <Autocomplete
          className="formInput"
          options={countries}
          getOptionLabel={(option) => option.name}
          renderInput={(params) => (
            <TextField
              {...params}
              name="country"
              label="Country"
              placeholder='Please choose country'
              variant="outlined"
            />
          )}
          value={form.country}
          onChange={(e, newValue) => {
            if(newValue !== null) {
              handleOnChange("country", newValue)
            } else {handleOnChange("country", {name: '', code:'' })}}}
          required
        />
      </FormControl>
      <FormControl className="formControl">
        <TextField
          className="formInput"
          placeholder="Please enter correct tax identifier"
          label="Tax Identifier"
          variant="outlined"
          name="taxIdentifier"
          required
          value={form.taxIdentifier}
          onChange={(e) => handleOnChange(e.target.name, e.target.value)}
          error={!!errors.taxIdentifier}
          helperText={errors.taxIdentifier}
        />
      </FormControl>
      <button 
        className="formSubmitButton" 
        disabled={!!Object.keys(errors).length || !form.username || !form.taxIdentifier} 
        type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;