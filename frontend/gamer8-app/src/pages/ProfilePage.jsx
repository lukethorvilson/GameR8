import React from 'react'
import { useParams } from 'react-router-dom'

function ProfilePage() {
    const {id: userId} = useParams();
  return (
    <div>ProfilePage</div>
  )
}

export default ProfilePage