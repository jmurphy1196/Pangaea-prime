import "../../styles/pages/sellPage.css";
import { CreateProduct } from "../products/CreateProduct";

export function SellPage() {
  return (
    <>
      <div className='sell__page'>
        <CreateProduct />
      </div>
    </>
  );
}
