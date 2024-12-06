import { useEffect, useState } from "react";
import appWriteService from "../../appWrite/config.service";
import { Container, PostCard } from "../index";

const AllPosts = () => {
   const [posts, setPosts] = useState([]);

   useEffect(() => {
      appWriteService
         .getActivePosts([])
         .then((res) => {
            if (res) {
               setPosts(res.documents);
            }
         })
         .catch((err) => console.log("Error: ", err));
   }, []);

   return (
      <div className='w-full py-8'>
         <Container>
            <div className='flex flex-wrap'>
               {posts?.map((post) => (
                  <div key={post.$id} className='p-2 w-1/4'>
                     <PostCard {...post} />
                  </div>
               ))}
            </div>
         </Container>
      </div>
   );
};

export default AllPosts;
