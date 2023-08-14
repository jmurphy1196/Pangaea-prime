import "../../styles/pages/sellPage.css";
import { CreateProduct } from "../products/CreateProduct";

// eslint-disable-next-line
export function SellPage({ edit }) {
  return (
    <>
      <div className='sell__page'>
        <CreateProduct edit={edit} />
      </div>
    </>
  );
}
