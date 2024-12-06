import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import appWriteService from "../../appWrite/config.service";
import { Button, Container } from "../index";
import parse from "html-react-parser";

const Post = () => {
   const [post, setPost] = useState(null);
   const { slug } = useParams();
   const navigate = useNavigate();

   const userData = useSelector((state) => state.auth);

   const isAuth =
      post && userData ? post.userId === userData.userData.$id : false;

   useEffect(() => {
      if (slug) {
         appWriteService.getPost(slug).then((res) => {
            if (res) {
               setPost(res);
            } else {
               navigate("/");
            }
         });
      } else {
         navigate("/");
      }
   }, [slug, navigate]);

   const deletePost = () => {
      appWriteService.deletePost(post.$id).then((res) => {
         if (res) {
            appWriteService.deleteFile(post.featureImg);
            navigate("/");
         }
      });
   };

   return post ? (
      <div className='py-8'>
         <Container>
            <div className='w-full flex justify-center mb-4 relative border rounded-xl p-2'>
               <img
                  src={appWriteService.getFilePreview(post.featureImg)}
                  alt={post.title}
                  className='rounded-xl'
               />

               {isAuth && (
                  <div className='absolute right-6 top-6'>
                     <Link to={`/edit-post/${post.$id}`}>
                        <Button bgColor='bg-green-500' className='mr-3'>
                           Edit
                        </Button>
                     </Link>
                     <Button bgColor='bg-red-500' onClick={deletePost}>
                        Delete
                     </Button>
                  </div>
               )}
            </div>
            <div className='w-full mb-6'>
               <h1 className='text-2xl font-bold'>{post.title}</h1>
            </div>
            <div className='browser-css'>{parse(post.content)}</div>
         </Container>
      </div>
   ) : null;
};

export default Post;
