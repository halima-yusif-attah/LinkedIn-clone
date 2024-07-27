"use client"

import { useUser } from "@clerk/nextjs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ImageIcon, XIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useRef, useState } from "react";
import createPostAction from "@/actions/createPostAction";
import Image from "next/image";
import { toast } from "sonner";

function PostForm() {
    const { user } = useUser();
    const ref = useRef<HTMLFormElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [preview, setPreview] = useState<string | null>(null);
  
    const handlePostAction = async (formData: FormData) => {
        const formDataCopy = formData;
        ref.current?.reset();
        
        const text = formDataCopy.get('postInput') as string;
        
        if (!text.trim()) {
            throw new Error(`You must provide a post input`)
        }

        setPreview(null)

        try {
          await createPostAction(formDataCopy);
        } catch (error) {
            throw new Error(`Error creating a post: ${error}`);
        }
    };


    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
     const file = event.target.files?.[0];
    
     if (file) {
        setPreview(URL.createObjectURL(file));
       };
    }
    
    
  
    return (
      <div className="mb-2">
        <form
          ref={ref}
          action={(formData) => {
            const promise = handlePostAction(formData);

            toast.promise(promise, {
              loading: "Creating post...",
              success: "Post created!",
              error: "Failed to create post",
            });
          }}
          className="p-2 bg-white rounded-lg"
        >
          <div className="flex items-center space-x-2">
            <Avatar>
              <AvatarImage src={user?.imageUrl} />

              <AvatarFallback>
                {user?.firstName?.charAt(0)}
                {user?.lastName?.charAt(0)}
              </AvatarFallback>
            </Avatar>

            <input
              type="text"
              name="postInput"
              placeholder="Start writing a post..."
              className="flex-1 outline-none rounded-full py-3 px-4 border"
            />

            <input
              ref={fileInputRef}
              type="file"
              name="image"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />

            <button type="submit" hidden>
              Post
            </button>
          </div>

          {preview && (
            <div className="mt-3">
              <Image
                src={preview}
                alt="preview"
                className="w-full object-cover"
                width={10}
                height={10}
              />            
            </div>
          )}

            
          <div className="flex justify-end mt-2 space-x-2">
            <Button
              type="button"
              variant={preview ? "secondary" : "outline"}
              onClick={() => fileInputRef.current?.click()}
            >
              <ImageIcon className="mr-2" size={16} color="currentColor" />
              {preview ? "Change" : "Add"} image
            </Button>

            {/* Add a remove preview button */}

            {preview && (
              <Button
                variant="outline"
                type="button"
                onClick={() => setPreview(null)}
              >
                <XIcon className="mr-2" size={16} color="currentColor" />
                Remove image
              </Button>
            )}
          </div>
        </form>

        <hr className="mt-2 border-gray-300" />
      </div>
    );
}

export default PostForm