import React from "react";
import profileImg from "../assets/profileImg.png";
import { Button } from "primereact/button";

type Props = {
  onClick: () => void;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const Profile = ({ ...props }: Props) => {
  const user = false;
  return (
    <div className="flex flex-row w-full">
      <div className="w-[20%] flex flex-col  px-7 py-12">
        <ul className="flex flex-col gap-y-5 text-[#828282] text-sm ">
          <li className="hover:text-base">
            <a href="/profile">Profile</a>
          </li>
          <li className="hover:text-base">
            <a href="">My Listings</a>
          </li>
          <li className="hover:text-base">
            <a href="">Settings</a>
          </li>
        </ul>
      </div>
      <div className="flex flex-row justify-around relative w-[80%] p-10 mr-32 mb-96">
        <div className="w-36 h-36">
          {user ? <img src={""} /> : <img src={profileImg} />}
        </div>
        <div>
          <h4>Glakuta</h4>
          <p>Joined: 1 month ago</p>
        </div>
        <Button
          label="Edit Profile"
          className="h-10 bg-[#e5e5e5] text-black hover:bg-neutral-300 border-none"
          onClick={() => console.log("Edit Profile")}
        />
      </div>
    </div>
  );
};

export default Profile;
