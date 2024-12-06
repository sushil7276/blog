import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import appWriteService from "../../appWrite/config.service";
import PostForm, { Container } from "../index";

const EditPost = () => {
   const [post, setPost] = useState(null);
   const { slug } = useParams();
   const navigate = useNavigate();

   useEffect(() => {
      if (slug) {
         appWriteService.getPost(slug).then((res) => setPost(res));
      } else {
         navigate("/");
      }
   }, [slug, navigate]);

   return post ? (
      <div className='py-8'>
         <Container>
            <PostForm post={post} />
         </Container>
      </div>
   ) : null;
};

export default EditPost;
