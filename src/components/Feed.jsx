import React, { useEffect } from 'react'
import axios from 'axios';
import { BASE_URL } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { addFeed } from '../utils/feedSlice'
import UserCards from './UserCards';
import { useNavigate } from 'react-router-dom';

function Feed() {
    const navigate = useNavigate()
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

    if (!getFeed){
         navigate("/")
    }



    if (!feed) {
      return null;
    }

    if (feed.length === 0) {
      return (
        <h1 className="text-center text-2xl font-bold mt-10">
          no new users found!!
        </h1>
      );
    }

    return (
        < div className='' >
            {feed && feed.length > 0 && <UserCards user={feed[1]} />}
        </div >
    )
}

export default Feed
