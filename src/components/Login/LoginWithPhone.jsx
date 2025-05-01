import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import React, { useState, useRef, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap';
import { auth } from './Setup'
// import { emitter } from '../../features/emitter';
// import { useDispatch } from 'react-redux';
// import { googleLoginThunk } from '../../services/Slice/Login/GoogleLogin';

const LoginWithPhone = () => {
    const [form, setForm] = useState({ countryCode: '+20', phoneNumber: '', otp: '' });
    const [state, setState] = useState({ confirmationResult: null, showOtpInput: false, loading: false, error: null });
    const recaptchaRef = useRef(null);
    const containerRef = useRef(null);
    // const dispatch= useDispatch();
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


    let result;
    const handleVerifyOTP = async () => {
        if (!form.otp || form.otp.length !== 6) {
            return setState(prev => ({ ...prev, error: "Please enter a valid 6-digit OTP" }));
        }
        
        if (!state.confirmationResult) {
            return setState(prev => ({ ...prev, error: "Please request a new OTP" }));
        }

        setState(prev => ({ ...prev, loading: true, error: null }));
        try {
             result = await state.confirmationResult.confirm(form.otp);
            console.log('OTP verified successfully:', result.user);
            
            setState(prev => ({ ...prev, error: null }));
            // emitter.emit('close-modal')
        } catch (error) {
            console.error('Error verifying OTP:', error);
        } finally {
            setState(prev => ({ ...prev, loading: false }));
        }
    };

    const handlePhoneChange =(e) => {
        setForm(prev => ({ ...prev, phoneNumber: e.target.value }));
        setState(prev => ({ ...prev, error: null }));
    };

    return (
        <>
            <div className="border rounded p-2 mb-3">
                {!state.showOtpInput ? (
                    <>
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
                ) : (
                    <Form.Group className="mt-2">
                        <Form.Label className="small text-muted mb-1">Enter OTP</Form.Label>
                        <input type="number" placeholder='Enter 6-digit OTP' className="border-0 w-100 p-1" 
                            value={form.otp} onChange={e => setForm(prev => ({ ...prev, otp: e.target.value }))} />
                    </Form.Group>
                )
                
                }
                {state.error && <div className="alert alert-danger mt-2">Please check your number</div>}
                <div ref={containerRef} style={{ display: 'none' }}></div>
            </div>

            <p className="text-muted small">
                We'll call or text you to confirm your number. Standard message and data rates apply.
                <span className="ms-1 fw-bold text-decoration-underline" style={{ cursor: 'pointer' }}>Privacy Policy</span>
            </p>

            <Button type="button" className="w-100 mb-3 rounded-3" style={{ background: 'linear-gradient(to right, #d6249f, #fd5949)', border: 'none', height: '50px', fontWeight: 'bold' }}
                onClick={state.showOtpInput ? handleVerifyOTP : handleSendOTP} disabled={state.loading}>
                {state.loading ? 'Processing...' : (state.showOtpInput ? 'Verify OTP' : 'Continue')}
            </Button>
        </>
    );
};

export default LoginWithPhone;