import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState, useRef, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { auth } from './Setup'
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { emitter } from '../../features/emitter';
import { useDispatch } from 'react-redux';
import { googleLoginThunk } from '../../services/Slice/Login/GoogleLogin';

const LoginWithPhone = () => {
    const [form, setForm] = useState({ countryCode: '+20', phoneNumber: '', otp: '' });
    const [state, setState] = useState({
        confirmationResult: null, showOtpInput: false,
        loading: false, error: null, isVerified: false
    });
    const [userId, setUserId] = useState(null);
    const recaptchaRef = useRef(null);
    const containerRef = useRef(null);
    const [date, setDate] = useState(null)
    const dispatch = useDispatch();
    useEffect(() => {
        if (containerRef.current && !recaptchaRef.current) {
            recaptchaRef.current = new RecaptchaVerifier(auth, containerRef.current, {
                size: 'invisible',
                callback: () => console.log('reCAPTCHA verified'),
                'expired-callback': () => {
                    recaptchaRef.current = null;
                }
            });
        }
        return () => recaptchaRef.current = null;
    }, []);

    const handleSendOTP = async () => {
        if (!form.phoneNumber) return setState(prev => ({ ...prev, error: "Please enter a phone number." }));
        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const fullPhone = form.countryCode + form.phoneNumber;
            const confirmation = await signInWithPhoneNumber(auth, fullPhone, recaptchaRef.current);
            setState(prev => ({ ...prev, confirmationResult: confirmation, showOtpInput: true, loading: false }));
        } catch (error) {
            console.error('Error sending OTP:', error);
            let errorMessage = "Failed to send OTP";
            setState(prev => ({ ...prev, error: errorMessage, loading: false }));
            recaptchaRef.current = null;
        }
    };


    const handleVerifyOTP = async () => {
        if (!form.otp || form.otp.length !== 6) {
            return setState(prev => ({ ...prev, error: "Please enter a valid 6-digit OTP" }));
        }

        if (!state.confirmationResult) {
            return setState(prev => ({ ...prev, error: "Please request a new OTP" }));
        }

        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
            const result = await state.confirmationResult.confirm(form.otp);
            const user = result.user;
            const userToken = await user.getIdToken();
            setUserId(userToken || 0);
            console.log('OTP verified successfully:', userToken);
            setState(prev => ({ ...prev, error: null, isVerified: true }));
        } catch (error) {
            setState(prev => ({ ...prev, error: "we error waring" }));

            console.error('Error verifying OTP:', error);
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };



    const handlePhoneChange = (e) => {
        setForm(prev => ({ ...prev, phoneNumber: e.target.value }));
        setState(prev => ({ ...prev, error: null }));
    };


    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('firstName is required'),
            lastName: Yup.string().required('LastName is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
        }),
        onSubmit: (values,) => {
            const fullname = formik.values.firstName + formik.values.lastName
            const emails = formik.values.email
            dispatch(googleLoginThunk({ idToken: userId, email: emails, name: fullname }))
            console.log({ idToken: userId, email: emails, name: fullname });
            emitter.emit('close-modal')
            console.log('Form submitted:', values);
        }
    });




    return (
        <>
            {!state.isVerified && !state.showOtpInput && (
                <div className="border rounded p-2 mb-3">
                    <>
                        {/* إدخال رقم الموبايل */}
                        <Form.Group className="mb-2">
                            <Form.Label className="small text-muted mb-1">Country code</Form.Label>
                            <Form.Select value={form.countryCode} onChange={e => setForm(prev => ({ ...prev, countryCode: e.target.value }))}>
                                <option value="+20">Egypt (+20)</option>
                                <option value="+1">USA (+1)</option>
                                <option value="+44">UK (+44)</option>
                                <option value="+966">Saudi Arabia (+966)</option>
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className="mt-2">
                            <div className='d-flex m-0'>
                                <label className='pt-1'>{form.countryCode}</label>
                                <input type="number" placeholder='Phone number' className="border-0 ms-2 w-100 p-1"
                                    value={form.phoneNumber} onChange={handlePhoneChange} />
                            </div>
                        </Form.Group>
                    </>
                </div>
            )}

            {!state.isVerified && state.showOtpInput && (
                <>
                    {/* إدخال OTP */}
                    <Form.Group className="mt-2">
                        <Form.Label className="small text-muted mb-3 m-1 ">Enter OTP</Form.Label>
                        <input type="number" placeholder='Enter 6-digit OTP' className="border-2 rounded-3 mb-3 w-100 p-1"
                            value={form.otp} onChange={e => setForm(prev => ({ ...prev, otp: e.target.value }))} />
                    </Form.Group>
                </>
            )

            }

            {state.error && <div className="alert alert-danger mt-2">Please check your number</div>}
            <div ref={containerRef} style={{ display: 'none' }}></div>

            <form onSubmit={formik.handleSubmit}>
                {state.isVerified && (
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
                            selected={date}
                            onChange={(date) => setDate(date)}
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
                )}

                <p className="text-muted small mt-2" style={{ fontSize: "12px" }}>
                    We'll call or text you to confirm your number. Standard message and data rates apply.
                    <span className="ms-1  fw-bold text-decoration-underline" style={{ cursor: 'pointer' }}>Privacy Policy</span>
                </p>
            </form>

            {!state.isVerified && (
                <Button
                    type="button"
                    className="w-100 mb-3 rounded-3"
                    style={{ background: 'linear-gradient(to right, #d6249f, #fd5949)', border: 'none', height: '50px', fontWeight: 'bold' }}
                    onClick={state.showOtpInput ? handleVerifyOTP : handleSendOTP}
                    disabled={state.loading}
                >
                    {state.loading ? 'Processing...' : (state.showOtpInput ? 'Verify OTP' : 'Continue')}
                </Button>
            )}

        </>
    );
};

export default LoginWithPhone;