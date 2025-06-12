import  {  useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Link } from 'react-router-dom'
import { BiSolidShow } from "react-icons/bi";
import { BiSolidHide } from "react-icons/bi";
import { useDispatch } from 'react-redux'
import { registerThunk } from '../../services/Slice/login/Register'
import { ToastContainer } from 'react-bootstrap'
import { toast } from 'react-toastify'
import { emitter } from '../../features/emitter'
import 'react-toastify/dist/ReactToastify.css';
import { LoginWithEmailThunk } from '../../services/Slice/login/LoginWithEmail'
const SignUpWithEmail = ({ setSignUpEmail }) => {
    const [loginForm, setLoginForm] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [isError, setIsError] = useState('')
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const dispatch = useDispatch();
    const initialValues = {
        firstName: '',
        lastName: '',
        dateOfBirth: null,
        email: '',
        password: ''
    }


    const validationSchema = Yup.object({
        firstName: Yup.string().required('First name is required'),
        lastName: Yup.string().required('Last name is required'),
        dateOfBirth: Yup.date().nullable().required('Date of birth is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 6 characters')
            .required('Password is required'),
    })

    const handleSubmit = async (values) => {
        console.log(values)
        const res = await dispatch(registerThunk({
            password: values.password,
            email: values.email,
            name: ` ${values.firstName} ${values.lastName}`,
            dateOfBirth: values.dateOfBirth
        }))
        console.log(res);
        if (res?.meta.requestStatus ==='rejected' ) {
            setIsError(res?.payload.message)
        }
        
        if (res.payload.message === 'User registered successfully') {
            setShowSuccessModal(true); // 👈 أظهر المودال الأول
            toast.success(res?.payload?.message);
            setTimeout(() => {
                setLoginForm(false);
                emitter.emit('close-modal');
                setShowSuccessModal(false);
            }, 1500);
        } else if (res.payload.message === 'User already exists') {
            toast.error(res?.payload?.message)
        }
    }

    const handleLogin = () => {
        setSignUpEmail(true)
        setLoginForm(true)
    }

    
    const handleLoginTo = async () =>{
        const res = await dispatch(LoginWithEmailThunk({
            email:Email,
            password:Password
        }))
        console.log(res.payload.token);
        localStorage.setItem('token',res.payload.token)
        setShowSuccessModal(true)
        setTimeout(() => {
                setLoginForm(false);
                emitter.emit('close-modal');
                setShowSuccessModal(false);
            }, 1500);
    }

    return (
        <>
            {!loginForm ? (
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ setFieldValue, values }) => (
                        <Form>
                            <div className='d-flex flex-column'>
                                <label className='p-0'>First name</label>
                                <Field
                                    type="text"
                                    name="firstName"
                                    className='rounded-top-2 border-1 p-2 ps-3'
                                    placeholder="First Name"
                                />
                                <ErrorMessage name="firstName" component="div" style={{ color: 'red', fontSize: '13px', margin: '5px' }} />

                                <Field
                                    type="text"
                                    name="lastName"
                                    className='rounded-bottom-2 border-1 p-2 ps-3'
                                    placeholder="Last Name"
                                />
                                <ErrorMessage name="lastName" component="div" style={{ color: 'red', fontSize: '13px', margin: '5px' }} />

                                <p className='rounded-2 border-1 pt-1' style={{ fontSize: "10px" }}>
                                    Make sure this matches the name on your government ID. If you go by another name, you can add a preferred first name.
                                </p>

                                <label className='mt-2'>Date of birth</label>
                                <DatePicker
                                    showYearDropdown
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="dd/mm/yyyy"
                                    className='rounded-2 border-1 p-2 ps-3 w-100 mt-1'
                                    selected={values.dateOfBirth}
                                    onChange={(date) => setFieldValue('dateOfBirth', date)}
                                />
                                <ErrorMessage name="dateOfBirth" component="div" style={{ color: 'red', fontSize: '13px', margin: '5px' }} />

                                <p className='pt-1' style={{ fontSize: "10px" }}>
                                    To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Airbnb.
                                </p>

                                <label className='mt-2'>Contact info</label>
                                <Field
                                    type="text"
                                    name="email"
                                    className='rounded-2 border-1 p-2 ps-3 w-100'
                                    placeholder="Email"
                                />
                                <ErrorMessage name="email" component="div" style={{ color: 'red', fontSize: '13px', margin: '5px' }} />

                                <p className='pt-1 p-0 m-0' style={{ fontSize: "10px" }}>
                                    By signing up, you agree to Airbnb’s Terms of Service and acknowledge the <Link>Privacy Policy</Link>.
                                </p>

                                <div className="position-relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        className='rounded-2 border-1 p-2 ps-3 w-100 mt-3'
                                        placeholder="Password"
                                    />
                                    {showPassword ? <BiSolidHide
                                        size={'20'} onClick={() => setShowPassword(!showPassword)}
                                        style={{
                                            position: 'absolute',
                                            right: '20px',
                                            top: '60%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            color: '#555'
                                        }}
                                    /> : <BiSolidShow
                                        size={'20'} onClick={() => setShowPassword(!showPassword)}

                                        style={{
                                            position: 'absolute',
                                            right: '15px',
                                            top: '65%',
                                            transform: 'translateY(-50%)',
                                            cursor: 'pointer',
                                            fontSize: '14px',
                                            color: '#555'
                                        }} />}

                                </div>

                                <ErrorMessage name="password" component="div" className='mt-1' style={{ color: 'red', fontSize: '13px', margin: '0px' }} />


                                <p className='mt-4' style={{ fontSize: "10px" }}>
                                    By selecting Agree and continue, I agree to Airbnb’s Terms of Service, Payments Terms of Service, and Nondiscrimination <Link>Policy</Link> and acknowledge the <Link>Privacy Policy</Link>.
                                </p>

                                <button
                                    className='rounded-2 border-1 p-2 text-light'
                                    type="submit"
                                    style={{ background: 'linear-gradient(to right, #d6249f, #fd5949)', border: 'none' }}
                                >
                                    Agree and continue
                                </button>
                                <p className='ms-2 mt-2 text-danger'>{isError}</p>
                            </div>

                            <p className="text-muted small mt-2" style={{ fontSize: "12px" }}>
                                We'll call or text you to confirm your number. Standard message and data rates apply.
                                <span className="ms-1 fw-bold text-decoration-underline" style={{ cursor: 'pointer' }}>Privacy Policy</span>
                            </p>

                            <div className='text-center'>
                                <Link onClick={handleLogin} className='text-decoration-underline text-dark'>
                                    Login with email
                                </Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            ) : (
                <div className='w-100'>
                    <div className='m-1'>
                        <input type="email" placeholder='Email' onChange={(e)=>setEmail(e.target.value)} className='w-100 mb-2 p-2 rounded-3 border-1' />
                        <input type="password" placeholder='Password' onChange={(e)=>setPassword(e.target.value)} className='w-100 mb-2 p-2 rounded-3 border-1' />
                        <div className='d-flex justify-content-center'>
                            <Link onClick={handleLoginTo}
                             className='w-100  p-2  border-0 mt-2 rounded-2 text-center bg-dark text-light'
                                style={{ background: 'linear-gradient(to right, #d6249f, #fd5949)' }}>
                                    Continue
                            </Link>
                        </div>
                    </div>
                    <div className='text-center mt-3 '>
                        <Link onClick={() => setLoginForm(false)} className='text-decoration-underline text-dark '>
                            Sign Up Email
                        </Link>
                    </div>
                </div>


            )}
            <ToastContainer></ToastContainer>

            {showSuccessModal && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 9999
                }}>
                    <div style={{
                        backgroundColor: '#d4edda',
                        color: '#155724',
                        padding: '20px 30px',
                        borderRadius: '10px',
                        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                        textAlign: 'center'
                    }}>
                        <h5>✅ Success!</h5>
                        <p>You have signed up successfully.</p>
                    </div>
                </div>
            )}

        </>
    )
}

export default SignUpWithEmail
