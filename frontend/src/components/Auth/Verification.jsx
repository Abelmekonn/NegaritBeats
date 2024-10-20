import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activateUserRequest, resendOtpRequest } from '../../../redux/features/user/userSlice'; // Adjust the import path as necessary
import { toast } from 'react-hot-toast'; // Import toast for notifications
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Verification = () => {
    const [otp, setOtp] = useState(['', '', '', '']);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const { loading, activationSuccess, error } = useSelector(state => state.user); // Access user state
    const activationToken = useSelector(state => state.user.activationToken); // Access activation token from Redux state

    console.log("Activation token from Redux:", activationToken); // Log token for debugging

    const handleChange = (index, value) => {
        const newOtp = [...otp];
        if (value.match(/^[0-9]$/) || value === '') { // Allow only numbers or empty
            newOtp[index] = value;

            // Move focus to the next input
            if (value && index < 3) {
                const nextInput = document.getElementById(`otp-input-${index + 1}`);
                nextInput?.focus();
            }
            setOtp(newOtp);
        }
    };

    const handleSubmit = () => {
        const otpCode = otp.join(''); // Combine OTP array into a single string
        if (otpCode.length === 4) { // Ensure all fields are filled
            // Dispatch action to activate user with the OTP and activation token
            dispatch(activateUserRequest({
                activation_code: otpCode,
                activation_token: activationToken, // Use activation_token from Redux state
            }));
        } else {
            toast.error('Please fill all OTP fields.');
        }
    };

    const handleResendOtp = () => {
        dispatch(resendOtpRequest()); // Dispatch action to resend OTP
        toast.success('OTP resent! Please check your email.');
    };

    // Show success or error notifications based on activation status
    useEffect(() => {
        if (activationSuccess) {
            toast.success('Account activated successfully!');
            navigate('/login'); // Navigate to the login page
            setOtp(['', '', '', '']); // Clear OTP input on success
        }
        if (error) {
            toast.error(error);
            setOtp(['', '', '', '']); // Clear OTP input on error
        }
    }, [activationSuccess, error, navigate]); // Added navigate to dependencies

    return (
        <div className='h-screen flex items-center justify-center bg-[#181818]'>
            <div className="[--shadow:rgba(60,64,67,0.3)_0_1px_2px_0,rgba(60,64,67,0.15)_0_2px_6px_2px] w-4/5 max-w-xs h-auto space-y-4">
                <div className="flex flex-col items-center justify-center relative rounded-xl p-4 bg-[#1a1a1a] text-white border border-gray-700 overflow-hidden">
                    <h6 className="text-2xl font-bold">OTP Verification</h6>

                    <div className="my-6 w-full grid grid-flow-col grid-cols-4 items-center justify-center justify-items-center">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-input-${index}`}
                                className="block text-black focus:placeholder:opacity-0 placeholder:text-muted-foreground/80 placeholder:text-[24px] text-[20px] leading-[20px] font-bold text-center h-10 w-10 max-w-full rounded-md p-0 border border-input bg-white transition-colors focus-visible:outline-0 focus-visible:border-transparent focus-visible:ring-2 focus-visible:ring-[#2f81f7]"
                                spellCheck="false"
                                autoComplete="one-time-code"
                                placeholder="○"
                                type="tel"
                                inputMode="numeric"
                                maxLength="1"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onFocus={() => { setOtp((prev) => prev.map((d, i) => (i === index ? d : ''))); }} // Clear focused input
                            />
                        ))}
                    </div>
                    <span className="text-zinc-500 text-[12px] text-center">
                        Please enter the 4-digit one-time password (OTP) that we sent to your registered email.
                    </span>
                    <button
                        type="button"
                        className={`mt-[14px] text-base text-white font-medium tracking-wider rounded-md w-full px-4 py-1 transition-colors duration-200 border border-solid border-transparent ${loading ? 'bg-gray-400' : 'bg-sky-500 hover:bg-sky-600/80'}`}
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? 'Verifying...' : 'Verify'}
                    </button>
                    <button
                        type="button"
                        className="mt-2 text-sm text-[#00bfff] hover:underline"
                        onClick={handleResendOtp}
                    >
                        Resend OTP
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Verification;
