import React from 'react';
import { useGetAllPlan } from '../../hooks/usePlan';
import CardPremium from '../../components/CardPremium';
function ContentPremium() {
    const { data: plans, isLoading, isError, error, refetch } = useGetAllPlan("");
    console.log("plans", plans)
    return (
        <div className='flex flex-wrap items-center justify-center space-x-5 space-y-5 max-w-full'>
            {plans && plans?.data?.length > 0 && plans?.data?.map((plan, index) => (
                <CardPremium
                    id={plan.id}
                    title={plan.name}
                    price={plan.price}
                    duration={plan.duration_days}
                    description={plan.description}
                />
            ))}
        </div>
    );
}

export default ContentPremium;