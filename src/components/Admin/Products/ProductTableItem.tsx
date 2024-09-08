import {FC} from "react";
import {Col, Image, Row} from "react-bootstrap";
import {Edit2, Eye, Trash2} from "react-feather";
import {IProduct} from "../../../Types/IProduct";
import {BsFillCircleFill} from "react-icons/bs";
import Swal from "sweetalert2";
import {useNavigate} from "react-router-dom";

type ProductTableItemProps = {
    product: IProduct
}

const ProductsListItem: FC<ProductTableItemProps> = (product) => {
    // const {addToast} = useToasts();
 console.log('product')
 console.log(product)
    const navigate = useNavigate();

    const productItem = product.product;
    const renderInventory = (qty: number) => {
        return qty === 0 ?
            <label className='d-flex align-items-center'>
                <BsFillCircleFill color={'#F42B3D'}/>
                <span className='ms-lg-1' style={{color: "#F42B3D"}}> Out Of Stock</span>
            </label> :
            <label className='d-flex align-items-center'>
                <BsFillCircleFill color={'#32CC96'}/>
                <span className='ms-lg-1' style={{color: "#32CC96"}}>In Stock</span>
            </label>;
    }

    const handleOnClick = () => {
        Swal.fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result: any) => {
          if (result.isConfirmed) {
            // addToast("Product deleted", {appearance: 'success', autoDismiss: true, placement:'top-right'});
          }
        });
      };
    const handleOnViewClick = () => {
        //  this isDisabled need to create in redux store and have to send data from here
        // isDisabled = true;
        navigate('/admin/products/addproduct');
    }

    return (
        <tr className='product-table-item'>
            <td className="px-lg-0 py-1">
                <Row className='mx-0'>
                    <Col xs={2} className="px-lg-0 py-lg-2">
                        <Image src={`https://${import.meta.env.VITE_BUCKET_NAME}.s3.${import.meta.env.VITE_BUCKET_REGION}.amazonaws.com/${productItem.image}`} className="product-item-image"/>
                    </Col>
                    <Col xs={10}>
                        <Row>
                            <Col xs={12}>{productItem.name}</Col>
                            <Col xs={12}>{productItem.id}</Col>
                        </Row>
                    </Col>
                </Row>
            </td>
            <td className="p-lg-0 py-1">
                {productItem.category}
            </td>
            <td className="p-lg-0 py-1">
                Rs.{(Math.round(productItem.price * 100) / 100).toFixed(2)}
            </td>
            <td className="p-lg-0 py-1">
                {productItem.quantity}
            </td>
            <td className="p-lg-0 py-1">
                {renderInventory(productItem.quantity)}
            </td>
            <td className="p-lg-0 py-1">
                <Row className='mx-0'>
                    <Col className='d-flex px-0 product-table-item-actions justify-content-around'>
                        <Eye className="btn-eye" size={'18px'} color={'black'} onClick={handleOnViewClick}/>
                        <Edit2 className="btn-edit" size={'18px'} color={'#D0A617'}/>
                        <Trash2 className="btn-trash2" size={'18px'} color={'#F42B3D'} onClick={handleOnClick}/>
                    </Col>
                </Row>
            </td>
        </tr>
    )
        ;
}

export default ProductsListItem;

