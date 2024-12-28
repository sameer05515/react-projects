import { useNavigate } from "react-router-dom";

const useNavigation = () => {
  const navigate = useNavigate();

  const goTo = (path: string) => {
    navigate(path); // Navigate to the specified path
  };

  const goBack = () => {
    navigate(-1); // Navigate back to the previous page
  };

  const goHome = () => {
    // navigate("/"); // Navigate to the home page
    goTo("/");
  };

  const goToProblemDetails=(id:string)=>{
    goTo(`/problem/${id}`);
  }

  return { goBack, goHome, goToProblemDetails };
};

export default useNavigation;
