import React from 'react';
import { useSelector } from 'react-redux';
import { User, Mail, Phone, Award, Calendar } from 'lucide-react';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <div>Loading profile...</div>;
    }

    return (
        <div className="card bg-base-100 shadow-xl rounded-2xl overflow-hidden">
            <div className="card-body items-center text-center p-6">
                <div className="avatar mb-4">
                    <div className="w-24 rounded-full bg-gradient-to-r from-primary to-secondary p-1">
                         <img 
                           src={`https://ui-avatars.com/api/?name=${user.name.replace(/\s/g, '+')}&background=random&color=fff&size=128&bold=true`} 
                           alt="User Avatar" 
                           className="rounded-full"
                         />
                    </div>
                </div>
                <h2 className="card-title text-3xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {user.name}
                </h2>
                <span className="badge badge-secondary badge-lg gap-1 mt-2">
                  <Award size={14} />
                  {user.role}
                </span>
                <div className="mt-6 text-left space-y-4 w-full">
                    <p className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <Mail className="text-primary"/> 
                      <span className="font-medium">{user.email}</span>
                    </p>
                    <p className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <Phone className="text-primary"/> 
                      <span>{user.phone || 'No phone number provided'}</span>
                    </p>
                    <p className="flex items-center gap-3 p-3 bg-base-200 rounded-lg">
                      <Calendar className="text-primary"/> 
                      <span>Member since {new Date(user.createdAt).toLocaleDateString()}</span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Profile;