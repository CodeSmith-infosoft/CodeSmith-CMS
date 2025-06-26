import PageTitle from '@/components/CommonComponents/PageTitle'
import Team from '@/components/TeamComponent/Team'
import { useState } from 'react'

const TeamMember = () => {
    const [totalCount, setTotalCount] = useState(0)

    return (
        <>
            <PageTitle title='Team Member' button='Team Member' path='/add-team' totalCount={totalCount} />
            <Team setTotalCount={setTotalCount} />
        </>
    )
}

export default TeamMember