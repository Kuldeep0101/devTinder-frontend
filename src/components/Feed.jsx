import React, { useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice'
import UserCards from './UserCards';

function Feed() {
    const feed = useSelector((store) => store.feed)
    const dispatch = useDispatch()
    console.log(feed)

    const getFeed = async () => {
        if (feed) return;
        try {
            const res = await axios.get(BASE_URL + "/user/feed", { withCredentials: true })
            dispatch(addFeed(res.data))
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => { getFeed() }, [])

    return (
        < div className='' >
            {feed && feed.length > 0 && <UserCards user={feed[8]} />}
        </div >
    )
}

export default Feed
