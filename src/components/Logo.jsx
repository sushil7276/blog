import BlogLogo from "../assets/blog.jpg";

const Logo = ({ width = "100px" }) => {
   return <img style={{ width }} src={BlogLogo} alt='Logo' />;
};

export default Logo;
