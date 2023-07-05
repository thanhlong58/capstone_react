import React, { useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { registerApi, setValidAction } from '../redux/reducers/userReducer';

const Register = () => {
  const { inValid } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const frm = useFormik({
    initialValues: {
      email: '',
      password: '',
      name: '',
      gender: true,
      phone: '',
      passwordConfirm: ''
    },
    onSubmit: (values) => {
      const { passwordConfirm, ...payload } = values;
      console.log('values', payload);
      const action = registerApi(payload);
      dispatch(action);
      frm.resetForm();
    },
    validationSchema: yup.object().shape({
      email: yup.string().required('Email cannot be blank!').email('Email is not valid'),
      name: yup.string().required('Name cannot be blank').matches(/[A-Za-z]/, 'Name must be letters'),
      password: yup
        .string()
        .required('Password cannot be blank')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,10}$/, '6-10 characters,1 uppercase,special character'),
      phone: yup.string().required('Phone cannot be blank').matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, 'Invalid phone number'),
      passwordConfirm: yup.string().required('Please confirm your password').oneOf([yup.ref('password'), null], 'Passwords must match')
    })
  });

  useEffect(() => {
    if (frm.isValid) {
      dispatch(setValidAction(true));
    } else {
      dispatch(setValidAction(false));
    }
  }, [frm.isValid, dispatch]);

  return (
    <div  className="container  pt-5">
      <form onSubmit={frm.handleSubmit} id="form" className="card mt-4">
        <div className="card-header bg-white text-dark">
          <h3 className="text-center">Register</h3>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  className="form-control"
                  id="email"
                  name="email"
                  value={frm.values.email}
                  onChange={frm.handleChange}
                />
                {frm.errors.email && <p className="text-danger">{frm.errors.email}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  className="form-control"
                  id="name"
                  name="name"
                  value={frm.values.name}
                  onChange={frm.handleChange}
                />
                {frm.errors.name && <p className="text-danger">{frm.errors.name}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  type="password"
                  id="password"
                  name="password"
                  value={frm.values.password}
                  onChange={frm.handleChange}
                />
                {frm.errors.password && <p className="text-danger">{frm.errors.password}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="phone">Phone</label>
                <input
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={frm.values.phone}
                  onChange={frm.handleChange}
                />
                {frm.errors.phone && <p className="text-danger">{frm.errors.phone}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label htmlFor="passwordConfirm">Password Confirm</label>
                <input
                  className="form-control"
                  id="passwordConfirm"
                  name="passwordConfirm"
                  type="password"
                  value={frm.values.passwordConfirm}
                  onChange={frm.handleChange}
                />
                {frm.errors.passwordConfirm && <p className="text-danger">{frm.errors.passwordConfirm}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group">
                <label>Gender</label>
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    id="male"
                    className="form-check-input"
                    checked={frm.values.gender === true}
                    onChange={() => frm.setFieldValue('gender', true)}
                  />
                  <label htmlFor="male" className="form-check-label">
                    Male
                  </label>
                </div>
                <div className="form-check">
                  <input
                    type="radio"
                    name="gender"
                    id="female"
                    className="form-check-input"
                    checked={frm.values.gender === false}
                    onChange={() => frm.setFieldValue('gender', false)}
                  />
                  <label htmlFor="female" className="form-check-label">
                    Female
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-footer">
          <button disabled={inValid} type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
