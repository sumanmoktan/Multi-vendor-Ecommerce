import React, { useState } from 'react'
import Header from '../component/Layout/Header'
import styles from '../styles/Style'
import ProfileSideBar from '../component/Profile/ProfileSideBar'
import ProfileContent from '../component/Profile/ProfileContent'

const ProfilePage = () => {
    const [active, setActive] = useState(1)
  return (
    <div>
        <Header/>
        <div className={`${styles.section} flex bg-green-50 py-10`}>
            <div className=" w-[50px] sm:w-[335px] relative sm:mt-0 mt-[10%]">
                <ProfileSideBar active={active} setActive={setActive}/>
            </div>
            <ProfileContent active={active}/>
        </div>
    </div>
  )
}

export default ProfilePage