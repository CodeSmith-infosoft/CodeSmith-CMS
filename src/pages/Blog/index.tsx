import Blog from '@/components/BlogComponent/Blog'
import PageTitle from '@/components/CommonComponents/PageTitle'
import { useState } from 'react'

const BlogPage = () => {
    const [totalCount, setTotalCount] = useState(0)

    return (
        <>
            <PageTitle title='Blog' button='Blog' path='/add-blog' totalCount={totalCount} />
            <Blog setTotalCount={setTotalCount} />
        </>
    )
}

export default BlogPage