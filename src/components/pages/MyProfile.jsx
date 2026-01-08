import React from 'react'
import { UserAuth } from '../auth/Context'
import Header from '../layout/header/header';
import contact from '../assets/contact.png'
const MyProfile = () => {
    const {session}=UserAuth();
    console.log(session);
    
  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-8 md:space-y-0 md:space-x-12">
          {/* Profile Picture & Info */}
          <div className="flex flex-col items-center md:items-start">
            <div className="mt-6 text-center md:text-left">
              <h2 className="text-3xl font-bold">{session.user.identities[0].identity_data.display_name}</h2>
              <p className="text-gray-600 mt-1">Email: {session.user.email}</p>
              <p className="text-gray-500 text-sm mt-2">New York, USA</p>
              <button className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-full">Follow</button>
            </div>
          </div>

          {/* Stats & Actions */}
          <div className="flex-1 text-center md:text-right">
            <div className="flex justify-center md:justify-end space-x-12 mb-8">
              <div>
                <p className="text-3xl font-bold">2,985</p>
                <p className="text-gray-600">Appreciations</p>
              </div>
              <div>
                <p className="text-3xl font-bold">132</p>
                <p className="text-gray-600">Followers</p>
              </div>
              <div>
                <p className="text-3xl font-bold">548</p>
                <p className="text-gray-600">Following</p>
              </div>
            </div>
            <div className="flex justify-center md:justify-end space-x-4">
              <button className="border border-gray-300 px-4 py-2 rounded-full">Message</button>
              <button className="border border-gray-300 px-4 py-2 rounded-full">Hire Me</button>
            </div>
          </div>
        </div>
      </section>
    </div>
    
    </>
  )
}

export default MyProfile