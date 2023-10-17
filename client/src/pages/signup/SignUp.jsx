import { useFormik } from 'formik';
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';

const Signup = () => {
    const nav=useNavigate();
    const formik = useFormik({
        initialValues: {
            first_name:'',
            last_name:'',
            email: '',
            phone_number: 1000000000,
            age: 0,
            city: '',
            username: '',
            password: ''
        },
        validationSchema: Yup.object({
            first_name: Yup.string().required('Required'),
            last_name: Yup.string().required('Required'),
            email: Yup.string().required('Required').email('Invalid email address'),
            phone_number: Yup.number(),
            age: Yup.number().required('Required'),
            city: Yup.string(),
            username: Yup.string().required('Required'),
            password: Yup.string().required('Required')
            .min(8, 'Username should be over 7 characters long')
            .matches(/[a-zA-Z]/, 'Password must contain at least one letter.')
            .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/, 'Password must contain at least one special character.'),
        }),
        onSubmit: values => {
            // console.log('Form data', values);
            
            const userObject = {
                "first_name": values.first_name,
                "last_name": values.first_name,
                "email": values.email,
                "phone_number": values.phone_number,
                "age": values.age,
                "city": values.city,
                "username": values.username,
                "password": values.password
            }
            console.log(userObject);

            fetch('/api/users',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userObject)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Network response error");
                }
                return response.json();
            })
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log("error", error.message);
            });
            
        },
    });

    return (
        <form onSubmit={(e)=>{
            formik.handleSubmit(e);
            nav("/login");
        }}>
            <div className="input-group">
                <label>First Name</label>
                <input
                    type="first_name"
                    {...formik.getFieldProps('first_name')}
                />
                {formik.touched.first_name && formik.errors.first_name ? (
                    <div className="error">{formik.errors.first_name}</div>
                ) : null}
            </div>
            <div className="input-group">
                <label>Last Name</label>
                <input
                    type="last_name"
                    {...formik.getFieldProps('last_name')}
                />
                {formik.touched.last_name && formik.errors.last_name ? (
                    <div className="error">{formik.errors.last_name}</div>
                ) : null}
            </div>
            <div className="input-group">
                <label>Email</label>
                <input
                    type="email"
                    {...formik.getFieldProps('email')}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div className="error">{formik.errors.email}</div>
                ) : null}
            </div>
            <div className="input-group">
                <label>Phone Number</label>
                <input
                    type="phone_number"
                    {...formik.getFieldProps('phone_number')}
                />
                {formik.touched.phone_number && formik.errors.phone_number ? (
                    <div className="error">{formik.errors.phone_number}</div>
                ) : null}
            </div>
            <div className="input-group">
                <label>Age</label>
                <input
                    type="age"
                    {...formik.getFieldProps('age')}
                />
                {formik.touched.age && formik.errors.age ? (
                    <div className="error">{formik.errors.age}</div>
                ) : null}
            </div>
            <div className="input-group">
                <label>City of Residence</label>
                <input
                    type="city"
                    {...formik.getFieldProps('city')}
                />
                {formik.touched.city && formik.errors.city ? (
                    <div className="error">{formik.errors.city}</div>
                ) : null}
            </div>
            <div className="input-group">
                <label>Username</label>
                <input
                    type="text"
                    {...formik.getFieldProps('username')}
                />
                {formik.touched.username && formik.errors.username ? (
                    <div className="error">{formik.errors.username}</div>
                ) : null}
            </div>

            <div className="input-group">
                <label>Password</label>
                <input
                    type="password"
                    {...formik.getFieldProps('password')}
                />
                {formik.touched.password && formik.errors.password ? (
                    <div className="error">{formik.errors.password}</div>
                ) : null}
            </div>

            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;