import { redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateProducrForm, SectionTitle } from "../components";

export const loader = (store) => async () => {
    const user = store.getState().userState.user;
  
    if (!user) {
      toast.warn("You must to logged in to create product");
      return redirect("/login");
    }
  
    return null;
  };

const CreateProductPage = () => {

    return(
        <>
          <SectionTitle text="Create your product" />
          <div className="mt-8 grid gap-8 md:grid-cols-2 items-start py-8 px-8">
            <CreateProducrForm />
          </div>
        </>
    );
};

export default CreateProductPage;