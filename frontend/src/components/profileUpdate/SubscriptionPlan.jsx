import React, { useState, useEffect } from 'react';
import { FaCircleCheck } from "react-icons/fa6";
const SubscriptionPlan = () => {
    const [currentPlan, setCurrentPlan] = useState(null);
    const [availablePlans, setAvailablePlans] = useState([]);

    // Mock subscription plans (replace with an API call for dynamic plans)
    const plans = [

        {
            id: 2,
            name: 'Student Plan',
            price: '$4.99/month',
            features: [
                'Ad-free experience',
                'Unlimited skips',
                'Offline listening',
                'Premium sound quality',
                '1 Premium account'
            ],
            limitations: [
                'No multiple accounts'
            ]
        },
        {
            id: 3,
            name: 'Family Plan',
            price: '$24.99/month',
            features: [
                'Ad-free experience',
                'Unlimited skips',
                'Offline listening',
                'Premium sound quality',
                'Up to 5 Premium accounts'
            ],
            limitations: []
        },
        {
            id: 4,
            name: 'Individual Plan',
            price: '$9.99/month',
            features: [
                'Ad-free experience',
                'Unlimited skips',
                'Offline listening',
                'Premium sound quality',
                '1 Premium account'
            ],
            limitations: [
                'No multiple accounts'
            ]
        }
    ];

    useEffect(() => {
        // Mock fetching current user plan
        const userCurrentPlan = { id: 1, name: 'Free Plan', startDate: '2024-01-15' };
        setCurrentPlan(userCurrentPlan);
        setAvailablePlans(plans);
    }, []);

    const handleSubscribe = (planId) => {
        const selectedPlan = availablePlans.find(plan => plan.id === planId);
        console.log('Subscribing to plan:', selectedPlan.name);
        // Call your backend API to handle the subscription
    };

    return (
        <div className="w-full  mx-auto  md:p-6 rounded-lg ">
            <h1 className='text-white text-3xl font-bold mb-6'>
                Manage <span className='text-pink-500'>Subscription</span>
            </h1>
            {/* Current Plan Section */}
            <div className="text-white p-4 mb-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold ">Current Plan</h2>
                {currentPlan ? (
                    <p className=" mt-2">
                        You are currently subscribed to the <span className='text-2xl text-pink-500'>Free Plane</span>,
                        active since <strong>{currentPlan.startDate}</strong>.
                    </p>
                ) : (
                    <p className=" mt-2">You don't have an active subscription.</p>
                )}
            </div>
            {/* Available Plans Section */}
            <div className="text-white p-4 mb-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-7">Available Plans</h2>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {availablePlans.map(plan => (
                        <div
                            key={plan.id}
                            className={`${plan.id === 3 ? "md:scale-110 bg-[#020234] " : "bg-[#19195a]"} px-6 pt-8 pb-6 relative flex flex-col text-white justify-between border rounded-lg   transition cursor-pointer`}
                            onClick={() => handleSubscribe(plan.id)}
                            style={{
                                border: '2px solid rgba(70, 29, 187, 0.9)', // Apply a solid border
                                boxShadow: '0px 4px 20px rgba(70, 29, 187, 0.5)', // Apply a shadow effect
                            }}
                        >
                            <h3 className=" text-2xl text-center font-bold mb-4">{plan.name}</h3>
                            <p className=" mt-2 text-center text-xl">{plan.price}</p>
                            <button
                                className={`w-full mt-4 p-2 rounded-lg text-white font-bold ${plan.id === currentPlan?.id
                                    ? 'bg-green-500 cursor-not-allowed'
                                    : 'bg-pink-500 hover:bg-pink-600'
                                    }`}
                                disabled={plan.id === currentPlan?.id}
                            >
                                {plan.id === currentPlan?.id ? 'Current Plan' : 'Subscribe'}
                            </button>
                            <ul className=" mt-4 space-y-2">
                                {plan.features.map((feature, index) => (
                                    <li className='flex items-center gap-2' key={index}><FaCircleCheck className='text-blue-600' /> {feature}</li>
                                ))}
                            </ul>
                            {plan.limitations.length > 0 && (
                                <>
                                    <ul className="text-gray-400 mt-2 space-y-1">
                                        {plan.limitations.map((limitation, index) => (
                                            <li className='flex items-center gap-2' key={index}><FaCircleCheck className='text-gray-500' /> {limitation}</li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SubscriptionPlan;
