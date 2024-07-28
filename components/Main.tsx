import Image from 'next/image';
import React from 'react'

function Main() {
  return (
    <div className="flex flex-1 flex-row bg-[white] gap-[2rem] p-4 justify-center items-center rounded-lg">
     
        <Image
          className="rounded-lg"
          src="https://links.papareact.com/b3z"
          width={200}
          alt="linkedin logo"
          height={200}
          
        />
    

      <div className="w-[25%] text-center">
        <h1 className="text-xl font-medium">
          Sign in from the top to proceed...
        </h1>
      </div>
    </div>
  );
}

export default Main