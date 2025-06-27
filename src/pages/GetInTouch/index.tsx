import PageTitle from '@/components/CommonComponents/PageTitle'
import GetInTouchComponent from '@/components/GetInTouch/GetInTouchComponent'
import { useState } from 'react'

const GetInTouch = () => {
    const [totalCount, setTotalCount] = useState(0)

    return (
        <>
            <PageTitle title='Get In Touch' totalCount={totalCount} />
            <GetInTouchComponent setTotalCount={setTotalCount} />
        </>
    )
}

export default GetInTouch