import CaseStudyComponent from '@/components/CasestudyComponent/CaseStudyComponent'
import PageTitle from '@/components/CommonComponents/PageTitle'
import { useState } from 'react'

const CaseStudy = () => {
    const [totalCount, setTotalCount] = useState(0)

    return (
        <>
            <PageTitle title='CaseStudy' button='CaseStudy' path='/add-casestudy' totalCount={totalCount} />
            <CaseStudyComponent setTotalCount={setTotalCount} />
        </>
    )
}

export default CaseStudy