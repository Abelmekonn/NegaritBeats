import React from 'react'
import UserProfile from '../../components/profileUpdate/UserProfile'
import SubscriptionPlan from '../../components/profileUpdate/SubscriptionPlan'
import Layout from '../../components/LayOut/Layout'

const Setting = () => {
    return (
        <Layout>
            <div className='flex w-full flex-col pt-20 gap-12'>
                <UserProfile />
            </div>
        </Layout>
    )
}

export default Setting