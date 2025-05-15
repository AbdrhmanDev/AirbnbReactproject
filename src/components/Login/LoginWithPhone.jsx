import React, { useState } from 'react'
import { Form, Button, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { emitter } from '../../features/emitter';
import { useDispatch } from 'react-redux';
import { LoginPhoneThunk } from '../../services/Slice/login/LoginPhone';
import { toast, ToastContainer } from 'react-toastify';
import { verifyOtpThunk } from '../../services/Slice/login/verifyOtp';
import { registerThunk } from '../../services/Slice/login/Register';

const LoginWithPhone = () => {
    const [form, setForm] = useState({ countryCode: '+20', phoneNumber: '', otp: '' });
    const [isLogin, setIsLogin] = useState(false)
    const [FirstPhone, setFirstPhone] = useState(true)
    const [FormLogin, setFormLogin] = useState(false)
    const dispatch = useDispatch();


    const handleSendOTP = async () => {
        const res = await dispatch(LoginPhoneThunk(form.phoneNumber))
        if (res.payload.isError === false) {
            setFirstPhone(false)
        } else {
            toast.error(res.payload.message)
        }
        console.log(res);

    };


    const handleVerifyOTP = async () => {
        const res = await dispatch(verifyOtpThunk({
            phone: form.phoneNumber,
            otp: form.otp
        }));
        if (res.payload.isError && res.payload.message == 'User not found') {
            setFormLogin(true)
            setIsLogin(false)

        } else if (res.payload.message == 'OTP expired' || res.payload.message == 'Invalid OTP') {
            toast.error(res.payload.message)
        }
        else {
            toast.success(res.payload.message)
            localStorage.setItem('token', res.payload.token)
            setIsLogin(true)
            emitter.emit('close-modal');
        }
    };

    const handlePhoneChange = (e) => {
        setForm(prev => ({ ...prev, phoneNumber: e.target.value }));
    };


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            dateOfBirth: null
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('firstName is required'),
            lastName: Yup.string().required('LastName is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            dateOfBirth: Yup.date().nullable().required("BirthOfDay Is required")
        }),
        onSubmit: async (values) => {
            const res = await dispatch(registerThunk({
                phone: form.phoneNumber,
                email: values.email,
                name: ` ${values.firstName} ${values.lastName}`,
                dateOfBirth: values.dateOfBirth
            }))
            if (res.payload.message === 'User registered successfully') {
                setFirstPhone(true)
                setFormLogin(false)
                toast.success(res.payload.message)
            } else if(res.payload.message === 'User already exists')
            {
                toast.error(res.payload.message)
            }

        }
    });




    return (
        <>
            {
                FirstPhone &&
                <div className="border rounded p-2 mb-3">
                    {/* إدخال رقم الموبايل */}
                    <>
                        <Form.Group className="mb-2 ">
                            <Form.Label className="small text-muted mb-1">Country code</Form.Label>
                            <Form.Select value={form.countryCode} onChange={e => setForm(prev => ({ ...prev, countryCode: e.target.value }))}>
                                <option value="+20">Egypt (+20)</option>
                                <option value="+1">USA (+1)</option>
                                <option value="+44">UK (+44)</option>
                                <option value="+966">Saudi Arabia (+966)</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <>
                                <div className='d-flex m-0'>
                                    <label className='pt-1'>{form.countryCode}</label>
                                    <input type="number" placeholder='Phone number' className="border-0 ms-2 w-100 p-1"
                                        value={form.phoneNumber} onChange={handlePhoneChange} />
                                </div>
                                <button style={{ background: 'linear-gradient(to right, #d6249f, #fd5949)', border: 'none' }}
                                    onClick={handleSendOTP} className='rounded-2 border-1 p-2 w-100 mt-4 text-light'
                                >
                                    Continue
                                </button>
                            </>
                        </Form.Group>
                    </>
                </div>
            }


            <>
                {/* إدخال OTP */}
                {
                    !isLogin && !FirstPhone && !FormLogin &&
                    <>
                        <Form.Group className="mt-2">
                            <Form.Label className="small text-muted mb-3 m-1 ">Enter the code we sent over SMS to <b>{form.phoneNumber}</b></Form.Label>
                            <input type="number" placeholder='Enter 6-digit OTP' className="border-2 rounded-3 mb-3 w-100 p-1"
                                value={form.otp} onChange={e => setForm(prev => ({ ...prev, otp: e.target.value }))} />
                        </Form.Group>
                        <Button
                            type="button"
                            className="w-100 mb-3 rounded-3"
                            style={{ background: 'linear-gradient(to right, #d6249f, #fd5949)', border: 'none', height: '50px', fontWeight: 'bold' }}
                            onClick={handleVerifyOTP}
                        >
                            send otp
                        </Button>
                    </>
                }
            </>
            {/* form Login and register */}
            {
                !isLogin && FormLogin &&
                <form>

                    <div className='d-flex flex-column '>
                        <label className=' p-0  '> first name.</label>
                        <div className='d-flex flex-column w-100'>

                            <input type="text" className='rounded-top-2 border-1 p-2  ps-3 '
                                name='firstName' placeholder='FirstName' value={formik.values.firstName}
                                onChange={formik.handleChange} onBlur={formik.handleBlur} />
                            {formik.errors.firstName && <div style={{ color: 'red', fontSize: "13px", margin: "5px" }}>{formik.errors.firstName}</div>}

                            <input type="text" className='rounded-bottom-2 border-1 p-2  ps-3 ' name='lastName'
                                value={formik.values.lastName} onBlur={formik.handleBlur} onChange={formik.handleChange} placeholder='lastName' />
                            {formik.errors.lastName && <div style={{ color: 'red', fontSize: "13px", margin: "5px" }}>{formik.errors.lastName}</div>}
                            <p className='rounded-2 border-1 pt-1' style={{ fontSize: "10px" }}>
                                Make sure this matches the name on your government ID. If you go by another name, you can add a preferred first name.</p>
                        </div>

                        <label className=''> Date of birth</label>
                        <DatePicker
                            showYearDropdown
                            selected={formik.values.dateOfBirth}
                            onChange={(date) => formik.setFieldValue("dateOfBirth", date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="dd/mm/yyyy"
                            className='rounded-2 border-1 p-2 ps-3 w-100 mt-1'
                        />
                        <p className='pt-1' style={{ fontSize: "10px" }}>To sign up, you need to be at least 18. Your birthday won’t be shared with other people who use Airbnb.</p>
                        <label className='m-  p-0'> Contact info</label>
                        <input type="text" className='rounded-2 border-1 p-2 ps-3  w-100'
                            value={formik.values.email} name="email"
                            onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder='email' />
                        {formik.errors.email && <div style={{ color: 'red', fontSize: "13px", margin: "5px" }}>{formik.errors.email}</div>}
                        <p className='pt-1 p-0 m-0' style={{ fontSize: "10px" }}>By signing up, you agree to Airbnb’s Terms of Service and acknowledge the <Link>Privacy Policy</Link>.</p>


                        <p className='mt-4' style={{ fontSize: "10px" }}>By selecting Agree and continue, I agree to Airbnb’s Terms of Service, Payments Terms of Service, and Nondiscrimination <Link>Policy and acknowledge</Link> the <Link> Privacy Policy</Link>.</p>
                        <button className='rounded-2 border-1 p-2  text-light'
                            type="button" onClick={() => {
                                formik.handleSubmit();
                                formik.setTouched({
                                    firstName: true,
                                    lastName: true,
                                    email: true,
                                });
                            }}
                            style={{ background: 'linear-gradient(to right, #d6249f, #fd5949)', border: 'none' }}
                        >
                            Agree and continue
                        </button>
                    </div>


                    <p className="text-muted small mt-2" style={{ fontSize: "12px" }}>
                        We'll call or text you to confirm your number. Standard message and data rates apply.
                        <span className="ms-1  fw-bold text-decoration-underline" style={{ cursor: 'pointer' }}>Privacy Policy</span>
                    </p>
                </form>
            }
       
            <ToastContainer></ToastContainer>
        </>
    );
};

export default LoginWithPhone;