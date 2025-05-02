import { useMutation, useQueryClient } from "@tanstack/react-query";
import { customFetch } from "../utils/idnex";
import { useNavigate } from "react-router-dom";

const deleteProduct = async (productId) => {
  const response = await customFetch.delete(`/products/${productId}`);
  return response.data;
};

export const useDeleteProduct = (productId) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: () => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate("/products");
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
      alert("Something went wrong while deleting the product.");
    },
  });
};
