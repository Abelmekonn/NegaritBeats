import React from 'react'
import Layout from '../../components/LayOut/Layout'
import SubscriptionPlan from '../../components/profileUpdate/SubscriptionPlan'

const Subscription = () => {
    return (
        <Layout>
            <div className='flex w-full flex-col pt-20 gap-12'>
                <SubscriptionPlan />
            </div>
        </Layout>
    )
}

export default Subscription