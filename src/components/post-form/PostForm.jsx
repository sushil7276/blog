import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import appWriteService from "../../appWrite/config.service";
import { useCallback, useEffect } from "react";
import { Input, Button, RTE, Select } from "../index";

const PostForm = ({ post }) => {
   console.log("post :: ", post);
   const userData = useSelector((state) => state.auth.userData);
   const navigate = useNavigate();
   const { register, handleSubmit, watch, setValue, control, getValues } =
      useForm({
         defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            slug: post?.slug || "",
            status: post?.status || "active",
         },
      });

   const submit = async (data) => {
      if (post) {
         // If new file is there then upload new image
         const file = data.image[0]
            ? await appWriteService.uploadFile(data.image[0])
            : null;

         if (file) {
            // If new Image is present then delete previous image
            appWriteService.deleteFile(post.featureImg);
         }

         // update post with new image id
         const dbPost = await appWriteService.updatePost(post.$id, {
            ...data,
            featureImg: file ? file.$id : undefined,
         });

         if (dbPost) {
            navigate(`/post/${dbPost.$id}`);
         }
      } else {
         // upload new image file
         const file = await appWriteService.uploadFile(data.image[0]);

         if (file) {
            // store image id
            data.featureImg = file.$id;

            // create new post with update user Id
            const dbPost = await appWriteService.createPost({
               ...data,
               userId: userData.$id,
            });

            if (dbPost) {
               navigate(`/post/${dbPost.$id}`);
            }
         }
      }
   };

   const slugTransform = useCallback((value) => {
      if (value && typeof value === "string") {
         return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, "-")
            .replace(/\s/g, "-");
      }

      return "";
   }, []);

   useEffect(() => {
      const subscribe = watch((value, { name }) => {
         if (name === "title") {
            setValue(
               "slug",
               slugTransform(value.title, { shouldValidate: true })
            );
         }
      });

      return () => {
         subscribe.unsubscribe();
      };
   }, [watch, setValue, slugTransform]);

   return (
      <form onSubmit={handleSubmit(submit)} className='flex flex-wrap'>
         <div className='w-2/3 px-2'>
            <Input
               label='Title :'
               placeholder='Title'
               className='mb-4'
               {...register("title", { required: true })}
            />
            <Input
               label='Slug :'
               placeholder='Slug'
               readOnly={true}
               className='mb-4'
               {...register("slug", { required: true })}
               onInput={(e) => {
                  setValue(
                     "title",
                     slugTransform(e.currentTarget.value, {
                        shouldValidate: true,
                     })
                  );
               }}
            />

            <RTE
               label='Content :'
               name='content'
               control={control}
               defaultValue={getValues("content")}
            />
         </div>
         <div className='w-1/3 px-2'>
            <Input
               label='Featured Image :'
               type='file'
               className='mb-4'
               accept='image/png, image/jpg, image/jpeg, image/gif'
               {...register("image", { required: !post })}
            />

            {post && (
               <div className='w-full mb-4'>
                  <img
                     src={appWriteService.getFilePreview(post.featureImg)}
                     alt={post.title}
                     className='rounded-lg'
                  />
               </div>
            )}
            <Select
               options={["active", "inactive"]}
               label='Status'
               className='mb-4'
               {...register("status", { required: true })}
            />
            <Button
               type='submit'
               bgColor={post ? "bg-green-500" : "bg-blue-500"}
               className='w-full'
            >
               {post ? "Update" : "Create"}
            </Button>
         </div>
      </form>
   );
};

export default PostForm;
