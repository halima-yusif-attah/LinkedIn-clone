'use client'

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { getAllFollowers, IFollowers } from "@/actions/getAllFollowers";
import { IUser } from "@/types/user";
import { useUser } from "@clerk/nextjs";


type FollowerContextType = {
  followed: boolean;
  setFollowed: React.Dispatch<React.SetStateAction<boolean>>;
  followers: IUser[];
  setFollowers: React.Dispatch<React.SetStateAction<IUser[]>>;
  author: string;
};

const FollowerContext = createContext<FollowerContextType | undefined>(
  undefined
);

export function useFollowerContext() {
  const context = useContext(FollowerContext);
  if (!context) {
    throw new Error(
      "useFollowerContext must be used within a FollowerProvider"
    );
  }
  return context;
}

export const FollowerProvider = ({ children }: { children: ReactNode }) => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [followed, setFollowed] = useState(false);
  const [followers, setFollowers] = useState<IUser[]>([]);
  const [author, setAuthor] = useState<string>("");


  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        if (user) {
          const allFollowers: IFollowers = await getAllFollowers();

          console.log("allFollowers", allFollowers);

          const followersList = allFollowers.followers.map((follower) => {
            console.log("follower", follower); 
            return follower;
          });
          const postUid = allFollowers.postUserId;
 

          setFollowers(followersList);
          setAuthor(postUid);

          if (followersList.some((follower) => follower.userId === user.id)) {
            setFollowed(true);
          }
        }
      } catch (error) {
        console.error("Error fetching followers:", error);
      }
    };

    if (isLoaded && isSignedIn) {
      console.log("fetchFollowers", fetchFollowers());
      fetchFollowers();
    }
  }, [user, isLoaded, isSignedIn]); 

  

  return (
    <FollowerContext.Provider
      value={{ followed, setFollowed, followers, setFollowers, author }}
    >
      {children}
    </FollowerContext.Provider>
  );
};


