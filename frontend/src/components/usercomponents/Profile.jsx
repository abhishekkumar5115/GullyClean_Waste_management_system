import React,{useState} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {updateProfile} from '../../store/authSlice'

function Profile() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.auth)
    const [formdata,setFormdata] = useState({
        name : user?.name || "",
        email: user?.email || "",
       
    })
    const [editing , setEditing] = useState(false)
    const handleChange = (e) => {
        setFormdata((prev) => ({...prev,[e.target.name]: e.target.value}))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile(formdata))
        setEditing(false)
    }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow rounded-lg">
      <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
      {!editing ? (
        <div>
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <button
            onClick={() => setEditing(true)}
            className="btn btn-secondary btn-sm mt-4"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div className="flex space-x-2">
            <button
              type="submit"
              className="btn btn-primary"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditing(false)}
              className="btn btn-ghost"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default Profile